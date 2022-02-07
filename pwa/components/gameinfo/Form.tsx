import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { GameInfo } from "../../types/GameInfo";

interface Props {
  gameinfo?: GameInfo;
}

export const Form: FunctionComponent<Props> = ({ gameinfo }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(gameinfo["@id"], { method: "DELETE" });
      router.push("/game_infos");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>
        {gameinfo ? `Edit GameInfo ${gameinfo["@id"]}` : `Create GameInfo`}
      </h1>
      <Formik
        initialValues={gameinfo ? { ...gameinfo } : new GameInfo()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/game_infos" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/game_infos");
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
              <label className="form-control-label" htmlFor="_brandid">
                brandid
              </label>
              <input
                name="brandid"
                id="_brandid"
                value={values.brandid ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.brandid && touched.brandid ? " is-invalid" : ""
                }`}
                aria-invalid={errors.brandid && touched.brandid}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="brandid"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_language">
                language
              </label>
              <input
                name="language"
                id="_language"
                value={values.language ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.language && touched.language ? " is-invalid" : ""
                }`}
                aria-invalid={errors.language && touched.language}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="language"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_description">
                description
              </label>
              <input
                name="description"
                id="_description"
                value={values.description ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.description && touched.description ? " is-invalid" : ""
                }`}
                aria-invalid={errors.description && touched.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="description"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_userId">
                userId
              </label>
              <input
                name="userId"
                id="_userId"
                value={values.userId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.userId && touched.userId ? " is-invalid" : ""
                }`}
                aria-invalid={errors.userId && touched.userId}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="userId"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_lastModified">
                lastModified
              </label>
              <input
                name="lastModified"
                id="_lastModified"
                value={values.lastModified ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.lastModified && touched.lastModified
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.lastModified && touched.lastModified}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="lastModified"
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
      <Link href="/game_infos">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {gameinfo && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
