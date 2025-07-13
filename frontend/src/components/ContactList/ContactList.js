import "./ContactList.css"

const ContactList = () => {
  const contacts = [
    {
      id:"24",
      user_id:"234iojo",
      name:"John"
    },
    {
      id:"23",
      user_id:"234ijo",
      name:"Micheal"
    },
  ]
  return (
    <div id="contact-list">
      {contacts.map(contact=>{
        return <Contact contact={contact} />
      })}
    </div>
  )
}

const Contact = (props) => {
  return(
    <div id="contact">
      <p>{props.contact.name}</p>
    </div>
  )
}

export default ContactList