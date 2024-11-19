import { useContext } from "react"
import BuildingHeader from "../BuildingHeader"
import PublishBuildingContext from "./PublishBuildingContext"

function ReviewBuilding() {
  const { formData } = useContext(PublishBuildingContext)

  return (
    <div>
      <BuildingHeader building={formData} />
    </div>
  )
}

export default ReviewBuilding
