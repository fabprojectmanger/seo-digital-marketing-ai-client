import React from "react";
import Wrapper from "../../components/wrapper/wrapper";
import H1 from "../../components/headings/h1";
import Container from "../../components/container/container";

const Page = () => {
  return (
    <Wrapper>
      <Wrapper className="mb-10 mt-16 max-sm-tab:mt-0">
        <Container className=" items-center flex justify-center">
          <div className="bg-white rounded-md flex justify-center">
            <div className="px-6 py-8 w-[70%]">
              <h1 className="text-3xl font-bold mb-2 text-center">
                Privacy Policy
              </h1>
              <br />
              <p>
                This Privacy Policy describes how your personal information is
                collected, used, and shared when you use our application
                (&quot;SEOGENIEAI&quot;).
              </p>

              <h2 className="text-2xl font-bold mb-4">
                Information We Collect
              </h2>
              <p className="mb-4">
                We collect information you provide directly to us when you use
                the App, including your name and email address. We also collect
                information about your use of the App, including your
                interactions with the App&apos;s features and content
              </p>
              <p className="mb-4">
                In addition, we access the following Google user data from
                Google Analytics:
              </p>

              <ul className="list-disc list-inside mb-4">
                <li>
                  <span className="font-semibold">User data:</span> This may
                  include information about your demographics, interests, and
                  online behavior.
                </li>
                <li>
                  <span className="font-semibold">Website analytics data:</span>{" "}
                  This includes information about your website traffic, such as
                  the number of visitors, page views, and bounce rate.
                </li>
              </ul>

              <p className="mb-4">We use this data to:</p>

              <ul className="list-disc list-inside mb-4">
                <li>
                  Improve the App and provide you with a more personalized
                  experience.
                </li>
                <li>
                  Generate graphical representations of your website analytics
                  data, which we display within the App.
                </li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">
                How We Use Your Information
              </h2>
              <h2 className="text-xl font-semibold mb-4">
                We use the information we collect to:
              </h2>

              <ul className="list-disc list-inside mb-4">
                <li>Provide, maintain, and improve the App.</li>
                <li>Personalize your experience.</li>
                <li>Communicate with you. </li>
                <li>Analyze usage trends.</li>
                <li>
                  Generate graphical representations of your website data.
                </li>
              </ul>

              <h2 className="text-2xl font-bold mb-4"> Your Choices</h2>
              <h2 className="text-xl font-semibold mb-4">
                You can control how your information is used and shared by:
              </h2>
              <ul className="list-disc list-inside mb-4">
                <li>Opting out of certain data collection practices.</li>
                <li>Deleting your account.</li>
              </ul>
              <h2 className="text-2xl font-bold mb-4">Children&quot;s Privacy</h2>

              <p className="mb-4">
                The App is not intended for children under the age of 13. We do
                not knowingly collect personal information from children under
                the age of 13.
              </p>

              <h2 className="text-2xl font-bold mb-4">
                Changes to This Privacy Policy
              </h2>

              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                the App.
              </p>

              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please
                contact us at {" "}
                <span className="font-bold underline">
                  <a href="mailto:contact@seogenieai.com">
                     contact@seogenieai.com
                  </a>
                  .
                </span>
              </p>
              <h2 className="text-2xl font-bold mb-4">
                Additional Information
              </h2>
              <p className="mb-4">
                Please note that this Privacy Policy only applies to the App. It
                does not apply to any third-party websites or services that you
                may access through the App.
              </p>
              <p className="mb-4">
                By using the App, you consent to the collection, use, and
                sharing of your information as described in this Privacy Policy.
              </p>
            </div>
          </div>
        </Container>
      </Wrapper>
    </Wrapper>
  );
};
export default Page;
