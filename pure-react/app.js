
      const Person = (props) => {
        return React.createElement("div", {}, [
          React.createElement("h2", {}, props.name),
          React.createElement("p", {}, props.occupation),
        ]);
      };

      const App = () => {
        // React is using JSX instead of React.createElement
        return React.createElement("div", {}, [
          React.createElement("h1", { class: "title" }, "React is rendered"),
          React.createElement(
            Person,
            { name: "Yihua", occupation: "instructor" },
            null
          ),
          React.createElement(
            Person,
            { name: "Anrei", occupation: "Lead instructor" },
            null
          ),
          React.createElement(
            Person,
            { name: "Emily", occupation: "teacher" },
            null
          ),
        ]);
      };

    //   ReactDOM.render(
    //     React.createElement(App),
    //     document.getElementById("root")
    //   );

      const container = document.getElementById("root");
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(App));

