import { useEffect, useState } from "react";
import "./App.css";

function App() {
  //initalize useState hooks
  const [contactList, setContactList] = useState([]);
  const [hashId, setHashId] = useState(Number(window.location.hash.slice(1)));
  
  //useEffect
  useEffect(() => {
    //call end point inside asyn fn
    const fetchPosts = async () => {
      const response = await fetch(
        "https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users"
      );
      const data = await response.json();
      //update useState
      setContactList(data);      
    };
    //call fetchPosts to do api call
    fetchPosts();
  }, []);

  //set HashId to useState
  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setHashId(window.location.hash.slice(1));
    });
  });

//get details of selected contact
  const contactSelected = contactList.find((contact) => {
    return Number(contact.id) === Number(hashId);
  });

  //form address string for selected contact
  const homeAddress =contactSelected ?
  contactSelected.address.street + " "+contactSelected.address.suite+ " "+contactSelected.address.city +" "+contactSelected.address.zipcode: "";

 
  return (
    <>
      <h2>Contact List of {contactList.length} candidates</h2>
      <h4>Select a contact to view details</h4>
      <div className="container">  
      {/* contact list div       */}
        <div className="contactList">
          <ul className="liststyle">
            {contactList.map((contact) => {
              return (
                // highlight contact on click and de-select on subsequent click
                <li key={contact.id} className={ Number(contact.id) === Number(hashId) ? "listitem highlight" : "listitem normal" }   >
                  <a href={`#${Number(contact.id) === Number(hashId) ? "" : contact.id }`}> {contact.name} </a>
                </li>
              );
            })}
          </ul>
        </div>
        {/* conditional display of selected contact */}
        {contactSelected && <div className="selectedContact">
          <h3>Selected contact Id - {hashId?hashId:"None"}</h3>
          <ul className="personalDetails">
          <li><span className="bold">Name : </span>{contactSelected ? contactSelected.name : ""}</li>
          <li><span className="bold">User name : </span>{contactSelected ? contactSelected.username : ""}</li>
          <li><span className="bold">e-mail : </span>{contactSelected ? contactSelected.email : ""}</li>
          <li><span className="bold">Phone : </span>{contactSelected ? contactSelected.phone : ""}</li>
          <li><span className="bold">website : </span><a href={contactSelected ?`https://${contactSelected.website}`:""} target="_blank" rel="noreferrer" className="link">{contactSelected ? contactSelected.website : ""}</a></li>
          <li>
          <address>
          <span className="bold">Residing at: </span><a href={contactSelected ?`https://www.google.com/maps/search/${homeAddress}`:""} target="_blank" rel="noreferrer"><div className="locPin"></div><sub>Click</sub></a> <br></br>
          
           {contactSelected ? contactSelected.address.street : "NA"}<br></br>
            {contactSelected ? contactSelected.address.suite : ""}<br></br>
            {contactSelected ? contactSelected.address.city : ""}<br></br>
            {contactSelected ? contactSelected.address.zipcode : ""}
            </address>
          </li>
        </ul>
        <details className="companyDetails">
          <summary><span className="bold">Currently employed at  </span>{contactSelected ?"":"None"} </summary>
          {console.log("cpny : ",contactSelected)}
            <p><span className="bold italic">{contactSelected ?contactSelected.company.name:""}</span><br></br>
            <span className="italic">{contactSelected ?contactSelected.company.catchPhrase:""} 
            {contactSelected ?contactSelected.company.bs:""}</span></p>
            
        </details>
        </div>}
      </div>
    </>
  );
}

export default App;
