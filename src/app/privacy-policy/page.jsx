import React from "react";
import Wrapper from "../../components/wrapper/wrapper";
import H1 from "../../components/headings/h1";
import Container from "../../components/container/container";

const Page = () => {
  return (
    <Wrapper>
      <Wrapper className="mb-10 mt-16 max-sm-tab:mt-0">
        <Container className=" items-center flex justify-center">
          <div class="bg-white rounded-md flex justify-center">
            
            <div class="px-6 py-8 w-[70%]">
              <h1 class="text-3xl font-bold mb-2 text-center">Privacy Policy</h1>
              <br />
              <p>Last updated: August 12, 2024</p>
              <h2 class="text-2xl font-bold mb-4">Introduction</h2>
              <p class="mb-4">
                SEOGENIEAI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
                privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our
                application, including the use of Google Login for account
                verification.
              </p>

              <h2 class="text-2xl font-bold mb-4">Information We Collect</h2>
              <h2 class="text-xl font-semibold mb-4">
                Google Login Information
              </h2>

              <p class="mb-4">
                When you use Google Login to access our app, we collect the
                following information from your Google account:
              </p>

              <ul class="list-disc list-inside mb-4">
                <li>
                  <span className="font-semibold">
                    Basic Profile Information:
                  </span>{" "}
                  This includes your name, email address, and profile picture.
                </li>
                <li>
                  <span className="font-semibold">Additional Information:</span>{" "}
                  Any other information you have made publicly available through
                  your Google account.
                </li>
              </ul>
              <h2 class="text-xl font-semibold mb-4">
                Automatically Collected Information
              </h2>

              <p class="mb-4">
                In addition to the information collected through Google Login,
                we may collect certain information automatically, including:
              </p>

              <ul class="list-disc list-inside mb-4">
                <li>
                  <span className="font-semibold">Device Information:</span>{" "}
                  Information about your device, such as the device type,
                  operating system, and browser type.
                </li>
                <li>
                  <span className="font-semibold">Usage Data:</span> Information
                  about how you use our app, such as the pages you visit, the
                  features you use, and the time spent on our app.
                </li>
              </ul>

              <h2 class="text-2xl font-bold mb-4">
                How We Use the Information
              </h2>
              <h2 class="text-xl font-semibold mb-4">
                We use the information we collect to:
              </h2>

              <ul class="list-disc list-inside mb-4">
                <li>
                  Verify your identity and allow you to log in to our app.
                </li>
                <li>
                  Personalize your experience and improve our app&apos;s
                  functionality.
                </li>
                <li>
                  Communicate with you about updates, promotions, or other
                  information related to our app.{" "}
                </li>
                <li>
                  Analyze usage patterns to enhance the performance and user
                  experience of our app.
                </li>
              </ul>

              <h2 class="text-2xl font-bold mb-4"> Sharing Your Information</h2>
              <h2 class="text-xl font-semibold mb-4">
                We do not share your personal information with third parties
                except in the following circumstances:
              </h2>
              <ul class="list-disc list-inside mb-4">
                <li>
                  <span className="font-semibold">Service Providers:</span> We
                  may share your information with third-party service providers
                  who assist us in operating our app, conducting our business,
                  or serving our users, provided that those parties agree to
                  keep this information confidential.
                </li>
                <li>
                  <span className="font-semibold">Legal Requirements</span> We
                  may disclose your information if required to do so by law or
                  in response to valid requests by public authorities.
                </li>
              </ul>
              <h2 class="text-2xl font-bold mb-4">Data Security</h2>

              <p class="mb-4">
                We implement appropriate security measures to protect your
                information from unauthorized access, disclosure, alteration, or
                destruction. However, please note that no method of transmission
                over the internet or electronic storage is 100% secure.
              </p>

              <h2 class="text-2xl font-bold mb-4">Data Retention</h2>

              <p class="mb-4">
                We retain your information for as long as your account is active
                or as needed to provide you with our services. We may also
                retain and use your information to comply with our legal
                obligations, resolve disputes, and enforce our agreements.
              </p>

              <h2 class="text-2xl font-bold mb-4">Your Rights</h2>
              <h2 class="text-xl font-semibold mb-4">
                You have the right to:{" "}
              </h2>
              <ul class="list-disc list-inside mb-4">
                <li>
                  Access and update your personal information at any time
                  through your account settings.{" "}
                </li>
                <li>
                  Request the deletion of your personal information, subject to
                  certain legal obligations.{" "}
                </li>
                <li>
                  Opt-out of receiving promotional communications from us.{" "}
                </li>
              </ul>

              <h2 class="text-2xl font-bold mb-4">
                Changes to This Privacy Policy
              </h2>

              <p class="mb-4">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or for other operational, legal, or
                regulatory reasons. We will notify you of any significant
                changes by posting the new Privacy Policy on this page and
                updating the effective date.
              </p>

              <h2 class="text-2xl font-bold mb-4">Contact Us</h2>
              <p class="mb-4">
                If you have any questions or concerns about this Privacy Policy,
                please contact us at <span className="font-bold underline"><a href="mailto:contact@seogenieai.com">contact@seogenieai.com</a>.</span>
              </p>
              <h2 class="text-2xl font-bold mb-4">Consent</h2>
              <p class="mb-4">
                By using our app and providing your information through Google
                Login, you consent to this Privacy Policy.
              </p>
              <p class="mb-4">
                This privacy policy is subject to change without notice.
              </p>
            </div>
          </div>
        </Container>
      </Wrapper>
    </Wrapper>
  );
};
export default Page;
