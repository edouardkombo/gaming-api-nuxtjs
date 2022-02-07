import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { GameCode } from "../../types/GameCode";

interface Props {
  gamecode?: GameCode;
}

export const Form: FunctionComponent<Props> = ({ gamecode }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(gamecode["@id"], { method: "DELETE" });
      router.push("/game_codes");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>
        {gamecode ? `Edit GameCode ${gamecode["@id"]}` : `Create GameCode`}
      </h1>
      <Formik
        initialValues={gamecode ? { ...gamecode } : new GameCode()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/game_codes" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/game_codes");
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
              <label className="form-control-label" htmlFor="_image">
                image
              </label>
              <input
                name="image"
                id="_image"
                value={values.image ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.image && touched.image ? " is-invalid" : ""
                }`}
                aria-invalid={errors.image && touched.image}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="image"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_rtp">
                rtp
              </label>
              <input
                name="rtp"
                id="_rtp"
                value={values.rtp ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.rtp && touched.rtp ? " is-invalid" : ""
                }`}
                aria-invalid={errors.rtp && touched.rtp}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="rtp" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_seoName">
                seoName
              </label>
              <input
                name="seoName"
                id="_seoName"
                value={values.seoName ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.seoName && touched.seoName ? " is-invalid" : ""
                }`}
                aria-invalid={errors.seoName && touched.seoName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="seoName"
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
      <Link href="/game_codes">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {gamecode && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
