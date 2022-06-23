import cl from "./form.module.css";

interface IForm {
  children: React.ReactNode;
  onSubmit?: (evt: React.SyntheticEvent) => void;
}

const Form = ({ children, onSubmit }: IForm) => {
  return (
    <form className={cl.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
