import React from "react";
import Head from "next/head";
import "../styles.scss";


const Index = () => {
  const [services, setServices] = React.useState(undefined)
  const [form, setForm] = React.useState(undefined)
  const [formData, setFormData] = React.useState(undefined)

  const [loading, setLoading] = React.useState('loading');
  let service

  React.useEffect(() => {
    async function fetchData() {
      await fetch('http://clinia-coding-challenge.s3.ca-central-1.amazonaws.com/services.json')
      .then(res => res.json())
      .then(data => {
        setServices(data)
      })
      await fetch('http://clinia-coding-challenge.s3.ca-central-1.amazonaws.com/form.json')
      .then(res => res.json())
      .then(data => {
        setForm(data)
      })
      setLoading('idle')
    }
    fetchData()
  },[])

  const serviceHandler = (ev) => {
    service = ev.target.value
    setFormData(form.find(item => item.services.includes(service)))
    if(service === 'Root canal treatments') {
      setFormData(form[0])
    }
  }

  const fieldQuery = (field) => {
    if (field.label === 'First Name') {
      return <input id='firstName' type={field.type} key={field.name}/>
    } else if (field.label === 'Last Name') {
      return <input id='lastName' type={field.type} key={field.name}/>
    } else if (field.label === 'Phone Number') {
      return <input id='phone' type={field.type} key={field.name}/>
    } else if (field.label === 'Email') {
      return <input id='email' type={field.type} key={field.name}/>
    } else if (field.type === 'textarea') {
      return <textarea id='details' type={field.type} key={field.name}/>
    } else if (field.type === 'dropdown') {
      return (
        <select id='postal'>
          {field.options.map(option => {
            return <option key={option} value={option}>{option}</option>
          })}
        </select>
      ) 
    }
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if(formData === form[0] &&
      document.getElementById('firstName').value &&
      document.getElementById('lastName').value &&
      document.getElementById('email').value
    ) {
      console.log(document.getElementById('firstName').value, 'first Name')
      console.log(document.getElementById('lastName').value, 'last Name')
      console.log(document.getElementById('email').value, 'email')

      document.getElementById('firstName').value = ''
      document.getElementById('lastName').value = ''
      document.getElementById('email').value = ''

    } else if (formData === form[1] &&
      document.getElementById('email').value
    ) {
      console.log(document.getElementById('email').value, 'email')

      document.getElementById('email').value = ''
    } else if ( formData === form[2] &&
      document.getElementById('firstName').value &&
      document.getElementById('lastName').value &&
      document.getElementById('phone').value &&
      document.getElementById('email').value &&
      document.getElementById('details').value &&
      document.getElementById('postal').value
      ) {
      console.log(document.getElementById('firstName').value, 'first Name')
      console.log(document.getElementById('lastName').value, 'last Name')
      console.log(document.getElementById('phone').value, 'phone')
      console.log(document.getElementById('email').value, 'email')
      console.log(document.getElementById('details').value, 'details')
      console.log(document.getElementById('postal').value, 'postal')

      document.getElementById('firstName').value = ''
      document.getElementById('lastName').value = ''
      document.getElementById('email').value = ''
      document.getElementById('phone').value = ''
      document.getElementById('details').value = ''
    } else {
      console.log('form still needs to be completed')
    }
  }
  if(loading !== 'loading') {
    return (
      <div>
        <Head>
          <title>Appointment Form</title>
        </Head>
        <div>Set an Appointment</div>
        {formData && formData !== form[0] && <div>{formData.title}</div>}
        <form>
          <label>services</label>
          <select onChange={ev => serviceHandler(ev)}>
            <option>Appointment</option>
            {services.map(service => {
                return <option key={service} value={service}>{service}</option>
              })
            }
          </select>
            {formData && <div>{formData.fields.map((field) => {
              return (
                <div key={Math.random() * 100000} style={{display:'flex', flexDirection: 'column'}}>
                  <label key={field.label}>{field.label}</label>
                  {fieldQuery(field)}
                </div>
              )
            })}</div>}
            <button onClick={(ev)=> handleSubmit(ev)}>send the request</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>loading</div>
    )
  }
}

export default Index