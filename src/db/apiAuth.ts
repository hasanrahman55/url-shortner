// import supabase from "./supabase";
import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getSession();

  if (!data.session) return null;
  if (error) throw new Error(error.message);
  return data.session?.user;
}

// export async function signUp({ email, password, name, profile_pic }) {
//   const fileName = `dp-${name.split(" ").join("-")}-${Math.random}`;
//   const { error: storageError } = await supabase.storage
//     .from("profile_pic")
//     .upload(fileName, profile_pic);
//   if (storageError) throw new Error(storageError.message);

//   const supabaseUrl = process.env.VITE_SUPABASE_URL;

//   const { data, error } = await supabase.signUp({
//     email,
//     password,
//     options: {
//       data: {
//         name,
//         profile_pic: `${supabaseUrl}/storage/buckets/profile_pic/${profile_pic}`,
//       },
//     },
//   });
//   if (error) throw new Error(storageError.message);

//   return data;
// }

export async function signUp({ name, email, password, profile_pic }) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

  const { data: profile_data, error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
