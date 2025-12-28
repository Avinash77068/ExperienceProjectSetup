import { useNavigate, useParams } from "react-router-dom";

export const useIdorRoute = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    return { navigate, id };
};  