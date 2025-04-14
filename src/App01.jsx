import Form, { TextInput } from "@/components/Forms";
import loginSchema from "./utils/schema/loginSchema";

function App01() {
    const handSubmit = (data) => {
        console.log(data);
    };

    return (
        <Form schema={loginSchema} onSubmit={handSubmit}>
            <TextInput name="email" />

            <TextInput name="password" />

            <button>Login</button>
        </Form>
        // <Tabs onChange={(index) => console.log(index)}>
        //     <Tab title="Tab 1">Content of Tab 1</Tab>

        //     <Tab title="Tab 2">Content of Tab 2</Tab>

        //     <Tab title="Tab 3">Content of Tab 3</Tab>

        //     <Tab title="Tab 4">Content of Tab 4</Tab>

        //     <Tab title="Tab 5">Content of Tab 5</Tab>
        // </Tabs>
    );
}

export default App01;
