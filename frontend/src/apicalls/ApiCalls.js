import axiosinstance from "./AxiosInstance";
import initialData from "../Mock/InitializeItems.json"
import newData from "../Mock/clickedItems.json"


const URLinitializeItems = process.env.NODE_ENV === 'production' ? "assessment/initializeItems": "http://localhost:3001/assessment/initializeItems";
const URLuserRegister = process.env.NODE_ENV === 'production'?"user/register" : "http://localhost:3001/user/register";
const URLclickedItem = process.env.NODE_ENV === 'production' ? "assessment/clickedItem" : "http://localhost:3001/assessment/clickedItem";
const URLnextTrial = process.env.NODE_ENV === 'production'? "assessment/next-trial": "http://localhost:3001/assessment/next-trial";

export async function getInitialItems(jwt, val) {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}`  },
          body: JSON.stringify(val)
        };
        const response = await fetch(URLinitializeItems, requestOptions);
    
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
    
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
      } 
      catch (error) {
        console.error('An error occurred:', error.message);
        throw error; // You can choose to rethrow the error or handle it differently.
      }
  }

  export async function postFormData(formData) {
    console.log("post form data called");
    
      try{
        let bodyVal = {
          age: formData.age,
          sex: formData.sex,
          qualifications: formData.qualifications,
          language_proficiency: formData.languageProficiency,
          vision: formData.vision,
          handedness: formData.handedness,
          country: formData.country,
          city: formData.city,
          ethnicity: formData.ethnicity,
          device_information: formData.device,
          disability: formData.disability
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyVal)
        };

        console.log("Response up");
        
        const response = await fetch(URLuserRegister, requestOptions)

        console.log("Response down");
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Form submitted successfully",responseData);
        return responseData;        
      }
      catch (error) {
        console.error('An error occurred:', error.message);
        throw error; // You can choose to rethrow the error or handle it differently.
      }
    
  } 

  export async function postClicked(clickData, jwt) {    
    console.log({clickData})
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
          body: JSON.stringify(clickData)
        };
        const response = await fetch(URLclickedItem, requestOptions);
      
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
    
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
      } 
      catch (error) {
        console.error('An error occurred:', error.message);
        throw error; // You can choose to rethrow the error or handle it differently.
      }
}

export async function getNextTrial(jwt, val) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}`  },
      body: JSON.stringify(val)
    };
    const response = await fetch(URLnextTrial, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } 
  catch (error) {
    console.error('An error occurred:', error.message);
    throw error; // You can choose to rethrow the error or handle it differently.
  }
}