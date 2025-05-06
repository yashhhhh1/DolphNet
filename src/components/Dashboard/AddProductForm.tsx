
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddProductFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const categories = [
  "Running", 
  "Casual", 
  "Basketball", 
  "Hiking", 
  "Walking", 
  "Training", 
  "Formal"
];

const AddProductForm = ({ onSubmit, onCancel }: AddProductFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
    size: [] as string[],
    color: [] as string[],
  });
  
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleArrayInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const values = e.target.value.split(",").map(item => item.trim());
    setFormData((prev) => ({ ...prev, [field]: values }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Convert price and stock to numbers
    const processedData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };
    
    onSubmit(processedData);
    
    toast({
      title: "Product Added",
      description: "The product has been successfully added.",
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="brand">Brand *</Label>
          <Input
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleSelectChange(value, "category")}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Price ($) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="stock">Stock *</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="size">Sizes (comma separated)</Label>
          <Input
            id="size"
            name="size"
            value={formData.size.join(", ")}
            onChange={(e) => handleArrayInput(e, "size")}
            placeholder="7, 8, 9, 10, 11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="color">Colors (comma separated)</Label>
          <Input
            id="color"
            name="color"
            value={formData.color.join(", ")}
            onChange={(e) => handleArrayInput(e, "color")}
            placeholder="Black, White, Blue"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="dolphnet-gradient">
          Add Product
        </Button>
      </div>
    </form>
  );
};

export default AddProductForm;
