import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const TimerDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.serviceName)) {
                error["serviceName"] = `ServiceName field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.staffId)) {
                error["staffId"] = `StaffId field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.timerStatus)) {
                error["timerStatus"] = `TimerStatus field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            serviceName: _entity?.serviceName,staffId: _entity?.staffId,startTime: _entity?.startTime,endTime: _entity?.endTime,timerStatus: _entity?.timerStatus,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("timerDetails").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info TimerDetails created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in TimerDetails" });
        }
        setLoading(false);
    };

    

    

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create TimerDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="timerDetails-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="serviceName">ServiceName:</label>
                <InputText id="serviceName" className="w-full mb-3 p-inputtext-sm" value={_entity?.serviceName} onChange={(e) => setValByKey("serviceName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["serviceName"]) ? (
              <p className="m-0" key="error-serviceName">
                {error["serviceName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="staffId">StaffId:</label>
                <InputText id="staffId" className="w-full mb-3 p-inputtext-sm" value={_entity?.staffId} onChange={(e) => setValByKey("staffId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["staffId"]) ? (
              <p className="m-0" key="error-staffId">
                {error["staffId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="startTime">StartTime:</label>
                <Calendar id="startTime" value={_entity?.startTime ? new Date(_entity?.startTime) : new Date()} onChange={ (e) => setValByKey("startTime", e.value)} showTime hourFormat="24"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["startTime"]) ? (
              <p className="m-0" key="error-startTime">
                {error["startTime"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="endTime">EndTime:</label>
                <Calendar id="endTime" value={_entity?.endTime ? new Date(_entity?.endTime) : new Date()} onChange={ (e) => setValByKey("endTime", e.value)} showTime hourFormat="24"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["endTime"]) ? (
              <p className="m-0" key="error-endTime">
                {error["endTime"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="timerStatus">TimerStatus:</label>
                <InputText id="timerStatus" className="w-full mb-3 p-inputtext-sm" value={_entity?.timerStatus} onChange={(e) => setValByKey("timerStatus", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["timerStatus"]) ? (
              <p className="m-0" key="error-timerStatus">
                {error["timerStatus"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(TimerDetailsCreateDialogComponent);
