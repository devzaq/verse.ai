'use client'

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { PlayIcon, PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';

interface InterviewData {
  id: number;
  experience: string;
  description: string;
  role: string;
  user?: {
    email: string
  }
}

const formDataSchema = z.object({
  experience: z.string().nonempty({ message: "Experience is required" }),
  description: z.string().nonempty({ message: "Job description is required" }),
  role: z.string().nonempty({ message: "Role is required" }),
});

export default function InterviewPage() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [interviewData, setInterviewData] = useState<InterviewData[]>([]);
  const router = useRouter();

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      experience: "",
      description: "",
      role: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formDataSchema>) => {
    console.log(values);

    setLoading(true);
    try {
      const response = await axios.post(`/api/interview-prep?userId=${session?.user?.id}`, values);
      if (!response) throw new Error('Failed to submit the form');
      if (response.status === 200 && response.data) {
        console.log(response.data);
        setInterviewData(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsOpen(false); // Close the dialog after submitting the form
    }
  };

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const [inProgress, setInProgress] = useState<{ [key: string]: boolean }>({}); // Track progress per card

  const topics = [
    { id: 1, role: 'Frontend Developer', description: 'JavaScript, TypeScript', experience: '1-3' },
    { id: 2, role: 'Backend Developer', description: 'Python, Java', experience: '2-4' },
    { id: 3, role: 'Full Stack Developer', description: 'JavaScript, Ruby', experience: '3-5' },
    { id: 4, role: 'Mobile Developer', description: 'Swift, Kotlin', experience: '2-4' },
    { id: 5, role: 'DevOps Engineer', description: 'Go, Rust', experience: '3-5' },
    { id: 6, role: 'Data Scientist', description: 'Python, R', experience: '2-4' },
    { id: 7, role: 'System Administrator', description: 'Bash, Python', experience: '3-5' },
    { id: 8, role: 'Cloud Engineer', description: 'AWS, Terraform', experience: '3-5' },
    { id: 9, role: 'Security Engineer', description: 'Python, C', experience: '3-5' },
    { id: 10, role: 'Machine Learning Engineer', description: 'Python, Java', experience: '2-4' },
  ];


  const handleStart = (topic: string) => {
    setInProgress((prevState) => ({ ...prevState, [topic]: true }));
    router.push(`/dashboard/interview/start-interview?topic=${topic}`);
  };

  return (
    <main className='w-full'>
      <div className='w-full flex flex-col text-5xl gap-y-3 py-5'>
        <h3>Ai Mock Interview</h3>
      <p className="text-lg ">Prepare for your dream job with our mock interview platform. Practice and improve your skills to ace your next interview!</p>
      </div>


      {/* Your previous interview */}
      <div className='flex flex-col gap-y-5'>
        <h1 className="text-2xl font-bold mb-4">Start New Interview</h1>
        <Card
          onClick={openDialog}
          className="cursor-pointer w-fit p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex items-center space-x-4"
        >
          <PlusIcon className="w-6 h-6" />
          <span className=" font-semibold">Add jobs cretria</span>
        </Card>
        <h1 className="text-2xl font-bold mb-4">Your Previous Interview</h1>

        <div className='grid grid-cols-3 gap-12 w-full'>
          {
            interviewData.length == 0 ? (
              <div className='text-xl mb-5 ml-5'>No interview data found</div>
            ) :

              interviewData.map((topic: InterviewData) => (
                <Card
                  key={topic.id}
                  className="cursor-pointer p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-y-4"
                >
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-x-3'>
                      {inProgress[topic.role] ? (
                        <div className="w-6 h-6 animate-spin border-4 border-t-4 border-blue-500 border-solid rounded-full" /> // Loading spinner
                      ) : (
                        <PlayIcon className="w-6 h-6" />
                      )}
                      <span className="font-semibold">{topic.role}</span>
                    </div>
                    <span className="text-sm px-2 rounded-full font-bold border-2 bg-blue-100 text-blue-500 border-blue-500">
                      {topic.experience} years
                    </span>
                  </div>
                  <p className="text-gray-700">description: {topic.description}</p>
                  <Button
                    onClick={() => handleStart(topic.role)}
                    className="ml-auto"
                  >
                    {inProgress[topic.role] ? 'In Progress' : 'Start'}
                  </Button>
                </Card>
              ))
          }
        </div>
      </div>
      {/* Custom Generated*/}
      <div className='flex flex-col gap-y-5'>
        <h1 className="text-2xl font-bold mb-4">Custom Interviews</h1>
        <div className='grid grid-cols-3 gap-12 w-full'>
          {
            topics.map((topic) => (
              <Card
                key={topic.id}
                className="cursor-pointer p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-y-4"
              >
                <div className='flex justify-between items-center w-full'>
                  <div className='flex items-center gap-x-3'>
                    {inProgress[topic.role] ? (
                      <div className="w-6 h-6 animate-spin border-4 border-t-4 border-blue-500 border-solid rounded-full" /> // Loading spinner
                    ) : (
                      <PlayIcon className="w-6 h-6" />
                    )}
                    <span className="font-semibold">{topic.role}</span>
                  </div>
                  <span className="text-sm px-2 rounded-full font-bold border-2 bg-blue-100 text-blue-500 border-blue-500">
                    {topic.experience} years
                  </span>
                </div>
                <p className="text-gray-700">description: {topic.description}</p>
                <Button
                  onClick={() => handleStart(topic.role)}
                  className="ml-auto"
                >
                  {inProgress[topic.role] ? 'In Progress' : 'Start'}
                </Button>
              </Card>
            ))
          }
        </div>
      </div> 



      {/* FORM FILLING */}
      <div className="container mx-auto p-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30 z-50" />
          <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
            <DialogClose onClick={closeDialog} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              {/* <XIcon className="w-6 h-6" /> */}
            </DialogClose>

            <h2 className="text-xl font-semibold text-center mb-4">Fill Out the Form</h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                {/* Role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Role / Job Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your role" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Job Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Write a brief job description" rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Experience */}
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of Experience</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your years of experience" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Language
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value: string) => field.onChange(value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="csharp">C#</SelectItem>
                            <SelectItem value="ruby">Ruby</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}



                {/* Submit Button */}
                <div className="text-center">
                  <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                    {loading ? 'Preparing for interview' : 'Submit'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
