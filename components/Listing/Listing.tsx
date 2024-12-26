"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  PlusCircle,
  MinusCircle,
  Home,
  DollarSign,
  Users,
  Sparkles,
  Images,
} from "lucide-react";
import CategoryList from "@/constants/CategoryList";
import Image from "next/image";
import ImageUpload from "../imageUpload";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const formSteps = [
  { icon: Home, title: "Property Details" },
  { icon: DollarSign, title: "Pricing" },
  { icon: Users, title: "Rules & Facilities" },
  { icon: Images, title: "Gallery" },
  { icon: Sparkles, title: "Finalize" },
];

export default function AstonishingPropertyListingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [images, setimages] = useState<string[]>(Array(5).fill("")); // Initialize with 5 empty strings

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    numRooms: "",
    numBedrooms: "",
    numWashrooms: "",
    description: "",
    category: "",
    adultRent: "",
    infantRent: "",
    childRent: "",
    allowPets: false,
    petRent: "",
  });

  const [rules, setRules] = useState([""]);
  const [facilities, setFacilities] = useState([""]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, allowPets: checked }));
  };
  // Function to update a specific logo by index
  const updateLogo = (index: number, newLogo: string) => {
    setimages((previmages) => {
      const updatedimages = [...previmages]; // Create a copy of the current images array
      updatedimages[index] = newLogo; // Update the specific index with the new logo
      return updatedimages; // Return the updated array
    });
  };
  const handleDynamicFieldChange = (
    index: number,
    value: string,
    fieldType: "rules" | "facilities"
  ) => {
    if (fieldType === "rules") {
      const newRules = [...rules];
      newRules[index] = value;
      setRules(newRules);
    } else {
      const newFacilities = [...facilities];
      newFacilities[index] = value;
      setFacilities(newFacilities);
    }
  };

  const addDynamicField = (fieldType: "rules" | "facilities") => {
    if (fieldType === "rules") {
      setRules([...rules, ""]);
    } else {
      setFacilities([...facilities, ""]);
    }
  };

  const removeDynamicField = (
    index: number,
    fieldType: "rules" | "facilities"
  ) => {
    if (fieldType === "rules") {
      const newRules = rules.filter((_, i) => i !== index);
      setRules(newRules);
    } else {
      const newFacilities = facilities.filter((_, i) => i !== index);
      setFacilities(newFacilities);
    }
  };
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name
    const address = formData.address
    const city = formData.city
    const country = formData.country
    const rooms = formData.numRooms
    const bedrooms = formData.numBedrooms
    const washrooms = formData.numWashrooms
    const description = formData.description
    const category = formData.category
    const adultRent = formData.adultRent
    const infantRent = formData.infantRent
    const childRent = formData.childRent
    const petRent = formData.petRent
 
    const response = await axios.post('/api/add-hotel',{
      name,
      address,
      city,
      country,
      rooms,
      bedrooms,
      washrooms,
      description,
      category,
      adultRent,
      infantRent,
      childRent,
      petRent,
      images,
      rules,
      facilities
    });
    if(response.status === 200){
      Swal.fire({
        icon: "success",
        title: "Property Listing Created Successfully",
        text: "Your property listing has been created!",
      })
      router.push('/')
    } else if(response.status === 400){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Kindly Login first in order to list your property",
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while creating your property listing",
      })
    }
    // Handle form submission logic here
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-4xl text-gray-100"
      >
        <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-600 to-teal-700 text-transparent bg-clip-text">
          List Your Dream Property
        </h2>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between">
            {formSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="mt-2 text-xs font-medium text-gray-500">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 bg-gray-700 rounded-full">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: `${(currentStep / (formSteps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <Card className="bg-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
                      Property Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Property Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1 bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="mt-1 bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="mt-1 bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className="mt-1 bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="numRooms">Number of Rooms</Label>
                        <Input
                          id="numRooms"
                          name="numRooms"
                          type="number"
                          value={formData.numRooms}
                          onChange={handleInputChange}
                          required
                          className="mt-1 bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="numBedrooms">Number of Bedrooms</Label>
                        <Input
                          id="numBedrooms"
                          name="numBedrooms"
                          type="number"
                          value={formData.numBedrooms}
                          onChange={handleInputChange}
                          required
                          className="mt-1 bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="numWashrooms">
                          Number of Washrooms
                        </Label>
                        <Input
                          id="numWashrooms"
                          name="numWashrooms"
                          type="number"
                          value={formData.numWashrooms}
                          onChange={handleInputChange}
                          required
                          className="mt-1 bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          onValueChange={(value) =>
                            handleSelectChange("category", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {CategoryList.map((category) => (
                                <SelectItem
                                  key={category.label}
                                  value={category.label}
                                >
                                  <div className="flex items-center gap-2">
                                    <Image
                                      src={category.icon}
                                      alt=""
                                      width={20}
                                      height={20}
                                      className="invert"
                                    />
                                    <span>{category.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="mt-1 bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 1 && (
                <Card className="bg-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
                      Pricing
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                      <div>
                        <Label htmlFor="adultRent">Adult Rent</Label>
                        <Input
                          id="adultRent"
                          name="adultRent"
                          type="number"
                          value={formData.adultRent}
                          onChange={handleInputChange}
                          required
                          className="mt-1 bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="childRent">Child Rent</Label>
                        <Input
                          id="childRent"
                          name="childRent"
                          type="number"
                          value={formData.childRent}
                          onChange={handleInputChange}
                          required
                          className="mt-1 bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="infantRent">Infant Rent</Label>
                        <Input
                          id="infantRent"
                          name="infantRent"
                          type="number"
                          value={formData.infantRent}
                          onChange={handleInputChange}
                          required
                          className="mt-1 bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex items-center space-x-2">
                      <Switch
                        id="allowPets"
                        checked={formData.allowPets}
                        onCheckedChange={handleSwitchChange}
                      />
                      <Label htmlFor="allowPets">Allow Pets</Label>
                    </div>
                    {formData.allowPets && (
                      <div className="mt-4">
                        <Label htmlFor="petRent">Pet Rent</Label>
                        <Input
                          id="petRent"
                          name="petRent"
                          type="number"
                          value={formData.petRent}
                          onChange={handleInputChange}
                          className="mt-1 bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <Card className="bg-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
                      Rules & Facilities
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-lg font-medium">Rules</Label>
                        {rules.map((rule, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 mt-2"
                          >
                            <Input
                              value={rule}
                              onChange={(e) =>
                                handleDynamicFieldChange(
                                  index,
                                  e.target.value,
                                  "rules"
                                )
                              }
                              placeholder={`Rule ${index + 1}`}
                              className="bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeDynamicField(index, "rules")}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addDynamicField("rules")}
                          className="mt-2"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Rule
                        </Button>
                      </div>
                      <div>
                        <Label className="text-lg font-medium">
                          Facilities
                        </Label>
                        {facilities.map((facility, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 mt-2"
                          >
                            <Input
                              value={facility}
                              onChange={(e) =>
                                handleDynamicFieldChange(
                                  index,
                                  e.target.value,
                                  "facilities"
                                )
                              }
                              placeholder={`Facility ${index + 1}`}
                              className="bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                removeDynamicField(index, "facilities")
                              }
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addDynamicField("facilities")}
                          className="mt-2"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Facility
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 3 && (
                <Card className="bg-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
                      Upload Images to showcase your home
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Kindly upload the best images of your hotel to attract
                      more customers.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <div key={index}>
                            <ImageUpload
                              value={images[index]} // Assign the corresponding value from the images array
                              onChange={(image) => updateLogo(index, image)} // Update the specific index
                              label={`Upload logo ${index + 1}`} // Label the upload component
                            />
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 4 && (
                <Card className="bg-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
                      Finalize Listing
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Please review your property details before submitting.
                      Once submitted, your listing will be reviewed by our team.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <span className="font-semibold">Property Name:</span>{" "}
                        {formData.name}
                      </div>
                      <div>
                        <span className="font-semibold">Location:</span>{" "}
                        {formData.address}, {formData.city}, {formData.country}
                      </div>
                      <div>
                        <span className="font-semibold">Property Type:</span>{" "}
                        {formData.category}
                      </div>
                      <div>
                        <span className="font-semibold">Rooms:</span>{" "}
                        {formData.numRooms} (Bedrooms: {formData.numBedrooms},
                        Washrooms: {formData.numWashrooms})
                      </div>
                      <div>
                        <span className="font-semibold">Pet Policy:</span>{" "}
                        {formData.allowPets
                          ? `Allowed (Rent: $${formData.petRent})`
                          : "Not Allowed"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="bg-gray-700 text-gray-100 hover:bg-gray-600"
            >
              Previous
            </Button>
            {currentStep < formSteps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-emerald-500 text-white hover:bg-emerald-600"
              >
                Next
              </Button>
            ) : currentStep === 4 ? (
              <Button
                type="submit"
                className="bg-emerald-500 text-white hover:bg-emerald-600"
              >
                Submit Listing
              </Button>
            ):null}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
