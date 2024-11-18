import { useContext } from "react"
import BuildingHeader from "../BuildingHeader"
import PublishBuildingContext from "./PublishBuildingContext"

function ReviewBuilding() {
  const { formData } = useContext(PublishBuildingContext)

  const building = {
    address: formData[0].building_address,
    neighborhood: formData[0].neighbourhood,
    floors: formData[1].floors,
    apartments_per_floor: formData[1].apartments_per_floor,
    elevator: formData[1].elevator,
    pool: formData[1].pool,
    gym: formData[1].gym,
    terrace: formData[1].terrace,
    bike_rack: formData[1].bike_rack,
    laundry: formData[1].laundry,
  }
  return (
    <div>
      <BuildingHeader building={building} />
    </div>
  )
}

export default ReviewBuilding
