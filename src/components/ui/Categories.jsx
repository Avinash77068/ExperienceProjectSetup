import { useNavigate } from "react-router-dom";
import { sampleShayaris } from "../../constant/data/shayri/shayridata";
import useSidebar from "../../hooks/useSidebar";

// Get unique categories from shayaris
const getUniqueCategories = () => {
  const categories = sampleShayaris.map(shayari => shayari.subtitle);
  return [...new Set(categories)];
};

const Categories = () => {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const categories = getUniqueCategories();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Shayari Categories</h1>
    
    </div>
  );
};

export default Categories;
