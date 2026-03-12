import type {Actions} from "./$types";


interface ReturnObject {
    success: boolean;
    errors: string [];
}

export const actions = {
    default: async ({ request })=>{
        const formData = await request.formData();

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const passwordConfirmation = formData.get("passwordConfirmation") as string;

        const returnObject: ReturnObject = {
            success:true,
            errors: [],
        };

        if (name.length < 3) {
            returnObject.errors.push("Name must be at least 3 characters");
            
        }

        if (!email.length){
            returnObject.errors.push("Email is required for registration.");
        }

         if (!password.length){
            returnObject.errors.push("Password cannot be blank.")
        }

        if (password !== passwordConfirmation && password.length){
            returnObject.errors.push("Passwords must match each other");
        }

        if (returnObject.errors.length){
            returnObject.success = false;
            return returnObject;
        }

        //Registration flow

        return returnObject;

        console.log(formData);
    }
}
