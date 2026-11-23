import type { APIRoute } from 'astro';
import { wixFetch } from '../../wix/sdk';

export const prerender = false;

const FORM_ID = 'cef50cf7-df62-4308-b30e-fb065a3c59e9';

export const POST: APIRoute = async ({ request }) => {
  try {
    let body: any = {};
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        return new Response(
          JSON.stringify({ ok: false, error: 'Invalid JSON payload' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        vehicleRegistration: formData.get('vehicleRegistration'),
        message: formData.get('message')
      };
    } else {
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = {};
      }
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const vehicleRegistration = typeof body.vehicleRegistration === 'string' ? body.vehicleRegistration.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !phone || !vehicleRegistration || !message) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'Please provide full name, email address, phone number, vehicle registration, and message.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const formattedReg = vehicleRegistration.toUpperCase();

    // Submit to Wix Forms so Wix automations and dashboard notifications trigger
    try {
      const submissionsMap: Record<string, string> = {
        full_name_kf33v9: name,
        email_b4ae: email,
        phone_c79c: phone,
        vehicle_registration_ce8l9a: formattedReg,
        message_service_details_75vkcc: message
      };

      const wixPayload = {
        submission: {
          formId: FORM_ID,
          submissions: submissionsMap
        }
      };

      const wixRes = await wixFetch('/form-submission-service/v4/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wixPayload)
      });

      if (!wixRes.ok) {
        const errText = await wixRes.text();
        console.warn('[Wix Forms Submission warning]:', wixRes.status, errText);
      }
    } catch (wixErr) {
      console.error('[Wix Forms Submission error]:', wixErr);
      // We don't fail the user if Wix API had a temporary glitch, the submission is logged
    }

    return new Response(
      JSON.stringify({
        ok: true,
        message: 'Your quote enquiry has been received successfully.',
        data: {
          name,
          vehicleRegistration: formattedReg
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || 'Server processing error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
