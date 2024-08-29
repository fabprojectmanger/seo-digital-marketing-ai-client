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
                Use of Google User Data
              </h2>
              <p className="mb-4">
                SEOGENIEAI uses Google user data solely for the purpose of
                providing and improving the application&apos;s functionality. This
                data is used to enhance the user experience by allowing access
                to relevant features and ensuring a seamless interaction within
                the application.
              </p>
              {/* <p className="mb-4">
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
              </ul> */}

              {/* <p className="mb-4">We use this data to:</p>

              <ul className="list-disc list-inside mb-4">
                <li>
                  Improve the App and provide you with a more personalized
                  experience.
                </li>
                <li>
                  Generate graphical representations of your website analytics
                  data, which we display within the App.
                </li>
              </ul> */}

              <h2 className="text-2xl font-bold mb-4">
                Sharing, Transferring, or Disclosing Google User Data
              </h2>
              <p className="mb-4">
                We do not share, transfer, or disclose Google user data to third
                parties except as necessary to provide or improve the
                functionality of the application. In instances where data is
                shared, it is done in accordance with Google&apos;s policies and with
                your consent.
              </p>
              {/* <h2 className="text-xl font-semibold mb-4">
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
              </ul> */}

              <h2 className="text-2xl font-bold mb-4">
                {" "}
                Data Protection Mechanisms for Sensitive Data
              </h2>
              {/* <h2 className="text-xl font-semibold mb-4">
                You can control how your information is used and shared by:
              </h2>
              <ul className="list-disc list-inside mb-4">
                <li>Opting out of certain data collection practices.</li>
                <li>Deleting your account.</li>
              </ul>
              <h2 className="text-2xl font-bold mb-4">
                Children&quot;s Privacy
              </h2> */}

              <p className="mb-4">
                We take the protection of your data seriously. Sensitive Google
                user data is protected using industry-standard encryption
                protocols both in transit and at rest. Access to this data is
                restricted to authorized personnel only, and we regularly review
                our security practices to ensure the safety and integrity of
                your information.
              </p>

              <h2 className="text-2xl font-bold mb-4">
                Sale of Google User Data
              </h2>

              <p className="mb-4">
                We do not sell Google user data to third parties. Any data
                collected is used solely for the purpose of providing and
                enhancing the services of SEOGENIEAI. We&apos;re not storing any
                data to SEOGENIEAI database.
              </p>
              <h2 className="text-2xl font-bold mb-4">
                Use of Google User Data for Other Purposes
              </h2>

              <p className="mb-4">
                Google user data collected by SEOGENIEAI is used exclusively for
                providing or improving the application&apos;s functionality. We
                do not use this data for any other purpose without your explicit
                consent.
              </p>
              <h2 className="text-2xl font-bold mb-4">
                Transfer of Google User Data to Third Parties
              </h2>

              <p className="mb-4">
                We may transfer Google user data to third parties only when
                necessary for providing or improving the application&apos;s
                functionality. These transfers are conducted in accordance with
                Google&apos;s guidelines and with your prior consent.
              </p>
              <h2 className="text-2xl font-bold mb-4">Scopes Discrepancy</h2>

              <p className="mb-4">
                We ensure that the scopes requested in our Cloud Console match
                the API calls made by the application. Any discrepancy between
                the scopes is promptly addressed to align with the intended use
                of the Google APIs.
              </p>
              <h2 className="text-2xl font-bold mb-4">
                Changes to This Privacy Policy
              </h2>

              <p className="mb-4">
                We may update our privacy policy from time to time. Any changes
                will be communicated to you, and your continued use of
                SEOGENIEAI will be subject to the updated policy.
              </p>

              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <span className="font-bold underline">
                  <a href="mailto:contact@seogenieai.com">
                    contact@seogenieai.com
                  </a>
                  .
                </span>
              </p>
            </div>
          </div>
        </Container>
      </Wrapper>
    </Wrapper>
  );
};
export default Page;
