import { useState } from "react"
import FormComponent from "./components/FormComponent"

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    destination: "",
    nutsFree: false,
    lactoseFree: false,
    vegan: false
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const params = new URLSearchParams({
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age,
      gender: formData.gender,
      destination: formData.destination,
      lactoseFree: formData.lactoseFree ? "on" : "off"
    })
    window.location.href = `/?${params.toString()}`
  }

  return (
    <FormComponent
      data={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default App
