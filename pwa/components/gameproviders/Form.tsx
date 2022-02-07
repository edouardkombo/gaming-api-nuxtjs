import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { GameProviders } from "../../types/GameProviders";

interface Props {
  gameproviders?: GameProviders;
}

export const Form: FunctionComponent<Props> = ({ gameproviders }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(gameproviders["@id"], { method: "DELETE" });
      router.push("/game_providers");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>
        {gameproviders
          ? `Edit GameProviders ${gameproviders["@id"]}`
          : `Create GameProviders`}
      </h1>
      <Formik
        initialValues={
          gameproviders ? { ...gameproviders } : new GameProviders()
        }
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/game_providers" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/game_providers");
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
              <label className="form-control-label" htmlFor="_distributor">
                distributor
              </label>
              <input
                name="distributor"
                id="_distributor"
                value={values.distributor ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.distributor && touched.distributor ? " is-invalid" : ""
                }`}
                aria-invalid={errors.distributor && touched.distributor}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="distributor"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_mgaLicensed">
                mgaLicensed
              </label>
              <input
                name="mgaLicensed"
                id="_mgaLicensed"
                value={values.mgaLicensed ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.mgaLicensed && touched.mgaLicensed ? " is-invalid" : ""
                }`}
                aria-invalid={errors.mgaLicensed && touched.mgaLicensed}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="mgaLicensed"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_games">
                games
              </label>
              <input
                name="games"
                id="_games"
                value={values.games ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.games && touched.games ? " is-invalid" : ""
                }`}
                aria-invalid={errors.games && touched.games}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="games"
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
      <Link href="/game_providers">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {gameproviders && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
