import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Truck, ShoppingBag, User, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { getProductById } from '../data/products';
import { formatDate } from '../utils/dates';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  
  const product = id ? getProductById(id) : undefined;
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Product not found</h2>
        <Button onClick={() => navigate('/products')} className="mt-4">
          Back to Products
        </Button>
      </div>
    );
  }
  
  const statusVariant = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
  } as const;
  
  const statusAction = {
    pending: [
      { label: 'Approve', variant: 'success' as const, action: () => console.log('Approve product') },
      { label: 'Reject', variant: 'danger' as const, action: () => console.log('Reject product') },
    ],
    approved: [
      { label: 'Remove Listing', variant: 'danger' as const, action: () => console.log('Remove listing') },
    ],
    rejected: [
      { label: 'Approve', variant: 'success' as const, action: () => console.log('Approve product') },
    ],
  };
  
  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/products')}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back to Products
      </button>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product images */}
        <div className="md:w-1/2 space-y-4">
          <div className="aspect-w-16 aspect-h-12 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="object-contain w-full h-full"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`h-20 w-20 border rounded-md overflow-hidden ${
                    activeImage === index
                      ? 'border-blue-600 dark:border-blue-400 ring-2 ring-blue-600/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product details */}
        <div className="md:w-1/2 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{product.name}</h1>
              <p className="text-gray-500 dark:text-gray-400">{product.category}</p>
            </div>
            <Badge variant={statusVariant[product.status]} className="capitalize">
              {product.status}
            </Badge>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</h2>
            <div className="flex items-center mt-2">
              <Truck className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Usually ships within 2-3 business days</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h3>
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
          </div>
          
          {/* Seller information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                Seller Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="h-12 w-12 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{product.seller.name}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 ml-1">{product.seller.rating.toFixed(1)}</span>
                    </div>
                    <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Seller since {formatDate(new Date('2024-06-15'))}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Product specifications */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Specifications</h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <span className="w-1/3 text-sm font-medium text-gray-500 dark:text-gray-400">{key}</span>
                  <span className="w-2/3 text-sm text-gray-900 dark:text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {statusAction[product.status].map((action, index) => (
              <Button key={index} variant={action.variant} onClick={action.action}>
                {action.variant === 'success' && <CheckCircle className="h-5 w-5 mr-2" />}
                {action.variant === 'danger' && <XCircle className="h-5 w-5 mr-2" />}
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;