import axiosinstance from "./AxiosInstance";
import initialData from "../Mock/InitializeItems.json"
import newData from "../Mock/clickedItems.json"



export async function getInitialItems(jwt, val) {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}`  },
          body: JSON.stringify(val)
        };
        const response = await fetch('http://localhost:3000/assessment/initializeItems', requestOptions);
    
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
    {
      try{
        let bodyVal = {
          dob: formData.dateOfBirth,
          sex: formData.sex,
          qualifications: formData.qualifications,
          language_proficiency: formData.languageProficiency,
          vision: formData.vision,
          handedness: formData.handedness,
          country: formData.country,
          city: formData.city,
          ethnicity: formData.ethnicity,
          device_information: "laptop",
          disability: formData.disability
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyVal)
        };
        
        const response = await fetch('http://localhost:3000/user/register', requestOptions)

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
  } 

  export async function postClicked(clickData, jwt) {    
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'authorisation': jwt },
          body: JSON.stringify(clickData)
        };
        const response = await fetch('http://localhost:3000/assessment/clickedItem', requestOptions);
    
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