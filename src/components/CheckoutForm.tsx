
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Address } from '@/utils/data';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Full name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  addressLine1: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, {
    message: "City is required.",
  }),
  state: z.string().min(2, {
    message: "State is required.",
  }),
  postalCode: z.string().min(6, {
    message: "Please enter a valid postal code.",
  }),
  country: z.string().default("India"),
  paymentMethod: z.enum(["cod", "card", "upi"], {
    required_error: "Please select a payment method.",
  }),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

interface CheckoutFormProps {
  onSubmit: (values: CheckoutFormValues) => void;
  defaultValues?: Partial<CheckoutFormValues>;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  onSubmit, 
  defaultValues = {
    country: "India",
    paymentMethod: "card"
  } 
}) => {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4 font-serif">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="9876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-4 font-serif">Shipping Address</h3>
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Street Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2 (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartment, suite, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Mumbai" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Maharashtra" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="400001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="India" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-4 font-serif">Payment Method</h3>
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value="card" id="card" />
                      <FormLabel htmlFor="card" className="cursor-pointer flex-1">
                        Credit/Debit Card
                      </FormLabel>
                      <div className="flex space-x-1">
                        <img src="https://dummyimage.com/30x20/ccc/666&text=VISA" className="h-5" alt="Visa" />
                        <img src="https://dummyimage.com/30x20/ccc/666&text=MC" className="h-5" alt="Mastercard" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value="upi" id="upi" />
                      <FormLabel htmlFor="upi" className="cursor-pointer flex-1">
                        UPI Payment
                      </FormLabel>
                      <img src="https://dummyimage.com/30x20/ccc/666&text=UPI" className="h-5" alt="UPI" />
                    </div>
                    
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value="cod" id="cod" />
                      <FormLabel htmlFor="cod" className="cursor-pointer">
                        Cash On Delivery
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full bg-gold hover:bg-amber-600 text-black">
          Place Order
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
