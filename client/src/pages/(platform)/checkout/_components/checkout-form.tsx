import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usStatesData } from "@/constants/us-states";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import ConfirmDialog from "./confirm-dialog";
import useStore from "@/hooks/use-store";
import { useCart } from "@/hooks/use-cart";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { checkoutSchema, TCheckoutSchema } from "@/schemas/checkout.schema";
import { useAuthStore } from "@/store/auth";

interface CheckoutFormProps {
  formType: "checkout" | "edit";
  orderId?: string;
}

const CheckoutForm = ({ formType, orderId }: CheckoutFormProps) => {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [originalAddress, setOrifinalAddress] = useState("");
  const [addressVerification, setAddressVerification] = useState("");
  const cart = useStore(useCart, (s) => s);
  const { profile } = useAuthStore();

  console.log(orderId);

  const form = useForm<TCheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customer_name: "",
      line1: "",
      line2: "",
      postalCode: "",
      city: "",
      region: "",
      phone: "",
    },
  });

  useEffect(() => {
    const fetch = async () => {
      if (searchParams.get("canceled") && searchParams.get("orderId")) {
        const orderId = searchParams.get("orderId");
        console.log(orderId);
        // await deleteOrder(orderId);
        toast.error("Payment Failed");
      }
    };
    fetch();
  }, [searchParams]);

  const { watch } = form;

  const onSubmit = async (values: TCheckoutSchema) => {
    try {
      setOpen(true);
      setLoading(true);
      const address = [
        values.line1,
        values.city,
        values.region,
        values.postalCode,
      ].join(", ");
      setOrifinalAddress(address);
      const { data } = await axios.post(
        "https://www.teepublic.com/checkout/verify_address",
        {
          line1: values.line1,
          line2: values.line2,
          city: values.city,
          countryId: 223,
          countryName: "UNITED STATES",
          country: "US",
          region: values.region,
        }
      );
      const { validated_address } = data;
      const validatedAddress = [
        validated_address.line1,
        validated_address.city,
        validated_address.region,
        validated_address.postalCode,
      ].join(", ");
      setAddressVerification(validatedAddress);
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setOpen(false);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (formType === "checkout") {
      try {
        setLoading(true);
        const res = await axios.post("/checkout", {
          userId: profile?.id,
          items: cart?.items,
          shippingInfo: {
            address: addressVerification,
            phone: watch("phone"),
            customerName: watch("customer_name"),
          },
        });
        window.location.assign(res.data.url);
      } catch (error) {
        if (cart?.items.length === 0) {
          toast.error("Your Cart is empty!");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        // await updateShippingInformation({
        //   address: addressVerification,
        //   orderId,
        //   customerName: watch("customer_name"),
        //   phone: watch("phone"),
        // });
        toast.success("Your order shipping information has been updated");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <ConfirmDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm Shipping Address"
        onConfirm={handleConfirm}
        description=""
        loading={loading}
      >
        <div className="space-y-4">
          <Alert variant="default">
            <HiOutlineSpeakerWave className="h-4 w-4" />
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              To ensure more accurate delivery,{" "}
              <span className="font-bold">
                use the recommended verified address below.
              </span>
            </AlertDescription>
          </Alert>
          <div>
            <h3 className="font-bold mb-2">You entered: </h3>
            <Alert variant="default">
              <div className="flex items-center gap-3">
                <img
                  src={"/images/warn-icon.svg"}
                  className="h-6 w-6 text-green-600"
                  width={20}
                  height={20}
                  alt="success icon"
                />
                <AlertDescription>
                  <span className="uppercase font-bold">{originalAddress}</span>
                </AlertDescription>
              </div>
            </Alert>
          </div>
          <div>
            <h3 className="font-bold mb-2">We recommend using: </h3>
            <Alert variant="default">
              <div className="flex items-center gap-3">
                <img
                  src={"/images/success-icon.svg"}
                  className="h-6 w-6 text-green-600"
                  width={20}
                  height={20}
                  alt="success icon"
                />
                <AlertDescription className="flex flex-col">
                  <span className="uppercase font-bold">
                    {addressVerification}
                  </span>
                  <span className="text-xs text-green-600 font-medium">
                    Verified
                  </span>
                </AlertDescription>
              </div>
            </Alert>
          </div>
        </div>
      </ConfirmDialog>
      <>
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-xl mb-4">Shipping Info</h3>
          {!showForm && !!addressVerification && (
            <Button variant={"link"} onClick={() => setShowForm(true)}>
              Change
            </Button>
          )}
        </div>
        {showForm ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-1">
                      <span className="text-red-500">*</span>
                      <p>Full name</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel className="flex items-center space-x-1">
                      <span className="text-red-500">*</span>
                      <p>Phone number</p>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant={"outline"}
                          disabled
                          className="w-10 h-10"
                          size={"icon"}
                        >
                          +1
                        </Button>
                        <Input
                          placeholder="(999) 999-9999"
                          {...field}
                          className="flex h-10 w-full rounded-md border border-slate-200  bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:border-slate-400 focus:ring-0 dark:text-white dark:bg-transparent  disabled:cursor-not-allowed disabled:opacity-75  dark:ring-offset-slate-950"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="line1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-1">
                      <span className="text-red-500">*</span>
                      <p>Address Line 1</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="line2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-1">
                      <p>Address Line 2 (optional)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-1">
                        <span className="text-red-500">*</span>
                        <p>City</p>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-1">
                        <span className="text-red-500">*</span>
                        <p>Region</p>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {usStatesData.map((state) => (
                            <SelectItem
                              key={state.abbreviation}
                              value={state.abbreviation}
                              className="cursor-pointer"
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-1">
                        <span className="text-red-500">*</span>
                        <p>Postal Code</p>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormLabel className="flex items-center space-x-1 select-none">
                    <span className="text-red-500">*</span>
                    <p>Country</p>
                  </FormLabel>
                  <Input
                    className="mt-2 select-none"
                    disabled
                    placeholder="United States"
                    value="United States"
                  />
                </div>
              </div>
              <Button
                variant={"default"}
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <p className="mr-2">
                      {formType === "checkout"
                        ? "Confirm & Proceed to Payment"
                        : "Continue Update"}
                    </p>
                    <Loader className="animate-spin w-4 h-4" />
                  </div>
                ) : (
                  <>
                    {formType === "checkout"
                      ? "Confirm & Proceed to Payment"
                      : "Continue Update"}
                  </>
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">{watch("customer_name")}</h3>
              <p className="text-sm">+1 {watch("phone")}</p>
              <p className="w-[80%] text-sm">{addressVerification}</p>
            </div>
            <Button
              variant={"default"}
              className="w-full py-6 mt-6"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <p className="mr-2">
                    {formType === "checkout"
                      ? "Place Order"
                      : "Edit your shipping information"}
                  </p>
                  <Loader className="animate-spin w-4 h-4" />
                </div>
              ) : (
                <>
                  {formType === "checkout"
                    ? "Place Order"
                    : "Edit your shipping information"}
                </>
              )}
            </Button>
          </div>
        )}
      </>
    </>
  );
};

export default CheckoutForm;
