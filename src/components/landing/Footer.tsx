import Image from "next/image";
import React from "react";

type Props = {};

function Footer() {
  return (
    <footer className="w-full bg-main px-4 py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        <div>
          <Image
            src="/Footer.svg"
            alt="Logo"
            width={150}
            height={150}
            className="h-auto w-32"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Information</h3>
          <a href="#" className="text-sm hover:underline">
            About Us
          </a>
          <a href="#" className="text-sm hover:underline">
            Services
          </a>
          <a href="#" className="text-sm hover:underline">
            Testimonials
          </a>
          <a href="#" className="text-sm hover:underline">
            Contact Us
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <p className="text-sm">89, Rue des roses, Hydra Alger, Algerie</p>
          <p className="text-sm">contact@friscai.com</p>
          <p className="text-sm">0550 55 55 55</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook">
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
              />
            </a>
            <a href="#" aria-label="Twitter">
              <Image src="/X.svg" alt="Twitter" width={20} height={20} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Image
                src="/Linkedin.svg"
                alt="LinkedIn"
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
