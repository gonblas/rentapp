import Property from "../property-page/Property"
import { useContext } from "react"
import PublishPropertyContext from "./PublishPropertyContext"
import useAuth from "../../hooks/AuthContext"

function ReviewProperty() {
  const { formData, building } = useContext(PublishPropertyContext)
  const { userData } = useAuth()

  const property = {
    id: 0,
    description: formData.description,
    features: {
      rental_value: formData.rental_value,
      expenses_value: formData.expenses_value,
      rooms: formData.rooms,
      square_meters: formData.square_meters,
      location: formData.location,
      balconies: formData.balconies,
      backyard: formData.backyard,
      garage: formData.garage,
      pet_friendly: formData.pet_friendly,
    },
    publisher: userData,
    building: building,
    images: formData.images.map((image) => image.url),
  }

  return (
    <div>
      <Property property={property} canDelete={false} />
    </div>
  )
}

export default ReviewProperty
