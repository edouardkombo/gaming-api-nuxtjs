import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Licensees } from "../../types/Licensees";

interface Props {
  licensees?: Licensees;
}

export const Form: FunctionComponent<Props> = ({ licensees }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(licensees["@id"], { method: "DELETE" });
      router.push("/licensees");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>
        {licensees ? `Edit Licensees ${licensees["@id"]}` : `Create Licensees`}
      </h1>
      <Formik
        initialValues={licensees ? { ...licensees } : new Licensees()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/licensees" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/licensees");
          } catch (error) {
            setStatus({
              isValid: false,
              msg: `${error.defaultErrorMsg}`,
            });
            setErrors(error.fields);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-control-label" htmlFor="_name">
                name
              </label>
              <input
                name="name"
                id="_name"
                value={values.name ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.name && touched.name ? " is-invalid" : ""
                }`}
                aria-invalid={errors.name && touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="name" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_title">
                title
              </label>
              <input
                name="title"
                id="_title"
                value={values.title ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.title && touched.title ? " is-invalid" : ""
                }`}
                aria-invalid={errors.title && touched.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="title"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_groupId">
                groupId
              </label>
              <input
                name="groupId"
                id="_groupId"
                value={values.groupId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.groupId && touched.groupId ? " is-invalid" : ""
                }`}
                aria-invalid={errors.groupId && touched.groupId}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="groupId"
            />

            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/licensees">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {licensees && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
