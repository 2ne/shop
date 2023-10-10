import Header from "../components/header";
import Breadcrumb from "../components/breadcrumb";
import Main from "../components/main";
import Footer from "../components/footer";
import { Button, Form, Input } from "antd";
import { orgName } from "../org";

export default function Contact() {
  const breadcrumbItems = [{ label: "Contact", link: "/Contact" }];
  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="grid lg:!py-10">
        <div className="px-2 py-12 mb-12 bg-white isolate">
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 -ml-20 -z-10 aspect-[1155/678] w-[35rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:w-[70rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Contact {orgName}
            </h2>
            <p className="mt-3 text-lg leading-8 text-neutral-600">
              We'd love to help you with your enquiry.
            </p>
          </div>
          <Form
            layout="vertical"
            onFinish={onFinish}
            className="max-w-xl mx-auto mt-16 sm:mt-16 [&_.ant-input-lg]:border-color-[rgba(0,0,0,0.125)]"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <Form.Item label="First name" name="firstName">
                  <Input
                    size="large"
                    autoComplete="given-name"
                    className="w-full"
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item label="Last name" name="lastName">
                  <Input
                    size="large"
                    autoComplete="family-name"
                    className="w-full"
                  />
                </Form.Item>
              </div>
              <div className="sm:col-span-2">
                <Form.Item label="Email" name="email">
                  <Input
                    size="large"
                    type="email"
                    autoComplete="email"
                    className="w-full"
                  />
                </Form.Item>
              </div>
              <div className="sm:col-span-2">
                <Form.Item label="Phone number" name="phoneNumber">
                  <Input
                    size="large"
                    type="tel"
                    autoComplete="tel"
                    className="w-full"
                  />
                </Form.Item>
              </div>
              <div className="sm:col-span-2">
                <Form.Item label="Message" name="message">
                  <Input.TextArea size="large" rows={4} className="w-full" />
                </Form.Item>
              </div>
            </div>
            <div className="mt-10">
              <Form.Item>
                <Button type="primary" size="large" htmlType="submit" block>
                  Send message
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Main>
      <Footer />
    </>
  );
}
