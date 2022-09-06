import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { SortDataModel } from "shared/models/person";


interface SwitchSortProps {
    isCheckAll: boolean;
    handleSelectAll: () => void;
    sortType: SortDataModel[];
    isCheck: string[];
    handleClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SwitchSort: React.FC<SwitchSortProps> = (props) => {
    return (
        <>
            <MenuItem key={"SelectAll"} id={"SelectAll"}>
                <Checkbox
                    checked={props.isCheckAll}
                    onChange={props.handleSelectAll}
                    id="selectAll"
                    name="selectAll"
                    color="primary"
                    classes={{colorPrimary:"checkbox-color-primary"}}
                />
                <ListItemText primary={"Select All"} />
            </MenuItem>

            {props.sortType.map((name) => (
                <MenuItem key={name.id} id={name.id}>
                    <Checkbox
                        id={name.id}
                        key={name.id}
                        checked={props.isCheck.includes(name.id)}
                        onChange={props.handleClick}
                        color="primary"
                        classes={{colorPrimary:"checkbox-color-primary"}}
                    />
                    <ListItemText primary={name.title} />
                </MenuItem>
            ))}
        </>
    );
}
