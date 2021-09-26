import React from "react";
import {createTheme, ThemeProvider} from "@material-ui/core";
import {getConfig} from "../../i18n";


const config = getConfig();


const colors = {
  primary: "#b02434",
  secondary:"#3a2588",
  danger:"#F64E60",
}



export function MaterialThemeProvider(props) {
  const { children } = props;
  const theme = createTheme(
    /**
     * @see https://material-ui.com/customization/themes/#theme-configuration-variables
     */

    {
      overrides: {
        MuiOutlinedInput: {
          notchedOutline: { borderColor: '#E4E6EF !important'},
        },
        MuiFormLabel:{ root:{color:"#B5B5C3 !important"}}
      },
      direction:  config.rtl ? "rtl" : "ltr",
      typography: {
        fontFamily: ["Poppins"].join(",")
      },
      palette: {
        primary: {
          main: colors.primary
        },
        secondary: {
          main: colors.secondary
        },
        error: {
          main: colors.danger,
        }
      },

      /**
       * @see https://material-ui.com/customization/globals/#default-props
       */
      props: {
        MuiButtonBase: {
          disableRipple: false
        },
        MuiPopover: {
          elevation: 1
        }
      }
    }
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
