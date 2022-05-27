import cl from "./form.module.css";

const Form = ({ children, onSubmit }) => {
  return (
    <form className={cl.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
