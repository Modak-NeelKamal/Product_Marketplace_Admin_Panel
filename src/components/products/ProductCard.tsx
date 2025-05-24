import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { formatDate } from '../../utils/dates';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    seller: {
      name: string;
    };
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const statusVariant = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
  } as const;
  
  return (
    <Link to={`/products/${product.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900 dark:text-white truncate">{product.name}</h3>
            <Badge variant={statusVariant[product.status]} className="capitalize">
              {product.status}
            </Badge>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
          <div className="flex justify-between items-center mt-3 text-sm">
            <p className="text-gray-500 dark:text-gray-400">Seller: {product.seller.name}</p>
            <p className="text-gray-500 dark:text-gray-400">{formatDate(new Date(product.createdAt))}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;