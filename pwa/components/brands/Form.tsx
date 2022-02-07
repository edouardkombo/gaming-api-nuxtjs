import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Brands } from "../../types/Brands";

interface Props {
  brands?: Brands;
}

export const Form: FunctionComponent<Props> = ({ brands }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(brands["@id"], { method: "DELETE" });
      router.push("/brands");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{brands ? `Edit Brands ${brands["@id"]}` : `Create Brands`}</h1>
      <Formik
        initialValues={brands ? { ...brands } : new Brands()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/brands" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/brands");
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
              <label className="form-control-label" htmlFor="_brand">
                brand
              </label>
              <input
                name="brand"
                id="_brand"
                value={values.brand ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.brand && touched.brand ? " is-invalid" : ""
                }`}
                aria-invalid={errors.brand && touched.brand}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="brand"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_stageUrl">
                stageUrl
              </label>
              <input
                name="stageUrl"
                id="_stageUrl"
                value={values.stageUrl ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.stageUrl && touched.stageUrl ? " is-invalid" : ""
                }`}
                aria-invalid={errors.stageUrl && touched.stageUrl}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="stageUrl"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_siteUrl">
                siteUrl
              </label>
              <input
                name="siteUrl"
                id="_siteUrl"
                value={values.siteUrl ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.siteUrl && touched.siteUrl ? " is-invalid" : ""
                }`}
                aria-invalid={errors.siteUrl && touched.siteUrl}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="siteUrl"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_path">
                path
              </label>
              <input
                name="path"
                id="_path"
                value={values.path ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.path && touched.path ? " is-invalid" : ""
                }`}
                aria-invalid={errors.path && touched.path}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="path" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_liveServer">
                liveServer
              </label>
              <input
                name="liveServer"
                id="_liveServer"
                value={values.liveServer ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.liveServer && touched.liveServer ? " is-invalid" : ""
                }`}
                aria-invalid={errors.liveServer && touched.liveServer}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="liveServer"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_liveSshPort">
                liveSshPort
              </label>
              <input
                name="liveSshPort"
                id="_liveSshPort"
                value={values.liveSshPort ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.liveSshPort && touched.liveSshPort ? " is-invalid" : ""
                }`}
                aria-invalid={errors.liveSshPort && touched.liveSshPort}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="liveSshPort"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_enabled">
                enabled
              </label>
              <input
                name="enabled"
                id="_enabled"
                value={values.enabled ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.enabled && touched.enabled ? " is-invalid" : ""
                }`}
                aria-invalid={errors.enabled && touched.enabled}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="enabled"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_groupName">
                groupName
              </label>
              <input
                name="groupName"
                id="_groupName"
                value={values.groupName ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.groupName && touched.groupName ? " is-invalid" : ""
                }`}
                aria-invalid={errors.groupName && touched.groupName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="groupName"
            />
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="_liveUpdateEnabled"
              >
                liveUpdateEnabled
              </label>
              <input
                name="liveUpdateEnabled"
                id="_liveUpdateEnabled"
                value={values.liveUpdateEnabled ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.liveUpdateEnabled && touched.liveUpdateEnabled
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.liveUpdateEnabled && touched.liveUpdateEnabled
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="liveUpdateEnabled"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_params">
                params
              </label>
              <input
                name="params"
                id="_params"
                value={values.params ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.params && touched.params ? " is-invalid" : ""
                }`}
                aria-invalid={errors.params && touched.params}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="params"
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
      <Link href="/brands">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {brands && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
