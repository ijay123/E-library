import React from "react";

const Contact = () => {
  return (
    <>
<p className="pt-[200px] flex justify-center text-[red] text-[40px] pb-[50px]">Contact Us</p>
<div className="flex justify-center gap-[50px] border-[5px] w-[70%] m-[auto] py-[60px]">
      <div className="w-[30%]">
        <form>
          <p className="text-[red]">Email</p>
          <input className="border w-[100%] h-[50px] rounded-[10px] outline-none pl-[10px] mb-[20px]" />
          <p className="text-[red]">Subject</p>
          <input className="border w-[100%] h-[50px] rounded-[10px] outline-none pl-[10px] mb-[20px]" />
          <p className="text-[red]">Message</p>
          <textarea className="border rounded-[10px] outline-none pl-[10px]" rows="4" cols="30" />
        </form>
      </div>
      <div className="bg-[red] text-[white] w-[30%] p-[20px] rounded-[10px]">
        <p>For Support</p>
        <p>Email : support@email.com</p>
        <p>PhoneNumber: +123-456-7890</p>
      </div>
    </div>
    </>

  );
};

export default Contact;
