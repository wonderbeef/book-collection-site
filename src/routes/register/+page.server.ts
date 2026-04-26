import type { Actions } from "./$types";
import { createClient } from "@supabase/supabase-js";
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { fail, redirect } from "@sveltejs/kit";

interface ReturnObject {
  success: boolean;
  errors: string[];
}

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get("passwordConfirmation") as string;

    const returnObject: ReturnObject = {
      success: true,
      errors: [],
    };

    if (name.length < 3) {
      returnObject.errors.push("Name must be at least 3 characters");
    }

    if (!email.length) {
      returnObject.errors.push("Email is required for registration.");
    }

    if (!password.length) {
      returnObject.errors.push("Password cannot be blank.");
    }

    if (password !== passwordConfirmation && password.length) {
      returnObject.errors.push("Passwords must match each other");
    }

    if (returnObject.errors.length) {
      returnObject.success = false;
      return returnObject;
    }

    //Registration flow

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) {
      console.log("There has been an error");
      console.log(error);
      returnObject.success = true;
      return fail(400, returnObject);
    }

    redirect(303, "/private/dashboard");

    return returnObject;

    console.log(formData);
  },
};
