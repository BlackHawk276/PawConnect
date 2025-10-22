import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ADMIN_EMAIL = "pawconnect2025@gmail.com";
const ADMIN_PASSWORD = "Test1234";
const ADMIN_FIRST_NAME = "Admin";
const ADMIN_LAST_NAME = "User";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Check if admin already exists
    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("email", ADMIN_EMAIL)
      .maybeSingle();

    if (existingProfile) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Admin account already exists!",
          email: ADMIN_EMAIL,
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Create the admin user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });

    if (authError) {
      throw new Error(`Auth error: ${authError.message}`);
    }

    if (!authData.user) {
      throw new Error("No user returned from createUser");
    }

    const userId = authData.user.id;

    // Create profile entry
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: userId,
        email: ADMIN_EMAIL,
        role: "admin",
      });

    if (profileError) {
      throw new Error(`Profile error: ${profileError.message}`);
    }

    // Create admin entry
    const { error: adminError } = await supabaseAdmin
      .from("admins")
      .insert({
        id: userId,
        first_name: ADMIN_FIRST_NAME,
        last_name: ADMIN_LAST_NAME,
      });

    if (adminError) {
      throw new Error(`Admin error: ${adminError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Admin account created successfully!",
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        note: "Please change the password after first login",
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});