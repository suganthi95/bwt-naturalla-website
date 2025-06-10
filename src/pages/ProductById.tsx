import { useParams } from "react-router-dom";

export default function ProductById() {
      const params = useParams();
  const { id } = params || {};
  return (
    <div>ProductById</div>
  )
}
