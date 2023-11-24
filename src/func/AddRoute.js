import { db, storage } from '../db/firebase.js';

import {
  collection,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { format, compareAsc } from 'date-fns'
import swal from 'sweetalert';

const AddRouteFunc = async (sector, price, imageFile, userName) => {
  try {
    // ANCHOR Upload the image to Firebase Storage
    const storageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile); 

    // Get the download URL of the uploaded image
    const imageUrl = await getDownloadURL(storageRef);
    let currentDateTime = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
    // ANCHOR Add the document to Firestore with the image URL
    await addDoc(collection(db, 'routes'), {
      nombre: sector,
      precio: price,
      fecha: currentDateTime,
      imagenHojaRuta: imageUrl,
      chofer: userName.email,
      created: Timestamp.now(),
    });
  } catch (error) {
    swal({
      title: "Oops!",
      text: `Error enviando los datos al servidor: ${error.message}`,
      icon: "error",
      button: "Continue",
    });
  }
};

export default AddRouteFunc;