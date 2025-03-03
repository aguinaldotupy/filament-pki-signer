var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/web-pki/lacuna-web-pki.js
var require_lacuna_web_pki = __commonJS({
  "node_modules/web-pki/lacuna-web-pki.js"(exports) {
    if (typeof window.lacunaWebPKIExtension === "undefined") {
      window.lacunaWebPKIExtension = null;
    }
    window.LacunaWebPKI = null;
    LacunaWebPKI = function(license) {
      this.license = null;
      this.defaultFailCallback = null;
      this.angularScope = null;
      this.ngZone = null;
      this.brand = null;
      this.restPkiUrl = null;
      this.useDomainNativePool = false;
      this.mobileIntegrationMode = null;
      if (license) {
        this.license = license;
      }
      if (this.isSupportedMobile && window.$ && window.$.blockUI) {
        try {
          window.$.blockUI.defaults.bindEvents = false;
          this._log("blockUI bindEvents disabled");
        } catch (ex) {
          this._log("Error disabling blockUI bindEvents: ", ex);
        }
      }
    };
    (function($) {
      $.Promise = function(angularScope, ngZone) {
        this.successCallback = function() {
        };
        this.failCallback = null;
        this.angularScope = angularScope;
        this.ngZone = ngZone;
      };
      $.Promise.prototype.success = function(callback) {
        this.successCallback = callback;
        return this;
      };
      $.Promise.prototype.error = function(callback) {
        this.failCallback = function(ex) {
          callback(ex.message, ex.error, ex.origin, ex.code);
        };
        return this;
      };
      $.Promise.prototype.fail = function(callback) {
        this.failCallback = callback;
        return this;
      };
      $.Promise.prototype._invokeSuccess = function(result, delay) {
        if (delay > 0) {
          var self = this;
          setTimeout(function() {
            self._invokeSuccess(result);
          }, delay);
        } else {
          var callback = this.successCallback || function() {
            $._log("Success ignored (no callback registered)");
          };
          this._apply(function() {
            callback(result);
          });
        }
      };
      $.Promise.prototype._invokeError = function(ex, delay) {
        if (delay > 0) {
          var self = this;
          setTimeout(function() {
            self._invokeError(ex);
          }, delay);
        } else {
          var callback = this.failCallback || function(ex2) {
            throw "Web PKI error originated at " + ex2.origin + ": " + ex2.message + "\n" + ex2.complete + "\ncode: " + ex2.code;
          };
          this._apply(function() {
            callback({
              userMessage: ex.userMessage || ex.message,
              message: ex.message,
              error: ex.complete,
              origin: ex.origin,
              code: ex.code
            });
          });
        }
      };
      $.Promise.prototype._apply = function(callback) {
        if (this.angularScope) {
          var phase = this.angularScope.$root.$$phase;
          if (phase == "$apply" || phase == "$digest") {
            callback();
          } else {
            this.angularScope.$apply(function() {
              callback();
            });
          }
        } else if (this.ngZone) {
          this.ngZone.run(function() {
            callback();
          });
        } else {
          callback();
        }
      };
      $._installUrl = "https://get.webpkiplugin.com/";
      $._chromeExtensionId = "dcngeagmmhegagicpcmpinaoklddcgon";
      $._firefoxExtensionId = "webpki-beta@lacunasoftware.com";
      $._edgeExtensionId = "nedeegdmhlnmboboahchfpkmdnnemapd";
      $._edgeLegacyProductId = "d2798a85-9698-425a-add7-3db79a39ca8a";
      $._chromeExtensionFirstVersionWithSelfUpdate = "2.0.20";
      $._jslibVersion = "2.16.3";
      $._mobileSupported = true;
      $._buildChannel = "stable";
      $._extensionRequiredVersion = "2.16.0";
      $._chromeNativeWinRequiredVersion = "2.12.3";
      $._chromeNativeLinuxRequiredVersion = "2.13.3";
      $._chromeNativeMacRequiredVersion = "2.13.3";
      $._ieAddonRequiredVersion = "2.9.1";
      $._mobileRequiredVersion = "3.2.0";
      $._chromeInstallationStates = {
        INSTALLED: 0,
        EXTENSION_NOT_INSTALLED: 1,
        EXTENSION_OUTDATED: 2,
        NATIVE_NOT_INSTALLED: 3,
        NATIVE_OUTDATED: 4
      };
      $._certKeyUsages = {
        crlSign: 2,
        dataEncipherment: 16,
        decipherOnly: 32768,
        digitalSignature: 128,
        encipherOnly: 1,
        keyAgreement: 8,
        keyCertSign: 4,
        keyEncipherment: 32,
        nonRepudiation: 64
      };
      $._certExtendedKeyUsages = {
        clientAuth: 1,
        serverAuth: 2,
        codeSigning: 4,
        emailProtection: 8,
        timeStamping: 16,
        ocspSigning: 32,
        ipsecEndSystem: 64,
        ipsecTunnel: 128,
        ipsecUser: 256,
        any: 512
      };
      $.apiVersions = {
        v1_0: "1.0",
        v1_1: "1.1",
        v1_2: "1.2",
        v1_3: "1.3",
        v1_4: "1.4",
        v1_4_1: "1.4.1",
        v1_5: "1.5",
        v1_5_1: "1.5.1",
        v1_5_2: "1.5.2",
        v1_6: "1.6.0",
        v1_6_1: "1.6.1",
        v1_7_0: "1.7.0",
        v1_7_2: "1.7.2",
        v1_8_0: "1.8.0",
        v1_8_1: "1.8.1",
        v1_8_2: "1.8.2",
        v1_9_0: "1.9.0",
        latest: "latest"
      };
      $._apiMap = {
        nativeWin: {},
        nativeLinux: {},
        nativeMac: {},
        ieAddon: {},
        extension: {},
        mobile: {}
      };
      $._apiMap.nativeWin[$.apiVersions.v1_0] = "2.1.0";
      $._apiMap.nativeWin[$.apiVersions.v1_1] = "2.3.0";
      $._apiMap.nativeWin[$.apiVersions.v1_2] = "2.4.1";
      $._apiMap.nativeWin[$.apiVersions.v1_3] = "2.5.0";
      $._apiMap.nativeWin[$.apiVersions.v1_4] = "2.6.2";
      $._apiMap.nativeWin[$.apiVersions.v1_4_1] = "2.6.5";
      $._apiMap.nativeWin[$.apiVersions.v1_5] = "2.8.0";
      $._apiMap.nativeWin[$.apiVersions.v1_5_1] = "2.8.1";
      $._apiMap.nativeWin[$.apiVersions.v1_5_2] = "2.9.0";
      $._apiMap.nativeWin[$.apiVersions.v1_6] = "2.10.0";
      $._apiMap.nativeWin[$.apiVersions.v1_6_1] = "2.10.1";
      $._apiMap.nativeWin[$.apiVersions.v1_7_0] = "2.11.0";
      $._apiMap.nativeWin[$.apiVersions.v1_7_2] = "2.11.0";
      $._apiMap.nativeWin[$.apiVersions.v1_8_0] = "2.12.0";
      $._apiMap.nativeWin[$.apiVersions.v1_8_1] = "2.12.1";
      $._apiMap.nativeWin[$.apiVersions.v1_8_2] = "2.12.3";
      $._apiMap.nativeWin[$.apiVersions.v1_9_0] = "2.12.3";
      $._apiMap.ieAddon[$.apiVersions.v1_0] = "2.0.4";
      $._apiMap.ieAddon[$.apiVersions.v1_1] = "2.1.1";
      $._apiMap.ieAddon[$.apiVersions.v1_2] = "2.2.4";
      $._apiMap.ieAddon[$.apiVersions.v1_3] = "2.3.0";
      $._apiMap.ieAddon[$.apiVersions.v1_4] = "2.4.2";
      $._apiMap.ieAddon[$.apiVersions.v1_4_1] = "2.4.5";
      $._apiMap.ieAddon[$.apiVersions.v1_5] = "2.5.0";
      $._apiMap.ieAddon[$.apiVersions.v1_5_1] = "2.5.2";
      $._apiMap.ieAddon[$.apiVersions.v1_5_2] = "2.6.0";
      $._apiMap.ieAddon[$.apiVersions.v1_6] = "2.7.0";
      $._apiMap.ieAddon[$.apiVersions.v1_6_1] = "2.7.2";
      $._apiMap.ieAddon[$.apiVersions.v1_7_0] = "2.8.0";
      $._apiMap.ieAddon[$.apiVersions.v1_7_2] = "2.8.0";
      $._apiMap.ieAddon[$.apiVersions.v1_8_0] = "2.9.0";
      $._apiMap.ieAddon[$.apiVersions.v1_8_1] = "2.9.1";
      $._apiMap.ieAddon[$.apiVersions.v1_8_2] = "2.9.1";
      $._apiMap.ieAddon[$.apiVersions.v1_9_0] = "2.9.1";
      $._apiMap.nativeLinux[$.apiVersions.v1_0] = "2.0.0";
      $._apiMap.nativeLinux[$.apiVersions.v1_1] = "2.4.0";
      $._apiMap.nativeLinux[$.apiVersions.v1_2] = "2.6.2";
      $._apiMap.nativeLinux[$.apiVersions.v1_3] = "2.7.0";
      $._apiMap.nativeLinux[$.apiVersions.v1_4] = "2.7.4";
      $._apiMap.nativeLinux[$.apiVersions.v1_4_1] = "2.7.4";
      $._apiMap.nativeLinux[$.apiVersions.v1_5] = "2.9.0";
      $._apiMap.nativeLinux[$.apiVersions.v1_5_1] = "2.9.0";
      $._apiMap.nativeLinux[$.apiVersions.v1_5_2] = "2.9.5";
      $._apiMap.nativeLinux[$.apiVersions.v1_6] = "2.10.0";
      $._apiMap.nativeLinux[$.apiVersions.v1_6_1] = "2.10.0";
      $._apiMap.nativeLinux[$.apiVersions.v1_7_0] = "2.12.0";
      $._apiMap.nativeLinux[$.apiVersions.v1_7_2] = "2.12.1";
      $._apiMap.nativeLinux[$.apiVersions.v1_8_0] = "2.13.0";
      $._apiMap.nativeLinux[$.apiVersions.v1_8_1] = "2.13.1";
      $._apiMap.nativeLinux[$.apiVersions.v1_8_2] = "2.13.3";
      $._apiMap.nativeLinux[$.apiVersions.v1_9_0] = "2.13.3";
      $._apiMap.nativeMac[$.apiVersions.v1_0] = "2.3.0";
      $._apiMap.nativeMac[$.apiVersions.v1_1] = "2.4.0";
      $._apiMap.nativeMac[$.apiVersions.v1_2] = "2.6.1";
      $._apiMap.nativeMac[$.apiVersions.v1_3] = "2.7.0";
      $._apiMap.nativeMac[$.apiVersions.v1_4] = "2.7.4";
      $._apiMap.nativeMac[$.apiVersions.v1_4_1] = "2.7.4";
      $._apiMap.nativeMac[$.apiVersions.v1_5] = "2.9.0";
      $._apiMap.nativeMac[$.apiVersions.v1_5_1] = "2.9.0";
      $._apiMap.nativeMac[$.apiVersions.v1_5_2] = "2.9.5";
      $._apiMap.nativeMac[$.apiVersions.v1_6] = "2.10.0";
      $._apiMap.nativeMac[$.apiVersions.v1_6_1] = "2.10.0";
      $._apiMap.nativeMac[$.apiVersions.v1_7_0] = "2.12.0";
      $._apiMap.nativeMac[$.apiVersions.v1_7_2] = "2.12.1";
      $._apiMap.nativeMac[$.apiVersions.v1_8_0] = "2.13.0";
      $._apiMap.nativeMac[$.apiVersions.v1_8_1] = "2.13.1";
      $._apiMap.nativeMac[$.apiVersions.v1_8_2] = "2.13.3";
      $._apiMap.nativeMac[$.apiVersions.v1_9_0] = "2.13.3";
      $._apiMap.extension[$.apiVersions.v1_0] = "2.3.2";
      $._apiMap.extension[$.apiVersions.v1_1] = "2.7.0";
      $._apiMap.extension[$.apiVersions.v1_2] = "2.9.1";
      $._apiMap.extension[$.apiVersions.v1_3] = "2.10.1";
      $._apiMap.extension[$.apiVersions.v1_4] = "2.11.7";
      $._apiMap.extension[$.apiVersions.v1_4_1] = "2.11.7";
      $._apiMap.extension[$.apiVersions.v1_5] = "2.13.0";
      $._apiMap.extension[$.apiVersions.v1_5_1] = "2.13.0";
      $._apiMap.extension[$.apiVersions.v1_5_2] = "2.14.2";
      $._apiMap.extension[$.apiVersions.v1_6] = "2.15.0";
      $._apiMap.extension[$.apiVersions.v1_6_1] = "2.15.0";
      $._apiMap.extension[$.apiVersions.v1_7_0] = "2.16.0";
      $._apiMap.extension[$.apiVersions.v1_7_2] = "2.16.0";
      $._apiMap.extension[$.apiVersions.v1_8_0] = "2.16.0";
      $._apiMap.extension[$.apiVersions.v1_8_1] = "2.16.0";
      $._apiMap.extension[$.apiVersions.v1_8_2] = "2.16.0";
      $._apiMap.extension[$.apiVersions.v1_9_0] = "2.17.0";
      $._apiMap.mobile[$.apiVersions.v1_0] = "1.1.0";
      $._apiMap.mobile[$.apiVersions.v1_1] = "1.1.0";
      $._apiMap.mobile[$.apiVersions.v1_2] = "1.1.0";
      $._apiMap.mobile[$.apiVersions.v1_3] = "1.1.0";
      $._apiMap.mobile[$.apiVersions.v1_4] = "1.1.0";
      $._apiMap.mobile[$.apiVersions.v1_4_1] = "1.1.0";
      $._apiMap.mobile[$.apiVersions.v1_5] = "1.1.0";
      $._apiMap.mobile[$.apiVersions.v1_5_1] = "1.1.0";
      $._apiMap.mobile[$.apiVersions.v1_5_2] = "1.1.0";
      $._apiMap.mobile[$.apiVersions.v1_6] = "2.7.0";
      $._apiMap.mobile[$.apiVersions.v1_6_1] = "2.7.0";
      $._apiMap.mobile[$.apiVersions.v1_7_0] = "3.0.0";
      $._apiMap.mobile[$.apiVersions.v1_7_2] = "3.0.0";
      $._apiMap.mobile[$.apiVersions.v1_8_0] = "3.2.0";
      $._apiMap.mobile[$.apiVersions.v1_8_1] = "3.2.0";
      $._apiMap.mobile[$.apiVersions.v1_8_2] = "3.2.0";
      $._apiMap.mobile[$.apiVersions.v1_9_0] = "3.2.0";
      $._apiMap.nativeWin[$.apiVersions.latest] = $._chromeNativeWinRequiredVersion;
      $._apiMap.ieAddon[$.apiVersions.latest] = $._ieAddonRequiredVersion;
      $._apiMap.nativeLinux[$.apiVersions.latest] = $._chromeNativeLinuxRequiredVersion;
      $._apiMap.nativeMac[$.apiVersions.latest] = $._chromeNativeMacRequiredVersion;
      $._apiMap.extension[$.apiVersions.latest] = $._extensionRequiredVersion;
      $._apiMap.mobile[$.apiVersions.latest] = $._mobileRequiredVersion;
      $._nativeInfo = {};
      $.installationStates = {
        INSTALLED: 0,
        NOT_INSTALLED: 1,
        OUTDATED: 2,
        BROWSER_NOT_SUPPORTED: 3
      };
      $.isSupportedMobile = void 0;
      $.certificateValidationLevels = {
        full: "full",
        offline: "offline"
      };
      $.padesPolicies = {
        basic: "basic",
        brazilAdrBasica: "brazilAdrBasica"
      };
      $.cadesPolicies = {
        bes: "cadesBes",
        brazilAdrBasica: "brazilAdrBasica"
      };
      $.xmlPolicies = {
        xmlDSig: "xmlDSig",
        xadesBes: "xadesBes",
        brazilNFe: "brazilNFe",
        brazilAdrBasica: "brazilAdrBasica"
      };
      $.cadesAcceptablePolicies = {
        pkiBrazil: [
          "brazilAdrBasica",
          "brazilAdrTempo",
          "brazilAdrValidacao",
          "brazilAdrCompleta",
          "brazilAdrArquivamento"
        ]
      };
      $.xmlAcceptablePolicies = {
        pkiBrazil: [
          "brazilAdrBasica",
          "brazilAdrTempo"
        ]
      };
      $.standardTrustArbitrators = {
        pkiBrazil: {
          type: "standard",
          standardArbitrator: "pkiBrazil"
        },
        pkiItaly: {
          type: "standard",
          standardArbitrator: "pkiItaly"
        },
        pkiPeru: {
          type: "standard",
          standardArbitrator: "pkiPeru"
        },
        windows: {
          type: "standard",
          standardArbitrator: "windows"
        }
      };
      $.xmlInsertionOptions = {
        appendChild: "appendChild",
        prependChild: "prependChild",
        appendSibling: "appendSibling",
        prependSibling: "prependSibling"
      };
      $.outputModes = {
        showSaveFileDialog: "showSaveFileDialog",
        saveInFolder: "saveInFolder",
        autoSave: "autoSave",
        returnContent: "returnContent"
      };
      $.trustArbitratorTypes = {
        trustedRoot: "trustedRoot",
        tsl: "tsl",
        standard: "standard"
      };
      $.padesPaperSizes = {
        custom: "custom",
        a0: "a0",
        a1: "a1",
        a2: "a2",
        a3: "a3",
        a4: "a4",
        a5: "a5",
        a6: "a6",
        a7: "a7",
        a8: "a8",
        letter: "letter",
        legal: "legal",
        ledger: "ledger"
      };
      $.padesHorizontalAlign = {
        left: "left",
        center: "center",
        rigth: "rigth"
      };
      $.padesVerticalAlign = {
        top: "top",
        center: "center",
        bottom: "bottom"
      };
      $.padesMeasurementUnits = {
        centimeters: "centimeters",
        pdfPoints: "pdfPoints"
      };
      $.padesPageOrientations = {
        auto: "auto",
        portrait: "portrait",
        landscape: "landscape"
      };
      $.padesAutoPositioningHorizontalDirections = {
        leftToRight: "leftToRight",
        rightToLeft: "rightToLeft"
      };
      $.padesAutoPositioningVerticalDirections = {
        topDown: "topDown",
        bottomUp: "bottomUp"
      };
      $.markElementTypes = {
        text: "text",
        image: "image"
      };
      $.markTextStyle = {
        normal: 0,
        bold: 1,
        italic: 2
      };
      $.passwordPolicies = {
        lettersAndNumbers: 1,
        upperAndLowerCase: 2,
        specialCharacters: 4
      };
      $.pkcs11Modules = {
        safeSign: { win: "aetpkss1.dll", linux: "libaetpkss.so.3", mac: "libaetpkss.dylib" },
        safeNet: { win: "eTPKCS11.dll", linux: "libeToken.so", mac: "libeToken.dylib" }
      };
      $.mobileIntegrationModes = {
        appIntegration: "appIntegration",
        browserIntegration: "browserIntegration"
      };
      $.encryptionParameters = {
        rsaEncryptionPkcs1: "RSAEncryptionPkcs1",
        rsaEncryptionOaepSHA1: "RSAEncryptionOaepSHA1",
        rsaEncryptionOaepSHA256: "RSAEncryptionOaepSHA256",
        rsaEncryptionOaepSHA384: "RSAEncryptionOaepSHA384",
        rsaEncryptionOaepSHA512: "RSAEncryptionOaepSHA512"
      };
      $._parseDataUrl = function(url) {
        var match = /^data:(.+);base64,(.+)$/.exec(url);
        if (!match) {
          $._log("failed to parse data url");
          return null;
        }
        return {
          mimeType: match[1],
          content: match[2]
        };
      };
      $._downloadResource = function(url, callBack) {
        $._log("resolving resource reference: " + url);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.onload = function() {
          var responseReader = new FileReader();
          responseReader.onloadend = function() {
            $._log("resource reference resolved");
            var resource = $._parseDataUrl(responseReader.result);
            callBack(resource);
          };
          responseReader.readAsDataURL(xhr.response);
        };
        xhr.send();
      };
      $._getRequestOsP11Modules = function(p11Modules) {
        if (!p11Modules || !p11Modules.length) {
          return null;
        }
        var osModules = [];
        for (var i2 = 0; i2 < p11Modules.length; i2++) {
          if ($._nativeInfo.os === "Windows") {
            osModules.push(p11Modules[i2].win);
          } else if ($._nativeInfo.os === "Linux") {
            osModules.push(p11Modules[i2].linux);
          } else if ($._nativeInfo.os === "Darwin") {
            osModules.push(p11Modules[i2].mac);
          }
        }
        return osModules;
      };
      $._handleP11ModulesArgs = function(args, request) {
        var p11Modules = null;
        var tokenSerialNumber = null;
        if (args.token && typeof args.token === "object") {
          p11Modules = [args.token.pkcs11Module];
          tokenSerialNumber = args.token.serialNumber;
        }
        request.pkcs11Modules = p11Modules || request.pkcs11Modules;
        request.tokenSerialNumber = tokenSerialNumber || request.tokenSerialNumber;
      };
      $.errorCodes = {
        UNDEFINED: "undefined",
        INTERNAL: "internal",
        USER_CANCELLED: "user_cancelled",
        OS_NOT_SUPPORTED: "os_not_supported",
        ADDON_TIMEOUT: "addon_timeout",
        ADDON_NOT_DETECTED: "addon_not_detected",
        ADDON_SEND_COMMAND_FAILURE: "addon_send_command_failure",
        CERTIFICATE_NOT_FOUND: "certificate_not_found",
        COMMAND_UNKNOWN: "command_unknown",
        COMMAND_NOT_SUPPORTED: "command_not_supported",
        COMMAND_PARAMETER_NOT_SET: "command_parameter_not_set",
        COMMAND_INVALID_PARAMETER: "command_invalid_parameter",
        COMMAND_PARAMETER_NOT_SUPPORTED: "command_parameter_not_supported",
        NATIVE_CONNECT_FAILURE: "native_connect_failure",
        NATIVE_DISCONNECTED: "native_disconnected",
        NATIVE_NO_RESPONSE: "native_no_response",
        REST_PKI_GET_PENDING_SIGNATURE: "rest_pki_get_pending_signature",
        REST_PKI_POST_SIGNATURE: "rest_pki_post_signature",
        REST_PKI_INVALID_CERTIFICATE: "rest_pki_invalid_certificate",
        LICENSE_NOT_SET: "license_not_set",
        LICENSE_INVALID: "license_invalid",
        LICENSE_RESTRICTED: "license_restricted",
        LICENSE_EXPIRED: "license_expired",
        LICENSE_DOMAIN_NOT_ALLOWED: "license_domain_not_allowed",
        VALIDATION_ERROR: "validation_error",
        P11_ERROR: "p11_error",
        P11_TOKEN_NOT_FOUND: "p11_token_not_found",
        P11_NOT_SUPPORTED: "p11_not_supported",
        KEYSET_NOT_FOUND: "keyset_not_found",
        ALGORITHM_NOT_SUPPORTED: "algorithm_not_supported",
        SIGNED_PDF_TO_MARK: "signed_pdf_to_mark",
        JSON_ERROR: "json_error",
        IO_ERROR: "io_error",
        KEYCHAIN_ERROR: "keychain_error",
        KEYCHAIN_SIGN_ERROR: "keychain_sign_error",
        DECODE_ERROR: "decode_error",
        CSP_KEYSET_NOT_DEFINED: "csp_keyset_not_defined",
        CSP_INVALID_ALGORITHM: "csp_invalid_algorithm",
        CSP_INVALID_PROVIDER_TYPE: "csp_invalid_provider_type",
        MOBILE_TIMEOUT: "mobile_timeout",
        MOBILE_NOT_AUTHORIZED: "mobile_not_authorized",
        MOBILE_SEND_MESSAGE: "mobile_send_message",
        COMMAND_DECRYPT_ERROR: "command_decrypt_error",
        BLOCKED_DOMAIN: "blocked_domain",
        INVALID_OPERATION: "invalid_operation"
      };
      $._compareVersions = function(v1, v2) {
        var v1parts = v1.split(".");
        var v2parts = v2.split(".");
        function isPositiveInteger(x) {
          return /^\d+$/.test(x);
        }
        function validateParts(parts) {
          for (var i3 = 0; i3 < parts.length; ++i3) {
            if (!isPositiveInteger(parts[i3])) {
              return false;
            }
          }
          return true;
        }
        if (!validateParts(v1parts) || !validateParts(v2parts)) {
          return NaN;
        }
        for (var i2 = 0; i2 < v1parts.length; ++i2) {
          if (v2parts.length === i2) {
            return 1;
          }
          var v1p = parseInt(v1parts[i2], 10);
          var v2p = parseInt(v2parts[i2], 10);
          if (v1p === v2p) {
            continue;
          }
          if (v1p > v2p) {
            return 1;
          }
          return -1;
        }
        if (v1parts.length != v2parts.length) {
          return -1;
        }
        return 0;
      };
      $._log = function(message, data) {
        if (window.console) {
          if (data) {
            window.console.log(message, data);
          } else {
            window.console.log(message);
          }
        }
      };
      $._createContext = function(args) {
        var promise = new $.Promise(this.angularScope, this.ngZone);
        if (args && args.success) {
          promise.success(args.success);
        }
        if (args && args.fail) {
          promise.fail(args.fail);
        } else if (args && args.error) {
          promise.error(args.error);
        } else {
          promise.fail(this.defaultFailCallback);
        }
        var context = {
          promise,
          license: this.license,
          useDomainNativePool: this.useDomainNativePool,
          instance: $._supportedMobileDetected ? this : void 0
        };
        return context;
      };
      $.init = function(args) {
        if (!args) {
          args = {};
        } else if (typeof args === "function") {
          args = {
            ready: args
          };
        }
        if (args.license) {
          this.license = args.license;
        }
        if (args.defaultError) {
          this.defaultFailCallback = function(ex) {
            args.defaultError(ex.message, ex.error, ex.origin, ex.code);
          };
        }
        if (args.defaultFail) {
          this.defaultFailCallback = args.defaultFail;
        }
        if (args.angularScope) {
          this.angularScope = args.angularScope;
        }
        if (args.ngZone) {
          this.ngZone = args.ngZone;
        }
        if (args.brand) {
          this.brand = args.brand;
        }
        if (args.restPkiUrl) {
          this.restPkiUrl = args.restPkiUrl[args.restPkiUrl.length - 1] === "/" ? args.restPkiUrl : args.restPkiUrl + "/";
        }
        this.useDomainNativePool = args.useDomainNativePool === true;
        var self = this;
        var onCheckInstalledSuccess = function(result) {
          if (result.isInstalled) {
            if (args.ready) {
              args.ready();
            } else {
              $._log("Web PKI ready (no callback registered)");
            }
          } else {
            if (args.notInstalled) {
              args.notInstalled(result.status, result.message, result.browserSpecificStatus);
            } else {
              self.redirectToInstallPage();
            }
          }
        };
        var context = this._createContext({
          success: onCheckInstalledSuccess,
          fail: args.fail,
          error: args.error
        });
        $._requestHandler.checkInstalled(context, args.requiredApiVersion);
        return context.promise;
      };
      $.getVersion = function(args) {
        var context = this._createContext(args);
        $._requestHandler.sendCommand(context, "getVersion", null);
        return context.promise;
      };
      $.listCertificates = function(args) {
        if (!args) {
          args = {};
        } else if (args.filter) {
          if (typeof args.filter !== "function") {
            if (typeof args.filter === "boolean") {
              throw 'args.filter must be a function (hint: if you used "pki.filters.xxx()", try removing the "()")';
            } else {
              throw "args.filter must be a function, received " + typeof args.filter;
            }
          }
        }
        var context = this._createContext(args);
        $._requestHandler.sendCommand(context, "listCertificates", null, function(result) {
          return $._processCertificates(result, args.filter, args.selectId, args.selectOptionFormatter);
        });
        return context.promise;
      };
      $._processCertificate = function(cert) {
        cert.validityStart = new Date(cert.validityStart);
        cert.validityEnd = new Date(cert.validityEnd);
        cert.keyUsage = $._processKeyUsage(cert.keyUsage);
        cert.extendedKeyUsage = $._processExtendedKeyUsage(cert.extendedKeyUsage);
        if (cert.pkiBrazil && cert.pkiBrazil.dateOfBirth) {
          var s = cert.pkiBrazil.dateOfBirth;
          cert.pkiBrazil.dateOfBirth = new Date(parseInt(s.slice(0, 4), 10), parseInt(s.slice(5, 7), 10) - 1, parseInt(s.slice(8, 10), 10));
        }
      };
      $._processCertificates = function(result, filter, selectId, selectOptionFormatter) {
        var toReturn = [];
        for (var i2 = 0; i2 < result.length; i2++) {
          var cert = result[i2];
          $._processCertificate(cert);
          if (filter) {
            if (filter(cert)) {
              toReturn.push(cert);
            }
          } else {
            toReturn.push(cert);
          }
        }
        toReturn.sort(function(a, b) {
          var aName = a.subjectName;
          var bName = b.subjectName;
          if (!aName || !bName) {
            return !aName && bName ? 1 : -1;
          }
          aName = aName.toLowerCase();
          bName = bName.toLowerCase();
          if (aName > bName) {
            return 1;
          } else if (aName < bName) {
            return -1;
          } else {
            return a.validityEnd > b.validityEnd ? -1 : a.validityEnd < b.validityEnd ? 1 : 0;
          }
        });
        if (selectId) {
          if (!selectOptionFormatter) {
            selectOptionFormatter = function(c2) {
              return c2.subjectName + " (issued by " + c2.issuerName + ")";
            };
          }
          var select = document.getElementById(selectId);
          while (select.options.length > 0) {
            select.remove(0);
          }
          for (var j = 0; j < toReturn.length; j++) {
            var c = toReturn[j];
            var option = document.createElement("option");
            option.value = c.thumbprint;
            option.text = selectOptionFormatter(c);
            select.add(option);
          }
        }
        return toReturn;
      };
      $._processKeyUsage = function(keyUsageValue) {
        return {
          crlSign: (keyUsageValue & $._certKeyUsages.crlSign) !== 0,
          dataEncipherment: (keyUsageValue & $._certKeyUsages.dataEncipherment) !== 0,
          decipherOnly: (keyUsageValue & $._certKeyUsages.decipherOnly) !== 0,
          digitalSignature: (keyUsageValue & $._certKeyUsages.digitalSignature) !== 0,
          encipherOnly: (keyUsageValue & $._certKeyUsages.encipherOnly) !== 0,
          keyAgreement: (keyUsageValue & $._certKeyUsages.keyAgreement) !== 0,
          keyCertSign: (keyUsageValue & $._certKeyUsages.keyCertSign) !== 0,
          keyEncipherment: (keyUsageValue & $._certKeyUsages.keyEncipherment) !== 0,
          nonRepudiation: (keyUsageValue & $._certKeyUsages.nonRepudiation) !== 0
        };
      };
      $._processExtendedKeyUsage = function(extendedKeyUsageValue) {
        if (typeof extendedKeyUsageValue !== "number") {
          return null;
        }
        return {
          clientAuth: (extendedKeyUsageValue & $._certExtendedKeyUsages.clientAuth) !== 0,
          serverAuth: (extendedKeyUsageValue & $._certExtendedKeyUsages.serverAuth) !== 0,
          codeSigning: (extendedKeyUsageValue & $._certExtendedKeyUsages.codeSigning) !== 0,
          emailProtection: (extendedKeyUsageValue & $._certExtendedKeyUsages.emailProtection) !== 0,
          timeStamping: (extendedKeyUsageValue & $._certExtendedKeyUsages.timeStamping) !== 0,
          ocspSigning: (extendedKeyUsageValue & $._certExtendedKeyUsages.ocspSigning) !== 0,
          ipsecEndSystem: (extendedKeyUsageValue & $._certExtendedKeyUsages.ipsecEndSystem) !== 0,
          ipsecTunnel: (extendedKeyUsageValue & $._certExtendedKeyUsages.ipsecTunnel) !== 0,
          ipsecUser: (extendedKeyUsageValue & $._certExtendedKeyUsages.ipsecUser) !== 0,
          any: (extendedKeyUsageValue & $._certExtendedKeyUsages.any) !== 0
        };
      };
      $._processSignResult = function(result) {
        if (!result || !result.signatureInfo) {
          return result;
        }
        if (result.signatureInfo.signerCertificate) {
          $._processCertificate(result.signatureInfo.signerCertificate);
        }
        if (result.signatureInfo.signingTime) {
          result.signatureInfo.signingTime = new Date(result.signatureInfo.signingTime);
        }
        return result;
      };
      $._processSignerModel = function(signer) {
        if (!signer) {
          return;
        }
        if (signer.certificate) {
          $._processCertificate(signer.certificate);
        }
        if (signer.signingTime) {
          signer.signingTime = new Date(signer.signingTime);
        }
        if (signer.certifiedDateReference) {
          signer.certifiedDateReference = new Date(signer.certifiedDateReference);
        }
        if (signer.timestamps && signer.timestamps.length > 0) {
          for (var i2 = 0; i2 < signer.timestamps.length; i2++) {
            var tst = signer.timestamps[i2];
            $._processOpenResult(tst);
          }
        }
      };
      $._processOpenResult = function(result) {
        if (!result || !result.signers || result.signers.length <= 0) {
          return result;
        }
        if (result.genTime) {
          result.genTime = new Date(result.genTime);
        }
        for (var i2 = 0; i2 < result.signers.length; i2++) {
          var signer = result.signers[i2];
          $._processSignerModel(signer);
        }
        return result;
      };
      $.filters = {
        isPkiBrazilPessoaFisica: function(cert) {
          if (typeof cert == "undefined") {
            throw 'filter called without cert argument (hint: if you are using "pki.filters.isPkiBrazilPessoaFisica()", try "pki.filters.isPkiBrazilPessoaFisica")';
          }
          return cert.pkiBrazil && (cert.pkiBrazil.cpf || "") !== "" && (cert.pkiBrazil.cnpj || "") === "";
        },
        hasPkiBrazilCpf: function(cert) {
          if (typeof cert == "undefined") {
            throw 'filter called without cert argument (hint: if you are using "pki.filters.hasPkiBrazilCpf()", try "pki.filters.hasPkiBrazilCpf")';
          }
          return cert.pkiBrazil && (cert.pkiBrazil.cpf || "") !== "";
        },
        hasPkiBrazilCnpj: function(cert) {
          if (typeof cert == "undefined") {
            throw 'filter called without cert argument (hint: if you are using "pki.filters.hasPkiBrazilCnpj()", try "pki.filters.hasPkiBrazilCnpj")';
          }
          return cert.pkiBrazil && (cert.pkiBrazil.cnpj || "") !== "";
        },
        pkiBrazilCpfEquals: function(cpf) {
          if (typeof cpf !== "string") {
            throw `cpf must be a string (hint: if you are using "pki.filters.pkiBrazilCpfEquals", try "pki.filters.pkiBrazilCpfEquals('somecpf')")`;
          }
          return function(cert) {
            return cert.pkiBrazil && cert.pkiBrazil.cpf === cpf;
          };
        },
        pkiBrazilCnpjEquals: function(cnpj) {
          if (typeof cnpj !== "string") {
            throw `cnpj must be a string (hint: if you are using "pki.filters.pkiBrazilCnpjEquals", try "pki.filters.pkiBrazilCnpjEquals('somecnpj')")`;
          }
          return function(cert) {
            return cert.pkiBrazil && cert.pkiBrazil.cnpj === cnpj;
          };
        },
        hasPkiItalyCodiceFiscale: function(cert) {
          if (typeof cert == "undefined") {
            throw 'filter called without cert argument (hint: if you are using "pki.filters.hasPkiItalyCodiceFiscale()", try "pki.filters.hasPkiItalyCodiceFiscale")';
          }
          return cert.pkiItaly && (cert.pkiItaly.codiceFiscale || "") !== "";
        },
        pkiItalyCodiceFiscaleEquals: function(cf) {
          if (typeof cf !== "string") {
            throw `cf must be a string (hint: if you are using "pki.filters.pkiItalyCodiceFiscaleEquals", try "pki.filters.pkiItalyCodiceFiscaleEquals('someCodice')")`;
          }
          return function(cert) {
            return cert.pkiItaly && cert.pkiItaly.codiceFiscale === cf;
          };
        },
        isWithinValidity: function(cert) {
          if (typeof cert == "undefined") {
            throw 'filter called without cert argument (hint: if you are using "pki.filters.isWithinValidity()", try "pki.filters.isWithinValidity")';
          }
          var now = /* @__PURE__ */ new Date();
          return cert.validityStart <= now && now <= cert.validityEnd;
        },
        all: function() {
          var filters;
          if (arguments.length === 1 && typeof arguments[0] === "object") {
            filters = arguments[0];
          } else {
            filters = arguments;
          }
          return function(cert) {
            for (var i2 = 0; i2 < filters.length; i2++) {
              var filter = filters[i2];
              if (!filter(cert)) {
                return false;
              }
            }
            return true;
          };
        },
        any: function() {
          var filters;
          if (arguments.length === 1 && typeof arguments[0] === "object") {
            filters = arguments[0];
          } else {
            filters = arguments;
          }
          return function(cert) {
            for (var i2 = 0; i2 < filters.length; i2++) {
              var filter = filters[i2];
              if (filter(cert)) {
                return true;
              }
            }
            return false;
          };
        }
      };
      $.readCertificate = function(args) {
        if (typeof args === "string") {
          args = {
            thumbprint: args
          };
        }
        var context = this._createContext(args);
        $._requestHandler.sendCommand(context, "readCertificate", { certificateThumbprint: args.thumbprint });
        return context.promise;
      };
      $.pollNative = function(args) {
        if (!args) {
          args = {};
        }
        var context = this._createContext(args);
        var apiVersion = args.requiredApiVersion;
        if (!apiVersion) {
          apiVersion = $.apiVersions.latest;
        }
        if (!$._apiMap.nativeWin[apiVersion]) {
          throw "Unknown JSlib API version: " + apiVersion;
        }
        $._requestHandler.sendCommand(context, "pollNative", {
          requiredNativeWinVersion: $._apiMap.nativeWin[apiVersion],
          requiredNativeLinuxVersion: $._apiMap.nativeLinux[apiVersion],
          requiredNativeMacVersion: $._apiMap.nativeMac[apiVersion]
        });
        return context.promise;
      };
      $.signHash = function(args) {
        var context = this._createContext(args);
        var request = {
          certificateThumbprint: args.thumbprint,
          hash: args.hash,
          digestAlgorithm: args.digestAlgorithm
        };
        $._requestHandler.sendCommand(context, "signHash", request);
        return context.promise;
      };
      $.signData = function(args) {
        var context = this._createContext(args);
        var request = {
          certificateThumbprint: args.thumbprint,
          data: args.data,
          digestAlgorithm: args.digestAlgorithm
        };
        $._requestHandler.sendCommand(context, "signData", request);
        return context.promise;
      };
      $.keySignHash = function(args) {
        var context = this._createContext(args);
        var request = {
          privateKeyId: args.privateKeyId,
          hash: args.hash,
          digestAlgorithm: args.digestAlgorithm,
          pkcs11Modules: $._getRequestOsP11Modules(args.pkcs11Modules),
          tokenSerialNumber: args.tokenSerialNumber
        };
        $._handleP11ModulesArgs(args, request);
        $._requestHandler.sendCommand(context, "keySignHash", request);
        return context.promise;
      };
      $.keySignData = function(args) {
        var context = this._createContext(args);
        var request = {
          privateKeyId: args.privateKeyId,
          data: args.data,
          digestAlgorithm: args.digestAlgorithm,
          pkcs11Modules: $._getRequestOsP11Modules(args.pkcs11Modules),
          tokenSerialNumber: args.tokenSerialNumber
        };
        $._handleP11ModulesArgs(args, request);
        $._requestHandler.sendCommand(context, "keySignData", request);
        return context.promise;
      };
      $.signWithRestPki = function(args) {
        var context = this._createContext(args);
        var request = {
          certificateThumbprint: args.thumbprint,
          token: args.token,
          restPkiUrl: this.restPkiUrl
        };
        $._requestHandler.sendCommand(context, "signWithRestPki", request);
        return context.promise;
      };
      $.signHashBatch = function(args) {
        var context = this._createContext(args);
        var request = {
          certificateThumbprint: args.certificateThumbprint,
          digestAlgorithm: args.digestAlgorithm,
          usePreauthorizedSignatures: args.usePreauthorizedSignatures,
          batch: args.batch
        };
        $._requestHandler.sendCommand(context, "signHashBatch", request);
        return context.promise;
      };
      $.signHashes = function(args) {
        var context = this._createContext(args);
        var request = {
          certificateThumbprint: args.certificateThumbprint,
          hashes: args.hashes
        };
        $._requestHandler.sendCommand(context, "signHashes", request);
        return context.promise;
      };
      $.preauthorizeSignatures = function(args) {
        if (!args) {
          args = {};
        }
        var context = this._createContext(args);
        var request = {
          certificateThumbprint: args.certificateThumbprint,
          signatureCount: args.signatureCount
        };
        $._requestHandler.sendCommand(context, "preauthorizeSignatures", request);
        return context.promise;
      };
      $.showFolderBrowser = function(args) {
        if (!args) {
          args = {};
        } else if (typeof args === "string") {
          args = {
            message: args
          };
        }
        var context = this._createContext(args);
        var request = {
          message: args.message
        };
        $._requestHandler.sendCommand(context, "showFolderBrowser", request);
        return context.promise;
      };
      $.showFileBrowser = function(args) {
        if (!args) {
          args = {};
        }
        var context = this._createContext(args);
        var request = {
          multiselect: args.multiselect,
          filters: args.filters,
          dialogTitle: args.dialogTitle
        };
        $._requestHandler.sendCommand(context, "showFileBrowser", request);
        return context.promise;
      };
      $.downloadToFolder = function(args) {
        if (!args) {
          args = {};
        }
        var url = args.url || "";
        if (url.indexOf("://") < 0) {
          var a = document.createElement("a");
          a.href = url;
          url = a.href;
        }
        var context = this._createContext(args);
        var request = {
          url,
          folderId: args.folderId,
          filename: args.filename
        };
        $._requestHandler.sendCommand(context, "downloadToFolder", request);
        return context.promise;
      };
      $.openFolder = function(args) {
        if (!args) {
          args = {};
        } else if (typeof args === "string") {
          args = {
            folderId: args
          };
        }
        var context = this._createContext(args);
        $._requestHandler.sendCommand(context, "openFolder", args.folderId);
        return context.promise;
      };
      $.openFile = function(args) {
        if (!args) {
          args = {};
        } else if (typeof args === "string") {
          args = {
            fileId: args
          };
        }
        var context = this._createContext(args);
        $._requestHandler.sendCommand(context, "openFile", args.fileId);
        return context.promise;
      };
      $.redirectToInstallPage = function() {
        document.location.href = $._installUrl + (this.brand || "") + "?returnUrl=" + encodeURIComponent(document.URL) + "&jslib=" + $._jslibVersion;
      };
      $.updateExtension = function(args) {
        if (!args) {
          args = {};
        }
        var context = this._createContext(args);
        $._requestHandler.sendCommand(context, "updateExtension", null);
        return context.promise;
      };
      $._createCommonSignerRequest = function(args) {
        if (!args.output) {
          throw "An output parameter must be passed to signer methods";
        }
        return {
          fileId: args.fileId,
          content: args.content,
          certificateThumbprint: args.certificateThumbprint,
          output: {
            mode: args.output.mode,
            folderId: args.output.folderId,
            dialogTitle: args.output.dialogTitle,
            fileNameSuffix: args.output.fileNameSuffix
          },
          trustArbitrators: args.trustArbitrators,
          clearPolicyTrustArbitrators: args.clearPolicyTrustArbitrators,
          certificateValidationLevel: args.certificateValidationLevel,
          timestampRequester: args.timestampRequester,
          policy: args.policy
        };
      };
      $.signPdf = function(args) {
        var context = this._createContext(args);
        var request = $._createCommonSignerRequest(args);
        request.visualRepresentation = args.visualRepresentation;
        request.pdfMarks = args.pdfMarks;
        request.bypassMarksIfSigned = args.bypassMarksIfSigned;
        request.reason = args.reason;
        request.location = args.location;
        request.signerName = args.signerName;
        request.customSignatureFieldName = args.customSignatureFieldName;
        if (typeof args.metadata === "object") {
          request.metadata = {};
          var metaKeys = Object.keys(args.metadata);
          for (var i2 = 0; i2 < metaKeys.length; i2++) {
            var curKey = metaKeys[i2];
            if (typeof args.metadata[curKey] != "string") {
              throw "Only string values allowed on metadata dictionary. Found type " + typeof args.metadata[curKey] + ": " + curKey + ":" + args.metadata[curKey];
            }
            request.metadata[curKey] = args.metadata[curKey];
          }
        }
        if (request.visualRepresentation && request.visualRepresentation.image && request.visualRepresentation.image.resource && !request.visualRepresentation.image.resource.content && request.visualRepresentation.image.resource.url && !/^(https?:)?\/\//.exec(request.visualRepresentation.image.resource.url)) {
          $._downloadResource(request.visualRepresentation.image.resource.url, function(resource) {
            request.visualRepresentation.image.resource = resource;
            $._requestHandler.sendCommand(context, "signPdf", request, $._processSignResult);
          });
        } else {
          $._requestHandler.sendCommand(context, "signPdf", request, $._processSignResult);
        }
        return context.promise;
      };
      $.signCades = function(args) {
        var context = this._createContext(args);
        var request = $._createCommonSignerRequest(args);
        request.cmsToCosignFileId = args.cmsToCosignFileId;
        request.cmsToCosignContent = args.cmsToCosignContent;
        request.autoDetectCosign = args.autoDetectCosign;
        request.includeEncapsulatedContent = args.includeEncapsulatedContent === null || args.includeEncapsulatedContent === void 0 ? true : args.includeEncapsulatedContent;
        request.signingDescription = args.signingDescription;
        $._requestHandler.sendCommand(context, "signCades", request, $._processSignResult);
        return context.promise;
      };
      $.signFullXml = function(args) {
        var context = this._createContext(args);
        var request = $._createCommonSignerRequest(args);
        request.signerType = "fullXml";
        $._signXmlCommon(args, request, context);
        return context.promise;
      };
      $.signXmlElement = function(args) {
        var context = this._createContext(args);
        var request = $._createCommonSignerRequest(args);
        request.signerType = "xmlElement";
        request.toSignElementId = args.toSignElementId;
        request.toSignElementsIds = args.toSignElementsIds;
        request.toSignElementsXPath = args.toSignElementsXPath;
        request.idResolutionTable = args.idResolutionTable;
        $._signXmlCommon(args, request, context);
        return context.promise;
      };
      $._signXmlCommon = function(args, request, context) {
        request.signatureElementId = args.signatureElementId;
        request.signingDescription = args.signingDescription;
        if (args.signatureElementLocation) {
          request.signatureElementLocation = {
            xpath: args.signatureElementLocation.xpath,
            insertionOption: args.signatureElementLocation.insertionOption
          };
        }
        request.namespaces = args.namespaces;
        $._requestHandler.sendCommand(context, "signXml", request, $._processSignResult);
      };
      $._createCommonOpenRequest = function(args) {
        return {
          signatureFileId: args.signatureFileId,
          signatureContent: args.signatureContent,
          validate: args.validate,
          dateReference: args.dateReference,
          trustArbitrators: args.trustArbitrators,
          clearPolicyTrustArbitrators: args.clearPolicyTrustArbitrators,
          specificPolicy: args.specificPolicy
        };
      };
      $.openPades = function(args) {
        var context = this._createContext(args);
        var request = $._createCommonOpenRequest(args);
        $._requestHandler.sendCommand(context, "openPades", request, $._processOpenResult);
        return context.promise;
      };
      $.openCades = function(args) {
        var context = this._createContext(args);
        var request = $._createCommonOpenRequest(args);
        request.originalFileId = args.originalFileId;
        request.originalContent = args.originalContent;
        request.acceptablePolicies = args.acceptablePolicies;
        request.returnEncapsulatedContent = args.returnEncapsulatedContent;
        $._requestHandler.sendCommand(context, "openCades", request, $._processOpenResult);
        return context.promise;
      };
      $.openXmlSignature = function(args) {
        var context = this._createContext(args);
        var request = $._createCommonOpenRequest(args);
        request.idResolutionTable = args.idResolutionTable;
        request.acceptablePolicies = args.acceptablePolicies;
        $._requestHandler.sendCommand(context, "openXmlSignature", request, $._processOpenResult);
        return context.promise;
      };
      $.listTokens = function(args) {
        var context = this._createContext(args);
        var request = {
          pkcs11Modules: $._getRequestOsP11Modules(args.pkcs11Modules)
        };
        $._requestHandler.sendCommand(context, "listTokens", request);
        return context.promise;
      };
      $.generateTokenRsaKeyPair = function(args) {
        var context = this._createContext(args);
        var request = {
          pkcs11Modules: $._getRequestOsP11Modules(args.pkcs11Modules),
          subjectName: args.subjectName,
          tokenSerialNumber: args.tokenSerialNumber,
          keyLabel: args.keyLabel,
          keySize: args.keySize,
          enableUsedPkcs11Module: args.enableUsedPkcs11Module
        };
        $._handleP11ModulesArgs(args, request);
        $._requestHandler.sendCommand(context, "generateTokenRsaKeyPair", request);
        return context.promise;
      };
      $.generateSoftwareRsaKeyPair = function(args) {
        var context = this._createContext(args);
        var request = {
          subjectName: args.subjectName,
          keySize: args.keySize,
          nonExportableKey: args.nonExportableKey
        };
        $._requestHandler.sendCommand(context, "generateSoftwareRsaKeyPair", request);
        return context.promise;
      };
      $.importTokenCertificate = function(args) {
        var context = this._createContext(args);
        var request = {
          privateKeyId: args.privateKeyId,
          pkcs11Modules: $._getRequestOsP11Modules(args.pkcs11Modules),
          tokenSerialNumber: args.tokenSerialNumber,
          certificateContent: args.certificateContent,
          certificateLabel: args.certificateLabel,
          enableUsedPkcs11Module: args.enableUsedPkcs11Module
        };
        $._handleP11ModulesArgs(args, request);
        $._requestHandler.sendCommand(context, "importTokenCertificate", request);
        return context.promise;
      };
      $.importCertificate = function(args) {
        var context = this._createContext(args);
        var request = {
          privateKeyId: args.privateKeyId,
          certificateContent: args.certificateContent,
          passwordPolicies: args.passwordPolicies,
          passwordMinLength: args.passwordMinLength,
          savePkcs12: args.savePkcs12
        };
        $._requestHandler.sendCommand(context, "importCertificate", request);
        return context.promise;
      };
      $.sendAuthenticatedRequest = function(args) {
        var context = this._createContext(args);
        var request = {
          certificateThumbprint: args.certificateThumbprint,
          method: args.method,
          headers: args.headers,
          body: args.body,
          url: args.url
        };
        $._requestHandler.sendCommand(context, "sendAuthenticatedRequest", request);
        return context.promise;
      };
      $.getGeolocation = function(args) {
        var context = this._createContext(args);
        var request = {
          certificateThumbprint: args.certificateThumbprint
        };
        $._requestHandler.sendCommand(context, "getGeolocation", request);
        return context.promise;
      };
      $.encrypt = function(args) {
        var token = typeof args.token === "object" ? args.token : null;
        var context = this._createContext(args);
        var request = {
          certificateThumbprint: args.certificateThumbprint,
          publicKey: args.publicKey,
          privateKeyId: args.privateKeyId,
          tokenSerialNumber: token ? token.serialNumber : null,
          pkcs11Module: token ? token.pkcs11Module : null,
          parameters: args.parameters,
          data: args.data
        };
        $._requestHandler.sendCommand(context, "encrypt", request);
        return context.promise;
      };
      $.decrypt = function(args) {
        var token = typeof args.token === "object" ? args.token : null;
        var context = this._createContext(args);
        var request = {
          certificateThumbprint: args.certificateThumbprint,
          privateKeyId: args.privateKeyId,
          tokenSerialNumber: token ? token.serialNumber : null,
          pkcs11Module: token ? token.pkcs11Module : null,
          parameters: args.parameters,
          data: args.data
        };
        $._requestHandler.sendCommand(context, "decrypt", request);
        return context.promise;
      };
      $.detectedBrowser = function() {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
          tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
          return "IE " + (tem[1] || "");
        }
        if (M[1] === "Chrome") {
          tem = ua.match(/\b(OPR|Edge|Edg)\/(\d+)/);
          if (tem !== null)
            return tem.slice(1).join(" ").replace("OPR", "Opera");
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
        if ((tem = ua.match(/version\/(\d+)/i)) !== null)
          M.splice(1, 1, tem[1]);
        return M.join(" ");
      }();
      $._supportedMobileDetected = false;
      var hasMultiTouchPoints = window.navigator.maxTouchPoints > 3;
      var mobileOs = "";
      var clientStrings = [
        { getName: function() {
          return "Android";
        }, r: /Android/ },
        { getName: function() {
          return "iOS";
        }, r: /(iPhone|iPad|iPod)/ },
        // iPad iOS running on Desktop mode
        { getName: function() {
          return hasMultiTouchPoints ? "iOS" : "";
        }, r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ }
      ];
      for (var i = 0; i < clientStrings.length; i++) {
        var cs = clientStrings[i];
        if (cs.r.test(window.navigator.userAgent)) {
          mobileOs = cs.getName();
          break;
        }
      }
      $._supportedMobileDetected = $._mobileSupported && mobileOs !== "";
      $.isSupportedMobile = $._supportedMobileDetected;
      if ($._requestHandler === void 0) {
        var extensionRequiredVersion = "0.0.0";
        var extensionFirstVersionWithSelfUpdate = null;
        var chromeNativeWinRequiredVersion = null;
        var chromeNativeLinuxRequiredVersion = null;
        var chromeNativeMacRequiredVersion = null;
        var ieAddonRequiredVersion = null;
        var mobileRequiredVersion = null;
        var isIE = null;
        var isChrome = null;
        var isFirefox = null;
        var isEdge = null;
        var isSafari = null;
        var isAndroid = null;
        var isiOS = null;
        var setRequiredComponentVersions = function(apiVersion) {
          if (!apiVersion) {
            apiVersion = $.apiVersions.v1_3;
          }
          if (!$._apiMap.nativeWin[apiVersion]) {
            throw "Unknown JSlib API version: " + apiVersion;
          }
          chromeNativeWinRequiredVersion = $._apiMap.nativeWin[apiVersion];
          chromeNativeLinuxRequiredVersion = $._apiMap.nativeLinux[apiVersion];
          chromeNativeMacRequiredVersion = $._apiMap.nativeMac[apiVersion];
          ieAddonRequiredVersion = $._apiMap.ieAddon[apiVersion];
          extensionRequiredVersion = $._apiMap.extension[apiVersion];
          mobileRequiredVersion = $._apiMap.mobile[apiVersion];
          if (isChrome) {
            extensionFirstVersionWithSelfUpdate = $._chromeExtensionFirstVersionWithSelfUpdate;
          }
        };
        isIE = $.detectedBrowser.indexOf("IE") >= 0;
        isChrome = $.detectedBrowser.indexOf("Chrome") >= 0;
        isFirefox = $.detectedBrowser.indexOf("Firefox") >= 0;
        isEdge = $.detectedBrowser.indexOf("Edg") >= 0;
        isSafari = $.detectedBrowser.indexOf("Safari") >= 0;
        isAndroid = $._supportedMobileDetected && mobileOs === "Android";
        isiOS = $._supportedMobileDetected && mobileOs === "iOS";
        if (!$._supportedMobileDetected && !isIE) {
          $._requestHandler = new function() {
            var requestEventName = "com.lacunasoftware.WebPKI.RequestEvent";
            var responseEventName = "com.lacunasoftware.WebPKI.ResponseEvent";
            var pendingRequests = {};
            if (isEdge && $._buildChannel !== "stable") {
              requestEventName = "com.lacunasoftware.WebPKI.RequestEvent";
              responseEventName = "com.lacunasoftware.WebPKI.ResponseEvent";
            }
            var s4 = function() {
              return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
            };
            var generateGuid = function() {
              return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
            };
            var registerPromise = function(promise, responseProcessor) {
              var requestId = generateGuid();
              pendingRequests[requestId] = { promise, responseProcessor };
              return requestId;
            };
            var sendCommand = function(context, command, request, responseProcessor) {
              var requestId = registerPromise(context.promise, responseProcessor);
              var message = {
                requestId,
                license: context.license,
                useDomainNativePool: context.useDomainNativePool,
                command,
                request
              };
              if (isChrome || isEdge) {
                var eventC = new CustomEvent(requestEventName, { "detail": message });
                document.dispatchEvent(eventC);
              } else {
                window.postMessage({
                  port: requestEventName,
                  message
                }, "*");
              }
            };
            var checkInstalled = function(context, apiVersion) {
              setRequiredComponentVersions(apiVersion);
              setTimeout(function() {
                pollExtension(context, 25);
              }, 200);
            };
            var pollExtension = function(context, tryCount) {
              $._log("polling extension");
              var meta = document.getElementById($._chromeExtensionId) || document.getElementById($._firefoxExtensionId.replace(/[^A-Za-z0-9_]/g, "_")) || document.getElementById($._edgeExtensionId) || document.getElementById($._edgeLegacyProductId);
              if (meta === null) {
                if (tryCount > 1) {
                  setTimeout(function() {
                    pollExtension(context, tryCount - 1);
                  }, 200);
                } else {
                  context.promise._invokeSuccess({
                    isInstalled: false,
                    status: $.installationStates.NOT_INSTALLED,
                    message: "The Web PKI extension is not installed",
                    browserSpecificStatus: $._chromeInstallationStates.EXTENSION_NOT_INSTALLED
                  });
                }
                return;
              }
              checkExtensionVersion(context);
            };
            var checkExtensionVersion = function(context) {
              $._log("checking extension version");
              var subPromise = new $.Promise(null);
              subPromise.success(function(version) {
                if ($._compareVersions(version, extensionRequiredVersion) < 0) {
                  var canSelfUpdate = extensionFirstVersionWithSelfUpdate !== null && $._compareVersions(version, extensionFirstVersionWithSelfUpdate) >= 0;
                  context.promise._invokeSuccess({
                    isInstalled: false,
                    status: $.installationStates.OUTDATED,
                    browserSpecificStatus: $._chromeInstallationStates.EXTENSION_OUTDATED,
                    message: "The Web PKI extension is outdated (installed version: " + version + ", required version: " + extensionRequiredVersion + ")",
                    chromeExtensionCanSelfUpdate: canSelfUpdate
                  });
                } else {
                  initializeExtension(context);
                }
              });
              subPromise.fail(function(ex) {
                context.promise._invokeError(ex);
              });
              sendCommand({ license: context.license, useDomainNativePool: context.useDomainNativePool, promise: subPromise }, "getExtensionVersion", null);
            };
            var initializeExtension = function(context) {
              $._log("initializing extension");
              var subPromise = new $.Promise(null);
              subPromise.success(function(response) {
                if (response.isReady) {
                  $._nativeInfo = response.nativeInfo;
                  if (response.nativeInfo.os === "Windows" && $._compareVersions(response.nativeInfo.installedVersion, chromeNativeWinRequiredVersion) < 0) {
                    context.promise._invokeSuccess({
                      isInstalled: false,
                      status: $.installationStates.OUTDATED,
                      browserSpecificStatus: $._chromeInstallationStates.NATIVE_OUTDATED,
                      message: "The Web PKI native component is outdated (installed version: " + response.nativeInfo.installedVersion + ", required version: " + chromeNativeWinRequiredVersion + ")",
                      platformInfo: response.platformInfo,
                      nativeInfo: response.nativeInfo
                    });
                  } else if (response.nativeInfo.os === "Linux" && $._compareVersions(response.nativeInfo.installedVersion, chromeNativeLinuxRequiredVersion) < 0) {
                    context.promise._invokeSuccess({
                      isInstalled: false,
                      status: $.installationStates.OUTDATED,
                      browserSpecificStatus: $._chromeInstallationStates.NATIVE_OUTDATED,
                      message: "The Web PKI native component is outdated (installed version: " + response.nativeInfo.installedVersion + ", required version: " + chromeNativeLinuxRequiredVersion + ")",
                      platformInfo: response.platformInfo,
                      nativeInfo: response.nativeInfo
                    });
                  } else if (response.nativeInfo.os === "Darwin" && $._compareVersions(response.nativeInfo.installedVersion, chromeNativeMacRequiredVersion) < 0) {
                    context.promise._invokeSuccess({
                      isInstalled: false,
                      status: $.installationStates.OUTDATED,
                      browserSpecificStatus: $._chromeInstallationStates.NATIVE_OUTDATED,
                      message: "The Web PKI native component is outdated (installed version: " + response.nativeInfo.installedVersion + ", required version: " + chromeNativeMacRequiredVersion + ")",
                      platformInfo: response.platformInfo,
                      nativeInfo: response.nativeInfo
                    });
                  } else {
                    context.promise._invokeSuccess({
                      isInstalled: true
                    });
                  }
                } else {
                  context.promise._invokeSuccess({
                    isInstalled: false,
                    status: convertInstallationStatus(response.status),
                    browserSpecificStatus: response.status,
                    message: response.message,
                    platformInfo: response.platformInfo,
                    nativeInfo: response.nativeInfo
                  });
                }
              });
              subPromise.fail(function(ex) {
                context.promise._invokeError(ex);
              });
              sendCommand({ license: context.license, useDomainNativePool: context.useDomainNativePool, promise: subPromise }, "initialize", null);
            };
            var convertInstallationStatus = function(bss) {
              if (bss === $._chromeInstallationStates.INSTALLED) {
                return $.installationStates.INSTALLED;
              } else if (bss === $._chromeInstallationStates.EXTENSION_OUTDATED || bss === $._chromeInstallationStates.NATIVE_OUTDATED) {
                return $.installationStates.OUTDATED;
              } else {
                return $.installationStates.NOT_INSTALLED;
              }
            };
            var onResponseReceived = function(result) {
              var request = pendingRequests[result.requestId];
              delete pendingRequests[result.requestId];
              if (result.success) {
                if (request.responseProcessor) {
                  result.response = request.responseProcessor(result.response);
                }
                request.promise._invokeSuccess(result.response);
              } else {
                request.promise._invokeError(result.exception);
              }
            };
            this.sendCommand = sendCommand;
            this.checkInstalled = checkInstalled;
            if (isChrome || isEdge) {
              document.addEventListener(responseEventName, function(event) {
                onResponseReceived(event.detail);
              });
            } else {
              window.addEventListener("message", function(event) {
                if (event && event.data && event.data.port === responseEventName) {
                  onResponseReceived(event.data.message);
                }
              });
            }
          }();
        } else if (isIE) {
          $._requestHandler = new function() {
            var pendingRequests = {};
            var currentPollIndex = 0;
            var s4 = function() {
              return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
            };
            var generateGuid = function() {
              return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
            };
            var registerPromise = function(promise, responseProcessor) {
              var requestId = generateGuid();
              pendingRequests[requestId] = {
                promise,
                pollStart: currentPollIndex,
                responseProcessor
              };
              return requestId;
            };
            var getAddon = function() {
              return window.lacunaWebPKIExtension;
            };
            var poll = function() {
              if (getAddon()) {
                var resultsJson = getAddon().GetAvailableResults();
                if (resultsJson === null) {
                  throw "Add-on method GetAvailableResults failed";
                }
                var results = JSON.parse(resultsJson);
                var requestIdsToRemove = [];
                for (var requestId in pendingRequests) {
                  if (!pendingRequests.hasOwnProperty(requestId)) {
                    continue;
                  }
                  var pendingRequest = pendingRequests[requestId];
                  var removePendingRequest = false;
                  if (pendingRequest.sendFailed) {
                    removePendingRequest = true;
                  } else {
                    var result = null;
                    for (var i2 = 0; i2 < results.length; i2++) {
                      if (results[i2].requestId == requestId) {
                        result = results[i2];
                        break;
                      }
                    }
                    if (result !== null) {
                      if (result.success) {
                        if (pendingRequest.responseProcessor) {
                          result.response = pendingRequest.responseProcessor(result.response);
                        }
                        pendingRequest.promise._invokeSuccess(result.response);
                      } else {
                        pendingRequest.promise._invokeError(result.exception);
                      }
                      removePendingRequest = true;
                    } else if (currentPollIndex >= pendingRequest.pollStart + 120) {
                      pendingRequest.promise._invokeError({
                        message: "The operation has timed out",
                        complete: "The operation has timed out",
                        origin: "helper",
                        code: "addon_timeout"
                      });
                      removePendingRequest = true;
                    }
                  }
                  if (removePendingRequest) {
                    requestIdsToRemove.push(requestId);
                  }
                }
                for (var j = 0; j < requestIdsToRemove.length; j++) {
                  delete pendingRequests[requestIdsToRemove[j]];
                }
                currentPollIndex += 1;
              }
              setTimeout(poll, 500);
            };
            var checkExtension = function(context, tryCount) {
              $._log("checking extension");
              if (getAddon() === null) {
                if (tryCount > 1) {
                  setTimeout(function() {
                    checkExtension(context, tryCount - 1);
                  }, 200);
                } else {
                  context.promise._invokeSuccess({
                    isInstalled: false,
                    status: $.installationStates.NOT_INSTALLED,
                    message: "The Web PKI add-on is not installed"
                  });
                }
                return;
              }
              var subPromise = new $.Promise(null);
              subPromise.success(function(version) {
                $._nativeInfo = { os: "Windows", installedVersion: version };
                if ($._compareVersions(version, ieAddonRequiredVersion) < 0) {
                  context.promise._invokeSuccess({
                    isInstalled: false,
                    status: $.installationStates.OUTDATED,
                    message: "The Web PKI add-on is outdated (installed version: " + version + ", latest version: " + ieAddonRequiredVersion + ")"
                  });
                } else {
                  context.promise._invokeSuccess({
                    isInstalled: true
                  });
                }
              });
              subPromise.fail(function(ex) {
                context.promise._invokeError(ex);
              });
              sendCommand({ license: context.license, useDomainNativePool: context.useDomainNativePool, promise: subPromise }, "getVersion", null);
            };
            var sendCommand = function(context, command, request, responseProcessor) {
              if (getAddon()) {
                var requestId = registerPromise(context.promise, responseProcessor);
                var message = {
                  requestId,
                  license: context.license,
                  useDomainNativePool: context.useDomainNativePool,
                  command,
                  request
                };
                var sendCommandError;
                try {
                  var success = getAddon().SendCommand(JSON.stringify(message));
                  if (success === false) {
                    sendCommandError = "Failed to send command to add-on";
                  }
                } catch (err) {
                  sendCommandError = "Exception when sending command to add-on: " + err;
                }
                if (sendCommandError) {
                  context.promise._invokeError({
                    message: "Failed to send command to add-on",
                    complete: sendCommandError,
                    origin: "helper",
                    code: "addon_send_command_failure"
                  }, 200);
                  pendingRequests[requestId].sendFailed = true;
                }
              } else {
                context.promise._invokeError({
                  message: "Add-on not detected",
                  complete: "Add-on not detected",
                  origin: "helper",
                  code: "addon_not_detected"
                }, 200);
              }
            };
            var checkInstalled = function(context, apiVersion) {
              setRequiredComponentVersions(apiVersion);
              setTimeout(function() {
                checkExtension(context, 25);
              }, 200);
            };
            this.sendCommand = sendCommand;
            this.checkInstalled = checkInstalled;
            poll();
          }();
        } else {
          var getAppIntegrationHandler = function() {
            return window.lacunaWebPkiAppBridge;
          };
          var subMobileHandler = null;
          var AuthorizeWPkiModal = null;
          var creatingMobileHandler = false;
          $._requestHandler = new function() {
            var sendCommand = function(context, command, request, responseProcessor) {
              if (subMobileHandler === null) {
                createMobileHandler(context);
              }
              if (subMobileHandler !== null) {
                subMobileHandler.sendCommand(context, command, request, responseProcessor);
                return;
              }
              var pollSendCmdId = setInterval(function() {
                if (subMobileHandler !== null) {
                  clearInterval(pollSendCmdId);
                  subMobileHandler.sendCommand(context, command, request, responseProcessor);
                  return;
                }
              }, 400);
            };
            var checkInstalled = function(context, apiVersion) {
              if (subMobileHandler === null) {
                createMobileHandler(context);
              }
              if (subMobileHandler !== null) {
                subMobileHandler.checkInstalled(context, apiVersion);
                return;
              }
              var pollCheckInstalledId = setInterval(function() {
                if (subMobileHandler !== null) {
                  clearInterval(pollCheckInstalledId);
                  subMobileHandler.checkInstalled(context, apiVersion);
                  return;
                }
              }, 400);
            };
            this.sendCommand = sendCommand;
            this.checkInstalled = checkInstalled;
          }();
          var createAppInteractHandler = function() {
            console.log("use mobile in-app integration");
            subMobileHandler = new function() {
              var pendingRequests = {};
              getAppIntegrationHandler().processResponse = function(message) {
                console.log("Response received: ", message);
                var result = message;
                if (typeof message === "string") {
                  result = JSON.parse(message);
                }
                var request = pendingRequests[result.requestId];
                delete pendingRequests[result.requestId];
                if (request) {
                  if (result.success) {
                    if (request.responseProcessor) {
                      result.response = request.responseProcessor(result.response);
                    }
                    request.promise._invokeSuccess(result.response);
                  } else {
                    request.promise._invokeError(result.exception);
                  }
                }
              };
              var s4 = function() {
                return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
              };
              var generateGuid = function() {
                return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
              };
              var registerPromise = function(promise, responseProcessor) {
                var requestId = generateGuid();
                pendingRequests[requestId] = { promise, responseProcessor };
                return requestId;
              };
              var sendCommand = function(context, command, request, responseProcessor) {
                var requestId = registerPromise(context.promise, responseProcessor);
                var cmdRequest = {
                  requestId,
                  license: context.license,
                  command,
                  request
                };
                var message = JSON.stringify(cmdRequest);
                console.log("Sending message: " + message);
                getAppIntegrationHandler().processRequest(message);
              };
              var checkInstalled = function(context, apiVersion) {
                setRequiredComponentVersions(apiVersion);
                var subPromise = new $.Promise(null);
                subPromise.success(function(response) {
                  $._nativeInfo = { os: response.os, installedVersion: response.version };
                  var status = $.installationStates.INSTALLED;
                  if ($._compareVersions(response.version, mobileRequiredVersion) < 0) {
                    status = $.installationStates.OUTDATED;
                  }
                  context.promise._invokeSuccess({
                    nativeInfo: {
                      os: response.os,
                      installedVersion: response.version
                    },
                    isInstalled: status === $.installationStates.INSTALLED,
                    status
                  });
                }).fail(function(ex) {
                  context.promise._invokeError(ex);
                });
                sendCommand({ license: context.license, useDomainNativePool: context.useDomainNativePool, promise: subPromise }, "getInfo", null);
              };
              this.sendCommand = sendCommand;
              this.checkInstalled = checkInstalled;
            }();
          };
          var createSignalMobileHandler = function() {
            console.log("use mobile signalr integration");
            var webPkiModal = null;
            var singalRScriptUrl = "https://cloud.lacunasoftware.com/scripts/signalr-client-1.0.4.min.js";
            var forgeScriptUrl = "https://cloud.lacunasoftware.com/js/forge-cipher.min.js";
            var scriptsInjectionMethods = { require: "require", window: "window" };
            var usedInjectionMethod = null;
            if (typeof exports !== "object" && (typeof __require === "function" && typeof define === "function" && define.amd)) {
              __require([singalRScriptUrl], function(s2) {
                $._signalR = s2;
              });
              __require([forgeScriptUrl], function(f) {
                $._forge = f;
              });
              usedInjectionMethod = scriptsInjectionMethods.require;
            } else {
              var s = document.createElement("script");
              s.setAttribute("src", singalRScriptUrl);
              document.getElementsByTagName("head")[0].appendChild(s);
              s = document.createElement("script");
              s.setAttribute("src", forgeScriptUrl);
              document.getElementsByTagName("head")[0].appendChild(s);
              usedInjectionMethod = scriptsInjectionMethods.window;
            }
            subMobileHandler = new function() {
              var pendingRequests = [];
              var signalServerUrl = "https://cloud.lacunasoftware.com/";
              var signalApiSessionUrl = signalServerUrl + "api/sessions/";
              var signalSessionUrl = signalServerUrl + "session/";
              var currentSessionId = null;
              var scriptsLoaded = false;
              var secretKey = null;
              var deviceConnected = false;
              var sendCommandMaxAttemps = 3;
              var msDelayBetweenRetries = 5e3;
              var s4 = function() {
                return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
              };
              var clearParams = function() {
                pendingRequests = [];
                currentSessionId = null;
                deviceConnected = false;
              };
              var generateGuid = function() {
                return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
              };
              var sendNext = function() {
                pendingRequests.shift();
                sendWork();
              };
              var sendWork = function() {
                if (pendingRequests.length > 0) {
                  var request = pendingRequests[0];
                  request.time = (/* @__PURE__ */ new Date()).getTime();
                  request.sendAttempt++;
                  console.log("[Signal] resending request (attempt " + request.sendAttempt + "): " + request.requestId);
                  httpPost(
                    signalApiSessionUrl + currentSessionId + "/request",
                    request.data,
                    // success
                    function(data) {
                      if ((!data || !data.sentToDevice) && request.sendAttempt >= sendCommandMaxAttemps) {
                        request.promise._invokeError({ message: "Could not send message to mobile", code: $.errorCodes.MOBILE_SEND_MESSAGE });
                        sendNext();
                      }
                    },
                    // error
                    function(status, err) {
                      if (request.sendAttempt >= sendCommandMaxAttemps) {
                        request.promise._invokeError({
                          message: "Error while sending message to mobile: " + status,
                          complete: typeof err === "string" ? err : JSON.stringify(err),
                          code: $.errorCodes.MOBILE_SEND_MESSAGE
                        });
                        sendNext();
                      }
                    }
                  );
                  if (request.sendAttempt <= 1) {
                    sendTimeout(request);
                  }
                }
              };
              var invokeTimeout = function(request) {
                request.promise._invokeError({
                  message: "The mobile is not responding",
                  complete: "The operation has timed out",
                  origin: "jslib",
                  code: $.errorCodes.MOBILE_TIMEOUT
                });
                sendNext();
              };
              var sendTimeout = function(request) {
                if (!checkPendingRequestsQueue(request.requestId)) {
                  console.log("[Signal] stop request timeout (shift): " + request.requestId);
                  return;
                }
                var now = (/* @__PURE__ */ new Date()).getTime();
                if (!request.receipt) {
                  if (now > request.time + msDelayBetweenRetries) {
                    if (request.sendAttempt < sendCommandMaxAttemps) {
                      sendWork();
                    } else {
                      invokeTimeout(request);
                      console.log("[Signal] stop request timeout (short timeout): " + request.requestId);
                      return;
                    }
                  }
                } else if (now > request.time + 6e4) {
                  invokeTimeout(request);
                  console.log("[Signal] stop request timeout (long timeout): " + request.requestId);
                  return;
                }
                setTimeout(function() {
                  sendTimeout(request);
                }, 1e3);
              };
              var checkPendingRequestsQueue = function(expectedId) {
                return pendingRequests.length !== 0 && pendingRequests[0].requestId === expectedId;
              };
              var getCurrentPendingRequest = function(expectedId) {
                return checkPendingRequestsQueue(expectedId) ? pendingRequests[0] : null;
              };
              var setAcknowledgeReceipt = function(id) {
                var request = getCurrentPendingRequest(id);
                if (request !== null) {
                  request.receipt = true;
                  console.log("[Signal] got receipt for request: " + id);
                } else {
                  console.log("[Signal] disposed! Got receipt for DISPOSED request: " + id);
                }
              };
              var sendCommand = function(context, command, request, responseProcessor) {
                if (currentSessionId == null) {
                  throw "The component is not initialized. Make sure the init method was called.";
                }
                var message = {
                  requestId: generateGuid(),
                  license: context.license,
                  useDomainNativePool: context.useDomainNativePool,
                  command,
                  request,
                  domain: window.location.hostname
                };
                var encrypted = message ? encryptMessage(JSON.stringify(message), secretKey) : null;
                var data = {
                  type: "request",
                  id: message.requestId,
                  content: encrypted
                };
                pendingRequests.push({
                  requestId: message.requestId,
                  promise: context.promise,
                  responseProcessor,
                  data,
                  receipt: false,
                  sendAttempt: 0
                });
                if (pendingRequests.length <= 1) {
                  sendWork();
                }
              };
              var checkInstalled = function(context, apiVersion) {
                clearParams();
                setRequiredComponentVersions(apiVersion);
                checkScripts(context);
              };
              var checkScripts = function(context, tryCount) {
                tryCount = tryCount || 1;
                if (scriptsLoaded) {
                  signalRSetup(context);
                  return;
                }
                if (tryCount > 50) {
                  context.promise._invokeError({
                    message: "Dependency scripts did not load",
                    complete: "Dependency scripts did not load",
                    code: $.errorCodes.UNDEFINED
                  });
                  return;
                }
                setTimeout(function() {
                  checkScripts(context, tryCount + 1);
                }, 200);
              };
              var signalRSetup = function(context) {
                var connectionId = null;
                var signalStop = function(connection) {
                  webPkiModal.hide();
                  try {
                    connection.stop();
                  } catch (ex) {
                    console.log("[Signal] error while stopping signalR", ex);
                  }
                };
                var connectTimeout = function(connection, count) {
                  count = count || 1;
                  if (deviceConnected) {
                    return;
                  }
                  console.log("[Signal] waiting device connection");
                  var timeoutCount = 7;
                  if (isiOS) {
                    timeoutCount = 5;
                  }
                  if (count > timeoutCount) {
                    signalStop(connection);
                    context.instance.redirectToInstallPage();
                    return;
                  }
                  setTimeout(function() {
                    connectTimeout(connection, count + 1);
                  }, 2e3);
                };
                startSignalConnection(signalSessionUrl, function(connection) {
                  connection.on("connected", function(message) {
                    deviceConnected = true;
                    webPkiModal.hide();
                    console.log("[Signal] device connected");
                    var subPromise = new $.Promise(null);
                    subPromise.success(function(response) {
                      var status = $.installationStates.INSTALLED;
                      if ($._compareVersions(response.version, mobileRequiredVersion) < 0) {
                        status = $.installationStates.OUTDATED;
                      }
                      context.promise._invokeSuccess({
                        nativeInfo: {
                          os: response.os,
                          installedVersion: response.version
                        },
                        isInstalled: status === $.installationStates.INSTALLED,
                        status
                      });
                    }).fail(function(exception) {
                      context.promise._invokeError(exception);
                    });
                    console.log("[Signal] sending first command");
                    sendCommand({ license: context.license, useDomainNativePool: context.useDomainNativePool, promise: subPromise }, "getInfo", null);
                  });
                  connection.on("message", function(message) {
                    console.log("[Signal] available response");
                    httpGet(signalApiSessionUrl + currentSessionId + "/response", onResponseReceived);
                  });
                  connection.on("connectionId", function(id) {
                    console.log("[Signal] Got connection id: " + id);
                    connectionId = id;
                  });
                  connection.on("receipt", function(id) {
                    setAcknowledgeReceipt(id);
                  });
                  connection.onclose(function(e) {
                    console.log("[Signal] disconnected", e);
                  });
                }).then(function(connection) {
                  var startSession = function(count) {
                    console.log("[Signal] Getting connection Id");
                    count = count || 1;
                    if (count > 10) {
                      console.log("[Signal] Fail. ConnectionId timeout");
                      context.promise._invokeError({
                        message: "Connection Id timeout",
                        complete: "Did not get connection Id event.",
                        code: $.errorCodes.UNDEFINED
                      });
                      return;
                    }
                    if (!connectionId) {
                      setTimeout(function() {
                        startSession(count + 1);
                      }, 1e3);
                      return;
                    }
                    console.log("[Signal] Getting session");
                    var request = { connectionId };
                    httpPost(signalApiSessionUrl, request, function(data) {
                      currentSessionId = data.sessionId;
                      secretKey = generateSecretKey();
                      console.log("[Signal] session started");
                      console.log("[Signal] showing modal deep link");
                      var deepLinkQuery = "start?s=" + currentSessionId + "&k=" + secretKey.hex + "&b=" + $.detectedBrowser + "&o=" + window.location.hostname;
                      var deepLink = "webpki://" + deepLinkQuery;
                      if (isAndroid) {
                        deepLink = "intent://" + deepLinkQuery + "#Intent;scheme=webpki;S.browser_fallback_url=" + encodeURIComponent($._installUrl + (context.instance.brand || "") + "?returnUrl=" + encodeURIComponent(document.URL) + "&jslib=" + $._jslibVersion) + ";end";
                      }
                      webPkiModal = new AuthorizeWPkiModal(deepLink);
                      webPkiModal.onOkCLick = function() {
                        webPkiModal.showWait();
                        connectTimeout(connection);
                      };
                      webPkiModal.onCancelClick = function() {
                        signalStop(connection);
                        context.promise._invokeError({
                          message: "Start mobile app cancelled",
                          complete: "Start mobile app cancelled",
                          code: $.errorCodes.USER_CANCELLED
                        });
                      };
                      webPkiModal.show();
                    });
                  };
                  setTimeout(startSession, 100);
                });
              };
              var onResponseReceived = function(data) {
                data = typeof data === "string" ? JSON.parse(data) : data;
                console.log("[Signal] got response. Type: " + data.type);
                var result = {};
                try {
                  if (data.format != 0) {
                    throw { message: "Unknown data format: " + data.format };
                  }
                  if (data.type !== "Error") {
                    result = JSON.parse(decryptMessage(data.content, secretKey));
                  } else {
                    result = {
                      requestId: data.id,
                      success: false,
                      exception: data.content ? typeof data.content === "string" ? JSON.parse(data.content) : data.content : {
                        message: "Cryptographic error on mobile native",
                        error: "Cryptographic error on mobile native",
                        code: $.errorCodes.COMMAND_DECRYPT_ERROR
                      }
                    };
                  }
                } catch (ex) {
                  result = {
                    requestId: data.id,
                    success: false,
                    exception: {
                      message: "Error while decrypting response message",
                      error: typeof ex === "object" ? ex.message || JSON.stringify(ex) : ex,
                      code: $.errorCodes.COMMAND_DECRYPT_ERROR
                    }
                  };
                }
                var request = getCurrentPendingRequest(data.id);
                if (request === null) {
                  console.log("[Signal] got response for disposed request: " + data.id);
                  return;
                }
                if (result.success) {
                  if (request.responseProcessor) {
                    result.response = request.responseProcessor(result.response);
                  }
                  request.promise._invokeSuccess(result.response);
                } else {
                  request.promise._invokeError(result.exception);
                }
                sendNext();
              };
              var httpGet = function(url, successCallback, errorCallback) {
                var httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = function() {
                  onHttpStateChanged(httpRequest, "GET", url, successCallback, errorCallback);
                };
                httpRequest.open("GET", url, true);
                httpRequest.setRequestHeader("Accept", "application/json");
                httpRequest.withCredentials = false;
                console.log("[HttpHandler] Get " + url);
                httpRequest.send();
              };
              var httpPost = function(url, data, successCallback, errorCallback) {
                var httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = function() {
                  onHttpStateChanged(httpRequest, "POST", url, successCallback, errorCallback);
                };
                httpRequest.open("POST", url, true);
                httpRequest.setRequestHeader("Content-Type", "application/json");
                httpRequest.setRequestHeader("Accept", "application/json");
                httpRequest.withCredentials = false;
                console.log("[HttpHandler] Post on (" + url + "): ", data);
                httpRequest.send(JSON.stringify(data));
              };
              var onHttpStateChanged = function(httpRequest, verb, url, successCallback, errorCallback) {
                if (httpRequest.readyState === 4) {
                  if (httpRequest.status >= 200 && httpRequest.status <= 299) {
                    var response = null;
                    if (httpRequest.status === 200 || httpRequest.status === 201) {
                      try {
                        response = JSON.parse(httpRequest.responseText);
                        successCallback(response);
                      } catch (e) {
                        console.log("[HttpHandler] error parsing response.");
                        response = httpRequest.responseText;
                        errorCallback(httpRequest.status, response);
                      }
                    }
                    console.log("[HttpHandler] received response from " + verb + " " + url, response);
                  } else if (httpRequest.status === 0 && !httpRequest.responseText && isiOS) {
                    console.log("[HttpHandler] got Safari abort connection. Applying workaround");
                    successCallback({ sentToDevice: true });
                  } else {
                    var errorModel;
                    try {
                      errorModel = JSON.parse(httpRequest.responseText);
                    } catch (e) {
                      console.log("[HttpHandler] error parsing error");
                      errorModel = null;
                    }
                    console.log("[HttpHandler] error: " + httpRequest.responseText);
                    errorCallback(httpRequest.status, errorModel);
                  }
                }
              };
              var startSignalConnection = null;
              (function() {
                var pollScripts = function(count) {
                  count = count || 1;
                  if (count > 100) {
                    throw "Script " + (!$._forge && !$._signalR ? "forge / signalR" : !$._forge ? "forge" : "signalR") + " did not load";
                  }
                  if (usedInjectionMethod !== scriptsInjectionMethods.require) {
                    $._signalR = window.signalR;
                    $._forge = window.forge;
                  }
                  if ($._signalR !== void 0 && $._forge !== void 0) {
                    startSignalConnection = function(url, configureConnection) {
                      return function start() {
                        console.log("[Signal] Starting connection");
                        var connection = new $._signalR.HubConnectionBuilder().withUrl(url).build();
                        if (configureConnection && typeof configureConnection === "function") {
                          configureConnection(connection);
                        }
                        return connection.start().then(function() {
                          return connection;
                        })["catch"](function(error) {
                          console.log("[Signal] Cannot start the connection. Erro: ", error);
                          return window.Promise.reject(error);
                        });
                      }();
                    };
                    scriptsLoaded = true;
                  } else {
                    setTimeout(function() {
                      pollScripts(count + 1);
                    }, 200);
                  }
                };
                setTimeout(function() {
                  pollScripts();
                }, 50);
              })();
              this.sendCommand = sendCommand;
              this.checkInstalled = checkInstalled;
            }();
            var generateSecretKey = function() {
              var raw = $._forge.random.getBytesSync(32);
              return {
                raw,
                b64: $._forge.util.encode64(raw),
                hex: $._forge.util.bytesToHex(raw)
              };
            };
            var encryptMessage = function(message, key) {
              var iv = $._forge.random.getBytesSync(16);
              var keyBytes = key.raw;
              var buffer = new $._forge.util.ByteBuffer();
              buffer.putBuffer($._forge.util.createBuffer(message));
              var cipher = $._forge.cipher.createCipher("AES-CBC", keyBytes);
              cipher.start({ iv });
              cipher.update(buffer);
              cipher.finish();
              var ciphertext = cipher.output.bytes();
              var hmac = $._forge.hmac.create();
              hmac.start("sha256", keyBytes);
              hmac.update(ciphertext);
              hmacContent = hmac.digest().bytes();
              var outBuffer = new $._forge.util.ByteBuffer();
              outBuffer.putBytes(iv);
              outBuffer.putBytes(hmacContent);
              outBuffer.putBytes(ciphertext);
              return $._forge.util.encode64(outBuffer.bytes());
            };
            var decryptMessage = function(encrypted, key) {
              var keyBytes = key.raw;
              var buffer = new $._forge.util.ByteBuffer();
              buffer.putBytes($._forge.util.decode64(encrypted));
              var iv = buffer.getBytes(16);
              var hmacCheck = buffer.getBytes(32);
              var ciphertext = buffer.bytes();
              var hmac = $._forge.hmac.create();
              hmac.start("sha256", keyBytes);
              hmac.update(ciphertext);
              var computedHmac = hmac.digest().bytes();
              if (computedHmac !== hmacCheck) {
                throw { message: "Error on message integrity" };
              }
              var decipher = $._forge.cipher.createDecipher("AES-CBC", keyBytes);
              decipher.start({ iv });
              decipher.update(buffer);
              var result = decipher.finish();
              if (!result) {
                throw { message: "Error on message decryption" };
              }
              return $._forge.util.decodeUtf8(decipher.output.getBytes());
            };
          };
          var createDeepLinkAppIntegrationRedirect = function(context) {
            subMobileHandler = new function() {
              var schemeSuffix = "-lcn";
              var scheme = "wpki" + schemeSuffix;
              var deepLinkQuery = "access?u=" + encodeURIComponent(window.location.href) + "&c=" + encodeURIComponent(document.cookie);
              var deepLink = scheme + "://" + deepLinkQuery;
              if (isAndroid) {
                deepLink = "intent://" + deepLinkQuery + "#Intent;scheme=" + scheme + ";S.browser_fallback_url=" + encodeURIComponent($._installUrl + (context.instance.brand || "") + "?returnUrl=" + encodeURIComponent(document.URL) + "&jslib=" + $._jslibVersion) + ";end";
              }
              this.sendCommand = function(context2, command, request, responseProcessor) {
              };
              this.checkInstalled = function(context2, apiVersion) {
                var webPkiModal = new AuthorizeWPkiModal(deepLink);
                webPkiModal.onOkCLick = function() {
                  webPkiModal.showWait();
                  var timestamp = /* @__PURE__ */ new Date();
                  setTimeout(function() {
                    webPkiModal.hide();
                    if (isiOS) {
                      if (/* @__PURE__ */ new Date() - timestamp < 10 * 1e3) {
                        context2.instance.redirectToInstallPage();
                      }
                    }
                  }, 5e3);
                };
                webPkiModal.onCancelClick = function() {
                  webPkiModal.hide();
                  context2.promise._invokeError({
                    message: "Start mobile app cancelled",
                    complete: "Start mobile app cancelled",
                    code: $.errorCodes.USER_CANCELLED
                  });
                };
                webPkiModal.show();
              };
            }();
          };
          var createMobileHandler = function(context) {
            if (creatingMobileHandler) {
              return;
            }
            creatingMobileHandler = true;
            var mobileIntegrationCountTimeout = 10;
            var mobileIntegrationPollId = setInterval(function() {
              console.log("polling mobile integration mode ...");
              if (mobileIntegrationCountTimeout <= 0) {
                clearInterval(mobileIntegrationPollId);
                if (context.instance.mobileIntegrationMode === $.mobileIntegrationModes.browserIntegration) {
                  createSignalMobileHandler();
                } else {
                  createDeepLinkAppIntegrationRedirect(context);
                }
                return;
              }
              if (getAppIntegrationHandler() && getAppIntegrationHandler().loaded) {
                clearInterval(mobileIntegrationPollId);
                createAppInteractHandler();
                return;
              }
              mobileIntegrationCountTimeout--;
            }, 300);
          };
          AuthorizeWPkiModal = function(deepLink) {
            this.deepLink = deepLink;
            this.onOkCLick = null;
            this.onCancelClick = null;
            var modalElement = null;
            var textResources = {
              pt: {
                accessCertificates: "O site {{domain}} deseja acessar seus certificados digitais.",
                authorize: "Permitir",
                cancel: "Cancelar",
                wait: "Aguarde..."
              },
              en: {
                accessCertificates: "The website {{domain}} wants to access your digital certificates.",
                authorize: "Authorize",
                cancel: "Cancel",
                wait: "Please wait..."
              },
              es: {
                accessCertificates: "El sitio {{domain}} quiere acceder a sus certificados digitales.",
                authorize: "Permitir",
                cancel: "Cancelar",
                wait: "Espera..."
              }
            };
            var userLanguage = null;
            var getResource = function(name) {
              if (userLanguage === null) {
                var lang = window.navigator.language || "en";
                var availablesLangs = Object.keys(textResources);
                userLanguage = availablesLangs.indexOf(lang) > -1 ? lang : lang.length > 1 && availablesLangs.indexOf(lang.substring(0, 2)) > -1 ? lang.substring(0, 2) : "en";
              }
              return textResources[userLanguage][name] || name;
            };
            var init = function(instance) {
              modalElement = document.getElementById("webPkiModal");
              if (modalElement != null) {
                modalElement.removeChild(modalElement.firstChild);
                document.getElementsByTagName("body")[0].removeChild(modalElement);
              }
              modalElement = document.createElement("div");
              modalElement.setAttribute("id", "webPkiModal");
              modalElement.setAttribute("style", "display: none;");
              var modalContentElement = document.createElement("div");
              modalContentElement.setAttribute("style", 'display: table; background-color: #fefefe; margin: 5%; width: 90%; height: 90%; font-family: "Helvetica"; text-align: center; border-radius: 10px;');
              var middleContentDiv = document.createElement("div");
              middleContentDiv.setAttribute("style", "display: table-cell; vertical-align: middle;");
              var waitElement = document.createElement("p");
              waitElement.setAttribute("id", "webPkiWaitElement");
              waitElement.setAttribute("style", "display: none");
              waitElement.appendChild(document.createTextNode(getResource("wait")));
              var textElement = document.createElement("p");
              textElement.setAttribute("id", "webPkiTextElement");
              textElement.setAttribute("style", "padding-left: 5%; padding-right: 5%; font-size: 1.6em; color: black; word-wrap: break-word; white-space: normal;");
              textElement.appendChild(document.createTextNode(getResource("accessCertificates").split("{{domain}}")[0]));
              var bold = document.createElement("strong");
              bold.appendChild(document.createTextNode(window.location.hostname));
              textElement.appendChild(bold);
              textElement.appendChild(document.createTextNode(getResource("accessCertificates").split("{{domain}}")[1]));
              var buttonsDiv = document.createElement("div");
              buttonsDiv.setAttribute("id", "webPkiButtonsElement");
              var cancelButton = document.createElement("a");
              cancelButton.setAttribute("style", "-webkit-appearance: button; -moz-appearance: button; appearance: button; padding: 2% 4%; text-align: center; text-decoration: none; display: inline-block; font-size: 1.1em; margin: 5%; cursor: pointer; background-color: #e7e7e7; color: black");
              cancelButton.appendChild(document.createTextNode(getResource("cancel")));
              var authButton = document.createElement("a");
              authButton.setAttribute("style", "-webkit-appearance: button; -moz-appearance: button; appearance: button; padding: 2% 4%; text-align: center; text-decoration: none; display: inline-block; font-size: 1.1em; margin: 5%; cursor: pointer; background-color: #0078e7; color: white");
              authButton.setAttribute("id", "wpkiModalDeepLink");
              authButton.setAttribute("href", instance.deepLink);
              authButton.appendChild(document.createTextNode(getResource("authorize")));
              if (isiOS) {
                buttonsDiv.appendChild(cancelButton);
                buttonsDiv.appendChild(authButton);
              } else {
                buttonsDiv.appendChild(authButton);
                buttonsDiv.appendChild(cancelButton);
              }
              middleContentDiv.appendChild(waitElement);
              middleContentDiv.appendChild(textElement);
              middleContentDiv.appendChild(buttonsDiv);
              modalContentElement.appendChild(middleContentDiv);
              modalElement.appendChild(modalContentElement);
              document.getElementsByTagName("body")[0].appendChild(modalElement);
              authButton.onclick = instance.onOkCLick;
              cancelButton.onclick = instance.onCancelClick;
            };
            this.hide = function() {
              modalElement.setAttribute("style", "display: none;");
            };
            this.show = function() {
              init(this);
              modalElement.setAttribute("style", "display: block; position: fixed; z-index: 100000; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4);");
            };
            this.showWait = function() {
              document.getElementById("webPkiTextElement").setAttribute("style", "display: none;");
              document.getElementById("webPkiButtonsElement").setAttribute("style", "display: none;");
              document.getElementById("webPkiWaitElement").setAttribute("style", "padding-left: 5%; padding-right: 5%; font-size: 1.6em; color: black; word-wrap: break-word;");
            };
          };
        }
      }
    })(LacunaWebPKI.prototype);
    if (typeof exports === "object") {
      if (Object.defineProperties) {
        Object.defineProperties(exports, {
          //Using this syntax instead of "exports.default = ..." to maintain compatibility with ES3 (because of the .default)
          "default": {
            value: LacunaWebPKI
          },
          // https://github.com/webpack/webpack/issues/2945
          "__esModule": {
            value: true
          },
          "LacunaWebPKI": {
            value: LacunaWebPKI
          }
        });
      } else {
        exports["default"] = LacunaWebPKI;
        exports.__esModule = true;
        exports.LacunaWebPKI = LacunaWebPKI;
      }
    }
  }
});

// node_modules/choices.js/public/assets/scripts/choices.mjs
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var ActionType = {
  ADD_CHOICE: "ADD_CHOICE",
  REMOVE_CHOICE: "REMOVE_CHOICE",
  FILTER_CHOICES: "FILTER_CHOICES",
  ACTIVATE_CHOICES: "ACTIVATE_CHOICES",
  CLEAR_CHOICES: "CLEAR_CHOICES",
  ADD_GROUP: "ADD_GROUP",
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  HIGHLIGHT_ITEM: "HIGHLIGHT_ITEM"
};
var EventType = {
  showDropdown: "showDropdown",
  hideDropdown: "hideDropdown",
  change: "change",
  choice: "choice",
  search: "search",
  addItem: "addItem",
  removeItem: "removeItem",
  highlightItem: "highlightItem",
  highlightChoice: "highlightChoice",
  unhighlightItem: "unhighlightItem"
};
var KeyCodeMap = {
  TAB_KEY: 9,
  SHIFT_KEY: 16,
  BACK_KEY: 46,
  DELETE_KEY: 8,
  ENTER_KEY: 13,
  A_KEY: 65,
  ESC_KEY: 27,
  UP_KEY: 38,
  DOWN_KEY: 40,
  PAGE_UP_KEY: 33,
  PAGE_DOWN_KEY: 34
};
var ObjectsInConfig = ["fuseOptions", "classNames"];
var PassedElementTypes = {
  Text: "text",
  SelectOne: "select-one",
  SelectMultiple: "select-multiple"
};
var addChoice = function(choice) {
  return {
    type: ActionType.ADD_CHOICE,
    choice
  };
};
var removeChoice = function(choice) {
  return {
    type: ActionType.REMOVE_CHOICE,
    choice
  };
};
var filterChoices = function(results) {
  return {
    type: ActionType.FILTER_CHOICES,
    results
  };
};
var activateChoices = function(active) {
  return {
    type: ActionType.ACTIVATE_CHOICES,
    active
  };
};
var addGroup = function(group) {
  return {
    type: ActionType.ADD_GROUP,
    group
  };
};
var addItem = function(item) {
  return {
    type: ActionType.ADD_ITEM,
    item
  };
};
var removeItem$1 = function(item) {
  return {
    type: ActionType.REMOVE_ITEM,
    item
  };
};
var highlightItem = function(item, highlighted) {
  return {
    type: ActionType.HIGHLIGHT_ITEM,
    item,
    highlighted
  };
};
var getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
var generateChars = function(length) {
  return Array.from({ length }, function() {
    return getRandomNumber(0, 36).toString(36);
  }).join("");
};
var generateId = function(element, prefix) {
  var id = element.id || element.name && "".concat(element.name, "-").concat(generateChars(2)) || generateChars(4);
  id = id.replace(/(:|\.|\[|\]|,)/g, "");
  id = "".concat(prefix, "-").concat(id);
  return id;
};
var getAdjacentEl = function(startEl, selector, direction) {
  if (direction === void 0) {
    direction = 1;
  }
  var prop = "".concat(direction > 0 ? "next" : "previous", "ElementSibling");
  var sibling = startEl[prop];
  while (sibling) {
    if (sibling.matches(selector)) {
      return sibling;
    }
    sibling = sibling[prop];
  }
  return null;
};
var isScrolledIntoView = function(element, parent, direction) {
  if (direction === void 0) {
    direction = 1;
  }
  var isVisible;
  if (direction > 0) {
    isVisible = parent.scrollTop + parent.offsetHeight >= element.offsetTop + element.offsetHeight;
  } else {
    isVisible = element.offsetTop >= parent.scrollTop;
  }
  return isVisible;
};
var sanitise = function(value) {
  if (typeof value !== "string") {
    if (value === null || value === void 0) {
      return "";
    }
    if (typeof value === "object") {
      if ("raw" in value) {
        return sanitise(value.raw);
      }
      if ("trusted" in value) {
        return value.trusted;
      }
    }
    return value;
  }
  return value.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;");
};
var strToEl = function() {
  var tmpEl = document.createElement("div");
  return function(str) {
    tmpEl.innerHTML = str.trim();
    var firstChild = tmpEl.children[0];
    while (tmpEl.firstChild) {
      tmpEl.removeChild(tmpEl.firstChild);
    }
    return firstChild;
  };
}();
var resolveNoticeFunction = function(fn, value) {
  return typeof fn === "function" ? fn(sanitise(value), value) : fn;
};
var resolveStringFunction = function(fn) {
  return typeof fn === "function" ? fn() : fn;
};
var unwrapStringForRaw = function(s) {
  if (typeof s === "string") {
    return s;
  }
  if (typeof s === "object") {
    if ("trusted" in s) {
      return s.trusted;
    }
    if ("raw" in s) {
      return s.raw;
    }
  }
  return "";
};
var unwrapStringForEscaped = function(s) {
  if (typeof s === "string") {
    return s;
  }
  if (typeof s === "object") {
    if ("escaped" in s) {
      return s.escaped;
    }
    if ("trusted" in s) {
      return s.trusted;
    }
  }
  return "";
};
var escapeForTemplate = function(allowHTML, s) {
  return allowHTML ? unwrapStringForEscaped(s) : sanitise(s);
};
var setElementHtml = function(el, allowHtml, html) {
  el.innerHTML = escapeForTemplate(allowHtml, html);
};
var sortByAlpha = function(_a, _b) {
  var value = _a.value, _c = _a.label, label = _c === void 0 ? value : _c;
  var value2 = _b.value, _d = _b.label, label2 = _d === void 0 ? value2 : _d;
  return unwrapStringForRaw(label).localeCompare(unwrapStringForRaw(label2), [], {
    sensitivity: "base",
    ignorePunctuation: true,
    numeric: true
  });
};
var sortByRank = function(a, b) {
  return a.rank - b.rank;
};
var dispatchEvent = function(element, type, customArgs) {
  if (customArgs === void 0) {
    customArgs = null;
  }
  var event = new CustomEvent(type, {
    detail: customArgs,
    bubbles: true,
    cancelable: true
  });
  return element.dispatchEvent(event);
};
var diff = function(a, b) {
  var aKeys = Object.keys(a).sort();
  var bKeys = Object.keys(b).sort();
  return aKeys.filter(function(i) {
    return bKeys.indexOf(i) < 0;
  });
};
var getClassNames = function(ClassNames) {
  return Array.isArray(ClassNames) ? ClassNames : [ClassNames];
};
var getClassNamesSelector = function(option) {
  if (option && Array.isArray(option)) {
    return option.map(function(item) {
      return ".".concat(item);
    }).join("");
  }
  return ".".concat(option);
};
var addClassesToElement = function(element, className) {
  var _a;
  (_a = element.classList).add.apply(_a, getClassNames(className));
};
var removeClassesFromElement = function(element, className) {
  var _a;
  (_a = element.classList).remove.apply(_a, getClassNames(className));
};
var parseCustomProperties = function(customProperties) {
  if (typeof customProperties !== "undefined") {
    try {
      return JSON.parse(customProperties);
    } catch (e) {
      return customProperties;
    }
  }
  return {};
};
var updateClassList = function(item, add, remove) {
  var itemEl = item.itemEl;
  if (itemEl) {
    removeClassesFromElement(itemEl, remove);
    addClassesToElement(itemEl, add);
  }
};
var Dropdown = (
  /** @class */
  function() {
    function Dropdown2(_a) {
      var element = _a.element, type = _a.type, classNames = _a.classNames;
      this.element = element;
      this.classNames = classNames;
      this.type = type;
      this.isActive = false;
    }
    Dropdown2.prototype.show = function() {
      addClassesToElement(this.element, this.classNames.activeState);
      this.element.setAttribute("aria-expanded", "true");
      this.isActive = true;
      return this;
    };
    Dropdown2.prototype.hide = function() {
      removeClassesFromElement(this.element, this.classNames.activeState);
      this.element.setAttribute("aria-expanded", "false");
      this.isActive = false;
      return this;
    };
    return Dropdown2;
  }()
);
var Container = (
  /** @class */
  function() {
    function Container2(_a) {
      var element = _a.element, type = _a.type, classNames = _a.classNames, position = _a.position;
      this.element = element;
      this.classNames = classNames;
      this.type = type;
      this.position = position;
      this.isOpen = false;
      this.isFlipped = false;
      this.isDisabled = false;
      this.isLoading = false;
    }
    Container2.prototype.shouldFlip = function(dropdownPos, dropdownHeight) {
      var shouldFlip = false;
      if (this.position === "auto") {
        shouldFlip = this.element.getBoundingClientRect().top - dropdownHeight >= 0 && !window.matchMedia("(min-height: ".concat(dropdownPos + 1, "px)")).matches;
      } else if (this.position === "top") {
        shouldFlip = true;
      }
      return shouldFlip;
    };
    Container2.prototype.setActiveDescendant = function(activeDescendantID) {
      this.element.setAttribute("aria-activedescendant", activeDescendantID);
    };
    Container2.prototype.removeActiveDescendant = function() {
      this.element.removeAttribute("aria-activedescendant");
    };
    Container2.prototype.open = function(dropdownPos, dropdownHeight) {
      addClassesToElement(this.element, this.classNames.openState);
      this.element.setAttribute("aria-expanded", "true");
      this.isOpen = true;
      if (this.shouldFlip(dropdownPos, dropdownHeight)) {
        addClassesToElement(this.element, this.classNames.flippedState);
        this.isFlipped = true;
      }
    };
    Container2.prototype.close = function() {
      removeClassesFromElement(this.element, this.classNames.openState);
      this.element.setAttribute("aria-expanded", "false");
      this.removeActiveDescendant();
      this.isOpen = false;
      if (this.isFlipped) {
        removeClassesFromElement(this.element, this.classNames.flippedState);
        this.isFlipped = false;
      }
    };
    Container2.prototype.addFocusState = function() {
      addClassesToElement(this.element, this.classNames.focusState);
    };
    Container2.prototype.removeFocusState = function() {
      removeClassesFromElement(this.element, this.classNames.focusState);
    };
    Container2.prototype.enable = function() {
      removeClassesFromElement(this.element, this.classNames.disabledState);
      this.element.removeAttribute("aria-disabled");
      if (this.type === PassedElementTypes.SelectOne) {
        this.element.setAttribute("tabindex", "0");
      }
      this.isDisabled = false;
    };
    Container2.prototype.disable = function() {
      addClassesToElement(this.element, this.classNames.disabledState);
      this.element.setAttribute("aria-disabled", "true");
      if (this.type === PassedElementTypes.SelectOne) {
        this.element.setAttribute("tabindex", "-1");
      }
      this.isDisabled = true;
    };
    Container2.prototype.wrap = function(element) {
      var el = this.element;
      var parentNode = element.parentNode;
      if (parentNode) {
        if (element.nextSibling) {
          parentNode.insertBefore(el, element.nextSibling);
        } else {
          parentNode.appendChild(el);
        }
      }
      el.appendChild(element);
    };
    Container2.prototype.unwrap = function(element) {
      var el = this.element;
      var parentNode = el.parentNode;
      if (parentNode) {
        parentNode.insertBefore(element, el);
        parentNode.removeChild(el);
      }
    };
    Container2.prototype.addLoadingState = function() {
      addClassesToElement(this.element, this.classNames.loadingState);
      this.element.setAttribute("aria-busy", "true");
      this.isLoading = true;
    };
    Container2.prototype.removeLoadingState = function() {
      removeClassesFromElement(this.element, this.classNames.loadingState);
      this.element.removeAttribute("aria-busy");
      this.isLoading = false;
    };
    return Container2;
  }()
);
var Input = (
  /** @class */
  function() {
    function Input2(_a) {
      var element = _a.element, type = _a.type, classNames = _a.classNames, preventPaste = _a.preventPaste;
      this.element = element;
      this.type = type;
      this.classNames = classNames;
      this.preventPaste = preventPaste;
      this.isFocussed = this.element.isEqualNode(document.activeElement);
      this.isDisabled = element.disabled;
      this._onPaste = this._onPaste.bind(this);
      this._onInput = this._onInput.bind(this);
      this._onFocus = this._onFocus.bind(this);
      this._onBlur = this._onBlur.bind(this);
    }
    Object.defineProperty(Input2.prototype, "placeholder", {
      set: function(placeholder) {
        this.element.placeholder = placeholder;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Input2.prototype, "value", {
      get: function() {
        return this.element.value;
      },
      set: function(value) {
        this.element.value = value;
      },
      enumerable: false,
      configurable: true
    });
    Input2.prototype.addEventListeners = function() {
      var el = this.element;
      el.addEventListener("paste", this._onPaste);
      el.addEventListener("input", this._onInput, {
        passive: true
      });
      el.addEventListener("focus", this._onFocus, {
        passive: true
      });
      el.addEventListener("blur", this._onBlur, {
        passive: true
      });
    };
    Input2.prototype.removeEventListeners = function() {
      var el = this.element;
      el.removeEventListener("input", this._onInput);
      el.removeEventListener("paste", this._onPaste);
      el.removeEventListener("focus", this._onFocus);
      el.removeEventListener("blur", this._onBlur);
    };
    Input2.prototype.enable = function() {
      var el = this.element;
      el.removeAttribute("disabled");
      this.isDisabled = false;
    };
    Input2.prototype.disable = function() {
      var el = this.element;
      el.setAttribute("disabled", "");
      this.isDisabled = true;
    };
    Input2.prototype.focus = function() {
      if (!this.isFocussed) {
        this.element.focus();
      }
    };
    Input2.prototype.blur = function() {
      if (this.isFocussed) {
        this.element.blur();
      }
    };
    Input2.prototype.clear = function(setWidth) {
      if (setWidth === void 0) {
        setWidth = true;
      }
      this.element.value = "";
      if (setWidth) {
        this.setWidth();
      }
      return this;
    };
    Input2.prototype.setWidth = function() {
      var element = this.element;
      element.style.minWidth = "".concat(element.placeholder.length + 1, "ch");
      element.style.width = "".concat(element.value.length + 1, "ch");
    };
    Input2.prototype.setActiveDescendant = function(activeDescendantID) {
      this.element.setAttribute("aria-activedescendant", activeDescendantID);
    };
    Input2.prototype.removeActiveDescendant = function() {
      this.element.removeAttribute("aria-activedescendant");
    };
    Input2.prototype._onInput = function() {
      if (this.type !== PassedElementTypes.SelectOne) {
        this.setWidth();
      }
    };
    Input2.prototype._onPaste = function(event) {
      if (this.preventPaste) {
        event.preventDefault();
      }
    };
    Input2.prototype._onFocus = function() {
      this.isFocussed = true;
    };
    Input2.prototype._onBlur = function() {
      this.isFocussed = false;
    };
    return Input2;
  }()
);
var SCROLLING_SPEED = 4;
var List = (
  /** @class */
  function() {
    function List2(_a) {
      var element = _a.element;
      this.element = element;
      this.scrollPos = this.element.scrollTop;
      this.height = this.element.offsetHeight;
    }
    List2.prototype.prepend = function(node) {
      var child = this.element.firstElementChild;
      if (child) {
        this.element.insertBefore(node, child);
      } else {
        this.element.append(node);
      }
    };
    List2.prototype.scrollToTop = function() {
      this.element.scrollTop = 0;
    };
    List2.prototype.scrollToChildElement = function(element, direction) {
      var _this = this;
      if (!element) {
        return;
      }
      var listHeight = this.element.offsetHeight;
      var listScrollPosition = this.element.scrollTop + listHeight;
      var elementHeight = element.offsetHeight;
      var elementPos = element.offsetTop + elementHeight;
      var destination = direction > 0 ? this.element.scrollTop + elementPos - listScrollPosition : element.offsetTop;
      requestAnimationFrame(function() {
        _this._animateScroll(destination, direction);
      });
    };
    List2.prototype._scrollDown = function(scrollPos, strength, destination) {
      var easing = (destination - scrollPos) / strength;
      var distance = easing > 1 ? easing : 1;
      this.element.scrollTop = scrollPos + distance;
    };
    List2.prototype._scrollUp = function(scrollPos, strength, destination) {
      var easing = (scrollPos - destination) / strength;
      var distance = easing > 1 ? easing : 1;
      this.element.scrollTop = scrollPos - distance;
    };
    List2.prototype._animateScroll = function(destination, direction) {
      var _this = this;
      var strength = SCROLLING_SPEED;
      var choiceListScrollTop = this.element.scrollTop;
      var continueAnimation = false;
      if (direction > 0) {
        this._scrollDown(choiceListScrollTop, strength, destination);
        if (choiceListScrollTop < destination) {
          continueAnimation = true;
        }
      } else {
        this._scrollUp(choiceListScrollTop, strength, destination);
        if (choiceListScrollTop > destination) {
          continueAnimation = true;
        }
      }
      if (continueAnimation) {
        requestAnimationFrame(function() {
          _this._animateScroll(destination, direction);
        });
      }
    };
    return List2;
  }()
);
var WrappedElement = (
  /** @class */
  function() {
    function WrappedElement2(_a) {
      var element = _a.element, classNames = _a.classNames;
      this.element = element;
      this.classNames = classNames;
      this.isDisabled = false;
    }
    Object.defineProperty(WrappedElement2.prototype, "isActive", {
      get: function() {
        return this.element.dataset.choice === "active";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(WrappedElement2.prototype, "dir", {
      get: function() {
        return this.element.dir;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(WrappedElement2.prototype, "value", {
      get: function() {
        return this.element.value;
      },
      set: function(value) {
        this.element.setAttribute("value", value);
        this.element.value = value;
      },
      enumerable: false,
      configurable: true
    });
    WrappedElement2.prototype.conceal = function() {
      var el = this.element;
      addClassesToElement(el, this.classNames.input);
      el.hidden = true;
      el.tabIndex = -1;
      var origStyle = el.getAttribute("style");
      if (origStyle) {
        el.setAttribute("data-choice-orig-style", origStyle);
      }
      el.setAttribute("data-choice", "active");
    };
    WrappedElement2.prototype.reveal = function() {
      var el = this.element;
      removeClassesFromElement(el, this.classNames.input);
      el.hidden = false;
      el.removeAttribute("tabindex");
      var origStyle = el.getAttribute("data-choice-orig-style");
      if (origStyle) {
        el.removeAttribute("data-choice-orig-style");
        el.setAttribute("style", origStyle);
      } else {
        el.removeAttribute("style");
      }
      el.removeAttribute("data-choice");
    };
    WrappedElement2.prototype.enable = function() {
      this.element.removeAttribute("disabled");
      this.element.disabled = false;
      this.isDisabled = false;
    };
    WrappedElement2.prototype.disable = function() {
      this.element.setAttribute("disabled", "");
      this.element.disabled = true;
      this.isDisabled = true;
    };
    WrappedElement2.prototype.triggerEvent = function(eventType, data) {
      dispatchEvent(this.element, eventType, data || {});
    };
    return WrappedElement2;
  }()
);
var WrappedInput = (
  /** @class */
  function(_super) {
    __extends(WrappedInput2, _super);
    function WrappedInput2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    return WrappedInput2;
  }(WrappedElement)
);
var coerceBool = function(arg, defaultValue) {
  if (defaultValue === void 0) {
    defaultValue = true;
  }
  return typeof arg === "undefined" ? defaultValue : !!arg;
};
var stringToHtmlClass = function(input) {
  if (typeof input === "string") {
    input = input.split(" ").filter(function(s) {
      return s.length;
    });
  }
  if (Array.isArray(input) && input.length) {
    return input;
  }
  return void 0;
};
var mapInputToChoice = function(value, allowGroup, allowRawString) {
  if (allowRawString === void 0) {
    allowRawString = true;
  }
  if (typeof value === "string") {
    var sanitisedValue = sanitise(value);
    var userValue = allowRawString || sanitisedValue === value ? value : { escaped: sanitisedValue, raw: value };
    var result_1 = mapInputToChoice({
      value,
      label: userValue,
      selected: true
    }, false);
    return result_1;
  }
  var groupOrChoice = value;
  if ("choices" in groupOrChoice) {
    if (!allowGroup) {
      throw new TypeError("optGroup is not allowed");
    }
    var group = groupOrChoice;
    var choices2 = group.choices.map(function(e) {
      return mapInputToChoice(e, false);
    });
    var result_2 = {
      id: 0,
      // actual ID will be assigned during _addGroup
      label: unwrapStringForRaw(group.label) || group.value,
      active: !!choices2.length,
      disabled: !!group.disabled,
      choices: choices2
    };
    return result_2;
  }
  var choice = groupOrChoice;
  var result = {
    id: 0,
    // actual ID will be assigned during _addChoice
    group: null,
    // actual group will be assigned during _addGroup but before _addChoice
    score: 0,
    // used in search
    rank: 0,
    // used in search, stable sort order
    value: choice.value,
    label: choice.label || choice.value,
    active: coerceBool(choice.active),
    selected: coerceBool(choice.selected, false),
    disabled: coerceBool(choice.disabled, false),
    placeholder: coerceBool(choice.placeholder, false),
    highlighted: false,
    labelClass: stringToHtmlClass(choice.labelClass),
    labelDescription: choice.labelDescription,
    customProperties: choice.customProperties
  };
  return result;
};
var isHtmlInputElement = function(e) {
  return e.tagName === "INPUT";
};
var isHtmlSelectElement = function(e) {
  return e.tagName === "SELECT";
};
var isHtmlOption = function(e) {
  return e.tagName === "OPTION";
};
var isHtmlOptgroup = function(e) {
  return e.tagName === "OPTGROUP";
};
var WrappedSelect = (
  /** @class */
  function(_super) {
    __extends(WrappedSelect2, _super);
    function WrappedSelect2(_a) {
      var element = _a.element, classNames = _a.classNames, template = _a.template, extractPlaceholder = _a.extractPlaceholder;
      var _this = _super.call(this, { element, classNames }) || this;
      _this.template = template;
      _this.extractPlaceholder = extractPlaceholder;
      return _this;
    }
    Object.defineProperty(WrappedSelect2.prototype, "placeholderOption", {
      get: function() {
        return this.element.querySelector('option[value=""]') || // Backward compatibility layer for the non-standard placeholder attribute supported in older versions.
        this.element.querySelector("option[placeholder]");
      },
      enumerable: false,
      configurable: true
    });
    WrappedSelect2.prototype.addOptions = function(choices2) {
      var _this = this;
      var fragment = document.createDocumentFragment();
      choices2.forEach(function(obj) {
        var choice = obj;
        if (choice.element) {
          return;
        }
        var option = _this.template(choice);
        fragment.appendChild(option);
        choice.element = option;
      });
      this.element.appendChild(fragment);
    };
    WrappedSelect2.prototype.optionsAsChoices = function() {
      var _this = this;
      var choices2 = [];
      this.element.querySelectorAll(":scope > option, :scope > optgroup").forEach(function(e) {
        if (isHtmlOption(e)) {
          choices2.push(_this._optionToChoice(e));
        } else if (isHtmlOptgroup(e)) {
          choices2.push(_this._optgroupToChoice(e));
        }
      });
      return choices2;
    };
    WrappedSelect2.prototype._optionToChoice = function(option) {
      if (!option.hasAttribute("value") && option.hasAttribute("placeholder")) {
        option.setAttribute("value", "");
        option.value = "";
      }
      return {
        id: 0,
        group: null,
        score: 0,
        rank: 0,
        value: option.value,
        label: option.innerText,
        // HTML options do not support most html tags, but innerHtml will extract html comments...
        element: option,
        active: true,
        // this returns true if nothing is selected on initial load, which will break placeholder support
        selected: this.extractPlaceholder ? option.selected : option.hasAttribute("selected"),
        disabled: option.disabled,
        highlighted: false,
        placeholder: this.extractPlaceholder && (!option.value || option.hasAttribute("placeholder")),
        labelClass: typeof option.dataset.labelClass !== "undefined" ? stringToHtmlClass(option.dataset.labelClass) : void 0,
        labelDescription: typeof option.dataset.labelDescription !== "undefined" ? option.dataset.labelDescription : void 0,
        customProperties: parseCustomProperties(option.dataset.customProperties)
      };
    };
    WrappedSelect2.prototype._optgroupToChoice = function(optgroup) {
      var _this = this;
      var options = optgroup.querySelectorAll("option");
      var choices2 = Array.from(options).map(function(option) {
        return _this._optionToChoice(option);
      });
      return {
        id: 0,
        label: optgroup.label || "",
        element: optgroup,
        active: !!choices2.length,
        disabled: optgroup.disabled,
        choices: choices2
      };
    };
    return WrappedSelect2;
  }(WrappedElement)
);
var DEFAULT_CLASSNAMES = {
  containerOuter: ["choices"],
  containerInner: ["choices__inner"],
  input: ["choices__input"],
  inputCloned: ["choices__input--cloned"],
  list: ["choices__list"],
  listItems: ["choices__list--multiple"],
  listSingle: ["choices__list--single"],
  listDropdown: ["choices__list--dropdown"],
  item: ["choices__item"],
  itemSelectable: ["choices__item--selectable"],
  itemDisabled: ["choices__item--disabled"],
  itemChoice: ["choices__item--choice"],
  description: ["choices__description"],
  placeholder: ["choices__placeholder"],
  group: ["choices__group"],
  groupHeading: ["choices__heading"],
  button: ["choices__button"],
  activeState: ["is-active"],
  focusState: ["is-focused"],
  openState: ["is-open"],
  disabledState: ["is-disabled"],
  highlightedState: ["is-highlighted"],
  selectedState: ["is-selected"],
  flippedState: ["is-flipped"],
  loadingState: ["is-loading"],
  notice: ["choices__notice"],
  addChoice: ["choices__item--selectable", "add-choice"],
  noResults: ["has-no-results"],
  noChoices: ["has-no-choices"]
};
var DEFAULT_CONFIG = {
  items: [],
  choices: [],
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  closeDropdownOnSelect: "auto",
  singleModeForMultiSelect: false,
  addChoices: false,
  addItems: true,
  addItemFilter: function(value) {
    return !!value && value !== "";
  },
  removeItems: true,
  removeItemButton: false,
  removeItemButtonAlignLeft: false,
  editItems: false,
  allowHTML: false,
  allowHtmlUserInput: false,
  duplicateItemsAllowed: true,
  delimiter: ",",
  paste: true,
  searchEnabled: true,
  searchChoices: true,
  searchFloor: 1,
  searchResultLimit: 4,
  searchFields: ["label", "value"],
  position: "auto",
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  sorter: sortByAlpha,
  shadowRoot: null,
  placeholder: true,
  placeholderValue: null,
  searchPlaceholderValue: null,
  prependValue: null,
  appendValue: null,
  renderSelectedChoices: "auto",
  loadingText: "Loading...",
  noResultsText: "No results found",
  noChoicesText: "No choices to choose from",
  itemSelectText: "Press to select",
  uniqueItemText: "Only unique values can be added",
  customAddItemText: "Only values matching specific conditions can be added",
  addItemText: function(value) {
    return 'Press Enter to add <b>"'.concat(value, '"</b>');
  },
  removeItemIconText: function() {
    return "Remove item";
  },
  removeItemLabelText: function(value) {
    return "Remove item: ".concat(value);
  },
  maxItemText: function(maxItemCount) {
    return "Only ".concat(maxItemCount, " values can be added");
  },
  valueComparer: function(value1, value2) {
    return value1 === value2;
  },
  fuseOptions: {
    includeScore: true
  },
  labelId: "",
  callbackOnInit: null,
  callbackOnCreateTemplates: null,
  classNames: DEFAULT_CLASSNAMES,
  appendGroupInSearch: false
};
var removeItem = function(item) {
  var itemEl = item.itemEl;
  if (itemEl) {
    itemEl.remove();
    item.itemEl = void 0;
  }
};
function items(s, action, context) {
  var state = s;
  var update = true;
  switch (action.type) {
    case ActionType.ADD_ITEM: {
      action.item.selected = true;
      var el = action.item.element;
      if (el) {
        el.selected = true;
        el.setAttribute("selected", "");
      }
      state.push(action.item);
      break;
    }
    case ActionType.REMOVE_ITEM: {
      action.item.selected = false;
      var el = action.item.element;
      if (el) {
        el.selected = false;
        el.removeAttribute("selected");
        var select = el.parentElement;
        if (select && isHtmlSelectElement(select) && select.type === PassedElementTypes.SelectOne) {
          select.value = "";
        }
      }
      removeItem(action.item);
      state = state.filter(function(choice) {
        return choice.id !== action.item.id;
      });
      break;
    }
    case ActionType.REMOVE_CHOICE: {
      removeItem(action.choice);
      state = state.filter(function(item2) {
        return item2.id !== action.choice.id;
      });
      break;
    }
    case ActionType.HIGHLIGHT_ITEM: {
      var highlighted = action.highlighted;
      var item = state.find(function(obj) {
        return obj.id === action.item.id;
      });
      if (item && item.highlighted !== highlighted) {
        item.highlighted = highlighted;
        if (context) {
          updateClassList(item, highlighted ? context.classNames.highlightedState : context.classNames.selectedState, highlighted ? context.classNames.selectedState : context.classNames.highlightedState);
        }
      }
      break;
    }
    default: {
      update = false;
      break;
    }
  }
  return { state, update };
}
function groups(s, action) {
  var state = s;
  var update = true;
  switch (action.type) {
    case ActionType.ADD_GROUP: {
      state.push(action.group);
      break;
    }
    case ActionType.CLEAR_CHOICES: {
      state = [];
      break;
    }
    default: {
      update = false;
      break;
    }
  }
  return { state, update };
}
function choices(s, action, context) {
  var state = s;
  var update = true;
  switch (action.type) {
    case ActionType.ADD_CHOICE: {
      state.push(action.choice);
      break;
    }
    case ActionType.REMOVE_CHOICE: {
      action.choice.choiceEl = void 0;
      if (action.choice.group) {
        action.choice.group.choices = action.choice.group.choices.filter(function(obj) {
          return obj.id !== action.choice.id;
        });
      }
      state = state.filter(function(obj) {
        return obj.id !== action.choice.id;
      });
      break;
    }
    case ActionType.ADD_ITEM:
    case ActionType.REMOVE_ITEM: {
      action.item.choiceEl = void 0;
      break;
    }
    case ActionType.FILTER_CHOICES: {
      var scoreLookup_1 = [];
      action.results.forEach(function(result) {
        scoreLookup_1[result.item.id] = result;
      });
      state.forEach(function(choice) {
        var result = scoreLookup_1[choice.id];
        if (result !== void 0) {
          choice.score = result.score;
          choice.rank = result.rank;
          choice.active = true;
        } else {
          choice.score = 0;
          choice.rank = 0;
          choice.active = false;
        }
        if (context && context.appendGroupInSearch) {
          choice.choiceEl = void 0;
        }
      });
      break;
    }
    case ActionType.ACTIVATE_CHOICES: {
      state.forEach(function(choice) {
        choice.active = action.active;
        if (context && context.appendGroupInSearch) {
          choice.choiceEl = void 0;
        }
      });
      break;
    }
    case ActionType.CLEAR_CHOICES: {
      state = [];
      break;
    }
    default: {
      update = false;
      break;
    }
  }
  return { state, update };
}
var reducers = {
  groups,
  items,
  choices
};
var Store = (
  /** @class */
  function() {
    function Store2(context) {
      this._state = this.defaultState;
      this._listeners = [];
      this._txn = 0;
      this._context = context;
    }
    Object.defineProperty(Store2.prototype, "defaultState", {
      // eslint-disable-next-line class-methods-use-this
      get: function() {
        return {
          groups: [],
          items: [],
          choices: []
        };
      },
      enumerable: false,
      configurable: true
    });
    Store2.prototype.changeSet = function(init) {
      return {
        groups: init,
        items: init,
        choices: init
      };
    };
    Store2.prototype.reset = function() {
      this._state = this.defaultState;
      var changes = this.changeSet(true);
      if (this._txn) {
        this._changeSet = changes;
      } else {
        this._listeners.forEach(function(l) {
          return l(changes);
        });
      }
    };
    Store2.prototype.subscribe = function(onChange) {
      this._listeners.push(onChange);
      return this;
    };
    Store2.prototype.dispatch = function(action) {
      var _this = this;
      var state = this._state;
      var hasChanges = false;
      var changes = this._changeSet || this.changeSet(false);
      Object.keys(reducers).forEach(function(key) {
        var stateUpdate = reducers[key](state[key], action, _this._context);
        if (stateUpdate.update) {
          hasChanges = true;
          changes[key] = true;
          state[key] = stateUpdate.state;
        }
      });
      if (hasChanges) {
        if (this._txn) {
          this._changeSet = changes;
        } else {
          this._listeners.forEach(function(l) {
            return l(changes);
          });
        }
      }
    };
    Store2.prototype.withTxn = function(func) {
      this._txn++;
      try {
        func();
      } finally {
        this._txn = Math.max(0, this._txn - 1);
        if (!this._txn) {
          var changeSet_1 = this._changeSet;
          if (changeSet_1) {
            this._changeSet = void 0;
            this._listeners.forEach(function(l) {
              return l(changeSet_1);
            });
          }
        }
      }
    };
    Object.defineProperty(Store2.prototype, "state", {
      /**
       * Get store object
       */
      get: function() {
        return this._state;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store2.prototype, "items", {
      /**
       * Get items from store
       */
      get: function() {
        return this.state.items;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store2.prototype, "highlightedActiveItems", {
      /**
       * Get highlighted items from store
       */
      get: function() {
        return this.items.filter(function(item) {
          return !item.disabled && item.active && item.highlighted;
        });
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store2.prototype, "choices", {
      /**
       * Get choices from store
       */
      get: function() {
        return this.state.choices;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store2.prototype, "activeChoices", {
      /**
       * Get active choices from store
       */
      get: function() {
        return this.choices.filter(function(choice) {
          return choice.active;
        });
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store2.prototype, "searchableChoices", {
      /**
       * Get choices that can be searched (excluding placeholders)
       */
      get: function() {
        return this.choices.filter(function(choice) {
          return !choice.disabled && !choice.placeholder;
        });
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store2.prototype, "groups", {
      /**
       * Get groups from store
       */
      get: function() {
        return this.state.groups;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store2.prototype, "activeGroups", {
      /**
       * Get active groups from store
       */
      get: function() {
        var _this = this;
        return this.state.groups.filter(function(group) {
          var isActive = group.active && !group.disabled;
          var hasActiveOptions = _this.state.choices.some(function(choice) {
            return choice.active && !choice.disabled;
          });
          return isActive && hasActiveOptions;
        }, []);
      },
      enumerable: false,
      configurable: true
    });
    Store2.prototype.inTxn = function() {
      return this._txn > 0;
    };
    Store2.prototype.getChoiceById = function(id) {
      return this.activeChoices.find(function(choice) {
        return choice.id === id;
      });
    };
    Store2.prototype.getGroupById = function(id) {
      return this.groups.find(function(group) {
        return group.id === id;
      });
    };
    return Store2;
  }()
);
var NoticeTypes = {
  noChoices: "no-choices",
  noResults: "no-results",
  addChoice: "add-choice",
  generic: ""
};
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i)
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function isArray(value) {
  return !Array.isArray ? getTag(value) === "[object Array]" : Array.isArray(value);
}
var INFINITY = 1 / 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  let result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function isString(value) {
  return typeof value === "string";
}
function isNumber(value) {
  return typeof value === "number";
}
function isBoolean(value) {
  return value === true || value === false || isObjectLike(value) && getTag(value) == "[object Boolean]";
}
function isObject(value) {
  return typeof value === "object";
}
function isObjectLike(value) {
  return isObject(value) && value !== null;
}
function isDefined(value) {
  return value !== void 0 && value !== null;
}
function isBlank(value) {
  return !value.trim().length;
}
function getTag(value) {
  return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
}
var INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
var LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) => `Invalid value for key ${key}`;
var PATTERN_LENGTH_TOO_LARGE = (max) => `Pattern length exceeds max of ${max}.`;
var MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;
var INVALID_KEY_WEIGHT_VALUE = (key) => `Property 'weight' in key '${key}' must be a positive integer`;
var hasOwn = Object.prototype.hasOwnProperty;
var KeyStore = class {
  constructor(keys) {
    this._keys = [];
    this._keyMap = {};
    let totalWeight = 0;
    keys.forEach((key) => {
      let obj = createKey(key);
      this._keys.push(obj);
      this._keyMap[obj.id] = obj;
      totalWeight += obj.weight;
    });
    this._keys.forEach((key) => {
      key.weight /= totalWeight;
    });
  }
  get(keyId) {
    return this._keyMap[keyId];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
};
function createKey(key) {
  let path = null;
  let id = null;
  let src = null;
  let weight = 1;
  let getFn = null;
  if (isString(key) || isArray(key)) {
    src = key;
    path = createKeyPath(key);
    id = createKeyId(key);
  } else {
    if (!hasOwn.call(key, "name")) {
      throw new Error(MISSING_KEY_PROPERTY("name"));
    }
    const name = key.name;
    src = name;
    if (hasOwn.call(key, "weight")) {
      weight = key.weight;
      if (weight <= 0) {
        throw new Error(INVALID_KEY_WEIGHT_VALUE(name));
      }
    }
    path = createKeyPath(name);
    id = createKeyId(name);
    getFn = key.getFn;
  }
  return {
    path,
    id,
    weight,
    src,
    getFn
  };
}
function createKeyPath(key) {
  return isArray(key) ? key : key.split(".");
}
function createKeyId(key) {
  return isArray(key) ? key.join(".") : key;
}
function get(obj, path) {
  let list = [];
  let arr = false;
  const deepGet = (obj2, path2, index) => {
    if (!isDefined(obj2)) {
      return;
    }
    if (!path2[index]) {
      list.push(obj2);
    } else {
      let key = path2[index];
      const value = obj2[key];
      if (!isDefined(value)) {
        return;
      }
      if (index === path2.length - 1 && (isString(value) || isNumber(value) || isBoolean(value))) {
        list.push(toString(value));
      } else if (isArray(value)) {
        arr = true;
        for (let i = 0, len = value.length; i < len; i += 1) {
          deepGet(value[i], path2, index + 1);
        }
      } else if (path2.length) {
        deepGet(value, path2, index + 1);
      }
    }
  };
  deepGet(obj, isString(path) ? path.split(".") : path, 0);
  return arr ? list : list[0];
}
var MatchOptions = {
  // Whether the matches should be included in the result set. When `true`, each record in the result
  // set will include the indices of the matched characters.
  // These can consequently be used for highlighting purposes.
  includeMatches: false,
  // When `true`, the matching function will continue to the end of a search pattern even if
  // a perfect match has already been located in the string.
  findAllMatches: false,
  // Minimum number of characters that must be matched before a result is considered a match
  minMatchCharLength: 1
};
var BasicOptions = {
  // When `true`, the algorithm continues searching to the end of the input even if a perfect
  // match is found before the end of the same input.
  isCaseSensitive: false,
  // When true, the matching function will continue to the end of a search pattern even if
  includeScore: false,
  // List of properties that will be searched. This also supports nested properties.
  keys: [],
  // Whether to sort the result list, by score
  shouldSort: true,
  // Default sort function: sort by ascending score, ascending index
  sortFn: (a, b) => a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
};
var FuzzyOptions = {
  // Approximately where in the text is the pattern expected to be found?
  location: 0,
  // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
  // (of both letters and location), a threshold of '1.0' would match anything.
  threshold: 0.6,
  // Determines how close the match must be to the fuzzy location (specified above).
  // An exact letter match which is 'distance' characters away from the fuzzy location
  // would score as a complete mismatch. A distance of '0' requires the match be at
  // the exact location specified, a threshold of '1000' would require a perfect match
  // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
  distance: 100
};
var AdvancedOptions = {
  // When `true`, it enables the use of unix-like search commands
  useExtendedSearch: false,
  // The get function to use when fetching an object's properties.
  // The default will search nested paths *ie foo.bar.baz*
  getFn: get,
  // When `true`, search will ignore `location` and `distance`, so it won't matter
  // where in the string the pattern appears.
  // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
  ignoreLocation: false,
  // When `true`, the calculation for the relevance score (used for sorting) will
  // ignore the field-length norm.
  // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
  ignoreFieldNorm: false,
  // The weight to determine how much field length norm effects scoring.
  fieldNormWeight: 1
};
var Config = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, BasicOptions), MatchOptions), FuzzyOptions), AdvancedOptions);
var SPACE = /[^ ]+/g;
function norm(weight = 1, mantissa = 3) {
  const cache = /* @__PURE__ */ new Map();
  const m = Math.pow(10, mantissa);
  return {
    get(value) {
      const numTokens = value.match(SPACE).length;
      if (cache.has(numTokens)) {
        return cache.get(numTokens);
      }
      const norm2 = 1 / Math.pow(numTokens, 0.5 * weight);
      const n = parseFloat(Math.round(norm2 * m) / m);
      cache.set(numTokens, n);
      return n;
    },
    clear() {
      cache.clear();
    }
  };
}
var FuseIndex = class {
  constructor({
    getFn = Config.getFn,
    fieldNormWeight = Config.fieldNormWeight
  } = {}) {
    this.norm = norm(fieldNormWeight, 3);
    this.getFn = getFn;
    this.isCreated = false;
    this.setIndexRecords();
  }
  setSources(docs = []) {
    this.docs = docs;
  }
  setIndexRecords(records = []) {
    this.records = records;
  }
  setKeys(keys = []) {
    this.keys = keys;
    this._keysMap = {};
    keys.forEach((key, idx) => {
      this._keysMap[key.id] = idx;
    });
  }
  create() {
    if (this.isCreated || !this.docs.length) {
      return;
    }
    this.isCreated = true;
    if (isString(this.docs[0])) {
      this.docs.forEach((doc, docIndex) => {
        this._addString(doc, docIndex);
      });
    } else {
      this.docs.forEach((doc, docIndex) => {
        this._addObject(doc, docIndex);
      });
    }
    this.norm.clear();
  }
  // Adds a doc to the end of the index
  add(doc) {
    const idx = this.size();
    if (isString(doc)) {
      this._addString(doc, idx);
    } else {
      this._addObject(doc, idx);
    }
  }
  // Removes the doc at the specified index of the index
  removeAt(idx) {
    this.records.splice(idx, 1);
    for (let i = idx, len = this.size(); i < len; i += 1) {
      this.records[i].i -= 1;
    }
  }
  getValueForItemAtKeyId(item, keyId) {
    return item[this._keysMap[keyId]];
  }
  size() {
    return this.records.length;
  }
  _addString(doc, docIndex) {
    if (!isDefined(doc) || isBlank(doc)) {
      return;
    }
    let record = {
      v: doc,
      i: docIndex,
      n: this.norm.get(doc)
    };
    this.records.push(record);
  }
  _addObject(doc, docIndex) {
    let record = {
      i: docIndex,
      $: {}
    };
    this.keys.forEach((key, keyIndex) => {
      let value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
      if (!isDefined(value)) {
        return;
      }
      if (isArray(value)) {
        let subRecords = [];
        const stack = [{
          nestedArrIndex: -1,
          value
        }];
        while (stack.length) {
          const {
            nestedArrIndex,
            value: value2
          } = stack.pop();
          if (!isDefined(value2)) {
            continue;
          }
          if (isString(value2) && !isBlank(value2)) {
            let subRecord = {
              v: value2,
              i: nestedArrIndex,
              n: this.norm.get(value2)
            };
            subRecords.push(subRecord);
          } else if (isArray(value2)) {
            value2.forEach((item, k) => {
              stack.push({
                nestedArrIndex: k,
                value: item
              });
            });
          } else
            ;
        }
        record.$[keyIndex] = subRecords;
      } else if (isString(value) && !isBlank(value)) {
        let subRecord = {
          v: value,
          n: this.norm.get(value)
        };
        record.$[keyIndex] = subRecord;
      }
    });
    this.records.push(record);
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    };
  }
};
function createIndex(keys, docs, {
  getFn = Config.getFn,
  fieldNormWeight = Config.fieldNormWeight
} = {}) {
  const myIndex = new FuseIndex({
    getFn,
    fieldNormWeight
  });
  myIndex.setKeys(keys.map(createKey));
  myIndex.setSources(docs);
  myIndex.create();
  return myIndex;
}
function parseIndex(data, {
  getFn = Config.getFn,
  fieldNormWeight = Config.fieldNormWeight
} = {}) {
  const {
    keys,
    records
  } = data;
  const myIndex = new FuseIndex({
    getFn,
    fieldNormWeight
  });
  myIndex.setKeys(keys);
  myIndex.setIndexRecords(records);
  return myIndex;
}
function computeScore$1(pattern, {
  errors = 0,
  currentLocation = 0,
  expectedLocation = 0,
  distance = Config.distance,
  ignoreLocation = Config.ignoreLocation
} = {}) {
  const accuracy = errors / pattern.length;
  if (ignoreLocation) {
    return accuracy;
  }
  const proximity = Math.abs(expectedLocation - currentLocation);
  if (!distance) {
    return proximity ? 1 : accuracy;
  }
  return accuracy + proximity / distance;
}
function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
  let indices = [];
  let start = -1;
  let end = -1;
  let i = 0;
  for (let len = matchmask.length; i < len; i += 1) {
    let match = matchmask[i];
    if (match && start === -1) {
      start = i;
    } else if (!match && start !== -1) {
      end = i - 1;
      if (end - start + 1 >= minMatchCharLength) {
        indices.push([start, end]);
      }
      start = -1;
    }
  }
  if (matchmask[i - 1] && i - start >= minMatchCharLength) {
    indices.push([start, i - 1]);
  }
  return indices;
}
var MAX_BITS = 32;
function search(text, pattern, patternAlphabet, {
  location = Config.location,
  distance = Config.distance,
  threshold = Config.threshold,
  findAllMatches = Config.findAllMatches,
  minMatchCharLength = Config.minMatchCharLength,
  includeMatches = Config.includeMatches,
  ignoreLocation = Config.ignoreLocation
} = {}) {
  if (pattern.length > MAX_BITS) {
    throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS));
  }
  const patternLen = pattern.length;
  const textLen = text.length;
  const expectedLocation = Math.max(0, Math.min(location, textLen));
  let currentThreshold = threshold;
  let bestLocation = expectedLocation;
  const computeMatches = minMatchCharLength > 1 || includeMatches;
  const matchMask = computeMatches ? Array(textLen) : [];
  let index;
  while ((index = text.indexOf(pattern, bestLocation)) > -1) {
    let score = computeScore$1(pattern, {
      currentLocation: index,
      expectedLocation,
      distance,
      ignoreLocation
    });
    currentThreshold = Math.min(score, currentThreshold);
    bestLocation = index + patternLen;
    if (computeMatches) {
      let i = 0;
      while (i < patternLen) {
        matchMask[index + i] = 1;
        i += 1;
      }
    }
  }
  bestLocation = -1;
  let lastBitArr = [];
  let finalScore = 1;
  let binMax = patternLen + textLen;
  const mask = 1 << patternLen - 1;
  for (let i = 0; i < patternLen; i += 1) {
    let binMin = 0;
    let binMid = binMax;
    while (binMin < binMid) {
      const score2 = computeScore$1(pattern, {
        errors: i,
        currentLocation: expectedLocation + binMid,
        expectedLocation,
        distance,
        ignoreLocation
      });
      if (score2 <= currentThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }
      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }
    binMax = binMid;
    let start = Math.max(1, expectedLocation - binMid + 1);
    let finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
    let bitArr = Array(finish + 2);
    bitArr[finish + 1] = (1 << i) - 1;
    for (let j = finish; j >= start; j -= 1) {
      let currentLocation = j - 1;
      let charMatch = patternAlphabet[text.charAt(currentLocation)];
      if (computeMatches) {
        matchMask[currentLocation] = +!!charMatch;
      }
      bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
      if (i) {
        bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
      }
      if (bitArr[j] & mask) {
        finalScore = computeScore$1(pattern, {
          errors: i,
          currentLocation,
          expectedLocation,
          distance,
          ignoreLocation
        });
        if (finalScore <= currentThreshold) {
          currentThreshold = finalScore;
          bestLocation = currentLocation;
          if (bestLocation <= expectedLocation) {
            break;
          }
          start = Math.max(1, 2 * expectedLocation - bestLocation);
        }
      }
    }
    const score = computeScore$1(pattern, {
      errors: i + 1,
      currentLocation: expectedLocation,
      expectedLocation,
      distance,
      ignoreLocation
    });
    if (score > currentThreshold) {
      break;
    }
    lastBitArr = bitArr;
  }
  const result = {
    isMatch: bestLocation >= 0,
    // Count exact matches (those with a score of 0) to be "almost" exact
    score: Math.max(1e-3, finalScore)
  };
  if (computeMatches) {
    const indices = convertMaskToIndices(matchMask, minMatchCharLength);
    if (!indices.length) {
      result.isMatch = false;
    } else if (includeMatches) {
      result.indices = indices;
    }
  }
  return result;
}
function createPatternAlphabet(pattern) {
  let mask = {};
  for (let i = 0, len = pattern.length; i < len; i += 1) {
    const char = pattern.charAt(i);
    mask[char] = (mask[char] || 0) | 1 << len - i - 1;
  }
  return mask;
}
var BitapSearch = class {
  constructor(pattern, {
    location = Config.location,
    threshold = Config.threshold,
    distance = Config.distance,
    includeMatches = Config.includeMatches,
    findAllMatches = Config.findAllMatches,
    minMatchCharLength = Config.minMatchCharLength,
    isCaseSensitive = Config.isCaseSensitive,
    ignoreLocation = Config.ignoreLocation
  } = {}) {
    this.options = {
      location,
      threshold,
      distance,
      includeMatches,
      findAllMatches,
      minMatchCharLength,
      isCaseSensitive,
      ignoreLocation
    };
    this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
    this.chunks = [];
    if (!this.pattern.length) {
      return;
    }
    const addChunk = (pattern2, startIndex) => {
      this.chunks.push({
        pattern: pattern2,
        alphabet: createPatternAlphabet(pattern2),
        startIndex
      });
    };
    const len = this.pattern.length;
    if (len > MAX_BITS) {
      let i = 0;
      const remainder = len % MAX_BITS;
      const end = len - remainder;
      while (i < end) {
        addChunk(this.pattern.substr(i, MAX_BITS), i);
        i += MAX_BITS;
      }
      if (remainder) {
        const startIndex = len - MAX_BITS;
        addChunk(this.pattern.substr(startIndex), startIndex);
      }
    } else {
      addChunk(this.pattern, 0);
    }
  }
  searchIn(text) {
    const {
      isCaseSensitive,
      includeMatches
    } = this.options;
    if (!isCaseSensitive) {
      text = text.toLowerCase();
    }
    if (this.pattern === text) {
      let result2 = {
        isMatch: true,
        score: 0
      };
      if (includeMatches) {
        result2.indices = [[0, text.length - 1]];
      }
      return result2;
    }
    const {
      location,
      distance,
      threshold,
      findAllMatches,
      minMatchCharLength,
      ignoreLocation
    } = this.options;
    let allIndices = [];
    let totalScore = 0;
    let hasMatches = false;
    this.chunks.forEach(({
      pattern,
      alphabet,
      startIndex
    }) => {
      const {
        isMatch,
        score,
        indices
      } = search(text, pattern, alphabet, {
        location: location + startIndex,
        distance,
        threshold,
        findAllMatches,
        minMatchCharLength,
        includeMatches,
        ignoreLocation
      });
      if (isMatch) {
        hasMatches = true;
      }
      totalScore += score;
      if (isMatch && indices) {
        allIndices = [...allIndices, ...indices];
      }
    });
    let result = {
      isMatch: hasMatches,
      score: hasMatches ? totalScore / this.chunks.length : 1
    };
    if (hasMatches && includeMatches) {
      result.indices = allIndices;
    }
    return result;
  }
};
var BaseMatch = class {
  constructor(pattern) {
    this.pattern = pattern;
  }
  static isMultiMatch(pattern) {
    return getMatch(pattern, this.multiRegex);
  }
  static isSingleMatch(pattern) {
    return getMatch(pattern, this.singleRegex);
  }
  search() {
  }
};
function getMatch(pattern, exp) {
  const matches = pattern.match(exp);
  return matches ? matches[1] : null;
}
var ExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "exact";
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(text) {
    const isMatch = text === this.pattern;
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
};
var InverseExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "inverse-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(text) {
    const index = text.indexOf(this.pattern);
    const isMatch = index === -1;
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    };
  }
};
var PrefixExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "prefix-exact";
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(text) {
    const isMatch = text.startsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
};
var InversePrefixExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "inverse-prefix-exact";
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(text) {
    const isMatch = !text.startsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    };
  }
};
var SuffixExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "suffix-exact";
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(text) {
    const isMatch = text.endsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [text.length - this.pattern.length, text.length - 1]
    };
  }
};
var InverseSuffixExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "inverse-suffix-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(text) {
    const isMatch = !text.endsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    };
  }
};
var FuzzyMatch = class extends BaseMatch {
  constructor(pattern, {
    location = Config.location,
    threshold = Config.threshold,
    distance = Config.distance,
    includeMatches = Config.includeMatches,
    findAllMatches = Config.findAllMatches,
    minMatchCharLength = Config.minMatchCharLength,
    isCaseSensitive = Config.isCaseSensitive,
    ignoreLocation = Config.ignoreLocation
  } = {}) {
    super(pattern);
    this._bitapSearch = new BitapSearch(pattern, {
      location,
      threshold,
      distance,
      includeMatches,
      findAllMatches,
      minMatchCharLength,
      isCaseSensitive,
      ignoreLocation
    });
  }
  static get type() {
    return "fuzzy";
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(text) {
    return this._bitapSearch.searchIn(text);
  }
};
var IncludeMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "include";
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(text) {
    let location = 0;
    let index;
    const indices = [];
    const patternLen = this.pattern.length;
    while ((index = text.indexOf(this.pattern, location)) > -1) {
      location = index + patternLen;
      indices.push([index, location - 1]);
    }
    const isMatch = !!indices.length;
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices
    };
  }
};
var searchers = [ExactMatch, IncludeMatch, PrefixExactMatch, InversePrefixExactMatch, InverseSuffixExactMatch, SuffixExactMatch, InverseExactMatch, FuzzyMatch];
var searchersLen = searchers.length;
var SPACE_RE = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
var OR_TOKEN = "|";
function parseQuery(pattern, options = {}) {
  return pattern.split(OR_TOKEN).map((item) => {
    let query = item.trim().split(SPACE_RE).filter((item2) => item2 && !!item2.trim());
    let results = [];
    for (let i = 0, len = query.length; i < len; i += 1) {
      const queryItem = query[i];
      let found = false;
      let idx = -1;
      while (!found && ++idx < searchersLen) {
        const searcher = searchers[idx];
        let token = searcher.isMultiMatch(queryItem);
        if (token) {
          results.push(new searcher(token, options));
          found = true;
        }
      }
      if (found) {
        continue;
      }
      idx = -1;
      while (++idx < searchersLen) {
        const searcher = searchers[idx];
        let token = searcher.isSingleMatch(queryItem);
        if (token) {
          results.push(new searcher(token, options));
          break;
        }
      }
    }
    return results;
  });
}
var MultiMatchSet = /* @__PURE__ */ new Set([FuzzyMatch.type, IncludeMatch.type]);
var ExtendedSearch = class {
  constructor(pattern, {
    isCaseSensitive = Config.isCaseSensitive,
    includeMatches = Config.includeMatches,
    minMatchCharLength = Config.minMatchCharLength,
    ignoreLocation = Config.ignoreLocation,
    findAllMatches = Config.findAllMatches,
    location = Config.location,
    threshold = Config.threshold,
    distance = Config.distance
  } = {}) {
    this.query = null;
    this.options = {
      isCaseSensitive,
      includeMatches,
      minMatchCharLength,
      findAllMatches,
      ignoreLocation,
      location,
      threshold,
      distance
    };
    this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
    this.query = parseQuery(this.pattern, this.options);
  }
  static condition(_, options) {
    return options.useExtendedSearch;
  }
  searchIn(text) {
    const query = this.query;
    if (!query) {
      return {
        isMatch: false,
        score: 1
      };
    }
    const {
      includeMatches,
      isCaseSensitive
    } = this.options;
    text = isCaseSensitive ? text : text.toLowerCase();
    let numMatches = 0;
    let allIndices = [];
    let totalScore = 0;
    for (let i = 0, qLen = query.length; i < qLen; i += 1) {
      const searchers2 = query[i];
      allIndices.length = 0;
      numMatches = 0;
      for (let j = 0, pLen = searchers2.length; j < pLen; j += 1) {
        const searcher = searchers2[j];
        const {
          isMatch,
          indices,
          score
        } = searcher.search(text);
        if (isMatch) {
          numMatches += 1;
          totalScore += score;
          if (includeMatches) {
            const type = searcher.constructor.type;
            if (MultiMatchSet.has(type)) {
              allIndices = [...allIndices, ...indices];
            } else {
              allIndices.push(indices);
            }
          }
        } else {
          totalScore = 0;
          numMatches = 0;
          allIndices.length = 0;
          break;
        }
      }
      if (numMatches) {
        let result = {
          isMatch: true,
          score: totalScore / numMatches
        };
        if (includeMatches) {
          result.indices = allIndices;
        }
        return result;
      }
    }
    return {
      isMatch: false,
      score: 1
    };
  }
};
var registeredSearchers = [];
function register(...args) {
  registeredSearchers.push(...args);
}
function createSearcher(pattern, options) {
  for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
    let searcherClass = registeredSearchers[i];
    if (searcherClass.condition(pattern, options)) {
      return new searcherClass(pattern, options);
    }
  }
  return new BitapSearch(pattern, options);
}
var LogicalOperator = {
  AND: "$and",
  OR: "$or"
};
var KeyType = {
  PATH: "$path",
  PATTERN: "$val"
};
var isExpression = (query) => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
var isPath = (query) => !!query[KeyType.PATH];
var isLeaf = (query) => !isArray(query) && isObject(query) && !isExpression(query);
var convertToExplicit = (query) => ({
  [LogicalOperator.AND]: Object.keys(query).map((key) => ({
    [key]: query[key]
  }))
});
function parse(query, options, {
  auto = true
} = {}) {
  const next = (query2) => {
    let keys = Object.keys(query2);
    const isQueryPath = isPath(query2);
    if (!isQueryPath && keys.length > 1 && !isExpression(query2)) {
      return next(convertToExplicit(query2));
    }
    if (isLeaf(query2)) {
      const key = isQueryPath ? query2[KeyType.PATH] : keys[0];
      const pattern = isQueryPath ? query2[KeyType.PATTERN] : query2[key];
      if (!isString(pattern)) {
        throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
      }
      const obj = {
        keyId: createKeyId(key),
        pattern
      };
      if (auto) {
        obj.searcher = createSearcher(pattern, options);
      }
      return obj;
    }
    let node = {
      children: [],
      operator: keys[0]
    };
    keys.forEach((key) => {
      const value = query2[key];
      if (isArray(value)) {
        value.forEach((item) => {
          node.children.push(next(item));
        });
      }
    });
    return node;
  };
  if (!isExpression(query)) {
    query = convertToExplicit(query);
  }
  return next(query);
}
function computeScore(results, {
  ignoreFieldNorm = Config.ignoreFieldNorm
}) {
  results.forEach((result) => {
    let totalScore = 1;
    result.matches.forEach(({
      key,
      norm: norm2,
      score
    }) => {
      const weight = key ? key.weight : null;
      totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm2));
    });
    result.score = totalScore;
  });
}
function transformMatches(result, data) {
  const matches = result.matches;
  data.matches = [];
  if (!isDefined(matches)) {
    return;
  }
  matches.forEach((match) => {
    if (!isDefined(match.indices) || !match.indices.length) {
      return;
    }
    const {
      indices,
      value
    } = match;
    let obj = {
      indices,
      value
    };
    if (match.key) {
      obj.key = match.key.src;
    }
    if (match.idx > -1) {
      obj.refIndex = match.idx;
    }
    data.matches.push(obj);
  });
}
function transformScore(result, data) {
  data.score = result.score;
}
function format(results, docs, {
  includeMatches = Config.includeMatches,
  includeScore = Config.includeScore
} = {}) {
  const transformers = [];
  if (includeMatches)
    transformers.push(transformMatches);
  if (includeScore)
    transformers.push(transformScore);
  return results.map((result) => {
    const {
      idx
    } = result;
    const data = {
      item: docs[idx],
      refIndex: idx
    };
    if (transformers.length) {
      transformers.forEach((transformer) => {
        transformer(result, data);
      });
    }
    return data;
  });
}
var Fuse = class {
  constructor(docs, options = {}, index) {
    this.options = _objectSpread2(_objectSpread2({}, Config), options);
    if (this.options.useExtendedSearch && false) {
      throw new Error(EXTENDED_SEARCH_UNAVAILABLE);
    }
    this._keyStore = new KeyStore(this.options.keys);
    this.setCollection(docs, index);
  }
  setCollection(docs, index) {
    this._docs = docs;
    if (index && !(index instanceof FuseIndex)) {
      throw new Error(INCORRECT_INDEX_TYPE);
    }
    this._myIndex = index || createIndex(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    });
  }
  add(doc) {
    if (!isDefined(doc)) {
      return;
    }
    this._docs.push(doc);
    this._myIndex.add(doc);
  }
  remove(predicate = () => false) {
    const results = [];
    for (let i = 0, len = this._docs.length; i < len; i += 1) {
      const doc = this._docs[i];
      if (predicate(doc, i)) {
        this.removeAt(i);
        i -= 1;
        len -= 1;
        results.push(doc);
      }
    }
    return results;
  }
  removeAt(idx) {
    this._docs.splice(idx, 1);
    this._myIndex.removeAt(idx);
  }
  getIndex() {
    return this._myIndex;
  }
  search(query, {
    limit = -1
  } = {}) {
    const {
      includeMatches,
      includeScore,
      shouldSort,
      sortFn,
      ignoreFieldNorm
    } = this.options;
    let results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
    computeScore(results, {
      ignoreFieldNorm
    });
    if (shouldSort) {
      results.sort(sortFn);
    }
    if (isNumber(limit) && limit > -1) {
      results = results.slice(0, limit);
    }
    return format(results, this._docs, {
      includeMatches,
      includeScore
    });
  }
  _searchStringList(query) {
    const searcher = createSearcher(query, this.options);
    const {
      records
    } = this._myIndex;
    const results = [];
    records.forEach(({
      v: text,
      i: idx,
      n: norm2
    }) => {
      if (!isDefined(text)) {
        return;
      }
      const {
        isMatch,
        score,
        indices
      } = searcher.searchIn(text);
      if (isMatch) {
        results.push({
          item: text,
          idx,
          matches: [{
            score,
            value: text,
            norm: norm2,
            indices
          }]
        });
      }
    });
    return results;
  }
  _searchLogical(query) {
    const expression = parse(query, this.options);
    const evaluate = (node, item, idx) => {
      if (!node.children) {
        const {
          keyId,
          searcher
        } = node;
        const matches = this._findMatches({
          key: this._keyStore.get(keyId),
          value: this._myIndex.getValueForItemAtKeyId(item, keyId),
          searcher
        });
        if (matches && matches.length) {
          return [{
            idx,
            item,
            matches
          }];
        }
        return [];
      }
      const res = [];
      for (let i = 0, len = node.children.length; i < len; i += 1) {
        const child = node.children[i];
        const result = evaluate(child, item, idx);
        if (result.length) {
          res.push(...result);
        } else if (node.operator === LogicalOperator.AND) {
          return [];
        }
      }
      return res;
    };
    const records = this._myIndex.records;
    const resultMap = {};
    const results = [];
    records.forEach(({
      $: item,
      i: idx
    }) => {
      if (isDefined(item)) {
        let expResults = evaluate(expression, item, idx);
        if (expResults.length) {
          if (!resultMap[idx]) {
            resultMap[idx] = {
              idx,
              item,
              matches: []
            };
            results.push(resultMap[idx]);
          }
          expResults.forEach(({
            matches
          }) => {
            resultMap[idx].matches.push(...matches);
          });
        }
      }
    });
    return results;
  }
  _searchObjectList(query) {
    const searcher = createSearcher(query, this.options);
    const {
      keys,
      records
    } = this._myIndex;
    const results = [];
    records.forEach(({
      $: item,
      i: idx
    }) => {
      if (!isDefined(item)) {
        return;
      }
      let matches = [];
      keys.forEach((key, keyIndex) => {
        matches.push(...this._findMatches({
          key,
          value: item[keyIndex],
          searcher
        }));
      });
      if (matches.length) {
        results.push({
          idx,
          item,
          matches
        });
      }
    });
    return results;
  }
  _findMatches({
    key,
    value,
    searcher
  }) {
    if (!isDefined(value)) {
      return [];
    }
    let matches = [];
    if (isArray(value)) {
      value.forEach(({
        v: text,
        i: idx,
        n: norm2
      }) => {
        if (!isDefined(text)) {
          return;
        }
        const {
          isMatch,
          score,
          indices
        } = searcher.searchIn(text);
        if (isMatch) {
          matches.push({
            score,
            key,
            value: text,
            idx,
            norm: norm2,
            indices
          });
        }
      });
    } else {
      const {
        v: text,
        n: norm2
      } = value;
      const {
        isMatch,
        score,
        indices
      } = searcher.searchIn(text);
      if (isMatch) {
        matches.push({
          score,
          key,
          value: text,
          norm: norm2,
          indices
        });
      }
    }
    return matches;
  }
};
Fuse.version = "7.0.0";
Fuse.createIndex = createIndex;
Fuse.parseIndex = parseIndex;
Fuse.config = Config;
{
  Fuse.parseQuery = parse;
}
{
  register(ExtendedSearch);
}
var SearchByFuse = (
  /** @class */
  function() {
    function SearchByFuse2(config) {
      this._haystack = [];
      this._fuseOptions = __assign(__assign({}, config.fuseOptions), { keys: __spreadArray([], config.searchFields, true), includeMatches: true });
    }
    SearchByFuse2.prototype.index = function(data) {
      this._haystack = data;
      if (this._fuse) {
        this._fuse.setCollection(data);
      }
    };
    SearchByFuse2.prototype.reset = function() {
      this._haystack = [];
      this._fuse = void 0;
    };
    SearchByFuse2.prototype.isEmptyIndex = function() {
      return !this._haystack.length;
    };
    SearchByFuse2.prototype.search = function(needle) {
      if (!this._fuse) {
        {
          this._fuse = new Fuse(this._haystack, this._fuseOptions);
        }
      }
      var results = this._fuse.search(needle);
      return results.map(function(value, i) {
        return {
          item: value.item,
          score: value.score || 0,
          rank: i + 1
          // If value.score is used for sorting, this can create non-stable sorts!
        };
      });
    };
    return SearchByFuse2;
  }()
);
function getSearcher(config) {
  {
    return new SearchByFuse(config);
  }
}
var isEmptyObject = function(obj) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
};
var assignCustomProperties = function(el, choice, withCustomProperties) {
  var dataset = el.dataset;
  var customProperties = choice.customProperties, labelClass = choice.labelClass, labelDescription = choice.labelDescription;
  if (labelClass) {
    dataset.labelClass = getClassNames(labelClass).join(" ");
  }
  if (labelDescription) {
    dataset.labelDescription = labelDescription;
  }
  if (withCustomProperties && customProperties) {
    if (typeof customProperties === "string") {
      dataset.customProperties = customProperties;
    } else if (typeof customProperties === "object" && !isEmptyObject(customProperties)) {
      dataset.customProperties = JSON.stringify(customProperties);
    }
  }
};
var addAriaLabel = function(docRoot, id, element) {
  var label = id && docRoot.querySelector("label[for='".concat(id, "']"));
  var text = label && label.innerText;
  if (text) {
    element.setAttribute("aria-label", text);
  }
};
var templates = {
  containerOuter: function(_a, dir, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId) {
    var containerOuter = _a.classNames.containerOuter;
    var div = document.createElement("div");
    addClassesToElement(div, containerOuter);
    div.dataset.type = passedElementType;
    if (dir) {
      div.dir = dir;
    }
    if (isSelectOneElement) {
      div.tabIndex = 0;
    }
    if (isSelectElement) {
      div.setAttribute("role", searchEnabled ? "combobox" : "listbox");
      if (searchEnabled) {
        div.setAttribute("aria-autocomplete", "list");
      } else if (!labelId) {
        addAriaLabel(this._docRoot, this.passedElement.element.id, div);
      }
      div.setAttribute("aria-haspopup", "true");
      div.setAttribute("aria-expanded", "false");
    }
    if (labelId) {
      div.setAttribute("aria-labelledby", labelId);
    }
    return div;
  },
  containerInner: function(_a) {
    var containerInner = _a.classNames.containerInner;
    var div = document.createElement("div");
    addClassesToElement(div, containerInner);
    return div;
  },
  itemList: function(_a, isSelectOneElement) {
    var searchEnabled = _a.searchEnabled, _b = _a.classNames, list = _b.list, listSingle = _b.listSingle, listItems = _b.listItems;
    var div = document.createElement("div");
    addClassesToElement(div, list);
    addClassesToElement(div, isSelectOneElement ? listSingle : listItems);
    if (this._isSelectElement && searchEnabled) {
      div.setAttribute("role", "listbox");
    }
    return div;
  },
  placeholder: function(_a, value) {
    var allowHTML = _a.allowHTML, placeholder = _a.classNames.placeholder;
    var div = document.createElement("div");
    addClassesToElement(div, placeholder);
    setElementHtml(div, allowHTML, value);
    return div;
  },
  item: function(_a, choice, removeItemButton) {
    var allowHTML = _a.allowHTML, removeItemButtonAlignLeft = _a.removeItemButtonAlignLeft, removeItemIconText = _a.removeItemIconText, removeItemLabelText = _a.removeItemLabelText, _b = _a.classNames, item = _b.item, button = _b.button, highlightedState = _b.highlightedState, itemSelectable = _b.itemSelectable, placeholder = _b.placeholder;
    var rawValue = unwrapStringForRaw(choice.value);
    var div = document.createElement("div");
    addClassesToElement(div, item);
    if (choice.labelClass) {
      var spanLabel = document.createElement("span");
      setElementHtml(spanLabel, allowHTML, choice.label);
      addClassesToElement(spanLabel, choice.labelClass);
      div.appendChild(spanLabel);
    } else {
      setElementHtml(div, allowHTML, choice.label);
    }
    div.dataset.item = "";
    div.dataset.id = choice.id;
    div.dataset.value = rawValue;
    assignCustomProperties(div, choice, true);
    if (choice.disabled || this.containerOuter.isDisabled) {
      div.setAttribute("aria-disabled", "true");
    }
    if (this._isSelectElement) {
      div.setAttribute("aria-selected", "true");
      div.setAttribute("role", "option");
    }
    if (choice.placeholder) {
      addClassesToElement(div, placeholder);
      div.dataset.placeholder = "";
    }
    addClassesToElement(div, choice.highlighted ? highlightedState : itemSelectable);
    if (removeItemButton) {
      if (choice.disabled) {
        removeClassesFromElement(div, itemSelectable);
      }
      div.dataset.deletable = "";
      var removeButton = document.createElement("button");
      removeButton.type = "button";
      addClassesToElement(removeButton, button);
      setElementHtml(removeButton, true, resolveNoticeFunction(removeItemIconText, choice.value));
      var REMOVE_ITEM_LABEL = resolveNoticeFunction(removeItemLabelText, choice.value);
      if (REMOVE_ITEM_LABEL) {
        removeButton.setAttribute("aria-label", REMOVE_ITEM_LABEL);
      }
      removeButton.dataset.button = "";
      if (removeItemButtonAlignLeft) {
        div.insertAdjacentElement("afterbegin", removeButton);
      } else {
        div.appendChild(removeButton);
      }
    }
    return div;
  },
  choiceList: function(_a, isSelectOneElement) {
    var list = _a.classNames.list;
    var div = document.createElement("div");
    addClassesToElement(div, list);
    if (!isSelectOneElement) {
      div.setAttribute("aria-multiselectable", "true");
    }
    div.setAttribute("role", "listbox");
    return div;
  },
  choiceGroup: function(_a, _b) {
    var allowHTML = _a.allowHTML, _c = _a.classNames, group = _c.group, groupHeading = _c.groupHeading, itemDisabled = _c.itemDisabled;
    var id = _b.id, label = _b.label, disabled = _b.disabled;
    var rawLabel = unwrapStringForRaw(label);
    var div = document.createElement("div");
    addClassesToElement(div, group);
    if (disabled) {
      addClassesToElement(div, itemDisabled);
    }
    div.setAttribute("role", "group");
    div.dataset.group = "";
    div.dataset.id = id;
    div.dataset.value = rawLabel;
    if (disabled) {
      div.setAttribute("aria-disabled", "true");
    }
    var heading = document.createElement("div");
    addClassesToElement(heading, groupHeading);
    setElementHtml(heading, allowHTML, label || "");
    div.appendChild(heading);
    return div;
  },
  choice: function(_a, choice, selectText, groupName) {
    var allowHTML = _a.allowHTML, _b = _a.classNames, item = _b.item, itemChoice = _b.itemChoice, itemSelectable = _b.itemSelectable, selectedState = _b.selectedState, itemDisabled = _b.itemDisabled, description = _b.description, placeholder = _b.placeholder;
    var label = choice.label;
    var rawValue = unwrapStringForRaw(choice.value);
    var div = document.createElement("div");
    div.id = choice.elementId;
    addClassesToElement(div, item);
    addClassesToElement(div, itemChoice);
    if (groupName && typeof label === "string") {
      label = escapeForTemplate(allowHTML, label);
      label += " (".concat(groupName, ")");
      label = { trusted: label };
    }
    var describedBy = div;
    if (choice.labelClass) {
      var spanLabel = document.createElement("span");
      setElementHtml(spanLabel, allowHTML, label);
      addClassesToElement(spanLabel, choice.labelClass);
      describedBy = spanLabel;
      div.appendChild(spanLabel);
    } else {
      setElementHtml(div, allowHTML, label);
    }
    if (choice.labelDescription) {
      var descId = "".concat(choice.elementId, "-description");
      describedBy.setAttribute("aria-describedby", descId);
      var spanDesc = document.createElement("span");
      setElementHtml(spanDesc, allowHTML, choice.labelDescription);
      spanDesc.id = descId;
      addClassesToElement(spanDesc, description);
      div.appendChild(spanDesc);
    }
    if (choice.selected) {
      addClassesToElement(div, selectedState);
    }
    if (choice.placeholder) {
      addClassesToElement(div, placeholder);
    }
    div.setAttribute("role", choice.group ? "treeitem" : "option");
    div.dataset.choice = "";
    div.dataset.id = choice.id;
    div.dataset.value = rawValue;
    if (selectText) {
      div.dataset.selectText = selectText;
    }
    if (choice.group) {
      div.dataset.groupId = "".concat(choice.group.id);
    }
    assignCustomProperties(div, choice, false);
    if (choice.disabled) {
      addClassesToElement(div, itemDisabled);
      div.dataset.choiceDisabled = "";
      div.setAttribute("aria-disabled", "true");
    } else {
      addClassesToElement(div, itemSelectable);
      div.dataset.choiceSelectable = "";
    }
    return div;
  },
  input: function(_a, placeholderValue) {
    var _b = _a.classNames, input = _b.input, inputCloned = _b.inputCloned, labelId = _a.labelId;
    var inp = document.createElement("input");
    inp.type = "search";
    addClassesToElement(inp, input);
    addClassesToElement(inp, inputCloned);
    inp.autocomplete = "off";
    inp.autocapitalize = "off";
    inp.spellcheck = false;
    inp.setAttribute("role", "textbox");
    inp.setAttribute("aria-autocomplete", "list");
    if (placeholderValue) {
      inp.setAttribute("aria-label", placeholderValue);
    } else if (!labelId) {
      addAriaLabel(this._docRoot, this.passedElement.element.id, inp);
    }
    return inp;
  },
  dropdown: function(_a) {
    var _b = _a.classNames, list = _b.list, listDropdown = _b.listDropdown;
    var div = document.createElement("div");
    addClassesToElement(div, list);
    addClassesToElement(div, listDropdown);
    div.setAttribute("aria-expanded", "false");
    return div;
  },
  notice: function(_a, innerHTML, type) {
    var _b = _a.classNames, item = _b.item, itemChoice = _b.itemChoice, addChoice2 = _b.addChoice, noResults = _b.noResults, noChoices = _b.noChoices, noticeItem = _b.notice;
    if (type === void 0) {
      type = NoticeTypes.generic;
    }
    var notice = document.createElement("div");
    setElementHtml(notice, true, innerHTML);
    addClassesToElement(notice, item);
    addClassesToElement(notice, itemChoice);
    addClassesToElement(notice, noticeItem);
    switch (type) {
      case NoticeTypes.addChoice:
        addClassesToElement(notice, addChoice2);
        break;
      case NoticeTypes.noResults:
        addClassesToElement(notice, noResults);
        break;
      case NoticeTypes.noChoices:
        addClassesToElement(notice, noChoices);
        break;
    }
    if (type === NoticeTypes.addChoice) {
      notice.dataset.choiceSelectable = "";
      notice.dataset.choice = "";
    }
    return notice;
  },
  option: function(choice) {
    var labelValue = unwrapStringForRaw(choice.label);
    var opt = new Option(labelValue, choice.value, false, choice.selected);
    assignCustomProperties(opt, choice, true);
    opt.disabled = choice.disabled;
    if (choice.selected) {
      opt.setAttribute("selected", "");
    }
    return opt;
  }
};
var IS_IE11 = "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style;
var USER_DEFAULTS = {};
var parseDataSetId = function(element) {
  if (!element) {
    return void 0;
  }
  return element.dataset.id ? parseInt(element.dataset.id, 10) : void 0;
};
var selectableChoiceIdentifier = "[data-choice-selectable]";
var Choices = (
  /** @class */
  function() {
    function Choices2(element, userConfig) {
      if (element === void 0) {
        element = "[data-choice]";
      }
      if (userConfig === void 0) {
        userConfig = {};
      }
      var _this = this;
      this.initialisedOK = void 0;
      this._hasNonChoicePlaceholder = false;
      this._lastAddedChoiceId = 0;
      this._lastAddedGroupId = 0;
      var defaults = Choices2.defaults;
      this.config = __assign(__assign(__assign({}, defaults.allOptions), defaults.options), userConfig);
      ObjectsInConfig.forEach(function(key) {
        _this.config[key] = __assign(__assign(__assign({}, defaults.allOptions[key]), defaults.options[key]), userConfig[key]);
      });
      var config = this.config;
      if (!config.silent) {
        this._validateConfig();
      }
      var docRoot = config.shadowRoot || document.documentElement;
      this._docRoot = docRoot;
      var passedElement = typeof element === "string" ? docRoot.querySelector(element) : element;
      if (!passedElement || typeof passedElement !== "object" || !(isHtmlInputElement(passedElement) || isHtmlSelectElement(passedElement))) {
        if (!passedElement && typeof element === "string") {
          throw TypeError("Selector ".concat(element, " failed to find an element"));
        }
        throw TypeError("Expected one of the following types text|select-one|select-multiple");
      }
      var elementType = passedElement.type;
      var isText = elementType === PassedElementTypes.Text;
      if (isText || config.maxItemCount !== 1) {
        config.singleModeForMultiSelect = false;
      }
      if (config.singleModeForMultiSelect) {
        elementType = PassedElementTypes.SelectMultiple;
      }
      var isSelectOne = elementType === PassedElementTypes.SelectOne;
      var isSelectMultiple = elementType === PassedElementTypes.SelectMultiple;
      var isSelect = isSelectOne || isSelectMultiple;
      this._elementType = elementType;
      this._isTextElement = isText;
      this._isSelectOneElement = isSelectOne;
      this._isSelectMultipleElement = isSelectMultiple;
      this._isSelectElement = isSelectOne || isSelectMultiple;
      this._canAddUserChoices = isText && config.addItems || isSelect && config.addChoices;
      if (typeof config.renderSelectedChoices !== "boolean") {
        config.renderSelectedChoices = config.renderSelectedChoices === "always" || isSelectOne;
      }
      if (config.closeDropdownOnSelect === "auto") {
        config.closeDropdownOnSelect = isText || isSelectOne || config.singleModeForMultiSelect;
      } else {
        config.closeDropdownOnSelect = coerceBool(config.closeDropdownOnSelect);
      }
      if (config.placeholder) {
        if (config.placeholderValue) {
          this._hasNonChoicePlaceholder = true;
        } else if (passedElement.dataset.placeholder) {
          this._hasNonChoicePlaceholder = true;
          config.placeholderValue = passedElement.dataset.placeholder;
        }
      }
      if (userConfig.addItemFilter && typeof userConfig.addItemFilter !== "function") {
        var re = userConfig.addItemFilter instanceof RegExp ? userConfig.addItemFilter : new RegExp(userConfig.addItemFilter);
        config.addItemFilter = re.test.bind(re);
      }
      if (this._isTextElement) {
        this.passedElement = new WrappedInput({
          element: passedElement,
          classNames: config.classNames
        });
      } else {
        var selectEl = passedElement;
        this.passedElement = new WrappedSelect({
          element: selectEl,
          classNames: config.classNames,
          template: function(data) {
            return _this._templates.option(data);
          },
          extractPlaceholder: config.placeholder && !this._hasNonChoicePlaceholder
        });
      }
      this.initialised = false;
      this._store = new Store(config);
      this._currentValue = "";
      config.searchEnabled = !isText && config.searchEnabled || isSelectMultiple;
      this._canSearch = config.searchEnabled;
      this._isScrollingOnIe = false;
      this._highlightPosition = 0;
      this._wasTap = true;
      this._placeholderValue = this._generatePlaceholderValue();
      this._baseId = generateId(passedElement, "choices-");
      this._direction = passedElement.dir;
      if (!this._direction) {
        var elementDirection = window.getComputedStyle(passedElement).direction;
        var documentDirection = window.getComputedStyle(document.documentElement).direction;
        if (elementDirection !== documentDirection) {
          this._direction = elementDirection;
        }
      }
      this._idNames = {
        itemChoice: "item-choice"
      };
      this._templates = defaults.templates;
      this._render = this._render.bind(this);
      this._onFocus = this._onFocus.bind(this);
      this._onBlur = this._onBlur.bind(this);
      this._onKeyUp = this._onKeyUp.bind(this);
      this._onKeyDown = this._onKeyDown.bind(this);
      this._onInput = this._onInput.bind(this);
      this._onClick = this._onClick.bind(this);
      this._onTouchMove = this._onTouchMove.bind(this);
      this._onTouchEnd = this._onTouchEnd.bind(this);
      this._onMouseDown = this._onMouseDown.bind(this);
      this._onMouseOver = this._onMouseOver.bind(this);
      this._onFormReset = this._onFormReset.bind(this);
      this._onSelectKey = this._onSelectKey.bind(this);
      this._onEnterKey = this._onEnterKey.bind(this);
      this._onEscapeKey = this._onEscapeKey.bind(this);
      this._onDirectionKey = this._onDirectionKey.bind(this);
      this._onDeleteKey = this._onDeleteKey.bind(this);
      if (this.passedElement.isActive) {
        if (!config.silent) {
          console.warn("Trying to initialise Choices on element already initialised", { element });
        }
        this.initialised = true;
        this.initialisedOK = false;
        return;
      }
      this.init();
      this._initialItems = this._store.items.map(function(choice) {
        return choice.value;
      });
    }
    Object.defineProperty(Choices2, "defaults", {
      get: function() {
        return Object.preventExtensions({
          get options() {
            return USER_DEFAULTS;
          },
          get allOptions() {
            return DEFAULT_CONFIG;
          },
          get templates() {
            return templates;
          }
        });
      },
      enumerable: false,
      configurable: true
    });
    Choices2.prototype.init = function() {
      if (this.initialised || this.initialisedOK !== void 0) {
        return;
      }
      this._searcher = getSearcher(this.config);
      this._loadChoices();
      this._createTemplates();
      this._createElements();
      this._createStructure();
      if (this._isTextElement && !this.config.addItems || this.passedElement.element.hasAttribute("disabled") || !!this.passedElement.element.closest("fieldset:disabled")) {
        this.disable();
      } else {
        this.enable();
        this._addEventListeners();
      }
      this._initStore();
      this.initialised = true;
      this.initialisedOK = true;
      var callbackOnInit = this.config.callbackOnInit;
      if (typeof callbackOnInit === "function") {
        callbackOnInit.call(this);
      }
    };
    Choices2.prototype.destroy = function() {
      if (!this.initialised) {
        return;
      }
      this._removeEventListeners();
      this.passedElement.reveal();
      this.containerOuter.unwrap(this.passedElement.element);
      this._store._listeners = [];
      this.clearStore(false);
      this._stopSearch();
      this._templates = Choices2.defaults.templates;
      this.initialised = false;
      this.initialisedOK = void 0;
    };
    Choices2.prototype.enable = function() {
      if (this.passedElement.isDisabled) {
        this.passedElement.enable();
      }
      if (this.containerOuter.isDisabled) {
        this._addEventListeners();
        this.input.enable();
        this.containerOuter.enable();
      }
      return this;
    };
    Choices2.prototype.disable = function() {
      if (!this.passedElement.isDisabled) {
        this.passedElement.disable();
      }
      if (!this.containerOuter.isDisabled) {
        this._removeEventListeners();
        this.input.disable();
        this.containerOuter.disable();
      }
      return this;
    };
    Choices2.prototype.highlightItem = function(item, runEvent) {
      if (runEvent === void 0) {
        runEvent = true;
      }
      if (!item || !item.id) {
        return this;
      }
      var choice = this._store.items.find(function(c) {
        return c.id === item.id;
      });
      if (!choice || choice.highlighted) {
        return this;
      }
      this._store.dispatch(highlightItem(choice, true));
      if (runEvent) {
        this.passedElement.triggerEvent(EventType.highlightItem, this._getChoiceForOutput(choice));
      }
      return this;
    };
    Choices2.prototype.unhighlightItem = function(item, runEvent) {
      if (runEvent === void 0) {
        runEvent = true;
      }
      if (!item || !item.id) {
        return this;
      }
      var choice = this._store.items.find(function(c) {
        return c.id === item.id;
      });
      if (!choice || !choice.highlighted) {
        return this;
      }
      this._store.dispatch(highlightItem(choice, false));
      if (runEvent) {
        this.passedElement.triggerEvent(EventType.unhighlightItem, this._getChoiceForOutput(choice));
      }
      return this;
    };
    Choices2.prototype.highlightAll = function() {
      var _this = this;
      this._store.withTxn(function() {
        _this._store.items.forEach(function(item) {
          if (!item.highlighted) {
            _this._store.dispatch(highlightItem(item, true));
            _this.passedElement.triggerEvent(EventType.highlightItem, _this._getChoiceForOutput(item));
          }
        });
      });
      return this;
    };
    Choices2.prototype.unhighlightAll = function() {
      var _this = this;
      this._store.withTxn(function() {
        _this._store.items.forEach(function(item) {
          if (item.highlighted) {
            _this._store.dispatch(highlightItem(item, false));
            _this.passedElement.triggerEvent(EventType.highlightItem, _this._getChoiceForOutput(item));
          }
        });
      });
      return this;
    };
    Choices2.prototype.removeActiveItemsByValue = function(value) {
      var _this = this;
      this._store.withTxn(function() {
        _this._store.items.filter(function(item) {
          return item.value === value;
        }).forEach(function(item) {
          return _this._removeItem(item);
        });
      });
      return this;
    };
    Choices2.prototype.removeActiveItems = function(excludedId) {
      var _this = this;
      this._store.withTxn(function() {
        _this._store.items.filter(function(_a) {
          var id = _a.id;
          return id !== excludedId;
        }).forEach(function(item) {
          return _this._removeItem(item);
        });
      });
      return this;
    };
    Choices2.prototype.removeHighlightedItems = function(runEvent) {
      var _this = this;
      if (runEvent === void 0) {
        runEvent = false;
      }
      this._store.withTxn(function() {
        _this._store.highlightedActiveItems.forEach(function(item) {
          _this._removeItem(item);
          if (runEvent) {
            _this._triggerChange(item.value);
          }
        });
      });
      return this;
    };
    Choices2.prototype.showDropdown = function(preventInputFocus) {
      var _this = this;
      if (this.dropdown.isActive) {
        return this;
      }
      if (preventInputFocus === void 0) {
        preventInputFocus = !this._canSearch;
      }
      requestAnimationFrame(function() {
        _this.dropdown.show();
        var rect = _this.dropdown.element.getBoundingClientRect();
        _this.containerOuter.open(rect.bottom, rect.height);
        if (!preventInputFocus) {
          _this.input.focus();
        }
        _this.passedElement.triggerEvent(EventType.showDropdown);
      });
      return this;
    };
    Choices2.prototype.hideDropdown = function(preventInputBlur) {
      var _this = this;
      if (!this.dropdown.isActive) {
        return this;
      }
      requestAnimationFrame(function() {
        _this.dropdown.hide();
        _this.containerOuter.close();
        if (!preventInputBlur && _this._canSearch) {
          _this.input.removeActiveDescendant();
          _this.input.blur();
        }
        _this.passedElement.triggerEvent(EventType.hideDropdown);
      });
      return this;
    };
    Choices2.prototype.getValue = function(valueOnly) {
      var _this = this;
      var values = this._store.items.map(function(item) {
        return valueOnly ? item.value : _this._getChoiceForOutput(item);
      });
      return this._isSelectOneElement || this.config.singleModeForMultiSelect ? values[0] : values;
    };
    Choices2.prototype.setValue = function(items2) {
      var _this = this;
      if (!this.initialisedOK) {
        this._warnChoicesInitFailed("setValue");
        return this;
      }
      this._store.withTxn(function() {
        items2.forEach(function(value) {
          if (value) {
            _this._addChoice(mapInputToChoice(value, false));
          }
        });
      });
      this._searcher.reset();
      return this;
    };
    Choices2.prototype.setChoiceByValue = function(value) {
      var _this = this;
      if (!this.initialisedOK) {
        this._warnChoicesInitFailed("setChoiceByValue");
        return this;
      }
      if (this._isTextElement) {
        return this;
      }
      this._store.withTxn(function() {
        var choiceValue = Array.isArray(value) ? value : [value];
        choiceValue.forEach(function(val) {
          return _this._findAndSelectChoiceByValue(val);
        });
        _this.unhighlightAll();
      });
      this._searcher.reset();
      return this;
    };
    Choices2.prototype.setChoices = function(choicesArrayOrFetcher, value, label, replaceChoices, clearSearchFlag) {
      var _this = this;
      if (choicesArrayOrFetcher === void 0) {
        choicesArrayOrFetcher = [];
      }
      if (value === void 0) {
        value = "value";
      }
      if (label === void 0) {
        label = "label";
      }
      if (replaceChoices === void 0) {
        replaceChoices = false;
      }
      if (clearSearchFlag === void 0) {
        clearSearchFlag = true;
      }
      if (!this.initialisedOK) {
        this._warnChoicesInitFailed("setChoices");
        return this;
      }
      if (!this._isSelectElement) {
        throw new TypeError("setChoices can't be used with INPUT based Choices");
      }
      if (typeof value !== "string" || !value) {
        throw new TypeError("value parameter must be a name of 'value' field in passed objects");
      }
      if (replaceChoices) {
        this.clearChoices();
      }
      if (typeof choicesArrayOrFetcher === "function") {
        var fetcher_1 = choicesArrayOrFetcher(this);
        if (typeof Promise === "function" && fetcher_1 instanceof Promise) {
          return new Promise(function(resolve) {
            return requestAnimationFrame(resolve);
          }).then(function() {
            return _this._handleLoadingState(true);
          }).then(function() {
            return fetcher_1;
          }).then(function(data) {
            return _this.setChoices(data, value, label, replaceChoices);
          }).catch(function(err) {
            if (!_this.config.silent) {
              console.error(err);
            }
          }).then(function() {
            return _this._handleLoadingState(false);
          }).then(function() {
            return _this;
          });
        }
        if (!Array.isArray(fetcher_1)) {
          throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: ".concat(typeof fetcher_1));
        }
        return this.setChoices(fetcher_1, value, label, false);
      }
      if (!Array.isArray(choicesArrayOrFetcher)) {
        throw new TypeError(".setChoices must be called either with array of choices with a function resulting into Promise of array of choices");
      }
      this.containerOuter.removeLoadingState();
      this._store.withTxn(function() {
        if (clearSearchFlag) {
          _this._isSearching = false;
        }
        var isDefaultValue = value === "value";
        var isDefaultLabel = label === "label";
        choicesArrayOrFetcher.forEach(function(groupOrChoice) {
          if ("choices" in groupOrChoice) {
            var group = groupOrChoice;
            if (!isDefaultLabel) {
              group = __assign(__assign({}, group), { label: group[label] });
            }
            _this._addGroup(mapInputToChoice(group, true));
          } else {
            var choice = groupOrChoice;
            if (!isDefaultLabel || !isDefaultValue) {
              choice = __assign(__assign({}, choice), { value: choice[value], label: choice[label] });
            }
            _this._addChoice(mapInputToChoice(choice, false));
          }
        });
        _this.unhighlightAll();
      });
      this._searcher.reset();
      return this;
    };
    Choices2.prototype.refresh = function(withEvents, selectFirstOption, deselectAll) {
      var _this = this;
      if (withEvents === void 0) {
        withEvents = false;
      }
      if (selectFirstOption === void 0) {
        selectFirstOption = false;
      }
      if (deselectAll === void 0) {
        deselectAll = false;
      }
      if (!this._isSelectElement) {
        if (!this.config.silent) {
          console.warn("refresh method can only be used on choices backed by a <select> element");
        }
        return this;
      }
      this._store.withTxn(function() {
        var choicesFromOptions = _this.passedElement.optionsAsChoices();
        var existingItems = {};
        if (!deselectAll) {
          _this._store.items.forEach(function(choice) {
            if (choice.id && choice.active && choice.selected && !choice.disabled) {
              existingItems[choice.value] = true;
            }
          });
        }
        _this.clearStore(false);
        var updateChoice = function(choice) {
          if (deselectAll) {
            _this._store.dispatch(removeItem$1(choice));
          } else if (existingItems[choice.value]) {
            choice.selected = true;
          }
        };
        choicesFromOptions.forEach(function(groupOrChoice) {
          if ("choices" in groupOrChoice) {
            groupOrChoice.choices.forEach(updateChoice);
            return;
          }
          updateChoice(groupOrChoice);
        });
        _this._addPredefinedChoices(choicesFromOptions, selectFirstOption, withEvents);
        if (_this._isSearching) {
          _this._searchChoices(_this.input.value);
        }
      });
      return this;
    };
    Choices2.prototype.removeChoice = function(value) {
      var choice = this._store.choices.find(function(c) {
        return c.value === value;
      });
      if (!choice) {
        return this;
      }
      this._clearNotice();
      this._store.dispatch(removeChoice(choice));
      this._searcher.reset();
      if (choice.selected) {
        this.passedElement.triggerEvent(EventType.removeItem, this._getChoiceForOutput(choice));
      }
      return this;
    };
    Choices2.prototype.clearChoices = function() {
      var _this = this;
      this._store.withTxn(function() {
        _this._store.choices.forEach(function(choice) {
          if (!choice.selected) {
            _this._store.dispatch(removeChoice(choice));
          }
        });
      });
      this._searcher.reset();
      return this;
    };
    Choices2.prototype.clearStore = function(clearOptions) {
      if (clearOptions === void 0) {
        clearOptions = true;
      }
      this._stopSearch();
      if (clearOptions) {
        this.passedElement.element.replaceChildren("");
      }
      this.itemList.element.replaceChildren("");
      this.choiceList.element.replaceChildren("");
      this._clearNotice();
      this._store.reset();
      this._lastAddedChoiceId = 0;
      this._lastAddedGroupId = 0;
      this._searcher.reset();
      return this;
    };
    Choices2.prototype.clearInput = function() {
      var shouldSetInputWidth = !this._isSelectOneElement;
      this.input.clear(shouldSetInputWidth);
      this._stopSearch();
      return this;
    };
    Choices2.prototype._validateConfig = function() {
      var config = this.config;
      var invalidConfigOptions = diff(config, DEFAULT_CONFIG);
      if (invalidConfigOptions.length) {
        console.warn("Unknown config option(s) passed", invalidConfigOptions.join(", "));
      }
      if (config.allowHTML && config.allowHtmlUserInput) {
        if (config.addItems) {
          console.warn("Warning: allowHTML/allowHtmlUserInput/addItems all being true is strongly not recommended and may lead to XSS attacks");
        }
        if (config.addChoices) {
          console.warn("Warning: allowHTML/allowHtmlUserInput/addChoices all being true is strongly not recommended and may lead to XSS attacks");
        }
      }
    };
    Choices2.prototype._render = function(changes) {
      if (changes === void 0) {
        changes = { choices: true, groups: true, items: true };
      }
      if (this._store.inTxn()) {
        return;
      }
      if (this._isSelectElement) {
        if (changes.choices || changes.groups) {
          this._renderChoices();
        }
      }
      if (changes.items) {
        this._renderItems();
      }
    };
    Choices2.prototype._renderChoices = function() {
      var _this = this;
      if (!this._canAddItems()) {
        return;
      }
      var _a = this, config = _a.config, isSearching = _a._isSearching;
      var _b = this._store, activeGroups = _b.activeGroups, activeChoices = _b.activeChoices;
      var renderLimit = 0;
      if (isSearching && config.searchResultLimit > 0) {
        renderLimit = config.searchResultLimit;
      } else if (config.renderChoiceLimit > 0) {
        renderLimit = config.renderChoiceLimit;
      }
      if (this._isSelectElement) {
        var backingOptions = activeChoices.filter(function(choice) {
          return !choice.element;
        });
        if (backingOptions.length) {
          this.passedElement.addOptions(backingOptions);
        }
      }
      var fragment = document.createDocumentFragment();
      var renderableChoices = function(choices2) {
        return choices2.filter(function(choice) {
          return !choice.placeholder && (isSearching ? !!choice.rank : config.renderSelectedChoices || !choice.selected);
        });
      };
      var selectableChoices = false;
      var renderChoices = function(choices2, withinGroup, groupLabel) {
        if (isSearching) {
          choices2.sort(sortByRank);
        } else if (config.shouldSort) {
          choices2.sort(config.sorter);
        }
        var choiceLimit = choices2.length;
        choiceLimit = !withinGroup && renderLimit && choiceLimit > renderLimit ? renderLimit : choiceLimit;
        choiceLimit--;
        choices2.every(function(choice, index) {
          var dropdownItem = choice.choiceEl || _this._templates.choice(config, choice, config.itemSelectText, groupLabel);
          choice.choiceEl = dropdownItem;
          fragment.appendChild(dropdownItem);
          if (!choice.disabled && (isSearching || !choice.selected)) {
            selectableChoices = true;
          }
          return index < choiceLimit;
        });
      };
      if (activeChoices.length) {
        if (config.resetScrollPosition) {
          requestAnimationFrame(function() {
            return _this.choiceList.scrollToTop();
          });
        }
        if (!this._hasNonChoicePlaceholder && !isSearching && this._isSelectOneElement) {
          renderChoices(activeChoices.filter(function(choice) {
            return choice.placeholder && !choice.group;
          }), false, void 0);
        }
        if (activeGroups.length && !isSearching) {
          if (config.shouldSort) {
            activeGroups.sort(config.sorter);
          }
          renderChoices(activeChoices.filter(function(choice) {
            return !choice.placeholder && !choice.group;
          }), false, void 0);
          activeGroups.forEach(function(group) {
            var groupChoices = renderableChoices(group.choices);
            if (groupChoices.length) {
              if (group.label) {
                var dropdownGroup = group.groupEl || _this._templates.choiceGroup(_this.config, group);
                group.groupEl = dropdownGroup;
                dropdownGroup.remove();
                fragment.appendChild(dropdownGroup);
              }
              renderChoices(groupChoices, true, config.appendGroupInSearch && isSearching ? group.label : void 0);
            }
          });
        } else {
          renderChoices(renderableChoices(activeChoices), false, void 0);
        }
      }
      if (!selectableChoices) {
        if (!this._notice) {
          this._notice = {
            text: resolveStringFunction(isSearching ? config.noResultsText : config.noChoicesText),
            type: isSearching ? NoticeTypes.noResults : NoticeTypes.noChoices
          };
        }
        fragment.replaceChildren("");
      }
      this._renderNotice(fragment);
      this.choiceList.element.replaceChildren(fragment);
      if (selectableChoices) {
        this._highlightChoice();
      }
    };
    Choices2.prototype._renderItems = function() {
      var _this = this;
      var items2 = this._store.items || [];
      var itemList = this.itemList.element;
      var config = this.config;
      var fragment = document.createDocumentFragment();
      var itemFromList = function(item) {
        return itemList.querySelector('[data-item][data-id="'.concat(item.id, '"]'));
      };
      var addItemToFragment = function(item) {
        var el = item.itemEl;
        if (el && el.parentElement) {
          return;
        }
        el = itemFromList(item) || _this._templates.item(config, item, config.removeItemButton);
        item.itemEl = el;
        fragment.appendChild(el);
      };
      items2.forEach(addItemToFragment);
      var addItems = !!fragment.childNodes.length;
      if (this._isSelectOneElement && this._hasNonChoicePlaceholder) {
        var existingItems = itemList.children.length;
        if (addItems || existingItems > 1) {
          var placeholder = itemList.querySelector(getClassNamesSelector(config.classNames.placeholder));
          if (placeholder) {
            placeholder.remove();
          }
        } else if (!existingItems) {
          addItems = true;
          addItemToFragment(mapInputToChoice({
            selected: true,
            value: "",
            label: config.placeholderValue || "",
            placeholder: true
          }, false));
        }
      }
      if (addItems) {
        itemList.append(fragment);
        if (config.shouldSortItems && !this._isSelectOneElement) {
          items2.sort(config.sorter);
          items2.forEach(function(item) {
            var el = itemFromList(item);
            if (el) {
              el.remove();
              fragment.append(el);
            }
          });
          itemList.append(fragment);
        }
      }
      if (this._isTextElement) {
        this.passedElement.value = items2.map(function(_a) {
          var value = _a.value;
          return value;
        }).join(config.delimiter);
      }
    };
    Choices2.prototype._displayNotice = function(text, type, openDropdown) {
      if (openDropdown === void 0) {
        openDropdown = true;
      }
      var oldNotice = this._notice;
      if (oldNotice && (oldNotice.type === type && oldNotice.text === text || oldNotice.type === NoticeTypes.addChoice && (type === NoticeTypes.noResults || type === NoticeTypes.noChoices))) {
        if (openDropdown) {
          this.showDropdown(true);
        }
        return;
      }
      this._clearNotice();
      this._notice = text ? {
        text,
        type
      } : void 0;
      this._renderNotice();
      if (openDropdown && text) {
        this.showDropdown(true);
      }
    };
    Choices2.prototype._clearNotice = function() {
      if (!this._notice) {
        return;
      }
      var noticeElement = this.choiceList.element.querySelector(getClassNamesSelector(this.config.classNames.notice));
      if (noticeElement) {
        noticeElement.remove();
      }
      this._notice = void 0;
    };
    Choices2.prototype._renderNotice = function(fragment) {
      var noticeConf = this._notice;
      if (noticeConf) {
        var notice = this._templates.notice(this.config, noticeConf.text, noticeConf.type);
        if (fragment) {
          fragment.append(notice);
        } else {
          this.choiceList.prepend(notice);
        }
      }
    };
    Choices2.prototype._getChoiceForOutput = function(choice, keyCode) {
      return {
        id: choice.id,
        highlighted: choice.highlighted,
        labelClass: choice.labelClass,
        labelDescription: choice.labelDescription,
        customProperties: choice.customProperties,
        disabled: choice.disabled,
        active: choice.active,
        label: choice.label,
        placeholder: choice.placeholder,
        value: choice.value,
        groupValue: choice.group ? choice.group.label : void 0,
        element: choice.element,
        keyCode
      };
    };
    Choices2.prototype._triggerChange = function(value) {
      if (value === void 0 || value === null) {
        return;
      }
      this.passedElement.triggerEvent(EventType.change, {
        value
      });
    };
    Choices2.prototype._handleButtonAction = function(element) {
      var _this = this;
      var items2 = this._store.items;
      if (!items2.length || !this.config.removeItems || !this.config.removeItemButton) {
        return;
      }
      var id = element && parseDataSetId(element.parentElement);
      var itemToRemove = id && items2.find(function(item) {
        return item.id === id;
      });
      if (!itemToRemove) {
        return;
      }
      this._store.withTxn(function() {
        _this._removeItem(itemToRemove);
        _this._triggerChange(itemToRemove.value);
        if (_this._isSelectOneElement && !_this._hasNonChoicePlaceholder) {
          var placeholderChoice = _this._store.choices.reverse().find(function(choice) {
            return !choice.disabled && choice.placeholder;
          });
          if (placeholderChoice) {
            _this._addItem(placeholderChoice);
            _this.unhighlightAll();
            if (placeholderChoice.value) {
              _this._triggerChange(placeholderChoice.value);
            }
          }
        }
      });
    };
    Choices2.prototype._handleItemAction = function(element, hasShiftKey) {
      var _this = this;
      if (hasShiftKey === void 0) {
        hasShiftKey = false;
      }
      var items2 = this._store.items;
      if (!items2.length || !this.config.removeItems || this._isSelectOneElement) {
        return;
      }
      var id = parseDataSetId(element);
      if (!id) {
        return;
      }
      items2.forEach(function(item) {
        if (item.id === id && !item.highlighted) {
          _this.highlightItem(item);
        } else if (!hasShiftKey && item.highlighted) {
          _this.unhighlightItem(item);
        }
      });
      this.input.focus();
    };
    Choices2.prototype._handleChoiceAction = function(element) {
      var _this = this;
      var id = parseDataSetId(element);
      var choice = id && this._store.getChoiceById(id);
      if (!choice || choice.disabled) {
        return false;
      }
      var hasActiveDropdown = this.dropdown.isActive;
      if (!choice.selected) {
        if (!this._canAddItems()) {
          return true;
        }
        this._store.withTxn(function() {
          _this._addItem(choice, true, true);
          _this.clearInput();
          _this.unhighlightAll();
        });
        this._triggerChange(choice.value);
      }
      if (hasActiveDropdown && this.config.closeDropdownOnSelect) {
        this.hideDropdown(true);
        this.containerOuter.element.focus();
      }
      return true;
    };
    Choices2.prototype._handleBackspace = function(items2) {
      var config = this.config;
      if (!config.removeItems || !items2.length) {
        return;
      }
      var lastItem = items2[items2.length - 1];
      var hasHighlightedItems = items2.some(function(item) {
        return item.highlighted;
      });
      if (config.editItems && !hasHighlightedItems && lastItem) {
        this.input.value = lastItem.value;
        this.input.setWidth();
        this._removeItem(lastItem);
        this._triggerChange(lastItem.value);
      } else {
        if (!hasHighlightedItems) {
          this.highlightItem(lastItem, false);
        }
        this.removeHighlightedItems(true);
      }
    };
    Choices2.prototype._loadChoices = function() {
      var _a;
      var _this = this;
      var config = this.config;
      if (this._isTextElement) {
        this._presetChoices = config.items.map(function(e) {
          return mapInputToChoice(e, false);
        });
        if (this.passedElement.value) {
          var elementItems = this.passedElement.value.split(config.delimiter).map(function(e) {
            return mapInputToChoice(e, false, _this.config.allowHtmlUserInput);
          });
          this._presetChoices = this._presetChoices.concat(elementItems);
        }
        this._presetChoices.forEach(function(choice) {
          choice.selected = true;
        });
      } else if (this._isSelectElement) {
        this._presetChoices = config.choices.map(function(e) {
          return mapInputToChoice(e, true);
        });
        var choicesFromOptions = this.passedElement.optionsAsChoices();
        if (choicesFromOptions) {
          (_a = this._presetChoices).push.apply(_a, choicesFromOptions);
        }
      }
    };
    Choices2.prototype._handleLoadingState = function(setLoading) {
      if (setLoading === void 0) {
        setLoading = true;
      }
      var el = this.itemList.element;
      if (setLoading) {
        this.disable();
        this.containerOuter.addLoadingState();
        if (this._isSelectOneElement) {
          el.replaceChildren(this._templates.placeholder(this.config, this.config.loadingText));
        } else {
          this.input.placeholder = this.config.loadingText;
        }
      } else {
        this.enable();
        this.containerOuter.removeLoadingState();
        if (this._isSelectOneElement) {
          el.replaceChildren("");
          this._render();
        } else {
          this.input.placeholder = this._placeholderValue || "";
        }
      }
    };
    Choices2.prototype._handleSearch = function(value) {
      if (!this.input.isFocussed) {
        return;
      }
      if (value !== null && typeof value !== "undefined" && value.length >= this.config.searchFloor) {
        var resultCount = this.config.searchChoices ? this._searchChoices(value) : 0;
        if (resultCount !== null) {
          this.passedElement.triggerEvent(EventType.search, {
            value,
            resultCount
          });
        }
      } else if (this._store.choices.some(function(option) {
        return !option.active;
      })) {
        this._stopSearch();
      }
    };
    Choices2.prototype._canAddItems = function() {
      var config = this.config;
      var maxItemCount = config.maxItemCount, maxItemText = config.maxItemText;
      if (!config.singleModeForMultiSelect && maxItemCount > 0 && maxItemCount <= this._store.items.length) {
        this.choiceList.element.replaceChildren("");
        this._notice = void 0;
        this._displayNotice(typeof maxItemText === "function" ? maxItemText(maxItemCount) : maxItemText, NoticeTypes.addChoice);
        return false;
      }
      return true;
    };
    Choices2.prototype._canCreateItem = function(value) {
      var config = this.config;
      var canAddItem = true;
      var notice = "";
      if (canAddItem && typeof config.addItemFilter === "function" && !config.addItemFilter(value)) {
        canAddItem = false;
        notice = resolveNoticeFunction(config.customAddItemText, value);
      }
      if (canAddItem) {
        var foundChoice = this._store.choices.find(function(choice) {
          return config.valueComparer(choice.value, value);
        });
        if (this._isSelectElement) {
          if (foundChoice) {
            this._displayNotice("", NoticeTypes.addChoice);
            return false;
          }
        } else if (this._isTextElement && !config.duplicateItemsAllowed) {
          if (foundChoice) {
            canAddItem = false;
            notice = resolveNoticeFunction(config.uniqueItemText, value);
          }
        }
      }
      if (canAddItem) {
        notice = resolveNoticeFunction(config.addItemText, value);
      }
      if (notice) {
        this._displayNotice(notice, NoticeTypes.addChoice);
      }
      return canAddItem;
    };
    Choices2.prototype._searchChoices = function(value) {
      var newValue = value.trim().replace(/\s{2,}/, " ");
      if (!newValue.length || newValue === this._currentValue) {
        return null;
      }
      var searcher = this._searcher;
      if (searcher.isEmptyIndex()) {
        searcher.index(this._store.searchableChoices);
      }
      var results = searcher.search(newValue);
      this._currentValue = newValue;
      this._highlightPosition = 0;
      this._isSearching = true;
      var notice = this._notice;
      var noticeType = notice && notice.type;
      if (noticeType !== NoticeTypes.addChoice) {
        if (!results.length) {
          this._displayNotice(resolveStringFunction(this.config.noResultsText), NoticeTypes.noResults);
        } else {
          this._clearNotice();
        }
      }
      this._store.dispatch(filterChoices(results));
      return results.length;
    };
    Choices2.prototype._stopSearch = function() {
      if (this._isSearching) {
        this._currentValue = "";
        this._isSearching = false;
        this._clearNotice();
        this._store.dispatch(activateChoices(true));
        this.passedElement.triggerEvent(EventType.search, {
          value: "",
          resultCount: 0
        });
      }
    };
    Choices2.prototype._addEventListeners = function() {
      var documentElement = this._docRoot;
      var outerElement = this.containerOuter.element;
      var inputElement = this.input.element;
      documentElement.addEventListener("touchend", this._onTouchEnd, true);
      outerElement.addEventListener("keydown", this._onKeyDown, true);
      outerElement.addEventListener("mousedown", this._onMouseDown, true);
      documentElement.addEventListener("click", this._onClick, { passive: true });
      documentElement.addEventListener("touchmove", this._onTouchMove, {
        passive: true
      });
      this.dropdown.element.addEventListener("mouseover", this._onMouseOver, {
        passive: true
      });
      if (this._isSelectOneElement) {
        outerElement.addEventListener("focus", this._onFocus, {
          passive: true
        });
        outerElement.addEventListener("blur", this._onBlur, {
          passive: true
        });
      }
      inputElement.addEventListener("keyup", this._onKeyUp, {
        passive: true
      });
      inputElement.addEventListener("input", this._onInput, {
        passive: true
      });
      inputElement.addEventListener("focus", this._onFocus, {
        passive: true
      });
      inputElement.addEventListener("blur", this._onBlur, {
        passive: true
      });
      if (inputElement.form) {
        inputElement.form.addEventListener("reset", this._onFormReset, {
          passive: true
        });
      }
      this.input.addEventListeners();
    };
    Choices2.prototype._removeEventListeners = function() {
      var documentElement = this._docRoot;
      var outerElement = this.containerOuter.element;
      var inputElement = this.input.element;
      documentElement.removeEventListener("touchend", this._onTouchEnd, true);
      outerElement.removeEventListener("keydown", this._onKeyDown, true);
      outerElement.removeEventListener("mousedown", this._onMouseDown, true);
      documentElement.removeEventListener("click", this._onClick);
      documentElement.removeEventListener("touchmove", this._onTouchMove);
      this.dropdown.element.removeEventListener("mouseover", this._onMouseOver);
      if (this._isSelectOneElement) {
        outerElement.removeEventListener("focus", this._onFocus);
        outerElement.removeEventListener("blur", this._onBlur);
      }
      inputElement.removeEventListener("keyup", this._onKeyUp);
      inputElement.removeEventListener("input", this._onInput);
      inputElement.removeEventListener("focus", this._onFocus);
      inputElement.removeEventListener("blur", this._onBlur);
      if (inputElement.form) {
        inputElement.form.removeEventListener("reset", this._onFormReset);
      }
      this.input.removeEventListeners();
    };
    Choices2.prototype._onKeyDown = function(event) {
      var keyCode = event.keyCode;
      var hasActiveDropdown = this.dropdown.isActive;
      var wasPrintableChar = event.key.length === 1 || event.key.length === 2 && event.key.charCodeAt(0) >= 55296 || event.key === "Unidentified";
      if (!this._isTextElement && !hasActiveDropdown && keyCode !== KeyCodeMap.ESC_KEY && keyCode !== KeyCodeMap.TAB_KEY && keyCode !== KeyCodeMap.SHIFT_KEY) {
        this.showDropdown();
        if (!this.input.isFocussed && wasPrintableChar) {
          this.input.value += event.key;
          if (event.key === " ") {
            event.preventDefault();
          }
        }
      }
      switch (keyCode) {
        case KeyCodeMap.A_KEY:
          return this._onSelectKey(event, this.itemList.element.hasChildNodes());
        case KeyCodeMap.ENTER_KEY:
          return this._onEnterKey(event, hasActiveDropdown);
        case KeyCodeMap.ESC_KEY:
          return this._onEscapeKey(event, hasActiveDropdown);
        case KeyCodeMap.UP_KEY:
        case KeyCodeMap.PAGE_UP_KEY:
        case KeyCodeMap.DOWN_KEY:
        case KeyCodeMap.PAGE_DOWN_KEY:
          return this._onDirectionKey(event, hasActiveDropdown);
        case KeyCodeMap.DELETE_KEY:
        case KeyCodeMap.BACK_KEY:
          return this._onDeleteKey(event, this._store.items, this.input.isFocussed);
      }
    };
    Choices2.prototype._onKeyUp = function() {
      this._canSearch = this.config.searchEnabled;
    };
    Choices2.prototype._onInput = function() {
      var value = this.input.value;
      if (!value) {
        if (this._isTextElement) {
          this.hideDropdown(true);
        } else {
          this._stopSearch();
        }
        return;
      }
      if (!this._canAddItems()) {
        return;
      }
      if (this._canSearch) {
        this._handleSearch(value);
      }
      if (!this._canAddUserChoices) {
        return;
      }
      this._canCreateItem(value);
      if (this._isSelectElement) {
        this._highlightPosition = 0;
        this._highlightChoice();
      }
    };
    Choices2.prototype._onSelectKey = function(event, hasItems) {
      if ((event.ctrlKey || event.metaKey) && hasItems) {
        this._canSearch = false;
        var shouldHightlightAll = this.config.removeItems && !this.input.value && this.input.element === document.activeElement;
        if (shouldHightlightAll) {
          this.highlightAll();
        }
      }
    };
    Choices2.prototype._onEnterKey = function(event, hasActiveDropdown) {
      var _this = this;
      var value = this.input.value;
      var target = event.target;
      event.preventDefault();
      if (target && target.hasAttribute("data-button")) {
        this._handleButtonAction(target);
        return;
      }
      if (!hasActiveDropdown) {
        if (this._isSelectElement || this._notice) {
          this.showDropdown();
        }
        return;
      }
      var highlightedChoice = this.dropdown.element.querySelector(getClassNamesSelector(this.config.classNames.highlightedState));
      if (highlightedChoice && this._handleChoiceAction(highlightedChoice)) {
        return;
      }
      if (!target || !value) {
        this.hideDropdown(true);
        return;
      }
      if (!this._canAddItems()) {
        return;
      }
      var addedItem = false;
      this._store.withTxn(function() {
        addedItem = _this._findAndSelectChoiceByValue(value, true);
        if (!addedItem) {
          if (!_this._canAddUserChoices) {
            return;
          }
          if (!_this._canCreateItem(value)) {
            return;
          }
          _this._addChoice(mapInputToChoice(value, false, _this.config.allowHtmlUserInput), true, true);
          addedItem = true;
        }
        _this.clearInput();
        _this.unhighlightAll();
      });
      if (!addedItem) {
        return;
      }
      this._triggerChange(value);
      if (this.config.closeDropdownOnSelect) {
        this.hideDropdown(true);
      }
    };
    Choices2.prototype._onEscapeKey = function(event, hasActiveDropdown) {
      if (hasActiveDropdown) {
        event.stopPropagation();
        this.hideDropdown(true);
        this._stopSearch();
        this.containerOuter.element.focus();
      }
    };
    Choices2.prototype._onDirectionKey = function(event, hasActiveDropdown) {
      var keyCode = event.keyCode;
      if (hasActiveDropdown || this._isSelectOneElement) {
        this.showDropdown();
        this._canSearch = false;
        var directionInt = keyCode === KeyCodeMap.DOWN_KEY || keyCode === KeyCodeMap.PAGE_DOWN_KEY ? 1 : -1;
        var skipKey = event.metaKey || keyCode === KeyCodeMap.PAGE_DOWN_KEY || keyCode === KeyCodeMap.PAGE_UP_KEY;
        var nextEl = void 0;
        if (skipKey) {
          if (directionInt > 0) {
            nextEl = this.dropdown.element.querySelector("".concat(selectableChoiceIdentifier, ":last-of-type"));
          } else {
            nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
          }
        } else {
          var currentEl = this.dropdown.element.querySelector(getClassNamesSelector(this.config.classNames.highlightedState));
          if (currentEl) {
            nextEl = getAdjacentEl(currentEl, selectableChoiceIdentifier, directionInt);
          } else {
            nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
          }
        }
        if (nextEl) {
          if (!isScrolledIntoView(nextEl, this.choiceList.element, directionInt)) {
            this.choiceList.scrollToChildElement(nextEl, directionInt);
          }
          this._highlightChoice(nextEl);
        }
        event.preventDefault();
      }
    };
    Choices2.prototype._onDeleteKey = function(event, items2, hasFocusedInput) {
      if (!this._isSelectOneElement && !event.target.value && hasFocusedInput) {
        this._handleBackspace(items2);
        event.preventDefault();
      }
    };
    Choices2.prototype._onTouchMove = function() {
      if (this._wasTap) {
        this._wasTap = false;
      }
    };
    Choices2.prototype._onTouchEnd = function(event) {
      var target = (event || event.touches[0]).target;
      var touchWasWithinContainer = this._wasTap && this.containerOuter.element.contains(target);
      if (touchWasWithinContainer) {
        var containerWasExactTarget = target === this.containerOuter.element || target === this.containerInner.element;
        if (containerWasExactTarget) {
          if (this._isTextElement) {
            this.input.focus();
          } else if (this._isSelectMultipleElement) {
            this.showDropdown();
          }
        }
        event.stopPropagation();
      }
      this._wasTap = true;
    };
    Choices2.prototype._onMouseDown = function(event) {
      var target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      if (IS_IE11 && this.choiceList.element.contains(target)) {
        var firstChoice = this.choiceList.element.firstElementChild;
        this._isScrollingOnIe = this._direction === "ltr" ? event.offsetX >= firstChoice.offsetWidth : event.offsetX < firstChoice.offsetLeft;
      }
      if (target === this.input.element) {
        return;
      }
      var item = target.closest("[data-button],[data-item],[data-choice]");
      if (item instanceof HTMLElement) {
        if ("button" in item.dataset) {
          this._handleButtonAction(item);
        } else if ("item" in item.dataset) {
          this._handleItemAction(item, event.shiftKey);
        } else if ("choice" in item.dataset) {
          this._handleChoiceAction(item);
        }
      }
      event.preventDefault();
    };
    Choices2.prototype._onMouseOver = function(_a) {
      var target = _a.target;
      if (target instanceof HTMLElement && "choice" in target.dataset) {
        this._highlightChoice(target);
      }
    };
    Choices2.prototype._onClick = function(_a) {
      var target = _a.target;
      var containerOuter = this.containerOuter;
      var clickWasWithinContainer = containerOuter.element.contains(target);
      if (clickWasWithinContainer) {
        if (!this.dropdown.isActive && !containerOuter.isDisabled) {
          if (this._isTextElement) {
            if (document.activeElement !== this.input.element) {
              this.input.focus();
            }
          } else {
            this.showDropdown();
            containerOuter.element.focus();
          }
        } else if (this._isSelectOneElement && target !== this.input.element && !this.dropdown.element.contains(target)) {
          this.hideDropdown();
        }
      } else {
        containerOuter.removeFocusState();
        this.hideDropdown(true);
        this.unhighlightAll();
      }
    };
    Choices2.prototype._onFocus = function(_a) {
      var target = _a.target;
      var containerOuter = this.containerOuter;
      var focusWasWithinContainer = target && containerOuter.element.contains(target);
      if (!focusWasWithinContainer) {
        return;
      }
      var targetIsInput = target === this.input.element;
      if (this._isTextElement) {
        if (targetIsInput) {
          containerOuter.addFocusState();
        }
      } else if (this._isSelectMultipleElement) {
        if (targetIsInput) {
          this.showDropdown(true);
          containerOuter.addFocusState();
        }
      } else {
        containerOuter.addFocusState();
        if (targetIsInput) {
          this.showDropdown(true);
        }
      }
    };
    Choices2.prototype._onBlur = function(_a) {
      var target = _a.target;
      var containerOuter = this.containerOuter;
      var blurWasWithinContainer = target && containerOuter.element.contains(target);
      if (blurWasWithinContainer && !this._isScrollingOnIe) {
        if (target === this.input.element) {
          containerOuter.removeFocusState();
          this.hideDropdown(true);
          if (this._isTextElement || this._isSelectMultipleElement) {
            this.unhighlightAll();
          }
        } else if (target === this.containerOuter.element) {
          containerOuter.removeFocusState();
        }
      } else {
        this._isScrollingOnIe = false;
        this.input.element.focus();
      }
    };
    Choices2.prototype._onFormReset = function() {
      var _this = this;
      this._store.withTxn(function() {
        _this.clearInput();
        _this.hideDropdown();
        _this.refresh(false, false, true);
        if (_this._initialItems.length) {
          _this.setChoiceByValue(_this._initialItems);
        }
      });
    };
    Choices2.prototype._highlightChoice = function(el) {
      if (el === void 0) {
        el = null;
      }
      var choices2 = Array.from(this.dropdown.element.querySelectorAll(selectableChoiceIdentifier));
      if (!choices2.length) {
        return;
      }
      var passedEl = el;
      var highlightedState = this.config.classNames.highlightedState;
      var highlightedChoices = Array.from(this.dropdown.element.querySelectorAll(getClassNamesSelector(highlightedState)));
      highlightedChoices.forEach(function(choice) {
        removeClassesFromElement(choice, highlightedState);
        choice.setAttribute("aria-selected", "false");
      });
      if (passedEl) {
        this._highlightPosition = choices2.indexOf(passedEl);
      } else {
        if (choices2.length > this._highlightPosition) {
          passedEl = choices2[this._highlightPosition];
        } else {
          passedEl = choices2[choices2.length - 1];
        }
        if (!passedEl) {
          passedEl = choices2[0];
        }
      }
      addClassesToElement(passedEl, highlightedState);
      passedEl.setAttribute("aria-selected", "true");
      this.passedElement.triggerEvent(EventType.highlightChoice, {
        el: passedEl
      });
      if (this.dropdown.isActive) {
        this.input.setActiveDescendant(passedEl.id);
        this.containerOuter.setActiveDescendant(passedEl.id);
      }
    };
    Choices2.prototype._addItem = function(item, withEvents, userTriggered) {
      if (withEvents === void 0) {
        withEvents = true;
      }
      if (userTriggered === void 0) {
        userTriggered = false;
      }
      if (!item.id) {
        throw new TypeError("item.id must be set before _addItem is called for a choice/item");
      }
      if (this.config.singleModeForMultiSelect || this._isSelectOneElement) {
        this.removeActiveItems(item.id);
      }
      this._store.dispatch(addItem(item));
      if (withEvents) {
        this.passedElement.triggerEvent(EventType.addItem, this._getChoiceForOutput(item));
        if (userTriggered) {
          this.passedElement.triggerEvent(EventType.choice, this._getChoiceForOutput(item));
        }
      }
    };
    Choices2.prototype._removeItem = function(item) {
      if (!item.id) {
        return;
      }
      this._store.dispatch(removeItem$1(item));
      var notice = this._notice;
      if (notice && notice.type === NoticeTypes.noChoices) {
        this._clearNotice();
      }
      this.passedElement.triggerEvent(EventType.removeItem, this._getChoiceForOutput(item));
    };
    Choices2.prototype._addChoice = function(choice, withEvents, userTriggered) {
      if (withEvents === void 0) {
        withEvents = true;
      }
      if (userTriggered === void 0) {
        userTriggered = false;
      }
      if (choice.id) {
        throw new TypeError("Can not re-add a choice which has already been added");
      }
      var config = this.config;
      if ((this._isSelectElement || !config.duplicateItemsAllowed) && this._store.choices.find(function(c) {
        return config.valueComparer(c.value, choice.value);
      })) {
        return;
      }
      this._lastAddedChoiceId++;
      choice.id = this._lastAddedChoiceId;
      choice.elementId = "".concat(this._baseId, "-").concat(this._idNames.itemChoice, "-").concat(choice.id);
      var prependValue = config.prependValue, appendValue = config.appendValue;
      if (prependValue) {
        choice.value = prependValue + choice.value;
      }
      if (appendValue) {
        choice.value += appendValue.toString();
      }
      if ((prependValue || appendValue) && choice.element) {
        choice.element.value = choice.value;
      }
      this._clearNotice();
      this._store.dispatch(addChoice(choice));
      if (choice.selected) {
        this._addItem(choice, withEvents, userTriggered);
      }
    };
    Choices2.prototype._addGroup = function(group, withEvents) {
      var _this = this;
      if (withEvents === void 0) {
        withEvents = true;
      }
      if (group.id) {
        throw new TypeError("Can not re-add a group which has already been added");
      }
      this._store.dispatch(addGroup(group));
      if (!group.choices) {
        return;
      }
      this._lastAddedGroupId++;
      group.id = this._lastAddedGroupId;
      group.choices.forEach(function(item) {
        item.group = group;
        if (group.disabled) {
          item.disabled = true;
        }
        _this._addChoice(item, withEvents);
      });
    };
    Choices2.prototype._createTemplates = function() {
      var _this = this;
      var callbackOnCreateTemplates = this.config.callbackOnCreateTemplates;
      var userTemplates = {};
      if (typeof callbackOnCreateTemplates === "function") {
        userTemplates = callbackOnCreateTemplates.call(this, strToEl, escapeForTemplate, getClassNames);
      }
      var templating = {};
      Object.keys(this._templates).forEach(function(name) {
        if (name in userTemplates) {
          templating[name] = userTemplates[name].bind(_this);
        } else {
          templating[name] = _this._templates[name].bind(_this);
        }
      });
      this._templates = templating;
    };
    Choices2.prototype._createElements = function() {
      var templating = this._templates;
      var _a = this, config = _a.config, isSelectOneElement = _a._isSelectOneElement;
      var position = config.position, classNames = config.classNames;
      var elementType = this._elementType;
      this.containerOuter = new Container({
        element: templating.containerOuter(config, this._direction, this._isSelectElement, isSelectOneElement, config.searchEnabled, elementType, config.labelId),
        classNames,
        type: elementType,
        position
      });
      this.containerInner = new Container({
        element: templating.containerInner(config),
        classNames,
        type: elementType,
        position
      });
      this.input = new Input({
        element: templating.input(config, this._placeholderValue),
        classNames,
        type: elementType,
        preventPaste: !config.paste
      });
      this.choiceList = new List({
        element: templating.choiceList(config, isSelectOneElement)
      });
      this.itemList = new List({
        element: templating.itemList(config, isSelectOneElement)
      });
      this.dropdown = new Dropdown({
        element: templating.dropdown(config),
        classNames,
        type: elementType
      });
    };
    Choices2.prototype._createStructure = function() {
      var _a = this, containerInner = _a.containerInner, containerOuter = _a.containerOuter, passedElement = _a.passedElement;
      var dropdownElement = this.dropdown.element;
      passedElement.conceal();
      containerInner.wrap(passedElement.element);
      containerOuter.wrap(containerInner.element);
      if (this._isSelectOneElement) {
        this.input.placeholder = this.config.searchPlaceholderValue || "";
      } else {
        if (this._placeholderValue) {
          this.input.placeholder = this._placeholderValue;
        }
        this.input.setWidth();
      }
      containerOuter.element.appendChild(containerInner.element);
      containerOuter.element.appendChild(dropdownElement);
      containerInner.element.appendChild(this.itemList.element);
      dropdownElement.appendChild(this.choiceList.element);
      if (!this._isSelectOneElement) {
        containerInner.element.appendChild(this.input.element);
      } else if (this.config.searchEnabled) {
        dropdownElement.insertBefore(this.input.element, dropdownElement.firstChild);
      }
      this._highlightPosition = 0;
      this._isSearching = false;
    };
    Choices2.prototype._initStore = function() {
      var _this = this;
      this._store.subscribe(this._render).withTxn(function() {
        _this._addPredefinedChoices(_this._presetChoices, _this._isSelectOneElement && !_this._hasNonChoicePlaceholder, false);
      });
      if (!this._store.choices.length || this._isSelectOneElement && this._hasNonChoicePlaceholder) {
        this._render();
      }
    };
    Choices2.prototype._addPredefinedChoices = function(choices2, selectFirstOption, withEvents) {
      var _this = this;
      if (selectFirstOption === void 0) {
        selectFirstOption = false;
      }
      if (withEvents === void 0) {
        withEvents = true;
      }
      if (selectFirstOption) {
        var noSelectedChoices = choices2.findIndex(function(choice) {
          return choice.selected;
        }) === -1;
        if (noSelectedChoices) {
          choices2.some(function(choice) {
            if (choice.disabled || "choices" in choice) {
              return false;
            }
            choice.selected = true;
            return true;
          });
        }
      }
      choices2.forEach(function(item) {
        if ("choices" in item) {
          if (_this._isSelectElement) {
            _this._addGroup(item, withEvents);
          }
        } else {
          _this._addChoice(item, withEvents);
        }
      });
    };
    Choices2.prototype._findAndSelectChoiceByValue = function(value, userTriggered) {
      var _this = this;
      if (userTriggered === void 0) {
        userTriggered = false;
      }
      var foundChoice = this._store.choices.find(function(choice) {
        return _this.config.valueComparer(choice.value, value);
      });
      if (foundChoice && !foundChoice.disabled && !foundChoice.selected) {
        this._addItem(foundChoice, true, userTriggered);
        return true;
      }
      return false;
    };
    Choices2.prototype._generatePlaceholderValue = function() {
      var config = this.config;
      if (!config.placeholder) {
        return null;
      }
      if (this._hasNonChoicePlaceholder) {
        return config.placeholderValue;
      }
      if (this._isSelectElement) {
        var placeholderOption = this.passedElement.placeholderOption;
        return placeholderOption ? placeholderOption.text : null;
      }
      return null;
    };
    Choices2.prototype._warnChoicesInitFailed = function(caller) {
      if (this.config.silent) {
        return;
      }
      if (!this.initialised) {
        throw new TypeError("".concat(caller, " called on a non-initialised instance of Choices"));
      } else if (!this.initialisedOK) {
        throw new TypeError("".concat(caller, " called for an element which has multiple instances of Choices initialised on it"));
      }
    };
    Choices2.version = "11.0.3";
    return Choices2;
  }()
);

// resources/js/components/forms/lacuna-certificate-select.js
var import_web_pki = __toESM(require_lacuna_web_pki(), 1);
function lacunaCertificateSelect({
  state,
  webPkiSignature,
  debug = false,
  canSelectPlaceholder,
  isHtmlAllowed,
  getOptionLabelUsing,
  getOptionLabelsUsing,
  getOptionsUsing,
  getSearchResultsUsing,
  isAutofocused,
  isMultiple,
  isSearchable,
  hasDynamicOptions,
  hasDynamicSearchResults,
  loadingMessage,
  maxItems,
  maxItemsMessage,
  noSearchResultsMessage,
  options,
  optionsLimit,
  placeholder,
  position,
  searchPrompt,
  searchableOptionFields,
  statePath,
  onWebPkiNotInstalledUsing
}) {
  return {
    isSearching: false,
    selectedOptions: [],
    isStateBeingUpdated: false,
    state,
    certificates: [],
    debug,
    selectInput: null,
    /** @type {LacunaWebPKI} */
    pki: null,
    select: null,
    token: null,
    blockUIElement: null,
    init: async function() {
      this.blockUIElement = document.getElementById("loadingBlockUI");
      this.select = new Choices(this.$refs.input, {
        allowHTML: isHtmlAllowed,
        duplicateItemsAllowed: false,
        itemSelectText: "",
        loadingText: loadingMessage,
        maxItemCount: maxItems ?? -1,
        maxItemText: (maxItemCount) => window.pluralize(maxItemsMessage, maxItemCount, {
          count: maxItemCount
        }),
        noChoicesText: searchPrompt,
        noResultsText: noSearchResultsMessage,
        placeholderValue: placeholder,
        position: position ?? "auto",
        removeItemButton: canSelectPlaceholder,
        renderChoiceLimit: optionsLimit,
        searchEnabled: isSearchable,
        searchFields: searchableOptionFields ?? ["label"],
        searchPlaceholderValue: searchPrompt,
        searchResultLimit: optionsLimit,
        shouldSort: false,
        searchFloor: hasDynamicSearchResults ? 0 : 1
      });
      await this.refreshChoices({ withInitialOptions: true });
      if (![null, void 0, ""].includes(this.state)) {
        this.select.setChoiceByValue(this.formatState(this.state));
      }
      this.refreshPlaceholder();
      if (isAutofocused) {
        this.select.showDropdown();
      }
      this.$refs.input.addEventListener("change", () => {
        this.refreshPlaceholder();
        if (this.isStateBeingUpdated) {
          return;
        }
        this.isStateBeingUpdated = true;
        this.state = this.select.getValue(true) ?? null;
        this.$nextTick(() => this.isStateBeingUpdated = false);
      });
      this.$watch("state", async () => {
        if (!this.select) {
          return;
        }
        this.refreshPlaceholder();
        if (this.isStateBeingUpdated) {
          return;
        }
        await this.refreshChoices({
          withInitialOptions: !hasDynamicOptions
        });
      });
      this.log("Initializing Web PKI component ...", state);
      this.showLoadingBlockUI();
      this.pki = new import_web_pki.LacunaWebPKI(webPkiSignature);
      await this.pki.init({
        ready: () => {
          this.pki.listCertificates().success(async (certs) => {
            this.certificates = certs;
            this.select.clearChoices();
            await this.select.setChoices([
              {
                label: loadingMessage,
                value: "",
                disabled: true
              }
            ]);
            this.log("Get options from certificates ...", statePath, certs);
            let options2 = await this.$wire.generateSelectOptionsFromCertificates(statePath, certs);
            this.setChoices(options2);
            this.hiddenLoadingBlockUI();
          });
        },
        notInstalled: async (status, message) => {
          this.log("Web PKI not installed.");
          this.hiddenLoadingBlockUI();
          let params = {
            installUrl: this.pki._installUrl,
            brand: this.pki.brand || "",
            jslib: this.pki._jslibVersion,
            returnUrl: window.location.href
          };
          onWebPkiNotInstalledUsing(status, message, params);
        },
        defaultError: (error) => {
          this.log("An error has occurred: " + error);
          this.hiddenLoadingBlockUI();
        }
      });
      this.$wire.on("signPAdES", (event) => {
        this.token = event.token;
        this.log("Signing PAdES ...", this.state, this.token, event);
        this.signPAdES();
      });
    },
    log(...args) {
      if (!this.debug) {
        return;
      }
      console.debug(args);
    },
    signPAdES: async function() {
      this.log("Signing PAdES ...", this.state);
      await this.pki.signWithRestPki({
        token: this.token,
        thumbprint: this.state
      }).success(() => {
        this.$wire.dispatch("signedPAdES", {
          token: this.token,
          thumbprint: this.state
        });
      });
    },
    destroy: function() {
      this.select.destroy();
      this.select = null;
    },
    refreshChoices: async function(config = {}) {
      const choices2 = await this.getChoices(config);
      if (!this.select) {
        return;
      }
      this.select.clearStore();
      this.refreshPlaceholder();
      this.setChoices(choices2);
      if (![null, void 0, ""].includes(this.state)) {
        this.select.setChoiceByValue(this.formatState(this.state));
      }
    },
    setChoices: function(choices2) {
      this.select.setChoices(choices2, "value", "label", true);
    },
    getChoices: async function(config = {}) {
      const existingOptions = await this.getExistingOptions(config);
      return existingOptions.concat(
        await this.getMissingOptions(existingOptions)
      );
    },
    getExistingOptions: async function({ search: search2, withInitialOptions }) {
      if (withInitialOptions) {
        return options;
      }
      let results = [];
      if (search2 !== "" && search2 !== null && search2 !== void 0) {
        results = await getSearchResultsUsing(search2);
      } else {
        results = await getOptionsUsing();
      }
      return results.map((result) => {
        if (result.choices) {
          result.choices = result.choices.map((groupedOption) => {
            groupedOption.selected = Array.isArray(this.state) ? this.state.includes(groupedOption.value) : this.state === groupedOption.value;
            return groupedOption;
          });
          return result;
        }
        result.selected = Array.isArray(this.state) ? this.state.includes(result.value) : this.state === result.value;
        return result;
      });
    },
    refreshPlaceholder: function() {
      if (isMultiple) {
        return;
      }
      this.select._renderItems();
      if (![null, void 0, ""].includes(this.state)) {
        return;
      }
      this.$el.querySelector(".choices__list--single").innerHTML = `<div class="choices__placeholder choices__item">${placeholder ?? ""}</div>`;
    },
    formatState: function(state2) {
      if (isMultiple) {
        return (state2 ?? []).map((item) => item?.toString());
      }
      return state2?.toString();
    },
    getMissingOptions: async function(existingOptions) {
      let state2 = this.formatState(this.state);
      if ([null, void 0, "", [], {}].includes(state2)) {
        return {};
      }
      const existingOptionValues = /* @__PURE__ */ new Set();
      existingOptions.forEach((existingOption) => {
        if (existingOption.choices) {
          existingOption.choices.forEach(
            (groupedExistingOption) => existingOptionValues.add(groupedExistingOption.value)
          );
          return;
        }
        existingOptionValues.add(existingOption.value);
      });
      if (isMultiple) {
        if (state2.every((value) => existingOptionValues.has(value))) {
          return {};
        }
        return (await getOptionLabelsUsing()).filter((option) => !existingOptionValues.has(option.value)).map((option) => {
          option.selected = true;
          return option;
        });
      }
      if (existingOptionValues.has(state2)) {
        return existingOptionValues;
      }
      return [
        {
          label: await getOptionLabelUsing(),
          value: state2,
          selected: true
        }
      ];
    },
    showLoadingBlockUI: function() {
      if (this.blockUIElement) {
        this.blockUIElement.style.display = "flex";
      }
    },
    hiddenLoadingBlockUI: function() {
      if (this.blockUIElement) {
        this.blockUIElement.style.display = "none";
      }
    }
  };
}
export {
  lacunaCertificateSelect as default
};
/*! Bundled license information:

choices.js/public/assets/scripts/choices.mjs:
  (*! choices.js v11.0.3 | © 2024 Josh Johnson | https://github.com/jshjohnson/Choices#readme *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dlYi1wa2kvbGFjdW5hLXdlYi1wa2kuanMiLCAiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nob2ljZXMuanMvcHVibGljL2Fzc2V0cy9zY3JpcHRzL2Nob2ljZXMubWpzIiwgIi4uLy4uLy4uL2pzL2NvbXBvbmVudHMvZm9ybXMvbGFjdW5hLWNlcnRpZmljYXRlLXNlbGVjdC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gQWRkLW9uIHBsYWNlaG9sZGVyIChJRSBvbmx5KSAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5pZiAodHlwZW9mIHdpbmRvdy5sYWN1bmFXZWJQS0lFeHRlbnNpb24gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0d2luZG93LmxhY3VuYVdlYlBLSUV4dGVuc2lvbiA9IG51bGw7XHJcbn1cclxuXHJcblxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gQ2xhc3MgZGVjbGFyYXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbndpbmRvdy5MYWN1bmFXZWJQS0kgPSBudWxsO1xyXG5cclxuTGFjdW5hV2ViUEtJID0gZnVuY3Rpb24gKGxpY2Vuc2UpIHtcclxuXHR0aGlzLmxpY2Vuc2UgPSBudWxsO1xyXG5cdHRoaXMuZGVmYXVsdEZhaWxDYWxsYmFjayA9IG51bGw7XHJcblx0dGhpcy5hbmd1bGFyU2NvcGUgPSBudWxsO1xyXG5cdHRoaXMubmdab25lID0gbnVsbDtcclxuXHR0aGlzLmJyYW5kID0gbnVsbDtcclxuXHR0aGlzLnJlc3RQa2lVcmwgPSBudWxsO1xyXG5cdHRoaXMudXNlRG9tYWluTmF0aXZlUG9vbCA9IGZhbHNlO1xyXG5cdHRoaXMubW9iaWxlSW50ZWdyYXRpb25Nb2RlID0gbnVsbDtcclxuXHRpZiAobGljZW5zZSkge1xyXG5cdFx0dGhpcy5saWNlbnNlID0gbGljZW5zZTtcclxuXHR9XHJcblxyXG5cdC8vIGNoZWNrIGZvciBKUXVlcnkgYmxvY2tVSSBwcmVzZW5jZSBjYXVzaW5nIG1vYmlsZSB0b3VjaCBibG9ja2luZ1xyXG5cdGlmICh0aGlzLmlzU3VwcG9ydGVkTW9iaWxlICYmIHdpbmRvdy4kICYmIHdpbmRvdy4kLmJsb2NrVUkpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHdpbmRvdy4kLmJsb2NrVUkuZGVmYXVsdHMuYmluZEV2ZW50cyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLl9sb2coJ2Jsb2NrVUkgYmluZEV2ZW50cyBkaXNhYmxlZCcpO1xyXG5cclxuXHRcdH0gY2F0Y2ggKGV4KSB7XHJcblx0XHRcdHRoaXMuX2xvZygnRXJyb3IgZGlzYWJsaW5nIGJsb2NrVUkgYmluZEV2ZW50czogJywgZXgpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbi8vIEluamVjdCBjbGFzcyBwcm90b3R5cGVcclxuXHJcbihmdW5jdGlvbiAoJCkge1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIFByb21pc2Ugc3ViY2xhc3MgLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAkLlByb21pc2UgPSBmdW5jdGlvbiAoYW5ndWxhclNjb3BlLCBuZ1pvbmUpIHtcclxuICAgICAgICB0aGlzLnN1Y2Nlc3NDYWxsYmFjayA9IGZ1bmN0aW9uKCkgeyB9O1xyXG4gICAgICAgIHRoaXMuZmFpbENhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLmFuZ3VsYXJTY29wZSA9IGFuZ3VsYXJTY29wZTtcclxuICAgICAgICB0aGlzLm5nWm9uZSA9IG5nWm9uZTtcclxuICAgIH07XHJcblxyXG5cdCQuUHJvbWlzZS5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgICQuUHJvbWlzZS5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAvLyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgYW55IGxlZ2FjeSBlcnJvciBjYWxsYmFjayBjb252ZXJ0ZWQgdG8gYSBmYWlsIGNhbGxiYWNrXHJcbiAgICAgICAgdGhpcy5mYWlsQ2FsbGJhY2sgPSBmdW5jdGlvbihleCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhleC5tZXNzYWdlLCBleC5lcnJvciwgZXgub3JpZ2luLCBleC5jb2RlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAkLlByb21pc2UucHJvdG90eXBlLmZhaWwgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmZhaWxDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAkLlByb21pc2UucHJvdG90eXBlLl9pbnZva2VTdWNjZXNzID0gZnVuY3Rpb24gKHJlc3VsdCwgZGVsYXkpIHtcclxuICAgICAgICBpZiAoZGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9pbnZva2VTdWNjZXNzKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLnN1Y2Nlc3NDYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7ICQuX2xvZygnU3VjY2VzcyBpZ25vcmVkIChubyBjYWxsYmFjayByZWdpc3RlcmVkKScpOyB9O1xyXG4gICAgICAgICAgICB0aGlzLl9hcHBseShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgICQuUHJvbWlzZS5wcm90b3R5cGUuX2ludm9rZUVycm9yID0gZnVuY3Rpb24gKGV4LCBkZWxheSkge1xyXG4gICAgICAgIGlmIChkZWxheSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2ludm9rZUVycm9yKGV4KTtcclxuICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuZmFpbENhbGxiYWNrIHx8IGZ1bmN0aW9uIChleCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgJ1dlYiBQS0kgZXJyb3Igb3JpZ2luYXRlZCBhdCAnICsgZXgub3JpZ2luICsgJzogJyArIGV4Lm1lc3NhZ2UgKyAnXFxuJyArIGV4LmNvbXBsZXRlICsgJ1xcbmNvZGU6ICcgKyBleC5jb2RlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLl9hcHBseShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIFx0Y2FsbGJhY2soe1xyXG4gICAgICAgICAgICBcdFx0dXNlck1lc3NhZ2U6IGV4LnVzZXJNZXNzYWdlIHx8IGV4Lm1lc3NhZ2UsXHJcbiAgICAgICAgICAgIFx0XHRtZXNzYWdlOiBleC5tZXNzYWdlLFxyXG4gICAgICAgICAgICBcdFx0ZXJyb3I6IGV4LmNvbXBsZXRlLFxyXG4gICAgICAgICAgICBcdFx0b3JpZ2luOiBleC5vcmlnaW4sXHJcbiAgICAgICAgICAgIFx0XHRjb2RlOiBleC5jb2RlXHJcbiAgICAgICAgICAgIFx0fSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gaHR0cHM6Ly9jb2RlcndhbGwuY29tL3Avbmdpc21hL3NhZmUtYXBwbHktaW4tYW5ndWxhci1qc1xyXG4gICAgJC5Qcm9taXNlLnByb3RvdHlwZS5fYXBwbHkgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAodGhpcy5hbmd1bGFyU2NvcGUpIHtcclxuICAgICAgICAgICAgdmFyIHBoYXNlID0gdGhpcy5hbmd1bGFyU2NvcGUuJHJvb3QuJCRwaGFzZTtcclxuICAgICAgICAgICAgaWYgKHBoYXNlID09ICckYXBwbHknIHx8IHBoYXNlID09ICckZGlnZXN0Jykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5ndWxhclNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5nWm9uZSkge1xyXG4gICAgICAgIFx0dGhpcy5uZ1pvbmUucnVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcdFx0Y2FsbGJhY2soKTtcclxuICAgICAgICBcdH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gQ29uc3RhbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdCQuX2luc3RhbGxVcmwgPSAnaHR0cHM6Ly9nZXQud2VicGtpcGx1Z2luLmNvbS8nO1xyXG5cdCQuX2Nocm9tZUV4dGVuc2lvbklkID0gJ2RjbmdlYWdtbWhlZ2FnaWNwY21waW5hb2tsZGRjZ29uJztcclxuXHQkLl9maXJlZm94RXh0ZW5zaW9uSWQgPSAnd2VicGtpLWJldGFAbGFjdW5hc29mdHdhcmUuY29tJztcclxuXHQkLl9lZGdlRXh0ZW5zaW9uSWQgPSAnbmVkZWVnZG1obG5tYm9ib2FoY2hmcGttZG5uZW1hcGQnO1xyXG5cdCQuX2VkZ2VMZWdhY3lQcm9kdWN0SWQgPSAnZDI3OThhODUtOTY5OC00MjVhLWFkZDctM2RiNzlhMzljYThhJztcclxuXHQkLl9jaHJvbWVFeHRlbnNpb25GaXJzdFZlcnNpb25XaXRoU2VsZlVwZGF0ZSA9ICcyLjAuMjAnO1xyXG5cdCQuX2pzbGliVmVyc2lvbiA9ICcyLjE2LjMnO1xyXG5cdCQuX21vYmlsZVN1cHBvcnRlZCA9ICd0cnVlJyA9PT0gJ3RydWUnO1xyXG5cdCQuX2J1aWxkQ2hhbm5lbCA9ICdzdGFibGUnO1xyXG5cclxuXHQvLyBsYXRlc3QgY29tcG9uZW50cyB2ZXJzaW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQkLl9leHRlbnNpb25SZXF1aXJlZFZlcnNpb24gPSAnMi4xNi4wJztcclxuXHQkLl9jaHJvbWVOYXRpdmVXaW5SZXF1aXJlZFZlcnNpb24gPSAnMi4xMi4zJztcclxuXHQkLl9jaHJvbWVOYXRpdmVMaW51eFJlcXVpcmVkVmVyc2lvbiA9ICcyLjEzLjMnO1xyXG5cdCQuX2Nocm9tZU5hdGl2ZU1hY1JlcXVpcmVkVmVyc2lvbiA9ICcyLjEzLjMnO1xyXG5cdCQuX2llQWRkb25SZXF1aXJlZFZlcnNpb24gPSAnMi45LjEnO1xyXG5cdCQuX21vYmlsZVJlcXVpcmVkVmVyc2lvbiA9ICczLjIuMCc7XHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAkLl9jaHJvbWVJbnN0YWxsYXRpb25TdGF0ZXMgPSB7XHJcbiAgICAgICAgSU5TVEFMTEVEOiAwLFxyXG4gICAgICAgIEVYVEVOU0lPTl9OT1RfSU5TVEFMTEVEOiAxLFxyXG4gICAgICAgIEVYVEVOU0lPTl9PVVREQVRFRDogMixcclxuICAgICAgICBOQVRJVkVfTk9UX0lOU1RBTExFRDogMyxcclxuICAgICAgICBOQVRJVkVfT1VUREFURUQ6IDRcclxuICAgIH07XHJcblxyXG4gICAgJC5fY2VydEtleVVzYWdlcyA9IHtcclxuICAgICAgICBjcmxTaWduOiAyLFxyXG4gICAgICAgIGRhdGFFbmNpcGhlcm1lbnQ6IDE2LFxyXG4gICAgICAgIGRlY2lwaGVyT25seTogMzI3NjgsXHJcbiAgICAgICAgZGlnaXRhbFNpZ25hdHVyZTogMTI4LFxyXG4gICAgICAgIGVuY2lwaGVyT25seTogMSxcclxuICAgICAgICBrZXlBZ3JlZW1lbnQ6IDgsXHJcbiAgICAgICAga2V5Q2VydFNpZ246IDQsXHJcbiAgICAgICAga2V5RW5jaXBoZXJtZW50OiAzMixcclxuICAgICAgICBub25SZXB1ZGlhdGlvbjogNjRcclxuICAgIH07XHJcblxyXG5cdCQuX2NlcnRFeHRlbmRlZEtleVVzYWdlcyA9IHtcclxuXHRcdGNsaWVudEF1dGg6IDEsXHJcblx0XHRzZXJ2ZXJBdXRoOiAyLFxyXG5cdFx0Y29kZVNpZ25pbmc6IDQsXHJcblx0XHRlbWFpbFByb3RlY3Rpb246IDgsXHJcblx0XHR0aW1lU3RhbXBpbmc6IDE2LFxyXG5cdFx0b2NzcFNpZ25pbmc6IDMyLFxyXG5cdFx0aXBzZWNFbmRTeXN0ZW06IDY0LFxyXG5cdFx0aXBzZWNUdW5uZWw6IDEyOCxcclxuXHRcdGlwc2VjVXNlcjogMjU2LFxyXG5cdFx0YW55OiA1MTJcclxuXHR9O1xyXG5cclxuXHQkLmFwaVZlcnNpb25zID0ge1xyXG5cdFx0djFfMDogJzEuMCcsXHJcblx0XHR2MV8xOiAnMS4xJyxcclxuXHRcdHYxXzI6ICcxLjInLFxyXG5cdFx0djFfMzogJzEuMycsXHJcblx0XHR2MV80OiAnMS40JyxcclxuXHRcdHYxXzRfMTogJzEuNC4xJyxcclxuXHRcdHYxXzU6ICcxLjUnLFxyXG5cdFx0djFfNV8xOiAnMS41LjEnLFxyXG5cdFx0djFfNV8yOiAnMS41LjInLFxyXG5cdFx0djFfNjogJzEuNi4wJyxcclxuXHRcdHYxXzZfMTogJzEuNi4xJyxcclxuXHRcdHYxXzdfMDogJzEuNy4wJyxcclxuXHRcdHYxXzdfMjogJzEuNy4yJyxcclxuXHRcdHYxXzhfMDogJzEuOC4wJyxcclxuXHRcdHYxXzhfMTogJzEuOC4xJyxcclxuXHRcdHYxXzhfMjogJzEuOC4yJyxcclxuXHRcdHYxXzlfMDogJzEuOS4wJyxcclxuXHRcdGxhdGVzdDogJ2xhdGVzdCdcclxuXHR9O1xyXG5cclxuICAgICQuX2FwaU1hcCA9IHtcclxuICAgICAgICBuYXRpdmVXaW46IHt9LCBcclxuICAgICAgICBuYXRpdmVMaW51eDoge30sXHJcbiAgICAgICAgbmF0aXZlTWFjOiB7fSxcclxuICAgICAgICBpZUFkZG9uOiB7fSxcclxuICAgICAgICBleHRlbnNpb246IHt9LFxyXG4gICAgICAgIG1vYmlsZToge31cclxuICAgIH07XHJcbiAgICAvLyBzeW50YXg6IGFwaV92ZXJzaW9uOiBzdXBwb3J0ZWRfc2luY2VfdmVyc2lvblxyXG4gICAgLy8gV2luZG93c1xyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZVdpblskLmFwaVZlcnNpb25zLnYxXzBdID0gJzIuMS4wJztcclxuICAgICQuX2FwaU1hcC5uYXRpdmVXaW5bJC5hcGlWZXJzaW9ucy52MV8xXSA9ICcyLjMuMCc7XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlV2luWyQuYXBpVmVyc2lvbnMudjFfMl0gPSAnMi40LjEnO1xyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZVdpblskLmFwaVZlcnNpb25zLnYxXzNdID0gJzIuNS4wJztcclxuICAgICQuX2FwaU1hcC5uYXRpdmVXaW5bJC5hcGlWZXJzaW9ucy52MV80XSA9ICcyLjYuMic7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZVdpblskLmFwaVZlcnNpb25zLnYxXzRfMV0gPSAnMi42LjUnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVXaW5bJC5hcGlWZXJzaW9ucy52MV81XSA9ICcyLjguMCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZVdpblskLmFwaVZlcnNpb25zLnYxXzVfMV0gPSAnMi44LjEnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVXaW5bJC5hcGlWZXJzaW9ucy52MV81XzJdID0gJzIuOS4wJztcclxuXHQkLl9hcGlNYXAubmF0aXZlV2luWyQuYXBpVmVyc2lvbnMudjFfNl0gPSAnMi4xMC4wJztcclxuXHQkLl9hcGlNYXAubmF0aXZlV2luWyQuYXBpVmVyc2lvbnMudjFfNl8xXSA9ICcyLjEwLjEnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVXaW5bJC5hcGlWZXJzaW9ucy52MV83XzBdID0gJzIuMTEuMCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZVdpblskLmFwaVZlcnNpb25zLnYxXzdfMl0gPSAnMi4xMS4wJztcclxuXHQkLl9hcGlNYXAubmF0aXZlV2luWyQuYXBpVmVyc2lvbnMudjFfOF8wXSA9ICcyLjEyLjAnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVXaW5bJC5hcGlWZXJzaW9ucy52MV84XzFdID0gJzIuMTIuMSc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZVdpblskLmFwaVZlcnNpb25zLnYxXzhfMl0gPSAnMi4xMi4zJztcclxuXHQkLl9hcGlNYXAubmF0aXZlV2luWyQuYXBpVmVyc2lvbnMudjFfOV8wXSA9ICcyLjEyLjMnO1xyXG5cclxuICAgIC8vIElFXHJcbiAgICAkLl9hcGlNYXAuaWVBZGRvblskLmFwaVZlcnNpb25zLnYxXzBdID0gJzIuMC40JztcclxuICAgICQuX2FwaU1hcC5pZUFkZG9uWyQuYXBpVmVyc2lvbnMudjFfMV0gPSAnMi4xLjEnO1xyXG4gICAgJC5fYXBpTWFwLmllQWRkb25bJC5hcGlWZXJzaW9ucy52MV8yXSA9ICcyLjIuNCc7XHJcbiAgICAkLl9hcGlNYXAuaWVBZGRvblskLmFwaVZlcnNpb25zLnYxXzNdID0gJzIuMy4wJztcclxuICAgICQuX2FwaU1hcC5pZUFkZG9uWyQuYXBpVmVyc2lvbnMudjFfNF0gPSAnMi40LjInO1xyXG4gICAgJC5fYXBpTWFwLmllQWRkb25bJC5hcGlWZXJzaW9ucy52MV80XzFdID0gJzIuNC41JztcclxuXHQkLl9hcGlNYXAuaWVBZGRvblskLmFwaVZlcnNpb25zLnYxXzVdID0gJzIuNS4wJztcclxuXHQkLl9hcGlNYXAuaWVBZGRvblskLmFwaVZlcnNpb25zLnYxXzVfMV0gPSAnMi41LjInO1xyXG5cdCQuX2FwaU1hcC5pZUFkZG9uWyQuYXBpVmVyc2lvbnMudjFfNV8yXSA9ICcyLjYuMCc7XHJcblx0JC5fYXBpTWFwLmllQWRkb25bJC5hcGlWZXJzaW9ucy52MV82XSA9ICcyLjcuMCc7XHJcblx0JC5fYXBpTWFwLmllQWRkb25bJC5hcGlWZXJzaW9ucy52MV82XzFdID0gJzIuNy4yJztcclxuXHQkLl9hcGlNYXAuaWVBZGRvblskLmFwaVZlcnNpb25zLnYxXzdfMF0gPSAnMi44LjAnO1xyXG5cdCQuX2FwaU1hcC5pZUFkZG9uWyQuYXBpVmVyc2lvbnMudjFfN18yXSA9ICcyLjguMCc7XHJcblx0JC5fYXBpTWFwLmllQWRkb25bJC5hcGlWZXJzaW9ucy52MV84XzBdID0gJzIuOS4wJztcclxuXHQkLl9hcGlNYXAuaWVBZGRvblskLmFwaVZlcnNpb25zLnYxXzhfMV0gPSAnMi45LjEnO1xyXG5cdCQuX2FwaU1hcC5pZUFkZG9uWyQuYXBpVmVyc2lvbnMudjFfOF8yXSA9ICcyLjkuMSc7XHJcblx0JC5fYXBpTWFwLmllQWRkb25bJC5hcGlWZXJzaW9ucy52MV85XzBdID0gJzIuOS4xJztcclxuXHJcbiAgICAvLyBMaW51eFxyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfMF0gPSAnMi4wLjAnO1xyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfMV0gPSAnMi40LjAnO1xyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfMl0gPSAnMi42LjInO1xyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfM10gPSAnMi43LjAnO1xyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfNF0gPSAnMi43LjQnO1xyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfNF8xXSA9ICcyLjcuNCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfNV0gPSAnMi45LjAnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVMaW51eFskLmFwaVZlcnNpb25zLnYxXzVfMV0gPSAnMi45LjAnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVMaW51eFskLmFwaVZlcnNpb25zLnYxXzVfMl0gPSAnMi45LjUnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVMaW51eFskLmFwaVZlcnNpb25zLnYxXzZdID0gJzIuMTAuMCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfNl8xXSA9ICcyLjEwLjAnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVMaW51eFskLmFwaVZlcnNpb25zLnYxXzdfMF0gPSAnMi4xMi4wJztcclxuXHQkLl9hcGlNYXAubmF0aXZlTGludXhbJC5hcGlWZXJzaW9ucy52MV83XzJdID0gJzIuMTIuMSc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfOF8wXSA9ICcyLjEzLjAnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVMaW51eFskLmFwaVZlcnNpb25zLnYxXzhfMV0gPSAnMi4xMy4xJztcclxuXHQkLl9hcGlNYXAubmF0aXZlTGludXhbJC5hcGlWZXJzaW9ucy52MV84XzJdID0gJzIuMTMuMyc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfOV8wXSA9ICcyLjEzLjMnO1xyXG5cclxuICAgIC8vIE1hY1xyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZU1hY1skLmFwaVZlcnNpb25zLnYxXzBdID0gJzIuMy4wJztcclxuICAgICQuX2FwaU1hcC5uYXRpdmVNYWNbJC5hcGlWZXJzaW9ucy52MV8xXSA9ICcyLjQuMCc7XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlTWFjWyQuYXBpVmVyc2lvbnMudjFfMl0gPSAnMi42LjEnO1xyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZU1hY1skLmFwaVZlcnNpb25zLnYxXzNdID0gJzIuNy4wJztcclxuICAgICQuX2FwaU1hcC5uYXRpdmVNYWNbJC5hcGlWZXJzaW9ucy52MV80XSA9ICcyLjcuNCc7XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlTWFjWyQuYXBpVmVyc2lvbnMudjFfNF8xXSA9ICcyLjcuNCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZU1hY1skLmFwaVZlcnNpb25zLnYxXzVdID0gJzIuOS4wJztcclxuXHQkLl9hcGlNYXAubmF0aXZlTWFjWyQuYXBpVmVyc2lvbnMudjFfNV8xXSA9ICcyLjkuMCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZU1hY1skLmFwaVZlcnNpb25zLnYxXzVfMl0gPSAnMi45LjUnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVNYWNbJC5hcGlWZXJzaW9ucy52MV82XSA9ICcyLjEwLjAnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVNYWNbJC5hcGlWZXJzaW9ucy52MV82XzFdID0gJzIuMTAuMCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZU1hY1skLmFwaVZlcnNpb25zLnYxXzdfMF0gPSAnMi4xMi4wJztcclxuXHQkLl9hcGlNYXAubmF0aXZlTWFjWyQuYXBpVmVyc2lvbnMudjFfN18yXSA9ICcyLjEyLjEnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVNYWNbJC5hcGlWZXJzaW9ucy52MV84XzBdID0gJzIuMTMuMCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZU1hY1skLmFwaVZlcnNpb25zLnYxXzhfMV0gPSAnMi4xMy4xJztcclxuXHQkLl9hcGlNYXAubmF0aXZlTWFjWyQuYXBpVmVyc2lvbnMudjFfOF8yXSA9ICcyLjEzLjMnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVNYWNbJC5hcGlWZXJzaW9ucy52MV85XzBdID0gJzIuMTMuMyc7XHJcblxyXG4gICAgLy8gV2ViRXh0ZW5zaW9uXHJcbiAgICAkLl9hcGlNYXAuZXh0ZW5zaW9uWyQuYXBpVmVyc2lvbnMudjFfMF0gPSAnMi4zLjInO1xyXG4gICAgJC5fYXBpTWFwLmV4dGVuc2lvblskLmFwaVZlcnNpb25zLnYxXzFdID0gJzIuNy4wJztcclxuICAgICQuX2FwaU1hcC5leHRlbnNpb25bJC5hcGlWZXJzaW9ucy52MV8yXSA9ICcyLjkuMSc7XHJcbiAgICAkLl9hcGlNYXAuZXh0ZW5zaW9uWyQuYXBpVmVyc2lvbnMudjFfM10gPSAnMi4xMC4xJztcclxuICAgICQuX2FwaU1hcC5leHRlbnNpb25bJC5hcGlWZXJzaW9ucy52MV80XSA9ICcyLjExLjcnO1xyXG4gICAgJC5fYXBpTWFwLmV4dGVuc2lvblskLmFwaVZlcnNpb25zLnYxXzRfMV0gPSAnMi4xMS43JztcclxuXHQkLl9hcGlNYXAuZXh0ZW5zaW9uWyQuYXBpVmVyc2lvbnMudjFfNV0gPSAnMi4xMy4wJztcclxuXHQkLl9hcGlNYXAuZXh0ZW5zaW9uWyQuYXBpVmVyc2lvbnMudjFfNV8xXSA9ICcyLjEzLjAnO1xyXG5cdCQuX2FwaU1hcC5leHRlbnNpb25bJC5hcGlWZXJzaW9ucy52MV81XzJdID0gJzIuMTQuMic7XHJcblx0JC5fYXBpTWFwLmV4dGVuc2lvblskLmFwaVZlcnNpb25zLnYxXzZdID0gJzIuMTUuMCc7XHJcblx0JC5fYXBpTWFwLmV4dGVuc2lvblskLmFwaVZlcnNpb25zLnYxXzZfMV0gPSAnMi4xNS4wJztcclxuXHQkLl9hcGlNYXAuZXh0ZW5zaW9uWyQuYXBpVmVyc2lvbnMudjFfN18wXSA9ICcyLjE2LjAnO1xyXG5cdCQuX2FwaU1hcC5leHRlbnNpb25bJC5hcGlWZXJzaW9ucy52MV83XzJdID0gJzIuMTYuMCc7XHJcblx0JC5fYXBpTWFwLmV4dGVuc2lvblskLmFwaVZlcnNpb25zLnYxXzhfMF0gPSAnMi4xNi4wJztcclxuXHQkLl9hcGlNYXAuZXh0ZW5zaW9uWyQuYXBpVmVyc2lvbnMudjFfOF8xXSA9ICcyLjE2LjAnO1xyXG5cdCQuX2FwaU1hcC5leHRlbnNpb25bJC5hcGlWZXJzaW9ucy52MV84XzJdID0gJzIuMTYuMCc7XHJcblx0JC5fYXBpTWFwLmV4dGVuc2lvblskLmFwaVZlcnNpb25zLnYxXzlfMF0gPSAnMi4xNy4wJztcclxuXHJcblx0Ly8gTW9iaWxlXHJcbiAgICAkLl9hcGlNYXAubW9iaWxlWyQuYXBpVmVyc2lvbnMudjFfMF0gPSAnMS4xLjAnO1xyXG4gICAgJC5fYXBpTWFwLm1vYmlsZVskLmFwaVZlcnNpb25zLnYxXzFdID0gJzEuMS4wJztcclxuICAgICQuX2FwaU1hcC5tb2JpbGVbJC5hcGlWZXJzaW9ucy52MV8yXSA9ICcxLjEuMCc7XHJcbiAgICAkLl9hcGlNYXAubW9iaWxlWyQuYXBpVmVyc2lvbnMudjFfM10gPSAnMS4xLjAnO1xyXG5cdCQuX2FwaU1hcC5tb2JpbGVbJC5hcGlWZXJzaW9ucy52MV80XSA9ICcxLjEuMCc7XHJcblx0JC5fYXBpTWFwLm1vYmlsZVskLmFwaVZlcnNpb25zLnYxXzRfMV0gPSAnMS4xLjAnO1xyXG5cdCQuX2FwaU1hcC5tb2JpbGVbJC5hcGlWZXJzaW9ucy52MV81XSA9ICcxLjEuMCc7XHJcblx0JC5fYXBpTWFwLm1vYmlsZVskLmFwaVZlcnNpb25zLnYxXzVfMV0gPSAnMS4xLjAnO1xyXG5cdCQuX2FwaU1hcC5tb2JpbGVbJC5hcGlWZXJzaW9ucy52MV81XzJdID0gJzEuMS4wJztcclxuXHQkLl9hcGlNYXAubW9iaWxlWyQuYXBpVmVyc2lvbnMudjFfNl0gPSAnMi43LjAnO1xyXG5cdCQuX2FwaU1hcC5tb2JpbGVbJC5hcGlWZXJzaW9ucy52MV82XzFdID0gJzIuNy4wJztcclxuXHQkLl9hcGlNYXAubW9iaWxlWyQuYXBpVmVyc2lvbnMudjFfN18wXSA9ICczLjAuMCc7XHJcblx0JC5fYXBpTWFwLm1vYmlsZVskLmFwaVZlcnNpb25zLnYxXzdfMl0gPSAnMy4wLjAnO1xyXG5cdCQuX2FwaU1hcC5tb2JpbGVbJC5hcGlWZXJzaW9ucy52MV84XzBdID0gJzMuMi4wJztcclxuXHQkLl9hcGlNYXAubW9iaWxlWyQuYXBpVmVyc2lvbnMudjFfOF8xXSA9ICczLjIuMCc7XHJcblx0JC5fYXBpTWFwLm1vYmlsZVskLmFwaVZlcnNpb25zLnYxXzhfMl0gPSAnMy4yLjAnO1xyXG5cdCQuX2FwaU1hcC5tb2JpbGVbJC5hcGlWZXJzaW9ucy52MV85XzBdID0gJzMuMi4wJztcclxuXHJcbiAgICAvLyBBbGwgbGF0ZXN0XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlV2luICBbJC5hcGlWZXJzaW9ucy5sYXRlc3RdID0gJC5fY2hyb21lTmF0aXZlV2luUmVxdWlyZWRWZXJzaW9uO1xyXG4gICAgJC5fYXBpTWFwLmllQWRkb24gICAgWyQuYXBpVmVyc2lvbnMubGF0ZXN0XSA9ICQuX2llQWRkb25SZXF1aXJlZFZlcnNpb247XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlTGludXhbJC5hcGlWZXJzaW9ucy5sYXRlc3RdID0gJC5fY2hyb21lTmF0aXZlTGludXhSZXF1aXJlZFZlcnNpb247XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlTWFjICBbJC5hcGlWZXJzaW9ucy5sYXRlc3RdID0gJC5fY2hyb21lTmF0aXZlTWFjUmVxdWlyZWRWZXJzaW9uO1xyXG4gICAgJC5fYXBpTWFwLmV4dGVuc2lvbiAgWyQuYXBpVmVyc2lvbnMubGF0ZXN0XSA9ICQuX2V4dGVuc2lvblJlcXVpcmVkVmVyc2lvbjtcclxuICAgICQuX2FwaU1hcC5tb2JpbGUgICAgIFskLmFwaVZlcnNpb25zLmxhdGVzdF0gPSAkLl9tb2JpbGVSZXF1aXJlZFZlcnNpb247XHJcblxyXG5cdC8vIHBvcHVsYXRlZCBhZnRlciBpbml0XHJcbiAgICAkLl9uYXRpdmVJbmZvID0ge307XHJcblxyXG4gICAgJC5pbnN0YWxsYXRpb25TdGF0ZXMgPSB7XHJcbiAgICAgICAgSU5TVEFMTEVEOiAwLFxyXG4gICAgICAgIE5PVF9JTlNUQUxMRUQ6IDEsXHJcbiAgICAgICAgT1VUREFURUQ6IDIsXHJcbiAgICAgICAgQlJPV1NFUl9OT1RfU1VQUE9SVEVEOiAzXHJcbiAgICB9O1xyXG5cclxuXHQvLyBQb3JwZXJ0aWVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdCQuaXNTdXBwb3J0ZWRNb2JpbGUgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgLy8gUGtpIE9wdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHQkLmNlcnRpZmljYXRlVmFsaWRhdGlvbkxldmVscyA9IHtcclxuXHRcdGZ1bGw6ICdmdWxsJyxcclxuXHRcdG9mZmxpbmU6ICdvZmZsaW5lJ1xyXG5cdH07XHJcblxyXG4gICAgJC5wYWRlc1BvbGljaWVzID0ge1xyXG4gICAgICAgIGJhc2ljOiAnYmFzaWMnLFxyXG4gICAgICAgIGJyYXppbEFkckJhc2ljYTogJ2JyYXppbEFkckJhc2ljYSdcclxuICAgIH07XHJcblxyXG4gICAgJC5jYWRlc1BvbGljaWVzID0ge1xyXG4gICAgICAgIGJlczogJ2NhZGVzQmVzJyxcclxuICAgICAgICBicmF6aWxBZHJCYXNpY2E6ICdicmF6aWxBZHJCYXNpY2EnXHJcbiAgICB9O1xyXG5cclxuICAgICQueG1sUG9saWNpZXMgPSB7XHJcbiAgICBcdHhtbERTaWc6ICd4bWxEU2lnJyxcclxuICAgIFx0XHJcbiAgICBcdHhhZGVzQmVzOiAneGFkZXNCZXMnLFxyXG4gICAgXHRicmF6aWxORmU6ICdicmF6aWxORmUnLFxyXG4gICAgXHRicmF6aWxBZHJCYXNpY2E6ICdicmF6aWxBZHJCYXNpY2EnXHJcbiAgICB9O1xyXG5cclxuICAgICQuY2FkZXNBY2NlcHRhYmxlUG9saWNpZXMgPSB7XHJcbiAgICAgICAgcGtpQnJhemlsOiBbXHJcbiAgICAgICAgICAgICdicmF6aWxBZHJCYXNpY2EnLFxyXG4gICAgICAgICAgICAnYnJhemlsQWRyVGVtcG8nLFxyXG4gICAgICAgICAgICAnYnJhemlsQWRyVmFsaWRhY2FvJyxcclxuICAgICAgICAgICAgJ2JyYXppbEFkckNvbXBsZXRhJyxcclxuICAgICAgICAgICAgJ2JyYXppbEFkckFycXVpdmFtZW50bydcclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgICQueG1sQWNjZXB0YWJsZVBvbGljaWVzID0ge1xyXG4gICAgXHRwa2lCcmF6aWw6IFtcclxuICAgICAgICAgICAgJ2JyYXppbEFkckJhc2ljYScsXHJcbiAgICAgICAgICAgICdicmF6aWxBZHJUZW1wbydcclxuICAgIFx0XVxyXG4gICAgfTtcclxuXHJcblx0JC5zdGFuZGFyZFRydXN0QXJiaXRyYXRvcnMgPSB7XHJcblx0ICAgIHBraUJyYXppbDoge1xyXG5cdCAgICAgICAgdHlwZTogJ3N0YW5kYXJkJyxcclxuXHQgICAgICAgIHN0YW5kYXJkQXJiaXRyYXRvcjogJ3BraUJyYXppbCdcclxuXHQgICAgfSxcclxuXHQgICAgcGtpSXRhbHk6IHtcclxuXHQgICAgICAgIHR5cGU6ICdzdGFuZGFyZCcsXHJcblx0ICAgICAgICBzdGFuZGFyZEFyYml0cmF0b3I6ICdwa2lJdGFseSdcclxuXHQgICAgfSxcclxuXHQgICAgcGtpUGVydToge1xyXG5cdCAgICAgICAgdHlwZTogJ3N0YW5kYXJkJyxcclxuXHQgICAgICAgIHN0YW5kYXJkQXJiaXRyYXRvcjogJ3BraVBlcnUnXHJcblx0ICAgIH0sXHJcblx0ICAgIHdpbmRvd3M6IHtcclxuXHQgICAgICAgIHR5cGU6ICdzdGFuZGFyZCcsXHJcblx0ICAgICAgICBzdGFuZGFyZEFyYml0cmF0b3I6ICd3aW5kb3dzJ1xyXG5cdCAgICB9XHJcblx0fTtcclxuXHJcblx0JC54bWxJbnNlcnRpb25PcHRpb25zID0ge1xyXG5cdFx0YXBwZW5kQ2hpbGQ6ICdhcHBlbmRDaGlsZCcsXHJcblx0XHRwcmVwZW5kQ2hpbGQ6ICdwcmVwZW5kQ2hpbGQnLFxyXG5cdFx0YXBwZW5kU2libGluZzogJ2FwcGVuZFNpYmxpbmcnLFxyXG5cdFx0cHJlcGVuZFNpYmxpbmc6ICdwcmVwZW5kU2libGluZydcclxuXHR9O1xyXG5cclxuXHQkLm91dHB1dE1vZGVzID0ge1xyXG5cdCAgICBzaG93U2F2ZUZpbGVEaWFsb2c6ICdzaG93U2F2ZUZpbGVEaWFsb2cnLFxyXG5cdCAgICBzYXZlSW5Gb2xkZXI6ICdzYXZlSW5Gb2xkZXInLFxyXG5cdCAgICBhdXRvU2F2ZTogJ2F1dG9TYXZlJyxcclxuXHQgICAgcmV0dXJuQ29udGVudDogJ3JldHVybkNvbnRlbnQnXHJcblx0fTtcclxuXHJcblx0JC50cnVzdEFyYml0cmF0b3JUeXBlcyA9IHtcclxuXHQgICAgdHJ1c3RlZFJvb3Q6ICd0cnVzdGVkUm9vdCcsXHJcblx0ICAgIHRzbDogJ3RzbCcsXHJcblx0ICAgIHN0YW5kYXJkOiAnc3RhbmRhcmQnXHJcblx0fTtcclxuXHJcbiAgICAvLyB2aXN1YWwgcmVwcmVzZW50YXRpb25cclxuXHQkLnBhZGVzUGFwZXJTaXplcyA9IHtcclxuXHQgICAgY3VzdG9tOiAnY3VzdG9tJyxcclxuXHQgICAgYTA6ICdhMCcsXHJcblx0ICAgIGExOiAnYTEnLFxyXG5cdCAgICBhMjogJ2EyJyxcclxuXHQgICAgYTM6ICdhMycsXHJcblx0ICAgIGE0OiAnYTQnLFxyXG5cdCAgICBhNTogJ2E1JyxcclxuXHQgICAgYTY6ICdhNicsXHJcblx0ICAgIGE3OiAnYTcnLFxyXG5cdCAgICBhODogJ2E4JyxcclxuXHQgICAgbGV0dGVyOiAnbGV0dGVyJyxcclxuXHQgICAgbGVnYWw6ICdsZWdhbCcsXHJcblx0ICAgIGxlZGdlcjogJ2xlZGdlcidcclxuXHR9O1xyXG5cclxuXHQkLnBhZGVzSG9yaXpvbnRhbEFsaWduID0ge1xyXG5cdCAgICBsZWZ0OiAnbGVmdCcsXHJcblx0ICAgIGNlbnRlcjogJ2NlbnRlcicsXHJcblx0ICAgIHJpZ3RoOiAncmlndGgnXHJcblx0fTtcclxuXHJcblx0JC5wYWRlc1ZlcnRpY2FsQWxpZ24gPSB7XHJcblx0ICAgIHRvcDogJ3RvcCcsXHJcblx0ICAgIGNlbnRlcjogJ2NlbnRlcicsXHJcblx0ICAgIGJvdHRvbTogJ2JvdHRvbSdcclxuXHR9O1xyXG5cclxuXHQkLnBhZGVzTWVhc3VyZW1lbnRVbml0cyA9IHtcclxuXHQgICAgY2VudGltZXRlcnM6ICdjZW50aW1ldGVycycsXHJcblx0ICAgIHBkZlBvaW50czogJ3BkZlBvaW50cydcclxuXHR9O1xyXG5cclxuXHQkLnBhZGVzUGFnZU9yaWVudGF0aW9ucyA9IHtcclxuXHQgICAgYXV0bzogJ2F1dG8nLFxyXG5cdCAgICBwb3J0cmFpdDogJ3BvcnRyYWl0JyxcclxuICAgICAgICBsYW5kc2NhcGU6ICdsYW5kc2NhcGUnXHJcblx0fTtcclxuXHJcblx0JC5wYWRlc0F1dG9Qb3NpdGlvbmluZ0hvcml6b250YWxEaXJlY3Rpb25zID0ge1xyXG5cdFx0bGVmdFRvUmlnaHQ6ICdsZWZ0VG9SaWdodCcsXHJcblx0XHRyaWdodFRvTGVmdDogJ3JpZ2h0VG9MZWZ0J1xyXG5cdH07XHJcblxyXG5cdCQucGFkZXNBdXRvUG9zaXRpb25pbmdWZXJ0aWNhbERpcmVjdGlvbnMgPSB7XHJcblx0XHR0b3BEb3duOiAndG9wRG93bicsXHJcblx0XHRib3R0b21VcDogJ2JvdHRvbVVwJ1xyXG5cdH07XHJcblxyXG4gICAgLy8gcGRmIG1hcmtcclxuXHQkLm1hcmtFbGVtZW50VHlwZXMgPSB7XHJcblx0ICAgIHRleHQ6ICd0ZXh0JyxcclxuXHQgICAgaW1hZ2U6ICdpbWFnZSdcclxuXHR9O1xyXG5cclxuXHQkLm1hcmtUZXh0U3R5bGUgPSB7XHJcblx0ICAgIG5vcm1hbDogMCxcclxuXHQgICAgYm9sZDogMSxcclxuXHQgICAgaXRhbGljOiAyXHJcblx0fTtcclxuXHJcblx0Ly8gcGFzc3dvcmQgcG9saWNpZXNcclxuXHQkLnBhc3N3b3JkUG9saWNpZXMgPSB7XHJcblx0XHRsZXR0ZXJzQW5kTnVtYmVyczogMSxcclxuXHRcdHVwcGVyQW5kTG93ZXJDYXNlOiAyLFxyXG5cdFx0c3BlY2lhbENoYXJhY3RlcnM6IDRcclxuXHR9O1xyXG5cclxuXHQvLyBzdGFuZGFyZCBwa2NzMTEgbW9kdWxlc1xyXG5cdCQucGtjczExTW9kdWxlcyA9IHtcclxuXHRcdHNhZmVTaWduOiB7IHdpbjogJ2FldHBrc3MxLmRsbCcsIGxpbnV4OiAnbGliYWV0cGtzcy5zby4zJywgbWFjOiAnbGliYWV0cGtzcy5keWxpYicgfSxcclxuXHRcdHNhZmVOZXQ6IHsgd2luOiAnZVRQS0NTMTEuZGxsJywgbGludXg6ICdsaWJlVG9rZW4uc28nLCBtYWM6ICdsaWJlVG9rZW4uZHlsaWInIH1cclxuXHR9O1xyXG5cclxuXHQkLm1vYmlsZUludGVncmF0aW9uTW9kZXMgPSB7XHJcblx0XHRhcHBJbnRlZ3JhdGlvbjogJ2FwcEludGVncmF0aW9uJyxcclxuXHRcdGJyb3dzZXJJbnRlZ3JhdGlvbjogJ2Jyb3dzZXJJbnRlZ3JhdGlvbidcclxuXHR9O1xyXG5cclxuXHQkLmVuY3J5cHRpb25QYXJhbWV0ZXJzID0ge1xyXG5cdFx0cnNhRW5jcnlwdGlvblBrY3MxOiAnUlNBRW5jcnlwdGlvblBrY3MxJyxcclxuXHRcdHJzYUVuY3J5cHRpb25PYWVwU0hBMTogJ1JTQUVuY3J5cHRpb25PYWVwU0hBMScsXHJcblx0XHRyc2FFbmNyeXB0aW9uT2FlcFNIQTI1NjogJ1JTQUVuY3J5cHRpb25PYWVwU0hBMjU2JyxcclxuXHRcdHJzYUVuY3J5cHRpb25PYWVwU0hBMzg0OiAnUlNBRW5jcnlwdGlvbk9hZXBTSEEzODQnLFxyXG5cdFx0cnNhRW5jcnlwdGlvbk9hZXBTSEE1MTI6ICdSU0FFbmNyeXB0aW9uT2FlcFNIQTUxMidcclxuXHR9O1xyXG5cclxuXHQkLl9wYXJzZURhdGFVcmwgPSBmdW5jdGlvbiAodXJsKSB7XHJcblx0XHR2YXIgbWF0Y2ggPSAvXmRhdGE6KC4rKTtiYXNlNjQsKC4rKSQvLmV4ZWModXJsKTtcclxuXHRcdGlmICghbWF0Y2gpIHtcclxuXHRcdFx0JC5fbG9nKCdmYWlsZWQgdG8gcGFyc2UgZGF0YSB1cmwnKTtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRtaW1lVHlwZTogbWF0Y2hbMV0sXHJcblx0XHRcdGNvbnRlbnQ6IG1hdGNoWzJdXHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdCQuX2Rvd25sb2FkUmVzb3VyY2UgPSBmdW5jdGlvbiAodXJsLCBjYWxsQmFjaykge1xyXG5cdFx0JC5fbG9nKCdyZXNvbHZpbmcgcmVzb3VyY2UgcmVmZXJlbmNlOiAnICsgdXJsKTtcclxuXHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHRcdHhoci5vcGVuKCdHRVQnLCB1cmwpO1xyXG5cdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcclxuXHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciByZXNwb25zZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblx0XHRcdHJlc3BvbnNlUmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHQkLl9sb2coJ3Jlc291cmNlIHJlZmVyZW5jZSByZXNvbHZlZCcpO1xyXG5cdFx0XHRcdHZhciByZXNvdXJjZSA9ICQuX3BhcnNlRGF0YVVybChyZXNwb25zZVJlYWRlci5yZXN1bHQpO1xyXG5cdFx0XHRcdGNhbGxCYWNrKHJlc291cmNlKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0cmVzcG9uc2VSZWFkZXIucmVhZEFzRGF0YVVSTCh4aHIucmVzcG9uc2UpO1xyXG5cdFx0fTtcclxuXHRcdHhoci5zZW5kKCk7XHJcblx0fTtcclxuXHJcblx0JC5fZ2V0UmVxdWVzdE9zUDExTW9kdWxlcyA9IGZ1bmN0aW9uIChwMTFNb2R1bGVzKSB7XHJcblx0XHRpZiAoIXAxMU1vZHVsZXMgfHwgIXAxMU1vZHVsZXMubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdFx0dmFyIG9zTW9kdWxlcyA9IFtdO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwMTFNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICgkLl9uYXRpdmVJbmZvLm9zID09PSAnV2luZG93cycpIHtcclxuXHRcdFx0XHRvc01vZHVsZXMucHVzaChwMTFNb2R1bGVzW2ldLndpbik7XHJcblx0XHRcdH0gZWxzZSBpZiAoJC5fbmF0aXZlSW5mby5vcyA9PT0gJ0xpbnV4Jykge1xyXG5cdFx0XHRcdG9zTW9kdWxlcy5wdXNoKHAxMU1vZHVsZXNbaV0ubGludXgpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCQuX25hdGl2ZUluZm8ub3MgPT09ICdEYXJ3aW4nKSB7XHJcblx0XHRcdFx0b3NNb2R1bGVzLnB1c2gocDExTW9kdWxlc1tpXS5tYWMpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gb3NNb2R1bGVzO1xyXG5cdH07XHJcblxyXG5cdCQuX2hhbmRsZVAxMU1vZHVsZXNBcmdzID0gZnVuY3Rpb24gKGFyZ3MsIHJlcXVlc3QpIHtcclxuXHRcdHZhciBwMTFNb2R1bGVzID0gbnVsbDtcclxuXHRcdHZhciB0b2tlblNlcmlhbE51bWJlciA9IG51bGw7XHJcblxyXG5cdFx0aWYgKGFyZ3MudG9rZW4gJiYgdHlwZW9mIGFyZ3MudG9rZW4gPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdHAxMU1vZHVsZXMgPSBbIGFyZ3MudG9rZW4ucGtjczExTW9kdWxlIF07XHJcblx0XHRcdHRva2VuU2VyaWFsTnVtYmVyID0gYXJncy50b2tlbi5zZXJpYWxOdW1iZXI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVxdWVzdC5wa2NzMTFNb2R1bGVzID0gcDExTW9kdWxlcyB8fCByZXF1ZXN0LnBrY3MxMU1vZHVsZXM7XHJcblx0XHRyZXF1ZXN0LnRva2VuU2VyaWFsTnVtYmVyID0gdG9rZW5TZXJpYWxOdW1iZXIgfHwgcmVxdWVzdC50b2tlblNlcmlhbE51bWJlcjtcclxuXHR9O1xyXG5cclxuXHJcbiAgICAvLyBXZWJQS0kgZXJyb3JzXHJcblx0JC5lcnJvckNvZGVzID0ge1xyXG5cdFx0VU5ERUZJTkVEOiAgICAgICAgICAgICAgICAgICAgICAndW5kZWZpbmVkJyxcclxuXHQgICAgSU5URVJOQUw6ICAgICAgICAgICAgICAgICAgICAgICAnaW50ZXJuYWwnLFxyXG5cdCAgICBVU0VSX0NBTkNFTExFRDogICAgICAgICAgICAgICAgICd1c2VyX2NhbmNlbGxlZCcsXHJcblx0ICAgIE9TX05PVF9TVVBQT1JURUQ6ICAgICAgICAgICAgICAgJ29zX25vdF9zdXBwb3J0ZWQnLFxyXG5cdCAgICBBRERPTl9USU1FT1VUOiAgICAgICAgICAgICAgICAgICdhZGRvbl90aW1lb3V0JyxcclxuXHQgICAgQURET05fTk9UX0RFVEVDVEVEOiAgICAgICAgICAgICAnYWRkb25fbm90X2RldGVjdGVkJyxcclxuXHQgICAgQURET05fU0VORF9DT01NQU5EX0ZBSUxVUkU6ICAgICAnYWRkb25fc2VuZF9jb21tYW5kX2ZhaWx1cmUnLFxyXG5cdCAgICBDRVJUSUZJQ0FURV9OT1RfRk9VTkQ6ICAgICAgICAgICdjZXJ0aWZpY2F0ZV9ub3RfZm91bmQnLFxyXG5cdCAgICBDT01NQU5EX1VOS05PV046ICAgICAgICAgICAgICAgICdjb21tYW5kX3Vua25vd24nLFxyXG5cdCAgICBDT01NQU5EX05PVF9TVVBQT1JURUQ6ICAgICAgICAgICdjb21tYW5kX25vdF9zdXBwb3J0ZWQnLFxyXG5cdCAgICBDT01NQU5EX1BBUkFNRVRFUl9OT1RfU0VUOiAgICAgICdjb21tYW5kX3BhcmFtZXRlcl9ub3Rfc2V0JyxcclxuXHQgICAgQ09NTUFORF9JTlZBTElEX1BBUkFNRVRFUjogICAgICAnY29tbWFuZF9pbnZhbGlkX3BhcmFtZXRlcicsXHJcblx0ICAgIENPTU1BTkRfUEFSQU1FVEVSX05PVF9TVVBQT1JURUQ6J2NvbW1hbmRfcGFyYW1ldGVyX25vdF9zdXBwb3J0ZWQnLFxyXG5cdCAgICBOQVRJVkVfQ09OTkVDVF9GQUlMVVJFOiAgICAgICAgICduYXRpdmVfY29ubmVjdF9mYWlsdXJlJyxcclxuXHQgICAgTkFUSVZFX0RJU0NPTk5FQ1RFRDogICAgICAgICAgICAnbmF0aXZlX2Rpc2Nvbm5lY3RlZCcsXHJcblx0ICAgIE5BVElWRV9OT19SRVNQT05TRTogICAgICAgICAgICAgJ25hdGl2ZV9ub19yZXNwb25zZScsXHJcblx0ICAgIFJFU1RfUEtJX0dFVF9QRU5ESU5HX1NJR05BVFVSRTogJ3Jlc3RfcGtpX2dldF9wZW5kaW5nX3NpZ25hdHVyZScsXHJcblx0ICAgIFJFU1RfUEtJX1BPU1RfU0lHTkFUVVJFOiAgICAgICAgJ3Jlc3RfcGtpX3Bvc3Rfc2lnbmF0dXJlJyxcclxuXHQgICAgUkVTVF9QS0lfSU5WQUxJRF9DRVJUSUZJQ0FURTogICAncmVzdF9wa2lfaW52YWxpZF9jZXJ0aWZpY2F0ZScsXHJcblx0ICAgIExJQ0VOU0VfTk9UX1NFVDogICAgICAgICAgICAgICAgJ2xpY2Vuc2Vfbm90X3NldCcsXHJcblx0ICAgIExJQ0VOU0VfSU5WQUxJRDogICAgICAgICAgICAgICAgJ2xpY2Vuc2VfaW52YWxpZCcsXHJcblx0ICAgIExJQ0VOU0VfUkVTVFJJQ1RFRDogICAgICAgICAgICAgJ2xpY2Vuc2VfcmVzdHJpY3RlZCcsXHJcblx0ICAgIExJQ0VOU0VfRVhQSVJFRDogICAgICAgICAgICAgICAgJ2xpY2Vuc2VfZXhwaXJlZCcsXHJcblx0ICAgIExJQ0VOU0VfRE9NQUlOX05PVF9BTExPV0VEOiAgICAgJ2xpY2Vuc2VfZG9tYWluX25vdF9hbGxvd2VkJyxcclxuXHQgICAgVkFMSURBVElPTl9FUlJPUjogICAgICAgICAgICAgICAndmFsaWRhdGlvbl9lcnJvcicsXHJcblx0ICAgIFAxMV9FUlJPUjogICAgICAgICAgICAgICAgICAgICAgJ3AxMV9lcnJvcicsXHJcblx0ICAgIFAxMV9UT0tFTl9OT1RfRk9VTkQ6ICAgICAgICAgICAgJ3AxMV90b2tlbl9ub3RfZm91bmQnLFxyXG5cdCAgICBQMTFfTk9UX1NVUFBPUlRFRDogICAgICAgICAgICAgICdwMTFfbm90X3N1cHBvcnRlZCcsXHJcblx0ICAgIEtFWVNFVF9OT1RfRk9VTkQ6ICAgICAgICAgICAgICAgJ2tleXNldF9ub3RfZm91bmQnLFxyXG5cdCAgICBBTEdPUklUSE1fTk9UX1NVUFBPUlRFRDogICAgICAgICdhbGdvcml0aG1fbm90X3N1cHBvcnRlZCcsXHJcblx0ICAgIFNJR05FRF9QREZfVE9fTUFSSzogICAgICAgICAgICAgJ3NpZ25lZF9wZGZfdG9fbWFyaycsXHJcblx0ICAgIEpTT05fRVJST1I6ICAgICAgICAgICAgICAgICAgICAgJ2pzb25fZXJyb3InLFxyXG5cdCAgICBJT19FUlJPUjogICAgICAgICAgICAgICAgICAgICAgICdpb19lcnJvcicsXHJcblx0ICAgIEtFWUNIQUlOX0VSUk9SOiAgICAgICAgICAgICAgICAgJ2tleWNoYWluX2Vycm9yJyxcclxuXHQgICAgS0VZQ0hBSU5fU0lHTl9FUlJPUjogICAgICAgICAgICAna2V5Y2hhaW5fc2lnbl9lcnJvcicsXHJcblx0ICAgIERFQ09ERV9FUlJPUjogICAgICAgICAgICAgICAgICAgJ2RlY29kZV9lcnJvcicsXHJcblx0ICAgIENTUF9LRVlTRVRfTk9UX0RFRklORUQ6ICAgICAgICAgJ2NzcF9rZXlzZXRfbm90X2RlZmluZWQnLFxyXG5cdCAgICBDU1BfSU5WQUxJRF9BTEdPUklUSE06ICAgICAgICAgICdjc3BfaW52YWxpZF9hbGdvcml0aG0nLFxyXG5cdCAgICBDU1BfSU5WQUxJRF9QUk9WSURFUl9UWVBFOiAgICAgICdjc3BfaW52YWxpZF9wcm92aWRlcl90eXBlJyxcclxuXHQgICAgTU9CSUxFX1RJTUVPVVQ6ICAgICAgICAgICAgICAgICAnbW9iaWxlX3RpbWVvdXQnLFxyXG5cdCAgICBNT0JJTEVfTk9UX0FVVEhPUklaRUQ6ICAgICAgICAgICdtb2JpbGVfbm90X2F1dGhvcml6ZWQnLFxyXG5cdCAgICBNT0JJTEVfU0VORF9NRVNTQUdFOiAgICAgICAgICAgICdtb2JpbGVfc2VuZF9tZXNzYWdlJyxcclxuXHQgICAgQ09NTUFORF9ERUNSWVBUX0VSUk9SOiAgICAgICAgICAnY29tbWFuZF9kZWNyeXB0X2Vycm9yJyxcclxuXHRcdEJMT0NLRURfRE9NQUlOOiAgICAgICAgICAgICAgICAgJ2Jsb2NrZWRfZG9tYWluJyxcclxuXHRcdElOVkFMSURfT1BFUkFUSU9OOiAgICAgICAgICAgICAgJ2ludmFsaWRfb3BlcmF0aW9uJ1xyXG5cdH07XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIFwiUHJpdmF0ZVwiIHN0YXRpYyBmdW5jdGlvbnMgKG5vIHJlZmVyZW5jZSB0byAndGhpcycpIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdCQuX2NvbXBhcmVWZXJzaW9ucyA9IGZ1bmN0aW9uICh2MSwgdjIpIHtcclxuXHJcblx0XHR2YXIgdjFwYXJ0cyA9IHYxLnNwbGl0KCcuJyk7XHJcblx0XHR2YXIgdjJwYXJ0cyA9IHYyLnNwbGl0KCcuJyk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gaXNQb3NpdGl2ZUludGVnZXIoeCkge1xyXG5cdFx0XHRyZXR1cm4gL15cXGQrJC8udGVzdCh4KTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiB2YWxpZGF0ZVBhcnRzKHBhcnRzKSB7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcclxuXHRcdFx0XHRpZiAoIWlzUG9zaXRpdmVJbnRlZ2VyKHBhcnRzW2ldKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXZhbGlkYXRlUGFydHModjFwYXJ0cykgfHwgIXZhbGlkYXRlUGFydHModjJwYXJ0cykpIHtcclxuXHRcdFx0cmV0dXJuIE5hTjtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHYxcGFydHMubGVuZ3RoOyArK2kpIHtcclxuXHJcblx0XHRcdGlmICh2MnBhcnRzLmxlbmd0aCA9PT0gaSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdjFwID0gcGFyc2VJbnQodjFwYXJ0c1tpXSwgMTApO1xyXG5cdFx0XHR2YXIgdjJwID0gcGFyc2VJbnQodjJwYXJ0c1tpXSwgMTApO1xyXG5cclxuXHRcdFx0aWYgKHYxcCA9PT0gdjJwKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHYxcCA+IHYycCkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiAtMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodjFwYXJ0cy5sZW5ndGggIT0gdjJwYXJ0cy5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAwO1xyXG5cdH07XHJcblxyXG5cclxuXHQkLl9sb2cgPSBmdW5jdGlvbiAobWVzc2FnZSwgZGF0YSkge1xyXG5cdFx0aWYgKHdpbmRvdy5jb25zb2xlKSB7XHJcblx0XHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdFx0d2luZG93LmNvbnNvbGUubG9nKG1lc3NhZ2UsIGRhdGEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHdpbmRvdy5jb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIFwiUHJpdmF0ZVwiIGluc3RhbmNlIGZ1bmN0aW9ucyAod2l0aCByZWZlcmVuY2VzIHRvICd0aGlzJykgLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0JC5fY3JlYXRlQ29udGV4dCA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyAkLlByb21pc2UodGhpcy5hbmd1bGFyU2NvcGUsIHRoaXMubmdab25lKTtcclxuXHRcdGlmIChhcmdzICYmIGFyZ3Muc3VjY2Vzcykge1xyXG5cdFx0XHRwcm9taXNlLnN1Y2Nlc3MoYXJncy5zdWNjZXNzKTtcclxuXHRcdH1cclxuXHRcdGlmIChhcmdzICYmIGFyZ3MuZmFpbCkge1xyXG5cdFx0ICAgIHByb21pc2UuZmFpbChhcmdzLmZhaWwpO1xyXG5cdFx0fSBlbHNlIGlmIChhcmdzICYmIGFyZ3MuZXJyb3IpIHtcclxuXHRcdCAgICBwcm9taXNlLmVycm9yKGFyZ3MuZXJyb3IpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdCAgICBwcm9taXNlLmZhaWwodGhpcy5kZWZhdWx0RmFpbENhbGxiYWNrKTtcclxuXHRcdH1cclxuXHRcdHZhciBjb250ZXh0ID0ge1xyXG5cdFx0XHRwcm9taXNlOiBwcm9taXNlLFxyXG5cdFx0XHRsaWNlbnNlOiB0aGlzLmxpY2Vuc2UsXHJcblx0XHRcdHVzZURvbWFpbk5hdGl2ZVBvb2w6IHRoaXMudXNlRG9tYWluTmF0aXZlUG9vbCxcclxuXHRcdFx0aW5zdGFuY2U6ICQuX3N1cHBvcnRlZE1vYmlsZURldGVjdGVkID8gdGhpcyA6IHVuZGVmaW5lZFxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBjb250ZXh0O1xyXG5cdH07XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIFB1YmxpYyBmdW5jdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0JC5pbml0ID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHJcblx0XHRpZiAoIWFyZ3MpIHtcclxuXHRcdFx0YXJncyA9IHt9O1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgYXJncyA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRhcmdzID0ge1xyXG5cdFx0XHRcdHJlYWR5OiBhcmdzXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFyZ3MubGljZW5zZSkge1xyXG5cdFx0XHR0aGlzLmxpY2Vuc2UgPSBhcmdzLmxpY2Vuc2U7XHJcblx0XHR9XHJcblx0XHRpZiAoYXJncy5kZWZhdWx0RXJyb3IpIHtcclxuXHRcdCAgICB0aGlzLmRlZmF1bHRGYWlsQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZXgpIHsgYXJncy5kZWZhdWx0RXJyb3IoZXgubWVzc2FnZSwgZXguZXJyb3IsIGV4Lm9yaWdpbiwgZXguY29kZSk7IH07XHJcblx0XHR9XHJcblx0XHRpZiAoYXJncy5kZWZhdWx0RmFpbCkge1xyXG4gICAgICAgICAgICAvLyBvdmVyd3JpdGUgYW55IGxlZ2FjeSBlcnJvciBjYWxsYmFja1xyXG5cdFx0ICAgIHRoaXMuZGVmYXVsdEZhaWxDYWxsYmFjayA9IGFyZ3MuZGVmYXVsdEZhaWw7XHJcblx0XHR9XHRcdFxyXG5cdFx0aWYgKGFyZ3MuYW5ndWxhclNjb3BlKSB7XHJcblx0XHRcdHRoaXMuYW5ndWxhclNjb3BlID0gYXJncy5hbmd1bGFyU2NvcGU7XHJcblx0XHR9XHJcblx0XHRpZiAoYXJncy5uZ1pvbmUpIHtcclxuXHRcdFx0dGhpcy5uZ1pvbmUgPSBhcmdzLm5nWm9uZTtcclxuXHRcdH1cclxuXHRcdGlmIChhcmdzLmJyYW5kKSB7XHJcblx0XHRcdHRoaXMuYnJhbmQgPSBhcmdzLmJyYW5kO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGFyZ3MucmVzdFBraVVybCkge1xyXG5cdFx0XHR0aGlzLnJlc3RQa2lVcmwgPSBhcmdzLnJlc3RQa2lVcmxbYXJncy5yZXN0UGtpVXJsLmxlbmd0aCAtIDFdID09PSAnLycgPyBhcmdzLnJlc3RQa2lVcmwgOiBhcmdzLnJlc3RQa2lVcmwgKyAnLyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy51c2VEb21haW5OYXRpdmVQb29sID0gYXJncy51c2VEb21haW5OYXRpdmVQb29sID09PSB0cnVlO1xyXG5cclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHZhciBvbkNoZWNrSW5zdGFsbGVkU3VjY2VzcyA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdCAgICBpZiAocmVzdWx0LmlzSW5zdGFsbGVkKSB7XHJcblx0XHRcdFx0aWYgKGFyZ3MucmVhZHkpIHtcclxuXHRcdFx0XHRcdGFyZ3MucmVhZHkoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JC5fbG9nKCdXZWIgUEtJIHJlYWR5IChubyBjYWxsYmFjayByZWdpc3RlcmVkKScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAoYXJncy5ub3RJbnN0YWxsZWQpIHtcclxuXHRcdFx0XHRcdGFyZ3Mubm90SW5zdGFsbGVkKHJlc3VsdC5zdGF0dXMsIHJlc3VsdC5tZXNzYWdlLCByZXN1bHQuYnJvd3NlclNwZWNpZmljU3RhdHVzKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2VsZi5yZWRpcmVjdFRvSW5zdGFsbFBhZ2UoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KHtcclxuXHRcdFx0c3VjY2Vzczogb25DaGVja0luc3RhbGxlZFN1Y2Nlc3MsXHJcblx0XHRcdGZhaWw6IGFyZ3MuZmFpbCxcclxuICAgICAgICAgICAgZXJyb3I6IGFyZ3MuZXJyb3JcclxuXHRcdH0pO1xyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuY2hlY2tJbnN0YWxsZWQoY29udGV4dCwgYXJncy5yZXF1aXJlZEFwaVZlcnNpb24pO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLmdldFZlcnNpb24gPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ2dldFZlcnNpb24nLCBudWxsKTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5saXN0Q2VydGlmaWNhdGVzID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHJcblx0XHRpZiAoIWFyZ3MpIHtcclxuXHRcdFx0YXJncyA9IHt9O1xyXG5cdFx0fSBlbHNlIGlmIChhcmdzLmZpbHRlcikge1xyXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3MuZmlsdGVyICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBhcmdzLmZpbHRlciA9PT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdFx0XHR0aHJvdyAnYXJncy5maWx0ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uIChoaW50OiBpZiB5b3UgdXNlZCBcInBraS5maWx0ZXJzLnh4eCgpXCIsIHRyeSByZW1vdmluZyB0aGUgXCIoKVwiKSc7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRocm93ICdhcmdzLmZpbHRlciBtdXN0IGJlIGEgZnVuY3Rpb24sIHJlY2VpdmVkICcgKyAodHlwZW9mIGFyZ3MuZmlsdGVyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnbGlzdENlcnRpZmljYXRlcycsIG51bGwsIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdFx0cmV0dXJuICQuX3Byb2Nlc3NDZXJ0aWZpY2F0ZXMocmVzdWx0LCBhcmdzLmZpbHRlciwgYXJncy5zZWxlY3RJZCwgYXJncy5zZWxlY3RPcHRpb25Gb3JtYXR0ZXIpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLl9wcm9jZXNzQ2VydGlmaWNhdGUgPSBmdW5jdGlvbiAoY2VydCkge1xyXG5cdFx0Y2VydC52YWxpZGl0eVN0YXJ0ID0gbmV3IERhdGUoY2VydC52YWxpZGl0eVN0YXJ0KTtcclxuXHRcdGNlcnQudmFsaWRpdHlFbmQgPSBuZXcgRGF0ZShjZXJ0LnZhbGlkaXR5RW5kKTtcclxuXHRcdGNlcnQua2V5VXNhZ2UgPSAkLl9wcm9jZXNzS2V5VXNhZ2UoY2VydC5rZXlVc2FnZSk7XHJcblx0XHRjZXJ0LmV4dGVuZGVkS2V5VXNhZ2UgPSAkLl9wcm9jZXNzRXh0ZW5kZWRLZXlVc2FnZShjZXJ0LmV4dGVuZGVkS2V5VXNhZ2UpO1xyXG5cdFx0aWYgKGNlcnQucGtpQnJhemlsICYmIGNlcnQucGtpQnJhemlsLmRhdGVPZkJpcnRoKSB7XHJcblx0XHRcdHZhciBzID0gY2VydC5wa2lCcmF6aWwuZGF0ZU9mQmlydGg7XHJcblx0XHRcdGNlcnQucGtpQnJhemlsLmRhdGVPZkJpcnRoID0gbmV3IERhdGUocGFyc2VJbnQocy5zbGljZSgwLCA0KSwgMTApLCBwYXJzZUludChzLnNsaWNlKDUsIDcpLCAxMCkgLSAxLCBwYXJzZUludChzLnNsaWNlKDgsIDEwKSwgMTApKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQkLl9wcm9jZXNzQ2VydGlmaWNhdGVzID0gZnVuY3Rpb24gKHJlc3VsdCwgZmlsdGVyLCBzZWxlY3RJZCwgc2VsZWN0T3B0aW9uRm9ybWF0dGVyKSB7XHJcblx0XHR2YXIgdG9SZXR1cm4gPSBbXTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBjZXJ0ID0gcmVzdWx0W2ldO1xyXG5cdFx0XHQkLl9wcm9jZXNzQ2VydGlmaWNhdGUoY2VydCk7XHJcblx0XHRcdGlmIChmaWx0ZXIpIHtcclxuXHRcdFx0XHRpZiAoZmlsdGVyKGNlcnQpKSB7XHJcblx0XHRcdFx0XHR0b1JldHVybi5wdXNoKGNlcnQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0b1JldHVybi5wdXNoKGNlcnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dG9SZXR1cm4uc29ydChmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRcdC8vIHNvcnQgdGhlIGNlcnRpZmljYXRlcyBieSBpdHMgc3ViamVjdCBjb21tb24gbmFtZSAoY2FzZSBpbnNlbnNpdGl2ZSlcclxuXHRcdFx0dmFyIGFOYW1lID0gYS5zdWJqZWN0TmFtZTtcclxuXHRcdFx0dmFyIGJOYW1lID0gYi5zdWJqZWN0TmFtZTtcclxuXHJcblx0XHRcdGlmICghYU5hbWUgfHwgIWJOYW1lKSB7XHJcblx0XHRcdFx0cmV0dXJuICFhTmFtZSAmJiBiTmFtZSA/IDEgOiAtMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0YU5hbWUgPSBhTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRiTmFtZSA9IGJOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0XHRpZiAoYU5hbWUgPiBiTmFtZSkge1xyXG5cdFx0XHRcdHJldHVybiAxO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGFOYW1lIDwgYk5hbWUpIHtcclxuXHRcdFx0XHRyZXR1cm4gLTE7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gc2FtZSBjb21tb24gbmFtZSwgc29ydCBieSB0aGUgZXhwaXJhdGlvbiBkYXRlLCB0aGUgbG9uZ2VyIGRhdGUsIHRoZSBmaXJzdFxyXG5cdFx0XHRcdHJldHVybiBhLnZhbGlkaXR5RW5kID4gYi52YWxpZGl0eUVuZCA/IC0xIDogKGEudmFsaWRpdHlFbmQgPCBiLnZhbGlkaXR5RW5kID8gMSA6IDApO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoc2VsZWN0SWQpIHtcclxuXHRcdFx0aWYgKCFzZWxlY3RPcHRpb25Gb3JtYXR0ZXIpIHtcclxuXHRcdFx0XHRzZWxlY3RPcHRpb25Gb3JtYXR0ZXIgPSBmdW5jdGlvbiAoYykge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGMuc3ViamVjdE5hbWUgKyAnIChpc3N1ZWQgYnkgJyArIGMuaXNzdWVyTmFtZSArICcpJztcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RJZCk7XHJcblx0XHRcdHdoaWxlIChzZWxlY3Qub3B0aW9ucy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0c2VsZWN0LnJlbW92ZSgwKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHRvUmV0dXJuLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0dmFyIGMgPSB0b1JldHVybltqXTtcclxuXHRcdFx0XHR2YXIgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcblx0XHRcdFx0b3B0aW9uLnZhbHVlID0gYy50aHVtYnByaW50O1xyXG5cdFx0XHRcdG9wdGlvbi50ZXh0ID0gc2VsZWN0T3B0aW9uRm9ybWF0dGVyKGMpO1xyXG5cdFx0XHRcdHNlbGVjdC5hZGQob3B0aW9uKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRvUmV0dXJuO1xyXG5cdH07XHJcblxyXG5cdCQuX3Byb2Nlc3NLZXlVc2FnZSA9IGZ1bmN0aW9uIChrZXlVc2FnZVZhbHVlKSB7XHJcblx0ICAgIHJldHVybiB7XHJcblx0ICAgICAgICBjcmxTaWduOiAoa2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRLZXlVc2FnZXMuY3JsU2lnbikgIT09IDAsXHJcblx0ICAgICAgICBkYXRhRW5jaXBoZXJtZW50OiAoa2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRLZXlVc2FnZXMuZGF0YUVuY2lwaGVybWVudCkgIT09IDAsXHJcblx0ICAgICAgICBkZWNpcGhlck9ubHk6IChrZXlVc2FnZVZhbHVlICYgJC5fY2VydEtleVVzYWdlcy5kZWNpcGhlck9ubHkpICE9PSAwLFxyXG5cdCAgICAgICAgZGlnaXRhbFNpZ25hdHVyZTogKGtleVVzYWdlVmFsdWUgJiAkLl9jZXJ0S2V5VXNhZ2VzLmRpZ2l0YWxTaWduYXR1cmUpICE9PSAwLFxyXG5cdCAgICAgICAgZW5jaXBoZXJPbmx5OiAoa2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRLZXlVc2FnZXMuZW5jaXBoZXJPbmx5KSAhPT0gMCxcclxuXHQgICAgICAgIGtleUFncmVlbWVudDogKGtleVVzYWdlVmFsdWUgJiAkLl9jZXJ0S2V5VXNhZ2VzLmtleUFncmVlbWVudCkgIT09IDAsXHJcblx0ICAgICAgICBrZXlDZXJ0U2lnbjogKGtleVVzYWdlVmFsdWUgJiAkLl9jZXJ0S2V5VXNhZ2VzLmtleUNlcnRTaWduKSAhPT0gMCxcclxuXHQgICAgICAgIGtleUVuY2lwaGVybWVudDogKGtleVVzYWdlVmFsdWUgJiAkLl9jZXJ0S2V5VXNhZ2VzLmtleUVuY2lwaGVybWVudCkgIT09IDAsXHJcblx0ICAgICAgICBub25SZXB1ZGlhdGlvbjogKGtleVVzYWdlVmFsdWUgJiAkLl9jZXJ0S2V5VXNhZ2VzLm5vblJlcHVkaWF0aW9uKSAhPT0gMFxyXG5cdCAgICB9O1xyXG5cdH07XHJcblxyXG5cdCQuX3Byb2Nlc3NFeHRlbmRlZEtleVVzYWdlID0gZnVuY3Rpb24gKGV4dGVuZGVkS2V5VXNhZ2VWYWx1ZSkge1xyXG5cdFx0aWYgKHR5cGVvZiBleHRlbmRlZEtleVVzYWdlVmFsdWUgIT09ICdudW1iZXInKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Y2xpZW50QXV0aDogKGV4dGVuZGVkS2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRFeHRlbmRlZEtleVVzYWdlcy5jbGllbnRBdXRoKSAhPT0gMCxcclxuXHRcdFx0c2VydmVyQXV0aDogKGV4dGVuZGVkS2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRFeHRlbmRlZEtleVVzYWdlcy5zZXJ2ZXJBdXRoKSAhPT0gMCxcclxuXHRcdFx0Y29kZVNpZ25pbmc6IChleHRlbmRlZEtleVVzYWdlVmFsdWUgJiAkLl9jZXJ0RXh0ZW5kZWRLZXlVc2FnZXMuY29kZVNpZ25pbmcpICE9PSAwLFxyXG5cdFx0XHRlbWFpbFByb3RlY3Rpb246IChleHRlbmRlZEtleVVzYWdlVmFsdWUgJiAkLl9jZXJ0RXh0ZW5kZWRLZXlVc2FnZXMuZW1haWxQcm90ZWN0aW9uKSAhPT0gMCxcclxuXHRcdFx0dGltZVN0YW1waW5nOiAoZXh0ZW5kZWRLZXlVc2FnZVZhbHVlICYgJC5fY2VydEV4dGVuZGVkS2V5VXNhZ2VzLnRpbWVTdGFtcGluZykgIT09IDAsXHJcblx0XHRcdG9jc3BTaWduaW5nOiAoZXh0ZW5kZWRLZXlVc2FnZVZhbHVlICYgJC5fY2VydEV4dGVuZGVkS2V5VXNhZ2VzLm9jc3BTaWduaW5nKSAhPT0gMCxcclxuXHRcdFx0aXBzZWNFbmRTeXN0ZW06IChleHRlbmRlZEtleVVzYWdlVmFsdWUgJiAkLl9jZXJ0RXh0ZW5kZWRLZXlVc2FnZXMuaXBzZWNFbmRTeXN0ZW0pICE9PSAwLFxyXG5cdFx0XHRpcHNlY1R1bm5lbDogKGV4dGVuZGVkS2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRFeHRlbmRlZEtleVVzYWdlcy5pcHNlY1R1bm5lbCkgIT09IDAsXHJcblx0XHRcdGlwc2VjVXNlcjogKGV4dGVuZGVkS2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRFeHRlbmRlZEtleVVzYWdlcy5pcHNlY1VzZXIpICE9PSAwLFxyXG5cdFx0XHRhbnk6IChleHRlbmRlZEtleVVzYWdlVmFsdWUgJiAkLl9jZXJ0RXh0ZW5kZWRLZXlVc2FnZXMuYW55KSAhPT0gMFxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHQkLl9wcm9jZXNzU2lnblJlc3VsdCA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdGlmICghcmVzdWx0IHx8ICFyZXN1bHQuc2lnbmF0dXJlSW5mbykge1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cdFx0aWYgKHJlc3VsdC5zaWduYXR1cmVJbmZvLnNpZ25lckNlcnRpZmljYXRlKSB7XHJcblx0XHRcdCQuX3Byb2Nlc3NDZXJ0aWZpY2F0ZShyZXN1bHQuc2lnbmF0dXJlSW5mby5zaWduZXJDZXJ0aWZpY2F0ZSk7XHJcblx0XHR9XHJcblx0XHRpZiAocmVzdWx0LnNpZ25hdHVyZUluZm8uc2lnbmluZ1RpbWUpIHtcclxuXHRcdFx0cmVzdWx0LnNpZ25hdHVyZUluZm8uc2lnbmluZ1RpbWUgPSBuZXcgRGF0ZShyZXN1bHQuc2lnbmF0dXJlSW5mby5zaWduaW5nVGltZSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH07XHJcblxyXG5cdCQuX3Byb2Nlc3NTaWduZXJNb2RlbCA9IGZ1bmN0aW9uIChzaWduZXIpIHtcclxuXHRcdGlmICghc2lnbmVyKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmIChzaWduZXIuY2VydGlmaWNhdGUpIHtcclxuXHRcdFx0JC5fcHJvY2Vzc0NlcnRpZmljYXRlKHNpZ25lci5jZXJ0aWZpY2F0ZSk7XHJcblx0XHR9XHJcblx0XHRpZiAoc2lnbmVyLnNpZ25pbmdUaW1lKSB7XHJcblx0XHRcdHNpZ25lci5zaWduaW5nVGltZSA9IG5ldyBEYXRlKHNpZ25lci5zaWduaW5nVGltZSk7XHJcblx0XHR9XHJcblx0XHRpZiAoc2lnbmVyLmNlcnRpZmllZERhdGVSZWZlcmVuY2UpIHtcclxuXHRcdFx0c2lnbmVyLmNlcnRpZmllZERhdGVSZWZlcmVuY2UgPSBuZXcgRGF0ZShzaWduZXIuY2VydGlmaWVkRGF0ZVJlZmVyZW5jZSk7XHJcblx0XHR9XHJcblx0XHRpZiAoc2lnbmVyLnRpbWVzdGFtcHMgJiYgc2lnbmVyLnRpbWVzdGFtcHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNpZ25lci50aW1lc3RhbXBzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHRzdCA9IHNpZ25lci50aW1lc3RhbXBzW2ldO1xyXG5cdFx0XHRcdCQuX3Byb2Nlc3NPcGVuUmVzdWx0KHRzdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQkLl9wcm9jZXNzT3BlblJlc3VsdCA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdGlmICghcmVzdWx0IHx8ICFyZXN1bHQuc2lnbmVycyB8fCByZXN1bHQuc2lnbmVycy5sZW5ndGggPD0gMCkge1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cdFx0Ly8gY2FzZSBpcyBhIENhZGVzVGltZXN0YW1wTW9kZWxcclxuXHRcdGlmIChyZXN1bHQuZ2VuVGltZSkge1xyXG5cdFx0XHRyZXN1bHQuZ2VuVGltZSA9IG5ldyBEYXRlKHJlc3VsdC5nZW5UaW1lKTtcclxuXHRcdH1cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0LnNpZ25lcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIHNpZ25lciA9IHJlc3VsdC5zaWduZXJzW2ldO1xyXG5cdFx0XHQkLl9wcm9jZXNzU2lnbmVyTW9kZWwoc2lnbmVyKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fTtcclxuXHJcblx0JC5maWx0ZXJzID0ge1xyXG5cdFx0aXNQa2lCcmF6aWxQZXNzb2FGaXNpY2E6IGZ1bmN0aW9uIChjZXJ0KSB7XHJcblx0XHRcdGlmICh0eXBlb2YgY2VydCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdHRocm93ICdmaWx0ZXIgY2FsbGVkIHdpdGhvdXQgY2VydCBhcmd1bWVudCAoaGludDogaWYgeW91IGFyZSB1c2luZyBcInBraS5maWx0ZXJzLmlzUGtpQnJhemlsUGVzc29hRmlzaWNhKClcIiwgdHJ5IFwicGtpLmZpbHRlcnMuaXNQa2lCcmF6aWxQZXNzb2FGaXNpY2FcIiknO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiAoY2VydC5wa2lCcmF6aWwgJiYgKGNlcnQucGtpQnJhemlsLmNwZiB8fCAnJykgIT09ICcnICYmIChjZXJ0LnBraUJyYXppbC5jbnBqIHx8ICcnKSA9PT0gJycpO1xyXG5cdFx0fSxcclxuXHRcdGhhc1BraUJyYXppbENwZjogZnVuY3Rpb24gKGNlcnQpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBjZXJ0ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0dGhyb3cgJ2ZpbHRlciBjYWxsZWQgd2l0aG91dCBjZXJ0IGFyZ3VtZW50IChoaW50OiBpZiB5b3UgYXJlIHVzaW5nIFwicGtpLmZpbHRlcnMuaGFzUGtpQnJhemlsQ3BmKClcIiwgdHJ5IFwicGtpLmZpbHRlcnMuaGFzUGtpQnJhemlsQ3BmXCIpJztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gKGNlcnQucGtpQnJhemlsICYmIChjZXJ0LnBraUJyYXppbC5jcGYgfHwgJycpICE9PSAnJyk7XHJcblx0XHR9LFxyXG5cdFx0aGFzUGtpQnJhemlsQ25wajogZnVuY3Rpb24gKGNlcnQpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBjZXJ0ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0dGhyb3cgJ2ZpbHRlciBjYWxsZWQgd2l0aG91dCBjZXJ0IGFyZ3VtZW50IChoaW50OiBpZiB5b3UgYXJlIHVzaW5nIFwicGtpLmZpbHRlcnMuaGFzUGtpQnJhemlsQ25waigpXCIsIHRyeSBcInBraS5maWx0ZXJzLmhhc1BraUJyYXppbENucGpcIiknO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiAoY2VydC5wa2lCcmF6aWwgJiYgKGNlcnQucGtpQnJhemlsLmNucGogfHwgJycpICE9PSAnJyk7XHJcblx0XHR9LFxyXG5cdFx0cGtpQnJhemlsQ3BmRXF1YWxzOiBmdW5jdGlvbiAoY3BmKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgY3BmICE9PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdHRocm93ICdjcGYgbXVzdCBiZSBhIHN0cmluZyAoaGludDogaWYgeW91IGFyZSB1c2luZyBcInBraS5maWx0ZXJzLnBraUJyYXppbENwZkVxdWFsc1wiLCB0cnkgXCJwa2kuZmlsdGVycy5wa2lCcmF6aWxDcGZFcXVhbHMoJyArIFwiJ1wiICsgJ3NvbWVjcGYnICsgXCInXCIgKyAnKVwiKSc7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChjZXJ0KSB7XHJcblx0XHRcdFx0cmV0dXJuIChjZXJ0LnBraUJyYXppbCAmJiBjZXJ0LnBraUJyYXppbC5jcGYgPT09IGNwZik7XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0cGtpQnJhemlsQ25wakVxdWFsczogZnVuY3Rpb24gKGNucGopIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBjbnBqICE9PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdHRocm93ICdjbnBqIG11c3QgYmUgYSBzdHJpbmcgKGhpbnQ6IGlmIHlvdSBhcmUgdXNpbmcgXCJwa2kuZmlsdGVycy5wa2lCcmF6aWxDbnBqRXF1YWxzXCIsIHRyeSBcInBraS5maWx0ZXJzLnBraUJyYXppbENucGpFcXVhbHMoJyArIFwiJ1wiICsgJ3NvbWVjbnBqJyArIFwiJ1wiICsnKVwiKSc7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChjZXJ0KSB7XHJcblx0XHRcdFx0cmV0dXJuIChjZXJ0LnBraUJyYXppbCAmJiBjZXJ0LnBraUJyYXppbC5jbnBqID09PSBjbnBqKTtcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRoYXNQa2lJdGFseUNvZGljZUZpc2NhbGU6IGZ1bmN0aW9uIChjZXJ0KSB7XHJcblx0XHRcdGlmICh0eXBlb2YgY2VydCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdHRocm93ICdmaWx0ZXIgY2FsbGVkIHdpdGhvdXQgY2VydCBhcmd1bWVudCAoaGludDogaWYgeW91IGFyZSB1c2luZyBcInBraS5maWx0ZXJzLmhhc1BraUl0YWx5Q29kaWNlRmlzY2FsZSgpXCIsIHRyeSBcInBraS5maWx0ZXJzLmhhc1BraUl0YWx5Q29kaWNlRmlzY2FsZVwiKSc7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIChjZXJ0LnBraUl0YWx5ICYmIChjZXJ0LnBraUl0YWx5LmNvZGljZUZpc2NhbGUgfHwgJycpICE9PSAnJyk7XHJcblx0XHR9LFxyXG5cdFx0cGtpSXRhbHlDb2RpY2VGaXNjYWxlRXF1YWxzOiBmdW5jdGlvbiAoY2YpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBjZiAhPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHR0aHJvdyAnY2YgbXVzdCBiZSBhIHN0cmluZyAoaGludDogaWYgeW91IGFyZSB1c2luZyBcInBraS5maWx0ZXJzLnBraUl0YWx5Q29kaWNlRmlzY2FsZUVxdWFsc1wiLCB0cnkgXCJwa2kuZmlsdGVycy5wa2lJdGFseUNvZGljZUZpc2NhbGVFcXVhbHMoJyArIFwiJ1wiICsgJ3NvbWVDb2RpY2UnICsgXCInXCIgKyAnKVwiKSc7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChjZXJ0KSB7XHJcblx0XHRcdFx0cmV0dXJuIChjZXJ0LnBraUl0YWx5ICYmIGNlcnQucGtpSXRhbHkuY29kaWNlRmlzY2FsZSA9PT0gY2YpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdGlzV2l0aGluVmFsaWRpdHk6IGZ1bmN0aW9uIChjZXJ0KSB7XHJcblx0XHRcdGlmICh0eXBlb2YgY2VydCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdHRocm93ICdmaWx0ZXIgY2FsbGVkIHdpdGhvdXQgY2VydCBhcmd1bWVudCAoaGludDogaWYgeW91IGFyZSB1c2luZyBcInBraS5maWx0ZXJzLmlzV2l0aGluVmFsaWRpdHkoKVwiLCB0cnkgXCJwa2kuZmlsdGVycy5pc1dpdGhpblZhbGlkaXR5XCIpJztcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgbm93ID0gbmV3IERhdGUoKTtcclxuXHRcdFx0cmV0dXJuIChjZXJ0LnZhbGlkaXR5U3RhcnQgPD0gbm93ICYmIG5vdyA8PSBjZXJ0LnZhbGlkaXR5RW5kKTtcclxuXHRcdH0sXHJcblx0XHRhbGw6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGZpbHRlcnM7XHJcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0ZmlsdGVycyA9IGFyZ3VtZW50c1swXTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRmaWx0ZXJzID0gYXJndW1lbnRzO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoY2VydCkge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmlsdGVycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0dmFyIGZpbHRlciA9IGZpbHRlcnNbaV07XHJcblx0XHRcdFx0XHRpZiAoIWZpbHRlcihjZXJ0KSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdGFueTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgZmlsdGVycztcclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHRmaWx0ZXJzID0gYXJndW1lbnRzWzBdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGZpbHRlcnMgPSBhcmd1bWVudHM7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChjZXJ0KSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHR2YXIgZmlsdGVyID0gZmlsdGVyc1tpXTtcclxuXHRcdFx0XHRcdGlmIChmaWx0ZXIoY2VydCkpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQkLnJlYWRDZXJ0aWZpY2F0ZSA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBhcmdzID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRhcmdzID0ge1xyXG5cdFx0XHRcdHRodW1icHJpbnQ6IGFyZ3NcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAncmVhZENlcnRpZmljYXRlJywgeyBjZXJ0aWZpY2F0ZVRodW1icHJpbnQ6IGFyZ3MudGh1bWJwcmludCB9KTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5wb2xsTmF0aXZlID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdGlmICghYXJncykge1xyXG5cdFx0XHRhcmdzID0ge307XHJcblx0XHR9XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgYXBpVmVyc2lvbiA9IGFyZ3MucmVxdWlyZWRBcGlWZXJzaW9uO1xyXG5cclxuXHRcdGlmICghYXBpVmVyc2lvbikge1xyXG5cdFx0XHRhcGlWZXJzaW9uID0gJC5hcGlWZXJzaW9ucy5sYXRlc3Q7XHJcblx0XHR9XHJcblx0XHRpZiAoISQuX2FwaU1hcC5uYXRpdmVXaW5bYXBpVmVyc2lvbl0pIHtcclxuXHRcdFx0dGhyb3cgJ1Vua25vd24gSlNsaWIgQVBJIHZlcnNpb246ICcgKyBhcGlWZXJzaW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdwb2xsTmF0aXZlJywge1xyXG4gICAgICAgICAgICByZXF1aXJlZE5hdGl2ZVdpblZlcnNpb246ICAgJC5fYXBpTWFwLm5hdGl2ZVdpblthcGlWZXJzaW9uXSxcclxuICAgICAgICAgICAgcmVxdWlyZWROYXRpdmVMaW51eFZlcnNpb246ICQuX2FwaU1hcC5uYXRpdmVMaW51eFthcGlWZXJzaW9uXSxcclxuICAgICAgICAgICAgcmVxdWlyZWROYXRpdmVNYWNWZXJzaW9uOiAgICQuX2FwaU1hcC5uYXRpdmVNYWNbYXBpVmVyc2lvbl1cclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLnNpZ25IYXNoID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0ge1xyXG5cdFx0XHRjZXJ0aWZpY2F0ZVRodW1icHJpbnQ6IGFyZ3MudGh1bWJwcmludCxcclxuXHRcdFx0aGFzaDogYXJncy5oYXNoLFxyXG5cdFx0XHRkaWdlc3RBbGdvcml0aG06IGFyZ3MuZGlnZXN0QWxnb3JpdGhtXHJcblx0XHR9O1xyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ3NpZ25IYXNoJywgcmVxdWVzdCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuc2lnbkRhdGEgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0dmFyIHJlcXVlc3QgPSB7XHJcblx0XHRcdGNlcnRpZmljYXRlVGh1bWJwcmludDogYXJncy50aHVtYnByaW50LFxyXG5cdFx0XHRkYXRhOiBhcmdzLmRhdGEsXHJcblx0XHRcdGRpZ2VzdEFsZ29yaXRobTogYXJncy5kaWdlc3RBbGdvcml0aG1cclxuXHRcdH07XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnc2lnbkRhdGEnLCByZXF1ZXN0KTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5rZXlTaWduSGFzaCA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgcmVxdWVzdCA9IHtcclxuXHRcdFx0cHJpdmF0ZUtleUlkOiBhcmdzLnByaXZhdGVLZXlJZCxcclxuXHRcdFx0aGFzaDogYXJncy5oYXNoLFxyXG5cdFx0XHRkaWdlc3RBbGdvcml0aG06IGFyZ3MuZGlnZXN0QWxnb3JpdGhtLFxyXG5cdFx0XHRwa2NzMTFNb2R1bGVzOiAkLl9nZXRSZXF1ZXN0T3NQMTFNb2R1bGVzKGFyZ3MucGtjczExTW9kdWxlcyksXHJcblx0XHRcdHRva2VuU2VyaWFsTnVtYmVyOiBhcmdzLnRva2VuU2VyaWFsTnVtYmVyXHJcblx0XHR9O1xyXG5cdFx0JC5faGFuZGxlUDExTW9kdWxlc0FyZ3MoYXJncywgcmVxdWVzdCk7XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAna2V5U2lnbkhhc2gnLCByZXF1ZXN0KTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5rZXlTaWduRGF0YSA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgcmVxdWVzdCA9IHtcclxuXHRcdFx0cHJpdmF0ZUtleUlkOiBhcmdzLnByaXZhdGVLZXlJZCxcclxuXHRcdFx0ZGF0YTogYXJncy5kYXRhLFxyXG5cdFx0XHRkaWdlc3RBbGdvcml0aG06IGFyZ3MuZGlnZXN0QWxnb3JpdGhtLFxyXG5cdFx0XHRwa2NzMTFNb2R1bGVzOiAkLl9nZXRSZXF1ZXN0T3NQMTFNb2R1bGVzKGFyZ3MucGtjczExTW9kdWxlcyksXHJcblx0XHRcdHRva2VuU2VyaWFsTnVtYmVyOiBhcmdzLnRva2VuU2VyaWFsTnVtYmVyXHJcblx0XHR9O1xyXG5cdFx0JC5faGFuZGxlUDExTW9kdWxlc0FyZ3MoYXJncywgcmVxdWVzdCk7XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAna2V5U2lnbkRhdGEnLCByZXF1ZXN0KTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5zaWduV2l0aFJlc3RQa2kgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdCAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0ICAgIHZhciByZXF1ZXN0ID0ge1xyXG5cdCAgICAgICAgY2VydGlmaWNhdGVUaHVtYnByaW50OiBhcmdzLnRodW1icHJpbnQsXHJcblx0ICAgICAgICB0b2tlbjogYXJncy50b2tlbixcclxuICAgICAgICAgICAgcmVzdFBraVVybDogdGhpcy5yZXN0UGtpVXJsXHJcblx0ICAgIH07XHJcblx0ICAgICQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdzaWduV2l0aFJlc3RQa2knLCByZXF1ZXN0KTtcclxuXHQgICAgcmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLnNpZ25IYXNoQmF0Y2ggPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0dmFyIHJlcXVlc3QgPSB7XHJcblx0XHRcdGNlcnRpZmljYXRlVGh1bWJwcmludDogYXJncy5jZXJ0aWZpY2F0ZVRodW1icHJpbnQsXHJcblx0XHRcdGRpZ2VzdEFsZ29yaXRobTogYXJncy5kaWdlc3RBbGdvcml0aG0sXHJcblx0XHRcdHVzZVByZWF1dGhvcml6ZWRTaWduYXR1cmVzOiBhcmdzLnVzZVByZWF1dGhvcml6ZWRTaWduYXR1cmVzLFxyXG5cdFx0XHRiYXRjaDogYXJncy5iYXRjaFxyXG5cdFx0fTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdzaWduSGFzaEJhdGNoJywgcmVxdWVzdCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuc2lnbkhhc2hlcyA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgcmVxdWVzdCA9IHtcclxuXHRcdFx0Y2VydGlmaWNhdGVUaHVtYnByaW50OiBhcmdzLmNlcnRpZmljYXRlVGh1bWJwcmludCxcclxuXHRcdFx0aGFzaGVzOiBhcmdzLmhhc2hlc1xyXG5cdFx0fTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdzaWduSGFzaGVzJywgcmVxdWVzdCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQucHJlYXV0aG9yaXplU2lnbmF0dXJlcyA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblxyXG5cdFx0aWYgKCFhcmdzKSB7XHJcblx0XHRcdGFyZ3MgPSB7fTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgcmVxdWVzdCA9IHtcclxuXHRcdFx0Y2VydGlmaWNhdGVUaHVtYnByaW50OiBhcmdzLmNlcnRpZmljYXRlVGh1bWJwcmludCxcclxuXHRcdFx0c2lnbmF0dXJlQ291bnQ6IGFyZ3Muc2lnbmF0dXJlQ291bnRcclxuXHRcdH07XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAncHJlYXV0aG9yaXplU2lnbmF0dXJlcycsIHJlcXVlc3QpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLnNob3dGb2xkZXJCcm93c2VyID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHJcblx0XHRpZiAoIWFyZ3MpIHtcclxuXHRcdFx0YXJncyA9IHt9O1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgYXJncyA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0YXJncyA9IHtcclxuXHRcdFx0XHRtZXNzYWdlOiBhcmdzXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0dmFyIHJlcXVlc3QgPSB7XHJcblx0XHRcdG1lc3NhZ2U6IGFyZ3MubWVzc2FnZVxyXG5cdFx0fTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdzaG93Rm9sZGVyQnJvd3NlcicsIHJlcXVlc3QpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLnNob3dGaWxlQnJvd3NlciA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblxyXG5cdCAgICBpZiAoIWFyZ3MpIHtcclxuXHQgICAgICAgIGFyZ3MgPSB7fTtcclxuXHQgICAgfVxyXG5cclxuXHQgICAgdmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdCAgICB2YXIgcmVxdWVzdCA9IHtcclxuXHQgICAgICAgIG11bHRpc2VsZWN0OiBhcmdzLm11bHRpc2VsZWN0LFxyXG4gICAgICAgICAgICBmaWx0ZXJzOiBhcmdzLmZpbHRlcnMsXHJcbiAgICAgICAgICAgIGRpYWxvZ1RpdGxlOiBhcmdzLmRpYWxvZ1RpdGxlXHJcblx0ICAgIH07XHJcblx0ICAgICQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdzaG93RmlsZUJyb3dzZXInLCByZXF1ZXN0KTtcclxuXHQgICAgcmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLmRvd25sb2FkVG9Gb2xkZXIgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cclxuXHRcdGlmICghYXJncykge1xyXG5cdFx0XHRhcmdzID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHVybCA9IGFyZ3MudXJsIHx8ICcnO1xyXG5cdFx0aWYgKHVybC5pbmRleE9mKCc6Ly8nKSA8IDApIHtcclxuXHRcdFx0dmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdGEuaHJlZiA9IHVybDtcclxuXHRcdFx0dXJsID0gYS5ocmVmO1xyXG5cdFx0fVxyXG5cdFxyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0dmFyIHJlcXVlc3QgPSB7XHJcblx0XHRcdHVybDogdXJsLFxyXG5cdFx0XHRmb2xkZXJJZDogYXJncy5mb2xkZXJJZCxcclxuXHRcdFx0ZmlsZW5hbWU6IGFyZ3MuZmlsZW5hbWVcclxuXHRcdH07XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnZG93bmxvYWRUb0ZvbGRlcicsIHJlcXVlc3QpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLm9wZW5Gb2xkZXIgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cclxuXHRcdGlmICghYXJncykge1xyXG5cdFx0XHRhcmdzID0ge307XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBhcmdzID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRhcmdzID0ge1xyXG5cdFx0XHRcdGZvbGRlcklkOiBhcmdzXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ29wZW5Gb2xkZXInLCBhcmdzLmZvbGRlcklkKTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5vcGVuRmlsZSA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblxyXG5cdCAgICBpZiAoIWFyZ3MpIHtcclxuXHQgICAgICAgIGFyZ3MgPSB7fTtcclxuXHQgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJncyA9PT0gJ3N0cmluZycpIHtcclxuXHQgICAgICAgIGFyZ3MgPSB7XHJcblx0ICAgICAgICAgICAgZmlsZUlkOiBhcmdzXHJcblx0ICAgICAgICB9O1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0ICAgICQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdvcGVuRmlsZScsIGFyZ3MuZmlsZUlkKTtcclxuXHQgICAgcmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLnJlZGlyZWN0VG9JbnN0YWxsUGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAkLl9pbnN0YWxsVXJsICsgKHRoaXMuYnJhbmQgfHwgJycpICsgJz9yZXR1cm5Vcmw9JyArIGVuY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5VUkwpICsgJyZqc2xpYj0nICsgJC5fanNsaWJWZXJzaW9uO1xyXG5cdH07XHJcblxyXG5cdCQudXBkYXRlRXh0ZW5zaW9uID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdGlmICghYXJncykge1xyXG5cdFx0XHRhcmdzID0ge307XHJcblx0XHR9XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAndXBkYXRlRXh0ZW5zaW9uJywgbnVsbCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBXZWIgUEtJIFBybyBmdW5jdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0JC5fY3JlYXRlQ29tbW9uU2lnbmVyUmVxdWVzdCA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuXHRcdGlmICghYXJncy5vdXRwdXQpIHtcclxuXHRcdFx0dGhyb3cgJ0FuIG91dHB1dCBwYXJhbWV0ZXIgbXVzdCBiZSBwYXNzZWQgdG8gc2lnbmVyIG1ldGhvZHMnO1xyXG5cdFx0fVxyXG5cdCAgICByZXR1cm4ge1xyXG5cdCAgICBcdGZpbGVJZDogYXJncy5maWxlSWQsXHJcblx0ICAgIFx0Y29udGVudDogYXJncy5jb250ZW50LFxyXG5cdCAgICAgICAgY2VydGlmaWNhdGVUaHVtYnByaW50OiBhcmdzLmNlcnRpZmljYXRlVGh1bWJwcmludCxcclxuXHQgICAgICAgIG91dHB1dDoge1xyXG5cdCAgICAgICAgICAgIG1vZGU6IGFyZ3Mub3V0cHV0Lm1vZGUsXHJcblx0ICAgICAgICAgICAgZm9sZGVySWQ6IGFyZ3Mub3V0cHV0LmZvbGRlcklkLFxyXG5cdCAgICAgICAgICAgIGRpYWxvZ1RpdGxlOiBhcmdzLm91dHB1dC5kaWFsb2dUaXRsZSxcclxuXHQgICAgICAgICAgICBmaWxlTmFtZVN1ZmZpeDogYXJncy5vdXRwdXQuZmlsZU5hbWVTdWZmaXhcclxuXHQgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRydXN0QXJiaXRyYXRvcnM6IGFyZ3MudHJ1c3RBcmJpdHJhdG9ycyxcclxuXHRcdFx0Y2xlYXJQb2xpY3lUcnVzdEFyYml0cmF0b3JzOiBhcmdzLmNsZWFyUG9saWN5VHJ1c3RBcmJpdHJhdG9ycyxcclxuXHRcdFx0Y2VydGlmaWNhdGVWYWxpZGF0aW9uTGV2ZWw6IGFyZ3MuY2VydGlmaWNhdGVWYWxpZGF0aW9uTGV2ZWwsXHJcblx0XHRcdHRpbWVzdGFtcFJlcXVlc3RlcjogYXJncy50aW1lc3RhbXBSZXF1ZXN0ZXIsXHJcblx0XHRcdHBvbGljeTogYXJncy5wb2xpY3lcclxuXHRcdH07XHJcblx0fTtcclxuXHRcclxuXHQkLnNpZ25QZGYgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdCAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0ICAgIHZhciByZXF1ZXN0ID0gJC5fY3JlYXRlQ29tbW9uU2lnbmVyUmVxdWVzdChhcmdzKTtcclxuICAgICAgICByZXF1ZXN0LnZpc3VhbFJlcHJlc2VudGF0aW9uID0gYXJncy52aXN1YWxSZXByZXNlbnRhdGlvbjtcclxuICAgICAgICByZXF1ZXN0LnBkZk1hcmtzID0gYXJncy5wZGZNYXJrcztcclxuICAgICAgICByZXF1ZXN0LmJ5cGFzc01hcmtzSWZTaWduZWQgPSBhcmdzLmJ5cGFzc01hcmtzSWZTaWduZWQ7XHJcblx0XHRyZXF1ZXN0LnJlYXNvbiA9IGFyZ3MucmVhc29uO1xyXG5cdFx0cmVxdWVzdC5sb2NhdGlvbiA9IGFyZ3MubG9jYXRpb247XHJcblx0XHRyZXF1ZXN0LnNpZ25lck5hbWUgPSBhcmdzLnNpZ25lck5hbWU7XHJcblx0XHRyZXF1ZXN0LmN1c3RvbVNpZ25hdHVyZUZpZWxkTmFtZSA9IGFyZ3MuY3VzdG9tU2lnbmF0dXJlRmllbGROYW1lO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgYXJncy5tZXRhZGF0YSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cmVxdWVzdC5tZXRhZGF0YSA9IHt9O1xyXG5cdFx0XHR2YXIgbWV0YUtleXMgPSBPYmplY3Qua2V5cyhhcmdzLm1ldGFkYXRhKTtcclxuXHRcdFx0Zm9yICh2YXIgaT0wOyBpPG1ldGFLZXlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGN1cktleSA9IG1ldGFLZXlzW2ldO1xyXG5cdFx0XHRcdC8vIGVuc3VyZSBzdHJpbmcgdmFsdWVzIG9ubHlcclxuXHRcdFx0XHRpZiAodHlwZW9mIGFyZ3MubWV0YWRhdGFbY3VyS2V5XSAhPSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0dGhyb3cgJ09ubHkgc3RyaW5nIHZhbHVlcyBhbGxvd2VkIG9uIG1ldGFkYXRhIGRpY3Rpb25hcnkuIEZvdW5kIHR5cGUgJyArIHR5cGVvZiBhcmdzLm1ldGFkYXRhW2N1cktleV0gKyAnOiAnICsgY3VyS2V5ICsgJzonICsgYXJncy5tZXRhZGF0YVtjdXJLZXldO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXF1ZXN0Lm1ldGFkYXRhW2N1cktleV0gPSBhcmdzLm1ldGFkYXRhW2N1cktleV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0ICAgIGlmIChyZXF1ZXN0LnZpc3VhbFJlcHJlc2VudGF0aW9uICYmIHJlcXVlc3QudmlzdWFsUmVwcmVzZW50YXRpb24uaW1hZ2UgJiYgcmVxdWVzdC52aXN1YWxSZXByZXNlbnRhdGlvbi5pbWFnZS5yZXNvdXJjZSAmJiAhcmVxdWVzdC52aXN1YWxSZXByZXNlbnRhdGlvbi5pbWFnZS5yZXNvdXJjZS5jb250ZW50ICYmIHJlcXVlc3QudmlzdWFsUmVwcmVzZW50YXRpb24uaW1hZ2UucmVzb3VyY2UudXJsICYmICEvXihodHRwcz86KT9cXC9cXC8vLmV4ZWMocmVxdWVzdC52aXN1YWxSZXByZXNlbnRhdGlvbi5pbWFnZS5yZXNvdXJjZS51cmwpKSB7XHJcblx0ICAgICAgICAkLl9kb3dubG9hZFJlc291cmNlKHJlcXVlc3QudmlzdWFsUmVwcmVzZW50YXRpb24uaW1hZ2UucmVzb3VyY2UudXJsLCBmdW5jdGlvbiAocmVzb3VyY2UpIHtcclxuXHQgICAgICAgICAgICByZXF1ZXN0LnZpc3VhbFJlcHJlc2VudGF0aW9uLmltYWdlLnJlc291cmNlID0gcmVzb3VyY2U7XHJcblx0ICAgICAgICAgICAgJC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ3NpZ25QZGYnLCByZXF1ZXN0LCAkLl9wcm9jZXNzU2lnblJlc3VsdCk7XHJcblx0ICAgICAgICB9KTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICAgICQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdzaWduUGRmJywgcmVxdWVzdCwgJC5fcHJvY2Vzc1NpZ25SZXN1bHQpO1xyXG5cdCAgICB9XHJcblx0ICAgIHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5zaWduQ2FkZXMgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdCAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0ICAgIHZhciByZXF1ZXN0ID0gJC5fY3JlYXRlQ29tbW9uU2lnbmVyUmVxdWVzdChhcmdzKTtcclxuICAgICAgICByZXF1ZXN0LmNtc1RvQ29zaWduRmlsZUlkID0gYXJncy5jbXNUb0Nvc2lnbkZpbGVJZDtcclxuXHRcdHJlcXVlc3QuY21zVG9Db3NpZ25Db250ZW50ID0gYXJncy5jbXNUb0Nvc2lnbkNvbnRlbnQ7XHJcbiAgICAgICAgcmVxdWVzdC5hdXRvRGV0ZWN0Q29zaWduID0gYXJncy5hdXRvRGV0ZWN0Q29zaWduO1xyXG4gICAgICAgIHJlcXVlc3QuaW5jbHVkZUVuY2Fwc3VsYXRlZENvbnRlbnQgPSBhcmdzLmluY2x1ZGVFbmNhcHN1bGF0ZWRDb250ZW50ID09PSBudWxsIHx8IGFyZ3MuaW5jbHVkZUVuY2Fwc3VsYXRlZENvbnRlbnQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhcmdzLmluY2x1ZGVFbmNhcHN1bGF0ZWRDb250ZW50O1xyXG5cdFx0cmVxdWVzdC5zaWduaW5nRGVzY3JpcHRpb24gPSBhcmdzLnNpZ25pbmdEZXNjcmlwdGlvbjtcclxuXHQgICAgXHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnc2lnbkNhZGVzJywgcmVxdWVzdCwgJC5fcHJvY2Vzc1NpZ25SZXN1bHQpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLnNpZ25GdWxsWG1sID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0gJC5fY3JlYXRlQ29tbW9uU2lnbmVyUmVxdWVzdChhcmdzKTtcclxuXHRcdHJlcXVlc3Quc2lnbmVyVHlwZSA9ICdmdWxsWG1sJztcclxuXHJcblx0XHQkLl9zaWduWG1sQ29tbW9uKGFyZ3MsIHJlcXVlc3QsIGNvbnRleHQpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLnNpZ25YbWxFbGVtZW50ID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0gJC5fY3JlYXRlQ29tbW9uU2lnbmVyUmVxdWVzdChhcmdzKTtcclxuXHRcdHJlcXVlc3Quc2lnbmVyVHlwZSA9ICd4bWxFbGVtZW50JztcclxuXHRcdHJlcXVlc3QudG9TaWduRWxlbWVudElkID0gYXJncy50b1NpZ25FbGVtZW50SWQ7XHJcblx0XHRyZXF1ZXN0LnRvU2lnbkVsZW1lbnRzSWRzID0gYXJncy50b1NpZ25FbGVtZW50c0lkcztcclxuXHRcdHJlcXVlc3QudG9TaWduRWxlbWVudHNYUGF0aCA9IGFyZ3MudG9TaWduRWxlbWVudHNYUGF0aDtcclxuXHRcdHJlcXVlc3QuaWRSZXNvbHV0aW9uVGFibGUgPSBhcmdzLmlkUmVzb2x1dGlvblRhYmxlO1xyXG5cclxuXHRcdCQuX3NpZ25YbWxDb21tb24oYXJncywgcmVxdWVzdCwgY29udGV4dCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuX3NpZ25YbWxDb21tb24gPSBmdW5jdGlvbiAoYXJncywgcmVxdWVzdCwgY29udGV4dCkge1xyXG5cdFx0cmVxdWVzdC5zaWduYXR1cmVFbGVtZW50SWQgPSBhcmdzLnNpZ25hdHVyZUVsZW1lbnRJZDtcclxuXHRcdHJlcXVlc3Quc2lnbmluZ0Rlc2NyaXB0aW9uID0gYXJncy5zaWduaW5nRGVzY3JpcHRpb247XHJcblxyXG5cdFx0aWYgKGFyZ3Muc2lnbmF0dXJlRWxlbWVudExvY2F0aW9uKSB7XHJcblx0XHRcdHJlcXVlc3Quc2lnbmF0dXJlRWxlbWVudExvY2F0aW9uID0ge1xyXG5cdFx0XHRcdHhwYXRoOiBhcmdzLnNpZ25hdHVyZUVsZW1lbnRMb2NhdGlvbi54cGF0aCxcclxuXHRcdFx0XHRpbnNlcnRpb25PcHRpb246IGFyZ3Muc2lnbmF0dXJlRWxlbWVudExvY2F0aW9uLmluc2VydGlvbk9wdGlvblxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdFx0cmVxdWVzdC5uYW1lc3BhY2VzID0gYXJncy5uYW1lc3BhY2VzO1xyXG5cclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdzaWduWG1sJywgcmVxdWVzdCwgJC5fcHJvY2Vzc1NpZ25SZXN1bHQpO1xyXG5cdH07XHJcblxyXG5cdCQuX2NyZWF0ZUNvbW1vbk9wZW5SZXF1ZXN0ID0gZnVuY3Rpb24oYXJncykge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2lnbmF0dXJlRmlsZUlkOiBhcmdzLnNpZ25hdHVyZUZpbGVJZCxcclxuXHQgICAgXHRzaWduYXR1cmVDb250ZW50OiBhcmdzLnNpZ25hdHVyZUNvbnRlbnQsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlOiBhcmdzLnZhbGlkYXRlLFxyXG4gICAgICAgICAgICBkYXRlUmVmZXJlbmNlOiBhcmdzLmRhdGVSZWZlcmVuY2UsXHJcblx0ICAgICAgICB0cnVzdEFyYml0cmF0b3JzOiBhcmdzLnRydXN0QXJiaXRyYXRvcnMsXHJcblx0ICAgICAgICBjbGVhclBvbGljeVRydXN0QXJiaXRyYXRvcnM6IGFyZ3MuY2xlYXJQb2xpY3lUcnVzdEFyYml0cmF0b3JzLFxyXG5cdCAgICAgICAgc3BlY2lmaWNQb2xpY3k6IGFyZ3Muc3BlY2lmaWNQb2xpY3lcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0JC5vcGVuUGFkZXMgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdCAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0ICAgIHZhciByZXF1ZXN0ID0gJC5fY3JlYXRlQ29tbW9uT3BlblJlcXVlc3QoYXJncyk7XHJcblx0ICAgIFx0XHJcblx0ICAgICQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdvcGVuUGFkZXMnLCByZXF1ZXN0LCAkLl9wcm9jZXNzT3BlblJlc3VsdCk7XHJcblx0ICAgIHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5vcGVuQ2FkZXMgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdCAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0ICAgIHZhciByZXF1ZXN0ID0gJC5fY3JlYXRlQ29tbW9uT3BlblJlcXVlc3QoYXJncyk7XHJcbiAgICBcdHJlcXVlc3Qub3JpZ2luYWxGaWxlSWQgPSBhcmdzLm9yaWdpbmFsRmlsZUlkO1xyXG4gICAgXHRyZXF1ZXN0Lm9yaWdpbmFsQ29udGVudCA9IGFyZ3Mub3JpZ2luYWxDb250ZW50O1xyXG4gICAgICAgIHJlcXVlc3QuYWNjZXB0YWJsZVBvbGljaWVzID0gYXJncy5hY2NlcHRhYmxlUG9saWNpZXM7XHJcblx0XHRyZXF1ZXN0LnJldHVybkVuY2Fwc3VsYXRlZENvbnRlbnQgPSBhcmdzLnJldHVybkVuY2Fwc3VsYXRlZENvbnRlbnQ7XHJcblxyXG5cdCAgICAkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnb3BlbkNhZGVzJywgcmVxdWVzdCwgJC5fcHJvY2Vzc09wZW5SZXN1bHQpO1xyXG5cdCAgICByZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQub3BlblhtbFNpZ25hdHVyZSA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgcmVxdWVzdCA9ICQuX2NyZWF0ZUNvbW1vbk9wZW5SZXF1ZXN0KGFyZ3MpO1xyXG5cdFx0cmVxdWVzdC5pZFJlc29sdXRpb25UYWJsZSA9IGFyZ3MuaWRSZXNvbHV0aW9uVGFibGU7XHJcblx0XHRyZXF1ZXN0LmFjY2VwdGFibGVQb2xpY2llcyA9IGFyZ3MuYWNjZXB0YWJsZVBvbGljaWVzO1xyXG5cclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdvcGVuWG1sU2lnbmF0dXJlJywgcmVxdWVzdCwgJC5fcHJvY2Vzc09wZW5SZXN1bHQpO1xyXG5cdCAgICByZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cclxuXHQkLmxpc3RUb2tlbnMgPSBmdW5jdGlvbihhcmdzKSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgcmVxdWVzdCA9IHtcclxuXHRcdFx0cGtjczExTW9kdWxlczogJC5fZ2V0UmVxdWVzdE9zUDExTW9kdWxlcyhhcmdzLnBrY3MxMU1vZHVsZXMpXHJcblx0XHR9O1xyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ2xpc3RUb2tlbnMnLCByZXF1ZXN0KTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5nZW5lcmF0ZVRva2VuUnNhS2V5UGFpciA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0ge1xyXG5cdFx0XHRwa2NzMTFNb2R1bGVzOiAkLl9nZXRSZXF1ZXN0T3NQMTFNb2R1bGVzKGFyZ3MucGtjczExTW9kdWxlcyksXHJcblx0XHRcdHN1YmplY3ROYW1lOiBhcmdzLnN1YmplY3ROYW1lLFxyXG5cdFx0XHR0b2tlblNlcmlhbE51bWJlcjogYXJncy50b2tlblNlcmlhbE51bWJlcixcclxuXHRcdFx0a2V5TGFiZWw6IGFyZ3Mua2V5TGFiZWwsXHJcblx0XHRcdGtleVNpemU6IGFyZ3Mua2V5U2l6ZSxcclxuXHRcdFx0ZW5hYmxlVXNlZFBrY3MxMU1vZHVsZTogYXJncy5lbmFibGVVc2VkUGtjczExTW9kdWxlXHJcblx0XHR9O1xyXG5cdFx0JC5faGFuZGxlUDExTW9kdWxlc0FyZ3MoYXJncywgcmVxdWVzdCk7XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnZ2VuZXJhdGVUb2tlblJzYUtleVBhaXInLCByZXF1ZXN0KTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5nZW5lcmF0ZVNvZnR3YXJlUnNhS2V5UGFpciA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0ge1xyXG5cdFx0XHRzdWJqZWN0TmFtZTogYXJncy5zdWJqZWN0TmFtZSxcclxuXHRcdFx0a2V5U2l6ZTogYXJncy5rZXlTaXplLFxyXG5cdFx0XHRub25FeHBvcnRhYmxlS2V5OiBhcmdzLm5vbkV4cG9ydGFibGVLZXlcclxuXHRcdH07XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnZ2VuZXJhdGVTb2Z0d2FyZVJzYUtleVBhaXInLCByZXF1ZXN0KTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5pbXBvcnRUb2tlbkNlcnRpZmljYXRlID0gZnVuY3Rpb24oYXJncykge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0dmFyIHJlcXVlc3QgPSB7XHJcblx0XHRcdHByaXZhdGVLZXlJZDogYXJncy5wcml2YXRlS2V5SWQsXHJcblx0XHRcdHBrY3MxMU1vZHVsZXM6ICQuX2dldFJlcXVlc3RPc1AxMU1vZHVsZXMoYXJncy5wa2NzMTFNb2R1bGVzKSxcclxuXHRcdFx0dG9rZW5TZXJpYWxOdW1iZXI6IGFyZ3MudG9rZW5TZXJpYWxOdW1iZXIsXHJcblx0XHRcdGNlcnRpZmljYXRlQ29udGVudDogYXJncy5jZXJ0aWZpY2F0ZUNvbnRlbnQsXHJcblx0XHRcdGNlcnRpZmljYXRlTGFiZWw6IGFyZ3MuY2VydGlmaWNhdGVMYWJlbCxcclxuXHRcdFx0ZW5hYmxlVXNlZFBrY3MxMU1vZHVsZTogYXJncy5lbmFibGVVc2VkUGtjczExTW9kdWxlXHJcblx0XHR9O1xyXG5cdFx0JC5faGFuZGxlUDExTW9kdWxlc0FyZ3MoYXJncywgcmVxdWVzdCk7XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnaW1wb3J0VG9rZW5DZXJ0aWZpY2F0ZScsIHJlcXVlc3QpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLmltcG9ydENlcnRpZmljYXRlID0gZnVuY3Rpb24oYXJncykge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0dmFyIHJlcXVlc3QgPSB7XHJcblx0XHRcdHByaXZhdGVLZXlJZDogYXJncy5wcml2YXRlS2V5SWQsXHJcblx0XHRcdGNlcnRpZmljYXRlQ29udGVudDogYXJncy5jZXJ0aWZpY2F0ZUNvbnRlbnQsXHJcblx0XHRcdHBhc3N3b3JkUG9saWNpZXM6IGFyZ3MucGFzc3dvcmRQb2xpY2llcyxcclxuXHRcdFx0cGFzc3dvcmRNaW5MZW5ndGg6IGFyZ3MucGFzc3dvcmRNaW5MZW5ndGgsXHJcblx0XHRcdHNhdmVQa2NzMTI6IGFyZ3Muc2F2ZVBrY3MxMlxyXG5cdFx0fTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdpbXBvcnRDZXJ0aWZpY2F0ZScsIHJlcXVlc3QpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLnNlbmRBdXRoZW50aWNhdGVkUmVxdWVzdCA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuXHQgICAgdmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdCAgICB2YXIgcmVxdWVzdCA9IHtcclxuXHQgICAgICAgIGNlcnRpZmljYXRlVGh1bWJwcmludDogYXJncy5jZXJ0aWZpY2F0ZVRodW1icHJpbnQsXHJcblx0ICAgICAgICBtZXRob2Q6IGFyZ3MubWV0aG9kLFxyXG5cdCAgICAgICAgaGVhZGVyczogYXJncy5oZWFkZXJzLFxyXG5cdCAgICAgICAgYm9keTogYXJncy5ib2R5LFxyXG4gICAgICAgICAgICB1cmw6IGFyZ3MudXJsXHJcblx0ICAgIH07XHJcblx0ICAgICQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdzZW5kQXV0aGVudGljYXRlZFJlcXVlc3QnLCByZXF1ZXN0KTtcclxuXHQgICAgcmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLmdldEdlb2xvY2F0aW9uID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0ge1xyXG5cdFx0XHRjZXJ0aWZpY2F0ZVRodW1icHJpbnQ6IGFyZ3MuY2VydGlmaWNhdGVUaHVtYnByaW50XHJcblx0XHR9O1xyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ2dldEdlb2xvY2F0aW9uJywgcmVxdWVzdCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuZW5jcnlwdCA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHR2YXIgdG9rZW4gPSB0eXBlb2YgYXJncy50b2tlbiA9PT0gJ29iamVjdCcgPyBhcmdzLnRva2VuIDogbnVsbDtcclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0ge1xyXG5cdFx0XHRjZXJ0aWZpY2F0ZVRodW1icHJpbnQ6IGFyZ3MuY2VydGlmaWNhdGVUaHVtYnByaW50LFxyXG5cdFx0XHRwdWJsaWNLZXk6IGFyZ3MucHVibGljS2V5LFxyXG5cdFx0XHRwcml2YXRlS2V5SWQ6IGFyZ3MucHJpdmF0ZUtleUlkLFxyXG5cdFx0XHR0b2tlblNlcmlhbE51bWJlcjogdG9rZW4gPyB0b2tlbi5zZXJpYWxOdW1iZXIgOiBudWxsLFxyXG5cdFx0XHRwa2NzMTFNb2R1bGU6IHRva2VuID8gdG9rZW4ucGtjczExTW9kdWxlIDogbnVsbCxcclxuXHRcdFx0cGFyYW1ldGVyczogYXJncy5wYXJhbWV0ZXJzLFxyXG5cdFx0XHRkYXRhOiBhcmdzLmRhdGFcclxuXHRcdH07XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnZW5jcnlwdCcsIHJlcXVlc3QpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLmRlY3J5cHQgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0dmFyIHRva2VuID0gdHlwZW9mIGFyZ3MudG9rZW4gPT09ICdvYmplY3QnID8gYXJncy50b2tlbiA6IG51bGw7XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgcmVxdWVzdCA9IHtcclxuXHRcdFx0Y2VydGlmaWNhdGVUaHVtYnByaW50OiBhcmdzLmNlcnRpZmljYXRlVGh1bWJwcmludCxcclxuXHRcdFx0cHJpdmF0ZUtleUlkOiBhcmdzLnByaXZhdGVLZXlJZCxcclxuXHRcdFx0dG9rZW5TZXJpYWxOdW1iZXI6IHRva2VuID8gdG9rZW4uc2VyaWFsTnVtYmVyIDogbnVsbCxcclxuXHRcdFx0cGtjczExTW9kdWxlOiB0b2tlbiA/IHRva2VuLnBrY3MxMU1vZHVsZSA6IG51bGwsXHJcblx0XHRcdHBhcmFtZXRlcnM6IGFyZ3MucGFyYW1ldGVycyxcclxuXHRcdFx0ZGF0YTogYXJncy5kYXRhXHJcblx0XHR9O1xyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ2RlY3J5cHQnLCByZXF1ZXN0KTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIEJyb3dzZXIgZGV0ZWN0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNDAwOTM1L2Jyb3dzZXItZGV0ZWN0aW9uLWluLWphdmFzY3JpcHRcclxuXHQvLyB3aXRoIG5ldyBFZGdlICBVQSAnRWRnJyBjaGFuZ2VzXHJcblx0JC5kZXRlY3RlZEJyb3dzZXIgPSAoZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCwgdGVtLFxyXG5cdFx0TSA9IHVhLm1hdGNoKC8ob3BlcmF8Y2hyb21lfHNhZmFyaXxmaXJlZm94fG1zaWV8dHJpZGVudCg/PVxcLykpXFwvP1xccyooXFxkKykvaSkgfHwgW107XHJcblx0XHRpZiAoL3RyaWRlbnQvaS50ZXN0KE1bMV0pKSB7XHJcblx0XHRcdHRlbSA9IC9cXGJydlsgOl0rKFxcZCspL2cuZXhlYyh1YSkgfHwgW107XHJcblx0XHRcdHJldHVybiAnSUUgJyArICh0ZW1bMV0gfHwgJycpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKE1bMV0gPT09ICdDaHJvbWUnKSB7XHJcblx0XHRcdHRlbSA9IHVhLm1hdGNoKC9cXGIoT1BSfEVkZ2V8RWRnKVxcLyhcXGQrKS8pO1xyXG5cdFx0XHRpZiAodGVtICE9PSBudWxsKSByZXR1cm4gdGVtLnNsaWNlKDEpLmpvaW4oJyAnKS5yZXBsYWNlKCdPUFInLCAnT3BlcmEnKTtcclxuXHRcdH1cclxuXHRcdE0gPSBNWzJdID8gW01bMV0sIE1bMl1dIDogW25hdmlnYXRvci5hcHBOYW1lLCBuYXZpZ2F0b3IuYXBwVmVyc2lvbiwgJy0/J107XHJcblx0XHRpZiAoKHRlbSA9IHVhLm1hdGNoKC92ZXJzaW9uXFwvKFxcZCspL2kpKSAhPT0gbnVsbCkgTS5zcGxpY2UoMSwgMSwgdGVtWzFdKTtcclxuXHRcdHJldHVybiBNLmpvaW4oJyAnKTtcclxuXHR9KSgpO1xyXG5cclxuXHQkLl9zdXBwb3J0ZWRNb2JpbGVEZXRlY3RlZCA9IGZhbHNlO1xyXG5cdHZhciBoYXNNdWx0aVRvdWNoUG9pbnRzID0gd2luZG93Lm5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDM7XHJcblx0dmFyIG1vYmlsZU9zID0gJyc7XHJcblx0dmFyIGNsaWVudFN0cmluZ3MgPSBbXHJcblx0XHR7IGdldE5hbWU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdBbmRyb2lkJzsgfSwgcjogL0FuZHJvaWQvIH0sXHJcblx0XHR7IGdldE5hbWU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdpT1MnOyB9LCAgICAgcjogLyhpUGhvbmV8aVBhZHxpUG9kKS8gfSxcclxuXHJcblx0XHQvLyBpUGFkIGlPUyBydW5uaW5nIG9uIERlc2t0b3AgbW9kZVxyXG5cdFx0eyBnZXROYW1lOiBmdW5jdGlvbiAoKSB7IHJldHVybiBoYXNNdWx0aVRvdWNoUG9pbnRzID8gJ2lPUycgOiAnJzsgfSwgcjogLyhNYWMgT1N8TWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvIH1cclxuXHRdO1xyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY2xpZW50U3RyaW5ncy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGNzID0gY2xpZW50U3RyaW5nc1tpXTtcclxuXHRcdGlmIChjcy5yLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpKSB7XHJcblx0XHRcdG1vYmlsZU9zID0gY3MuZ2V0TmFtZSgpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdCQuX3N1cHBvcnRlZE1vYmlsZURldGVjdGVkID0gJC5fbW9iaWxlU3VwcG9ydGVkICYmIG1vYmlsZU9zICE9PSAnJztcclxuXHQkLmlzU3VwcG9ydGVkTW9iaWxlID0gJC5fc3VwcG9ydGVkTW9iaWxlRGV0ZWN0ZWQ7XHJcblxyXG5cclxuXHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIEJyb3dzZXItZGVwZW5kZW50IHNpbmdsZXRvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRpZiAoJC5fcmVxdWVzdEhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdHZhciBleHRlbnNpb25SZXF1aXJlZFZlcnNpb24gPSAnMC4wLjAnO1xyXG5cdFx0dmFyIGV4dGVuc2lvbkZpcnN0VmVyc2lvbldpdGhTZWxmVXBkYXRlID0gbnVsbDtcclxuXHJcblx0XHR2YXIgY2hyb21lTmF0aXZlV2luUmVxdWlyZWRWZXJzaW9uID0gbnVsbDtcclxuXHRcdHZhciBjaHJvbWVOYXRpdmVMaW51eFJlcXVpcmVkVmVyc2lvbiA9IG51bGw7XHJcblx0XHR2YXIgY2hyb21lTmF0aXZlTWFjUmVxdWlyZWRWZXJzaW9uID0gbnVsbDtcclxuXHRcdHZhciBpZUFkZG9uUmVxdWlyZWRWZXJzaW9uID0gbnVsbDtcclxuXHRcdHZhciBtb2JpbGVSZXF1aXJlZFZlcnNpb24gPSBudWxsO1xyXG5cclxuXHRcdHZhciBpc0lFID0gbnVsbDtcclxuXHRcdHZhciBpc0Nocm9tZSA9IG51bGw7XHJcblx0XHR2YXIgaXNGaXJlZm94ID0gbnVsbDtcclxuXHRcdHZhciBpc0VkZ2UgPSBudWxsO1xyXG5cdFx0dmFyIGlzU2FmYXJpID0gbnVsbDtcclxuXHRcdHZhciBpc0FuZHJvaWQgPSBudWxsO1xyXG5cdFx0dmFyIGlzaU9TID0gbnVsbDtcclxuXHJcblx0XHR2YXIgc2V0UmVxdWlyZWRDb21wb25lbnRWZXJzaW9ucyA9IGZ1bmN0aW9uIChhcGlWZXJzaW9uKSB7XHJcblx0XHRcdGlmICghYXBpVmVyc2lvbikge1xyXG5cdFx0XHRcdGFwaVZlcnNpb24gPSAkLmFwaVZlcnNpb25zLnYxXzM7XHJcblxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghJC5fYXBpTWFwLm5hdGl2ZVdpblthcGlWZXJzaW9uXSkge1xyXG5cdFx0XHRcdHRocm93ICdVbmtub3duIEpTbGliIEFQSSB2ZXJzaW9uOiAnICsgYXBpVmVyc2lvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y2hyb21lTmF0aXZlV2luUmVxdWlyZWRWZXJzaW9uICAgPSAkLl9hcGlNYXAubmF0aXZlV2luW2FwaVZlcnNpb25dO1xyXG5cdFx0XHRjaHJvbWVOYXRpdmVMaW51eFJlcXVpcmVkVmVyc2lvbiA9ICQuX2FwaU1hcC5uYXRpdmVMaW51eFthcGlWZXJzaW9uXTtcclxuXHRcdFx0Y2hyb21lTmF0aXZlTWFjUmVxdWlyZWRWZXJzaW9uICAgPSAkLl9hcGlNYXAubmF0aXZlTWFjW2FwaVZlcnNpb25dO1xyXG5cdFx0XHRpZUFkZG9uUmVxdWlyZWRWZXJzaW9uICAgICAgICAgICA9ICQuX2FwaU1hcC5pZUFkZG9uW2FwaVZlcnNpb25dO1xyXG5cdFx0XHRleHRlbnNpb25SZXF1aXJlZFZlcnNpb24gICAgICAgICA9ICQuX2FwaU1hcC5leHRlbnNpb25bYXBpVmVyc2lvbl07XHJcblx0XHRcdG1vYmlsZVJlcXVpcmVkVmVyc2lvbiAgICAgICAgICAgID0gJC5fYXBpTWFwLm1vYmlsZVthcGlWZXJzaW9uXTtcclxuXHRcdFx0aWYgKGlzQ2hyb21lKSB7XHJcblx0XHRcdFx0ZXh0ZW5zaW9uRmlyc3RWZXJzaW9uV2l0aFNlbGZVcGRhdGUgPSAkLl9jaHJvbWVFeHRlbnNpb25GaXJzdFZlcnNpb25XaXRoU2VsZlVwZGF0ZTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBicm93c2VyXHJcblx0XHRpc0lFID0gKCQuZGV0ZWN0ZWRCcm93c2VyLmluZGV4T2YoJ0lFJykgPj0gMCk7XHJcblx0XHRpc0Nocm9tZSA9ICgkLmRldGVjdGVkQnJvd3Nlci5pbmRleE9mKCdDaHJvbWUnKSA+PSAwKTtcclxuXHRcdGlzRmlyZWZveCA9ICgkLmRldGVjdGVkQnJvd3Nlci5pbmRleE9mKCdGaXJlZm94JykgPj0gMCk7XHJcblx0XHRpc0VkZ2UgPSAoJC5kZXRlY3RlZEJyb3dzZXIuaW5kZXhPZignRWRnJykgPj0gMCk7XHJcblx0XHRpc1NhZmFyaSA9ICgkLmRldGVjdGVkQnJvd3Nlci5pbmRleE9mKCdTYWZhcmknKSA+PSAwKTtcclxuXHRcdC8vIG1vYmlsZSBvc1xyXG5cdFx0aXNBbmRyb2lkID0gKCQuX3N1cHBvcnRlZE1vYmlsZURldGVjdGVkICYmIG1vYmlsZU9zID09PSAnQW5kcm9pZCcpO1xyXG5cdFx0aXNpT1MgPSAoJC5fc3VwcG9ydGVkTW9iaWxlRGV0ZWN0ZWQgJiYgbW9iaWxlT3MgPT09ICdpT1MnKTtcclxuXHRcdFxyXG5cdFx0aWYgKCEkLl9zdXBwb3J0ZWRNb2JpbGVEZXRlY3RlZCAmJiAhaXNJRSkge1xyXG5cclxuXHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFdFQiBFWFRFTlNJT04gUkVRVUVTVCBIQU5ETEVSIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG5cdFx0XHQkLl9yZXF1ZXN0SGFuZGxlciA9IG5ldyBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdHZhciByZXF1ZXN0RXZlbnROYW1lID0gJ2NvbS5sYWN1bmFzb2Z0d2FyZS5XZWJQS0kuUmVxdWVzdEV2ZW50JztcclxuXHRcdFx0XHR2YXIgcmVzcG9uc2VFdmVudE5hbWUgPSAnY29tLmxhY3VuYXNvZnR3YXJlLldlYlBLSS5SZXNwb25zZUV2ZW50JztcclxuXHRcdFx0XHR2YXIgcGVuZGluZ1JlcXVlc3RzID0ge307XHJcblxyXG5cdFx0XHRcdGlmIChpc0VkZ2UgJiYgJC5fYnVpbGRDaGFubmVsICE9PSAnc3RhYmxlJykge1xyXG5cdFx0XHRcdFx0cmVxdWVzdEV2ZW50TmFtZSA9ICdjb20ubGFjdW5hc29mdHdhcmUuV2ViUEtJLlJlcXVlc3RFdmVudCc7XHJcblx0XHRcdFx0XHRyZXNwb25zZUV2ZW50TmFtZSA9ICdjb20ubGFjdW5hc29mdHdhcmUuV2ViUEtJLlJlc3BvbnNlRXZlbnQnO1xyXG5cdFx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRcdHZhciBzNCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciBnZW5lcmF0ZUd1aWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dmFyIHJlZ2lzdGVyUHJvbWlzZSA9IGZ1bmN0aW9uIChwcm9taXNlLCByZXNwb25zZVByb2Nlc3Nvcikge1xyXG5cdFx0XHRcdFx0dmFyIHJlcXVlc3RJZCA9IGdlbmVyYXRlR3VpZCgpO1xyXG5cdFx0XHRcdFx0cGVuZGluZ1JlcXVlc3RzW3JlcXVlc3RJZF0gPSB7IHByb21pc2U6IHByb21pc2UsIHJlc3BvbnNlUHJvY2Vzc29yOiByZXNwb25zZVByb2Nlc3NvciB9O1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlcXVlc3RJZDtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgc2VuZENvbW1hbmQgPSBmdW5jdGlvbiAoY29udGV4dCwgY29tbWFuZCwgcmVxdWVzdCwgcmVzcG9uc2VQcm9jZXNzb3IpIHtcclxuXHRcdFx0XHRcdHZhciByZXF1ZXN0SWQgPSByZWdpc3RlclByb21pc2UoY29udGV4dC5wcm9taXNlLCByZXNwb25zZVByb2Nlc3Nvcik7XHJcblx0XHRcdFx0XHR2YXIgbWVzc2FnZSA9IHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdElkOiByZXF1ZXN0SWQsXHJcblx0XHRcdFx0XHRcdGxpY2Vuc2U6IGNvbnRleHQubGljZW5zZSxcclxuXHRcdFx0XHRcdFx0dXNlRG9tYWluTmF0aXZlUG9vbDogY29udGV4dC51c2VEb21haW5OYXRpdmVQb29sLFxyXG5cdFx0XHRcdFx0XHRjb21tYW5kOiBjb21tYW5kLFxyXG5cdFx0XHRcdFx0XHRyZXF1ZXN0OiByZXF1ZXN0XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0aWYgKGlzQ2hyb21lIHx8IGlzRWRnZSkge1xyXG5cdFx0XHRcdFx0XHR2YXIgZXZlbnRDID0gbmV3IEN1c3RvbUV2ZW50KHJlcXVlc3RFdmVudE5hbWUsIHsgJ2RldGFpbCc6IG1lc3NhZ2UgfSk7XHJcblx0XHRcdFx0XHRcdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnRDKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQgICAgd2luZG93LnBvc3RNZXNzYWdlKHtcclxuXHRcdFx0XHRcdCAgICAgICAgcG9ydDogcmVxdWVzdEV2ZW50TmFtZSxcclxuXHRcdFx0XHRcdCAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxyXG5cdFx0XHRcdFx0ICAgIH0sIFwiKlwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgY2hlY2tJbnN0YWxsZWQgPSBmdW5jdGlvbiAoY29udGV4dCwgYXBpVmVyc2lvbikge1xyXG5cdFx0XHRcdFx0c2V0UmVxdWlyZWRDb21wb25lbnRWZXJzaW9ucyhhcGlWZXJzaW9uKTtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBwb2xsRXh0ZW5zaW9uKGNvbnRleHQsIDI1KTsgfSwgMjAwKTsgLy8gMjUgeCAyMDAgbXMgPSA1IHNlY29uZHMgdW50aWwgd2UgZ2l2ZSB1cFxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciBwb2xsRXh0ZW5zaW9uID0gZnVuY3Rpb24gKGNvbnRleHQsIHRyeUNvdW50KSB7XHJcblx0XHRcdFx0XHQkLl9sb2coJ3BvbGxpbmcgZXh0ZW5zaW9uJyk7XHJcblx0XHRcdFx0XHR2YXIgbWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCQuX2Nocm9tZUV4dGVuc2lvbklkKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgkLl9maXJlZm94RXh0ZW5zaW9uSWQucmVwbGFjZSgvW15BLVphLXowLTlfXS9nLCAnXycpKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgkLl9lZGdlRXh0ZW5zaW9uSWQpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCQuX2VkZ2VMZWdhY3lQcm9kdWN0SWQpO1xyXG5cdFx0XHRcdFx0aWYgKG1ldGEgPT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRyeUNvdW50ID4gMSkge1xyXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cG9sbEV4dGVuc2lvbihjb250ZXh0LCB0cnlDb3VudCAtIDEpO1xyXG5cdFx0XHRcdFx0XHRcdH0sIDIwMCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VTdWNjZXNzKHtcclxuXHRcdFx0XHRcdFx0XHRcdGlzSW5zdGFsbGVkOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRcdHN0YXR1czogJC5pbnN0YWxsYXRpb25TdGF0ZXMuTk9UX0lOU1RBTExFRCxcclxuXHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdUaGUgV2ViIFBLSSBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZCcsXHJcblx0XHRcdFx0XHRcdFx0XHRicm93c2VyU3BlY2lmaWNTdGF0dXM6ICQuX2Nocm9tZUluc3RhbGxhdGlvblN0YXRlcy5FWFRFTlNJT05fTk9UX0lOU1RBTExFRFxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNoZWNrRXh0ZW5zaW9uVmVyc2lvbihjb250ZXh0KTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgY2hlY2tFeHRlbnNpb25WZXJzaW9uID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuXHRcdFx0XHRcdCQuX2xvZygnY2hlY2tpbmcgZXh0ZW5zaW9uIHZlcnNpb24nKTtcclxuXHRcdFx0XHRcdHZhciBzdWJQcm9taXNlID0gbmV3ICQuUHJvbWlzZShudWxsKTtcclxuXHRcdFx0XHRcdHN1YlByb21pc2Uuc3VjY2VzcyhmdW5jdGlvbiAodmVyc2lvbikge1xyXG5cdFx0XHRcdFx0XHRpZiAoJC5fY29tcGFyZVZlcnNpb25zKHZlcnNpb24sIGV4dGVuc2lvblJlcXVpcmVkVmVyc2lvbikgPCAwKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGNhblNlbGZVcGRhdGUgPSAoZXh0ZW5zaW9uRmlyc3RWZXJzaW9uV2l0aFNlbGZVcGRhdGUgIT09IG51bGwgJiYgJC5fY29tcGFyZVZlcnNpb25zKHZlcnNpb24sIGV4dGVuc2lvbkZpcnN0VmVyc2lvbldpdGhTZWxmVXBkYXRlKSA+PSAwKTtcclxuXHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZVN1Y2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0aXNJbnN0YWxsZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzOiAkLmluc3RhbGxhdGlvblN0YXRlcy5PVVREQVRFRCxcclxuXHRcdFx0XHRcdFx0XHRcdGJyb3dzZXJTcGVjaWZpY1N0YXR1czogJC5fY2hyb21lSW5zdGFsbGF0aW9uU3RhdGVzLkVYVEVOU0lPTl9PVVREQVRFRCxcclxuXHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdUaGUgV2ViIFBLSSBleHRlbnNpb24gaXMgb3V0ZGF0ZWQgKGluc3RhbGxlZCB2ZXJzaW9uOiAnICsgdmVyc2lvbiArICcsIHJlcXVpcmVkIHZlcnNpb246ICcgKyBleHRlbnNpb25SZXF1aXJlZFZlcnNpb24gKyAnKScsXHJcblx0XHRcdFx0XHRcdFx0XHRjaHJvbWVFeHRlbnNpb25DYW5TZWxmVXBkYXRlOiBjYW5TZWxmVXBkYXRlXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0aW5pdGlhbGl6ZUV4dGVuc2lvbihjb250ZXh0KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRzdWJQcm9taXNlLmZhaWwoZnVuY3Rpb24gKGV4KSB7XHJcblx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlRXJyb3IoZXgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRzZW5kQ29tbWFuZCh7IGxpY2Vuc2U6IGNvbnRleHQubGljZW5zZSwgdXNlRG9tYWluTmF0aXZlUG9vbDogY29udGV4dC51c2VEb21haW5OYXRpdmVQb29sLCBwcm9taXNlOiBzdWJQcm9taXNlfSwgJ2dldEV4dGVuc2lvblZlcnNpb24nLCBudWxsKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgaW5pdGlhbGl6ZUV4dGVuc2lvbiA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XHJcblx0XHRcdFx0XHQkLl9sb2coJ2luaXRpYWxpemluZyBleHRlbnNpb24nKTtcclxuXHRcdFx0XHRcdHZhciBzdWJQcm9taXNlID0gbmV3ICQuUHJvbWlzZShudWxsKTtcclxuXHRcdFx0XHRcdHN1YlByb21pc2Uuc3VjY2VzcyhmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlLmlzUmVhZHkpIHtcclxuXHRcdFx0XHRcdFx0XHQkLl9uYXRpdmVJbmZvID0gcmVzcG9uc2UubmF0aXZlSW5mbztcclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UubmF0aXZlSW5mby5vcyA9PT0gJ1dpbmRvd3MnICYmICQuX2NvbXBhcmVWZXJzaW9ucyhyZXNwb25zZS5uYXRpdmVJbmZvLmluc3RhbGxlZFZlcnNpb24sIGNocm9tZU5hdGl2ZVdpblJlcXVpcmVkVmVyc2lvbikgPCAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZVN1Y2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpc0luc3RhbGxlZDogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXR1czogJC5pbnN0YWxsYXRpb25TdGF0ZXMuT1VUREFURUQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyb3dzZXJTcGVjaWZpY1N0YXR1czogJC5fY2hyb21lSW5zdGFsbGF0aW9uU3RhdGVzLk5BVElWRV9PVVREQVRFRCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ1RoZSBXZWIgUEtJIG5hdGl2ZSBjb21wb25lbnQgaXMgb3V0ZGF0ZWQgKGluc3RhbGxlZCB2ZXJzaW9uOiAnICsgcmVzcG9uc2UubmF0aXZlSW5mby5pbnN0YWxsZWRWZXJzaW9uICsgJywgcmVxdWlyZWQgdmVyc2lvbjogJyArIGNocm9tZU5hdGl2ZVdpblJlcXVpcmVkVmVyc2lvbiArICcpJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0cGxhdGZvcm1JbmZvOiByZXNwb25zZS5wbGF0Zm9ybUluZm8sXHJcblx0XHRcdFx0XHRcdFx0XHRcdG5hdGl2ZUluZm86IHJlc3BvbnNlLm5hdGl2ZUluZm9cclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzcG9uc2UubmF0aXZlSW5mby5vcyA9PT0gJ0xpbnV4JyAmJiAkLl9jb21wYXJlVmVyc2lvbnMocmVzcG9uc2UubmF0aXZlSW5mby5pbnN0YWxsZWRWZXJzaW9uLCBjaHJvbWVOYXRpdmVMaW51eFJlcXVpcmVkVmVyc2lvbikgPCAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZVN1Y2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpc0luc3RhbGxlZDogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXR1czogJC5pbnN0YWxsYXRpb25TdGF0ZXMuT1VUREFURUQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyb3dzZXJTcGVjaWZpY1N0YXR1czogJC5fY2hyb21lSW5zdGFsbGF0aW9uU3RhdGVzLk5BVElWRV9PVVREQVRFRCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ1RoZSBXZWIgUEtJIG5hdGl2ZSBjb21wb25lbnQgaXMgb3V0ZGF0ZWQgKGluc3RhbGxlZCB2ZXJzaW9uOiAnICsgcmVzcG9uc2UubmF0aXZlSW5mby5pbnN0YWxsZWRWZXJzaW9uICsgJywgcmVxdWlyZWQgdmVyc2lvbjogJyArIGNocm9tZU5hdGl2ZUxpbnV4UmVxdWlyZWRWZXJzaW9uICsgJyknLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRwbGF0Zm9ybUluZm86IHJlc3BvbnNlLnBsYXRmb3JtSW5mbyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0bmF0aXZlSW5mbzogcmVzcG9uc2UubmF0aXZlSW5mb1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChyZXNwb25zZS5uYXRpdmVJbmZvLm9zID09PSAnRGFyd2luJyAmJiAkLl9jb21wYXJlVmVyc2lvbnMocmVzcG9uc2UubmF0aXZlSW5mby5pbnN0YWxsZWRWZXJzaW9uLCBjaHJvbWVOYXRpdmVNYWNSZXF1aXJlZFZlcnNpb24pIDwgMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VTdWNjZXNzKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aXNJbnN0YWxsZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGF0dXM6ICQuaW5zdGFsbGF0aW9uU3RhdGVzLk9VVERBVEVELFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRicm93c2VyU3BlY2lmaWNTdGF0dXM6ICQuX2Nocm9tZUluc3RhbGxhdGlvblN0YXRlcy5OQVRJVkVfT1VUREFURUQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdUaGUgV2ViIFBLSSBuYXRpdmUgY29tcG9uZW50IGlzIG91dGRhdGVkIChpbnN0YWxsZWQgdmVyc2lvbjogJyArIHJlc3BvbnNlLm5hdGl2ZUluZm8uaW5zdGFsbGVkVmVyc2lvbiArICcsIHJlcXVpcmVkIHZlcnNpb246ICcgKyBjaHJvbWVOYXRpdmVNYWNSZXF1aXJlZFZlcnNpb24gKyAnKScsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHBsYXRmb3JtSW5mbzogcmVzcG9uc2UucGxhdGZvcm1JbmZvLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRuYXRpdmVJbmZvOiByZXNwb25zZS5uYXRpdmVJbmZvXHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1x0XHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZVN1Y2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpc0luc3RhbGxlZDogdHJ1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZVN1Y2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0aXNJbnN0YWxsZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzOiBjb252ZXJ0SW5zdGFsbGF0aW9uU3RhdHVzKHJlc3BvbnNlLnN0YXR1cyksXHJcblx0XHRcdFx0XHRcdFx0XHRicm93c2VyU3BlY2lmaWNTdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcclxuXHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6IHJlc3BvbnNlLm1lc3NhZ2UsXHJcblx0XHRcdFx0XHRcdFx0XHRwbGF0Zm9ybUluZm86IHJlc3BvbnNlLnBsYXRmb3JtSW5mbyxcclxuXHRcdFx0XHRcdFx0XHRcdG5hdGl2ZUluZm86IHJlc3BvbnNlLm5hdGl2ZUluZm9cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRzdWJQcm9taXNlLmZhaWwoZnVuY3Rpb24gKGV4KSB7XHJcblx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlRXJyb3IoZXgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRzZW5kQ29tbWFuZCh7IGxpY2Vuc2U6IGNvbnRleHQubGljZW5zZSwgdXNlRG9tYWluTmF0aXZlUG9vbDogY29udGV4dC51c2VEb21haW5OYXRpdmVQb29sLCBwcm9taXNlOiBzdWJQcm9taXNlIH0sICdpbml0aWFsaXplJywgbnVsbCk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dmFyIGNvbnZlcnRJbnN0YWxsYXRpb25TdGF0dXMgPSBmdW5jdGlvbiAoYnNzKSB7XHJcblx0XHRcdFx0XHRpZiAoYnNzID09PSAkLl9jaHJvbWVJbnN0YWxsYXRpb25TdGF0ZXMuSU5TVEFMTEVEKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAkLmluc3RhbGxhdGlvblN0YXRlcy5JTlNUQUxMRUQ7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGJzcyA9PT0gJC5fY2hyb21lSW5zdGFsbGF0aW9uU3RhdGVzLkVYVEVOU0lPTl9PVVREQVRFRCB8fCBic3MgPT09ICQuX2Nocm9tZUluc3RhbGxhdGlvblN0YXRlcy5OQVRJVkVfT1VUREFURUQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuICQuaW5zdGFsbGF0aW9uU3RhdGVzLk9VVERBVEVEO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuICQuaW5zdGFsbGF0aW9uU3RhdGVzLk5PVF9JTlNUQUxMRUQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dmFyIG9uUmVzcG9uc2VSZWNlaXZlZCA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdFx0XHRcdHZhciByZXF1ZXN0ID0gcGVuZGluZ1JlcXVlc3RzW3Jlc3VsdC5yZXF1ZXN0SWRdO1xyXG5cdFx0XHRcdFx0ZGVsZXRlIHBlbmRpbmdSZXF1ZXN0c1tyZXN1bHQucmVxdWVzdElkXTtcclxuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xyXG5cdFx0XHRcdFx0XHRpZiAocmVxdWVzdC5yZXNwb25zZVByb2Nlc3Nvcikge1xyXG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5yZXNwb25zZSA9IHJlcXVlc3QucmVzcG9uc2VQcm9jZXNzb3IocmVzdWx0LnJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UuX2ludm9rZVN1Y2Nlc3MocmVzdWx0LnJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5faW52b2tlRXJyb3IocmVzdWx0LmV4Y2VwdGlvbik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dGhpcy5zZW5kQ29tbWFuZCA9IHNlbmRDb21tYW5kO1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tJbnN0YWxsZWQgPSBjaGVja0luc3RhbGxlZDtcclxuXHJcblx0XHRcdFx0aWYgKGlzQ2hyb21lIHx8IGlzRWRnZSkge1xyXG5cdFx0XHRcdCAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHJlc3BvbnNlRXZlbnROYW1lLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0XHQgICAgICAgIG9uUmVzcG9uc2VSZWNlaXZlZChldmVudC5kZXRhaWwpO1xyXG5cdFx0XHRcdCAgICB9KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdCAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5wb3J0ID09PSByZXNwb25zZUV2ZW50TmFtZSkge1xyXG5cdFx0XHRcdCAgICAgICAgICAgIG9uUmVzcG9uc2VSZWNlaXZlZChldmVudC5kYXRhLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdCAgICAgICAgfVxyXG5cdFx0XHRcdCAgICB9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoaXNJRSkge1xyXG5cclxuXHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIElFIFJFUVVFU1QgSEFORExFUiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0XHRcdCQuX3JlcXVlc3RIYW5kbGVyID0gbmV3IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdFx0dmFyIHBlbmRpbmdSZXF1ZXN0cyA9IHt9O1xyXG5cdFx0XHRcdHZhciBjdXJyZW50UG9sbEluZGV4ID0gMDtcclxuXHJcblx0XHRcdFx0dmFyIHM0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dmFyIGdlbmVyYXRlR3VpZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgcmVnaXN0ZXJQcm9taXNlID0gZnVuY3Rpb24gKHByb21pc2UsIHJlc3BvbnNlUHJvY2Vzc29yKSB7XHJcblx0XHRcdFx0XHR2YXIgcmVxdWVzdElkID0gZ2VuZXJhdGVHdWlkKCk7XHJcblx0XHRcdFx0XHRwZW5kaW5nUmVxdWVzdHNbcmVxdWVzdElkXSA9IHtcclxuXHRcdFx0XHRcdFx0cHJvbWlzZTogcHJvbWlzZSxcclxuXHRcdFx0XHRcdFx0cG9sbFN0YXJ0OiBjdXJyZW50UG9sbEluZGV4LFxyXG5cdFx0XHRcdFx0XHRyZXNwb25zZVByb2Nlc3NvcjogcmVzcG9uc2VQcm9jZXNzb3JcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVxdWVzdElkO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciBnZXRBZGRvbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHdpbmRvdy5sYWN1bmFXZWJQS0lFeHRlbnNpb247XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dmFyIHBvbGwgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGdldEFkZG9uKCkpIHtcclxuXHJcblx0XHRcdFx0XHRcdHZhciByZXN1bHRzSnNvbiA9IGdldEFkZG9uKCkuR2V0QXZhaWxhYmxlUmVzdWx0cygpO1xyXG5cdFx0XHRcdFx0XHRpZiAocmVzdWx0c0pzb24gPT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHR0aHJvdyAnQWRkLW9uIG1ldGhvZCBHZXRBdmFpbGFibGVSZXN1bHRzIGZhaWxlZCc7IC8vIFRPRE9cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHJlc3VsdHMgPSBKU09OLnBhcnNlKHJlc3VsdHNKc29uKTtcclxuXHRcdFx0XHRcdFx0dmFyIHJlcXVlc3RJZHNUb1JlbW92ZSA9IFtdO1xyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciByZXF1ZXN0SWQgaW4gcGVuZGluZ1JlcXVlc3RzKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCFwZW5kaW5nUmVxdWVzdHMuaGFzT3duUHJvcGVydHkocmVxdWVzdElkKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHZhciBwZW5kaW5nUmVxdWVzdCA9IHBlbmRpbmdSZXF1ZXN0c1tyZXF1ZXN0SWRdO1xyXG5cdFx0XHRcdFx0XHRcdHZhciByZW1vdmVQZW5kaW5nUmVxdWVzdCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChwZW5kaW5nUmVxdWVzdC5zZW5kRmFpbGVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZW1vdmVQZW5kaW5nUmVxdWVzdCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciByZXN1bHQgPSBudWxsO1xyXG5cdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChyZXN1bHRzW2ldLnJlcXVlc3RJZCA9PSByZXF1ZXN0SWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHRzW2ldO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocmVzdWx0ICE9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChwZW5kaW5nUmVxdWVzdC5yZXNwb25zZVByb2Nlc3Nvcikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnJlc3BvbnNlID0gcGVuZGluZ1JlcXVlc3QucmVzcG9uc2VQcm9jZXNzb3IocmVzdWx0LnJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cGVuZGluZ1JlcXVlc3QucHJvbWlzZS5faW52b2tlU3VjY2VzcyhyZXN1bHQucmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBlbmRpbmdSZXF1ZXN0LnByb21pc2UuX2ludm9rZUVycm9yKHJlc3VsdC5leGNlcHRpb24pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlbW92ZVBlbmRpbmdSZXF1ZXN0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoY3VycmVudFBvbGxJbmRleCA+PSBwZW5kaW5nUmVxdWVzdC5wb2xsU3RhcnQgKyAxMjApIHsgLy8gdGltZW91dDogMTIwIHggNTAwbXMgPSA2MCBzZWNvbmRzXHJcblx0XHRcdFx0XHRcdFx0XHRcdHBlbmRpbmdSZXF1ZXN0LnByb21pc2UuX2ludm9rZUVycm9yKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlOiAnVGhlIG9wZXJhdGlvbiBoYXMgdGltZWQgb3V0JyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZTogJ1RoZSBvcGVyYXRpb24gaGFzIHRpbWVkIG91dCcsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luOiAnaGVscGVyJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb2RlOiAnYWRkb25fdGltZW91dCdcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlbW92ZVBlbmRpbmdSZXF1ZXN0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0aWYgKHJlbW92ZVBlbmRpbmdSZXF1ZXN0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0SWRzVG9SZW1vdmUucHVzaChyZXF1ZXN0SWQpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHJlcXVlc3RJZHNUb1JlbW92ZS5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBwZW5kaW5nUmVxdWVzdHNbcmVxdWVzdElkc1RvUmVtb3ZlW2pdXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Y3VycmVudFBvbGxJbmRleCArPSAxO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHNldFRpbWVvdXQocG9sbCwgNTAwKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgY2hlY2tFeHRlbnNpb24gPSBmdW5jdGlvbiAoY29udGV4dCwgdHJ5Q291bnQpIHtcclxuXHRcdFx0XHRcdCQuX2xvZygnY2hlY2tpbmcgZXh0ZW5zaW9uJyk7XHJcblx0XHRcdFx0XHRpZiAoZ2V0QWRkb24oKSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRpZiAodHJ5Q291bnQgPiAxKSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjaGVja0V4dGVuc2lvbihjb250ZXh0LCB0cnlDb3VudCAtIDEpO1xyXG5cdFx0XHRcdFx0XHRcdH0sIDIwMCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VTdWNjZXNzKHtcclxuXHRcdFx0XHRcdFx0XHRcdGlzSW5zdGFsbGVkOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRcdHN0YXR1czogJC5pbnN0YWxsYXRpb25TdGF0ZXMuTk9UX0lOU1RBTExFRCxcclxuXHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdUaGUgV2ViIFBLSSBhZGQtb24gaXMgbm90IGluc3RhbGxlZCdcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR2YXIgc3ViUHJvbWlzZSA9IG5ldyAkLlByb21pc2UobnVsbCk7XHJcblx0XHRcdFx0XHRzdWJQcm9taXNlLnN1Y2Nlc3MoZnVuY3Rpb24gKHZlcnNpb24pIHtcclxuXHRcdFx0XHRcdFx0JC5fbmF0aXZlSW5mbyA9IHsgb3M6ICdXaW5kb3dzJywgaW5zdGFsbGVkVmVyc2lvbjogdmVyc2lvbiB9O1xyXG5cdFx0XHRcdFx0XHRpZiAoJC5fY29tcGFyZVZlcnNpb25zKHZlcnNpb24sIGllQWRkb25SZXF1aXJlZFZlcnNpb24pIDwgMCkge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlU3VjY2Vzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRpc0luc3RhbGxlZDogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFx0XHRzdGF0dXM6ICQuaW5zdGFsbGF0aW9uU3RhdGVzLk9VVERBVEVELFxyXG5cdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ1RoZSBXZWIgUEtJIGFkZC1vbiBpcyBvdXRkYXRlZCAoaW5zdGFsbGVkIHZlcnNpb246ICcgKyB2ZXJzaW9uICsgJywgbGF0ZXN0IHZlcnNpb246ICcgKyBpZUFkZG9uUmVxdWlyZWRWZXJzaW9uICsgJyknXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VTdWNjZXNzKHtcclxuXHRcdFx0XHRcdFx0XHRcdGlzSW5zdGFsbGVkOiB0cnVlXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0c3ViUHJvbWlzZS5mYWlsKGZ1bmN0aW9uIChleCkge1xyXG5cdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZUVycm9yKGV4KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0c2VuZENvbW1hbmQoeyBsaWNlbnNlOiBjb250ZXh0LmxpY2Vuc2UsIHVzZURvbWFpbk5hdGl2ZVBvb2w6IGNvbnRleHQudXNlRG9tYWluTmF0aXZlUG9vbCwgcHJvbWlzZTogc3ViUHJvbWlzZSB9LCAnZ2V0VmVyc2lvbicsIG51bGwpO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciBzZW5kQ29tbWFuZCA9IGZ1bmN0aW9uIChjb250ZXh0LCBjb21tYW5kLCByZXF1ZXN0LCByZXNwb25zZVByb2Nlc3Nvcikge1xyXG5cdFx0XHRcdFx0aWYgKGdldEFkZG9uKCkpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHJlcXVlc3RJZCA9IHJlZ2lzdGVyUHJvbWlzZShjb250ZXh0LnByb21pc2UsIHJlc3BvbnNlUHJvY2Vzc29yKTtcclxuXHRcdFx0XHRcdFx0dmFyIG1lc3NhZ2UgPSB7XHJcblx0XHRcdFx0XHRcdFx0cmVxdWVzdElkOiByZXF1ZXN0SWQsXHJcblx0XHRcdFx0XHRcdFx0bGljZW5zZTogY29udGV4dC5saWNlbnNlLFxyXG5cdFx0XHRcdFx0XHRcdHVzZURvbWFpbk5hdGl2ZVBvb2w6IGNvbnRleHQudXNlRG9tYWluTmF0aXZlUG9vbCxcclxuXHRcdFx0XHRcdFx0XHRjb21tYW5kOiBjb21tYW5kLFxyXG5cdFx0XHRcdFx0XHRcdHJlcXVlc3Q6IHJlcXVlc3RcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0dmFyIHNlbmRDb21tYW5kRXJyb3I7XHJcblx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSBnZXRBZGRvbigpLlNlbmRDb21tYW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoc3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbmRDb21tYW5kRXJyb3IgPSAnRmFpbGVkIHRvIHNlbmQgY29tbWFuZCB0byBhZGQtb24nO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdFx0XHRcdFx0c2VuZENvbW1hbmRFcnJvciA9ICdFeGNlcHRpb24gd2hlbiBzZW5kaW5nIGNvbW1hbmQgdG8gYWRkLW9uOiAnICsgZXJyO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChzZW5kQ29tbWFuZEVycm9yKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VFcnJvcih7XHJcblx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlOiAnRmFpbGVkIHRvIHNlbmQgY29tbWFuZCB0byBhZGQtb24nLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29tcGxldGU6IHNlbmRDb21tYW5kRXJyb3IsXHJcblx0XHRcdFx0XHRcdFx0XHRvcmlnaW46ICdoZWxwZXInLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29kZTogJ2FkZG9uX3NlbmRfY29tbWFuZF9mYWlsdXJlJ1xyXG5cdFx0XHRcdFx0XHRcdH0sIDIwMCk7XHJcblx0XHRcdFx0XHRcdFx0cGVuZGluZ1JlcXVlc3RzW3JlcXVlc3RJZF0uc2VuZEZhaWxlZCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlRXJyb3Ioe1xyXG5cdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdBZGQtb24gbm90IGRldGVjdGVkJyxcclxuXHRcdFx0XHRcdFx0XHRjb21wbGV0ZTogJ0FkZC1vbiBub3QgZGV0ZWN0ZWQnLFxyXG5cdFx0XHRcdFx0XHRcdG9yaWdpbjogJ2hlbHBlcicsXHJcblx0XHRcdFx0XHRcdFx0Y29kZTogJ2FkZG9uX25vdF9kZXRlY3RlZCdcclxuXHRcdFx0XHRcdFx0fSwgMjAwKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgY2hlY2tJbnN0YWxsZWQgPSBmdW5jdGlvbiAoY29udGV4dCwgYXBpVmVyc2lvbikge1xyXG5cdFx0XHRcdFx0c2V0UmVxdWlyZWRDb21wb25lbnRWZXJzaW9ucyhhcGlWZXJzaW9uKTtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBjaGVja0V4dGVuc2lvbihjb250ZXh0LCAyNSk7IH0sIDIwMCk7IC8vIDI1IHggMjAwIG1zID0gNSBzZWNvbmRzIHVudGlsIHdlIGdpdmUgdXBcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR0aGlzLnNlbmRDb21tYW5kID0gc2VuZENvbW1hbmQ7XHJcblx0XHRcdFx0dGhpcy5jaGVja0luc3RhbGxlZCA9IGNoZWNrSW5zdGFsbGVkO1xyXG5cdFx0XHRcdHBvbGwoKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHQvLyBpcyBtb2JpbGVcclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBNb2JpbGUgUkVRVUVTVCBIQU5ETEVSIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRcdFx0dmFyIGdldEFwcEludGVncmF0aW9uSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gd2luZG93LmxhY3VuYVdlYlBraUFwcEJyaWRnZTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBzdWJNb2JpbGVIYW5kbGVyID0gbnVsbDtcclxuXHRcdFx0dmFyIEF1dGhvcml6ZVdQa2lNb2RhbCA9IG51bGw7XHJcblx0XHRcdHZhciBjcmVhdGluZ01vYmlsZUhhbmRsZXIgPSBmYWxzZTtcclxuXHJcblx0XHRcdCQuX3JlcXVlc3RIYW5kbGVyID0gbmV3IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdFx0dmFyIHNlbmRDb21tYW5kID0gZnVuY3Rpb24gKGNvbnRleHQsIGNvbW1hbmQsIHJlcXVlc3QsIHJlc3BvbnNlUHJvY2Vzc29yKSB7XHJcblx0XHRcdFx0XHRpZiAoc3ViTW9iaWxlSGFuZGxlciA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRjcmVhdGVNb2JpbGVIYW5kbGVyKGNvbnRleHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChzdWJNb2JpbGVIYW5kbGVyICE9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdHN1Yk1vYmlsZUhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgY29tbWFuZCwgcmVxdWVzdCwgcmVzcG9uc2VQcm9jZXNzb3IpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dmFyIHBvbGxTZW5kQ21kSWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdGlmIChzdWJNb2JpbGVIYW5kbGVyICE9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChwb2xsU2VuZENtZElkKTtcclxuXHRcdFx0XHRcdFx0XHRzdWJNb2JpbGVIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsIGNvbW1hbmQsIHJlcXVlc3QsIHJlc3BvbnNlUHJvY2Vzc29yKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sIDQwMCk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dmFyIGNoZWNrSW5zdGFsbGVkID0gZnVuY3Rpb24gKGNvbnRleHQsIGFwaVZlcnNpb24pIHtcclxuXHRcdFx0XHRcdGlmIChzdWJNb2JpbGVIYW5kbGVyID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdGNyZWF0ZU1vYmlsZUhhbmRsZXIoY29udGV4dCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHN1Yk1vYmlsZUhhbmRsZXIgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0c3ViTW9iaWxlSGFuZGxlci5jaGVja0luc3RhbGxlZChjb250ZXh0LCBhcGlWZXJzaW9uKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHZhciBwb2xsQ2hlY2tJbnN0YWxsZWRJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHN1Yk1vYmlsZUhhbmRsZXIgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRjbGVhckludGVydmFsKHBvbGxDaGVja0luc3RhbGxlZElkKTtcclxuXHRcdFx0XHRcdFx0XHRzdWJNb2JpbGVIYW5kbGVyLmNoZWNrSW5zdGFsbGVkKGNvbnRleHQsIGFwaVZlcnNpb24pO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSwgNDAwKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHQvLyBwdWJsaWMgY29tbWFuZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0dGhpcy5zZW5kQ29tbWFuZCA9IHNlbmRDb21tYW5kO1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tJbnN0YWxsZWQgPSBjaGVja0luc3RhbGxlZDtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBjcmVhdGVBcHBJbnRlcmFjdEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ3VzZSBtb2JpbGUgaW4tYXBwIGludGVncmF0aW9uJyk7XHJcblx0XHRcdFx0c3ViTW9iaWxlSGFuZGxlciA9IG5ldyBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIHBlbmRpbmdSZXF1ZXN0cyA9IHt9O1xyXG5cclxuXHRcdFx0XHRcdGdldEFwcEludGVncmF0aW9uSGFuZGxlcigpLnByb2Nlc3NSZXNwb25zZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdSZXNwb25zZSByZWNlaXZlZDogJywgbWVzc2FnZSk7XHJcblx0XHRcdFx0XHRcdHZhciByZXN1bHQgPSBtZXNzYWdlO1xyXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gSlNPTi5wYXJzZShtZXNzYWdlKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBwZW5kaW5nUmVxdWVzdHNbcmVzdWx0LnJlcXVlc3RJZF07XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBwZW5kaW5nUmVxdWVzdHNbcmVzdWx0LnJlcXVlc3RJZF07XHJcblx0XHRcdFx0XHRcdGlmIChyZXF1ZXN0KSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocmVxdWVzdC5yZXNwb25zZVByb2Nlc3Nvcikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucmVzcG9uc2UgPSByZXF1ZXN0LnJlc3BvbnNlUHJvY2Vzc29yKHJlc3VsdC5yZXNwb25zZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UuX2ludm9rZVN1Y2Nlc3MocmVzdWx0LnJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVxdWVzdC5wcm9taXNlLl9pbnZva2VFcnJvcihyZXN1bHQuZXhjZXB0aW9uKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0dmFyIHM0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKTtcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0dmFyIGdlbmVyYXRlR3VpZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHR2YXIgcmVnaXN0ZXJQcm9taXNlID0gZnVuY3Rpb24gKHByb21pc2UsIHJlc3BvbnNlUHJvY2Vzc29yKSB7XHJcblx0XHRcdFx0XHRcdHZhciByZXF1ZXN0SWQgPSBnZW5lcmF0ZUd1aWQoKTtcclxuXHRcdFx0XHRcdFx0cGVuZGluZ1JlcXVlc3RzW3JlcXVlc3RJZF0gPSB7IHByb21pc2U6IHByb21pc2UsIHJlc3BvbnNlUHJvY2Vzc29yOiByZXNwb25zZVByb2Nlc3NvciB9O1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVxdWVzdElkO1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHR2YXIgc2VuZENvbW1hbmQgPSBmdW5jdGlvbiAoY29udGV4dCwgY29tbWFuZCwgcmVxdWVzdCwgcmVzcG9uc2VQcm9jZXNzb3IpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHJlcXVlc3RJZCA9IHJlZ2lzdGVyUHJvbWlzZShjb250ZXh0LnByb21pc2UsIHJlc3BvbnNlUHJvY2Vzc29yKTtcclxuXHRcdFx0XHRcdFx0dmFyIGNtZFJlcXVlc3QgPSB7XHJcblx0XHRcdFx0XHRcdFx0cmVxdWVzdElkOiByZXF1ZXN0SWQsXHJcblx0XHRcdFx0XHRcdFx0bGljZW5zZTogY29udGV4dC5saWNlbnNlLFxyXG5cdFx0XHRcdFx0XHRcdGNvbW1hbmQ6IGNvbW1hbmQsXHJcblx0XHRcdFx0XHRcdFx0cmVxdWVzdDogcmVxdWVzdFxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KGNtZFJlcXVlc3QpO1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnU2VuZGluZyBtZXNzYWdlOiAnICsgbWVzc2FnZSk7XHJcblx0XHRcdFx0XHRcdGdldEFwcEludGVncmF0aW9uSGFuZGxlcigpLnByb2Nlc3NSZXF1ZXN0KG1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHR2YXIgY2hlY2tJbnN0YWxsZWQgPSBmdW5jdGlvbiAoY29udGV4dCwgYXBpVmVyc2lvbikge1xyXG5cdFx0XHRcdFx0XHRzZXRSZXF1aXJlZENvbXBvbmVudFZlcnNpb25zKGFwaVZlcnNpb24pO1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHN1YlByb21pc2UgPSBuZXcgJC5Qcm9taXNlKG51bGwpO1xyXG5cdFx0XHRcdFx0XHRzdWJQcm9taXNlLnN1Y2Nlc3MoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdFx0JC5fbmF0aXZlSW5mbyA9IHsgb3M6IHJlc3BvbnNlLm9zLCBpbnN0YWxsZWRWZXJzaW9uOiByZXNwb25zZS52ZXJzaW9uIH07XHJcblx0XHRcdFx0XHRcdFx0dmFyIHN0YXR1cyA9ICQuaW5zdGFsbGF0aW9uU3RhdGVzLklOU1RBTExFRDtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCQuX2NvbXBhcmVWZXJzaW9ucyhyZXNwb25zZS52ZXJzaW9uLCBtb2JpbGVSZXF1aXJlZFZlcnNpb24pIDwgMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzID0gJC5pbnN0YWxsYXRpb25TdGF0ZXMuT1VUREFURUQ7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlU3VjY2Vzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRuYXRpdmVJbmZvOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG9zOiByZXNwb25zZS5vcyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkVmVyc2lvbjogcmVzcG9uc2UudmVyc2lvblxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdGlzSW5zdGFsbGVkOiBzdGF0dXMgPT09ICQuaW5zdGFsbGF0aW9uU3RhdGVzLklOU1RBTExFRCxcclxuXHRcdFx0XHRcdFx0XHRcdHN0YXR1czogc3RhdHVzXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uIChleCkge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlRXJyb3IoZXgpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdHNlbmRDb21tYW5kKHsgbGljZW5zZTogY29udGV4dC5saWNlbnNlLCB1c2VEb21haW5OYXRpdmVQb29sOiBjb250ZXh0LnVzZURvbWFpbk5hdGl2ZVBvb2wsIHByb21pc2U6IHN1YlByb21pc2UgfSwgJ2dldEluZm8nLCBudWxsKTtcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0Ly8gcHVibGljIGNvbW1hbmRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0dGhpcy5zZW5kQ29tbWFuZCA9IHNlbmRDb21tYW5kO1xyXG5cdFx0XHRcdFx0dGhpcy5jaGVja0luc3RhbGxlZCA9IGNoZWNrSW5zdGFsbGVkO1xyXG5cclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIGNyZWF0ZVNpZ25hbE1vYmlsZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ3VzZSBtb2JpbGUgc2lnbmFsciBpbnRlZ3JhdGlvbicpO1xyXG5cdFx0XHRcdHZhciB3ZWJQa2lNb2RhbCA9IG51bGw7XHJcblxyXG5cdFx0XHRcdHZhciBzaW5nYWxSU2NyaXB0VXJsID0gJ2h0dHBzOi8vY2xvdWQubGFjdW5hc29mdHdhcmUuY29tL3NjcmlwdHMvc2lnbmFsci1jbGllbnQtMS4wLjQubWluLmpzJztcclxuXHRcdFx0XHR2YXIgZm9yZ2VTY3JpcHRVcmwgPSAnaHR0cHM6Ly9jbG91ZC5sYWN1bmFzb2Z0d2FyZS5jb20vanMvZm9yZ2UtY2lwaGVyLm1pbi5qcyc7XHJcblxyXG5cdFx0XHRcdHZhciBzY3JpcHRzSW5qZWN0aW9uTWV0aG9kcyA9IHsgcmVxdWlyZTogJ3JlcXVpcmUnLCB3aW5kb3c6ICd3aW5kb3cnIH07XHJcblx0XHRcdFx0dmFyIHVzZWRJbmplY3Rpb25NZXRob2QgPSBudWxsO1xyXG5cclxuXHRcdFx0XHRpZiAodHlwZW9mIGV4cG9ydHMgIT09ICdvYmplY3QnICYmICh0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gc2lnbmFsUiBzY3JpcHRcclxuXHRcdFx0XHRcdHJlcXVpcmUoW3NpbmdhbFJTY3JpcHRVcmxdLCBmdW5jdGlvbiAocykge1xyXG5cdFx0XHRcdFx0XHQkLl9zaWduYWxSID0gcztcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0Ly8gZm9yZ2Ugc2NyaXB0XHJcblx0XHRcdFx0XHRyZXF1aXJlKFtmb3JnZVNjcmlwdFVybF0sIGZ1bmN0aW9uIChmKSB7XHJcblx0XHRcdFx0XHRcdCQuX2ZvcmdlID0gZjtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0dXNlZEluamVjdGlvbk1ldGhvZCA9IHNjcmlwdHNJbmplY3Rpb25NZXRob2RzLnJlcXVpcmU7XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gc2lnbmFsUiBzY3JpcHRcclxuXHRcdFx0XHRcdHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblx0XHRcdFx0XHRzLnNldEF0dHJpYnV0ZSgnc3JjJywgc2luZ2FsUlNjcmlwdFVybCk7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMpO1xyXG5cclxuXHRcdFx0XHRcdC8vIGZvcmdlIHNjcmlwdFxyXG5cdFx0XHRcdFx0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG5cdFx0XHRcdFx0cy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGZvcmdlU2NyaXB0VXJsKTtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQocyk7XHJcblxyXG5cdFx0XHRcdFx0dXNlZEluamVjdGlvbk1ldGhvZCA9IHNjcmlwdHNJbmplY3Rpb25NZXRob2RzLndpbmRvdztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHN1Yk1vYmlsZUhhbmRsZXIgPSBuZXcgZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHBlbmRpbmdSZXF1ZXN0cyA9IFtdO1xyXG5cdFx0XHRcdFx0XHR2YXIgc2lnbmFsU2VydmVyVXJsID0gJ2h0dHBzOi8vY2xvdWQubGFjdW5hc29mdHdhcmUuY29tLyc7XHJcblx0XHRcdFx0XHRcdHZhciBzaWduYWxBcGlTZXNzaW9uVXJsID0gc2lnbmFsU2VydmVyVXJsICsgJ2FwaS9zZXNzaW9ucy8nO1xyXG5cdFx0XHRcdFx0XHR2YXIgc2lnbmFsU2Vzc2lvblVybCA9IHNpZ25hbFNlcnZlclVybCArICdzZXNzaW9uLyc7XHJcblx0XHRcdFx0XHRcdHZhciBjdXJyZW50U2Vzc2lvbklkID0gbnVsbDtcclxuXHRcdFx0XHRcdFx0dmFyIHNjcmlwdHNMb2FkZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0dmFyIHNlY3JldEtleSA9IG51bGw7XHJcblx0XHRcdFx0XHRcdHZhciBkZXZpY2VDb25uZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0dmFyIHNlbmRDb21tYW5kTWF4QXR0ZW1wcyA9IDM7XHJcblx0XHRcdFx0XHRcdHZhciBtc0RlbGF5QmV0d2VlblJldHJpZXMgPSA1MDAwO1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHM0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGNsZWFyUGFyYW1zID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdHBlbmRpbmdSZXF1ZXN0cyA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRTZXNzaW9uSWQgPSBudWxsO1xyXG5cdFx0XHRcdFx0XHRcdGRldmljZUNvbm5lY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGdlbmVyYXRlR3VpZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgc2VuZE5leHQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gZGVxdWV1ZVxyXG5cdFx0XHRcdFx0XHRcdHBlbmRpbmdSZXF1ZXN0cy5zaGlmdCgpO1xyXG5cdFx0XHRcdFx0XHRcdHNlbmRXb3JrKCk7XHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgc2VuZFdvcmsgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHBlbmRpbmdSZXF1ZXN0cy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVxdWVzdCA9IHBlbmRpbmdSZXF1ZXN0c1swXTtcclxuXHRcdFx0XHRcdFx0XHRcdHJlcXVlc3QudGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVxdWVzdC5zZW5kQXR0ZW1wdCsrO1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIHJlc2VuZGluZyByZXF1ZXN0IChhdHRlbXB0ICcgKyByZXF1ZXN0LnNlbmRBdHRlbXB0ICsgJyk6ICcgKyByZXF1ZXN0LnJlcXVlc3RJZCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aHR0cFBvc3Qoc2lnbmFsQXBpU2Vzc2lvblVybCArIGN1cnJlbnRTZXNzaW9uSWQgKyAnL3JlcXVlc3QnLCByZXF1ZXN0LmRhdGEsXHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIHN1Y2Nlc3NcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoKCFkYXRhIHx8ICFkYXRhLnNlbnRUb0RldmljZSkgJiYgcmVxdWVzdC5zZW5kQXR0ZW1wdCA+PSBzZW5kQ29tbWFuZE1heEF0dGVtcHMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIG9uIGxhc3QgYXR0ZW1wdFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVxdWVzdC5wcm9taXNlLl9pbnZva2VFcnJvcih7IG1lc3NhZ2U6ICdDb3VsZCBub3Qgc2VuZCBtZXNzYWdlIHRvIG1vYmlsZScsIGNvZGU6ICQuZXJyb3JDb2Rlcy5NT0JJTEVfU0VORF9NRVNTQUdFIH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2VuZE5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGVycm9yXHJcblx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIChzdGF0dXMsIGVycikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChyZXF1ZXN0LnNlbmRBdHRlbXB0ID49IHNlbmRDb21tYW5kTWF4QXR0ZW1wcykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gb24gbGFzdCBhdHRlbXB0XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UuX2ludm9rZUVycm9yKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ0Vycm9yIHdoaWxlIHNlbmRpbmcgbWVzc2FnZSB0byBtb2JpbGU6ICcgKyBzdGF0dXMsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlOiB0eXBlb2YgZXJyID09PSAnc3RyaW5nJyA/IGVyciA6IEpTT04uc3RyaW5naWZ5KGVyciksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvZGU6ICQuZXJyb3JDb2Rlcy5NT0JJTEVfU0VORF9NRVNTQUdFXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNlbmROZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocmVxdWVzdC5zZW5kQXR0ZW1wdCA8PSAxKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHNlbmRUaW1lb3V0KHJlcXVlc3QpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBpbnZva2VUaW1lb3V0ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBkZXF1ZXVlIGFuZCByZWplY3RcclxuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UuX2ludm9rZUVycm9yKHtcclxuXHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdUaGUgbW9iaWxlIGlzIG5vdCByZXNwb25kaW5nJyxcclxuXHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlOiAnVGhlIG9wZXJhdGlvbiBoYXMgdGltZWQgb3V0JyxcclxuXHRcdFx0XHRcdFx0XHRcdG9yaWdpbjogJ2pzbGliJyxcclxuXHRcdFx0XHRcdFx0XHRcdGNvZGU6ICQuZXJyb3JDb2Rlcy5NT0JJTEVfVElNRU9VVFxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdC8vIHNlbmQgbmV4dFxyXG5cdFx0XHRcdFx0XHRcdHNlbmROZXh0KCk7XHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgc2VuZFRpbWVvdXQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xyXG5cdFx0XHRcdFx0XHRcdGlmICghY2hlY2tQZW5kaW5nUmVxdWVzdHNRdWV1ZShyZXF1ZXN0LnJlcXVlc3RJZCkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBzdG9wIHJlcXVlc3QgdGltZW91dCAoc2hpZnQpOiAnICsgcmVxdWVzdC5yZXF1ZXN0SWQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmICghcmVxdWVzdC5yZWNlaXB0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAobm93ID4gcmVxdWVzdC50aW1lICsgbXNEZWxheUJldHdlZW5SZXRyaWVzKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChyZXF1ZXN0LnNlbmRBdHRlbXB0IDwgc2VuZENvbW1hbmRNYXhBdHRlbXBzKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gc2VuZCBhZ2FpblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlbmRXb3JrKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGludm9rZVRpbWVvdXQocmVxdWVzdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIHN0b3AgcmVxdWVzdCB0aW1lb3V0IChzaG9ydCB0aW1lb3V0KTogJyArIHJlcXVlc3QucmVxdWVzdElkKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChub3cgPiByZXF1ZXN0LnRpbWUgKyA2MDAwMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aW52b2tlVGltZW91dChyZXF1ZXN0KTtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBzdG9wIHJlcXVlc3QgdGltZW91dCAobG9uZyB0aW1lb3V0KTogJyArIHJlcXVlc3QucmVxdWVzdElkKTtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBzZW5kVGltZW91dChyZXF1ZXN0KTsgfSwgMTAwMCk7XHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgY2hlY2tQZW5kaW5nUmVxdWVzdHNRdWV1ZSA9IGZ1bmN0aW9uIChleHBlY3RlZElkKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBlbmRpbmdSZXF1ZXN0cy5sZW5ndGggIT09IDAgJiYgcGVuZGluZ1JlcXVlc3RzWzBdLnJlcXVlc3RJZCA9PT0gZXhwZWN0ZWRJZDtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBnZXRDdXJyZW50UGVuZGluZ1JlcXVlc3QgPSBmdW5jdGlvbiAoZXhwZWN0ZWRJZCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjaGVja1BlbmRpbmdSZXF1ZXN0c1F1ZXVlKGV4cGVjdGVkSWQpID8gcGVuZGluZ1JlcXVlc3RzWzBdIDogbnVsbDtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBzZXRBY2tub3dsZWRnZVJlY2VpcHQgPSBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcmVxdWVzdCA9IGdldEN1cnJlbnRQZW5kaW5nUmVxdWVzdChpZCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHJlcXVlc3QgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlcXVlc3QucmVjZWlwdCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW1NpZ25hbF0gZ290IHJlY2VpcHQgZm9yIHJlcXVlc3Q6ICcgKyBpZCk7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBkaXNwb3NlZCEgR290IHJlY2VpcHQgZm9yIERJU1BPU0VEIHJlcXVlc3Q6ICcgKyBpZCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHNlbmRDb21tYW5kID0gZnVuY3Rpb24gKGNvbnRleHQsIGNvbW1hbmQsIHJlcXVlc3QsIHJlc3BvbnNlUHJvY2Vzc29yKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChjdXJyZW50U2Vzc2lvbklkID09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRocm93ICdUaGUgY29tcG9uZW50IGlzIG5vdCBpbml0aWFsaXplZC4gTWFrZSBzdXJlIHRoZSBpbml0IG1ldGhvZCB3YXMgY2FsbGVkLic7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgbWVzc2FnZSA9IHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlcXVlc3RJZDogZ2VuZXJhdGVHdWlkKCksXHJcblx0XHRcdFx0XHRcdFx0XHRsaWNlbnNlOiBjb250ZXh0LmxpY2Vuc2UsXHJcblx0XHRcdFx0XHRcdFx0XHR1c2VEb21haW5OYXRpdmVQb29sOiBjb250ZXh0LnVzZURvbWFpbk5hdGl2ZVBvb2wsXHJcblx0XHRcdFx0XHRcdFx0XHRjb21tYW5kOiBjb21tYW5kLFxyXG5cdFx0XHRcdFx0XHRcdFx0cmVxdWVzdDogcmVxdWVzdCxcclxuXHRcdFx0XHRcdFx0XHRcdGRvbWFpbjogd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lXHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGVuY3J5cHRlZCA9IG1lc3NhZ2UgPyBlbmNyeXB0TWVzc2FnZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSwgc2VjcmV0S2V5KSA6IG51bGw7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBkYXRhID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogJ3JlcXVlc3QnLFxyXG5cdFx0XHRcdFx0XHRcdFx0aWQ6IG1lc3NhZ2UucmVxdWVzdElkLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGVudDogZW5jcnlwdGVkXHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0cGVuZGluZ1JlcXVlc3RzLnB1c2goe1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVxdWVzdElkOiBtZXNzYWdlLnJlcXVlc3RJZCxcclxuXHRcdFx0XHRcdFx0XHRcdHByb21pc2U6IGNvbnRleHQucHJvbWlzZSxcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlUHJvY2Vzc29yOiByZXNwb25zZVByb2Nlc3NvcixcclxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRcdFx0XHRyZWNlaXB0OiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRcdHNlbmRBdHRlbXB0OiAwXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChwZW5kaW5nUmVxdWVzdHMubGVuZ3RoIDw9IDEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdC8vIHN0YXJ0IHdvcmtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbmRXb3JrKCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGNoZWNrSW5zdGFsbGVkID0gZnVuY3Rpb24gKGNvbnRleHQsIGFwaVZlcnNpb24pIHtcclxuXHRcdFx0XHRcdFx0XHRjbGVhclBhcmFtcygpO1xyXG5cdFx0XHRcdFx0XHRcdHNldFJlcXVpcmVkQ29tcG9uZW50VmVyc2lvbnMoYXBpVmVyc2lvbik7XHJcblx0XHRcdFx0XHRcdFx0Y2hlY2tTY3JpcHRzKGNvbnRleHQpO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGNoZWNrU2NyaXB0cyA9IGZ1bmN0aW9uIChjb250ZXh0LCB0cnlDb3VudCkge1xyXG5cdFx0XHRcdFx0XHRcdHRyeUNvdW50ID0gdHJ5Q291bnQgfHwgMTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoc2NyaXB0c0xvYWRlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2lnbmFsUlNldHVwKGNvbnRleHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHQvLyAxMCBzZWNvbmRzIHRpbWVvdXRcclxuXHRcdFx0XHRcdFx0XHRpZiAodHJ5Q291bnQgPiA1MCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VFcnJvcih7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdEZXBlbmRlbmN5IHNjcmlwdHMgZGlkIG5vdCBsb2FkJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29tcGxldGU6ICdEZXBlbmRlbmN5IHNjcmlwdHMgZGlkIG5vdCBsb2FkJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29kZTogJC5lcnJvckNvZGVzLlVOREVGSU5FRFxyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBjaGVja1NjcmlwdHMoY29udGV4dCwgdHJ5Q291bnQgKyAxKTsgfSwgMjAwKTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBzaWduYWxSU2V0dXAgPSBmdW5jdGlvbiAoY29udGV4dCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgY29ubmVjdGlvbklkID0gbnVsbDtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIHNpZ25hbFN0b3AgPSBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG5cdFx0XHRcdFx0XHRcdFx0d2ViUGtpTW9kYWwuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5zdG9wKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoIChleCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW1NpZ25hbF0gZXJyb3Igd2hpbGUgc3RvcHBpbmcgc2lnbmFsUicsIGV4KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgY29ubmVjdFRpbWVvdXQgPSBmdW5jdGlvbiAoY29ubmVjdGlvbiwgY291bnQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvdW50ID0gY291bnQgfHwgMTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChkZXZpY2VDb25uZWN0ZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSB3YWl0aW5nIGRldmljZSBjb25uZWN0aW9uJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgdGltZW91dENvdW50ID0gNzsgLy8gMTQgc2Vjb25kc1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGlzaU9TKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIDEwIHNlY29uZHMgKGlPUyBzdG9wcyB0aGUgamF2YXNjcmlwdCB3aGVuIGNoYW5nZXMgYXBwIGNvbnRleHQpXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRpbWVvdXRDb3VudCA9IDU7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvdW50ID4gdGltZW91dENvdW50KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHNpZ25hbFN0b3AoY29ubmVjdGlvbik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnRleHQuaW5zdGFuY2UucmVkaXJlY3RUb0luc3RhbGxQYWdlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25uZWN0VGltZW91dChjb25uZWN0aW9uLCBjb3VudCArIDEpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSwgMjAwMCk7XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0c3RhcnRTaWduYWxDb25uZWN0aW9uKHNpZ25hbFNlc3Npb25VcmwsIGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLm9uKCdjb25uZWN0ZWQnLCBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRkZXZpY2VDb25uZWN0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR3ZWJQa2lNb2RhbC5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBkZXZpY2UgY29ubmVjdGVkJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBzdWJQcm9taXNlID0gbmV3ICQuUHJvbWlzZShudWxsKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c3ViUHJvbWlzZS5zdWNjZXNzKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgc3RhdHVzID0gJC5pbnN0YWxsYXRpb25TdGF0ZXMuSU5TVEFMTEVEO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICgkLl9jb21wYXJlVmVyc2lvbnMocmVzcG9uc2UudmVyc2lvbiwgbW9iaWxlUmVxdWlyZWRWZXJzaW9uKSA8IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0YXR1cyA9ICQuaW5zdGFsbGF0aW9uU3RhdGVzLk9VVERBVEVEO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZVN1Y2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bmF0aXZlSW5mbzoge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvczogcmVzcG9uc2Uub3MsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGluc3RhbGxlZFZlcnNpb246IHJlc3BvbnNlLnZlcnNpb25cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpc0luc3RhbGxlZDogc3RhdHVzID09PSAkLmluc3RhbGxhdGlvblN0YXRlcy5JTlNUQUxMRUQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdGF0dXM6IHN0YXR1c1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoZXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VFcnJvcihleGNlcHRpb24pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIHNlbmRpbmcgZmlyc3QgY29tbWFuZCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzZW5kQ29tbWFuZCh7IGxpY2Vuc2U6IGNvbnRleHQubGljZW5zZSwgdXNlRG9tYWluTmF0aXZlUG9vbDogY29udGV4dC51c2VEb21haW5OYXRpdmVQb29sLCBwcm9taXNlOiBzdWJQcm9taXNlIH0sICdnZXRJbmZvJywgbnVsbCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaGF2ZSBhdmFpbGFibGUgcmVzcG9uc2VcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIGF2YWlsYWJsZSByZXNwb25zZScpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRodHRwR2V0KHNpZ25hbEFwaVNlc3Npb25VcmwgKyBjdXJyZW50U2Vzc2lvbklkICsgJy9yZXNwb25zZScsIG9uUmVzcG9uc2VSZWNlaXZlZCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLm9uKCdjb25uZWN0aW9uSWQnLCBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIEdvdCBjb25uZWN0aW9uIGlkOiAnICsgaWQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uSWQgPSBpZDtcclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ub24oJ3JlY2VpcHQnLCBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2V0QWNrbm93bGVkZ2VSZWNlaXB0KGlkKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ub25jbG9zZShmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW1NpZ25hbF0gZGlzY29ubmVjdGVkJywgZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIFRPRE8gcmVjb25uZWN0P1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0XHQudGhlbihmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHN0YXJ0U2Vzc2lvbiA9IGZ1bmN0aW9uIChjb3VudCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBHZXR0aW5nIGNvbm5lY3Rpb24gSWQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb3VudCA9IGNvdW50IHx8IDE7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGNvdW50ID4gMTApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBGYWlsLiBDb25uZWN0aW9uSWQgdGltZW91dCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VFcnJvcih7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdDb25uZWN0aW9uIElkIHRpbWVvdXQnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZTogJ0RpZCBub3QgZ2V0IGNvbm5lY3Rpb24gSWQgZXZlbnQuJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29kZTogJC5lcnJvckNvZGVzLlVOREVGSU5FRFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWNvbm5lY3Rpb25JZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHN0YXJ0U2Vzc2lvbihjb3VudCArIDEpOyB9LCAxMDAwKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBHZXR0aW5nIHNlc3Npb24nKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgcmVxdWVzdCA9IHsgY29ubmVjdGlvbklkOiBjb25uZWN0aW9uSWQgfTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRodHRwUG9zdChzaWduYWxBcGlTZXNzaW9uVXJsLCByZXF1ZXN0LCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y3VycmVudFNlc3Npb25JZCA9IGRhdGEuc2Vzc2lvbklkO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2VjcmV0S2V5ID0gZ2VuZXJhdGVTZWNyZXRLZXkoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBzZXNzaW9uIHN0YXJ0ZWQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBzaG93aW5nIG1vZGFsIGRlZXAgbGluaycpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBkZWVwTGlua1F1ZXJ5ID0gJ3N0YXJ0P3M9JyArIGN1cnJlbnRTZXNzaW9uSWQgKyAnJms9JyArIHNlY3JldEtleS5oZXggKyAnJmI9JyArICQuZGV0ZWN0ZWRCcm93c2VyICsgJyZvPScgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgZGVlcExpbmsgPSAnd2VicGtpOi8vJyArIGRlZXBMaW5rUXVlcnk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoaXNBbmRyb2lkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlZXBMaW5rID0gJ2ludGVudDovLycgKyBkZWVwTGlua1F1ZXJ5ICsgJyNJbnRlbnQ7c2NoZW1lPXdlYnBraTtTLmJyb3dzZXJfZmFsbGJhY2tfdXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQoJC5faW5zdGFsbFVybCArIChjb250ZXh0Lmluc3RhbmNlLmJyYW5kIHx8ICcnKSArICc/cmV0dXJuVXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQoZG9jdW1lbnQuVVJMKSArICcmanNsaWI9JyArICQuX2pzbGliVmVyc2lvbikgKyAnO2VuZCc7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0d2ViUGtpTW9kYWwgPSBuZXcgQXV0aG9yaXplV1BraU1vZGFsKGRlZXBMaW5rKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdlYlBraU1vZGFsLm9uT2tDTGljayA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0d2ViUGtpTW9kYWwuc2hvd1dhaXQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29ubmVjdFRpbWVvdXQoY29ubmVjdGlvbik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdlYlBraU1vZGFsLm9uQ2FuY2VsQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNpZ25hbFN0b3AoY29ubmVjdGlvbik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlRXJyb3Ioe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdTdGFydCBtb2JpbGUgYXBwIGNhbmNlbGxlZCcsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29tcGxldGU6ICdTdGFydCBtb2JpbGUgYXBwIGNhbmNlbGxlZCcsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29kZTogJC5lcnJvckNvZGVzLlVTRVJfQ0FOQ0VMTEVEXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3ZWJQa2lNb2RhbC5zaG93KCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChzdGFydFNlc3Npb24sIDEwMCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBvblJlc3BvbnNlUmVjZWl2ZWQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRcdGRhdGEgPSAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSA/IEpTT04ucGFyc2UoZGF0YSkgOiBkYXRhO1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBnb3QgcmVzcG9uc2UuIFR5cGU6ICcgKyBkYXRhLnR5cGUpO1xyXG5cdFx0XHRcdFx0XHRcdHZhciByZXN1bHQgPSB7fTtcclxuXHRcdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGRhdGEuZm9ybWF0ICE9IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgeyBtZXNzYWdlOiAnVW5rbm93biBkYXRhIGZvcm1hdDogJyArIGRhdGEuZm9ybWF0IH07XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGRhdGEudHlwZSAhPT0gJ0Vycm9yJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSBKU09OLnBhcnNlKGRlY3J5cHRNZXNzYWdlKGRhdGEuY29udGVudCwgc2VjcmV0S2V5KSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlcXVlc3RJZDogZGF0YS5pZCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRleGNlcHRpb246IGRhdGEuY29udGVudCA/ICh0eXBlb2YgZGF0YS5jb250ZW50ID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UoZGF0YS5jb250ZW50KSA6IGRhdGEuY29udGVudCkgOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlOiAnQ3J5cHRvZ3JhcGhpYyBlcnJvciBvbiBtb2JpbGUgbmF0aXZlJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiAnQ3J5cHRvZ3JhcGhpYyBlcnJvciBvbiBtb2JpbGUgbmF0aXZlJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvZGU6ICQuZXJyb3JDb2Rlcy5DT01NQU5EX0RFQ1JZUFRfRVJST1JcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVxdWVzdElkOiBkYXRhLmlkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZXhjZXB0aW9uOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ0Vycm9yIHdoaWxlIGRlY3J5cHRpbmcgcmVzcG9uc2UgbWVzc2FnZScsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IHR5cGVvZiAoZXgpID09PSAnb2JqZWN0JyA/IGV4Lm1lc3NhZ2UgfHwgSlNPTi5zdHJpbmdpZnkoZXgpIDogZXgsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29kZTogJC5lcnJvckNvZGVzLkNPTU1BTkRfREVDUllQVF9FUlJPUlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBnZXRDdXJyZW50UGVuZGluZ1JlcXVlc3QoZGF0YS5pZCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHJlcXVlc3QgPT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdC8vIHRoaXMgaXMgYSByZXNwb25zZSBmb3IgYSBwcmV2aW91cyByZXF1ZXN0IHRoYXQgdGltZWQgb3V0XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBkbyBub3RoaW5nXHJcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW1NpZ25hbF0gZ290IHJlc3BvbnNlIGZvciBkaXNwb3NlZCByZXF1ZXN0OiAnICsgZGF0YS5pZCk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChyZXF1ZXN0LnJlc3BvbnNlUHJvY2Vzc29yKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5yZXNwb25zZSA9IHJlcXVlc3QucmVzcG9uc2VQcm9jZXNzb3IocmVzdWx0LnJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5faW52b2tlU3VjY2VzcyhyZXN1bHQucmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UuX2ludm9rZUVycm9yKHJlc3VsdC5leGNlcHRpb24pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHQvLyB3b3JrXHJcblx0XHRcdFx0XHRcdFx0c2VuZE5leHQoKTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIEhUVFAgaGFuZGxlcnNcclxuXHRcdFx0XHRcdFx0dmFyIGh0dHBHZXQgPSBmdW5jdGlvbiAodXJsLCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgaHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHRcdFx0XHRcdFx0XHRodHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRvbkh0dHBTdGF0ZUNoYW5nZWQoaHR0cFJlcXVlc3QsICdHRVQnLCB1cmwsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0XHRodHRwUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdGh0dHBSZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdFx0XHRcdFx0aHR0cFJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tIdHRwSGFuZGxlcl0gR2V0ICcgKyB1cmwpO1xyXG5cdFx0XHRcdFx0XHRcdGh0dHBSZXF1ZXN0LnNlbmQoKTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBodHRwUG9zdCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBodHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0XHRcdFx0XHRcdGh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdG9uSHR0cFN0YXRlQ2hhbmdlZChodHRwUmVxdWVzdCwgJ1BPU1QnLCB1cmwsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0XHRodHRwUmVxdWVzdC5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHRodHRwUmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cdFx0XHRcdFx0XHRcdGh0dHBSZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdFx0XHRcdFx0aHR0cFJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tIdHRwSGFuZGxlcl0gUG9zdCBvbiAnICsgJygnICsgdXJsICsgJyk6ICcsIGRhdGEpO1xyXG5cdFx0XHRcdFx0XHRcdGh0dHBSZXF1ZXN0LnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIG9uSHR0cFN0YXRlQ2hhbmdlZCA9IGZ1bmN0aW9uIChodHRwUmVxdWVzdCwgdmVyYiwgdXJsLCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoaHR0cFJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGh0dHBSZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgaHR0cFJlcXVlc3Quc3RhdHVzIDw9IDI5OSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgcmVzcG9uc2UgPSBudWxsO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaHR0cFJlcXVlc3Quc3RhdHVzID09PSAyMDAgfHwgaHR0cFJlcXVlc3Quc3RhdHVzID09PSAyMDEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBKU09OLnBhcnNlKGh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzQ2FsbGJhY2socmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbSHR0cEhhbmRsZXJdIGVycm9yIHBhcnNpbmcgcmVzcG9uc2UuJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IGh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yQ2FsbGJhY2soaHR0cFJlcXVlc3Quc3RhdHVzLCByZXNwb25zZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbSHR0cEhhbmRsZXJdIHJlY2VpdmVkIHJlc3BvbnNlIGZyb20gJyArIHZlcmIgKyAnICcgKyB1cmwsIHJlc3BvbnNlKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGh0dHBSZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhaHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0ICYmIGlzaU9TKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIFNhZmFyaSBhYm9ydCBjb25uZWN0aW9uIHdvcmthcm91bmRcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tIdHRwSGFuZGxlcl0gZ290IFNhZmFyaSBhYm9ydCBjb25uZWN0aW9uLiBBcHBseWluZyB3b3JrYXJvdW5kJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3NDYWxsYmFjayh7IHNlbnRUb0RldmljZTogdHJ1ZSB9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JNb2RlbDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvck1vZGVsID0gSlNPTi5wYXJzZShodHRwUmVxdWVzdC5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tIdHRwSGFuZGxlcl0gZXJyb3IgcGFyc2luZyBlcnJvcicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yTW9kZWwgPSBudWxsO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbSHR0cEhhbmRsZXJdIGVycm9yOiAnICsgaHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3JDYWxsYmFjayhodHRwUmVxdWVzdC5zdGF0dXMsIGVycm9yTW9kZWwpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBzdGFydFNpZ25hbENvbm5lY3Rpb24gPSBudWxsO1xyXG5cclxuXHRcdFx0XHRcdFx0KGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIHBvbGxTY3JpcHRzID0gZnVuY3Rpb24gKGNvdW50KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb3VudCA9IGNvdW50IHx8IDE7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoY291bnQgPiAxMDApIHsgLy8gMjAgc2Vjb25kcyB0aWVtb3V0XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRocm93ICdTY3JpcHQgJyArICgoISQuX2ZvcmdlICYmICEkLl9zaWduYWxSKSA/ICdmb3JnZSAvIHNpZ25hbFInIDogKCEkLl9mb3JnZSA/ICdmb3JnZScgOiAnc2lnbmFsUicpKSArICcgZGlkIG5vdCBsb2FkJztcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAodXNlZEluamVjdGlvbk1ldGhvZCAhPT0gc2NyaXB0c0luamVjdGlvbk1ldGhvZHMucmVxdWlyZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQkLl9zaWduYWxSID0gd2luZG93LnNpZ25hbFI7XHJcblx0XHRcdFx0XHRcdFx0XHRcdCQuX2ZvcmdlID0gd2luZG93LmZvcmdlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmICgkLl9zaWduYWxSICE9PSB1bmRlZmluZWQgJiYgJC5fZm9yZ2UgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydFNpZ25hbENvbm5lY3Rpb24gPSBmdW5jdGlvbiAodXJsLCBjb25maWd1cmVDb25uZWN0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIHN0YXJ0KCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIFN0YXJ0aW5nIGNvbm5lY3Rpb24nKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBjb25uZWN0aW9uID0gbmV3ICQuX3NpZ25hbFIuSHViQ29ubmVjdGlvbkJ1aWxkZXIoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQud2l0aFVybCh1cmwpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5idWlsZCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChjb25maWd1cmVDb25uZWN0aW9uICYmIHR5cGVvZiBjb25maWd1cmVDb25uZWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbmZpZ3VyZUNvbm5lY3Rpb24oY29ubmVjdGlvbik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbm5lY3Rpb24uc3RhcnQoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbihmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbm5lY3Rpb247XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pWydjYXRjaCddKGZ1bmN0aW9uIChlcnJvcikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBDYW5ub3Qgc3RhcnQgdGhlIGNvbm5lY3Rpb24uIEVycm86ICcsIGVycm9yKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gd2luZG93LlByb21pc2UucmVqZWN0KGVycm9yKTsgLy8gRURJVCBhZGRlZCAnd2luZG93LicgYmVmb3JlIFByb21pc2VcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzY3JpcHRzTG9hZGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBvbGxTY3JpcHRzKGNvdW50ICsgMSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0sIDIwMCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gc3RhcnQgc2NyaXB0cyBwb2xsXHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHBvbGxTY3JpcHRzKCk7IH0sIDUwKTtcclxuXHRcdFx0XHRcdFx0fSkoKTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIHB1YmxpYyBjb21tYW5kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHRcdFx0dGhpcy5zZW5kQ29tbWFuZCA9IHNlbmRDb21tYW5kO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmNoZWNrSW5zdGFsbGVkID0gY2hlY2tJbnN0YWxsZWQ7XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHQvLyBmb3JnZSAoY3J5cHRvKSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0XHRcdFx0dmFyIGdlbmVyYXRlU2VjcmV0S2V5ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0dmFyIHJhdyA9ICQuX2ZvcmdlLnJhbmRvbS5nZXRCeXRlc1N5bmMoMzIpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0cmF3OiByYXcsXHJcblx0XHRcdFx0XHRcdGI2NDogJC5fZm9yZ2UudXRpbC5lbmNvZGU2NChyYXcpLFxyXG5cdFx0XHRcdFx0XHRoZXg6ICQuX2ZvcmdlLnV0aWwuYnl0ZXNUb0hleChyYXcpXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciBlbmNyeXB0TWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcclxuXHRcdFx0XHRcdHZhciBpdiA9ICQuX2ZvcmdlLnJhbmRvbS5nZXRCeXRlc1N5bmMoMTYpO1xyXG5cdFx0XHRcdFx0dmFyIGtleUJ5dGVzID0ga2V5LnJhdztcclxuXHJcblx0XHRcdFx0XHR2YXIgYnVmZmVyID0gbmV3ICQuX2ZvcmdlLnV0aWwuQnl0ZUJ1ZmZlcigpO1xyXG5cdFx0XHRcdFx0YnVmZmVyLnB1dEJ1ZmZlcigkLl9mb3JnZS51dGlsLmNyZWF0ZUJ1ZmZlcihtZXNzYWdlKSk7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGNpcGhlciA9ICQuX2ZvcmdlLmNpcGhlci5jcmVhdGVDaXBoZXIoJ0FFUy1DQkMnLCBrZXlCeXRlcyk7XHJcblx0XHRcdFx0XHRjaXBoZXIuc3RhcnQoeyBpdjogaXYgfSk7XHJcblx0XHRcdFx0XHRjaXBoZXIudXBkYXRlKGJ1ZmZlcik7XHJcblx0XHRcdFx0XHRjaXBoZXIuZmluaXNoKCk7XHJcblx0XHRcdFx0XHR2YXIgY2lwaGVydGV4dCA9IGNpcGhlci5vdXRwdXQuYnl0ZXMoKTtcclxuXHJcblx0XHRcdFx0XHR2YXIgaG1hYyA9ICQuX2ZvcmdlLmhtYWMuY3JlYXRlKCk7XHJcblx0XHRcdFx0XHRobWFjLnN0YXJ0KCdzaGEyNTYnLCBrZXlCeXRlcyk7XHJcblx0XHRcdFx0XHRobWFjLnVwZGF0ZShjaXBoZXJ0ZXh0KTtcclxuXHRcdFx0XHRcdGhtYWNDb250ZW50ID0gaG1hYy5kaWdlc3QoKS5ieXRlcygpO1xyXG5cclxuXHRcdFx0XHRcdHZhciBvdXRCdWZmZXIgPSBuZXcgJC5fZm9yZ2UudXRpbC5CeXRlQnVmZmVyKCk7XHJcblx0XHRcdFx0XHRvdXRCdWZmZXIucHV0Qnl0ZXMoaXYpO1xyXG5cdFx0XHRcdFx0b3V0QnVmZmVyLnB1dEJ5dGVzKGhtYWNDb250ZW50KTtcclxuXHRcdFx0XHRcdG91dEJ1ZmZlci5wdXRCeXRlcyhjaXBoZXJ0ZXh0KTtcclxuXHRcdFx0XHRcdHJldHVybiAkLl9mb3JnZS51dGlsLmVuY29kZTY0KG91dEJ1ZmZlci5ieXRlcygpKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgZGVjcnlwdE1lc3NhZ2UgPSBmdW5jdGlvbiAoZW5jcnlwdGVkLCBrZXkpIHtcclxuXHRcdFx0XHRcdHZhciBrZXlCeXRlcyA9IGtleS5yYXc7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGJ1ZmZlciA9IG5ldyAkLl9mb3JnZS51dGlsLkJ5dGVCdWZmZXIoKTtcclxuXHRcdFx0XHRcdGJ1ZmZlci5wdXRCeXRlcygkLl9mb3JnZS51dGlsLmRlY29kZTY0KGVuY3J5cHRlZCkpO1xyXG5cdFx0XHRcdFx0dmFyIGl2ID0gYnVmZmVyLmdldEJ5dGVzKDE2KTtcclxuXHRcdFx0XHRcdHZhciBobWFjQ2hlY2sgPSBidWZmZXIuZ2V0Qnl0ZXMoMzIpO1xyXG5cdFx0XHRcdFx0dmFyIGNpcGhlcnRleHQgPSBidWZmZXIuYnl0ZXMoKTtcclxuXHJcblx0XHRcdFx0XHR2YXIgaG1hYyA9ICQuX2ZvcmdlLmhtYWMuY3JlYXRlKCk7XHJcblx0XHRcdFx0XHRobWFjLnN0YXJ0KCdzaGEyNTYnLCBrZXlCeXRlcyk7XHJcblx0XHRcdFx0XHRobWFjLnVwZGF0ZShjaXBoZXJ0ZXh0KTtcclxuXHRcdFx0XHRcdHZhciBjb21wdXRlZEhtYWMgPSBobWFjLmRpZ2VzdCgpLmJ5dGVzKCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNvbXB1dGVkSG1hYyAhPT0gaG1hY0NoZWNrKSB7XHJcblx0XHRcdFx0XHRcdHRocm93IHsgbWVzc2FnZTogJ0Vycm9yIG9uIG1lc3NhZ2UgaW50ZWdyaXR5JyB9O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHZhciBkZWNpcGhlciA9ICQuX2ZvcmdlLmNpcGhlci5jcmVhdGVEZWNpcGhlcignQUVTLUNCQycsIGtleUJ5dGVzKTtcclxuXHRcdFx0XHRcdGRlY2lwaGVyLnN0YXJ0KHsgaXY6IGl2IH0pO1xyXG5cdFx0XHRcdFx0ZGVjaXBoZXIudXBkYXRlKGJ1ZmZlcik7XHJcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gZGVjaXBoZXIuZmluaXNoKCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcclxuXHRcdFx0XHRcdFx0dGhyb3cgeyBtZXNzYWdlOiAnRXJyb3Igb24gbWVzc2FnZSBkZWNyeXB0aW9uJyB9O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiAkLl9mb3JnZS51dGlsLmRlY29kZVV0ZjgoZGVjaXBoZXIub3V0cHV0LmdldEJ5dGVzKCkpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgY3JlYXRlRGVlcExpbmtBcHBJbnRlZ3JhdGlvblJlZGlyZWN0ID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuXHJcblx0XHRcdFx0c3ViTW9iaWxlSGFuZGxlciA9IG5ldyBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHR2YXIgc2NoZW1lU3VmZml4ID0gJy1sY24nO1xyXG5cdFx0XHRcdFx0dmFyIHNjaGVtZSA9ICd3cGtpJyArIHNjaGVtZVN1ZmZpeDtcclxuXHRcdFx0XHRcdHZhciBkZWVwTGlua1F1ZXJ5ID0gJ2FjY2Vzcz91PScgKyBlbmNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLmhyZWYpICsgJyZjPScgKyBlbmNvZGVVUklDb21wb25lbnQoZG9jdW1lbnQuY29va2llKTtcclxuXHRcdFx0XHRcdHZhciBkZWVwTGluayA9IHNjaGVtZSArICc6Ly8nICsgZGVlcExpbmtRdWVyeTtcclxuXHRcdFx0XHRcdGlmIChpc0FuZHJvaWQpIHtcclxuXHRcdFx0XHRcdFx0ZGVlcExpbmsgPSAnaW50ZW50Oi8vJyArIGRlZXBMaW5rUXVlcnkgKyAnI0ludGVudDtzY2hlbWU9JyArIHNjaGVtZSArICc7Uy5icm93c2VyX2ZhbGxiYWNrX3VybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KCQuX2luc3RhbGxVcmwgKyAoY29udGV4dC5pbnN0YW5jZS5icmFuZCB8fCAnJykgKyAnP3JldHVyblVybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LlVSTCkgKyAnJmpzbGliPScgKyAkLl9qc2xpYlZlcnNpb24pICsgJztlbmQnO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXMuc2VuZENvbW1hbmQgPSBmdW5jdGlvbiAoY29udGV4dCwgY29tbWFuZCwgcmVxdWVzdCwgcmVzcG9uc2VQcm9jZXNzb3IpIHtcclxuXHRcdFx0XHRcdFx0Ly8gd2lsbCBub3QgYmUgY2FsbGVkXHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuY2hlY2tJbnN0YWxsZWQgPSBmdW5jdGlvbiAoY29udGV4dCwgYXBpVmVyc2lvbikge1xyXG5cdFx0XHRcdFx0XHR2YXIgd2ViUGtpTW9kYWwgPSBuZXcgQXV0aG9yaXplV1BraU1vZGFsKGRlZXBMaW5rKTtcclxuXHJcblx0XHRcdFx0XHRcdHdlYlBraU1vZGFsLm9uT2tDTGljayA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHR3ZWJQa2lNb2RhbC5zaG93V2FpdCgpO1xyXG5cdFx0XHRcdFx0XHRcdHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0d2ViUGtpTW9kYWwuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGlzaU9TKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChuZXcgRGF0ZSgpIC0gdGltZXN0YW1wIDwgMTAgKiAxMDAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29udGV4dC5pbnN0YW5jZS5yZWRpcmVjdFRvSW5zdGFsbFBhZ2UoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0sIDUwMDApO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0d2ViUGtpTW9kYWwub25DYW5jZWxDbGljayA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHR3ZWJQa2lNb2RhbC5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VFcnJvcih7XHJcblx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlOiAnU3RhcnQgbW9iaWxlIGFwcCBjYW5jZWxsZWQnLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29tcGxldGU6ICdTdGFydCBtb2JpbGUgYXBwIGNhbmNlbGxlZCcsXHJcblx0XHRcdFx0XHRcdFx0XHRjb2RlOiAkLmVycm9yQ29kZXMuVVNFUl9DQU5DRUxMRURcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdHdlYlBraU1vZGFsLnNob3coKTtcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHR2YXIgY3JlYXRlTW9iaWxlSGFuZGxlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XHJcblx0XHRcdFx0aWYgKGNyZWF0aW5nTW9iaWxlSGFuZGxlcikge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjcmVhdGluZ01vYmlsZUhhbmRsZXIgPSB0cnVlO1xyXG5cdFx0XHRcdHZhciBtb2JpbGVJbnRlZ3JhdGlvbkNvdW50VGltZW91dCA9IDEwO1xyXG5cdFx0XHRcdHZhciBtb2JpbGVJbnRlZ3JhdGlvblBvbGxJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdwb2xsaW5nIG1vYmlsZSBpbnRlZ3JhdGlvbiBtb2RlIC4uLicpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChtb2JpbGVJbnRlZ3JhdGlvbkNvdW50VGltZW91dCA8PSAwKSB7XHJcblx0XHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwobW9iaWxlSW50ZWdyYXRpb25Qb2xsSWQpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKGNvbnRleHQuaW5zdGFuY2UubW9iaWxlSW50ZWdyYXRpb25Nb2RlID09PSAkLm1vYmlsZUludGVncmF0aW9uTW9kZXMuYnJvd3NlckludGVncmF0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0Y3JlYXRlU2lnbmFsTW9iaWxlSGFuZGxlcigpO1xyXG5cclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRjcmVhdGVEZWVwTGlua0FwcEludGVncmF0aW9uUmVkaXJlY3QoY29udGV4dCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChnZXRBcHBJbnRlZ3JhdGlvbkhhbmRsZXIoKSAmJiBnZXRBcHBJbnRlZ3JhdGlvbkhhbmRsZXIoKS5sb2FkZWQpIHtcclxuXHRcdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChtb2JpbGVJbnRlZ3JhdGlvblBvbGxJZCk7XHJcblx0XHRcdFx0XHRcdGNyZWF0ZUFwcEludGVyYWN0SGFuZGxlcigpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0bW9iaWxlSW50ZWdyYXRpb25Db3VudFRpbWVvdXQtLTtcclxuXHRcdFx0XHR9LCAzMDApO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gTW9kYWwgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdEF1dGhvcml6ZVdQa2lNb2RhbCA9IGZ1bmN0aW9uIChkZWVwTGluaykge1xyXG5cdFx0XHRcdHRoaXMuZGVlcExpbmsgPSBkZWVwTGluaztcclxuXHRcdFx0XHR0aGlzLm9uT2tDTGljayA9IG51bGw7XHJcblx0XHRcdFx0dGhpcy5vbkNhbmNlbENsaWNrID0gbnVsbDtcclxuXHJcblx0XHRcdFx0dmFyIG1vZGFsRWxlbWVudCA9IG51bGw7XHJcblxyXG5cdFx0XHRcdC8vIGxvY2FsaXphdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0dmFyIHRleHRSZXNvdXJjZXMgPSB7XHJcblx0XHRcdFx0XHRwdDoge1xyXG5cdFx0XHRcdFx0XHRhY2Nlc3NDZXJ0aWZpY2F0ZXM6ICdPIHNpdGUge3tkb21haW59fSBkZXNlamEgYWNlc3NhciBzZXVzIGNlcnRpZmljYWRvcyBkaWdpdGFpcy4nLFxyXG5cdFx0XHRcdFx0XHRhdXRob3JpemU6ICdQZXJtaXRpcicsXHJcblx0XHRcdFx0XHRcdGNhbmNlbDogJ0NhbmNlbGFyJyxcclxuXHRcdFx0XHRcdFx0d2FpdDogJ0FndWFyZGUuLi4nXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZW46IHtcclxuXHRcdFx0XHRcdFx0YWNjZXNzQ2VydGlmaWNhdGVzOiAnVGhlIHdlYnNpdGUge3tkb21haW59fSB3YW50cyB0byBhY2Nlc3MgeW91ciBkaWdpdGFsIGNlcnRpZmljYXRlcy4nLFxyXG5cdFx0XHRcdFx0XHRhdXRob3JpemU6ICdBdXRob3JpemUnLFxyXG5cdFx0XHRcdFx0XHRjYW5jZWw6ICdDYW5jZWwnLFxyXG5cdFx0XHRcdFx0XHR3YWl0OiAnUGxlYXNlIHdhaXQuLi4nXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZXM6IHtcclxuXHRcdFx0XHRcdFx0YWNjZXNzQ2VydGlmaWNhdGVzOiAnRWwgc2l0aW8ge3tkb21haW59fSBxdWllcmUgYWNjZWRlciBhIHN1cyBjZXJ0aWZpY2Fkb3MgZGlnaXRhbGVzLicsXHJcblx0XHRcdFx0XHRcdGF1dGhvcml6ZTogJ1Blcm1pdGlyJyxcclxuXHRcdFx0XHRcdFx0Y2FuY2VsOiAnQ2FuY2VsYXInLFxyXG5cdFx0XHRcdFx0XHR3YWl0OiAnRXNwZXJhLi4uJ1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dmFyIHVzZXJMYW5ndWFnZSA9IG51bGw7XHJcblx0XHRcdFx0dmFyIGdldFJlc291cmNlID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdFx0XHRcdGlmICh1c2VyTGFuZ3VhZ2UgPT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0dmFyIGxhbmcgPSAod2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZSB8fCAnZW4nKTtcclxuXHRcdFx0XHRcdFx0dmFyIGF2YWlsYWJsZXNMYW5ncyA9IE9iamVjdC5rZXlzKHRleHRSZXNvdXJjZXMpO1xyXG5cdFx0XHRcdFx0XHR1c2VyTGFuZ3VhZ2UgPSBhdmFpbGFibGVzTGFuZ3MuaW5kZXhPZihsYW5nKSA+IC0xID8gbGFuZyA6IChsYW5nLmxlbmd0aCA+IDEgJiYgYXZhaWxhYmxlc0xhbmdzLmluZGV4T2YobGFuZy5zdWJzdHJpbmcoMCwgMikpID4gLTEpID8gbGFuZy5zdWJzdHJpbmcoMCwgMikgOiAnZW4nO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRleHRSZXNvdXJjZXNbdXNlckxhbmd1YWdlXVtuYW1lXSB8fCBuYW1lO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciBpbml0ID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XHJcblx0XHRcdFx0XHRtb2RhbEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2ViUGtpTW9kYWwnKTtcclxuXHJcblx0XHRcdFx0XHRpZiAobW9kYWxFbGVtZW50ICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0bW9kYWxFbGVtZW50LnJlbW92ZUNoaWxkKG1vZGFsRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5yZW1vdmVDaGlsZChtb2RhbEVsZW1lbnQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIG1vZGFsIHJvb3RcclxuXHRcdFx0XHRcdG1vZGFsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHRcdFx0bW9kYWxFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2ViUGtpTW9kYWwnKTtcclxuXHRcdFx0XHRcdG1vZGFsRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6IG5vbmU7Jyk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gbW9kYWwgY29udGVudFxyXG5cdFx0XHRcdFx0dmFyIG1vZGFsQ29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0XHRcdG1vZGFsQ29udGVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiB0YWJsZTsgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTsgbWFyZ2luOiA1JTsgd2lkdGg6IDkwJTsgaGVpZ2h0OiA5MCU7IGZvbnQtZmFtaWx5OiBcIkhlbHZldGljYVwiOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGJvcmRlci1yYWRpdXM6IDEwcHg7Jyk7XHJcblxyXG5cdFx0XHRcdFx0dmFyIG1pZGRsZUNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0XHRcdG1pZGRsZUNvbnRlbnREaXYuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiB0YWJsZS1jZWxsOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOycpO1xyXG5cclxuXHRcdFx0XHRcdC8vIG1vZGFsIHdhaXRcclxuXHRcdFx0XHRcdHZhciB3YWl0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuXHRcdFx0XHRcdHdhaXRFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2ViUGtpV2FpdEVsZW1lbnQnKTtcclxuXHRcdFx0XHRcdHdhaXRFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogbm9uZScpO1xyXG5cdFx0XHRcdFx0d2FpdEVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZ2V0UmVzb3VyY2UoJ3dhaXQnKSkpO1xyXG5cclxuXHRcdFx0XHRcdC8vIG1vZGFsIHRleHRcclxuXHRcdFx0XHRcdHZhciB0ZXh0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuXHRcdFx0XHRcdHRleHRFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2ViUGtpVGV4dEVsZW1lbnQnKTtcclxuXHRcdFx0XHRcdHRleHRFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAncGFkZGluZy1sZWZ0OiA1JTsgcGFkZGluZy1yaWdodDogNSU7IGZvbnQtc2l6ZTogMS42ZW07IGNvbG9yOiBibGFjazsgd29yZC13cmFwOiBicmVhay13b3JkOyB3aGl0ZS1zcGFjZTogbm9ybWFsOycpO1xyXG5cdFx0XHRcdFx0dGV4dEVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZ2V0UmVzb3VyY2UoJ2FjY2Vzc0NlcnRpZmljYXRlcycpLnNwbGl0KCd7e2RvbWFpbn19JylbMF0pKTtcclxuXHRcdFx0XHRcdHZhciBib2xkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3Ryb25nJyk7XHJcblx0XHRcdFx0XHRib2xkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSkpO1xyXG5cdFx0XHRcdFx0dGV4dEVsZW1lbnQuYXBwZW5kQ2hpbGQoYm9sZCk7XHJcblx0XHRcdFx0XHR0ZXh0RWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShnZXRSZXNvdXJjZSgnYWNjZXNzQ2VydGlmaWNhdGVzJykuc3BsaXQoJ3t7ZG9tYWlufX0nKVsxXSkpO1xyXG5cclxuXHRcdFx0XHRcdC8vIG1vZGFsIGJ1dHRvbnNcclxuXHRcdFx0XHRcdHZhciBidXR0b25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRcdFx0XHRidXR0b25zRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2ViUGtpQnV0dG9uc0VsZW1lbnQnKTtcclxuXHJcblx0XHRcdFx0XHR2YXIgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRcdFx0Y2FuY2VsQnV0dG9uLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC1tb3otYXBwZWFyYW5jZTogYnV0dG9uOyBhcHBlYXJhbmNlOiBidXR0b247IHBhZGRpbmc6IDIlIDQlOyB0ZXh0LWFsaWduOiBjZW50ZXI7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDEuMWVtOyBtYXJnaW46IDUlOyBjdXJzb3I6IHBvaW50ZXI7IGJhY2tncm91bmQtY29sb3I6ICNlN2U3ZTc7IGNvbG9yOiBibGFjaycpO1xyXG5cdFx0XHRcdFx0Y2FuY2VsQnV0dG9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGdldFJlc291cmNlKCdjYW5jZWwnKSkpO1xyXG5cclxuXHRcdFx0XHRcdHZhciBhdXRoQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRcdFx0YXV0aEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJy13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAtbW96LWFwcGVhcmFuY2U6IGJ1dHRvbjsgYXBwZWFyYW5jZTogYnV0dG9uOyBwYWRkaW5nOiAyJSA0JTsgdGV4dC1hbGlnbjogY2VudGVyOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAxLjFlbTsgbWFyZ2luOiA1JTsgY3Vyc29yOiBwb2ludGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3OGU3OyBjb2xvcjogd2hpdGUnKTtcclxuXHRcdFx0XHRcdGF1dGhCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICd3cGtpTW9kYWxEZWVwTGluaycpO1xyXG5cdFx0XHRcdFx0YXV0aEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBpbnN0YW5jZS5kZWVwTGluayk7XHJcblx0XHRcdFx0XHRhdXRoQnV0dG9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGdldFJlc291cmNlKCdhdXRob3JpemUnKSkpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpc2lPUykge1xyXG5cdFx0XHRcdFx0XHRidXR0b25zRGl2LmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbik7XHJcblx0XHRcdFx0XHRcdGJ1dHRvbnNEaXYuYXBwZW5kQ2hpbGQoYXV0aEJ1dHRvbik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRidXR0b25zRGl2LmFwcGVuZENoaWxkKGF1dGhCdXR0b24pO1xyXG5cdFx0XHRcdFx0XHRidXR0b25zRGl2LmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gYXBwZW5kIGNoaWxkcmVuXHJcblx0XHRcdFx0XHRtaWRkbGVDb250ZW50RGl2LmFwcGVuZENoaWxkKHdhaXRFbGVtZW50KTtcclxuXHRcdFx0XHRcdG1pZGRsZUNvbnRlbnREaXYuYXBwZW5kQ2hpbGQodGV4dEVsZW1lbnQpO1xyXG5cdFx0XHRcdFx0bWlkZGxlQ29udGVudERpdi5hcHBlbmRDaGlsZChidXR0b25zRGl2KTtcclxuXHRcdFx0XHRcdG1vZGFsQ29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQobWlkZGxlQ29udGVudERpdik7XHJcblx0XHRcdFx0XHRtb2RhbEVsZW1lbnQuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50RWxlbWVudCk7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKG1vZGFsRWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gd2lyZSBjbGlja3NcclxuXHRcdFx0XHRcdGF1dGhCdXR0b24ub25jbGljayA9IGluc3RhbmNlLm9uT2tDTGljaztcclxuXHRcdFx0XHRcdGNhbmNlbEJ1dHRvbi5vbmNsaWNrID0gaW5zdGFuY2Uub25DYW5jZWxDbGljaztcclxuXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0dGhpcy5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0bW9kYWxFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogbm9uZTsnKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR0aGlzLnNob3cgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRpbml0KHRoaXMpO1xyXG5cdFx0XHRcdFx0bW9kYWxFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogYmxvY2s7IHBvc2l0aW9uOiBmaXhlZDsgei1pbmRleDogMTAwMDAwOyBsZWZ0OiAwOyB0b3A6IDA7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IG92ZXJmbG93OiBhdXRvOyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwwLDApOyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLDAuNCk7Jyk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dGhpcy5zaG93V2FpdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWJQa2lUZXh0RWxlbWVudCcpLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogbm9uZTsnKTtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWJQa2lCdXR0b25zRWxlbWVudCcpLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogbm9uZTsnKTtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWJQa2lXYWl0RWxlbWVudCcpLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAncGFkZGluZy1sZWZ0OiA1JTsgcGFkZGluZy1yaWdodDogNSU7IGZvbnQtc2l6ZTogMS42ZW07IGNvbG9yOiBibGFjazsgd29yZC13cmFwOiBicmVhay13b3JkOycpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxufSkoTGFjdW5hV2ViUEtJLnByb3RvdHlwZSk7XHJcblxyXG5pZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XHJcblx0aWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKSB7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyhleHBvcnRzLCB7XHJcblx0XHRcdC8vVXNpbmcgdGhpcyBzeW50YXggaW5zdGVhZCBvZiBcImV4cG9ydHMuZGVmYXVsdCA9IC4uLlwiIHRvIG1haW50YWluIGNvbXBhdGliaWxpdHkgd2l0aCBFUzMgKGJlY2F1c2Ugb2YgdGhlIC5kZWZhdWx0KVxyXG5cdFx0XHQnZGVmYXVsdCc6IHtcclxuXHRcdFx0XHR2YWx1ZTogTGFjdW5hV2ViUEtJXHJcblx0XHRcdH0sXHJcblx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrL3dlYnBhY2svaXNzdWVzLzI5NDVcclxuXHRcdFx0J19fZXNNb2R1bGUnOiB7XHJcblx0XHRcdFx0dmFsdWU6IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0J0xhY3VuYVdlYlBLSSc6IHtcclxuXHRcdFx0XHR2YWx1ZTogTGFjdW5hV2ViUEtJXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRleHBvcnRzWydkZWZhdWx0J10gPSBMYWN1bmFXZWJQS0k7XHJcblx0XHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5cdFx0ZXhwb3J0cy5MYWN1bmFXZWJQS0kgPSBMYWN1bmFXZWJQS0k7XHJcblx0fVxyXG59IiwgIi8qISBjaG9pY2VzLmpzIHYxMS4wLjMgfCBcdTAwQTkgMjAyNCBKb3NoIEpvaG5zb24gfCBodHRwczovL2dpdGh1Yi5jb20vanNoam9obnNvbi9DaG9pY2VzI3JlYWRtZSAqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCAqL1xuXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwge1xuICAgIF9fcHJvdG9fXzogW11cbiAgfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZC5fX3Byb3RvX18gPSBiO1xuICB9IHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTtcbiAgfTtcbiAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG59O1xuZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbCkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICBmdW5jdGlvbiBfXygpIHtcbiAgICB0aGlzLmNvbnN0cnVjdG9yID0gZDtcbiAgfVxuICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59XG52YXIgX19hc3NpZ24gPSBmdW5jdGlvbiAoKSB7XG4gIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG4gIH07XG4gIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbmZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cbnR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcbn07XG5cbnZhciBBY3Rpb25UeXBlID0ge1xuICAgIEFERF9DSE9JQ0U6ICdBRERfQ0hPSUNFJyxcbiAgICBSRU1PVkVfQ0hPSUNFOiAnUkVNT1ZFX0NIT0lDRScsXG4gICAgRklMVEVSX0NIT0lDRVM6ICdGSUxURVJfQ0hPSUNFUycsXG4gICAgQUNUSVZBVEVfQ0hPSUNFUzogJ0FDVElWQVRFX0NIT0lDRVMnLFxuICAgIENMRUFSX0NIT0lDRVM6ICdDTEVBUl9DSE9JQ0VTJyxcbiAgICBBRERfR1JPVVA6ICdBRERfR1JPVVAnLFxuICAgIEFERF9JVEVNOiAnQUREX0lURU0nLFxuICAgIFJFTU9WRV9JVEVNOiAnUkVNT1ZFX0lURU0nLFxuICAgIEhJR0hMSUdIVF9JVEVNOiAnSElHSExJR0hUX0lURU0nLFxufTtcblxudmFyIEV2ZW50VHlwZSA9IHtcbiAgICBzaG93RHJvcGRvd246ICdzaG93RHJvcGRvd24nLFxuICAgIGhpZGVEcm9wZG93bjogJ2hpZGVEcm9wZG93bicsXG4gICAgY2hhbmdlOiAnY2hhbmdlJyxcbiAgICBjaG9pY2U6ICdjaG9pY2UnLFxuICAgIHNlYXJjaDogJ3NlYXJjaCcsXG4gICAgYWRkSXRlbTogJ2FkZEl0ZW0nLFxuICAgIHJlbW92ZUl0ZW06ICdyZW1vdmVJdGVtJyxcbiAgICBoaWdobGlnaHRJdGVtOiAnaGlnaGxpZ2h0SXRlbScsXG4gICAgaGlnaGxpZ2h0Q2hvaWNlOiAnaGlnaGxpZ2h0Q2hvaWNlJyxcbiAgICB1bmhpZ2hsaWdodEl0ZW06ICd1bmhpZ2hsaWdodEl0ZW0nLFxufTtcblxudmFyIEtleUNvZGVNYXAgPSB7XG4gICAgVEFCX0tFWTogOSxcbiAgICBTSElGVF9LRVk6IDE2LFxuICAgIEJBQ0tfS0VZOiA0NixcbiAgICBERUxFVEVfS0VZOiA4LFxuICAgIEVOVEVSX0tFWTogMTMsXG4gICAgQV9LRVk6IDY1LFxuICAgIEVTQ19LRVk6IDI3LFxuICAgIFVQX0tFWTogMzgsXG4gICAgRE9XTl9LRVk6IDQwLFxuICAgIFBBR0VfVVBfS0VZOiAzMyxcbiAgICBQQUdFX0RPV05fS0VZOiAzNCxcbn07XG5cbnZhciBPYmplY3RzSW5Db25maWcgPSBbJ2Z1c2VPcHRpb25zJywgJ2NsYXNzTmFtZXMnXTtcblxudmFyIFBhc3NlZEVsZW1lbnRUeXBlcyA9IHtcbiAgICBUZXh0OiAndGV4dCcsXG4gICAgU2VsZWN0T25lOiAnc2VsZWN0LW9uZScsXG4gICAgU2VsZWN0TXVsdGlwbGU6ICdzZWxlY3QtbXVsdGlwbGUnLFxufTtcblxudmFyIGFkZENob2ljZSA9IGZ1bmN0aW9uIChjaG9pY2UpIHsgcmV0dXJuICh7XG4gICAgdHlwZTogQWN0aW9uVHlwZS5BRERfQ0hPSUNFLFxuICAgIGNob2ljZTogY2hvaWNlLFxufSk7IH07XG52YXIgcmVtb3ZlQ2hvaWNlID0gZnVuY3Rpb24gKGNob2ljZSkgeyByZXR1cm4gKHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlLlJFTU9WRV9DSE9JQ0UsXG4gICAgY2hvaWNlOiBjaG9pY2UsXG59KTsgfTtcbnZhciBmaWx0ZXJDaG9pY2VzID0gZnVuY3Rpb24gKHJlc3VsdHMpIHsgcmV0dXJuICh7XG4gICAgdHlwZTogQWN0aW9uVHlwZS5GSUxURVJfQ0hPSUNFUyxcbiAgICByZXN1bHRzOiByZXN1bHRzLFxufSk7IH07XG52YXIgYWN0aXZhdGVDaG9pY2VzID0gZnVuY3Rpb24gKGFjdGl2ZSkge1xuICAgIHJldHVybiAoe1xuICAgICAgICB0eXBlOiBBY3Rpb25UeXBlLkFDVElWQVRFX0NIT0lDRVMsXG4gICAgICAgIGFjdGl2ZTogYWN0aXZlLFxuICAgIH0pO1xufTtcblxudmFyIGFkZEdyb3VwID0gZnVuY3Rpb24gKGdyb3VwKSB7IHJldHVybiAoe1xuICAgIHR5cGU6IEFjdGlvblR5cGUuQUREX0dST1VQLFxuICAgIGdyb3VwOiBncm91cCxcbn0pOyB9O1xuXG52YXIgYWRkSXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiAoe1xuICAgIHR5cGU6IEFjdGlvblR5cGUuQUREX0lURU0sXG4gICAgaXRlbTogaXRlbSxcbn0pOyB9O1xudmFyIHJlbW92ZUl0ZW0kMSA9IGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiAoe1xuICAgIHR5cGU6IEFjdGlvblR5cGUuUkVNT1ZFX0lURU0sXG4gICAgaXRlbTogaXRlbSxcbn0pOyB9O1xudmFyIGhpZ2hsaWdodEl0ZW0gPSBmdW5jdGlvbiAoaXRlbSwgaGlnaGxpZ2h0ZWQpIHsgcmV0dXJuICh7XG4gICAgdHlwZTogQWN0aW9uVHlwZS5ISUdITElHSFRfSVRFTSxcbiAgICBpdGVtOiBpdGVtLFxuICAgIGhpZ2hsaWdodGVkOiBoaWdobGlnaHRlZCxcbn0pOyB9O1xuXG52YXIgZ2V0UmFuZG9tTnVtYmVyID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7IHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7IH07XG52YXIgZ2VuZXJhdGVDaGFycyA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogbGVuZ3RoIH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGdldFJhbmRvbU51bWJlcigwLCAzNikudG9TdHJpbmcoMzYpOyB9KS5qb2luKCcnKTtcbn07XG52YXIgZ2VuZXJhdGVJZCA9IGZ1bmN0aW9uIChlbGVtZW50LCBwcmVmaXgpIHtcbiAgICB2YXIgaWQgPSBlbGVtZW50LmlkIHx8IChlbGVtZW50Lm5hbWUgJiYgXCJcIi5jb25jYXQoZWxlbWVudC5uYW1lLCBcIi1cIikuY29uY2F0KGdlbmVyYXRlQ2hhcnMoMikpKSB8fCBnZW5lcmF0ZUNoYXJzKDQpO1xuICAgIGlkID0gaWQucmVwbGFjZSgvKDp8XFwufFxcW3xcXF18LCkvZywgJycpO1xuICAgIGlkID0gXCJcIi5jb25jYXQocHJlZml4LCBcIi1cIikuY29uY2F0KGlkKTtcbiAgICByZXR1cm4gaWQ7XG59O1xudmFyIGdldEFkamFjZW50RWwgPSBmdW5jdGlvbiAoc3RhcnRFbCwgc2VsZWN0b3IsIGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IHZvaWQgMCkgeyBkaXJlY3Rpb24gPSAxOyB9XG4gICAgdmFyIHByb3AgPSBcIlwiLmNvbmNhdChkaXJlY3Rpb24gPiAwID8gJ25leHQnIDogJ3ByZXZpb3VzJywgXCJFbGVtZW50U2libGluZ1wiKTtcbiAgICB2YXIgc2libGluZyA9IHN0YXJ0RWxbcHJvcF07XG4gICAgd2hpbGUgKHNpYmxpbmcpIHtcbiAgICAgICAgaWYgKHNpYmxpbmcubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBzaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIHNpYmxpbmcgPSBzaWJsaW5nW3Byb3BdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG52YXIgaXNTY3JvbGxlZEludG9WaWV3ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBhcmVudCwgZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gdm9pZCAwKSB7IGRpcmVjdGlvbiA9IDE7IH1cbiAgICB2YXIgaXNWaXNpYmxlO1xuICAgIGlmIChkaXJlY3Rpb24gPiAwKSB7XG4gICAgICAgIC8vIEluIHZpZXcgZnJvbSBib3R0b21cbiAgICAgICAgaXNWaXNpYmxlID0gcGFyZW50LnNjcm9sbFRvcCArIHBhcmVudC5vZmZzZXRIZWlnaHQgPj0gZWxlbWVudC5vZmZzZXRUb3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIEluIHZpZXcgZnJvbSB0b3BcbiAgICAgICAgaXNWaXNpYmxlID0gZWxlbWVudC5vZmZzZXRUb3AgPj0gcGFyZW50LnNjcm9sbFRvcDtcbiAgICB9XG4gICAgcmV0dXJuIGlzVmlzaWJsZTtcbn07XG52YXIgc2FuaXRpc2UgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoJ3JhdycgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2FuaXRpc2UodmFsdWUucmF3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgndHJ1c3RlZCcgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUudHJ1c3RlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgICAgLnJlcGxhY2UoLycvZywgJyYjMDM5OycpXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG59O1xudmFyIHN0clRvRWwgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciB0bXBFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHRtcEVsLmlubmVySFRNTCA9IHN0ci50cmltKCk7XG4gICAgICAgIHZhciBmaXJzdENoaWxkID0gdG1wRWwuY2hpbGRyZW5bMF07XG4gICAgICAgIHdoaWxlICh0bXBFbC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0bXBFbC5yZW1vdmVDaGlsZCh0bXBFbC5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlyc3RDaGlsZDtcbiAgICB9O1xufSkoKTtcbnZhciByZXNvbHZlTm90aWNlRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4sIHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyA/IGZuKHNhbml0aXNlKHZhbHVlKSwgdmFsdWUpIDogZm47XG59O1xudmFyIHJlc29sdmVTdHJpbmdGdW5jdGlvbiA9IGZ1bmN0aW9uIChmbikge1xuICAgIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgPyBmbigpIDogZm47XG59O1xudmFyIHVud3JhcFN0cmluZ0ZvclJhdyA9IGZ1bmN0aW9uIChzKSB7XG4gICAgaWYgKHR5cGVvZiBzID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoJ3RydXN0ZWQnIGluIHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnRydXN0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCdyYXcnIGluIHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnJhdztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xudmFyIHVud3JhcFN0cmluZ0ZvckVzY2FwZWQgPSBmdW5jdGlvbiAocykge1xuICAgIGlmICh0eXBlb2YgcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKCdlc2NhcGVkJyBpbiBzKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5lc2NhcGVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICgndHJ1c3RlZCcgaW4gcykge1xuICAgICAgICAgICAgcmV0dXJuIHMudHJ1c3RlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xudmFyIGVzY2FwZUZvclRlbXBsYXRlID0gZnVuY3Rpb24gKGFsbG93SFRNTCwgcykge1xuICAgIHJldHVybiBhbGxvd0hUTUwgPyB1bndyYXBTdHJpbmdGb3JFc2NhcGVkKHMpIDogc2FuaXRpc2Uocyk7XG59O1xudmFyIHNldEVsZW1lbnRIdG1sID0gZnVuY3Rpb24gKGVsLCBhbGxvd0h0bWwsIGh0bWwpIHtcbiAgICBlbC5pbm5lckhUTUwgPSBlc2NhcGVGb3JUZW1wbGF0ZShhbGxvd0h0bWwsIGh0bWwpO1xufTtcbnZhciBzb3J0QnlBbHBoYSA9IGZ1bmN0aW9uIChfYSwgX2IpIHtcbiAgICB2YXIgdmFsdWUgPSBfYS52YWx1ZSwgX2MgPSBfYS5sYWJlbCwgbGFiZWwgPSBfYyA9PT0gdm9pZCAwID8gdmFsdWUgOiBfYztcbiAgICB2YXIgdmFsdWUyID0gX2IudmFsdWUsIF9kID0gX2IubGFiZWwsIGxhYmVsMiA9IF9kID09PSB2b2lkIDAgPyB2YWx1ZTIgOiBfZDtcbiAgICByZXR1cm4gdW53cmFwU3RyaW5nRm9yUmF3KGxhYmVsKS5sb2NhbGVDb21wYXJlKHVud3JhcFN0cmluZ0ZvclJhdyhsYWJlbDIpLCBbXSwge1xuICAgICAgICBzZW5zaXRpdml0eTogJ2Jhc2UnLFxuICAgICAgICBpZ25vcmVQdW5jdHVhdGlvbjogdHJ1ZSxcbiAgICAgICAgbnVtZXJpYzogdHJ1ZSxcbiAgICB9KTtcbn07XG52YXIgc29ydEJ5UmFuayA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGEucmFuayAtIGIucmFuaztcbn07XG52YXIgZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCB0eXBlLCBjdXN0b21BcmdzKSB7XG4gICAgaWYgKGN1c3RvbUFyZ3MgPT09IHZvaWQgMCkgeyBjdXN0b21BcmdzID0gbnVsbDsgfVxuICAgIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7XG4gICAgICAgIGRldGFpbDogY3VzdG9tQXJncyxcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICB9KTtcbiAgICByZXR1cm4gZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn07XG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2Yga2V5cyBwcmVzZW50IG9uIHRoZSBmaXJzdCBidXQgbWlzc2luZyBvbiB0aGUgc2Vjb25kIG9iamVjdFxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxudmFyIGRpZmYgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHZhciBhS2V5cyA9IE9iamVjdC5rZXlzKGEpLnNvcnQoKTtcbiAgICB2YXIgYktleXMgPSBPYmplY3Qua2V5cyhiKS5zb3J0KCk7XG4gICAgcmV0dXJuIGFLZXlzLmZpbHRlcihmdW5jdGlvbiAoaSkgeyByZXR1cm4gYktleXMuaW5kZXhPZihpKSA8IDA7IH0pO1xufTtcbnZhciBnZXRDbGFzc05hbWVzID0gZnVuY3Rpb24gKENsYXNzTmFtZXMpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShDbGFzc05hbWVzKSA/IENsYXNzTmFtZXMgOiBbQ2xhc3NOYW1lc107XG59O1xudmFyIGdldENsYXNzTmFtZXNTZWxlY3RvciA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICBpZiAob3B0aW9uICYmIEFycmF5LmlzQXJyYXkob3B0aW9uKSkge1xuICAgICAgICByZXR1cm4gb3B0aW9uXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIuXCIuY29uY2F0KGl0ZW0pO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgIH1cbiAgICByZXR1cm4gXCIuXCIuY29uY2F0KG9wdGlvbik7XG59O1xudmFyIGFkZENsYXNzZXNUb0VsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgdmFyIF9hO1xuICAgIChfYSA9IGVsZW1lbnQuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2EsIGdldENsYXNzTmFtZXMoY2xhc3NOYW1lKSk7XG59O1xudmFyIHJlbW92ZUNsYXNzZXNGcm9tRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICB2YXIgX2E7XG4gICAgKF9hID0gZWxlbWVudC5jbGFzc0xpc3QpLnJlbW92ZS5hcHBseShfYSwgZ2V0Q2xhc3NOYW1lcyhjbGFzc05hbWUpKTtcbn07XG52YXIgcGFyc2VDdXN0b21Qcm9wZXJ0aWVzID0gZnVuY3Rpb24gKGN1c3RvbVByb3BlcnRpZXMpIHtcbiAgICBpZiAodHlwZW9mIGN1c3RvbVByb3BlcnRpZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShjdXN0b21Qcm9wZXJ0aWVzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGN1c3RvbVByb3BlcnRpZXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHt9O1xufTtcbnZhciB1cGRhdGVDbGFzc0xpc3QgPSBmdW5jdGlvbiAoaXRlbSwgYWRkLCByZW1vdmUpIHtcbiAgICB2YXIgaXRlbUVsID0gaXRlbS5pdGVtRWw7XG4gICAgaWYgKGl0ZW1FbCkge1xuICAgICAgICByZW1vdmVDbGFzc2VzRnJvbUVsZW1lbnQoaXRlbUVsLCByZW1vdmUpO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGl0ZW1FbCwgYWRkKTtcbiAgICB9XG59O1xuXG52YXIgRHJvcGRvd24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJvcGRvd24oX2EpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBfYS5lbGVtZW50LCB0eXBlID0gX2EudHlwZSwgY2xhc3NOYW1lcyA9IF9hLmNsYXNzTmFtZXM7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvdyBkcm9wZG93biB0byB1c2VyIGJ5IGFkZGluZyBhY3RpdmUgc3RhdGUgY2xhc3NcbiAgICAgKi9cbiAgICBEcm9wZG93bi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudCh0aGlzLmVsZW1lbnQsIHRoaXMuY2xhc3NOYW1lcy5hY3RpdmVTdGF0ZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIaWRlIGRyb3Bkb3duIGZyb20gdXNlclxuICAgICAqL1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZW1vdmVDbGFzc2VzRnJvbUVsZW1lbnQodGhpcy5lbGVtZW50LCB0aGlzLmNsYXNzTmFtZXMuYWN0aXZlU3RhdGUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gRHJvcGRvd247XG59KCkpO1xuXG52YXIgQ29udGFpbmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lcihfYSkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IF9hLmVsZW1lbnQsIHR5cGUgPSBfYS50eXBlLCBjbGFzc05hbWVzID0gX2EuY2xhc3NOYW1lcywgcG9zaXRpb24gPSBfYS5wb3NpdGlvbjtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRmxpcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIHdoZXRoZXIgY29udGFpbmVyIHNob3VsZCBiZSBmbGlwcGVkIGJhc2VkIG9uIHBhc3NlZFxuICAgICAqIGRyb3Bkb3duIHBvc2l0aW9uXG4gICAgICovXG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5zaG91bGRGbGlwID0gZnVuY3Rpb24gKGRyb3Bkb3duUG9zLCBkcm9wZG93bkhlaWdodCkge1xuICAgICAgICAvLyBJZiBmbGlwIGlzIGVuYWJsZWQgYW5kIHRoZSBkcm9wZG93biBib3R0b20gcG9zaXRpb24gaXNcbiAgICAgICAgLy8gZ3JlYXRlciB0aGFuIHRoZSB3aW5kb3cgaGVpZ2h0IGZsaXAgdGhlIGRyb3Bkb3duLlxuICAgICAgICB2YXIgc2hvdWxkRmxpcCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICBzaG91bGRGbGlwID1cbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gZHJvcGRvd25IZWlnaHQgPj0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAhd2luZG93Lm1hdGNoTWVkaWEoXCIobWluLWhlaWdodDogXCIuY29uY2F0KGRyb3Bkb3duUG9zICsgMSwgXCJweClcIikpLm1hdGNoZXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wb3NpdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIHNob3VsZEZsaXAgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaG91bGRGbGlwO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5zZXRBY3RpdmVEZXNjZW5kYW50ID0gZnVuY3Rpb24gKGFjdGl2ZURlc2NlbmRhbnRJRCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBhY3RpdmVEZXNjZW5kYW50SUQpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVBY3RpdmVEZXNjZW5kYW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uIChkcm9wZG93blBvcywgZHJvcGRvd25IZWlnaHQpIHtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudCh0aGlzLmVsZW1lbnQsIHRoaXMuY2xhc3NOYW1lcy5vcGVuU3RhdGUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5zaG91bGRGbGlwKGRyb3Bkb3duUG9zLCBkcm9wZG93bkhlaWdodCkpIHtcbiAgICAgICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQodGhpcy5lbGVtZW50LCB0aGlzLmNsYXNzTmFtZXMuZmxpcHBlZFN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMuaXNGbGlwcGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVtb3ZlQ2xhc3Nlc0Zyb21FbGVtZW50KHRoaXMuZWxlbWVudCwgdGhpcy5jbGFzc05hbWVzLm9wZW5TdGF0ZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgdGhpcy5yZW1vdmVBY3RpdmVEZXNjZW5kYW50KCk7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIC8vIEEgZHJvcGRvd24gZmxpcHMgaWYgaXQgZG9lcyBub3QgaGF2ZSBzcGFjZSB3aXRoaW4gdGhlIHBhZ2VcbiAgICAgICAgaWYgKHRoaXMuaXNGbGlwcGVkKSB7XG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzRnJvbUVsZW1lbnQodGhpcy5lbGVtZW50LCB0aGlzLmNsYXNzTmFtZXMuZmxpcHBlZFN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMuaXNGbGlwcGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuYWRkRm9jdXNTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudCh0aGlzLmVsZW1lbnQsIHRoaXMuY2xhc3NOYW1lcy5mb2N1c1N0YXRlKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlRm9jdXNTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVtb3ZlQ2xhc3Nlc0Zyb21FbGVtZW50KHRoaXMuZWxlbWVudCwgdGhpcy5jbGFzc05hbWVzLmZvY3VzU3RhdGUpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlbW92ZUNsYXNzZXNGcm9tRWxlbWVudCh0aGlzLmVsZW1lbnQsIHRoaXMuY2xhc3NOYW1lcy5kaXNhYmxlZFN0YXRlKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcpO1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSBQYXNzZWRFbGVtZW50VHlwZXMuU2VsZWN0T25lKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQodGhpcy5lbGVtZW50LCB0aGlzLmNsYXNzTmFtZXMuZGlzYWJsZWRTdGF0ZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSBQYXNzZWRFbGVtZW50VHlwZXMuU2VsZWN0T25lKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNEaXNhYmxlZCA9IHRydWU7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLndyYXAgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgZWwgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgZWxlbWVudC5uZXh0U2libGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUudW53cmFwID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsID0gdGhpcy5lbGVtZW50O1xuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAvLyBNb3ZlIHBhc3NlZCBlbGVtZW50IG91dHNpZGUgdGhpcyBlbGVtZW50XG4gICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShlbGVtZW50LCBlbCk7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhpcyBlbGVtZW50XG4gICAgICAgICAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5hZGRMb2FkaW5nU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQodGhpcy5lbGVtZW50LCB0aGlzLmNsYXNzTmFtZXMubG9hZGluZ1N0YXRlKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1idXN5JywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVMb2FkaW5nU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlbW92ZUNsYXNzZXNGcm9tRWxlbWVudCh0aGlzLmVsZW1lbnQsIHRoaXMuY2xhc3NOYW1lcy5sb2FkaW5nU3RhdGUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWJ1c3knKTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBDb250YWluZXI7XG59KCkpO1xuXG52YXIgSW5wdXQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW5wdXQoX2EpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBfYS5lbGVtZW50LCB0eXBlID0gX2EudHlwZSwgY2xhc3NOYW1lcyA9IF9hLmNsYXNzTmFtZXMsIHByZXZlbnRQYXN0ZSA9IF9hLnByZXZlbnRQYXN0ZTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcbiAgICAgICAgdGhpcy5wcmV2ZW50UGFzdGUgPSBwcmV2ZW50UGFzdGU7XG4gICAgICAgIHRoaXMuaXNGb2N1c3NlZCA9IHRoaXMuZWxlbWVudC5pc0VxdWFsTm9kZShkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gZWxlbWVudC5kaXNhYmxlZDtcbiAgICAgICAgdGhpcy5fb25QYXN0ZSA9IHRoaXMuX29uUGFzdGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25JbnB1dCA9IHRoaXMuX29uSW5wdXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25Gb2N1cyA9IHRoaXMuX29uRm9jdXMuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25CbHVyID0gdGhpcy5fb25CbHVyLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsIFwicGxhY2Vob2xkZXJcIiwge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChwbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXQucHJvdG90eXBlLCBcInZhbHVlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBJbnB1dC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCB0aGlzLl9vblBhc3RlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLl9vbklucHV0LCB7XG4gICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9vbkZvY3VzLCB7XG4gICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuX29uQmx1ciwge1xuICAgICAgICAgICAgcGFzc2l2ZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJbnB1dC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLl9vbklucHV0KTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGFzdGUnLCB0aGlzLl9vblBhc3RlKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9vbkZvY3VzKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuX29uQmx1cik7XG4gICAgfTtcbiAgICBJbnB1dC5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgfTtcbiAgICBJbnB1dC5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gdGhpcy5lbGVtZW50O1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSB0cnVlO1xuICAgIH07XG4gICAgSW5wdXQucHJvdG90eXBlLmZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNGb2N1c3NlZCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIElucHV0LnByb3RvdHlwZS5ibHVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc0ZvY3Vzc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYmx1cigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBJbnB1dC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoc2V0V2lkdGgpIHtcbiAgICAgICAgaWYgKHNldFdpZHRoID09PSB2b2lkIDApIHsgc2V0V2lkdGggPSB0cnVlOyB9XG4gICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICBpZiAoc2V0V2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0V2lkdGgoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY29ycmVjdCBpbnB1dCB3aWR0aCBiYXNlZCBvbiBwbGFjZWhvbGRlclxuICAgICAqIHZhbHVlIG9yIGlucHV0IHZhbHVlXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLnNldFdpZHRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBSZXNpemUgaW5wdXQgdG8gY29udGVudHMgb3IgcGxhY2Vob2xkZXJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUubWluV2lkdGggPSBcIlwiLmNvbmNhdChlbGVtZW50LnBsYWNlaG9sZGVyLmxlbmd0aCArIDEsIFwiY2hcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSBcIlwiLmNvbmNhdChlbGVtZW50LnZhbHVlLmxlbmd0aCArIDEsIFwiY2hcIik7XG4gICAgfTtcbiAgICBJbnB1dC5wcm90b3R5cGUuc2V0QWN0aXZlRGVzY2VuZGFudCA9IGZ1bmN0aW9uIChhY3RpdmVEZXNjZW5kYW50SUQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgYWN0aXZlRGVzY2VuZGFudElEKTtcbiAgICB9O1xuICAgIElucHV0LnByb3RvdHlwZS5yZW1vdmVBY3RpdmVEZXNjZW5kYW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICB9O1xuICAgIElucHV0LnByb3RvdHlwZS5fb25JbnB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPT0gUGFzc2VkRWxlbWVudFR5cGVzLlNlbGVjdE9uZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRXaWR0aCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBJbnB1dC5wcm90b3R5cGUuX29uUGFzdGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJldmVudFBhc3RlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBJbnB1dC5wcm90b3R5cGUuX29uRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNGb2N1c3NlZCA9IHRydWU7XG4gICAgfTtcbiAgICBJbnB1dC5wcm90b3R5cGUuX29uQmx1ciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc0ZvY3Vzc2VkID0gZmFsc2U7XG4gICAgfTtcbiAgICByZXR1cm4gSW5wdXQ7XG59KCkpO1xuXG52YXIgU0NST0xMSU5HX1NQRUVEID0gNDtcblxudmFyIExpc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdChfYSkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IF9hLmVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc2Nyb2xsUG9zID0gdGhpcy5lbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICBMaXN0LnByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdmFyIGNoaWxkID0gdGhpcy5lbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5pbnNlcnRCZWZvcmUobm9kZSwgY2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZChub2RlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTGlzdC5wcm90b3R5cGUuc2Nyb2xsVG9Ub3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgIH07XG4gICAgTGlzdC5wcm90b3R5cGUuc2Nyb2xsVG9DaGlsZEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgZGlyZWN0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0SGVpZ2h0ID0gdGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgLy8gU2Nyb2xsIHBvc2l0aW9uIG9mIGRyb3Bkb3duXG4gICAgICAgIHZhciBsaXN0U2Nyb2xsUG9zaXRpb24gPSB0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEhlaWdodDtcbiAgICAgICAgdmFyIGVsZW1lbnRIZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgLy8gRGlzdGFuY2UgZnJvbSBib3R0b20gb2YgZWxlbWVudCB0byB0b3Agb2YgcGFyZW50XG4gICAgICAgIHZhciBlbGVtZW50UG9zID0gZWxlbWVudC5vZmZzZXRUb3AgKyBlbGVtZW50SGVpZ2h0O1xuICAgICAgICAvLyBEaWZmZXJlbmNlIGJldHdlZW4gdGhlIGVsZW1lbnQgYW5kIHNjcm9sbCBwb3NpdGlvblxuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSBkaXJlY3Rpb24gPiAwID8gdGhpcy5lbGVtZW50LnNjcm9sbFRvcCArIGVsZW1lbnRQb3MgLSBsaXN0U2Nyb2xsUG9zaXRpb24gOiBlbGVtZW50Lm9mZnNldFRvcDtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9hbmltYXRlU2Nyb2xsKGRlc3RpbmF0aW9uLCBkaXJlY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExpc3QucHJvdG90eXBlLl9zY3JvbGxEb3duID0gZnVuY3Rpb24gKHNjcm9sbFBvcywgc3RyZW5ndGgsIGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIHZhciBlYXNpbmcgPSAoZGVzdGluYXRpb24gLSBzY3JvbGxQb3MpIC8gc3RyZW5ndGg7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IGVhc2luZyA+IDEgPyBlYXNpbmcgOiAxO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsUG9zICsgZGlzdGFuY2U7XG4gICAgfTtcbiAgICBMaXN0LnByb3RvdHlwZS5fc2Nyb2xsVXAgPSBmdW5jdGlvbiAoc2Nyb2xsUG9zLCBzdHJlbmd0aCwgZGVzdGluYXRpb24pIHtcbiAgICAgICAgdmFyIGVhc2luZyA9IChzY3JvbGxQb3MgLSBkZXN0aW5hdGlvbikgLyBzdHJlbmd0aDtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gZWFzaW5nID4gMSA/IGVhc2luZyA6IDE7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxQb3MgLSBkaXN0YW5jZTtcbiAgICB9O1xuICAgIExpc3QucHJvdG90eXBlLl9hbmltYXRlU2Nyb2xsID0gZnVuY3Rpb24gKGRlc3RpbmF0aW9uLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHN0cmVuZ3RoID0gU0NST0xMSU5HX1NQRUVEO1xuICAgICAgICB2YXIgY2hvaWNlTGlzdFNjcm9sbFRvcCA9IHRoaXMuZWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgIHZhciBjb250aW51ZUFuaW1hdGlvbiA9IGZhbHNlO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRG93bihjaG9pY2VMaXN0U2Nyb2xsVG9wLCBzdHJlbmd0aCwgZGVzdGluYXRpb24pO1xuICAgICAgICAgICAgaWYgKGNob2ljZUxpc3RTY3JvbGxUb3AgPCBkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlQW5pbWF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbFVwKGNob2ljZUxpc3RTY3JvbGxUb3AsIHN0cmVuZ3RoLCBkZXN0aW5hdGlvbik7XG4gICAgICAgICAgICBpZiAoY2hvaWNlTGlzdFNjcm9sbFRvcCA+IGRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29udGludWVBbmltYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb250aW51ZUFuaW1hdGlvbikge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fYW5pbWF0ZVNjcm9sbChkZXN0aW5hdGlvbiwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTGlzdDtcbn0oKSk7XG5cbnZhciBXcmFwcGVkRWxlbWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXcmFwcGVkRWxlbWVudChfYSkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IF9hLmVsZW1lbnQsIGNsYXNzTmFtZXMgPSBfYS5jbGFzc05hbWVzO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyYXBwZWRFbGVtZW50LnByb3RvdHlwZSwgXCJpc0FjdGl2ZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5kYXRhc2V0LmNob2ljZSA9PT0gJ2FjdGl2ZSc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JhcHBlZEVsZW1lbnQucHJvdG90eXBlLCBcImRpclwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5kaXI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JhcHBlZEVsZW1lbnQucHJvdG90eXBlLCBcInZhbHVlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFdyYXBwZWRFbGVtZW50LnByb3RvdHlwZS5jb25jZWFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIC8vIEhpZGUgcGFzc2VkIGlucHV0XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZWwsIHRoaXMuY2xhc3NOYW1lcy5pbnB1dCk7XG4gICAgICAgIGVsLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIC8vIFJlbW92ZSBlbGVtZW50IGZyb20gdGFiIGluZGV4XG4gICAgICAgIGVsLnRhYkluZGV4ID0gLTE7XG4gICAgICAgIC8vIEJhY2t1cCBvcmlnaW5hbCBzdHlsZXMgaWYgYW55XG4gICAgICAgIHZhciBvcmlnU3R5bGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgIGlmIChvcmlnU3R5bGUpIHtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1jaG9pY2Utb3JpZy1zdHlsZScsIG9yaWdTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLWNob2ljZScsICdhY3RpdmUnKTtcbiAgICB9O1xuICAgIFdyYXBwZWRFbGVtZW50LnByb3RvdHlwZS5yZXZlYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgLy8gUmVpbnN0YXRlIHBhc3NlZCBlbGVtZW50XG4gICAgICAgIHJlbW92ZUNsYXNzZXNGcm9tRWxlbWVudChlbCwgdGhpcy5jbGFzc05hbWVzLmlucHV0KTtcbiAgICAgICAgZWwuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICAgICAgLy8gUmVjb3ZlciBvcmlnaW5hbCBzdHlsZXMgaWYgYW55XG4gICAgICAgIHZhciBvcmlnU3R5bGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2hvaWNlLW9yaWctc3R5bGUnKTtcbiAgICAgICAgaWYgKG9yaWdTdHlsZSkge1xuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWNob2ljZS1vcmlnLXN0eWxlJyk7XG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgb3JpZ1N0eWxlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtY2hvaWNlJyk7XG4gICAgfTtcbiAgICBXcmFwcGVkRWxlbWVudC5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgfTtcbiAgICBXcmFwcGVkRWxlbWVudC5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNEaXNhYmxlZCA9IHRydWU7XG4gICAgfTtcbiAgICBXcmFwcGVkRWxlbWVudC5wcm90b3R5cGUudHJpZ2dlckV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgZGF0YSkge1xuICAgICAgICBkaXNwYXRjaEV2ZW50KHRoaXMuZWxlbWVudCwgZXZlbnRUeXBlLCBkYXRhIHx8IHt9KTtcbiAgICB9O1xuICAgIHJldHVybiBXcmFwcGVkRWxlbWVudDtcbn0oKSk7XG5cbnZhciBXcmFwcGVkSW5wdXQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFdyYXBwZWRJbnB1dCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBXcmFwcGVkSW5wdXQoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFdyYXBwZWRJbnB1dDtcbn0oV3JhcHBlZEVsZW1lbnQpKTtcblxudmFyIGNvZXJjZUJvb2wgPSBmdW5jdGlvbiAoYXJnLCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB2b2lkIDApIHsgZGVmYXVsdFZhbHVlID0gdHJ1ZTsgfVxuICAgIHJldHVybiB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRWYWx1ZSA6ICEhYXJnO1xufTtcbnZhciBzdHJpbmdUb0h0bWxDbGFzcyA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBpbnB1dCA9IGlucHV0LnNwbGl0KCcgJykuZmlsdGVyKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLmxlbmd0aDsgfSk7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGlucHV0KSAmJiBpbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufTtcbnZhciBtYXBJbnB1dFRvQ2hvaWNlID0gZnVuY3Rpb24gKHZhbHVlLCBhbGxvd0dyb3VwLCBhbGxvd1Jhd1N0cmluZykge1xuICAgIGlmIChhbGxvd1Jhd1N0cmluZyA9PT0gdm9pZCAwKSB7IGFsbG93UmF3U3RyaW5nID0gdHJ1ZTsgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBzYW5pdGlzZWRWYWx1ZSA9IHNhbml0aXNlKHZhbHVlKTtcbiAgICAgICAgdmFyIHVzZXJWYWx1ZSA9IGFsbG93UmF3U3RyaW5nIHx8IHNhbml0aXNlZFZhbHVlID09PSB2YWx1ZSA/IHZhbHVlIDogeyBlc2NhcGVkOiBzYW5pdGlzZWRWYWx1ZSwgcmF3OiB2YWx1ZSB9O1xuICAgICAgICB2YXIgcmVzdWx0XzEgPSBtYXBJbnB1dFRvQ2hvaWNlKHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGxhYmVsOiB1c2VyVmFsdWUsXG4gICAgICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICByZXR1cm4gcmVzdWx0XzE7XG4gICAgfVxuICAgIHZhciBncm91cE9yQ2hvaWNlID0gdmFsdWU7XG4gICAgaWYgKCdjaG9pY2VzJyBpbiBncm91cE9yQ2hvaWNlKSB7XG4gICAgICAgIGlmICghYWxsb3dHcm91cCkge1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50L29wdGdyb3VwXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0R3JvdXAgaXMgbm90IGFsbG93ZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdyb3VwID0gZ3JvdXBPckNob2ljZTtcbiAgICAgICAgdmFyIGNob2ljZXMgPSBncm91cC5jaG9pY2VzLm1hcChmdW5jdGlvbiAoZSkgeyByZXR1cm4gbWFwSW5wdXRUb0Nob2ljZShlLCBmYWxzZSk7IH0pO1xuICAgICAgICB2YXIgcmVzdWx0XzIgPSB7XG4gICAgICAgICAgICBpZDogMCwgLy8gYWN0dWFsIElEIHdpbGwgYmUgYXNzaWduZWQgZHVyaW5nIF9hZGRHcm91cFxuICAgICAgICAgICAgbGFiZWw6IHVud3JhcFN0cmluZ0ZvclJhdyhncm91cC5sYWJlbCkgfHwgZ3JvdXAudmFsdWUsXG4gICAgICAgICAgICBhY3RpdmU6ICEhY2hvaWNlcy5sZW5ndGgsXG4gICAgICAgICAgICBkaXNhYmxlZDogISFncm91cC5kaXNhYmxlZCxcbiAgICAgICAgICAgIGNob2ljZXM6IGNob2ljZXMsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHRfMjtcbiAgICB9XG4gICAgdmFyIGNob2ljZSA9IGdyb3VwT3JDaG9pY2U7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgaWQ6IDAsIC8vIGFjdHVhbCBJRCB3aWxsIGJlIGFzc2lnbmVkIGR1cmluZyBfYWRkQ2hvaWNlXG4gICAgICAgIGdyb3VwOiBudWxsLCAvLyBhY3R1YWwgZ3JvdXAgd2lsbCBiZSBhc3NpZ25lZCBkdXJpbmcgX2FkZEdyb3VwIGJ1dCBiZWZvcmUgX2FkZENob2ljZVxuICAgICAgICBzY29yZTogMCwgLy8gdXNlZCBpbiBzZWFyY2hcbiAgICAgICAgcmFuazogMCwgLy8gdXNlZCBpbiBzZWFyY2gsIHN0YWJsZSBzb3J0IG9yZGVyXG4gICAgICAgIHZhbHVlOiBjaG9pY2UudmFsdWUsXG4gICAgICAgIGxhYmVsOiBjaG9pY2UubGFiZWwgfHwgY2hvaWNlLnZhbHVlLFxuICAgICAgICBhY3RpdmU6IGNvZXJjZUJvb2woY2hvaWNlLmFjdGl2ZSksXG4gICAgICAgIHNlbGVjdGVkOiBjb2VyY2VCb29sKGNob2ljZS5zZWxlY3RlZCwgZmFsc2UpLFxuICAgICAgICBkaXNhYmxlZDogY29lcmNlQm9vbChjaG9pY2UuZGlzYWJsZWQsIGZhbHNlKSxcbiAgICAgICAgcGxhY2Vob2xkZXI6IGNvZXJjZUJvb2woY2hvaWNlLnBsYWNlaG9sZGVyLCBmYWxzZSksXG4gICAgICAgIGhpZ2hsaWdodGVkOiBmYWxzZSxcbiAgICAgICAgbGFiZWxDbGFzczogc3RyaW5nVG9IdG1sQ2xhc3MoY2hvaWNlLmxhYmVsQ2xhc3MpLFxuICAgICAgICBsYWJlbERlc2NyaXB0aW9uOiBjaG9pY2UubGFiZWxEZXNjcmlwdGlvbixcbiAgICAgICAgY3VzdG9tUHJvcGVydGllczogY2hvaWNlLmN1c3RvbVByb3BlcnRpZXMsXG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIGlzSHRtbElucHV0RWxlbWVudCA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnRhZ05hbWUgPT09ICdJTlBVVCc7IH07XG52YXIgaXNIdG1sU2VsZWN0RWxlbWVudCA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnRhZ05hbWUgPT09ICdTRUxFQ1QnOyB9O1xudmFyIGlzSHRtbE9wdGlvbiA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnRhZ05hbWUgPT09ICdPUFRJT04nOyB9O1xudmFyIGlzSHRtbE9wdGdyb3VwID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUudGFnTmFtZSA9PT0gJ09QVEdST1VQJzsgfTtcblxudmFyIFdyYXBwZWRTZWxlY3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFdyYXBwZWRTZWxlY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gV3JhcHBlZFNlbGVjdChfYSkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IF9hLmVsZW1lbnQsIGNsYXNzTmFtZXMgPSBfYS5jbGFzc05hbWVzLCB0ZW1wbGF0ZSA9IF9hLnRlbXBsYXRlLCBleHRyYWN0UGxhY2Vob2xkZXIgPSBfYS5leHRyYWN0UGxhY2Vob2xkZXI7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHsgZWxlbWVudDogZWxlbWVudCwgY2xhc3NOYW1lczogY2xhc3NOYW1lcyB9KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgICAgICBfdGhpcy5leHRyYWN0UGxhY2Vob2xkZXIgPSBleHRyYWN0UGxhY2Vob2xkZXI7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyYXBwZWRTZWxlY3QucHJvdG90eXBlLCBcInBsYWNlaG9sZGVyT3B0aW9uXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdvcHRpb25bdmFsdWU9XCJcIl0nKSB8fFxuICAgICAgICAgICAgICAgIC8vIEJhY2t3YXJkIGNvbXBhdGliaWxpdHkgbGF5ZXIgZm9yIHRoZSBub24tc3RhbmRhcmQgcGxhY2Vob2xkZXIgYXR0cmlidXRlIHN1cHBvcnRlZCBpbiBvbGRlciB2ZXJzaW9ucy5cbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3Rvcignb3B0aW9uW3BsYWNlaG9sZGVyXScpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFdyYXBwZWRTZWxlY3QucHJvdG90eXBlLmFkZE9wdGlvbnMgPSBmdW5jdGlvbiAoY2hvaWNlcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGNob2ljZXMuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICB2YXIgY2hvaWNlID0gb2JqO1xuICAgICAgICAgICAgaWYgKGNob2ljZS5lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9wdGlvbiA9IF90aGlzLnRlbXBsYXRlKGNob2ljZSk7XG4gICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICAgICAgY2hvaWNlLmVsZW1lbnQgPSBvcHRpb247XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgIH07XG4gICAgV3JhcHBlZFNlbGVjdC5wcm90b3R5cGUub3B0aW9uc0FzQ2hvaWNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGNob2ljZXMgPSBbXTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJzpzY29wZSA+IG9wdGlvbiwgOnNjb3BlID4gb3B0Z3JvdXAnKS5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoaXNIdG1sT3B0aW9uKGUpKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlcy5wdXNoKF90aGlzLl9vcHRpb25Ub0Nob2ljZShlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0h0bWxPcHRncm91cChlKSkge1xuICAgICAgICAgICAgICAgIGNob2ljZXMucHVzaChfdGhpcy5fb3B0Z3JvdXBUb0Nob2ljZShlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0b2RvOiBociBhcyBlbXB0eSBvcHRncm91cCwgcmVxdWlyZXMgZGlzcGxheWluZyBlbXB0eSBvcHQtZ3JvdXBzIHRvIGJlIHVzZWZ1bFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNob2ljZXM7XG4gICAgfTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICAgIFdyYXBwZWRTZWxlY3QucHJvdG90eXBlLl9vcHRpb25Ub0Nob2ljZSA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgICAgLy8gb3B0aW9uLnZhbHVlIHJldHVybnMgdGhlIGxhYmVsIGlmIHRoZXJlIGlzIG5vIHZhbHVlIGF0dHJpYnV0ZSwgd2hpY2ggY2FuIGJyZWFrIGxlZ2FjeSBwbGFjZWhvbGRlciBhdHRyaWJ1dGUgc3VwcG9ydFxuICAgICAgICBpZiAoIW9wdGlvbi5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykgJiYgb3B0aW9uLmhhc0F0dHJpYnV0ZSgncGxhY2Vob2xkZXInKSkge1xuICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnJyk7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICBncm91cDogbnVsbCxcbiAgICAgICAgICAgIHNjb3JlOiAwLFxuICAgICAgICAgICAgcmFuazogMCxcbiAgICAgICAgICAgIHZhbHVlOiBvcHRpb24udmFsdWUsXG4gICAgICAgICAgICBsYWJlbDogb3B0aW9uLmlubmVyVGV4dCwgLy8gSFRNTCBvcHRpb25zIGRvIG5vdCBzdXBwb3J0IG1vc3QgaHRtbCB0YWdzLCBidXQgaW5uZXJIdG1sIHdpbGwgZXh0cmFjdCBodG1sIGNvbW1lbnRzLi4uXG4gICAgICAgICAgICBlbGVtZW50OiBvcHRpb24sXG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICAvLyB0aGlzIHJldHVybnMgdHJ1ZSBpZiBub3RoaW5nIGlzIHNlbGVjdGVkIG9uIGluaXRpYWwgbG9hZCwgd2hpY2ggd2lsbCBicmVhayBwbGFjZWhvbGRlciBzdXBwb3J0XG4gICAgICAgICAgICBzZWxlY3RlZDogdGhpcy5leHRyYWN0UGxhY2Vob2xkZXIgPyBvcHRpb24uc2VsZWN0ZWQgOiBvcHRpb24uaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IG9wdGlvbi5kaXNhYmxlZCxcbiAgICAgICAgICAgIGhpZ2hsaWdodGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLmV4dHJhY3RQbGFjZWhvbGRlciAmJiAoIW9wdGlvbi52YWx1ZSB8fCBvcHRpb24uaGFzQXR0cmlidXRlKCdwbGFjZWhvbGRlcicpKSxcbiAgICAgICAgICAgIGxhYmVsQ2xhc3M6IHR5cGVvZiBvcHRpb24uZGF0YXNldC5sYWJlbENsYXNzICE9PSAndW5kZWZpbmVkJyA/IHN0cmluZ1RvSHRtbENsYXNzKG9wdGlvbi5kYXRhc2V0LmxhYmVsQ2xhc3MpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgbGFiZWxEZXNjcmlwdGlvbjogdHlwZW9mIG9wdGlvbi5kYXRhc2V0LmxhYmVsRGVzY3JpcHRpb24gIT09ICd1bmRlZmluZWQnID8gb3B0aW9uLmRhdGFzZXQubGFiZWxEZXNjcmlwdGlvbiA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGN1c3RvbVByb3BlcnRpZXM6IHBhcnNlQ3VzdG9tUHJvcGVydGllcyhvcHRpb24uZGF0YXNldC5jdXN0b21Qcm9wZXJ0aWVzKSxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFdyYXBwZWRTZWxlY3QucHJvdG90eXBlLl9vcHRncm91cFRvQ2hvaWNlID0gZnVuY3Rpb24gKG9wdGdyb3VwKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBvcHRpb25zID0gb3B0Z3JvdXAucXVlcnlTZWxlY3RvckFsbCgnb3B0aW9uJyk7XG4gICAgICAgIHZhciBjaG9pY2VzID0gQXJyYXkuZnJvbShvcHRpb25zKS5tYXAoZnVuY3Rpb24gKG9wdGlvbikgeyByZXR1cm4gX3RoaXMuX29wdGlvblRvQ2hvaWNlKG9wdGlvbik7IH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICBsYWJlbDogb3B0Z3JvdXAubGFiZWwgfHwgJycsXG4gICAgICAgICAgICBlbGVtZW50OiBvcHRncm91cCxcbiAgICAgICAgICAgIGFjdGl2ZTogISFjaG9pY2VzLmxlbmd0aCxcbiAgICAgICAgICAgIGRpc2FibGVkOiBvcHRncm91cC5kaXNhYmxlZCxcbiAgICAgICAgICAgIGNob2ljZXM6IGNob2ljZXMsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gV3JhcHBlZFNlbGVjdDtcbn0oV3JhcHBlZEVsZW1lbnQpKTtcblxudmFyIERFRkFVTFRfQ0xBU1NOQU1FUyA9IHtcbiAgICBjb250YWluZXJPdXRlcjogWydjaG9pY2VzJ10sXG4gICAgY29udGFpbmVySW5uZXI6IFsnY2hvaWNlc19faW5uZXInXSxcbiAgICBpbnB1dDogWydjaG9pY2VzX19pbnB1dCddLFxuICAgIGlucHV0Q2xvbmVkOiBbJ2Nob2ljZXNfX2lucHV0LS1jbG9uZWQnXSxcbiAgICBsaXN0OiBbJ2Nob2ljZXNfX2xpc3QnXSxcbiAgICBsaXN0SXRlbXM6IFsnY2hvaWNlc19fbGlzdC0tbXVsdGlwbGUnXSxcbiAgICBsaXN0U2luZ2xlOiBbJ2Nob2ljZXNfX2xpc3QtLXNpbmdsZSddLFxuICAgIGxpc3REcm9wZG93bjogWydjaG9pY2VzX19saXN0LS1kcm9wZG93biddLFxuICAgIGl0ZW06IFsnY2hvaWNlc19faXRlbSddLFxuICAgIGl0ZW1TZWxlY3RhYmxlOiBbJ2Nob2ljZXNfX2l0ZW0tLXNlbGVjdGFibGUnXSxcbiAgICBpdGVtRGlzYWJsZWQ6IFsnY2hvaWNlc19faXRlbS0tZGlzYWJsZWQnXSxcbiAgICBpdGVtQ2hvaWNlOiBbJ2Nob2ljZXNfX2l0ZW0tLWNob2ljZSddLFxuICAgIGRlc2NyaXB0aW9uOiBbJ2Nob2ljZXNfX2Rlc2NyaXB0aW9uJ10sXG4gICAgcGxhY2Vob2xkZXI6IFsnY2hvaWNlc19fcGxhY2Vob2xkZXInXSxcbiAgICBncm91cDogWydjaG9pY2VzX19ncm91cCddLFxuICAgIGdyb3VwSGVhZGluZzogWydjaG9pY2VzX19oZWFkaW5nJ10sXG4gICAgYnV0dG9uOiBbJ2Nob2ljZXNfX2J1dHRvbiddLFxuICAgIGFjdGl2ZVN0YXRlOiBbJ2lzLWFjdGl2ZSddLFxuICAgIGZvY3VzU3RhdGU6IFsnaXMtZm9jdXNlZCddLFxuICAgIG9wZW5TdGF0ZTogWydpcy1vcGVuJ10sXG4gICAgZGlzYWJsZWRTdGF0ZTogWydpcy1kaXNhYmxlZCddLFxuICAgIGhpZ2hsaWdodGVkU3RhdGU6IFsnaXMtaGlnaGxpZ2h0ZWQnXSxcbiAgICBzZWxlY3RlZFN0YXRlOiBbJ2lzLXNlbGVjdGVkJ10sXG4gICAgZmxpcHBlZFN0YXRlOiBbJ2lzLWZsaXBwZWQnXSxcbiAgICBsb2FkaW5nU3RhdGU6IFsnaXMtbG9hZGluZyddLFxuICAgIG5vdGljZTogWydjaG9pY2VzX19ub3RpY2UnXSxcbiAgICBhZGRDaG9pY2U6IFsnY2hvaWNlc19faXRlbS0tc2VsZWN0YWJsZScsICdhZGQtY2hvaWNlJ10sXG4gICAgbm9SZXN1bHRzOiBbJ2hhcy1uby1yZXN1bHRzJ10sXG4gICAgbm9DaG9pY2VzOiBbJ2hhcy1uby1jaG9pY2VzJ10sXG59O1xudmFyIERFRkFVTFRfQ09ORklHID0ge1xuICAgIGl0ZW1zOiBbXSxcbiAgICBjaG9pY2VzOiBbXSxcbiAgICBzaWxlbnQ6IGZhbHNlLFxuICAgIHJlbmRlckNob2ljZUxpbWl0OiAtMSxcbiAgICBtYXhJdGVtQ291bnQ6IC0xLFxuICAgIGNsb3NlRHJvcGRvd25PblNlbGVjdDogJ2F1dG8nLFxuICAgIHNpbmdsZU1vZGVGb3JNdWx0aVNlbGVjdDogZmFsc2UsXG4gICAgYWRkQ2hvaWNlczogZmFsc2UsXG4gICAgYWRkSXRlbXM6IHRydWUsXG4gICAgYWRkSXRlbUZpbHRlcjogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiAhIXZhbHVlICYmIHZhbHVlICE9PSAnJzsgfSxcbiAgICByZW1vdmVJdGVtczogdHJ1ZSxcbiAgICByZW1vdmVJdGVtQnV0dG9uOiBmYWxzZSxcbiAgICByZW1vdmVJdGVtQnV0dG9uQWxpZ25MZWZ0OiBmYWxzZSxcbiAgICBlZGl0SXRlbXM6IGZhbHNlLFxuICAgIGFsbG93SFRNTDogZmFsc2UsXG4gICAgYWxsb3dIdG1sVXNlcklucHV0OiBmYWxzZSxcbiAgICBkdXBsaWNhdGVJdGVtc0FsbG93ZWQ6IHRydWUsXG4gICAgZGVsaW1pdGVyOiAnLCcsXG4gICAgcGFzdGU6IHRydWUsXG4gICAgc2VhcmNoRW5hYmxlZDogdHJ1ZSxcbiAgICBzZWFyY2hDaG9pY2VzOiB0cnVlLFxuICAgIHNlYXJjaEZsb29yOiAxLFxuICAgIHNlYXJjaFJlc3VsdExpbWl0OiA0LFxuICAgIHNlYXJjaEZpZWxkczogWydsYWJlbCcsICd2YWx1ZSddLFxuICAgIHBvc2l0aW9uOiAnYXV0bycsXG4gICAgcmVzZXRTY3JvbGxQb3NpdGlvbjogdHJ1ZSxcbiAgICBzaG91bGRTb3J0OiB0cnVlLFxuICAgIHNob3VsZFNvcnRJdGVtczogZmFsc2UsXG4gICAgc29ydGVyOiBzb3J0QnlBbHBoYSxcbiAgICBzaGFkb3dSb290OiBudWxsLFxuICAgIHBsYWNlaG9sZGVyOiB0cnVlLFxuICAgIHBsYWNlaG9sZGVyVmFsdWU6IG51bGwsXG4gICAgc2VhcmNoUGxhY2Vob2xkZXJWYWx1ZTogbnVsbCxcbiAgICBwcmVwZW5kVmFsdWU6IG51bGwsXG4gICAgYXBwZW5kVmFsdWU6IG51bGwsXG4gICAgcmVuZGVyU2VsZWN0ZWRDaG9pY2VzOiAnYXV0bycsXG4gICAgbG9hZGluZ1RleHQ6ICdMb2FkaW5nLi4uJyxcbiAgICBub1Jlc3VsdHNUZXh0OiAnTm8gcmVzdWx0cyBmb3VuZCcsXG4gICAgbm9DaG9pY2VzVGV4dDogJ05vIGNob2ljZXMgdG8gY2hvb3NlIGZyb20nLFxuICAgIGl0ZW1TZWxlY3RUZXh0OiAnUHJlc3MgdG8gc2VsZWN0JyxcbiAgICB1bmlxdWVJdGVtVGV4dDogJ09ubHkgdW5pcXVlIHZhbHVlcyBjYW4gYmUgYWRkZWQnLFxuICAgIGN1c3RvbUFkZEl0ZW1UZXh0OiAnT25seSB2YWx1ZXMgbWF0Y2hpbmcgc3BlY2lmaWMgY29uZGl0aW9ucyBjYW4gYmUgYWRkZWQnLFxuICAgIGFkZEl0ZW1UZXh0OiBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIFwiUHJlc3MgRW50ZXIgdG8gYWRkIDxiPlxcXCJcIi5jb25jYXQodmFsdWUsIFwiXFxcIjwvYj5cIik7IH0sXG4gICAgcmVtb3ZlSXRlbUljb25UZXh0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBcIlJlbW92ZSBpdGVtXCI7IH0sXG4gICAgcmVtb3ZlSXRlbUxhYmVsVGV4dDogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBcIlJlbW92ZSBpdGVtOiBcIi5jb25jYXQodmFsdWUpOyB9LFxuICAgIG1heEl0ZW1UZXh0OiBmdW5jdGlvbiAobWF4SXRlbUNvdW50KSB7IHJldHVybiBcIk9ubHkgXCIuY29uY2F0KG1heEl0ZW1Db3VudCwgXCIgdmFsdWVzIGNhbiBiZSBhZGRlZFwiKTsgfSxcbiAgICB2YWx1ZUNvbXBhcmVyOiBmdW5jdGlvbiAodmFsdWUxLCB2YWx1ZTIpIHsgcmV0dXJuIHZhbHVlMSA9PT0gdmFsdWUyOyB9LFxuICAgIGZ1c2VPcHRpb25zOiB7XG4gICAgICAgIGluY2x1ZGVTY29yZTogdHJ1ZSxcbiAgICB9LFxuICAgIGxhYmVsSWQ6ICcnLFxuICAgIGNhbGxiYWNrT25Jbml0OiBudWxsLFxuICAgIGNhbGxiYWNrT25DcmVhdGVUZW1wbGF0ZXM6IG51bGwsXG4gICAgY2xhc3NOYW1lczogREVGQVVMVF9DTEFTU05BTUVTLFxuICAgIGFwcGVuZEdyb3VwSW5TZWFyY2g6IGZhbHNlLFxufTtcblxudmFyIHJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIHZhciBpdGVtRWwgPSBpdGVtLml0ZW1FbDtcbiAgICBpZiAoaXRlbUVsKSB7XG4gICAgICAgIGl0ZW1FbC5yZW1vdmUoKTtcbiAgICAgICAgaXRlbS5pdGVtRWwgPSB1bmRlZmluZWQ7XG4gICAgfVxufTtcbmZ1bmN0aW9uIGl0ZW1zKHMsIGFjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IHM7XG4gICAgdmFyIHVwZGF0ZSA9IHRydWU7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFjdGlvblR5cGUuQUREX0lURU06IHtcbiAgICAgICAgICAgIGFjdGlvbi5pdGVtLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBlbCA9IGFjdGlvbi5pdGVtLmVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlLnB1c2goYWN0aW9uLml0ZW0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBBY3Rpb25UeXBlLlJFTU9WRV9JVEVNOiB7XG4gICAgICAgICAgICBhY3Rpb24uaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGVsID0gYWN0aW9uLml0ZW0uZWxlbWVudDtcbiAgICAgICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgICAgIGVsLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIC8vIEZvciBhIHNlbGVjdC1vbmUsIGlmIGFsbCBvcHRpb25zIGFyZSBkZXNlbGVjdGVkLCB0aGUgZmlyc3QgaXRlbSBpcyBzZWxlY3RlZC4gVG8gc2V0IGEgYmxhY2sgdmFsdWUsIHNlbGVjdC52YWx1ZSBuZWVkcyB0byBiZSBzZXRcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ID0gZWwucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ICYmIGlzSHRtbFNlbGVjdEVsZW1lbnQoc2VsZWN0KSAmJiBzZWxlY3QudHlwZSA9PT0gUGFzc2VkRWxlbWVudFR5cGVzLlNlbGVjdE9uZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3QudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0aGlzIGlzIG1peGluZyBjb25jZXJucywgYnV0IHRoaXMgaXMgKnNvIG11Y2ggZmFzdGVyKlxuICAgICAgICAgICAgcmVtb3ZlSXRlbShhY3Rpb24uaXRlbSk7XG4gICAgICAgICAgICBzdGF0ZSA9IHN0YXRlLmZpbHRlcihmdW5jdGlvbiAoY2hvaWNlKSB7IHJldHVybiBjaG9pY2UuaWQgIT09IGFjdGlvbi5pdGVtLmlkOyB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQWN0aW9uVHlwZS5SRU1PVkVfQ0hPSUNFOiB7XG4gICAgICAgICAgICByZW1vdmVJdGVtKGFjdGlvbi5jaG9pY2UpO1xuICAgICAgICAgICAgc3RhdGUgPSBzdGF0ZS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0uaWQgIT09IGFjdGlvbi5jaG9pY2UuaWQ7IH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBBY3Rpb25UeXBlLkhJR0hMSUdIVF9JVEVNOiB7XG4gICAgICAgICAgICB2YXIgaGlnaGxpZ2h0ZWQgPSBhY3Rpb24uaGlnaGxpZ2h0ZWQ7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHN0YXRlLmZpbmQoZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqLmlkID09PSBhY3Rpb24uaXRlbS5pZDsgfSk7XG4gICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLmhpZ2hsaWdodGVkICE9PSBoaWdobGlnaHRlZCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uaGlnaGxpZ2h0ZWQgPSBoaWdobGlnaHRlZDtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDbGFzc0xpc3QoaXRlbSwgaGlnaGxpZ2h0ZWQgPyBjb250ZXh0LmNsYXNzTmFtZXMuaGlnaGxpZ2h0ZWRTdGF0ZSA6IGNvbnRleHQuY2xhc3NOYW1lcy5zZWxlY3RlZFN0YXRlLCBoaWdobGlnaHRlZCA/IGNvbnRleHQuY2xhc3NOYW1lcy5zZWxlY3RlZFN0YXRlIDogY29udGV4dC5jbGFzc05hbWVzLmhpZ2hsaWdodGVkU3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIHVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgc3RhdGU6IHN0YXRlLCB1cGRhdGU6IHVwZGF0ZSB9O1xufVxuXG5mdW5jdGlvbiBncm91cHMocywgYWN0aW9uKSB7XG4gICAgdmFyIHN0YXRlID0gcztcbiAgICB2YXIgdXBkYXRlID0gdHJ1ZTtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQWN0aW9uVHlwZS5BRERfR1JPVVA6IHtcbiAgICAgICAgICAgIHN0YXRlLnB1c2goYWN0aW9uLmdyb3VwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQWN0aW9uVHlwZS5DTEVBUl9DSE9JQ0VTOiB7XG4gICAgICAgICAgICBzdGF0ZSA9IFtdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgdXBkYXRlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBzdGF0ZTogc3RhdGUsIHVwZGF0ZTogdXBkYXRlIH07XG59XG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5mdW5jdGlvbiBjaG9pY2VzKHMsIGFjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IHM7XG4gICAgdmFyIHVwZGF0ZSA9IHRydWU7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFjdGlvblR5cGUuQUREX0NIT0lDRToge1xuICAgICAgICAgICAgc3RhdGUucHVzaChhY3Rpb24uY2hvaWNlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQWN0aW9uVHlwZS5SRU1PVkVfQ0hPSUNFOiB7XG4gICAgICAgICAgICBhY3Rpb24uY2hvaWNlLmNob2ljZUVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGFjdGlvbi5jaG9pY2UuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24uY2hvaWNlLmdyb3VwLmNob2ljZXMgPSBhY3Rpb24uY2hvaWNlLmdyb3VwLmNob2ljZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iai5pZCAhPT0gYWN0aW9uLmNob2ljZS5pZDsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0ZSA9IHN0YXRlLmZpbHRlcihmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmouaWQgIT09IGFjdGlvbi5jaG9pY2UuaWQ7IH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBBY3Rpb25UeXBlLkFERF9JVEVNOlxuICAgICAgICBjYXNlIEFjdGlvblR5cGUuUkVNT1ZFX0lURU06IHtcbiAgICAgICAgICAgIGFjdGlvbi5pdGVtLmNob2ljZUVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBBY3Rpb25UeXBlLkZJTFRFUl9DSE9JQ0VTOiB7XG4gICAgICAgICAgICAvLyBhdm9pZCBPKG5eMikgYWxnb3JpdGhtIGNvbXBsZXhpdHkgd2hlbiBzZWFyY2hpbmcvZmlsdGVyaW5nIGNob2ljZXNcbiAgICAgICAgICAgIHZhciBzY29yZUxvb2t1cF8xID0gW107XG4gICAgICAgICAgICBhY3Rpb24ucmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBzY29yZUxvb2t1cF8xW3Jlc3VsdC5pdGVtLmlkXSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RhdGUuZm9yRWFjaChmdW5jdGlvbiAoY2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNjb3JlTG9va3VwXzFbY2hvaWNlLmlkXTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlLnNjb3JlID0gcmVzdWx0LnNjb3JlO1xuICAgICAgICAgICAgICAgICAgICBjaG9pY2UucmFuayA9IHJlc3VsdC5yYW5rO1xuICAgICAgICAgICAgICAgICAgICBjaG9pY2UuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZS5zY29yZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZS5yYW5rID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0LmFwcGVuZEdyb3VwSW5TZWFyY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlLmNob2ljZUVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBBY3Rpb25UeXBlLkFDVElWQVRFX0NIT0lDRVM6IHtcbiAgICAgICAgICAgIHN0YXRlLmZvckVhY2goZnVuY3Rpb24gKGNob2ljZSkge1xuICAgICAgICAgICAgICAgIGNob2ljZS5hY3RpdmUgPSBhY3Rpb24uYWN0aXZlO1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuYXBwZW5kR3JvdXBJblNlYXJjaCkge1xuICAgICAgICAgICAgICAgICAgICBjaG9pY2UuY2hvaWNlRWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEFjdGlvblR5cGUuQ0xFQVJfQ0hPSUNFUzoge1xuICAgICAgICAgICAgc3RhdGUgPSBbXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIHVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgc3RhdGU6IHN0YXRlLCB1cGRhdGU6IHVwZGF0ZSB9O1xufVxuXG52YXIgcmVkdWNlcnMgPSB7XG4gICAgZ3JvdXBzOiBncm91cHMsXG4gICAgaXRlbXM6IGl0ZW1zLFxuICAgIGNob2ljZXM6IGNob2ljZXMsXG59O1xudmFyIFN0b3JlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN0b3JlKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLmRlZmF1bHRTdGF0ZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW107XG4gICAgICAgIHRoaXMuX3R4biA9IDA7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RvcmUucHJvdG90eXBlLCBcImRlZmF1bHRTdGF0ZVwiLCB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBncm91cHM6IFtdLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgICAgICBjaG9pY2VzOiBbXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICAgIFN0b3JlLnByb3RvdHlwZS5jaGFuZ2VTZXQgPSBmdW5jdGlvbiAoaW5pdCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ3JvdXBzOiBpbml0LFxuICAgICAgICAgICAgaXRlbXM6IGluaXQsXG4gICAgICAgICAgICBjaG9pY2VzOiBpbml0LFxuICAgICAgICB9O1xuICAgIH07XG4gICAgU3RvcmUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuZGVmYXVsdFN0YXRlO1xuICAgICAgICB2YXIgY2hhbmdlcyA9IHRoaXMuY2hhbmdlU2V0KHRydWUpO1xuICAgICAgICBpZiAodGhpcy5fdHhuKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VTZXQgPSBjaGFuZ2VzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGwpIHsgcmV0dXJuIGwoY2hhbmdlcyk7IH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdG9yZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9uQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKG9uQ2hhbmdlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTdG9yZS5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xuICAgICAgICB2YXIgaGFzQ2hhbmdlcyA9IGZhbHNlO1xuICAgICAgICB2YXIgY2hhbmdlcyA9IHRoaXMuX2NoYW5nZVNldCB8fCB0aGlzLmNoYW5nZVNldChmYWxzZSk7XG4gICAgICAgIE9iamVjdC5rZXlzKHJlZHVjZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZVVwZGF0ZSA9IHJlZHVjZXJzW2tleV0oc3RhdGVba2V5XSwgYWN0aW9uLCBfdGhpcy5fY29udGV4dCk7XG4gICAgICAgICAgICBpZiAoc3RhdGVVcGRhdGUudXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgaGFzQ2hhbmdlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2hhbmdlc1trZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzdGF0ZVtrZXldID0gc3RhdGVVcGRhdGUuc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaGFzQ2hhbmdlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3R4bikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZVNldCA9IGNoYW5nZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobCkgeyByZXR1cm4gbChjaGFuZ2VzKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN0b3JlLnByb3RvdHlwZS53aXRoVHhuID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgdGhpcy5fdHhuKys7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmdW5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLl90eG4gPSBNYXRoLm1heCgwLCB0aGlzLl90eG4gLSAxKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fdHhuKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoYW5nZVNldF8xID0gdGhpcy5fY2hhbmdlU2V0O1xuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VTZXRfMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VTZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsKSB7IHJldHVybiBsKGNoYW5nZVNldF8xKTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RvcmUucHJvdG90eXBlLCBcInN0YXRlXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBzdG9yZSBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0b3JlLnByb3RvdHlwZSwgXCJpdGVtc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgaXRlbXMgZnJvbSBzdG9yZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pdGVtcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdG9yZS5wcm90b3R5cGUsIFwiaGlnaGxpZ2h0ZWRBY3RpdmVJdGVtc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgaGlnaGxpZ2h0ZWQgaXRlbXMgZnJvbSBzdG9yZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuICFpdGVtLmRpc2FibGVkICYmIGl0ZW0uYWN0aXZlICYmIGl0ZW0uaGlnaGxpZ2h0ZWQ7IH0pO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0b3JlLnByb3RvdHlwZSwgXCJjaG9pY2VzXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBjaG9pY2VzIGZyb20gc3RvcmVcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuY2hvaWNlcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdG9yZS5wcm90b3R5cGUsIFwiYWN0aXZlQ2hvaWNlc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYWN0aXZlIGNob2ljZXMgZnJvbSBzdG9yZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaG9pY2VzLmZpbHRlcihmdW5jdGlvbiAoY2hvaWNlKSB7IHJldHVybiBjaG9pY2UuYWN0aXZlOyB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdG9yZS5wcm90b3R5cGUsIFwic2VhcmNoYWJsZUNob2ljZXNcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGNob2ljZXMgdGhhdCBjYW4gYmUgc2VhcmNoZWQgKGV4Y2x1ZGluZyBwbGFjZWhvbGRlcnMpXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNob2ljZXMuZmlsdGVyKGZ1bmN0aW9uIChjaG9pY2UpIHsgcmV0dXJuICFjaG9pY2UuZGlzYWJsZWQgJiYgIWNob2ljZS5wbGFjZWhvbGRlcjsgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RvcmUucHJvdG90eXBlLCBcImdyb3Vwc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgZ3JvdXBzIGZyb20gc3RvcmVcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZ3JvdXBzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0b3JlLnByb3RvdHlwZSwgXCJhY3RpdmVHcm91cHNcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGFjdGl2ZSBncm91cHMgZnJvbSBzdG9yZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZ3JvdXBzLmZpbHRlcihmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNBY3RpdmUgPSBncm91cC5hY3RpdmUgJiYgIWdyb3VwLmRpc2FibGVkO1xuICAgICAgICAgICAgICAgIHZhciBoYXNBY3RpdmVPcHRpb25zID0gX3RoaXMuc3RhdGUuY2hvaWNlcy5zb21lKGZ1bmN0aW9uIChjaG9pY2UpIHsgcmV0dXJuIGNob2ljZS5hY3RpdmUgJiYgIWNob2ljZS5kaXNhYmxlZDsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzQWN0aXZlICYmIGhhc0FjdGl2ZU9wdGlvbnM7XG4gICAgICAgICAgICB9LCBbXSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBTdG9yZS5wcm90b3R5cGUuaW5UeG4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eG4gPiAwO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNpbmdsZSBjaG9pY2UgYnkgaXQncyBJRFxuICAgICAqL1xuICAgIFN0b3JlLnByb3RvdHlwZS5nZXRDaG9pY2VCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUNob2ljZXMuZmluZChmdW5jdGlvbiAoY2hvaWNlKSB7IHJldHVybiBjaG9pY2UuaWQgPT09IGlkOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBncm91cCBieSBncm91cCBpZFxuICAgICAqL1xuICAgIFN0b3JlLnByb3RvdHlwZS5nZXRHcm91cEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBzLmZpbmQoZnVuY3Rpb24gKGdyb3VwKSB7IHJldHVybiBncm91cC5pZCA9PT0gaWQ7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFN0b3JlO1xufSgpKTtcblxudmFyIE5vdGljZVR5cGVzID0ge1xuICAgIG5vQ2hvaWNlczogJ25vLWNob2ljZXMnLFxuICAgIG5vUmVzdWx0czogJ25vLXJlc3VsdHMnLFxuICAgIGFkZENob2ljZTogJ2FkZC1jaG9pY2UnLFxuICAgIGdlbmVyaWM6ICcnLFxufTtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KGUsIHIsIHQpIHtcbiAgcmV0dXJuIChyID0gX3RvUHJvcGVydHlLZXkocikpIGluIGUgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwge1xuICAgIHZhbHVlOiB0LFxuICAgIGVudW1lcmFibGU6ICEwLFxuICAgIGNvbmZpZ3VyYWJsZTogITAsXG4gICAgd3JpdGFibGU6ICEwXG4gIH0pIDogZVtyXSA9IHQsIGU7XG59XG5mdW5jdGlvbiBvd25LZXlzKGUsIHIpIHtcbiAgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTtcbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgbyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7XG4gICAgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCByKS5lbnVtZXJhYmxlO1xuICAgIH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pO1xuICB9XG4gIHJldHVybiB0O1xufVxuZnVuY3Rpb24gX29iamVjdFNwcmVhZDIoZSkge1xuICBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykge1xuICAgIHZhciB0ID0gbnVsbCAhPSBhcmd1bWVudHNbcl0gPyBhcmd1bWVudHNbcl0gOiB7fTtcbiAgICByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikge1xuICAgICAgX2RlZmluZVByb3BlcnR5KGUsIHIsIHRbcl0pO1xuICAgIH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCwgcikpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBlO1xufVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHtcbiAgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIHQgfHwgIXQpIHJldHVybiB0O1xuICB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHZvaWQgMCAhPT0gZSkge1xuICAgIHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7XG4gIH1cbiAgcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTtcbn1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KHQpIHtcbiAgdmFyIGkgPSBfdG9QcmltaXRpdmUodCwgXCJzdHJpbmdcIik7XG4gIHJldHVybiBcInN5bWJvbFwiID09IHR5cGVvZiBpID8gaSA6IGkgKyBcIlwiO1xufVxuXG4vKipcbiAqIEZ1c2UuanMgdjcuMC4wIC0gTGlnaHR3ZWlnaHQgZnV6enktc2VhcmNoIChodHRwOi8vZnVzZWpzLmlvKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyMyBLaXJvIFJpc2sgKGh0dHA6Ly9raXJvLm1lKVxuICogQWxsIFJpZ2h0cyBSZXNlcnZlZC4gQXBhY2hlIFNvZnR3YXJlIExpY2Vuc2UgMi4wXG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKi9cblxuZnVuY3Rpb24gaXNBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gIUFycmF5LmlzQXJyYXkgPyBnZXRUYWcodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nIDogQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi9tYXN0ZXIvLmludGVybmFsL2Jhc2VUb1N0cmluZy5qc1xuY29uc3QgSU5GSU5JVFkgPSAxIC8gMDtcbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGxldCByZXN1bHQgPSB2YWx1ZSArICcnO1xuICByZXR1cm4gcmVzdWx0ID09ICcwJyAmJiAxIC8gdmFsdWUgPT0gLUlORklOSVRZID8gJy0wJyA6IHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG59XG5mdW5jdGlvbiBpc051bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbn1cblxuLy8gQWRhcHRlZCBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vbG9kYXNoL2xvZGFzaC9ibG9iL21hc3Rlci9pc0Jvb2xlYW4uanNcbmZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlIHx8IGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgZ2V0VGFnKHZhbHVlKSA9PSAnW29iamVjdCBCb29sZWFuXSc7XG59XG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jztcbn1cblxuLy8gQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSAmJiB2YWx1ZSAhPT0gbnVsbDtcbn1cbmZ1bmN0aW9uIGlzRGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbDtcbn1cbmZ1bmN0aW9uIGlzQmxhbmsodmFsdWUpIHtcbiAgcmV0dXJuICF2YWx1ZS50cmltKCkubGVuZ3RoO1xufVxuXG4vLyBHZXRzIHRoZSBgdG9TdHJpbmdUYWdgIG9mIGB2YWx1ZWAuXG4vLyBBZGFwdGVkIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvbWFzdGVyLy5pbnRlcm5hbC9nZXRUYWcuanNcbmZ1bmN0aW9uIGdldFRhZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IHZhbHVlID09PSB1bmRlZmluZWQgPyAnW29iamVjdCBVbmRlZmluZWRdJyA6ICdbb2JqZWN0IE51bGxdJyA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5jb25zdCBFWFRFTkRFRF9TRUFSQ0hfVU5BVkFJTEFCTEUgPSAnRXh0ZW5kZWQgc2VhcmNoIGlzIG5vdCBhdmFpbGFibGUnO1xuY29uc3QgSU5DT1JSRUNUX0lOREVYX1RZUEUgPSBcIkluY29ycmVjdCAnaW5kZXgnIHR5cGVcIjtcbmNvbnN0IExPR0lDQUxfU0VBUkNIX0lOVkFMSURfUVVFUllfRk9SX0tFWSA9IGtleSA9PiBgSW52YWxpZCB2YWx1ZSBmb3Iga2V5ICR7a2V5fWA7XG5jb25zdCBQQVRURVJOX0xFTkdUSF9UT09fTEFSR0UgPSBtYXggPT4gYFBhdHRlcm4gbGVuZ3RoIGV4Y2VlZHMgbWF4IG9mICR7bWF4fS5gO1xuY29uc3QgTUlTU0lOR19LRVlfUFJPUEVSVFkgPSBuYW1lID0+IGBNaXNzaW5nICR7bmFtZX0gcHJvcGVydHkgaW4ga2V5YDtcbmNvbnN0IElOVkFMSURfS0VZX1dFSUdIVF9WQUxVRSA9IGtleSA9PiBgUHJvcGVydHkgJ3dlaWdodCcgaW4ga2V5ICcke2tleX0nIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyYDtcbmNvbnN0IGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5jbGFzcyBLZXlTdG9yZSB7XG4gIGNvbnN0cnVjdG9yKGtleXMpIHtcbiAgICB0aGlzLl9rZXlzID0gW107XG4gICAgdGhpcy5fa2V5TWFwID0ge307XG4gICAgbGV0IHRvdGFsV2VpZ2h0ID0gMDtcbiAgICBrZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGxldCBvYmogPSBjcmVhdGVLZXkoa2V5KTtcbiAgICAgIHRoaXMuX2tleXMucHVzaChvYmopO1xuICAgICAgdGhpcy5fa2V5TWFwW29iai5pZF0gPSBvYmo7XG4gICAgICB0b3RhbFdlaWdodCArPSBvYmoud2VpZ2h0O1xuICAgIH0pO1xuXG4gICAgLy8gTm9ybWFsaXplIHdlaWdodHMgc28gdGhhdCB0aGVpciBzdW0gaXMgZXF1YWwgdG8gMVxuICAgIHRoaXMuX2tleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAga2V5LndlaWdodCAvPSB0b3RhbFdlaWdodDtcbiAgICB9KTtcbiAgfVxuICBnZXQoa2V5SWQpIHtcbiAgICByZXR1cm4gdGhpcy5fa2V5TWFwW2tleUlkXTtcbiAgfVxuICBrZXlzKCkge1xuICAgIHJldHVybiB0aGlzLl9rZXlzO1xuICB9XG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5fa2V5cyk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZUtleShrZXkpIHtcbiAgbGV0IHBhdGggPSBudWxsO1xuICBsZXQgaWQgPSBudWxsO1xuICBsZXQgc3JjID0gbnVsbDtcbiAgbGV0IHdlaWdodCA9IDE7XG4gIGxldCBnZXRGbiA9IG51bGw7XG4gIGlmIChpc1N0cmluZyhrZXkpIHx8IGlzQXJyYXkoa2V5KSkge1xuICAgIHNyYyA9IGtleTtcbiAgICBwYXRoID0gY3JlYXRlS2V5UGF0aChrZXkpO1xuICAgIGlkID0gY3JlYXRlS2V5SWQoa2V5KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWhhc093bi5jYWxsKGtleSwgJ25hbWUnKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKE1JU1NJTkdfS0VZX1BST1BFUlRZKCduYW1lJykpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lID0ga2V5Lm5hbWU7XG4gICAgc3JjID0gbmFtZTtcbiAgICBpZiAoaGFzT3duLmNhbGwoa2V5LCAnd2VpZ2h0JykpIHtcbiAgICAgIHdlaWdodCA9IGtleS53ZWlnaHQ7XG4gICAgICBpZiAod2VpZ2h0IDw9IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfS0VZX1dFSUdIVF9WQUxVRShuYW1lKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHBhdGggPSBjcmVhdGVLZXlQYXRoKG5hbWUpO1xuICAgIGlkID0gY3JlYXRlS2V5SWQobmFtZSk7XG4gICAgZ2V0Rm4gPSBrZXkuZ2V0Rm47XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBwYXRoLFxuICAgIGlkLFxuICAgIHdlaWdodCxcbiAgICBzcmMsXG4gICAgZ2V0Rm5cbiAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUtleVBhdGgoa2V5KSB7XG4gIHJldHVybiBpc0FycmF5KGtleSkgPyBrZXkgOiBrZXkuc3BsaXQoJy4nKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUtleUlkKGtleSkge1xuICByZXR1cm4gaXNBcnJheShrZXkpID8ga2V5LmpvaW4oJy4nKSA6IGtleTtcbn1cbmZ1bmN0aW9uIGdldChvYmosIHBhdGgpIHtcbiAgbGV0IGxpc3QgPSBbXTtcbiAgbGV0IGFyciA9IGZhbHNlO1xuICBjb25zdCBkZWVwR2V0ID0gKG9iaiwgcGF0aCwgaW5kZXgpID0+IHtcbiAgICBpZiAoIWlzRGVmaW5lZChvYmopKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghcGF0aFtpbmRleF0pIHtcbiAgICAgIC8vIElmIHRoZXJlJ3Mgbm8gcGF0aCBsZWZ0LCB3ZSd2ZSBhcnJpdmVkIGF0IHRoZSBvYmplY3Qgd2UgY2FyZSBhYm91dC5cbiAgICAgIGxpc3QucHVzaChvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQga2V5ID0gcGF0aFtpbmRleF07XG4gICAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgaWYgKCFpc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2UncmUgYXQgdGhlIGxhc3QgdmFsdWUgaW4gdGhlIHBhdGgsIGFuZCBpZiBpdCdzIGEgc3RyaW5nL251bWJlci9ib29sLFxuICAgICAgLy8gYWRkIGl0IHRvIHRoZSBsaXN0XG4gICAgICBpZiAoaW5kZXggPT09IHBhdGgubGVuZ3RoIC0gMSAmJiAoaXNTdHJpbmcodmFsdWUpIHx8IGlzTnVtYmVyKHZhbHVlKSB8fCBpc0Jvb2xlYW4odmFsdWUpKSkge1xuICAgICAgICBsaXN0LnB1c2godG9TdHJpbmcodmFsdWUpKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgYXJyID0gdHJ1ZTtcbiAgICAgICAgLy8gU2VhcmNoIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXkuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB2YWx1ZS5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgIGRlZXBHZXQodmFsdWVbaV0sIHBhdGgsIGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGF0aC5sZW5ndGgpIHtcbiAgICAgICAgLy8gQW4gb2JqZWN0LiBSZWN1cnNlIGZ1cnRoZXIuXG4gICAgICAgIGRlZXBHZXQodmFsdWUsIHBhdGgsIGluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IChzaW5jZSBwYXRoIHVzZWQgdG8gYmUgYSBzdHJpbmcpXG4gIGRlZXBHZXQob2JqLCBpc1N0cmluZyhwYXRoKSA/IHBhdGguc3BsaXQoJy4nKSA6IHBhdGgsIDApO1xuICByZXR1cm4gYXJyID8gbGlzdCA6IGxpc3RbMF07XG59XG5jb25zdCBNYXRjaE9wdGlvbnMgPSB7XG4gIC8vIFdoZXRoZXIgdGhlIG1hdGNoZXMgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHRoZSByZXN1bHQgc2V0LiBXaGVuIGB0cnVlYCwgZWFjaCByZWNvcmQgaW4gdGhlIHJlc3VsdFxuICAvLyBzZXQgd2lsbCBpbmNsdWRlIHRoZSBpbmRpY2VzIG9mIHRoZSBtYXRjaGVkIGNoYXJhY3RlcnMuXG4gIC8vIFRoZXNlIGNhbiBjb25zZXF1ZW50bHkgYmUgdXNlZCBmb3IgaGlnaGxpZ2h0aW5nIHB1cnBvc2VzLlxuICBpbmNsdWRlTWF0Y2hlczogZmFsc2UsXG4gIC8vIFdoZW4gYHRydWVgLCB0aGUgbWF0Y2hpbmcgZnVuY3Rpb24gd2lsbCBjb250aW51ZSB0byB0aGUgZW5kIG9mIGEgc2VhcmNoIHBhdHRlcm4gZXZlbiBpZlxuICAvLyBhIHBlcmZlY3QgbWF0Y2ggaGFzIGFscmVhZHkgYmVlbiBsb2NhdGVkIGluIHRoZSBzdHJpbmcuXG4gIGZpbmRBbGxNYXRjaGVzOiBmYWxzZSxcbiAgLy8gTWluaW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGF0IG11c3QgYmUgbWF0Y2hlZCBiZWZvcmUgYSByZXN1bHQgaXMgY29uc2lkZXJlZCBhIG1hdGNoXG4gIG1pbk1hdGNoQ2hhckxlbmd0aDogMVxufTtcbmNvbnN0IEJhc2ljT3B0aW9ucyA9IHtcbiAgLy8gV2hlbiBgdHJ1ZWAsIHRoZSBhbGdvcml0aG0gY29udGludWVzIHNlYXJjaGluZyB0byB0aGUgZW5kIG9mIHRoZSBpbnB1dCBldmVuIGlmIGEgcGVyZmVjdFxuICAvLyBtYXRjaCBpcyBmb3VuZCBiZWZvcmUgdGhlIGVuZCBvZiB0aGUgc2FtZSBpbnB1dC5cbiAgaXNDYXNlU2Vuc2l0aXZlOiBmYWxzZSxcbiAgLy8gV2hlbiB0cnVlLCB0aGUgbWF0Y2hpbmcgZnVuY3Rpb24gd2lsbCBjb250aW51ZSB0byB0aGUgZW5kIG9mIGEgc2VhcmNoIHBhdHRlcm4gZXZlbiBpZlxuICBpbmNsdWRlU2NvcmU6IGZhbHNlLFxuICAvLyBMaXN0IG9mIHByb3BlcnRpZXMgdGhhdCB3aWxsIGJlIHNlYXJjaGVkLiBUaGlzIGFsc28gc3VwcG9ydHMgbmVzdGVkIHByb3BlcnRpZXMuXG4gIGtleXM6IFtdLFxuICAvLyBXaGV0aGVyIHRvIHNvcnQgdGhlIHJlc3VsdCBsaXN0LCBieSBzY29yZVxuICBzaG91bGRTb3J0OiB0cnVlLFxuICAvLyBEZWZhdWx0IHNvcnQgZnVuY3Rpb246IHNvcnQgYnkgYXNjZW5kaW5nIHNjb3JlLCBhc2NlbmRpbmcgaW5kZXhcbiAgc29ydEZuOiAoYSwgYikgPT4gYS5zY29yZSA9PT0gYi5zY29yZSA/IGEuaWR4IDwgYi5pZHggPyAtMSA6IDEgOiBhLnNjb3JlIDwgYi5zY29yZSA/IC0xIDogMVxufTtcbmNvbnN0IEZ1enp5T3B0aW9ucyA9IHtcbiAgLy8gQXBwcm94aW1hdGVseSB3aGVyZSBpbiB0aGUgdGV4dCBpcyB0aGUgcGF0dGVybiBleHBlY3RlZCB0byBiZSBmb3VuZD9cbiAgbG9jYXRpb246IDAsXG4gIC8vIEF0IHdoYXQgcG9pbnQgZG9lcyB0aGUgbWF0Y2ggYWxnb3JpdGhtIGdpdmUgdXAuIEEgdGhyZXNob2xkIG9mICcwLjAnIHJlcXVpcmVzIGEgcGVyZmVjdCBtYXRjaFxuICAvLyAob2YgYm90aCBsZXR0ZXJzIGFuZCBsb2NhdGlvbiksIGEgdGhyZXNob2xkIG9mICcxLjAnIHdvdWxkIG1hdGNoIGFueXRoaW5nLlxuICB0aHJlc2hvbGQ6IDAuNixcbiAgLy8gRGV0ZXJtaW5lcyBob3cgY2xvc2UgdGhlIG1hdGNoIG11c3QgYmUgdG8gdGhlIGZ1enp5IGxvY2F0aW9uIChzcGVjaWZpZWQgYWJvdmUpLlxuICAvLyBBbiBleGFjdCBsZXR0ZXIgbWF0Y2ggd2hpY2ggaXMgJ2Rpc3RhbmNlJyBjaGFyYWN0ZXJzIGF3YXkgZnJvbSB0aGUgZnV6enkgbG9jYXRpb25cbiAgLy8gd291bGQgc2NvcmUgYXMgYSBjb21wbGV0ZSBtaXNtYXRjaC4gQSBkaXN0YW5jZSBvZiAnMCcgcmVxdWlyZXMgdGhlIG1hdGNoIGJlIGF0XG4gIC8vIHRoZSBleGFjdCBsb2NhdGlvbiBzcGVjaWZpZWQsIGEgdGhyZXNob2xkIG9mICcxMDAwJyB3b3VsZCByZXF1aXJlIGEgcGVyZmVjdCBtYXRjaFxuICAvLyB0byBiZSB3aXRoaW4gODAwIGNoYXJhY3RlcnMgb2YgdGhlIGZ1enp5IGxvY2F0aW9uIHRvIGJlIGZvdW5kIHVzaW5nIGEgMC44IHRocmVzaG9sZC5cbiAgZGlzdGFuY2U6IDEwMFxufTtcbmNvbnN0IEFkdmFuY2VkT3B0aW9ucyA9IHtcbiAgLy8gV2hlbiBgdHJ1ZWAsIGl0IGVuYWJsZXMgdGhlIHVzZSBvZiB1bml4LWxpa2Ugc2VhcmNoIGNvbW1hbmRzXG4gIHVzZUV4dGVuZGVkU2VhcmNoOiBmYWxzZSxcbiAgLy8gVGhlIGdldCBmdW5jdGlvbiB0byB1c2Ugd2hlbiBmZXRjaGluZyBhbiBvYmplY3QncyBwcm9wZXJ0aWVzLlxuICAvLyBUaGUgZGVmYXVsdCB3aWxsIHNlYXJjaCBuZXN0ZWQgcGF0aHMgKmllIGZvby5iYXIuYmF6KlxuICBnZXRGbjogZ2V0LFxuICAvLyBXaGVuIGB0cnVlYCwgc2VhcmNoIHdpbGwgaWdub3JlIGBsb2NhdGlvbmAgYW5kIGBkaXN0YW5jZWAsIHNvIGl0IHdvbid0IG1hdHRlclxuICAvLyB3aGVyZSBpbiB0aGUgc3RyaW5nIHRoZSBwYXR0ZXJuIGFwcGVhcnMuXG4gIC8vIE1vcmUgaW5mbzogaHR0cHM6Ly9mdXNlanMuaW8vY29uY2VwdHMvc2NvcmluZy10aGVvcnkuaHRtbCNmdXp6aW5lc3Mtc2NvcmVcbiAgaWdub3JlTG9jYXRpb246IGZhbHNlLFxuICAvLyBXaGVuIGB0cnVlYCwgdGhlIGNhbGN1bGF0aW9uIGZvciB0aGUgcmVsZXZhbmNlIHNjb3JlICh1c2VkIGZvciBzb3J0aW5nKSB3aWxsXG4gIC8vIGlnbm9yZSB0aGUgZmllbGQtbGVuZ3RoIG5vcm0uXG4gIC8vIE1vcmUgaW5mbzogaHR0cHM6Ly9mdXNlanMuaW8vY29uY2VwdHMvc2NvcmluZy10aGVvcnkuaHRtbCNmaWVsZC1sZW5ndGgtbm9ybVxuICBpZ25vcmVGaWVsZE5vcm06IGZhbHNlLFxuICAvLyBUaGUgd2VpZ2h0IHRvIGRldGVybWluZSBob3cgbXVjaCBmaWVsZCBsZW5ndGggbm9ybSBlZmZlY3RzIHNjb3JpbmcuXG4gIGZpZWxkTm9ybVdlaWdodDogMVxufTtcbnZhciBDb25maWcgPSBfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMih7fSwgQmFzaWNPcHRpb25zKSwgTWF0Y2hPcHRpb25zKSwgRnV6enlPcHRpb25zKSwgQWR2YW5jZWRPcHRpb25zKTtcbmNvbnN0IFNQQUNFID0gL1teIF0rL2c7XG5cbi8vIEZpZWxkLWxlbmd0aCBub3JtOiB0aGUgc2hvcnRlciB0aGUgZmllbGQsIHRoZSBoaWdoZXIgdGhlIHdlaWdodC5cbi8vIFNldCB0byAzIGRlY2ltYWxzIHRvIHJlZHVjZSBpbmRleCBzaXplLlxuZnVuY3Rpb24gbm9ybSh3ZWlnaHQgPSAxLCBtYW50aXNzYSA9IDMpIHtcbiAgY29uc3QgY2FjaGUgPSBuZXcgTWFwKCk7XG4gIGNvbnN0IG0gPSBNYXRoLnBvdygxMCwgbWFudGlzc2EpO1xuICByZXR1cm4ge1xuICAgIGdldCh2YWx1ZSkge1xuICAgICAgY29uc3QgbnVtVG9rZW5zID0gdmFsdWUubWF0Y2goU1BBQ0UpLmxlbmd0aDtcbiAgICAgIGlmIChjYWNoZS5oYXMobnVtVG9rZW5zKSkge1xuICAgICAgICByZXR1cm4gY2FjaGUuZ2V0KG51bVRva2Vucyk7XG4gICAgICB9XG5cbiAgICAgIC8vIERlZmF1bHQgZnVuY3Rpb24gaXMgMS9zcXJ0KHgpLCB3ZWlnaHQgbWFrZXMgdGhhdCB2YXJpYWJsZVxuICAgICAgY29uc3Qgbm9ybSA9IDEgLyBNYXRoLnBvdyhudW1Ub2tlbnMsIDAuNSAqIHdlaWdodCk7XG5cbiAgICAgIC8vIEluIHBsYWNlIG9mIGB0b0ZpeGVkKG1hbnRpc3NhKWAsIGZvciBmYXN0ZXIgY29tcHV0YXRpb25cbiAgICAgIGNvbnN0IG4gPSBwYXJzZUZsb2F0KE1hdGgucm91bmQobm9ybSAqIG0pIC8gbSk7XG4gICAgICBjYWNoZS5zZXQobnVtVG9rZW5zLCBuKTtcbiAgICAgIHJldHVybiBuO1xuICAgIH0sXG4gICAgY2xlYXIoKSB7XG4gICAgICBjYWNoZS5jbGVhcigpO1xuICAgIH1cbiAgfTtcbn1cbmNsYXNzIEZ1c2VJbmRleCB7XG4gIGNvbnN0cnVjdG9yKHtcbiAgICBnZXRGbiA9IENvbmZpZy5nZXRGbixcbiAgICBmaWVsZE5vcm1XZWlnaHQgPSBDb25maWcuZmllbGROb3JtV2VpZ2h0XG4gIH0gPSB7fSkge1xuICAgIHRoaXMubm9ybSA9IG5vcm0oZmllbGROb3JtV2VpZ2h0LCAzKTtcbiAgICB0aGlzLmdldEZuID0gZ2V0Rm47XG4gICAgdGhpcy5pc0NyZWF0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNldEluZGV4UmVjb3JkcygpO1xuICB9XG4gIHNldFNvdXJjZXMoZG9jcyA9IFtdKSB7XG4gICAgdGhpcy5kb2NzID0gZG9jcztcbiAgfVxuICBzZXRJbmRleFJlY29yZHMocmVjb3JkcyA9IFtdKSB7XG4gICAgdGhpcy5yZWNvcmRzID0gcmVjb3JkcztcbiAgfVxuICBzZXRLZXlzKGtleXMgPSBbXSkge1xuICAgIHRoaXMua2V5cyA9IGtleXM7XG4gICAgdGhpcy5fa2V5c01hcCA9IHt9O1xuICAgIGtleXMuZm9yRWFjaCgoa2V5LCBpZHgpID0+IHtcbiAgICAgIHRoaXMuX2tleXNNYXBba2V5LmlkXSA9IGlkeDtcbiAgICB9KTtcbiAgfVxuICBjcmVhdGUoKSB7XG4gICAgaWYgKHRoaXMuaXNDcmVhdGVkIHx8ICF0aGlzLmRvY3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaXNDcmVhdGVkID0gdHJ1ZTtcblxuICAgIC8vIExpc3QgaXMgQXJyYXk8U3RyaW5nPlxuICAgIGlmIChpc1N0cmluZyh0aGlzLmRvY3NbMF0pKSB7XG4gICAgICB0aGlzLmRvY3MuZm9yRWFjaCgoZG9jLCBkb2NJbmRleCkgPT4ge1xuICAgICAgICB0aGlzLl9hZGRTdHJpbmcoZG9jLCBkb2NJbmRleCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGlzdCBpcyBBcnJheTxPYmplY3Q+XG4gICAgICB0aGlzLmRvY3MuZm9yRWFjaCgoZG9jLCBkb2NJbmRleCkgPT4ge1xuICAgICAgICB0aGlzLl9hZGRPYmplY3QoZG9jLCBkb2NJbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5ub3JtLmNsZWFyKCk7XG4gIH1cbiAgLy8gQWRkcyBhIGRvYyB0byB0aGUgZW5kIG9mIHRoZSBpbmRleFxuICBhZGQoZG9jKSB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5zaXplKCk7XG4gICAgaWYgKGlzU3RyaW5nKGRvYykpIHtcbiAgICAgIHRoaXMuX2FkZFN0cmluZyhkb2MsIGlkeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FkZE9iamVjdChkb2MsIGlkeCk7XG4gICAgfVxuICB9XG4gIC8vIFJlbW92ZXMgdGhlIGRvYyBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IG9mIHRoZSBpbmRleFxuICByZW1vdmVBdChpZHgpIHtcbiAgICB0aGlzLnJlY29yZHMuc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAvLyBDaGFuZ2UgcmVmIGluZGV4IG9mIGV2ZXJ5IHN1YnNxdWVudCBkb2NcbiAgICBmb3IgKGxldCBpID0gaWR4LCBsZW4gPSB0aGlzLnNpemUoKTsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICB0aGlzLnJlY29yZHNbaV0uaSAtPSAxO1xuICAgIH1cbiAgfVxuICBnZXRWYWx1ZUZvckl0ZW1BdEtleUlkKGl0ZW0sIGtleUlkKSB7XG4gICAgcmV0dXJuIGl0ZW1bdGhpcy5fa2V5c01hcFtrZXlJZF1dO1xuICB9XG4gIHNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVjb3Jkcy5sZW5ndGg7XG4gIH1cbiAgX2FkZFN0cmluZyhkb2MsIGRvY0luZGV4KSB7XG4gICAgaWYgKCFpc0RlZmluZWQoZG9jKSB8fCBpc0JsYW5rKGRvYykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHJlY29yZCA9IHtcbiAgICAgIHY6IGRvYyxcbiAgICAgIGk6IGRvY0luZGV4LFxuICAgICAgbjogdGhpcy5ub3JtLmdldChkb2MpXG4gICAgfTtcbiAgICB0aGlzLnJlY29yZHMucHVzaChyZWNvcmQpO1xuICB9XG4gIF9hZGRPYmplY3QoZG9jLCBkb2NJbmRleCkge1xuICAgIGxldCByZWNvcmQgPSB7XG4gICAgICBpOiBkb2NJbmRleCxcbiAgICAgICQ6IHt9XG4gICAgfTtcblxuICAgIC8vIEl0ZXJhdGUgb3ZlciBldmVyeSBrZXkgKGkuZSwgcGF0aCksIGFuZCBmZXRjaCB0aGUgdmFsdWUgYXQgdGhhdCBrZXlcbiAgICB0aGlzLmtleXMuZm9yRWFjaCgoa2V5LCBrZXlJbmRleCkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0ga2V5LmdldEZuID8ga2V5LmdldEZuKGRvYykgOiB0aGlzLmdldEZuKGRvYywga2V5LnBhdGgpO1xuICAgICAgaWYgKCFpc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBsZXQgc3ViUmVjb3JkcyA9IFtdO1xuICAgICAgICBjb25zdCBzdGFjayA9IFt7XG4gICAgICAgICAgbmVzdGVkQXJySW5kZXg6IC0xLFxuICAgICAgICAgIHZhbHVlXG4gICAgICAgIH1dO1xuICAgICAgICB3aGlsZSAoc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgbmVzdGVkQXJySW5kZXgsXG4gICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgIH0gPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICBpZiAoIWlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNTdHJpbmcodmFsdWUpICYmICFpc0JsYW5rKHZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IHN1YlJlY29yZCA9IHtcbiAgICAgICAgICAgICAgdjogdmFsdWUsXG4gICAgICAgICAgICAgIGk6IG5lc3RlZEFyckluZGV4LFxuICAgICAgICAgICAgICBuOiB0aGlzLm5vcm0uZ2V0KHZhbHVlKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN1YlJlY29yZHMucHVzaChzdWJSZWNvcmQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKGl0ZW0sIGspID0+IHtcbiAgICAgICAgICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgICAgICAgICAgbmVzdGVkQXJySW5kZXg6IGssXG4gICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2UgO1xuICAgICAgICB9XG4gICAgICAgIHJlY29yZC4kW2tleUluZGV4XSA9IHN1YlJlY29yZHM7XG4gICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKHZhbHVlKSAmJiAhaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgbGV0IHN1YlJlY29yZCA9IHtcbiAgICAgICAgICB2OiB2YWx1ZSxcbiAgICAgICAgICBuOiB0aGlzLm5vcm0uZ2V0KHZhbHVlKVxuICAgICAgICB9O1xuICAgICAgICByZWNvcmQuJFtrZXlJbmRleF0gPSBzdWJSZWNvcmQ7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5yZWNvcmRzLnB1c2gocmVjb3JkKTtcbiAgfVxuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleXM6IHRoaXMua2V5cyxcbiAgICAgIHJlY29yZHM6IHRoaXMucmVjb3Jkc1xuICAgIH07XG4gIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZUluZGV4KGtleXMsIGRvY3MsIHtcbiAgZ2V0Rm4gPSBDb25maWcuZ2V0Rm4sXG4gIGZpZWxkTm9ybVdlaWdodCA9IENvbmZpZy5maWVsZE5vcm1XZWlnaHRcbn0gPSB7fSkge1xuICBjb25zdCBteUluZGV4ID0gbmV3IEZ1c2VJbmRleCh7XG4gICAgZ2V0Rm4sXG4gICAgZmllbGROb3JtV2VpZ2h0XG4gIH0pO1xuICBteUluZGV4LnNldEtleXMoa2V5cy5tYXAoY3JlYXRlS2V5KSk7XG4gIG15SW5kZXguc2V0U291cmNlcyhkb2NzKTtcbiAgbXlJbmRleC5jcmVhdGUoKTtcbiAgcmV0dXJuIG15SW5kZXg7XG59XG5mdW5jdGlvbiBwYXJzZUluZGV4KGRhdGEsIHtcbiAgZ2V0Rm4gPSBDb25maWcuZ2V0Rm4sXG4gIGZpZWxkTm9ybVdlaWdodCA9IENvbmZpZy5maWVsZE5vcm1XZWlnaHRcbn0gPSB7fSkge1xuICBjb25zdCB7XG4gICAga2V5cyxcbiAgICByZWNvcmRzXG4gIH0gPSBkYXRhO1xuICBjb25zdCBteUluZGV4ID0gbmV3IEZ1c2VJbmRleCh7XG4gICAgZ2V0Rm4sXG4gICAgZmllbGROb3JtV2VpZ2h0XG4gIH0pO1xuICBteUluZGV4LnNldEtleXMoa2V5cyk7XG4gIG15SW5kZXguc2V0SW5kZXhSZWNvcmRzKHJlY29yZHMpO1xuICByZXR1cm4gbXlJbmRleDtcbn1cbmZ1bmN0aW9uIGNvbXB1dGVTY29yZSQxKHBhdHRlcm4sIHtcbiAgZXJyb3JzID0gMCxcbiAgY3VycmVudExvY2F0aW9uID0gMCxcbiAgZXhwZWN0ZWRMb2NhdGlvbiA9IDAsXG4gIGRpc3RhbmNlID0gQ29uZmlnLmRpc3RhbmNlLFxuICBpZ25vcmVMb2NhdGlvbiA9IENvbmZpZy5pZ25vcmVMb2NhdGlvblxufSA9IHt9KSB7XG4gIGNvbnN0IGFjY3VyYWN5ID0gZXJyb3JzIC8gcGF0dGVybi5sZW5ndGg7XG4gIGlmIChpZ25vcmVMb2NhdGlvbikge1xuICAgIHJldHVybiBhY2N1cmFjeTtcbiAgfVxuICBjb25zdCBwcm94aW1pdHkgPSBNYXRoLmFicyhleHBlY3RlZExvY2F0aW9uIC0gY3VycmVudExvY2F0aW9uKTtcbiAgaWYgKCFkaXN0YW5jZSkge1xuICAgIC8vIERvZGdlIGRpdmlkZSBieSB6ZXJvIGVycm9yLlxuICAgIHJldHVybiBwcm94aW1pdHkgPyAxLjAgOiBhY2N1cmFjeTtcbiAgfVxuICByZXR1cm4gYWNjdXJhY3kgKyBwcm94aW1pdHkgLyBkaXN0YW5jZTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRNYXNrVG9JbmRpY2VzKG1hdGNobWFzayA9IFtdLCBtaW5NYXRjaENoYXJMZW5ndGggPSBDb25maWcubWluTWF0Y2hDaGFyTGVuZ3RoKSB7XG4gIGxldCBpbmRpY2VzID0gW107XG4gIGxldCBzdGFydCA9IC0xO1xuICBsZXQgZW5kID0gLTE7XG4gIGxldCBpID0gMDtcbiAgZm9yIChsZXQgbGVuID0gbWF0Y2htYXNrLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgbGV0IG1hdGNoID0gbWF0Y2htYXNrW2ldO1xuICAgIGlmIChtYXRjaCAmJiBzdGFydCA9PT0gLTEpIHtcbiAgICAgIHN0YXJ0ID0gaTtcbiAgICB9IGVsc2UgaWYgKCFtYXRjaCAmJiBzdGFydCAhPT0gLTEpIHtcbiAgICAgIGVuZCA9IGkgLSAxO1xuICAgICAgaWYgKGVuZCAtIHN0YXJ0ICsgMSA+PSBtaW5NYXRjaENoYXJMZW5ndGgpIHtcbiAgICAgICAgaW5kaWNlcy5wdXNoKFtzdGFydCwgZW5kXSk7XG4gICAgICB9XG4gICAgICBzdGFydCA9IC0xO1xuICAgIH1cbiAgfVxuXG4gIC8vIChpLTEgLSBzdGFydCkgKyAxID0+IGkgLSBzdGFydFxuICBpZiAobWF0Y2htYXNrW2kgLSAxXSAmJiBpIC0gc3RhcnQgPj0gbWluTWF0Y2hDaGFyTGVuZ3RoKSB7XG4gICAgaW5kaWNlcy5wdXNoKFtzdGFydCwgaSAtIDFdKTtcbiAgfVxuICByZXR1cm4gaW5kaWNlcztcbn1cblxuLy8gTWFjaGluZSB3b3JkIHNpemVcbmNvbnN0IE1BWF9CSVRTID0gMzI7XG5mdW5jdGlvbiBzZWFyY2godGV4dCwgcGF0dGVybiwgcGF0dGVybkFscGhhYmV0LCB7XG4gIGxvY2F0aW9uID0gQ29uZmlnLmxvY2F0aW9uLFxuICBkaXN0YW5jZSA9IENvbmZpZy5kaXN0YW5jZSxcbiAgdGhyZXNob2xkID0gQ29uZmlnLnRocmVzaG9sZCxcbiAgZmluZEFsbE1hdGNoZXMgPSBDb25maWcuZmluZEFsbE1hdGNoZXMsXG4gIG1pbk1hdGNoQ2hhckxlbmd0aCA9IENvbmZpZy5taW5NYXRjaENoYXJMZW5ndGgsXG4gIGluY2x1ZGVNYXRjaGVzID0gQ29uZmlnLmluY2x1ZGVNYXRjaGVzLFxuICBpZ25vcmVMb2NhdGlvbiA9IENvbmZpZy5pZ25vcmVMb2NhdGlvblxufSA9IHt9KSB7XG4gIGlmIChwYXR0ZXJuLmxlbmd0aCA+IE1BWF9CSVRTKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFBBVFRFUk5fTEVOR1RIX1RPT19MQVJHRShNQVhfQklUUykpO1xuICB9XG4gIGNvbnN0IHBhdHRlcm5MZW4gPSBwYXR0ZXJuLmxlbmd0aDtcbiAgLy8gU2V0IHN0YXJ0aW5nIGxvY2F0aW9uIGF0IGJlZ2lubmluZyB0ZXh0IGFuZCBpbml0aWFsaXplIHRoZSBhbHBoYWJldC5cbiAgY29uc3QgdGV4dExlbiA9IHRleHQubGVuZ3RoO1xuICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlbiBsb2NhdGlvbiA+IHRleHQubGVuZ3RoXG4gIGNvbnN0IGV4cGVjdGVkTG9jYXRpb24gPSBNYXRoLm1heCgwLCBNYXRoLm1pbihsb2NhdGlvbiwgdGV4dExlbikpO1xuICAvLyBIaWdoZXN0IHNjb3JlIGJleW9uZCB3aGljaCB3ZSBnaXZlIHVwLlxuICBsZXQgY3VycmVudFRocmVzaG9sZCA9IHRocmVzaG9sZDtcbiAgLy8gSXMgdGhlcmUgYSBuZWFyYnkgZXhhY3QgbWF0Y2g/IChzcGVlZHVwKVxuICBsZXQgYmVzdExvY2F0aW9uID0gZXhwZWN0ZWRMb2NhdGlvbjtcblxuICAvLyBQZXJmb3JtYW5jZTogb25seSBjb21wdXRlciBtYXRjaGVzIHdoZW4gdGhlIG1pbk1hdGNoQ2hhckxlbmd0aCA+IDFcbiAgLy8gT1IgaWYgYGluY2x1ZGVNYXRjaGVzYCBpcyB0cnVlLlxuICBjb25zdCBjb21wdXRlTWF0Y2hlcyA9IG1pbk1hdGNoQ2hhckxlbmd0aCA+IDEgfHwgaW5jbHVkZU1hdGNoZXM7XG4gIC8vIEEgbWFzayBvZiB0aGUgbWF0Y2hlcywgdXNlZCBmb3IgYnVpbGRpbmcgdGhlIGluZGljZXNcbiAgY29uc3QgbWF0Y2hNYXNrID0gY29tcHV0ZU1hdGNoZXMgPyBBcnJheSh0ZXh0TGVuKSA6IFtdO1xuICBsZXQgaW5kZXg7XG5cbiAgLy8gR2V0IGFsbCBleGFjdCBtYXRjaGVzLCBoZXJlIGZvciBzcGVlZCB1cFxuICB3aGlsZSAoKGluZGV4ID0gdGV4dC5pbmRleE9mKHBhdHRlcm4sIGJlc3RMb2NhdGlvbikpID4gLTEpIHtcbiAgICBsZXQgc2NvcmUgPSBjb21wdXRlU2NvcmUkMShwYXR0ZXJuLCB7XG4gICAgICBjdXJyZW50TG9jYXRpb246IGluZGV4LFxuICAgICAgZXhwZWN0ZWRMb2NhdGlvbixcbiAgICAgIGRpc3RhbmNlLFxuICAgICAgaWdub3JlTG9jYXRpb25cbiAgICB9KTtcbiAgICBjdXJyZW50VGhyZXNob2xkID0gTWF0aC5taW4oc2NvcmUsIGN1cnJlbnRUaHJlc2hvbGQpO1xuICAgIGJlc3RMb2NhdGlvbiA9IGluZGV4ICsgcGF0dGVybkxlbjtcbiAgICBpZiAoY29tcHV0ZU1hdGNoZXMpIHtcbiAgICAgIGxldCBpID0gMDtcbiAgICAgIHdoaWxlIChpIDwgcGF0dGVybkxlbikge1xuICAgICAgICBtYXRjaE1hc2tbaW5kZXggKyBpXSA9IDE7XG4gICAgICAgIGkgKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBSZXNldCB0aGUgYmVzdCBsb2NhdGlvblxuICBiZXN0TG9jYXRpb24gPSAtMTtcbiAgbGV0IGxhc3RCaXRBcnIgPSBbXTtcbiAgbGV0IGZpbmFsU2NvcmUgPSAxO1xuICBsZXQgYmluTWF4ID0gcGF0dGVybkxlbiArIHRleHRMZW47XG4gIGNvbnN0IG1hc2sgPSAxIDw8IHBhdHRlcm5MZW4gLSAxO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdHRlcm5MZW47IGkgKz0gMSkge1xuICAgIC8vIFNjYW4gZm9yIHRoZSBiZXN0IG1hdGNoOyBlYWNoIGl0ZXJhdGlvbiBhbGxvd3MgZm9yIG9uZSBtb3JlIGVycm9yLlxuICAgIC8vIFJ1biBhIGJpbmFyeSBzZWFyY2ggdG8gZGV0ZXJtaW5lIGhvdyBmYXIgZnJvbSB0aGUgbWF0Y2ggbG9jYXRpb24gd2UgY2FuIHN0cmF5XG4gICAgLy8gYXQgdGhpcyBlcnJvciBsZXZlbC5cbiAgICBsZXQgYmluTWluID0gMDtcbiAgICBsZXQgYmluTWlkID0gYmluTWF4O1xuICAgIHdoaWxlIChiaW5NaW4gPCBiaW5NaWQpIHtcbiAgICAgIGNvbnN0IHNjb3JlID0gY29tcHV0ZVNjb3JlJDEocGF0dGVybiwge1xuICAgICAgICBlcnJvcnM6IGksXG4gICAgICAgIGN1cnJlbnRMb2NhdGlvbjogZXhwZWN0ZWRMb2NhdGlvbiArIGJpbk1pZCxcbiAgICAgICAgZXhwZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZGlzdGFuY2UsXG4gICAgICAgIGlnbm9yZUxvY2F0aW9uXG4gICAgICB9KTtcbiAgICAgIGlmIChzY29yZSA8PSBjdXJyZW50VGhyZXNob2xkKSB7XG4gICAgICAgIGJpbk1pbiA9IGJpbk1pZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJpbk1heCA9IGJpbk1pZDtcbiAgICAgIH1cbiAgICAgIGJpbk1pZCA9IE1hdGguZmxvb3IoKGJpbk1heCAtIGJpbk1pbikgLyAyICsgYmluTWluKTtcbiAgICB9XG5cbiAgICAvLyBVc2UgdGhlIHJlc3VsdCBmcm9tIHRoaXMgaXRlcmF0aW9uIGFzIHRoZSBtYXhpbXVtIGZvciB0aGUgbmV4dC5cbiAgICBiaW5NYXggPSBiaW5NaWQ7XG4gICAgbGV0IHN0YXJ0ID0gTWF0aC5tYXgoMSwgZXhwZWN0ZWRMb2NhdGlvbiAtIGJpbk1pZCArIDEpO1xuICAgIGxldCBmaW5pc2ggPSBmaW5kQWxsTWF0Y2hlcyA/IHRleHRMZW4gOiBNYXRoLm1pbihleHBlY3RlZExvY2F0aW9uICsgYmluTWlkLCB0ZXh0TGVuKSArIHBhdHRlcm5MZW47XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBiaXQgYXJyYXlcbiAgICBsZXQgYml0QXJyID0gQXJyYXkoZmluaXNoICsgMik7XG4gICAgYml0QXJyW2ZpbmlzaCArIDFdID0gKDEgPDwgaSkgLSAxO1xuICAgIGZvciAobGV0IGogPSBmaW5pc2g7IGogPj0gc3RhcnQ7IGogLT0gMSkge1xuICAgICAgbGV0IGN1cnJlbnRMb2NhdGlvbiA9IGogLSAxO1xuICAgICAgbGV0IGNoYXJNYXRjaCA9IHBhdHRlcm5BbHBoYWJldFt0ZXh0LmNoYXJBdChjdXJyZW50TG9jYXRpb24pXTtcbiAgICAgIGlmIChjb21wdXRlTWF0Y2hlcykge1xuICAgICAgICAvLyBTcGVlZCB1cDogcXVpY2sgYm9vbCB0byBpbnQgY29udmVyc2lvbiAoaS5lLCBgY2hhck1hdGNoID8gMSA6IDBgKVxuICAgICAgICBtYXRjaE1hc2tbY3VycmVudExvY2F0aW9uXSA9ICshIWNoYXJNYXRjaDtcbiAgICAgIH1cblxuICAgICAgLy8gRmlyc3QgcGFzczogZXhhY3QgbWF0Y2hcbiAgICAgIGJpdEFycltqXSA9IChiaXRBcnJbaiArIDFdIDw8IDEgfCAxKSAmIGNoYXJNYXRjaDtcblxuICAgICAgLy8gU3Vic2VxdWVudCBwYXNzZXM6IGZ1enp5IG1hdGNoXG4gICAgICBpZiAoaSkge1xuICAgICAgICBiaXRBcnJbal0gfD0gKGxhc3RCaXRBcnJbaiArIDFdIHwgbGFzdEJpdEFycltqXSkgPDwgMSB8IDEgfCBsYXN0Qml0QXJyW2ogKyAxXTtcbiAgICAgIH1cbiAgICAgIGlmIChiaXRBcnJbal0gJiBtYXNrKSB7XG4gICAgICAgIGZpbmFsU2NvcmUgPSBjb21wdXRlU2NvcmUkMShwYXR0ZXJuLCB7XG4gICAgICAgICAgZXJyb3JzOiBpLFxuICAgICAgICAgIGN1cnJlbnRMb2NhdGlvbixcbiAgICAgICAgICBleHBlY3RlZExvY2F0aW9uLFxuICAgICAgICAgIGRpc3RhbmNlLFxuICAgICAgICAgIGlnbm9yZUxvY2F0aW9uXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRoaXMgbWF0Y2ggd2lsbCBhbG1vc3QgY2VydGFpbmx5IGJlIGJldHRlciB0aGFuIGFueSBleGlzdGluZyBtYXRjaC5cbiAgICAgICAgLy8gQnV0IGNoZWNrIGFueXdheS5cbiAgICAgICAgaWYgKGZpbmFsU2NvcmUgPD0gY3VycmVudFRocmVzaG9sZCkge1xuICAgICAgICAgIC8vIEluZGVlZCBpdCBpc1xuICAgICAgICAgIGN1cnJlbnRUaHJlc2hvbGQgPSBmaW5hbFNjb3JlO1xuICAgICAgICAgIGJlc3RMb2NhdGlvbiA9IGN1cnJlbnRMb2NhdGlvbjtcblxuICAgICAgICAgIC8vIEFscmVhZHkgcGFzc2VkIGBsb2NgLCBkb3duaGlsbCBmcm9tIGhlcmUgb24gaW4uXG4gICAgICAgICAgaWYgKGJlc3RMb2NhdGlvbiA8PSBleHBlY3RlZExvY2F0aW9uKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBXaGVuIHBhc3NpbmcgYGJlc3RMb2NhdGlvbmAsIGRvbid0IGV4Y2VlZCBvdXIgY3VycmVudCBkaXN0YW5jZSBmcm9tIGBleHBlY3RlZExvY2F0aW9uYC5cbiAgICAgICAgICBzdGFydCA9IE1hdGgubWF4KDEsIDIgKiBleHBlY3RlZExvY2F0aW9uIC0gYmVzdExvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE5vIGhvcGUgZm9yIGEgKGJldHRlcikgbWF0Y2ggYXQgZ3JlYXRlciBlcnJvciBsZXZlbHMuXG4gICAgY29uc3Qgc2NvcmUgPSBjb21wdXRlU2NvcmUkMShwYXR0ZXJuLCB7XG4gICAgICBlcnJvcnM6IGkgKyAxLFxuICAgICAgY3VycmVudExvY2F0aW9uOiBleHBlY3RlZExvY2F0aW9uLFxuICAgICAgZXhwZWN0ZWRMb2NhdGlvbixcbiAgICAgIGRpc3RhbmNlLFxuICAgICAgaWdub3JlTG9jYXRpb25cbiAgICB9KTtcbiAgICBpZiAoc2NvcmUgPiBjdXJyZW50VGhyZXNob2xkKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbGFzdEJpdEFyciA9IGJpdEFycjtcbiAgfVxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgaXNNYXRjaDogYmVzdExvY2F0aW9uID49IDAsXG4gICAgLy8gQ291bnQgZXhhY3QgbWF0Y2hlcyAodGhvc2Ugd2l0aCBhIHNjb3JlIG9mIDApIHRvIGJlIFwiYWxtb3N0XCIgZXhhY3RcbiAgICBzY29yZTogTWF0aC5tYXgoMC4wMDEsIGZpbmFsU2NvcmUpXG4gIH07XG4gIGlmIChjb21wdXRlTWF0Y2hlcykge1xuICAgIGNvbnN0IGluZGljZXMgPSBjb252ZXJ0TWFza1RvSW5kaWNlcyhtYXRjaE1hc2ssIG1pbk1hdGNoQ2hhckxlbmd0aCk7XG4gICAgaWYgKCFpbmRpY2VzLmxlbmd0aCkge1xuICAgICAgcmVzdWx0LmlzTWF0Y2ggPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGluY2x1ZGVNYXRjaGVzKSB7XG4gICAgICByZXN1bHQuaW5kaWNlcyA9IGluZGljZXM7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBjcmVhdGVQYXR0ZXJuQWxwaGFiZXQocGF0dGVybikge1xuICBsZXQgbWFzayA9IHt9O1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gcGF0dGVybi5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgIGNvbnN0IGNoYXIgPSBwYXR0ZXJuLmNoYXJBdChpKTtcbiAgICBtYXNrW2NoYXJdID0gKG1hc2tbY2hhcl0gfHwgMCkgfCAxIDw8IGxlbiAtIGkgLSAxO1xuICB9XG4gIHJldHVybiBtYXNrO1xufVxuY2xhc3MgQml0YXBTZWFyY2gge1xuICBjb25zdHJ1Y3RvcihwYXR0ZXJuLCB7XG4gICAgbG9jYXRpb24gPSBDb25maWcubG9jYXRpb24sXG4gICAgdGhyZXNob2xkID0gQ29uZmlnLnRocmVzaG9sZCxcbiAgICBkaXN0YW5jZSA9IENvbmZpZy5kaXN0YW5jZSxcbiAgICBpbmNsdWRlTWF0Y2hlcyA9IENvbmZpZy5pbmNsdWRlTWF0Y2hlcyxcbiAgICBmaW5kQWxsTWF0Y2hlcyA9IENvbmZpZy5maW5kQWxsTWF0Y2hlcyxcbiAgICBtaW5NYXRjaENoYXJMZW5ndGggPSBDb25maWcubWluTWF0Y2hDaGFyTGVuZ3RoLFxuICAgIGlzQ2FzZVNlbnNpdGl2ZSA9IENvbmZpZy5pc0Nhc2VTZW5zaXRpdmUsXG4gICAgaWdub3JlTG9jYXRpb24gPSBDb25maWcuaWdub3JlTG9jYXRpb25cbiAgfSA9IHt9KSB7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgbG9jYXRpb24sXG4gICAgICB0aHJlc2hvbGQsXG4gICAgICBkaXN0YW5jZSxcbiAgICAgIGluY2x1ZGVNYXRjaGVzLFxuICAgICAgZmluZEFsbE1hdGNoZXMsXG4gICAgICBtaW5NYXRjaENoYXJMZW5ndGgsXG4gICAgICBpc0Nhc2VTZW5zaXRpdmUsXG4gICAgICBpZ25vcmVMb2NhdGlvblxuICAgIH07XG4gICAgdGhpcy5wYXR0ZXJuID0gaXNDYXNlU2Vuc2l0aXZlID8gcGF0dGVybiA6IHBhdHRlcm4udG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLmNodW5rcyA9IFtdO1xuICAgIGlmICghdGhpcy5wYXR0ZXJuLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBhZGRDaHVuayA9IChwYXR0ZXJuLCBzdGFydEluZGV4KSA9PiB7XG4gICAgICB0aGlzLmNodW5rcy5wdXNoKHtcbiAgICAgICAgcGF0dGVybixcbiAgICAgICAgYWxwaGFiZXQ6IGNyZWF0ZVBhdHRlcm5BbHBoYWJldChwYXR0ZXJuKSxcbiAgICAgICAgc3RhcnRJbmRleFxuICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCBsZW4gPSB0aGlzLnBhdHRlcm4ubGVuZ3RoO1xuICAgIGlmIChsZW4gPiBNQVhfQklUUykge1xuICAgICAgbGV0IGkgPSAwO1xuICAgICAgY29uc3QgcmVtYWluZGVyID0gbGVuICUgTUFYX0JJVFM7XG4gICAgICBjb25zdCBlbmQgPSBsZW4gLSByZW1haW5kZXI7XG4gICAgICB3aGlsZSAoaSA8IGVuZCkge1xuICAgICAgICBhZGRDaHVuayh0aGlzLnBhdHRlcm4uc3Vic3RyKGksIE1BWF9CSVRTKSwgaSk7XG4gICAgICAgIGkgKz0gTUFYX0JJVFM7XG4gICAgICB9XG4gICAgICBpZiAocmVtYWluZGVyKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBsZW4gLSBNQVhfQklUUztcbiAgICAgICAgYWRkQ2h1bmsodGhpcy5wYXR0ZXJuLnN1YnN0cihzdGFydEluZGV4KSwgc3RhcnRJbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZENodW5rKHRoaXMucGF0dGVybiwgMCk7XG4gICAgfVxuICB9XG4gIHNlYXJjaEluKHRleHQpIHtcbiAgICBjb25zdCB7XG4gICAgICBpc0Nhc2VTZW5zaXRpdmUsXG4gICAgICBpbmNsdWRlTWF0Y2hlc1xuICAgIH0gPSB0aGlzLm9wdGlvbnM7XG4gICAgaWYgKCFpc0Nhc2VTZW5zaXRpdmUpIHtcbiAgICAgIHRleHQgPSB0ZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLy8gRXhhY3QgbWF0Y2hcbiAgICBpZiAodGhpcy5wYXR0ZXJuID09PSB0ZXh0KSB7XG4gICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICBpc01hdGNoOiB0cnVlLFxuICAgICAgICBzY29yZTogMFxuICAgICAgfTtcbiAgICAgIGlmIChpbmNsdWRlTWF0Y2hlcykge1xuICAgICAgICByZXN1bHQuaW5kaWNlcyA9IFtbMCwgdGV4dC5sZW5ndGggLSAxXV07XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgdXNlIEJpdGFwIGFsZ29yaXRobVxuICAgIGNvbnN0IHtcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgZGlzdGFuY2UsXG4gICAgICB0aHJlc2hvbGQsXG4gICAgICBmaW5kQWxsTWF0Y2hlcyxcbiAgICAgIG1pbk1hdGNoQ2hhckxlbmd0aCxcbiAgICAgIGlnbm9yZUxvY2F0aW9uXG4gICAgfSA9IHRoaXMub3B0aW9ucztcbiAgICBsZXQgYWxsSW5kaWNlcyA9IFtdO1xuICAgIGxldCB0b3RhbFNjb3JlID0gMDtcbiAgICBsZXQgaGFzTWF0Y2hlcyA9IGZhbHNlO1xuICAgIHRoaXMuY2h1bmtzLmZvckVhY2goKHtcbiAgICAgIHBhdHRlcm4sXG4gICAgICBhbHBoYWJldCxcbiAgICAgIHN0YXJ0SW5kZXhcbiAgICB9KSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGlzTWF0Y2gsXG4gICAgICAgIHNjb3JlLFxuICAgICAgICBpbmRpY2VzXG4gICAgICB9ID0gc2VhcmNoKHRleHQsIHBhdHRlcm4sIGFscGhhYmV0LCB7XG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbiArIHN0YXJ0SW5kZXgsXG4gICAgICAgIGRpc3RhbmNlLFxuICAgICAgICB0aHJlc2hvbGQsXG4gICAgICAgIGZpbmRBbGxNYXRjaGVzLFxuICAgICAgICBtaW5NYXRjaENoYXJMZW5ndGgsXG4gICAgICAgIGluY2x1ZGVNYXRjaGVzLFxuICAgICAgICBpZ25vcmVMb2NhdGlvblxuICAgICAgfSk7XG4gICAgICBpZiAoaXNNYXRjaCkge1xuICAgICAgICBoYXNNYXRjaGVzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRvdGFsU2NvcmUgKz0gc2NvcmU7XG4gICAgICBpZiAoaXNNYXRjaCAmJiBpbmRpY2VzKSB7XG4gICAgICAgIGFsbEluZGljZXMgPSBbLi4uYWxsSW5kaWNlcywgLi4uaW5kaWNlc107XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGV0IHJlc3VsdCA9IHtcbiAgICAgIGlzTWF0Y2g6IGhhc01hdGNoZXMsXG4gICAgICBzY29yZTogaGFzTWF0Y2hlcyA/IHRvdGFsU2NvcmUgLyB0aGlzLmNodW5rcy5sZW5ndGggOiAxXG4gICAgfTtcbiAgICBpZiAoaGFzTWF0Y2hlcyAmJiBpbmNsdWRlTWF0Y2hlcykge1xuICAgICAgcmVzdWx0LmluZGljZXMgPSBhbGxJbmRpY2VzO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5jbGFzcyBCYXNlTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihwYXR0ZXJuKSB7XG4gICAgdGhpcy5wYXR0ZXJuID0gcGF0dGVybjtcbiAgfVxuICBzdGF0aWMgaXNNdWx0aU1hdGNoKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gZ2V0TWF0Y2gocGF0dGVybiwgdGhpcy5tdWx0aVJlZ2V4KTtcbiAgfVxuICBzdGF0aWMgaXNTaW5nbGVNYXRjaChwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGdldE1hdGNoKHBhdHRlcm4sIHRoaXMuc2luZ2xlUmVnZXgpO1xuICB9XG4gIHNlYXJjaCggLyp0ZXh0Ki8pIHt9XG59XG5mdW5jdGlvbiBnZXRNYXRjaChwYXR0ZXJuLCBleHApIHtcbiAgY29uc3QgbWF0Y2hlcyA9IHBhdHRlcm4ubWF0Y2goZXhwKTtcbiAgcmV0dXJuIG1hdGNoZXMgPyBtYXRjaGVzWzFdIDogbnVsbDtcbn1cblxuLy8gVG9rZW46ICdmaWxlXG5cbmNsYXNzIEV4YWN0TWF0Y2ggZXh0ZW5kcyBCYXNlTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihwYXR0ZXJuKSB7XG4gICAgc3VwZXIocGF0dGVybik7XG4gIH1cbiAgc3RhdGljIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnZXhhY3QnO1xuICB9XG4gIHN0YXRpYyBnZXQgbXVsdGlSZWdleCgpIHtcbiAgICByZXR1cm4gL149XCIoLiopXCIkLztcbiAgfVxuICBzdGF0aWMgZ2V0IHNpbmdsZVJlZ2V4KCkge1xuICAgIHJldHVybiAvXj0oLiopJC87XG4gIH1cbiAgc2VhcmNoKHRleHQpIHtcbiAgICBjb25zdCBpc01hdGNoID0gdGV4dCA9PT0gdGhpcy5wYXR0ZXJuO1xuICAgIHJldHVybiB7XG4gICAgICBpc01hdGNoLFxuICAgICAgc2NvcmU6IGlzTWF0Y2ggPyAwIDogMSxcbiAgICAgIGluZGljZXM6IFswLCB0aGlzLnBhdHRlcm4ubGVuZ3RoIC0gMV1cbiAgICB9O1xuICB9XG59XG5cbi8vIFRva2VuOiAhZmlyZVxuXG5jbGFzcyBJbnZlcnNlRXhhY3RNYXRjaCBleHRlbmRzIEJhc2VNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKHBhdHRlcm4pIHtcbiAgICBzdXBlcihwYXR0ZXJuKTtcbiAgfVxuICBzdGF0aWMgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdpbnZlcnNlLWV4YWN0JztcbiAgfVxuICBzdGF0aWMgZ2V0IG11bHRpUmVnZXgoKSB7XG4gICAgcmV0dXJuIC9eIVwiKC4qKVwiJC87XG4gIH1cbiAgc3RhdGljIGdldCBzaW5nbGVSZWdleCgpIHtcbiAgICByZXR1cm4gL14hKC4qKSQvO1xuICB9XG4gIHNlYXJjaCh0ZXh0KSB7XG4gICAgY29uc3QgaW5kZXggPSB0ZXh0LmluZGV4T2YodGhpcy5wYXR0ZXJuKTtcbiAgICBjb25zdCBpc01hdGNoID0gaW5kZXggPT09IC0xO1xuICAgIHJldHVybiB7XG4gICAgICBpc01hdGNoLFxuICAgICAgc2NvcmU6IGlzTWF0Y2ggPyAwIDogMSxcbiAgICAgIGluZGljZXM6IFswLCB0ZXh0Lmxlbmd0aCAtIDFdXG4gICAgfTtcbiAgfVxufVxuXG4vLyBUb2tlbjogXmZpbGVcblxuY2xhc3MgUHJlZml4RXhhY3RNYXRjaCBleHRlbmRzIEJhc2VNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKHBhdHRlcm4pIHtcbiAgICBzdXBlcihwYXR0ZXJuKTtcbiAgfVxuICBzdGF0aWMgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdwcmVmaXgtZXhhY3QnO1xuICB9XG4gIHN0YXRpYyBnZXQgbXVsdGlSZWdleCgpIHtcbiAgICByZXR1cm4gL15cXF5cIiguKilcIiQvO1xuICB9XG4gIHN0YXRpYyBnZXQgc2luZ2xlUmVnZXgoKSB7XG4gICAgcmV0dXJuIC9eXFxeKC4qKSQvO1xuICB9XG4gIHNlYXJjaCh0ZXh0KSB7XG4gICAgY29uc3QgaXNNYXRjaCA9IHRleHQuc3RhcnRzV2l0aCh0aGlzLnBhdHRlcm4pO1xuICAgIHJldHVybiB7XG4gICAgICBpc01hdGNoLFxuICAgICAgc2NvcmU6IGlzTWF0Y2ggPyAwIDogMSxcbiAgICAgIGluZGljZXM6IFswLCB0aGlzLnBhdHRlcm4ubGVuZ3RoIC0gMV1cbiAgICB9O1xuICB9XG59XG5cbi8vIFRva2VuOiAhXmZpcmVcblxuY2xhc3MgSW52ZXJzZVByZWZpeEV4YWN0TWF0Y2ggZXh0ZW5kcyBCYXNlTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihwYXR0ZXJuKSB7XG4gICAgc3VwZXIocGF0dGVybik7XG4gIH1cbiAgc3RhdGljIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnaW52ZXJzZS1wcmVmaXgtZXhhY3QnO1xuICB9XG4gIHN0YXRpYyBnZXQgbXVsdGlSZWdleCgpIHtcbiAgICByZXR1cm4gL14hXFxeXCIoLiopXCIkLztcbiAgfVxuICBzdGF0aWMgZ2V0IHNpbmdsZVJlZ2V4KCkge1xuICAgIHJldHVybiAvXiFcXF4oLiopJC87XG4gIH1cbiAgc2VhcmNoKHRleHQpIHtcbiAgICBjb25zdCBpc01hdGNoID0gIXRleHQuc3RhcnRzV2l0aCh0aGlzLnBhdHRlcm4pO1xuICAgIHJldHVybiB7XG4gICAgICBpc01hdGNoLFxuICAgICAgc2NvcmU6IGlzTWF0Y2ggPyAwIDogMSxcbiAgICAgIGluZGljZXM6IFswLCB0ZXh0Lmxlbmd0aCAtIDFdXG4gICAgfTtcbiAgfVxufVxuXG4vLyBUb2tlbjogLmZpbGUkXG5cbmNsYXNzIFN1ZmZpeEV4YWN0TWF0Y2ggZXh0ZW5kcyBCYXNlTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihwYXR0ZXJuKSB7XG4gICAgc3VwZXIocGF0dGVybik7XG4gIH1cbiAgc3RhdGljIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnc3VmZml4LWV4YWN0JztcbiAgfVxuICBzdGF0aWMgZ2V0IG11bHRpUmVnZXgoKSB7XG4gICAgcmV0dXJuIC9eXCIoLiopXCJcXCQkLztcbiAgfVxuICBzdGF0aWMgZ2V0IHNpbmdsZVJlZ2V4KCkge1xuICAgIHJldHVybiAvXiguKilcXCQkLztcbiAgfVxuICBzZWFyY2godGV4dCkge1xuICAgIGNvbnN0IGlzTWF0Y2ggPSB0ZXh0LmVuZHNXaXRoKHRoaXMucGF0dGVybik7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzTWF0Y2gsXG4gICAgICBzY29yZTogaXNNYXRjaCA/IDAgOiAxLFxuICAgICAgaW5kaWNlczogW3RleHQubGVuZ3RoIC0gdGhpcy5wYXR0ZXJuLmxlbmd0aCwgdGV4dC5sZW5ndGggLSAxXVxuICAgIH07XG4gIH1cbn1cblxuLy8gVG9rZW46ICEuZmlsZSRcblxuY2xhc3MgSW52ZXJzZVN1ZmZpeEV4YWN0TWF0Y2ggZXh0ZW5kcyBCYXNlTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihwYXR0ZXJuKSB7XG4gICAgc3VwZXIocGF0dGVybik7XG4gIH1cbiAgc3RhdGljIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnaW52ZXJzZS1zdWZmaXgtZXhhY3QnO1xuICB9XG4gIHN0YXRpYyBnZXQgbXVsdGlSZWdleCgpIHtcbiAgICByZXR1cm4gL14hXCIoLiopXCJcXCQkLztcbiAgfVxuICBzdGF0aWMgZ2V0IHNpbmdsZVJlZ2V4KCkge1xuICAgIHJldHVybiAvXiEoLiopXFwkJC87XG4gIH1cbiAgc2VhcmNoKHRleHQpIHtcbiAgICBjb25zdCBpc01hdGNoID0gIXRleHQuZW5kc1dpdGgodGhpcy5wYXR0ZXJuKTtcbiAgICByZXR1cm4ge1xuICAgICAgaXNNYXRjaCxcbiAgICAgIHNjb3JlOiBpc01hdGNoID8gMCA6IDEsXG4gICAgICBpbmRpY2VzOiBbMCwgdGV4dC5sZW5ndGggLSAxXVxuICAgIH07XG4gIH1cbn1cbmNsYXNzIEZ1enp5TWF0Y2ggZXh0ZW5kcyBCYXNlTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihwYXR0ZXJuLCB7XG4gICAgbG9jYXRpb24gPSBDb25maWcubG9jYXRpb24sXG4gICAgdGhyZXNob2xkID0gQ29uZmlnLnRocmVzaG9sZCxcbiAgICBkaXN0YW5jZSA9IENvbmZpZy5kaXN0YW5jZSxcbiAgICBpbmNsdWRlTWF0Y2hlcyA9IENvbmZpZy5pbmNsdWRlTWF0Y2hlcyxcbiAgICBmaW5kQWxsTWF0Y2hlcyA9IENvbmZpZy5maW5kQWxsTWF0Y2hlcyxcbiAgICBtaW5NYXRjaENoYXJMZW5ndGggPSBDb25maWcubWluTWF0Y2hDaGFyTGVuZ3RoLFxuICAgIGlzQ2FzZVNlbnNpdGl2ZSA9IENvbmZpZy5pc0Nhc2VTZW5zaXRpdmUsXG4gICAgaWdub3JlTG9jYXRpb24gPSBDb25maWcuaWdub3JlTG9jYXRpb25cbiAgfSA9IHt9KSB7XG4gICAgc3VwZXIocGF0dGVybik7XG4gICAgdGhpcy5fYml0YXBTZWFyY2ggPSBuZXcgQml0YXBTZWFyY2gocGF0dGVybiwge1xuICAgICAgbG9jYXRpb24sXG4gICAgICB0aHJlc2hvbGQsXG4gICAgICBkaXN0YW5jZSxcbiAgICAgIGluY2x1ZGVNYXRjaGVzLFxuICAgICAgZmluZEFsbE1hdGNoZXMsXG4gICAgICBtaW5NYXRjaENoYXJMZW5ndGgsXG4gICAgICBpc0Nhc2VTZW5zaXRpdmUsXG4gICAgICBpZ25vcmVMb2NhdGlvblxuICAgIH0pO1xuICB9XG4gIHN0YXRpYyBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2Z1enp5JztcbiAgfVxuICBzdGF0aWMgZ2V0IG11bHRpUmVnZXgoKSB7XG4gICAgcmV0dXJuIC9eXCIoLiopXCIkLztcbiAgfVxuICBzdGF0aWMgZ2V0IHNpbmdsZVJlZ2V4KCkge1xuICAgIHJldHVybiAvXiguKikkLztcbiAgfVxuICBzZWFyY2godGV4dCkge1xuICAgIHJldHVybiB0aGlzLl9iaXRhcFNlYXJjaC5zZWFyY2hJbih0ZXh0KTtcbiAgfVxufVxuXG4vLyBUb2tlbjogJ2ZpbGVcblxuY2xhc3MgSW5jbHVkZU1hdGNoIGV4dGVuZHMgQmFzZU1hdGNoIHtcbiAgY29uc3RydWN0b3IocGF0dGVybikge1xuICAgIHN1cGVyKHBhdHRlcm4pO1xuICB9XG4gIHN0YXRpYyBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2luY2x1ZGUnO1xuICB9XG4gIHN0YXRpYyBnZXQgbXVsdGlSZWdleCgpIHtcbiAgICByZXR1cm4gL14nXCIoLiopXCIkLztcbiAgfVxuICBzdGF0aWMgZ2V0IHNpbmdsZVJlZ2V4KCkge1xuICAgIHJldHVybiAvXicoLiopJC87XG4gIH1cbiAgc2VhcmNoKHRleHQpIHtcbiAgICBsZXQgbG9jYXRpb24gPSAwO1xuICAgIGxldCBpbmRleDtcbiAgICBjb25zdCBpbmRpY2VzID0gW107XG4gICAgY29uc3QgcGF0dGVybkxlbiA9IHRoaXMucGF0dGVybi5sZW5ndGg7XG5cbiAgICAvLyBHZXQgYWxsIGV4YWN0IG1hdGNoZXNcbiAgICB3aGlsZSAoKGluZGV4ID0gdGV4dC5pbmRleE9mKHRoaXMucGF0dGVybiwgbG9jYXRpb24pKSA+IC0xKSB7XG4gICAgICBsb2NhdGlvbiA9IGluZGV4ICsgcGF0dGVybkxlbjtcbiAgICAgIGluZGljZXMucHVzaChbaW5kZXgsIGxvY2F0aW9uIC0gMV0pO1xuICAgIH1cbiAgICBjb25zdCBpc01hdGNoID0gISFpbmRpY2VzLmxlbmd0aDtcbiAgICByZXR1cm4ge1xuICAgICAgaXNNYXRjaCxcbiAgICAgIHNjb3JlOiBpc01hdGNoID8gMCA6IDEsXG4gICAgICBpbmRpY2VzXG4gICAgfTtcbiAgfVxufVxuXG4vLyBcdTI3NTdPcmRlciBpcyBpbXBvcnRhbnQuIERPIE5PVCBDSEFOR0UuXG5jb25zdCBzZWFyY2hlcnMgPSBbRXhhY3RNYXRjaCwgSW5jbHVkZU1hdGNoLCBQcmVmaXhFeGFjdE1hdGNoLCBJbnZlcnNlUHJlZml4RXhhY3RNYXRjaCwgSW52ZXJzZVN1ZmZpeEV4YWN0TWF0Y2gsIFN1ZmZpeEV4YWN0TWF0Y2gsIEludmVyc2VFeGFjdE1hdGNoLCBGdXp6eU1hdGNoXTtcbmNvbnN0IHNlYXJjaGVyc0xlbiA9IHNlYXJjaGVycy5sZW5ndGg7XG5cbi8vIFJlZ2V4IHRvIHNwbGl0IGJ5IHNwYWNlcywgYnV0IGtlZXAgYW55dGhpbmcgaW4gcXVvdGVzIHRvZ2V0aGVyXG5jb25zdCBTUEFDRV9SRSA9IC8gKyg/PSg/OlteXFxcIl0qXFxcIlteXFxcIl0qXFxcIikqW15cXFwiXSokKS87XG5jb25zdCBPUl9UT0tFTiA9ICd8JztcblxuLy8gUmV0dXJuIGEgMkQgYXJyYXkgcmVwcmVzZW50YXRpb24gb2YgdGhlIHF1ZXJ5LCBmb3Igc2ltcGxlciBwYXJzaW5nLlxuLy8gRXhhbXBsZTpcbi8vIFwiXmNvcmUgZ28kIHwgcmIkIHwgcHkkIHh5JFwiID0+IFtbXCJeY29yZVwiLCBcImdvJFwiXSwgW1wicmIkXCJdLCBbXCJweSRcIiwgXCJ4eSRcIl1dXG5mdW5jdGlvbiBwYXJzZVF1ZXJ5KHBhdHRlcm4sIG9wdGlvbnMgPSB7fSkge1xuICByZXR1cm4gcGF0dGVybi5zcGxpdChPUl9UT0tFTikubWFwKGl0ZW0gPT4ge1xuICAgIGxldCBxdWVyeSA9IGl0ZW0udHJpbSgpLnNwbGl0KFNQQUNFX1JFKS5maWx0ZXIoaXRlbSA9PiBpdGVtICYmICEhaXRlbS50cmltKCkpO1xuICAgIGxldCByZXN1bHRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHF1ZXJ5Lmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICBjb25zdCBxdWVyeUl0ZW0gPSBxdWVyeVtpXTtcblxuICAgICAgLy8gMS4gSGFuZGxlIG11bHRpcGxlIHF1ZXJ5IG1hdGNoIChpLmUsIG9uY2UgdGhhdCBhcmUgcXVvdGVkLCBsaWtlIGBcImhlbGxvIHdvcmxkXCJgKVxuICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICBsZXQgaWR4ID0gLTE7XG4gICAgICB3aGlsZSAoIWZvdW5kICYmICsraWR4IDwgc2VhcmNoZXJzTGVuKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaGVyID0gc2VhcmNoZXJzW2lkeF07XG4gICAgICAgIGxldCB0b2tlbiA9IHNlYXJjaGVyLmlzTXVsdGlNYXRjaChxdWVyeUl0ZW0pO1xuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gobmV3IHNlYXJjaGVyKHRva2VuLCBvcHRpb25zKSk7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIDIuIEhhbmRsZSBzaW5nbGUgcXVlcnkgbWF0Y2hlcyAoaS5lLCBvbmNlIHRoYXQgYXJlICpub3QqIHF1b3RlZClcbiAgICAgIGlkeCA9IC0xO1xuICAgICAgd2hpbGUgKCsraWR4IDwgc2VhcmNoZXJzTGVuKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaGVyID0gc2VhcmNoZXJzW2lkeF07XG4gICAgICAgIGxldCB0b2tlbiA9IHNlYXJjaGVyLmlzU2luZ2xlTWF0Y2gocXVlcnlJdGVtKTtcbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKG5ldyBzZWFyY2hlcih0b2tlbiwgb3B0aW9ucykpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9KTtcbn1cblxuLy8gVGhlc2UgZXh0ZW5kZWQgbWF0Y2hlcnMgY2FuIHJldHVybiBhbiBhcnJheSBvZiBtYXRjaGVzLCBhcyBvcHBvc2VkXG4vLyB0byBhIHNpbmdsIG1hdGNoXG5jb25zdCBNdWx0aU1hdGNoU2V0ID0gbmV3IFNldChbRnV6enlNYXRjaC50eXBlLCBJbmNsdWRlTWF0Y2gudHlwZV0pO1xuXG4vKipcbiAqIENvbW1hbmQtbGlrZSBzZWFyY2hpbmdcbiAqID09PT09PT09PT09PT09PT09PT09PT1cbiAqXG4gKiBHaXZlbiBtdWx0aXBsZSBzZWFyY2ggdGVybXMgZGVsaW1pdGVkIGJ5IHNwYWNlcy5lLmcuIGBeanNjcmlwdCAucHl0aG9uJCBydWJ5ICFqYXZhYCxcbiAqIHNlYXJjaCBpbiBhIGdpdmVuIHRleHQuXG4gKlxuICogU2VhcmNoIHN5bnRheDpcbiAqXG4gKiB8IFRva2VuICAgICAgIHwgTWF0Y2ggdHlwZSAgICAgICAgICAgICAgICAgfCBEZXNjcmlwdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IC0tLS0tLS0tLS0tIHwgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gfCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB8XG4gKiB8IGBqc2NyaXB0YCAgIHwgZnV6enktbWF0Y2ggICAgICAgICAgICAgICAgfCBJdGVtcyB0aGF0IGZ1enp5IG1hdGNoIGBqc2NyaXB0YCAgICAgICB8XG4gKiB8IGA9c2NoZW1lYCAgIHwgZXhhY3QtbWF0Y2ggICAgICAgICAgICAgICAgfCBJdGVtcyB0aGF0IGFyZSBgc2NoZW1lYCAgICAgICAgICAgICAgICB8XG4gKiB8IGAncHl0aG9uYCAgIHwgaW5jbHVkZS1tYXRjaCAgICAgICAgICAgICAgfCBJdGVtcyB0aGF0IGluY2x1ZGUgYHB5dGhvbmAgICAgICAgICAgICB8XG4gKiB8IGAhcnVieWAgICAgIHwgaW52ZXJzZS1leGFjdC1tYXRjaCAgICAgICAgfCBJdGVtcyB0aGF0IGRvIG5vdCBpbmNsdWRlIGBydWJ5YCAgICAgICB8XG4gKiB8IGBeamF2YWAgICAgIHwgcHJlZml4LWV4YWN0LW1hdGNoICAgICAgICAgfCBJdGVtcyB0aGF0IHN0YXJ0IHdpdGggYGphdmFgICAgICAgICAgICB8XG4gKiB8IGAhXmVhcmxhbmdgIHwgaW52ZXJzZS1wcmVmaXgtZXhhY3QtbWF0Y2ggfCBJdGVtcyB0aGF0IGRvIG5vdCBzdGFydCB3aXRoIGBlYXJsYW5nYCB8XG4gKiB8IGAuanMkYCAgICAgIHwgc3VmZml4LWV4YWN0LW1hdGNoICAgICAgICAgfCBJdGVtcyB0aGF0IGVuZCB3aXRoIGAuanNgICAgICAgICAgICAgICB8XG4gKiB8IGAhLmdvJGAgICAgIHwgaW52ZXJzZS1zdWZmaXgtZXhhY3QtbWF0Y2ggfCBJdGVtcyB0aGF0IGRvIG5vdCBlbmQgd2l0aCBgLmdvYCAgICAgICB8XG4gKlxuICogQSBzaW5nbGUgcGlwZSBjaGFyYWN0ZXIgYWN0cyBhcyBhbiBPUiBvcGVyYXRvci4gRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmdcbiAqIHF1ZXJ5IG1hdGNoZXMgZW50cmllcyB0aGF0IHN0YXJ0IHdpdGggYGNvcmVgIGFuZCBlbmQgd2l0aCBlaXRoZXJgZ29gLCBgcmJgLFxuICogb3JgcHlgLlxuICpcbiAqIGBgYFxuICogXmNvcmUgZ28kIHwgcmIkIHwgcHkkXG4gKiBgYGBcbiAqL1xuY2xhc3MgRXh0ZW5kZWRTZWFyY2gge1xuICBjb25zdHJ1Y3RvcihwYXR0ZXJuLCB7XG4gICAgaXNDYXNlU2Vuc2l0aXZlID0gQ29uZmlnLmlzQ2FzZVNlbnNpdGl2ZSxcbiAgICBpbmNsdWRlTWF0Y2hlcyA9IENvbmZpZy5pbmNsdWRlTWF0Y2hlcyxcbiAgICBtaW5NYXRjaENoYXJMZW5ndGggPSBDb25maWcubWluTWF0Y2hDaGFyTGVuZ3RoLFxuICAgIGlnbm9yZUxvY2F0aW9uID0gQ29uZmlnLmlnbm9yZUxvY2F0aW9uLFxuICAgIGZpbmRBbGxNYXRjaGVzID0gQ29uZmlnLmZpbmRBbGxNYXRjaGVzLFxuICAgIGxvY2F0aW9uID0gQ29uZmlnLmxvY2F0aW9uLFxuICAgIHRocmVzaG9sZCA9IENvbmZpZy50aHJlc2hvbGQsXG4gICAgZGlzdGFuY2UgPSBDb25maWcuZGlzdGFuY2VcbiAgfSA9IHt9KSB7XG4gICAgdGhpcy5xdWVyeSA9IG51bGw7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgaXNDYXNlU2Vuc2l0aXZlLFxuICAgICAgaW5jbHVkZU1hdGNoZXMsXG4gICAgICBtaW5NYXRjaENoYXJMZW5ndGgsXG4gICAgICBmaW5kQWxsTWF0Y2hlcyxcbiAgICAgIGlnbm9yZUxvY2F0aW9uLFxuICAgICAgbG9jYXRpb24sXG4gICAgICB0aHJlc2hvbGQsXG4gICAgICBkaXN0YW5jZVxuICAgIH07XG4gICAgdGhpcy5wYXR0ZXJuID0gaXNDYXNlU2Vuc2l0aXZlID8gcGF0dGVybiA6IHBhdHRlcm4udG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLnF1ZXJ5ID0gcGFyc2VRdWVyeSh0aGlzLnBhdHRlcm4sIHRoaXMub3B0aW9ucyk7XG4gIH1cbiAgc3RhdGljIGNvbmRpdGlvbihfLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMudXNlRXh0ZW5kZWRTZWFyY2g7XG4gIH1cbiAgc2VhcmNoSW4odGV4dCkge1xuICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5xdWVyeTtcbiAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc01hdGNoOiBmYWxzZSxcbiAgICAgICAgc2NvcmU6IDFcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHtcbiAgICAgIGluY2x1ZGVNYXRjaGVzLFxuICAgICAgaXNDYXNlU2Vuc2l0aXZlXG4gICAgfSA9IHRoaXMub3B0aW9ucztcbiAgICB0ZXh0ID0gaXNDYXNlU2Vuc2l0aXZlID8gdGV4dCA6IHRleHQudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgbnVtTWF0Y2hlcyA9IDA7XG4gICAgbGV0IGFsbEluZGljZXMgPSBbXTtcbiAgICBsZXQgdG90YWxTY29yZSA9IDA7XG5cbiAgICAvLyBPUnNcbiAgICBmb3IgKGxldCBpID0gMCwgcUxlbiA9IHF1ZXJ5Lmxlbmd0aDsgaSA8IHFMZW47IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc2VhcmNoZXJzID0gcXVlcnlbaV07XG5cbiAgICAgIC8vIFJlc2V0IGluZGljZXNcbiAgICAgIGFsbEluZGljZXMubGVuZ3RoID0gMDtcbiAgICAgIG51bU1hdGNoZXMgPSAwO1xuXG4gICAgICAvLyBBTkRzXG4gICAgICBmb3IgKGxldCBqID0gMCwgcExlbiA9IHNlYXJjaGVycy5sZW5ndGg7IGogPCBwTGVuOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoZXIgPSBzZWFyY2hlcnNbal07XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBpc01hdGNoLFxuICAgICAgICAgIGluZGljZXMsXG4gICAgICAgICAgc2NvcmVcbiAgICAgICAgfSA9IHNlYXJjaGVyLnNlYXJjaCh0ZXh0KTtcbiAgICAgICAgaWYgKGlzTWF0Y2gpIHtcbiAgICAgICAgICBudW1NYXRjaGVzICs9IDE7XG4gICAgICAgICAgdG90YWxTY29yZSArPSBzY29yZTtcbiAgICAgICAgICBpZiAoaW5jbHVkZU1hdGNoZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzZWFyY2hlci5jb25zdHJ1Y3Rvci50eXBlO1xuICAgICAgICAgICAgaWYgKE11bHRpTWF0Y2hTZXQuaGFzKHR5cGUpKSB7XG4gICAgICAgICAgICAgIGFsbEluZGljZXMgPSBbLi4uYWxsSW5kaWNlcywgLi4uaW5kaWNlc107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhbGxJbmRpY2VzLnB1c2goaW5kaWNlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvdGFsU2NvcmUgPSAwO1xuICAgICAgICAgIG51bU1hdGNoZXMgPSAwO1xuICAgICAgICAgIGFsbEluZGljZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBPUiBjb25kaXRpb24sIHNvIGlmIFRSVUUsIHJldHVyblxuICAgICAgaWYgKG51bU1hdGNoZXMpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHtcbiAgICAgICAgICBpc01hdGNoOiB0cnVlLFxuICAgICAgICAgIHNjb3JlOiB0b3RhbFNjb3JlIC8gbnVtTWF0Y2hlc1xuICAgICAgICB9O1xuICAgICAgICBpZiAoaW5jbHVkZU1hdGNoZXMpIHtcbiAgICAgICAgICByZXN1bHQuaW5kaWNlcyA9IGFsbEluZGljZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBOb3RoaW5nIHdhcyBtYXRjaGVkXG4gICAgcmV0dXJuIHtcbiAgICAgIGlzTWF0Y2g6IGZhbHNlLFxuICAgICAgc2NvcmU6IDFcbiAgICB9O1xuICB9XG59XG5jb25zdCByZWdpc3RlcmVkU2VhcmNoZXJzID0gW107XG5mdW5jdGlvbiByZWdpc3RlciguLi5hcmdzKSB7XG4gIHJlZ2lzdGVyZWRTZWFyY2hlcnMucHVzaCguLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVNlYXJjaGVyKHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHJlZ2lzdGVyZWRTZWFyY2hlcnMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICBsZXQgc2VhcmNoZXJDbGFzcyA9IHJlZ2lzdGVyZWRTZWFyY2hlcnNbaV07XG4gICAgaWYgKHNlYXJjaGVyQ2xhc3MuY29uZGl0aW9uKHBhdHRlcm4sIG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gbmV3IHNlYXJjaGVyQ2xhc3MocGF0dGVybiwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgQml0YXBTZWFyY2gocGF0dGVybiwgb3B0aW9ucyk7XG59XG5jb25zdCBMb2dpY2FsT3BlcmF0b3IgPSB7XG4gIEFORDogJyRhbmQnLFxuICBPUjogJyRvcidcbn07XG5jb25zdCBLZXlUeXBlID0ge1xuICBQQVRIOiAnJHBhdGgnLFxuICBQQVRURVJOOiAnJHZhbCdcbn07XG5jb25zdCBpc0V4cHJlc3Npb24gPSBxdWVyeSA9PiAhIShxdWVyeVtMb2dpY2FsT3BlcmF0b3IuQU5EXSB8fCBxdWVyeVtMb2dpY2FsT3BlcmF0b3IuT1JdKTtcbmNvbnN0IGlzUGF0aCA9IHF1ZXJ5ID0+ICEhcXVlcnlbS2V5VHlwZS5QQVRIXTtcbmNvbnN0IGlzTGVhZiA9IHF1ZXJ5ID0+ICFpc0FycmF5KHF1ZXJ5KSAmJiBpc09iamVjdChxdWVyeSkgJiYgIWlzRXhwcmVzc2lvbihxdWVyeSk7XG5jb25zdCBjb252ZXJ0VG9FeHBsaWNpdCA9IHF1ZXJ5ID0+ICh7XG4gIFtMb2dpY2FsT3BlcmF0b3IuQU5EXTogT2JqZWN0LmtleXMocXVlcnkpLm1hcChrZXkgPT4gKHtcbiAgICBba2V5XTogcXVlcnlba2V5XVxuICB9KSlcbn0pO1xuXG4vLyBXaGVuIGBhdXRvYCBpcyBgdHJ1ZWAsIHRoZSBwYXJzZSBmdW5jdGlvbiB3aWxsIGluZmVyIGFuZCBpbml0aWFsaXplIGFuZCBhZGRcbi8vIHRoZSBhcHByb3ByaWF0ZSBgU2VhcmNoZXJgIGluc3RhbmNlXG5mdW5jdGlvbiBwYXJzZShxdWVyeSwgb3B0aW9ucywge1xuICBhdXRvID0gdHJ1ZVxufSA9IHt9KSB7XG4gIGNvbnN0IG5leHQgPSBxdWVyeSA9PiB7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhxdWVyeSk7XG4gICAgY29uc3QgaXNRdWVyeVBhdGggPSBpc1BhdGgocXVlcnkpO1xuICAgIGlmICghaXNRdWVyeVBhdGggJiYga2V5cy5sZW5ndGggPiAxICYmICFpc0V4cHJlc3Npb24ocXVlcnkpKSB7XG4gICAgICByZXR1cm4gbmV4dChjb252ZXJ0VG9FeHBsaWNpdChxdWVyeSkpO1xuICAgIH1cbiAgICBpZiAoaXNMZWFmKHF1ZXJ5KSkge1xuICAgICAgY29uc3Qga2V5ID0gaXNRdWVyeVBhdGggPyBxdWVyeVtLZXlUeXBlLlBBVEhdIDoga2V5c1swXTtcbiAgICAgIGNvbnN0IHBhdHRlcm4gPSBpc1F1ZXJ5UGF0aCA/IHF1ZXJ5W0tleVR5cGUuUEFUVEVSTl0gOiBxdWVyeVtrZXldO1xuICAgICAgaWYgKCFpc1N0cmluZyhwYXR0ZXJuKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoTE9HSUNBTF9TRUFSQ0hfSU5WQUxJRF9RVUVSWV9GT1JfS0VZKGtleSkpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICBrZXlJZDogY3JlYXRlS2V5SWQoa2V5KSxcbiAgICAgICAgcGF0dGVyblxuICAgICAgfTtcbiAgICAgIGlmIChhdXRvKSB7XG4gICAgICAgIG9iai5zZWFyY2hlciA9IGNyZWF0ZVNlYXJjaGVyKHBhdHRlcm4sIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgbGV0IG5vZGUgPSB7XG4gICAgICBjaGlsZHJlbjogW10sXG4gICAgICBvcGVyYXRvcjoga2V5c1swXVxuICAgIH07XG4gICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHF1ZXJ5W2tleV07XG4gICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBub2RlLmNoaWxkcmVuLnB1c2gobmV4dChpdGVtKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBub2RlO1xuICB9O1xuICBpZiAoIWlzRXhwcmVzc2lvbihxdWVyeSkpIHtcbiAgICBxdWVyeSA9IGNvbnZlcnRUb0V4cGxpY2l0KHF1ZXJ5KTtcbiAgfVxuICByZXR1cm4gbmV4dChxdWVyeSk7XG59XG5cbi8vIFByYWN0aWNhbCBzY29yaW5nIGZ1bmN0aW9uXG5mdW5jdGlvbiBjb21wdXRlU2NvcmUocmVzdWx0cywge1xuICBpZ25vcmVGaWVsZE5vcm0gPSBDb25maWcuaWdub3JlRmllbGROb3JtXG59KSB7XG4gIHJlc3VsdHMuZm9yRWFjaChyZXN1bHQgPT4ge1xuICAgIGxldCB0b3RhbFNjb3JlID0gMTtcbiAgICByZXN1bHQubWF0Y2hlcy5mb3JFYWNoKCh7XG4gICAgICBrZXksXG4gICAgICBub3JtLFxuICAgICAgc2NvcmVcbiAgICB9KSA9PiB7XG4gICAgICBjb25zdCB3ZWlnaHQgPSBrZXkgPyBrZXkud2VpZ2h0IDogbnVsbDtcbiAgICAgIHRvdGFsU2NvcmUgKj0gTWF0aC5wb3coc2NvcmUgPT09IDAgJiYgd2VpZ2h0ID8gTnVtYmVyLkVQU0lMT04gOiBzY29yZSwgKHdlaWdodCB8fCAxKSAqIChpZ25vcmVGaWVsZE5vcm0gPyAxIDogbm9ybSkpO1xuICAgIH0pO1xuICAgIHJlc3VsdC5zY29yZSA9IHRvdGFsU2NvcmU7XG4gIH0pO1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtTWF0Y2hlcyhyZXN1bHQsIGRhdGEpIHtcbiAgY29uc3QgbWF0Y2hlcyA9IHJlc3VsdC5tYXRjaGVzO1xuICBkYXRhLm1hdGNoZXMgPSBbXTtcbiAgaWYgKCFpc0RlZmluZWQobWF0Y2hlcykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbWF0Y2hlcy5mb3JFYWNoKG1hdGNoID0+IHtcbiAgICBpZiAoIWlzRGVmaW5lZChtYXRjaC5pbmRpY2VzKSB8fCAhbWF0Y2guaW5kaWNlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qge1xuICAgICAgaW5kaWNlcyxcbiAgICAgIHZhbHVlXG4gICAgfSA9IG1hdGNoO1xuICAgIGxldCBvYmogPSB7XG4gICAgICBpbmRpY2VzLFxuICAgICAgdmFsdWVcbiAgICB9O1xuICAgIGlmIChtYXRjaC5rZXkpIHtcbiAgICAgIG9iai5rZXkgPSBtYXRjaC5rZXkuc3JjO1xuICAgIH1cbiAgICBpZiAobWF0Y2guaWR4ID4gLTEpIHtcbiAgICAgIG9iai5yZWZJbmRleCA9IG1hdGNoLmlkeDtcbiAgICB9XG4gICAgZGF0YS5tYXRjaGVzLnB1c2gob2JqKTtcbiAgfSk7XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm1TY29yZShyZXN1bHQsIGRhdGEpIHtcbiAgZGF0YS5zY29yZSA9IHJlc3VsdC5zY29yZTtcbn1cbmZ1bmN0aW9uIGZvcm1hdChyZXN1bHRzLCBkb2NzLCB7XG4gIGluY2x1ZGVNYXRjaGVzID0gQ29uZmlnLmluY2x1ZGVNYXRjaGVzLFxuICBpbmNsdWRlU2NvcmUgPSBDb25maWcuaW5jbHVkZVNjb3JlXG59ID0ge30pIHtcbiAgY29uc3QgdHJhbnNmb3JtZXJzID0gW107XG4gIGlmIChpbmNsdWRlTWF0Y2hlcykgdHJhbnNmb3JtZXJzLnB1c2godHJhbnNmb3JtTWF0Y2hlcyk7XG4gIGlmIChpbmNsdWRlU2NvcmUpIHRyYW5zZm9ybWVycy5wdXNoKHRyYW5zZm9ybVNjb3JlKTtcbiAgcmV0dXJuIHJlc3VsdHMubWFwKHJlc3VsdCA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaWR4XG4gICAgfSA9IHJlc3VsdDtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgaXRlbTogZG9jc1tpZHhdLFxuICAgICAgcmVmSW5kZXg6IGlkeFxuICAgIH07XG4gICAgaWYgKHRyYW5zZm9ybWVycy5sZW5ndGgpIHtcbiAgICAgIHRyYW5zZm9ybWVycy5mb3JFYWNoKHRyYW5zZm9ybWVyID0+IHtcbiAgICAgICAgdHJhbnNmb3JtZXIocmVzdWx0LCBkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfSk7XG59XG5jbGFzcyBGdXNlIHtcbiAgY29uc3RydWN0b3IoZG9jcywgb3B0aW9ucyA9IHt9LCBpbmRleCkge1xuICAgIHRoaXMub3B0aW9ucyA9IF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBDb25maWcpLCBvcHRpb25zKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZUV4dGVuZGVkU2VhcmNoICYmICF0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoRVhURU5ERURfU0VBUkNIX1VOQVZBSUxBQkxFKTtcbiAgICB9XG4gICAgdGhpcy5fa2V5U3RvcmUgPSBuZXcgS2V5U3RvcmUodGhpcy5vcHRpb25zLmtleXMpO1xuICAgIHRoaXMuc2V0Q29sbGVjdGlvbihkb2NzLCBpbmRleCk7XG4gIH1cbiAgc2V0Q29sbGVjdGlvbihkb2NzLCBpbmRleCkge1xuICAgIHRoaXMuX2RvY3MgPSBkb2NzO1xuICAgIGlmIChpbmRleCAmJiAhKGluZGV4IGluc3RhbmNlb2YgRnVzZUluZGV4KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKElOQ09SUkVDVF9JTkRFWF9UWVBFKTtcbiAgICB9XG4gICAgdGhpcy5fbXlJbmRleCA9IGluZGV4IHx8IGNyZWF0ZUluZGV4KHRoaXMub3B0aW9ucy5rZXlzLCB0aGlzLl9kb2NzLCB7XG4gICAgICBnZXRGbjogdGhpcy5vcHRpb25zLmdldEZuLFxuICAgICAgZmllbGROb3JtV2VpZ2h0OiB0aGlzLm9wdGlvbnMuZmllbGROb3JtV2VpZ2h0XG4gICAgfSk7XG4gIH1cbiAgYWRkKGRvYykge1xuICAgIGlmICghaXNEZWZpbmVkKGRvYykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZG9jcy5wdXNoKGRvYyk7XG4gICAgdGhpcy5fbXlJbmRleC5hZGQoZG9jKTtcbiAgfVxuICByZW1vdmUocHJlZGljYXRlID0gKCAvKiBkb2MsIGlkeCAqLykgPT4gZmFsc2UpIHtcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2RvY3MubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGRvYyA9IHRoaXMuX2RvY3NbaV07XG4gICAgICBpZiAocHJlZGljYXRlKGRvYywgaSkpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdChpKTtcbiAgICAgICAgaSAtPSAxO1xuICAgICAgICBsZW4gLT0gMTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGRvYyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG4gIHJlbW92ZUF0KGlkeCkge1xuICAgIHRoaXMuX2RvY3Muc3BsaWNlKGlkeCwgMSk7XG4gICAgdGhpcy5fbXlJbmRleC5yZW1vdmVBdChpZHgpO1xuICB9XG4gIGdldEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9teUluZGV4O1xuICB9XG4gIHNlYXJjaChxdWVyeSwge1xuICAgIGxpbWl0ID0gLTFcbiAgfSA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgaW5jbHVkZU1hdGNoZXMsXG4gICAgICBpbmNsdWRlU2NvcmUsXG4gICAgICBzaG91bGRTb3J0LFxuICAgICAgc29ydEZuLFxuICAgICAgaWdub3JlRmllbGROb3JtXG4gICAgfSA9IHRoaXMub3B0aW9ucztcbiAgICBsZXQgcmVzdWx0cyA9IGlzU3RyaW5nKHF1ZXJ5KSA/IGlzU3RyaW5nKHRoaXMuX2RvY3NbMF0pID8gdGhpcy5fc2VhcmNoU3RyaW5nTGlzdChxdWVyeSkgOiB0aGlzLl9zZWFyY2hPYmplY3RMaXN0KHF1ZXJ5KSA6IHRoaXMuX3NlYXJjaExvZ2ljYWwocXVlcnkpO1xuICAgIGNvbXB1dGVTY29yZShyZXN1bHRzLCB7XG4gICAgICBpZ25vcmVGaWVsZE5vcm1cbiAgICB9KTtcbiAgICBpZiAoc2hvdWxkU29ydCkge1xuICAgICAgcmVzdWx0cy5zb3J0KHNvcnRGbik7XG4gICAgfVxuICAgIGlmIChpc051bWJlcihsaW1pdCkgJiYgbGltaXQgPiAtMSkge1xuICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuc2xpY2UoMCwgbGltaXQpO1xuICAgIH1cbiAgICByZXR1cm4gZm9ybWF0KHJlc3VsdHMsIHRoaXMuX2RvY3MsIHtcbiAgICAgIGluY2x1ZGVNYXRjaGVzLFxuICAgICAgaW5jbHVkZVNjb3JlXG4gICAgfSk7XG4gIH1cbiAgX3NlYXJjaFN0cmluZ0xpc3QocXVlcnkpIHtcbiAgICBjb25zdCBzZWFyY2hlciA9IGNyZWF0ZVNlYXJjaGVyKHF1ZXJ5LCB0aGlzLm9wdGlvbnMpO1xuICAgIGNvbnN0IHtcbiAgICAgIHJlY29yZHNcbiAgICB9ID0gdGhpcy5fbXlJbmRleDtcbiAgICBjb25zdCByZXN1bHRzID0gW107XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgZXZlcnkgc3RyaW5nIGluIHRoZSBpbmRleFxuICAgIHJlY29yZHMuZm9yRWFjaCgoe1xuICAgICAgdjogdGV4dCxcbiAgICAgIGk6IGlkeCxcbiAgICAgIG46IG5vcm1cbiAgICB9KSA9PiB7XG4gICAgICBpZiAoIWlzRGVmaW5lZCh0ZXh0KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB7XG4gICAgICAgIGlzTWF0Y2gsXG4gICAgICAgIHNjb3JlLFxuICAgICAgICBpbmRpY2VzXG4gICAgICB9ID0gc2VhcmNoZXIuc2VhcmNoSW4odGV4dCk7XG4gICAgICBpZiAoaXNNYXRjaCkge1xuICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgIGl0ZW06IHRleHQsXG4gICAgICAgICAgaWR4LFxuICAgICAgICAgIG1hdGNoZXM6IFt7XG4gICAgICAgICAgICBzY29yZSxcbiAgICAgICAgICAgIHZhbHVlOiB0ZXh0LFxuICAgICAgICAgICAgbm9ybSxcbiAgICAgICAgICAgIGluZGljZXNcbiAgICAgICAgICB9XVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuICBfc2VhcmNoTG9naWNhbChxdWVyeSkge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSBwYXJzZShxdWVyeSwgdGhpcy5vcHRpb25zKTtcbiAgICBjb25zdCBldmFsdWF0ZSA9IChub2RlLCBpdGVtLCBpZHgpID0+IHtcbiAgICAgIGlmICghbm9kZS5jaGlsZHJlbikge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAga2V5SWQsXG4gICAgICAgICAgc2VhcmNoZXJcbiAgICAgICAgfSA9IG5vZGU7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLl9maW5kTWF0Y2hlcyh7XG4gICAgICAgICAga2V5OiB0aGlzLl9rZXlTdG9yZS5nZXQoa2V5SWQpLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLl9teUluZGV4LmdldFZhbHVlRm9ySXRlbUF0S2V5SWQoaXRlbSwga2V5SWQpLFxuICAgICAgICAgIHNlYXJjaGVyXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgaWR4LFxuICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgIG1hdGNoZXNcbiAgICAgICAgICB9XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgICBjb25zdCByZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZXZhbHVhdGUoY2hpbGQsIGl0ZW0sIGlkeCk7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgcmVzLnB1c2goLi4ucmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLm9wZXJhdG9yID09PSBMb2dpY2FsT3BlcmF0b3IuQU5EKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gICAgY29uc3QgcmVjb3JkcyA9IHRoaXMuX215SW5kZXgucmVjb3JkcztcbiAgICBjb25zdCByZXN1bHRNYXAgPSB7fTtcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgcmVjb3Jkcy5mb3JFYWNoKCh7XG4gICAgICAkOiBpdGVtLFxuICAgICAgaTogaWR4XG4gICAgfSkgPT4ge1xuICAgICAgaWYgKGlzRGVmaW5lZChpdGVtKSkge1xuICAgICAgICBsZXQgZXhwUmVzdWx0cyA9IGV2YWx1YXRlKGV4cHJlc3Npb24sIGl0ZW0sIGlkeCk7XG4gICAgICAgIGlmIChleHBSZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgIC8vIERlZHVwZSB3aGVuIGFkZGluZ1xuICAgICAgICAgIGlmICghcmVzdWx0TWFwW2lkeF0pIHtcbiAgICAgICAgICAgIHJlc3VsdE1hcFtpZHhdID0ge1xuICAgICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgICAgIG1hdGNoZXM6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdE1hcFtpZHhdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXhwUmVzdWx0cy5mb3JFYWNoKCh7XG4gICAgICAgICAgICBtYXRjaGVzXG4gICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0TWFwW2lkeF0ubWF0Y2hlcy5wdXNoKC4uLm1hdGNoZXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cbiAgX3NlYXJjaE9iamVjdExpc3QocXVlcnkpIHtcbiAgICBjb25zdCBzZWFyY2hlciA9IGNyZWF0ZVNlYXJjaGVyKHF1ZXJ5LCB0aGlzLm9wdGlvbnMpO1xuICAgIGNvbnN0IHtcbiAgICAgIGtleXMsXG4gICAgICByZWNvcmRzXG4gICAgfSA9IHRoaXMuX215SW5kZXg7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgLy8gTGlzdCBpcyBBcnJheTxPYmplY3Q+XG4gICAgcmVjb3Jkcy5mb3JFYWNoKCh7XG4gICAgICAkOiBpdGVtLFxuICAgICAgaTogaWR4XG4gICAgfSkgPT4ge1xuICAgICAgaWYgKCFpc0RlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbGV0IG1hdGNoZXMgPSBbXTtcblxuICAgICAgLy8gSXRlcmF0ZSBvdmVyIGV2ZXJ5IGtleSAoaS5lLCBwYXRoKSwgYW5kIGZldGNoIHRoZSB2YWx1ZSBhdCB0aGF0IGtleVxuICAgICAga2V5cy5mb3JFYWNoKChrZXksIGtleUluZGV4KSA9PiB7XG4gICAgICAgIG1hdGNoZXMucHVzaCguLi50aGlzLl9maW5kTWF0Y2hlcyh7XG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHZhbHVlOiBpdGVtW2tleUluZGV4XSxcbiAgICAgICAgICBzZWFyY2hlclxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCkge1xuICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgIGlkeCxcbiAgICAgICAgICBpdGVtLFxuICAgICAgICAgIG1hdGNoZXNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cbiAgX2ZpbmRNYXRjaGVzKHtcbiAgICBrZXksXG4gICAgdmFsdWUsXG4gICAgc2VhcmNoZXJcbiAgfSkge1xuICAgIGlmICghaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBsZXQgbWF0Y2hlcyA9IFtdO1xuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaCgoe1xuICAgICAgICB2OiB0ZXh0LFxuICAgICAgICBpOiBpZHgsXG4gICAgICAgIG46IG5vcm1cbiAgICAgIH0pID0+IHtcbiAgICAgICAgaWYgKCFpc0RlZmluZWQodGV4dCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGlzTWF0Y2gsXG4gICAgICAgICAgc2NvcmUsXG4gICAgICAgICAgaW5kaWNlc1xuICAgICAgICB9ID0gc2VhcmNoZXIuc2VhcmNoSW4odGV4dCk7XG4gICAgICAgIGlmIChpc01hdGNoKSB7XG4gICAgICAgICAgbWF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgIHNjb3JlLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgdmFsdWU6IHRleHQsXG4gICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICBub3JtLFxuICAgICAgICAgICAgaW5kaWNlc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qge1xuICAgICAgICB2OiB0ZXh0LFxuICAgICAgICBuOiBub3JtXG4gICAgICB9ID0gdmFsdWU7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGlzTWF0Y2gsXG4gICAgICAgIHNjb3JlLFxuICAgICAgICBpbmRpY2VzXG4gICAgICB9ID0gc2VhcmNoZXIuc2VhcmNoSW4odGV4dCk7XG4gICAgICBpZiAoaXNNYXRjaCkge1xuICAgICAgICBtYXRjaGVzLnB1c2goe1xuICAgICAgICAgIHNjb3JlLFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICB2YWx1ZTogdGV4dCxcbiAgICAgICAgICBub3JtLFxuICAgICAgICAgIGluZGljZXNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG59XG5GdXNlLnZlcnNpb24gPSAnNy4wLjAnO1xuRnVzZS5jcmVhdGVJbmRleCA9IGNyZWF0ZUluZGV4O1xuRnVzZS5wYXJzZUluZGV4ID0gcGFyc2VJbmRleDtcbkZ1c2UuY29uZmlnID0gQ29uZmlnO1xue1xuICBGdXNlLnBhcnNlUXVlcnkgPSBwYXJzZTtcbn1cbntcbiAgcmVnaXN0ZXIoRXh0ZW5kZWRTZWFyY2gpO1xufVxuXG52YXIgU2VhcmNoQnlGdXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNlYXJjaEJ5RnVzZShjb25maWcpIHtcbiAgICAgICAgdGhpcy5faGF5c3RhY2sgPSBbXTtcbiAgICAgICAgdGhpcy5fZnVzZU9wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgY29uZmlnLmZ1c2VPcHRpb25zKSwgeyBrZXlzOiBfX3NwcmVhZEFycmF5KFtdLCBjb25maWcuc2VhcmNoRmllbGRzLCB0cnVlKSwgaW5jbHVkZU1hdGNoZXM6IHRydWUgfSk7XG4gICAgfVxuICAgIFNlYXJjaEJ5RnVzZS5wcm90b3R5cGUuaW5kZXggPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB0aGlzLl9oYXlzdGFjayA9IGRhdGE7XG4gICAgICAgIGlmICh0aGlzLl9mdXNlKSB7XG4gICAgICAgICAgICB0aGlzLl9mdXNlLnNldENvbGxlY3Rpb24oZGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNlYXJjaEJ5RnVzZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2hheXN0YWNrID0gW107XG4gICAgICAgIHRoaXMuX2Z1c2UgPSB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBTZWFyY2hCeUZ1c2UucHJvdG90eXBlLmlzRW1wdHlJbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLl9oYXlzdGFjay5sZW5ndGg7XG4gICAgfTtcbiAgICBTZWFyY2hCeUZ1c2UucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChuZWVkbGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9mdXNlKSB7XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnVzZSA9IG5ldyBGdXNlKHRoaXMuX2hheXN0YWNrLCB0aGlzLl9mdXNlT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdHMgPSB0aGlzLl9mdXNlLnNlYXJjaChuZWVkbGUpO1xuICAgICAgICByZXR1cm4gcmVzdWx0cy5tYXAoZnVuY3Rpb24gKHZhbHVlLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGl0ZW06IHZhbHVlLml0ZW0sXG4gICAgICAgICAgICAgICAgc2NvcmU6IHZhbHVlLnNjb3JlIHx8IDAsXG4gICAgICAgICAgICAgICAgcmFuazogaSArIDEsIC8vIElmIHZhbHVlLnNjb3JlIGlzIHVzZWQgZm9yIHNvcnRpbmcsIHRoaXMgY2FuIGNyZWF0ZSBub24tc3RhYmxlIHNvcnRzIVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2VhcmNoQnlGdXNlO1xufSgpKTtcblxuZnVuY3Rpb24gZ2V0U2VhcmNoZXIoY29uZmlnKSB7XG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaEJ5RnVzZShjb25maWcpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBIZWxwZXJzIHRvIGNyZWF0ZSBIVE1MIGVsZW1lbnRzIHVzZWQgYnkgQ2hvaWNlc1xuICogQ2FuIGJlIG92ZXJyaWRkZW4gYnkgcHJvdmlkaW5nIGBjYWxsYmFja09uQ3JlYXRlVGVtcGxhdGVzYCBvcHRpb24uXG4gKiBgQ2hvaWNlcy5kZWZhdWx0cy50ZW1wbGF0ZXNgIGFsbG93cyBhY2Nlc3MgdG8gdGhlIGRlZmF1bHQgdGVtcGxhdGUgbWV0aG9kcyBmcm9tIGBjYWxsYmFja09uQ3JlYXRlVGVtcGxhdGVzYFxuICovXG52YXIgaXNFbXB0eU9iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgYXNzaWduQ3VzdG9tUHJvcGVydGllcyA9IGZ1bmN0aW9uIChlbCwgY2hvaWNlLCB3aXRoQ3VzdG9tUHJvcGVydGllcykge1xuICAgIHZhciBkYXRhc2V0ID0gZWwuZGF0YXNldDtcbiAgICB2YXIgY3VzdG9tUHJvcGVydGllcyA9IGNob2ljZS5jdXN0b21Qcm9wZXJ0aWVzLCBsYWJlbENsYXNzID0gY2hvaWNlLmxhYmVsQ2xhc3MsIGxhYmVsRGVzY3JpcHRpb24gPSBjaG9pY2UubGFiZWxEZXNjcmlwdGlvbjtcbiAgICBpZiAobGFiZWxDbGFzcykge1xuICAgICAgICBkYXRhc2V0LmxhYmVsQ2xhc3MgPSBnZXRDbGFzc05hbWVzKGxhYmVsQ2xhc3MpLmpvaW4oJyAnKTtcbiAgICB9XG4gICAgaWYgKGxhYmVsRGVzY3JpcHRpb24pIHtcbiAgICAgICAgZGF0YXNldC5sYWJlbERlc2NyaXB0aW9uID0gbGFiZWxEZXNjcmlwdGlvbjtcbiAgICB9XG4gICAgaWYgKHdpdGhDdXN0b21Qcm9wZXJ0aWVzICYmIGN1c3RvbVByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjdXN0b21Qcm9wZXJ0aWVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGF0YXNldC5jdXN0b21Qcm9wZXJ0aWVzID0gY3VzdG9tUHJvcGVydGllcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgY3VzdG9tUHJvcGVydGllcyA9PT0gJ29iamVjdCcgJiYgIWlzRW1wdHlPYmplY3QoY3VzdG9tUHJvcGVydGllcykpIHtcbiAgICAgICAgICAgIGRhdGFzZXQuY3VzdG9tUHJvcGVydGllcyA9IEpTT04uc3RyaW5naWZ5KGN1c3RvbVByb3BlcnRpZXMpO1xuICAgICAgICB9XG4gICAgfVxufTtcbnZhciBhZGRBcmlhTGFiZWwgPSBmdW5jdGlvbiAoZG9jUm9vdCwgaWQsIGVsZW1lbnQpIHtcbiAgICB2YXIgbGFiZWwgPSBpZCAmJiBkb2NSb290LnF1ZXJ5U2VsZWN0b3IoXCJsYWJlbFtmb3I9J1wiLmNvbmNhdChpZCwgXCInXVwiKSk7XG4gICAgdmFyIHRleHQgPSBsYWJlbCAmJiBsYWJlbC5pbm5lclRleHQ7XG4gICAgaWYgKHRleHQpIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCB0ZXh0KTtcbiAgICB9XG59O1xudmFyIHRlbXBsYXRlcyA9IHtcbiAgICBjb250YWluZXJPdXRlcjogZnVuY3Rpb24gKF9hLCBkaXIsIGlzU2VsZWN0RWxlbWVudCwgaXNTZWxlY3RPbmVFbGVtZW50LCBzZWFyY2hFbmFibGVkLCBwYXNzZWRFbGVtZW50VHlwZSwgbGFiZWxJZCkge1xuICAgICAgICB2YXIgY29udGFpbmVyT3V0ZXIgPSBfYS5jbGFzc05hbWVzLmNvbnRhaW5lck91dGVyO1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZGl2LCBjb250YWluZXJPdXRlcik7XG4gICAgICAgIGRpdi5kYXRhc2V0LnR5cGUgPSBwYXNzZWRFbGVtZW50VHlwZTtcbiAgICAgICAgaWYgKGRpcikge1xuICAgICAgICAgICAgZGl2LmRpciA9IGRpcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNTZWxlY3RPbmVFbGVtZW50KSB7XG4gICAgICAgICAgICBkaXYudGFiSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1NlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCBzZWFyY2hFbmFibGVkID8gJ2NvbWJvYm94JyA6ICdsaXN0Ym94Jyk7XG4gICAgICAgICAgICBpZiAoc2VhcmNoRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtYXV0b2NvbXBsZXRlJywgJ2xpc3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFsYWJlbElkKSB7XG4gICAgICAgICAgICAgICAgYWRkQXJpYUxhYmVsKHRoaXMuX2RvY1Jvb3QsIHRoaXMucGFzc2VkRWxlbWVudC5lbGVtZW50LmlkLCBkaXYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1oYXNwb3B1cCcsICd0cnVlJyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhYmVsSWQpIHtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScsIGxhYmVsSWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfSxcbiAgICBjb250YWluZXJJbm5lcjogZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBjb250YWluZXJJbm5lciA9IF9hLmNsYXNzTmFtZXMuY29udGFpbmVySW5uZXI7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChkaXYsIGNvbnRhaW5lcklubmVyKTtcbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICB9LFxuICAgIGl0ZW1MaXN0OiBmdW5jdGlvbiAoX2EsIGlzU2VsZWN0T25lRWxlbWVudCkge1xuICAgICAgICB2YXIgc2VhcmNoRW5hYmxlZCA9IF9hLnNlYXJjaEVuYWJsZWQsIF9iID0gX2EuY2xhc3NOYW1lcywgbGlzdCA9IF9iLmxpc3QsIGxpc3RTaW5nbGUgPSBfYi5saXN0U2luZ2xlLCBsaXN0SXRlbXMgPSBfYi5saXN0SXRlbXM7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChkaXYsIGxpc3QpO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgaXNTZWxlY3RPbmVFbGVtZW50ID8gbGlzdFNpbmdsZSA6IGxpc3RJdGVtcyk7XG4gICAgICAgIGlmICh0aGlzLl9pc1NlbGVjdEVsZW1lbnQgJiYgc2VhcmNoRW5hYmxlZCkge1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgncm9sZScsICdsaXN0Ym94Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICB9LFxuICAgIHBsYWNlaG9sZGVyOiBmdW5jdGlvbiAoX2EsIHZhbHVlKSB7XG4gICAgICAgIHZhciBhbGxvd0hUTUwgPSBfYS5hbGxvd0hUTUwsIHBsYWNlaG9sZGVyID0gX2EuY2xhc3NOYW1lcy5wbGFjZWhvbGRlcjtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgcGxhY2Vob2xkZXIpO1xuICAgICAgICBzZXRFbGVtZW50SHRtbChkaXYsIGFsbG93SFRNTCwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gZGl2O1xuICAgIH0sXG4gICAgaXRlbTogZnVuY3Rpb24gKF9hLCBjaG9pY2UsIHJlbW92ZUl0ZW1CdXR0b24pIHtcbiAgICAgICAgdmFyIGFsbG93SFRNTCA9IF9hLmFsbG93SFRNTCwgcmVtb3ZlSXRlbUJ1dHRvbkFsaWduTGVmdCA9IF9hLnJlbW92ZUl0ZW1CdXR0b25BbGlnbkxlZnQsIHJlbW92ZUl0ZW1JY29uVGV4dCA9IF9hLnJlbW92ZUl0ZW1JY29uVGV4dCwgcmVtb3ZlSXRlbUxhYmVsVGV4dCA9IF9hLnJlbW92ZUl0ZW1MYWJlbFRleHQsIF9iID0gX2EuY2xhc3NOYW1lcywgaXRlbSA9IF9iLml0ZW0sIGJ1dHRvbiA9IF9iLmJ1dHRvbiwgaGlnaGxpZ2h0ZWRTdGF0ZSA9IF9iLmhpZ2hsaWdodGVkU3RhdGUsIGl0ZW1TZWxlY3RhYmxlID0gX2IuaXRlbVNlbGVjdGFibGUsIHBsYWNlaG9sZGVyID0gX2IucGxhY2Vob2xkZXI7XG4gICAgICAgIHZhciByYXdWYWx1ZSA9IHVud3JhcFN0cmluZ0ZvclJhdyhjaG9pY2UudmFsdWUpO1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZGl2LCBpdGVtKTtcbiAgICAgICAgaWYgKGNob2ljZS5sYWJlbENsYXNzKSB7XG4gICAgICAgICAgICB2YXIgc3BhbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc2V0RWxlbWVudEh0bWwoc3BhbkxhYmVsLCBhbGxvd0hUTUwsIGNob2ljZS5sYWJlbCk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KHNwYW5MYWJlbCwgY2hvaWNlLmxhYmVsQ2xhc3MpO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHNwYW5MYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRFbGVtZW50SHRtbChkaXYsIGFsbG93SFRNTCwgY2hvaWNlLmxhYmVsKTtcbiAgICAgICAgfVxuICAgICAgICBkaXYuZGF0YXNldC5pdGVtID0gJyc7XG4gICAgICAgIGRpdi5kYXRhc2V0LmlkID0gY2hvaWNlLmlkO1xuICAgICAgICBkaXYuZGF0YXNldC52YWx1ZSA9IHJhd1ZhbHVlO1xuICAgICAgICBhc3NpZ25DdXN0b21Qcm9wZXJ0aWVzKGRpdiwgY2hvaWNlLCB0cnVlKTtcbiAgICAgICAgaWYgKGNob2ljZS5kaXNhYmxlZCB8fCB0aGlzLmNvbnRhaW5lck91dGVyLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pc1NlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgncm9sZScsICdvcHRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hvaWNlLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgcGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgZGl2LmRhdGFzZXQucGxhY2Vob2xkZXIgPSAnJztcbiAgICAgICAgfVxuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgY2hvaWNlLmhpZ2hsaWdodGVkID8gaGlnaGxpZ2h0ZWRTdGF0ZSA6IGl0ZW1TZWxlY3RhYmxlKTtcbiAgICAgICAgaWYgKHJlbW92ZUl0ZW1CdXR0b24pIHtcbiAgICAgICAgICAgIGlmIChjaG9pY2UuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzc2VzRnJvbUVsZW1lbnQoZGl2LCBpdGVtU2VsZWN0YWJsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXYuZGF0YXNldC5kZWxldGFibGUgPSAnJztcbiAgICAgICAgICAgIHZhciByZW1vdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHJlbW92ZUJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KHJlbW92ZUJ1dHRvbiwgYnV0dG9uKTtcbiAgICAgICAgICAgIHNldEVsZW1lbnRIdG1sKHJlbW92ZUJ1dHRvbiwgdHJ1ZSwgcmVzb2x2ZU5vdGljZUZ1bmN0aW9uKHJlbW92ZUl0ZW1JY29uVGV4dCwgY2hvaWNlLnZhbHVlKSk7XG4gICAgICAgICAgICB2YXIgUkVNT1ZFX0lURU1fTEFCRUwgPSByZXNvbHZlTm90aWNlRnVuY3Rpb24ocmVtb3ZlSXRlbUxhYmVsVGV4dCwgY2hvaWNlLnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChSRU1PVkVfSVRFTV9MQUJFTCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBSRU1PVkVfSVRFTV9MQUJFTCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZW1vdmVCdXR0b24uZGF0YXNldC5idXR0b24gPSAnJztcbiAgICAgICAgICAgIGlmIChyZW1vdmVJdGVtQnV0dG9uQWxpZ25MZWZ0KSB7XG4gICAgICAgICAgICAgICAgZGl2Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIHJlbW92ZUJ1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQocmVtb3ZlQnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGl2O1xuICAgIH0sXG4gICAgY2hvaWNlTGlzdDogZnVuY3Rpb24gKF9hLCBpc1NlbGVjdE9uZUVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGxpc3QgPSBfYS5jbGFzc05hbWVzLmxpc3Q7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChkaXYsIGxpc3QpO1xuICAgICAgICBpZiAoIWlzU2VsZWN0T25lRWxlbWVudCkge1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1tdWx0aXNlbGVjdGFibGUnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbGlzdGJveCcpO1xuICAgICAgICByZXR1cm4gZGl2O1xuICAgIH0sXG4gICAgY2hvaWNlR3JvdXA6IGZ1bmN0aW9uIChfYSwgX2IpIHtcbiAgICAgICAgdmFyIGFsbG93SFRNTCA9IF9hLmFsbG93SFRNTCwgX2MgPSBfYS5jbGFzc05hbWVzLCBncm91cCA9IF9jLmdyb3VwLCBncm91cEhlYWRpbmcgPSBfYy5ncm91cEhlYWRpbmcsIGl0ZW1EaXNhYmxlZCA9IF9jLml0ZW1EaXNhYmxlZDtcbiAgICAgICAgdmFyIGlkID0gX2IuaWQsIGxhYmVsID0gX2IubGFiZWwsIGRpc2FibGVkID0gX2IuZGlzYWJsZWQ7XG4gICAgICAgIHZhciByYXdMYWJlbCA9IHVud3JhcFN0cmluZ0ZvclJhdyhsYWJlbCk7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChkaXYsIGdyb3VwKTtcbiAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgaXRlbURpc2FibGVkKTtcbiAgICAgICAgfVxuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2dyb3VwJyk7XG4gICAgICAgIGRpdi5kYXRhc2V0Lmdyb3VwID0gJyc7XG4gICAgICAgIGRpdi5kYXRhc2V0LmlkID0gaWQ7XG4gICAgICAgIGRpdi5kYXRhc2V0LnZhbHVlID0gcmF3TGFiZWw7XG4gICAgICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChoZWFkaW5nLCBncm91cEhlYWRpbmcpO1xuICAgICAgICBzZXRFbGVtZW50SHRtbChoZWFkaW5nLCBhbGxvd0hUTUwsIGxhYmVsIHx8ICcnKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuICAgICAgICByZXR1cm4gZGl2O1xuICAgIH0sXG4gICAgY2hvaWNlOiBmdW5jdGlvbiAoX2EsIGNob2ljZSwgc2VsZWN0VGV4dCwgZ3JvdXBOYW1lKSB7XG4gICAgICAgIHZhciBhbGxvd0hUTUwgPSBfYS5hbGxvd0hUTUwsIF9iID0gX2EuY2xhc3NOYW1lcywgaXRlbSA9IF9iLml0ZW0sIGl0ZW1DaG9pY2UgPSBfYi5pdGVtQ2hvaWNlLCBpdGVtU2VsZWN0YWJsZSA9IF9iLml0ZW1TZWxlY3RhYmxlLCBzZWxlY3RlZFN0YXRlID0gX2Iuc2VsZWN0ZWRTdGF0ZSwgaXRlbURpc2FibGVkID0gX2IuaXRlbURpc2FibGVkLCBkZXNjcmlwdGlvbiA9IF9iLmRlc2NyaXB0aW9uLCBwbGFjZWhvbGRlciA9IF9iLnBsYWNlaG9sZGVyO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGxhYmVsID0gY2hvaWNlLmxhYmVsO1xuICAgICAgICB2YXIgcmF3VmFsdWUgPSB1bndyYXBTdHJpbmdGb3JSYXcoY2hvaWNlLnZhbHVlKTtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuaWQgPSBjaG9pY2UuZWxlbWVudElkO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgaXRlbSk7XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZGl2LCBpdGVtQ2hvaWNlKTtcbiAgICAgICAgaWYgKGdyb3VwTmFtZSAmJiB0eXBlb2YgbGFiZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBsYWJlbCA9IGVzY2FwZUZvclRlbXBsYXRlKGFsbG93SFRNTCwgbGFiZWwpO1xuICAgICAgICAgICAgbGFiZWwgKz0gXCIgKFwiLmNvbmNhdChncm91cE5hbWUsIFwiKVwiKTtcbiAgICAgICAgICAgIGxhYmVsID0geyB0cnVzdGVkOiBsYWJlbCB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZXNjcmliZWRCeSA9IGRpdjtcbiAgICAgICAgaWYgKGNob2ljZS5sYWJlbENsYXNzKSB7XG4gICAgICAgICAgICB2YXIgc3BhbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc2V0RWxlbWVudEh0bWwoc3BhbkxhYmVsLCBhbGxvd0hUTUwsIGxhYmVsKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoc3BhbkxhYmVsLCBjaG9pY2UubGFiZWxDbGFzcyk7XG4gICAgICAgICAgICBkZXNjcmliZWRCeSA9IHNwYW5MYWJlbDtcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuTGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2V0RWxlbWVudEh0bWwoZGl2LCBhbGxvd0hUTUwsIGxhYmVsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hvaWNlLmxhYmVsRGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHZhciBkZXNjSWQgPSBcIlwiLmNvbmNhdChjaG9pY2UuZWxlbWVudElkLCBcIi1kZXNjcmlwdGlvblwiKTtcbiAgICAgICAgICAgIGRlc2NyaWJlZEJ5LnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIGRlc2NJZCk7XG4gICAgICAgICAgICB2YXIgc3BhbkRlc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBzZXRFbGVtZW50SHRtbChzcGFuRGVzYywgYWxsb3dIVE1MLCBjaG9pY2UubGFiZWxEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBzcGFuRGVzYy5pZCA9IGRlc2NJZDtcbiAgICAgICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoc3BhbkRlc2MsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuRGVzYyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNob2ljZS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChkaXYsIHNlbGVjdGVkU3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaG9pY2UucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZGl2LCBwbGFjZWhvbGRlcik7XG4gICAgICAgIH1cbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgncm9sZScsIGNob2ljZS5ncm91cCA/ICd0cmVlaXRlbScgOiAnb3B0aW9uJyk7XG4gICAgICAgIGRpdi5kYXRhc2V0LmNob2ljZSA9ICcnO1xuICAgICAgICBkaXYuZGF0YXNldC5pZCA9IGNob2ljZS5pZDtcbiAgICAgICAgZGl2LmRhdGFzZXQudmFsdWUgPSByYXdWYWx1ZTtcbiAgICAgICAgaWYgKHNlbGVjdFRleHQpIHtcbiAgICAgICAgICAgIGRpdi5kYXRhc2V0LnNlbGVjdFRleHQgPSBzZWxlY3RUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaG9pY2UuZ3JvdXApIHtcbiAgICAgICAgICAgIGRpdi5kYXRhc2V0Lmdyb3VwSWQgPSBcIlwiLmNvbmNhdChjaG9pY2UuZ3JvdXAuaWQpO1xuICAgICAgICB9XG4gICAgICAgIGFzc2lnbkN1c3RvbVByb3BlcnRpZXMoZGl2LCBjaG9pY2UsIGZhbHNlKTtcbiAgICAgICAgaWYgKGNob2ljZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChkaXYsIGl0ZW1EaXNhYmxlZCk7XG4gICAgICAgICAgICBkaXYuZGF0YXNldC5jaG9pY2VEaXNhYmxlZCA9ICcnO1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgaXRlbVNlbGVjdGFibGUpO1xuICAgICAgICAgICAgZGl2LmRhdGFzZXQuY2hvaWNlU2VsZWN0YWJsZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfSxcbiAgICBpbnB1dDogZnVuY3Rpb24gKF9hLCBwbGFjZWhvbGRlclZhbHVlKSB7XG4gICAgICAgIHZhciBfYiA9IF9hLmNsYXNzTmFtZXMsIGlucHV0ID0gX2IuaW5wdXQsIGlucHV0Q2xvbmVkID0gX2IuaW5wdXRDbG9uZWQsIGxhYmVsSWQgPSBfYS5sYWJlbElkO1xuICAgICAgICB2YXIgaW5wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wLnR5cGUgPSAnc2VhcmNoJztcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChpbnAsIGlucHV0KTtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChpbnAsIGlucHV0Q2xvbmVkKTtcbiAgICAgICAgaW5wLmF1dG9jb21wbGV0ZSA9ICdvZmYnO1xuICAgICAgICBpbnAuYXV0b2NhcGl0YWxpemUgPSAnb2ZmJztcbiAgICAgICAgaW5wLnNwZWxsY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgaW5wLnNldEF0dHJpYnV0ZSgncm9sZScsICd0ZXh0Ym94Jyk7XG4gICAgICAgIGlucC5zZXRBdHRyaWJ1dGUoJ2FyaWEtYXV0b2NvbXBsZXRlJywgJ2xpc3QnKTtcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyVmFsdWUpIHtcbiAgICAgICAgICAgIGlucC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBwbGFjZWhvbGRlclZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbGFiZWxJZCkge1xuICAgICAgICAgICAgYWRkQXJpYUxhYmVsKHRoaXMuX2RvY1Jvb3QsIHRoaXMucGFzc2VkRWxlbWVudC5lbGVtZW50LmlkLCBpbnApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnA7XG4gICAgfSxcbiAgICBkcm9wZG93bjogZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBfYiA9IF9hLmNsYXNzTmFtZXMsIGxpc3QgPSBfYi5saXN0LCBsaXN0RHJvcGRvd24gPSBfYi5saXN0RHJvcGRvd247XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChkaXYsIGxpc3QpO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgbGlzdERyb3Bkb3duKTtcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICByZXR1cm4gZGl2O1xuICAgIH0sXG4gICAgbm90aWNlOiBmdW5jdGlvbiAoX2EsIGlubmVySFRNTCwgdHlwZSkge1xuICAgICAgICB2YXIgX2IgPSBfYS5jbGFzc05hbWVzLCBpdGVtID0gX2IuaXRlbSwgaXRlbUNob2ljZSA9IF9iLml0ZW1DaG9pY2UsIGFkZENob2ljZSA9IF9iLmFkZENob2ljZSwgbm9SZXN1bHRzID0gX2Iubm9SZXN1bHRzLCBub0Nob2ljZXMgPSBfYi5ub0Nob2ljZXMsIG5vdGljZUl0ZW0gPSBfYi5ub3RpY2U7XG4gICAgICAgIGlmICh0eXBlID09PSB2b2lkIDApIHsgdHlwZSA9IE5vdGljZVR5cGVzLmdlbmVyaWM7IH1cbiAgICAgICAgdmFyIG5vdGljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzZXRFbGVtZW50SHRtbChub3RpY2UsIHRydWUsIGlubmVySFRNTCk7XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQobm90aWNlLCBpdGVtKTtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChub3RpY2UsIGl0ZW1DaG9pY2UpO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KG5vdGljZSwgbm90aWNlSXRlbSk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZWZhdWx0LWNhc2VcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIE5vdGljZVR5cGVzLmFkZENob2ljZTpcbiAgICAgICAgICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KG5vdGljZSwgYWRkQ2hvaWNlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTm90aWNlVHlwZXMubm9SZXN1bHRzOlxuICAgICAgICAgICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQobm90aWNlLCBub1Jlc3VsdHMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOb3RpY2VUeXBlcy5ub0Nob2ljZXM6XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChub3RpY2UsIG5vQ2hvaWNlcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09IE5vdGljZVR5cGVzLmFkZENob2ljZSkge1xuICAgICAgICAgICAgbm90aWNlLmRhdGFzZXQuY2hvaWNlU2VsZWN0YWJsZSA9ICcnO1xuICAgICAgICAgICAgbm90aWNlLmRhdGFzZXQuY2hvaWNlID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vdGljZTtcbiAgICB9LFxuICAgIG9wdGlvbjogZnVuY3Rpb24gKGNob2ljZSkge1xuICAgICAgICAvLyBIdG1sT3B0aW9uRWxlbWVudCdzIGxhYmVsIHZhbHVlIGRvZXMgbm90IHN1cHBvcnQgSFRNTCwgc28gdGhlIGF2b2lkIGRvdWJsZSBlc2NhcGluZyB1bndyYXAgdGhlIHVudHJ1c3RlZCBzdHJpbmcuXG4gICAgICAgIHZhciBsYWJlbFZhbHVlID0gdW53cmFwU3RyaW5nRm9yUmF3KGNob2ljZS5sYWJlbCk7XG4gICAgICAgIHZhciBvcHQgPSBuZXcgT3B0aW9uKGxhYmVsVmFsdWUsIGNob2ljZS52YWx1ZSwgZmFsc2UsIGNob2ljZS5zZWxlY3RlZCk7XG4gICAgICAgIGFzc2lnbkN1c3RvbVByb3BlcnRpZXMob3B0LCBjaG9pY2UsIHRydWUpO1xuICAgICAgICBvcHQuZGlzYWJsZWQgPSBjaG9pY2UuZGlzYWJsZWQ7XG4gICAgICAgIGlmIChjaG9pY2Uuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIG9wdC5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHQ7XG4gICAgfSxcbn07XG5cbi8qKiBAc2VlIHtAbGluayBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1hY2VhMDc1ZDBhYzY5NTRmMjc1YTcwMDIzOTA2MDUwY30gKi9cbnZhciBJU19JRTExID0gJy1tcy1zY3JvbGwtbGltaXQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJlxuICAgICctbXMtaW1lLWFsaWduJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG52YXIgVVNFUl9ERUZBVUxUUyA9IHt9O1xudmFyIHBhcnNlRGF0YVNldElkID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQuZGF0YXNldC5pZCA/IHBhcnNlSW50KGVsZW1lbnQuZGF0YXNldC5pZCwgMTApIDogdW5kZWZpbmVkO1xufTtcbnZhciBzZWxlY3RhYmxlQ2hvaWNlSWRlbnRpZmllciA9ICdbZGF0YS1jaG9pY2Utc2VsZWN0YWJsZV0nO1xuLyoqXG4gKiBDaG9pY2VzXG4gKiBAYXV0aG9yIEpvc2ggSm9obnNvbjxqb3NoQGpvc2h1YWpvaG5zb24uY28udWs+XG4gKi9cbnZhciBDaG9pY2VzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENob2ljZXMoZWxlbWVudCwgdXNlckNvbmZpZykge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdm9pZCAwKSB7IGVsZW1lbnQgPSAnW2RhdGEtY2hvaWNlXSc7IH1cbiAgICAgICAgaWYgKHVzZXJDb25maWcgPT09IHZvaWQgMCkgeyB1c2VyQ29uZmlnID0ge307IH1cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5pbml0aWFsaXNlZE9LID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9oYXNOb25DaG9pY2VQbGFjZWhvbGRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9sYXN0QWRkZWRDaG9pY2VJZCA9IDA7XG4gICAgICAgIHRoaXMuX2xhc3RBZGRlZEdyb3VwSWQgPSAwO1xuICAgICAgICB2YXIgZGVmYXVsdHMgPSBDaG9pY2VzLmRlZmF1bHRzO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCBkZWZhdWx0cy5hbGxPcHRpb25zKSwgZGVmYXVsdHMub3B0aW9ucyksIHVzZXJDb25maWcpO1xuICAgICAgICBPYmplY3RzSW5Db25maWcuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBfdGhpcy5jb25maWdba2V5XSA9IF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCBkZWZhdWx0cy5hbGxPcHRpb25zW2tleV0pLCBkZWZhdWx0cy5vcHRpb25zW2tleV0pLCB1c2VyQ29uZmlnW2tleV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgICBpZiAoIWNvbmZpZy5zaWxlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlQ29uZmlnKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRvY1Jvb3QgPSBjb25maWcuc2hhZG93Um9vdCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2RvY1Jvb3QgPSBkb2NSb290O1xuICAgICAgICB2YXIgcGFzc2VkRWxlbWVudCA9IHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IGRvY1Jvb3QucXVlcnlTZWxlY3RvcihlbGVtZW50KSA6IGVsZW1lbnQ7XG4gICAgICAgIGlmICghcGFzc2VkRWxlbWVudCB8fFxuICAgICAgICAgICAgdHlwZW9mIHBhc3NlZEVsZW1lbnQgIT09ICdvYmplY3QnIHx8XG4gICAgICAgICAgICAhKGlzSHRtbElucHV0RWxlbWVudChwYXNzZWRFbGVtZW50KSB8fCBpc0h0bWxTZWxlY3RFbGVtZW50KHBhc3NlZEVsZW1lbnQpKSkge1xuICAgICAgICAgICAgaWYgKCFwYXNzZWRFbGVtZW50ICYmIHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIlNlbGVjdG9yIFwiLmNvbmNhdChlbGVtZW50LCBcIiBmYWlsZWQgdG8gZmluZCBhbiBlbGVtZW50XCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIkV4cGVjdGVkIG9uZSBvZiB0aGUgZm9sbG93aW5nIHR5cGVzIHRleHR8c2VsZWN0LW9uZXxzZWxlY3QtbXVsdGlwbGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW1lbnRUeXBlID0gcGFzc2VkRWxlbWVudC50eXBlO1xuICAgICAgICB2YXIgaXNUZXh0ID0gZWxlbWVudFR5cGUgPT09IFBhc3NlZEVsZW1lbnRUeXBlcy5UZXh0O1xuICAgICAgICBpZiAoaXNUZXh0IHx8IGNvbmZpZy5tYXhJdGVtQ291bnQgIT09IDEpIHtcbiAgICAgICAgICAgIGNvbmZpZy5zaW5nbGVNb2RlRm9yTXVsdGlTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLnNpbmdsZU1vZGVGb3JNdWx0aVNlbGVjdCkge1xuICAgICAgICAgICAgZWxlbWVudFR5cGUgPSBQYXNzZWRFbGVtZW50VHlwZXMuU2VsZWN0TXVsdGlwbGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlzU2VsZWN0T25lID0gZWxlbWVudFR5cGUgPT09IFBhc3NlZEVsZW1lbnRUeXBlcy5TZWxlY3RPbmU7XG4gICAgICAgIHZhciBpc1NlbGVjdE11bHRpcGxlID0gZWxlbWVudFR5cGUgPT09IFBhc3NlZEVsZW1lbnRUeXBlcy5TZWxlY3RNdWx0aXBsZTtcbiAgICAgICAgdmFyIGlzU2VsZWN0ID0gaXNTZWxlY3RPbmUgfHwgaXNTZWxlY3RNdWx0aXBsZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudFR5cGUgPSBlbGVtZW50VHlwZTtcbiAgICAgICAgdGhpcy5faXNUZXh0RWxlbWVudCA9IGlzVGV4dDtcbiAgICAgICAgdGhpcy5faXNTZWxlY3RPbmVFbGVtZW50ID0gaXNTZWxlY3RPbmU7XG4gICAgICAgIHRoaXMuX2lzU2VsZWN0TXVsdGlwbGVFbGVtZW50ID0gaXNTZWxlY3RNdWx0aXBsZTtcbiAgICAgICAgdGhpcy5faXNTZWxlY3RFbGVtZW50ID0gaXNTZWxlY3RPbmUgfHwgaXNTZWxlY3RNdWx0aXBsZTtcbiAgICAgICAgdGhpcy5fY2FuQWRkVXNlckNob2ljZXMgPSAoaXNUZXh0ICYmIGNvbmZpZy5hZGRJdGVtcykgfHwgKGlzU2VsZWN0ICYmIGNvbmZpZy5hZGRDaG9pY2VzKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcucmVuZGVyU2VsZWN0ZWRDaG9pY2VzICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIGNvbmZpZy5yZW5kZXJTZWxlY3RlZENob2ljZXMgPSBjb25maWcucmVuZGVyU2VsZWN0ZWRDaG9pY2VzID09PSAnYWx3YXlzJyB8fCBpc1NlbGVjdE9uZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLmNsb3NlRHJvcGRvd25PblNlbGVjdCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICBjb25maWcuY2xvc2VEcm9wZG93bk9uU2VsZWN0ID0gaXNUZXh0IHx8IGlzU2VsZWN0T25lIHx8IGNvbmZpZy5zaW5nbGVNb2RlRm9yTXVsdGlTZWxlY3Q7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25maWcuY2xvc2VEcm9wZG93bk9uU2VsZWN0ID0gY29lcmNlQm9vbChjb25maWcuY2xvc2VEcm9wZG93bk9uU2VsZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICBpZiAoY29uZmlnLnBsYWNlaG9sZGVyVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNOb25DaG9pY2VQbGFjZWhvbGRlciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYXNzZWRFbGVtZW50LmRhdGFzZXQucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNOb25DaG9pY2VQbGFjZWhvbGRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uZmlnLnBsYWNlaG9sZGVyVmFsdWUgPSBwYXNzZWRFbGVtZW50LmRhdGFzZXQucGxhY2Vob2xkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVzZXJDb25maWcuYWRkSXRlbUZpbHRlciAmJiB0eXBlb2YgdXNlckNvbmZpZy5hZGRJdGVtRmlsdGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgcmUgPSB1c2VyQ29uZmlnLmFkZEl0ZW1GaWx0ZXIgaW5zdGFuY2VvZiBSZWdFeHAgPyB1c2VyQ29uZmlnLmFkZEl0ZW1GaWx0ZXIgOiBuZXcgUmVnRXhwKHVzZXJDb25maWcuYWRkSXRlbUZpbHRlcik7XG4gICAgICAgICAgICBjb25maWcuYWRkSXRlbUZpbHRlciA9IHJlLnRlc3QuYmluZChyZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lzVGV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc2VkRWxlbWVudCA9IG5ldyBXcmFwcGVkSW5wdXQoe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHBhc3NlZEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lczogY29uZmlnLmNsYXNzTmFtZXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RFbCA9IHBhc3NlZEVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnBhc3NlZEVsZW1lbnQgPSBuZXcgV3JhcHBlZFNlbGVjdCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogc2VsZWN0RWwsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lczogY29uZmlnLmNsYXNzTmFtZXMsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBfdGhpcy5fdGVtcGxhdGVzLm9wdGlvbihkYXRhKTsgfSxcbiAgICAgICAgICAgICAgICBleHRyYWN0UGxhY2Vob2xkZXI6IGNvbmZpZy5wbGFjZWhvbGRlciAmJiAhdGhpcy5faGFzTm9uQ2hvaWNlUGxhY2Vob2xkZXIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRpYWxpc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N0b3JlID0gbmV3IFN0b3JlKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRWYWx1ZSA9ICcnO1xuICAgICAgICBjb25maWcuc2VhcmNoRW5hYmxlZCA9ICghaXNUZXh0ICYmIGNvbmZpZy5zZWFyY2hFbmFibGVkKSB8fCBpc1NlbGVjdE11bHRpcGxlO1xuICAgICAgICB0aGlzLl9jYW5TZWFyY2ggPSBjb25maWcuc2VhcmNoRW5hYmxlZDtcbiAgICAgICAgdGhpcy5faXNTY3JvbGxpbmdPbkllID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2hpZ2hsaWdodFBvc2l0aW9uID0gMDtcbiAgICAgICAgdGhpcy5fd2FzVGFwID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJWYWx1ZSA9IHRoaXMuX2dlbmVyYXRlUGxhY2Vob2xkZXJWYWx1ZSgpO1xuICAgICAgICB0aGlzLl9iYXNlSWQgPSBnZW5lcmF0ZUlkKHBhc3NlZEVsZW1lbnQsICdjaG9pY2VzLScpO1xuICAgICAgICAvKipcbiAgICAgICAgICogc2V0dGluZyBkaXJlY3Rpb24gaW4gY2FzZXMgd2hlcmUgaXQncyBleHBsaWNpdGx5IHNldCBvbiBwYXNzZWRFbGVtZW50XG4gICAgICAgICAqIG9yIHdoZW4gY2FsY3VsYXRlZCBkaXJlY3Rpb24gaXMgZGlmZmVyZW50IGZyb20gdGhlIGRvY3VtZW50XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBwYXNzZWRFbGVtZW50LmRpcjtcbiAgICAgICAgaWYgKCF0aGlzLl9kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50RGlyZWN0aW9uID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocGFzc2VkRWxlbWVudCkuZGlyZWN0aW9uO1xuICAgICAgICAgICAgdmFyIGRvY3VtZW50RGlyZWN0aW9uID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5kaXJlY3Rpb247XG4gICAgICAgICAgICBpZiAoZWxlbWVudERpcmVjdGlvbiAhPT0gZG9jdW1lbnREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBlbGVtZW50RGlyZWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lkTmFtZXMgPSB7XG4gICAgICAgICAgICBpdGVtQ2hvaWNlOiAnaXRlbS1jaG9pY2UnLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl90ZW1wbGF0ZXMgPSBkZWZhdWx0cy50ZW1wbGF0ZXM7XG4gICAgICAgIHRoaXMuX3JlbmRlciA9IHRoaXMuX3JlbmRlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vbkZvY3VzID0gdGhpcy5fb25Gb2N1cy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vbkJsdXIgPSB0aGlzLl9vbkJsdXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25LZXlVcCA9IHRoaXMuX29uS2V5VXAuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25LZXlEb3duID0gdGhpcy5fb25LZXlEb3duLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX29uSW5wdXQgPSB0aGlzLl9vbklucHV0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX29uQ2xpY2sgPSB0aGlzLl9vbkNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX29uVG91Y2hNb3ZlID0gdGhpcy5fb25Ub3VjaE1vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25Ub3VjaEVuZCA9IHRoaXMuX29uVG91Y2hFbmQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25Nb3VzZURvd24gPSB0aGlzLl9vbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vbk1vdXNlT3ZlciA9IHRoaXMuX29uTW91c2VPdmVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX29uRm9ybVJlc2V0ID0gdGhpcy5fb25Gb3JtUmVzZXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25TZWxlY3RLZXkgPSB0aGlzLl9vblNlbGVjdEtleS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vbkVudGVyS2V5ID0gdGhpcy5fb25FbnRlcktleS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vbkVzY2FwZUtleSA9IHRoaXMuX29uRXNjYXBlS2V5LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX29uRGlyZWN0aW9uS2V5ID0gdGhpcy5fb25EaXJlY3Rpb25LZXkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25EZWxldGVLZXkgPSB0aGlzLl9vbkRlbGV0ZUtleS5iaW5kKHRoaXMpO1xuICAgICAgICAvLyBJZiBlbGVtZW50IGhhcyBhbHJlYWR5IGJlZW4gaW5pdGlhbGlzZWQgd2l0aCBDaG9pY2VzLCBmYWlsIHNpbGVudGx5XG4gICAgICAgIGlmICh0aGlzLnBhc3NlZEVsZW1lbnQuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIGlmICghY29uZmlnLnNpbGVudCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignVHJ5aW5nIHRvIGluaXRpYWxpc2UgQ2hvaWNlcyBvbiBlbGVtZW50IGFscmVhZHkgaW5pdGlhbGlzZWQnLCB7IGVsZW1lbnQ6IGVsZW1lbnQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGlzZWRPSyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIExldCdzIGdvXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAvLyBwcmVzZXJ2ZSB0aGUgc2VsZWN0ZWQgaXRlbSBsaXN0IGFmdGVyIHNldHVwIGZvciBmb3JtIHJlc2V0XG4gICAgICAgIHRoaXMuX2luaXRpYWxJdGVtcyA9IHRoaXMuX3N0b3JlLml0ZW1zLm1hcChmdW5jdGlvbiAoY2hvaWNlKSB7IHJldHVybiBjaG9pY2UudmFsdWU7IH0pO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2hvaWNlcywgXCJkZWZhdWx0c1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7XG4gICAgICAgICAgICAgICAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVU0VSX0RFRkFVTFRTO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZ2V0IGFsbE9wdGlvbnMoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBERUZBVUxUX0NPTkZJRztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGdldCB0ZW1wbGF0ZXMoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZXM7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGlzZWQgfHwgdGhpcy5pbml0aWFsaXNlZE9LICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZWFyY2hlciA9IGdldFNlYXJjaGVyKHRoaXMuY29uZmlnKTtcbiAgICAgICAgdGhpcy5fbG9hZENob2ljZXMoKTtcbiAgICAgICAgdGhpcy5fY3JlYXRlVGVtcGxhdGVzKCk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZUVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVN0cnVjdHVyZSgpO1xuICAgICAgICBpZiAoKHRoaXMuX2lzVGV4dEVsZW1lbnQgJiYgIXRoaXMuY29uZmlnLmFkZEl0ZW1zKSB8fFxuICAgICAgICAgICAgdGhpcy5wYXNzZWRFbGVtZW50LmVsZW1lbnQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpIHx8XG4gICAgICAgICAgICAhIXRoaXMucGFzc2VkRWxlbWVudC5lbGVtZW50LmNsb3Nlc3QoJ2ZpZWxkc2V0OmRpc2FibGVkJykpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvdWxkIGJlIHRyaWdnZXJlZCAqKmFmdGVyKiogZGlzYWJsZWQgc3RhdGUgdG8gYXZvaWQgYWRkaXRpb25hbCByZS1kcmF3c1xuICAgICAgICB0aGlzLl9pbml0U3RvcmUoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaW5pdGlhbGlzZWRPSyA9IHRydWU7XG4gICAgICAgIHZhciBjYWxsYmFja09uSW5pdCA9IHRoaXMuY29uZmlnLmNhbGxiYWNrT25Jbml0O1xuICAgICAgICAvLyBSdW4gY2FsbGJhY2sgaWYgaXQgaXMgYSBmdW5jdGlvblxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrT25Jbml0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWxsYmFja09uSW5pdC5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGlzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLnBhc3NlZEVsZW1lbnQucmV2ZWFsKCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyT3V0ZXIudW53cmFwKHRoaXMucGFzc2VkRWxlbWVudC5lbGVtZW50KTtcbiAgICAgICAgdGhpcy5fc3RvcmUuX2xpc3RlbmVycyA9IFtdOyAvLyBwcmV2ZW50cyBzZWxlY3QvaW5wdXQgdmFsdWUgYmVpbmcgd2lwZWRcbiAgICAgICAgdGhpcy5jbGVhclN0b3JlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5fc3RvcFNlYXJjaCgpO1xuICAgICAgICB0aGlzLl90ZW1wbGF0ZXMgPSBDaG9pY2VzLmRlZmF1bHRzLnRlbXBsYXRlcztcbiAgICAgICAgdGhpcy5pbml0aWFsaXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmluaXRpYWxpc2VkT0sgPSB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhc3NlZEVsZW1lbnQuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5wYXNzZWRFbGVtZW50LmVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lck91dGVyLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmVuYWJsZSgpO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXJPdXRlci5lbmFibGUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5wYXNzZWRFbGVtZW50LmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc2VkRWxlbWVudC5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lck91dGVyLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmRpc2FibGUoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyT3V0ZXIuZGlzYWJsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuaGlnaGxpZ2h0SXRlbSA9IGZ1bmN0aW9uIChpdGVtLCBydW5FdmVudCkge1xuICAgICAgICBpZiAocnVuRXZlbnQgPT09IHZvaWQgMCkgeyBydW5FdmVudCA9IHRydWU7IH1cbiAgICAgICAgaWYgKCFpdGVtIHx8ICFpdGVtLmlkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hvaWNlID0gdGhpcy5fc3RvcmUuaXRlbXMuZmluZChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5pZCA9PT0gaXRlbS5pZDsgfSk7XG4gICAgICAgIGlmICghY2hvaWNlIHx8IGNob2ljZS5oaWdobGlnaHRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goaGlnaGxpZ2h0SXRlbShjaG9pY2UsIHRydWUpKTtcbiAgICAgICAgaWYgKHJ1bkV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnBhc3NlZEVsZW1lbnQudHJpZ2dlckV2ZW50KEV2ZW50VHlwZS5oaWdobGlnaHRJdGVtLCB0aGlzLl9nZXRDaG9pY2VGb3JPdXRwdXQoY2hvaWNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS51bmhpZ2hsaWdodEl0ZW0gPSBmdW5jdGlvbiAoaXRlbSwgcnVuRXZlbnQpIHtcbiAgICAgICAgaWYgKHJ1bkV2ZW50ID09PSB2b2lkIDApIHsgcnVuRXZlbnQgPSB0cnVlOyB9XG4gICAgICAgIGlmICghaXRlbSB8fCAhaXRlbS5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNob2ljZSA9IHRoaXMuX3N0b3JlLml0ZW1zLmZpbmQoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuaWQgPT09IGl0ZW0uaWQ7IH0pO1xuICAgICAgICBpZiAoIWNob2ljZSB8fCAhY2hvaWNlLmhpZ2hsaWdodGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChoaWdobGlnaHRJdGVtKGNob2ljZSwgZmFsc2UpKTtcbiAgICAgICAgaWYgKHJ1bkV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnBhc3NlZEVsZW1lbnQudHJpZ2dlckV2ZW50KEV2ZW50VHlwZS51bmhpZ2hsaWdodEl0ZW0sIHRoaXMuX2dldENob2ljZUZvck91dHB1dChjaG9pY2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLmhpZ2hsaWdodEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fc3RvcmUud2l0aFR4bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fc3RvcmUuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmICghaXRlbS5oaWdobGlnaHRlZCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc3RvcmUuZGlzcGF0Y2goaGlnaGxpZ2h0SXRlbShpdGVtLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnBhc3NlZEVsZW1lbnQudHJpZ2dlckV2ZW50KEV2ZW50VHlwZS5oaWdobGlnaHRJdGVtLCBfdGhpcy5fZ2V0Q2hvaWNlRm9yT3V0cHV0KGl0ZW0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUudW5oaWdobGlnaHRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3N0b3JlLndpdGhUeG4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX3N0b3JlLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5oaWdobGlnaHRlZCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc3RvcmUuZGlzcGF0Y2goaGlnaGxpZ2h0SXRlbShpdGVtLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wYXNzZWRFbGVtZW50LnRyaWdnZXJFdmVudChFdmVudFR5cGUuaGlnaGxpZ2h0SXRlbSwgX3RoaXMuX2dldENob2ljZUZvck91dHB1dChpdGVtKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLnJlbW92ZUFjdGl2ZUl0ZW1zQnlWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9zdG9yZS53aXRoVHhuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9zdG9yZS5pdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0udmFsdWUgPT09IHZhbHVlOyB9KS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBfdGhpcy5fcmVtb3ZlSXRlbShpdGVtKTsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLnJlbW92ZUFjdGl2ZUl0ZW1zID0gZnVuY3Rpb24gKGV4Y2x1ZGVkSWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fc3RvcmUud2l0aFR4bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fc3RvcmUuaXRlbXMuZmlsdGVyKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHZhciBpZCA9IF9hLmlkO1xuICAgICAgICAgICAgICAgIHJldHVybiBpZCAhPT0gZXhjbHVkZWRJZDtcbiAgICAgICAgICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIF90aGlzLl9yZW1vdmVJdGVtKGl0ZW0pOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUucmVtb3ZlSGlnaGxpZ2h0ZWRJdGVtcyA9IGZ1bmN0aW9uIChydW5FdmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAocnVuRXZlbnQgPT09IHZvaWQgMCkgeyBydW5FdmVudCA9IGZhbHNlOyB9XG4gICAgICAgIHRoaXMuX3N0b3JlLndpdGhUeG4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX3N0b3JlLmhpZ2hsaWdodGVkQWN0aXZlSXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9yZW1vdmVJdGVtKGl0ZW0pO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgYWN0aW9uIHdhcyBwZXJmb3JtZWQgYnkgdGhlIHVzZXJcbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIHRoZSBldmVudFxuICAgICAgICAgICAgICAgIGlmIChydW5FdmVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckNoYW5nZShpdGVtLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuc2hvd0Ryb3Bkb3duID0gZnVuY3Rpb24gKHByZXZlbnRJbnB1dEZvY3VzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmRyb3Bkb3duLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJldmVudElucHV0Rm9jdXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgICBwcmV2ZW50SW5wdXRGb2N1cyA9ICF0aGlzLl9jYW5TZWFyY2g7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmRyb3Bkb3duLnNob3coKTtcbiAgICAgICAgICAgIHZhciByZWN0ID0gX3RoaXMuZHJvcGRvd24uZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIF90aGlzLmNvbnRhaW5lck91dGVyLm9wZW4ocmVjdC5ib3R0b20sIHJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgIGlmICghcHJldmVudElucHV0Rm9jdXMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMucGFzc2VkRWxlbWVudC50cmlnZ2VyRXZlbnQoRXZlbnRUeXBlLnNob3dEcm9wZG93bik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLmhpZGVEcm9wZG93biA9IGZ1bmN0aW9uIChwcmV2ZW50SW5wdXRCbHVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5kcm9wZG93bi5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICAgICAgICAgIF90aGlzLmNvbnRhaW5lck91dGVyLmNsb3NlKCk7XG4gICAgICAgICAgICBpZiAoIXByZXZlbnRJbnB1dEJsdXIgJiYgX3RoaXMuX2NhblNlYXJjaCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmlucHV0LnJlbW92ZUFjdGl2ZURlc2NlbmRhbnQoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnB1dC5ibHVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5wYXNzZWRFbGVtZW50LnRyaWdnZXJFdmVudChFdmVudFR5cGUuaGlkZURyb3Bkb3duKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsdWVPbmx5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciB2YWx1ZXMgPSB0aGlzLl9zdG9yZS5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiAodmFsdWVPbmx5ID8gaXRlbS52YWx1ZSA6IF90aGlzLl9nZXRDaG9pY2VGb3JPdXRwdXQoaXRlbSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU2VsZWN0T25lRWxlbWVudCB8fCB0aGlzLmNvbmZpZy5zaW5nbGVNb2RlRm9yTXVsdGlTZWxlY3QgPyB2YWx1ZXNbMF0gOiB2YWx1ZXM7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGlzZWRPSykge1xuICAgICAgICAgICAgdGhpcy5fd2FybkNob2ljZXNJbml0RmFpbGVkKCdzZXRWYWx1ZScpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcmUud2l0aFR4bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fYWRkQ2hvaWNlKG1hcElucHV0VG9DaG9pY2UodmFsdWUsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBAdG9kbyBpbnRlZ3JhdGUgd2l0aCBTdG9yZVxuICAgICAgICB0aGlzLl9zZWFyY2hlci5yZXNldCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLnNldENob2ljZUJ5VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpc2VkT0spIHtcbiAgICAgICAgICAgIHRoaXMuX3dhcm5DaG9pY2VzSW5pdEZhaWxlZCgnc2V0Q2hvaWNlQnlWYWx1ZScpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lzVGV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0b3JlLndpdGhUeG4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gSWYgb25seSBvbmUgdmFsdWUgaGFzIGJlZW4gcGFzc2VkLCBjb252ZXJ0IHRvIGFycmF5XG4gICAgICAgICAgICB2YXIgY2hvaWNlVmFsdWUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcbiAgICAgICAgICAgIC8vIExvb3AgdGhyb3VnaCBlYWNoIHZhbHVlIGFuZFxuICAgICAgICAgICAgY2hvaWNlVmFsdWUuZm9yRWFjaChmdW5jdGlvbiAodmFsKSB7IHJldHVybiBfdGhpcy5fZmluZEFuZFNlbGVjdENob2ljZUJ5VmFsdWUodmFsKTsgfSk7XG4gICAgICAgICAgICBfdGhpcy51bmhpZ2hsaWdodEFsbCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gQHRvZG8gaW50ZWdyYXRlIHdpdGggU3RvcmVcbiAgICAgICAgdGhpcy5fc2VhcmNoZXIucmVzZXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgY2hvaWNlcyBvZiBzZWxlY3QgaW5wdXQgdmlhIGFuIGFycmF5IG9mIG9iamVjdHMgKG9yIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhcnJheSBvZiBvYmplY3Qgb3IgcHJvbWlzZSBvZiBpdCksXG4gICAgICogYSB2YWx1ZSBmaWVsZCBuYW1lIGFuZCBhIGxhYmVsIGZpZWxkIG5hbWUuXG4gICAgICogVGhpcyBiZWhhdmVzIHRoZSBzYW1lIGFzIHBhc3NpbmcgaXRlbXMgdmlhIHRoZSBjaG9pY2VzIG9wdGlvbiBidXQgY2FuIGJlIGNhbGxlZCBhZnRlciBpbml0aWFsaXNpbmcgQ2hvaWNlcy5cbiAgICAgKiBUaGlzIGNhbiBhbHNvIGJlIHVzZWQgdG8gYWRkIGdyb3VwcyBvZiBjaG9pY2VzIChzZWUgZXhhbXBsZSAyKTsgT3B0aW9uYWxseSBwYXNzIGEgdHJ1ZSBgcmVwbGFjZUNob2ljZXNgIHZhbHVlIHRvIHJlbW92ZSBhbnkgZXhpc3RpbmcgY2hvaWNlcy5cbiAgICAgKiBPcHRpb25hbGx5IHBhc3MgYSBgY3VzdG9tUHJvcGVydGllc2Agb2JqZWN0IHRvIGFkZCBhZGRpdGlvbmFsIGRhdGEgdG8geW91ciBjaG9pY2VzICh1c2VmdWwgd2hlbiBzZWFyY2hpbmcvZmlsdGVyaW5nIGV0YykuXG4gICAgICpcbiAgICAgKiAqKklucHV0IHR5cGVzIGFmZmVjdGVkOioqIHNlbGVjdC1vbmUsIHNlbGVjdC1tdWx0aXBsZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBqc1xuICAgICAqIGNvbnN0IGV4YW1wbGUgPSBuZXcgQ2hvaWNlcyhlbGVtZW50KTtcbiAgICAgKlxuICAgICAqIGV4YW1wbGUuc2V0Q2hvaWNlcyhbXG4gICAgICogICB7dmFsdWU6ICdPbmUnLCBsYWJlbDogJ0xhYmVsIE9uZScsIGRpc2FibGVkOiB0cnVlfSxcbiAgICAgKiAgIHt2YWx1ZTogJ1R3bycsIGxhYmVsOiAnTGFiZWwgVHdvJywgc2VsZWN0ZWQ6IHRydWV9LFxuICAgICAqICAge3ZhbHVlOiAnVGhyZWUnLCBsYWJlbDogJ0xhYmVsIFRocmVlJ30sXG4gICAgICogXSwgJ3ZhbHVlJywgJ2xhYmVsJywgZmFsc2UpO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBqc1xuICAgICAqIGNvbnN0IGV4YW1wbGUgPSBuZXcgQ2hvaWNlcyhlbGVtZW50KTtcbiAgICAgKlxuICAgICAqIGV4YW1wbGUuc2V0Q2hvaWNlcyhhc3luYyAoKSA9PiB7XG4gICAgICogICB0cnkge1xuICAgICAqICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCBmZXRjaCgnL2l0ZW1zJyk7XG4gICAgICogICAgICByZXR1cm4gaXRlbXMuanNvbigpXG4gICAgICogICB9IGNhdGNoKGVycikge1xuICAgICAqICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICogICB9XG4gICAgICogfSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYGpzXG4gICAgICogY29uc3QgZXhhbXBsZSA9IG5ldyBDaG9pY2VzKGVsZW1lbnQpO1xuICAgICAqXG4gICAgICogZXhhbXBsZS5zZXRDaG9pY2VzKFt7XG4gICAgICogICBsYWJlbDogJ0dyb3VwIG9uZScsXG4gICAgICogICBpZDogMSxcbiAgICAgKiAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgKiAgIGNob2ljZXM6IFtcbiAgICAgKiAgICAge3ZhbHVlOiAnQ2hpbGQgT25lJywgbGFiZWw6ICdDaGlsZCBPbmUnLCBzZWxlY3RlZDogdHJ1ZX0sXG4gICAgICogICAgIHt2YWx1ZTogJ0NoaWxkIFR3bycsIGxhYmVsOiAnQ2hpbGQgVHdvJywgIGRpc2FibGVkOiB0cnVlfSxcbiAgICAgKiAgICAge3ZhbHVlOiAnQ2hpbGQgVGhyZWUnLCBsYWJlbDogJ0NoaWxkIFRocmVlJ30sXG4gICAgICogICBdXG4gICAgICogfSxcbiAgICAgKiB7XG4gICAgICogICBsYWJlbDogJ0dyb3VwIHR3bycsXG4gICAgICogICBpZDogMixcbiAgICAgKiAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgKiAgIGNob2ljZXM6IFtcbiAgICAgKiAgICAge3ZhbHVlOiAnQ2hpbGQgRm91cicsIGxhYmVsOiAnQ2hpbGQgRm91cicsIGRpc2FibGVkOiB0cnVlfSxcbiAgICAgKiAgICAge3ZhbHVlOiAnQ2hpbGQgRml2ZScsIGxhYmVsOiAnQ2hpbGQgRml2ZSd9LFxuICAgICAqICAgICB7dmFsdWU6ICdDaGlsZCBTaXgnLCBsYWJlbDogJ0NoaWxkIFNpeCcsIGN1c3RvbVByb3BlcnRpZXM6IHtcbiAgICAgKiAgICAgICBkZXNjcmlwdGlvbjogJ0N1c3RvbSBkZXNjcmlwdGlvbiBhYm91dCBjaGlsZCBzaXgnLFxuICAgICAqICAgICAgIHJhbmRvbTogJ0Fub3RoZXIgcmFuZG9tIGN1c3RvbSBwcm9wZXJ0eSdcbiAgICAgKiAgICAgfX0sXG4gICAgICogICBdXG4gICAgICogfV0sICd2YWx1ZScsICdsYWJlbCcsIGZhbHNlKTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBDaG9pY2VzLnByb3RvdHlwZS5zZXRDaG9pY2VzID0gZnVuY3Rpb24gKGNob2ljZXNBcnJheU9yRmV0Y2hlciwgdmFsdWUsIGxhYmVsLCByZXBsYWNlQ2hvaWNlcywgY2xlYXJTZWFyY2hGbGFnKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChjaG9pY2VzQXJyYXlPckZldGNoZXIgPT09IHZvaWQgMCkgeyBjaG9pY2VzQXJyYXlPckZldGNoZXIgPSBbXTsgfVxuICAgICAgICBpZiAodmFsdWUgPT09IHZvaWQgMCkgeyB2YWx1ZSA9ICd2YWx1ZSc7IH1cbiAgICAgICAgaWYgKGxhYmVsID09PSB2b2lkIDApIHsgbGFiZWwgPSAnbGFiZWwnOyB9XG4gICAgICAgIGlmIChyZXBsYWNlQ2hvaWNlcyA9PT0gdm9pZCAwKSB7IHJlcGxhY2VDaG9pY2VzID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKGNsZWFyU2VhcmNoRmxhZyA9PT0gdm9pZCAwKSB7IGNsZWFyU2VhcmNoRmxhZyA9IHRydWU7IH1cbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpc2VkT0spIHtcbiAgICAgICAgICAgIHRoaXMuX3dhcm5DaG9pY2VzSW5pdEZhaWxlZCgnc2V0Q2hvaWNlcycpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9pc1NlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJzZXRDaG9pY2VzIGNhbid0IGJlIHVzZWQgd2l0aCBJTlBVVCBiYXNlZCBDaG9pY2VzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8ICF2YWx1ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInZhbHVlIHBhcmFtZXRlciBtdXN0IGJlIGEgbmFtZSBvZiAndmFsdWUnIGZpZWxkIGluIHBhc3NlZCBvYmplY3RzXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENsZWFyIGNob2ljZXMgaWYgbmVlZGVkXG4gICAgICAgIGlmIChyZXBsYWNlQ2hvaWNlcykge1xuICAgICAgICAgICAgdGhpcy5jbGVhckNob2ljZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNob2ljZXNBcnJheU9yRmV0Y2hlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gaXQncyBhIGNob2ljZXMgZmV0Y2hlciBmdW5jdGlvblxuICAgICAgICAgICAgdmFyIGZldGNoZXJfMSA9IGNob2ljZXNBcnJheU9yRmV0Y2hlcih0aGlzKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgUHJvbWlzZSA9PT0gJ2Z1bmN0aW9uJyAmJiBmZXRjaGVyXzEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhhdCdzIGEgcHJvbWlzZVxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm9taXNlLWV4ZWN1dG9yLXJldHVyblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc29sdmUpOyB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5faGFuZGxlTG9hZGluZ1N0YXRlKHRydWUpOyB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBmZXRjaGVyXzE7IH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBfdGhpcy5zZXRDaG9pY2VzKGRhdGEsIHZhbHVlLCBsYWJlbCwgcmVwbGFjZUNob2ljZXMpOyB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmNvbmZpZy5zaWxlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9oYW5kbGVMb2FkaW5nU3RhdGUoZmFsc2UpOyB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpczsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBmdW5jdGlvbiByZXR1cm5lZCBzb21ldGhpbmcgZWxzZSB0aGFuIHByb21pc2UsIGxldCdzIGNoZWNrIGlmIGl0J3MgYW4gYXJyYXkgb2YgY2hvaWNlc1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGZldGNoZXJfMSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiLnNldENob2ljZXMgZmlyc3QgYXJndW1lbnQgZnVuY3Rpb24gbXVzdCByZXR1cm4gZWl0aGVyIGFycmF5IG9mIGNob2ljZXMgb3IgUHJvbWlzZSwgZ290OiBcIi5jb25jYXQodHlwZW9mIGZldGNoZXJfMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcmVjdXJzaW9uIHdpdGggcmVzdWx0cywgaXQncyBzeW5jIGFuZCBjaG9pY2VzIHdlcmUgY2xlYXJlZCBhbHJlYWR5XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRDaG9pY2VzKGZldGNoZXJfMSwgdmFsdWUsIGxhYmVsLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNob2ljZXNBcnJheU9yRmV0Y2hlcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCIuc2V0Q2hvaWNlcyBtdXN0IGJlIGNhbGxlZCBlaXRoZXIgd2l0aCBhcnJheSBvZiBjaG9pY2VzIHdpdGggYSBmdW5jdGlvbiByZXN1bHRpbmcgaW50byBQcm9taXNlIG9mIGFycmF5IG9mIGNob2ljZXNcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250YWluZXJPdXRlci5yZW1vdmVMb2FkaW5nU3RhdGUoKTtcbiAgICAgICAgdGhpcy5fc3RvcmUud2l0aFR4bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoY2xlYXJTZWFyY2hGbGFnKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2lzU2VhcmNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaXNEZWZhdWx0VmFsdWUgPSB2YWx1ZSA9PT0gJ3ZhbHVlJztcbiAgICAgICAgICAgIHZhciBpc0RlZmF1bHRMYWJlbCA9IGxhYmVsID09PSAnbGFiZWwnO1xuICAgICAgICAgICAgY2hvaWNlc0FycmF5T3JGZXRjaGVyLmZvckVhY2goZnVuY3Rpb24gKGdyb3VwT3JDaG9pY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoJ2Nob2ljZXMnIGluIGdyb3VwT3JDaG9pY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwID0gZ3JvdXBPckNob2ljZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0RlZmF1bHRMYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZ3JvdXApLCB7IGxhYmVsOiBncm91cFtsYWJlbF0gfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2FkZEdyb3VwKG1hcElucHV0VG9DaG9pY2UoZ3JvdXAsIHRydWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaG9pY2UgPSBncm91cE9yQ2hvaWNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRGVmYXVsdExhYmVsIHx8ICFpc0RlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hvaWNlID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGNob2ljZSksIHsgdmFsdWU6IGNob2ljZVt2YWx1ZV0sIGxhYmVsOiBjaG9pY2VbbGFiZWxdIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9hZGRDaG9pY2UobWFwSW5wdXRUb0Nob2ljZShjaG9pY2UsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpcy51bmhpZ2hsaWdodEFsbCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gQHRvZG8gaW50ZWdyYXRlIHdpdGggU3RvcmVcbiAgICAgICAgdGhpcy5fc2VhcmNoZXIucmVzZXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKHdpdGhFdmVudHMsIHNlbGVjdEZpcnN0T3B0aW9uLCBkZXNlbGVjdEFsbCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAod2l0aEV2ZW50cyA9PT0gdm9pZCAwKSB7IHdpdGhFdmVudHMgPSBmYWxzZTsgfVxuICAgICAgICBpZiAoc2VsZWN0Rmlyc3RPcHRpb24gPT09IHZvaWQgMCkgeyBzZWxlY3RGaXJzdE9wdGlvbiA9IGZhbHNlOyB9XG4gICAgICAgIGlmIChkZXNlbGVjdEFsbCA9PT0gdm9pZCAwKSB7IGRlc2VsZWN0QWxsID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKCF0aGlzLl9pc1NlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jb25maWcuc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdyZWZyZXNoIG1ldGhvZCBjYW4gb25seSBiZSB1c2VkIG9uIGNob2ljZXMgYmFja2VkIGJ5IGEgPHNlbGVjdD4gZWxlbWVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcmUud2l0aFR4bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2hvaWNlc0Zyb21PcHRpb25zID0gX3RoaXMucGFzc2VkRWxlbWVudC5vcHRpb25zQXNDaG9pY2VzKCk7XG4gICAgICAgICAgICAvLyBCdWlsZCB0aGUgbGlzdCBvZiBpdGVtcyB3aGljaCByZXF1aXJlIHByZXNlcnZpbmdcbiAgICAgICAgICAgIHZhciBleGlzdGluZ0l0ZW1zID0ge307XG4gICAgICAgICAgICBpZiAoIWRlc2VsZWN0QWxsKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3N0b3JlLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGNob2ljZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hvaWNlLmlkICYmIGNob2ljZS5hY3RpdmUgJiYgY2hvaWNlLnNlbGVjdGVkICYmICFjaG9pY2UuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nSXRlbXNbY2hvaWNlLnZhbHVlXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmNsZWFyU3RvcmUoZmFsc2UpO1xuICAgICAgICAgICAgdmFyIHVwZGF0ZUNob2ljZSA9IGZ1bmN0aW9uIChjaG9pY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVzZWxlY3RBbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3N0b3JlLmRpc3BhdGNoKHJlbW92ZUl0ZW0kMShjaG9pY2UpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZXhpc3RpbmdJdGVtc1tjaG9pY2UudmFsdWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNob2ljZXNGcm9tT3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChncm91cE9yQ2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCdjaG9pY2VzJyBpbiBncm91cE9yQ2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwT3JDaG9pY2UuY2hvaWNlcy5mb3JFYWNoKHVwZGF0ZUNob2ljZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdXBkYXRlQ2hvaWNlKGdyb3VwT3JDaG9pY2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvKiBAdG9kbyBvbmx5IGdlbmVyYXRlIGFkZCBldmVudHMgZm9yIHRoZSBhZGRlZCBvcHRpb25zIGluc3RlYWQgb2YgYWxsXG4gICAgICAgICAgICBpZiAod2l0aEV2ZW50cykge1xuICAgICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChjaG9pY2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdJdGVtc1tjaG9pY2UudmFsdWVdKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBhc3NlZEVsZW1lbnQudHJpZ2dlckV2ZW50KFxuICAgICAgICAgICAgICAgICAgICBFdmVudFR5cGUucmVtb3ZlSXRlbSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q2hvaWNlRm9yRXZlbnQoY2hvaWNlKSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICAvLyBsb2FkIG5ldyBjaG9pY2VzICYgaXRlbXNcbiAgICAgICAgICAgIF90aGlzLl9hZGRQcmVkZWZpbmVkQ2hvaWNlcyhjaG9pY2VzRnJvbU9wdGlvbnMsIHNlbGVjdEZpcnN0T3B0aW9uLCB3aXRoRXZlbnRzKTtcbiAgICAgICAgICAgIC8vIHJlLWRvIHNlYXJjaCBpZiByZXF1aXJlZFxuICAgICAgICAgICAgaWYgKF90aGlzLl9pc1NlYXJjaGluZykge1xuICAgICAgICAgICAgICAgIF90aGlzLl9zZWFyY2hDaG9pY2VzKF90aGlzLmlucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUucmVtb3ZlQ2hvaWNlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBjaG9pY2UgPSB0aGlzLl9zdG9yZS5jaG9pY2VzLmZpbmQoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMudmFsdWUgPT09IHZhbHVlOyB9KTtcbiAgICAgICAgaWYgKCFjaG9pY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NsZWFyTm90aWNlKCk7XG4gICAgICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKHJlbW92ZUNob2ljZShjaG9pY2UpKTtcbiAgICAgICAgLy8gQHRvZG8gaW50ZWdyYXRlIHdpdGggU3RvcmVcbiAgICAgICAgdGhpcy5fc2VhcmNoZXIucmVzZXQoKTtcbiAgICAgICAgaWYgKGNob2ljZS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5wYXNzZWRFbGVtZW50LnRyaWdnZXJFdmVudChFdmVudFR5cGUucmVtb3ZlSXRlbSwgdGhpcy5fZ2V0Q2hvaWNlRm9yT3V0cHV0KGNob2ljZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuY2xlYXJDaG9pY2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9zdG9yZS53aXRoVHhuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9zdG9yZS5jaG9pY2VzLmZvckVhY2goZnVuY3Rpb24gKGNob2ljZSkge1xuICAgICAgICAgICAgICAgIGlmICghY2hvaWNlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9zdG9yZS5kaXNwYXRjaChyZW1vdmVDaG9pY2UoY2hvaWNlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBAdG9kbyBpbnRlZ3JhdGUgd2l0aCBTdG9yZVxuICAgICAgICB0aGlzLl9zZWFyY2hlci5yZXNldCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLmNsZWFyU3RvcmUgPSBmdW5jdGlvbiAoY2xlYXJPcHRpb25zKSB7XG4gICAgICAgIGlmIChjbGVhck9wdGlvbnMgPT09IHZvaWQgMCkgeyBjbGVhck9wdGlvbnMgPSB0cnVlOyB9XG4gICAgICAgIHRoaXMuX3N0b3BTZWFyY2goKTtcbiAgICAgICAgaWYgKGNsZWFyT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5wYXNzZWRFbGVtZW50LmVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKCcnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLml0ZW1MaXN0LmVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKCcnKTtcbiAgICAgICAgdGhpcy5jaG9pY2VMaXN0LmVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKCcnKTtcbiAgICAgICAgdGhpcy5fY2xlYXJOb3RpY2UoKTtcbiAgICAgICAgdGhpcy5fc3RvcmUucmVzZXQoKTtcbiAgICAgICAgdGhpcy5fbGFzdEFkZGVkQ2hvaWNlSWQgPSAwO1xuICAgICAgICB0aGlzLl9sYXN0QWRkZWRHcm91cElkID0gMDtcbiAgICAgICAgLy8gQHRvZG8gaW50ZWdyYXRlIHdpdGggU3RvcmVcbiAgICAgICAgdGhpcy5fc2VhcmNoZXIucmVzZXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5jbGVhcklucHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2hvdWxkU2V0SW5wdXRXaWR0aCA9ICF0aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5wdXQuY2xlYXIoc2hvdWxkU2V0SW5wdXRXaWR0aCk7XG4gICAgICAgIHRoaXMuX3N0b3BTZWFyY2goKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fdmFsaWRhdGVDb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgICAgdmFyIGludmFsaWRDb25maWdPcHRpb25zID0gZGlmZihjb25maWcsIERFRkFVTFRfQ09ORklHKTtcbiAgICAgICAgaWYgKGludmFsaWRDb25maWdPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVbmtub3duIGNvbmZpZyBvcHRpb24ocykgcGFzc2VkJywgaW52YWxpZENvbmZpZ09wdGlvbnMuam9pbignLCAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5hbGxvd0hUTUwgJiYgY29uZmlnLmFsbG93SHRtbFVzZXJJbnB1dCkge1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5hZGRJdGVtcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignV2FybmluZzogYWxsb3dIVE1ML2FsbG93SHRtbFVzZXJJbnB1dC9hZGRJdGVtcyBhbGwgYmVpbmcgdHJ1ZSBpcyBzdHJvbmdseSBub3QgcmVjb21tZW5kZWQgYW5kIG1heSBsZWFkIHRvIFhTUyBhdHRhY2tzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29uZmlnLmFkZENob2ljZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IGFsbG93SFRNTC9hbGxvd0h0bWxVc2VySW5wdXQvYWRkQ2hvaWNlcyBhbGwgYmVpbmcgdHJ1ZSBpcyBzdHJvbmdseSBub3QgcmVjb21tZW5kZWQgYW5kIG1heSBsZWFkIHRvIFhTUyBhdHRhY2tzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcyA9PT0gdm9pZCAwKSB7IGNoYW5nZXMgPSB7IGNob2ljZXM6IHRydWUsIGdyb3VwczogdHJ1ZSwgaXRlbXM6IHRydWUgfTsgfVxuICAgICAgICBpZiAodGhpcy5fc3RvcmUuaW5UeG4oKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pc1NlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmNob2ljZXMgfHwgY2hhbmdlcy5ncm91cHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJDaG9pY2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXMuaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW1zKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9yZW5kZXJDaG9pY2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuX2NhbkFkZEl0ZW1zKCkpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gYmxvY2sgcmVuZGVyaW5nIGNob2ljZXMgaWYgdGhlIGlucHV0IGxpbWl0IGlzIHJlYWNoZWQuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gdGhpcywgY29uZmlnID0gX2EuY29uZmlnLCBpc1NlYXJjaGluZyA9IF9hLl9pc1NlYXJjaGluZztcbiAgICAgICAgdmFyIF9iID0gdGhpcy5fc3RvcmUsIGFjdGl2ZUdyb3VwcyA9IF9iLmFjdGl2ZUdyb3VwcywgYWN0aXZlQ2hvaWNlcyA9IF9iLmFjdGl2ZUNob2ljZXM7XG4gICAgICAgIHZhciByZW5kZXJMaW1pdCA9IDA7XG4gICAgICAgIGlmIChpc1NlYXJjaGluZyAmJiBjb25maWcuc2VhcmNoUmVzdWx0TGltaXQgPiAwKSB7XG4gICAgICAgICAgICByZW5kZXJMaW1pdCA9IGNvbmZpZy5zZWFyY2hSZXN1bHRMaW1pdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb25maWcucmVuZGVyQ2hvaWNlTGltaXQgPiAwKSB7XG4gICAgICAgICAgICByZW5kZXJMaW1pdCA9IGNvbmZpZy5yZW5kZXJDaG9pY2VMaW1pdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faXNTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgYmFja2luZ09wdGlvbnMgPSBhY3RpdmVDaG9pY2VzLmZpbHRlcihmdW5jdGlvbiAoY2hvaWNlKSB7IHJldHVybiAhY2hvaWNlLmVsZW1lbnQ7IH0pO1xuICAgICAgICAgICAgaWYgKGJhY2tpbmdPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFzc2VkRWxlbWVudC5hZGRPcHRpb25zKGJhY2tpbmdPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHZhciByZW5kZXJhYmxlQ2hvaWNlcyA9IGZ1bmN0aW9uIChjaG9pY2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hvaWNlcy5maWx0ZXIoZnVuY3Rpb24gKGNob2ljZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhY2hvaWNlLnBsYWNlaG9sZGVyICYmIChpc1NlYXJjaGluZyA/ICEhY2hvaWNlLnJhbmsgOiBjb25maWcucmVuZGVyU2VsZWN0ZWRDaG9pY2VzIHx8ICFjaG9pY2Uuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBzZWxlY3RhYmxlQ2hvaWNlcyA9IGZhbHNlO1xuICAgICAgICB2YXIgcmVuZGVyQ2hvaWNlcyA9IGZ1bmN0aW9uIChjaG9pY2VzLCB3aXRoaW5Hcm91cCwgZ3JvdXBMYWJlbCkge1xuICAgICAgICAgICAgaWYgKGlzU2VhcmNoaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gc29ydEJ5UmFuayBpcyB1c2VkIHRvIGVuc3VyZSBzdGFibGUgc29ydGluZywgYXMgc2NvcmVzIGFyZSBub24tdW5pcXVlXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBhZGRpdGlvbmFsbHkgZW5zdXJlcyBmdXNlT3B0aW9ucy5zb3J0Rm4gaXMgbm90IGlnbm9yZWRcbiAgICAgICAgICAgICAgICBjaG9pY2VzLnNvcnQoc29ydEJ5UmFuayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb25maWcuc2hvdWxkU29ydCkge1xuICAgICAgICAgICAgICAgIGNob2ljZXMuc29ydChjb25maWcuc29ydGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjaG9pY2VMaW1pdCA9IGNob2ljZXMubGVuZ3RoO1xuICAgICAgICAgICAgY2hvaWNlTGltaXQgPSAhd2l0aGluR3JvdXAgJiYgcmVuZGVyTGltaXQgJiYgY2hvaWNlTGltaXQgPiByZW5kZXJMaW1pdCA/IHJlbmRlckxpbWl0IDogY2hvaWNlTGltaXQ7XG4gICAgICAgICAgICBjaG9pY2VMaW1pdC0tO1xuICAgICAgICAgICAgY2hvaWNlcy5ldmVyeShmdW5jdGlvbiAoY2hvaWNlLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIC8vIGNob2ljZUVsIGJlaW5nIGVtcHR5IHNpZ25hbHMgdGhlIGNvbnRlbnRzIGhhcyBwcm9iYWJseSBzaWduaWZpY2FudGx5IGNoYW5nZWRcbiAgICAgICAgICAgICAgICB2YXIgZHJvcGRvd25JdGVtID0gY2hvaWNlLmNob2ljZUVsIHx8IF90aGlzLl90ZW1wbGF0ZXMuY2hvaWNlKGNvbmZpZywgY2hvaWNlLCBjb25maWcuaXRlbVNlbGVjdFRleHQsIGdyb3VwTGFiZWwpO1xuICAgICAgICAgICAgICAgIGNob2ljZS5jaG9pY2VFbCA9IGRyb3Bkb3duSXRlbTtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkcm9wZG93bkl0ZW0pO1xuICAgICAgICAgICAgICAgIGlmICghY2hvaWNlLmRpc2FibGVkICYmIChpc1NlYXJjaGluZyB8fCAhY2hvaWNlLnNlbGVjdGVkKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlQ2hvaWNlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCA8IGNob2ljZUxpbWl0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChhY3RpdmVDaG9pY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5yZXNldFNjcm9sbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmNob2ljZUxpc3Quc2Nyb2xsVG9Ub3AoKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2hhc05vbkNob2ljZVBsYWNlaG9sZGVyICYmICFpc1NlYXJjaGluZyAmJiB0aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgcGxhY2Vob2xkZXIgY2hvaWNlIGFsb25nIHdpdGggZ3JvdXBzXG4gICAgICAgICAgICAgICAgcmVuZGVyQ2hvaWNlcyhhY3RpdmVDaG9pY2VzLmZpbHRlcihmdW5jdGlvbiAoY2hvaWNlKSB7IHJldHVybiBjaG9pY2UucGxhY2Vob2xkZXIgJiYgIWNob2ljZS5ncm91cDsgfSksIGZhbHNlLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBncm91cGVkIG9wdGlvbnNcbiAgICAgICAgICAgIGlmIChhY3RpdmVHcm91cHMubGVuZ3RoICYmICFpc1NlYXJjaGluZykge1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcuc2hvdWxkU29ydCkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVHcm91cHMuc29ydChjb25maWcuc29ydGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcmVuZGVyIENob2ljZXMgd2l0aG91dCBncm91cCBmaXJzdCwgcmVnYXJkbGVzcyBvZiBzb3J0LCBvdGhlcndpc2UgdGhleSB3b24ndCBiZSBkaXN0aW5ndWlzaGFibGVcbiAgICAgICAgICAgICAgICAvLyBmcm9tIHRoZSBsYXN0IGdyb3VwXG4gICAgICAgICAgICAgICAgcmVuZGVyQ2hvaWNlcyhhY3RpdmVDaG9pY2VzLmZpbHRlcihmdW5jdGlvbiAoY2hvaWNlKSB7IHJldHVybiAhY2hvaWNlLnBsYWNlaG9sZGVyICYmICFjaG9pY2UuZ3JvdXA7IH0pLCBmYWxzZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICBhY3RpdmVHcm91cHMuZm9yRWFjaChmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwQ2hvaWNlcyA9IHJlbmRlcmFibGVDaG9pY2VzKGdyb3VwLmNob2ljZXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXBDaG9pY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRyb3Bkb3duR3JvdXAgPSBncm91cC5ncm91cEVsIHx8IF90aGlzLl90ZW1wbGF0ZXMuY2hvaWNlR3JvdXAoX3RoaXMuY29uZmlnLCBncm91cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZ3JvdXBFbCA9IGRyb3Bkb3duR3JvdXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25Hcm91cC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkcm9wZG93bkdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckNob2ljZXMoZ3JvdXBDaG9pY2VzLCB0cnVlLCBjb25maWcuYXBwZW5kR3JvdXBJblNlYXJjaCAmJiBpc1NlYXJjaGluZyA/IGdyb3VwLmxhYmVsIDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyQ2hvaWNlcyhyZW5kZXJhYmxlQ2hvaWNlcyhhY3RpdmVDaG9pY2VzKSwgZmFsc2UsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzZWxlY3RhYmxlQ2hvaWNlcykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9ub3RpY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3RpY2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc29sdmVTdHJpbmdGdW5jdGlvbihpc1NlYXJjaGluZyA/IGNvbmZpZy5ub1Jlc3VsdHNUZXh0IDogY29uZmlnLm5vQ2hvaWNlc1RleHQpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBpc1NlYXJjaGluZyA/IE5vdGljZVR5cGVzLm5vUmVzdWx0cyA6IE5vdGljZVR5cGVzLm5vQ2hvaWNlcyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnJhZ21lbnQucmVwbGFjZUNoaWxkcmVuKCcnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW5kZXJOb3RpY2UoZnJhZ21lbnQpO1xuICAgICAgICB0aGlzLmNob2ljZUxpc3QuZWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oZnJhZ21lbnQpO1xuICAgICAgICBpZiAoc2VsZWN0YWJsZUNob2ljZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZ2hsaWdodENob2ljZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fcmVuZGVySXRlbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBpdGVtcyA9IHRoaXMuX3N0b3JlLml0ZW1zIHx8IFtdO1xuICAgICAgICB2YXIgaXRlbUxpc3QgPSB0aGlzLml0ZW1MaXN0LmVsZW1lbnQ7XG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICB2YXIgaXRlbUZyb21MaXN0ID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtTGlzdC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtaXRlbV1bZGF0YS1pZD1cXFwiXCIuY29uY2F0KGl0ZW0uaWQsIFwiXFxcIl1cIikpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgYWRkSXRlbVRvRnJhZ21lbnQgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIGVsID0gaXRlbS5pdGVtRWw7XG4gICAgICAgICAgICBpZiAoZWwgJiYgZWwucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsID0gaXRlbUZyb21MaXN0KGl0ZW0pIHx8IF90aGlzLl90ZW1wbGF0ZXMuaXRlbShjb25maWcsIGl0ZW0sIGNvbmZpZy5yZW1vdmVJdGVtQnV0dG9uKTtcbiAgICAgICAgICAgIGl0ZW0uaXRlbUVsID0gZWw7XG4gICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIG5ldyBpdGVtc1xuICAgICAgICBpdGVtcy5mb3JFYWNoKGFkZEl0ZW1Ub0ZyYWdtZW50KTtcbiAgICAgICAgdmFyIGFkZEl0ZW1zID0gISFmcmFnbWVudC5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMuX2lzU2VsZWN0T25lRWxlbWVudCAmJiB0aGlzLl9oYXNOb25DaG9pY2VQbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgdmFyIGV4aXN0aW5nSXRlbXMgPSBpdGVtTGlzdC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoYWRkSXRlbXMgfHwgZXhpc3RpbmdJdGVtcyA+IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBpdGVtTGlzdC5xdWVyeVNlbGVjdG9yKGdldENsYXNzTmFtZXNTZWxlY3Rvcihjb25maWcuY2xhc3NOYW1lcy5wbGFjZWhvbGRlcikpO1xuICAgICAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlci5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghZXhpc3RpbmdJdGVtcykge1xuICAgICAgICAgICAgICAgIGFkZEl0ZW1zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhZGRJdGVtVG9GcmFnbWVudChtYXBJbnB1dFRvQ2hvaWNlKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGNvbmZpZy5wbGFjZWhvbGRlclZhbHVlIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhZGRJdGVtcykge1xuICAgICAgICAgICAgaXRlbUxpc3QuYXBwZW5kKGZyYWdtZW50KTtcbiAgICAgICAgICAgIGlmIChjb25maWcuc2hvdWxkU29ydEl0ZW1zICYmICF0aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5zb3J0KGNvbmZpZy5zb3J0ZXIpO1xuICAgICAgICAgICAgICAgIC8vIHB1c2ggc29ydGluZyBpbnRvIHRoZSBET01cbiAgICAgICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IGl0ZW1Gcm9tTGlzdChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZChlbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpdGVtTGlzdC5hcHBlbmQoZnJhZ21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pc1RleHRFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBoaWRkZW4gaW5wdXRcbiAgICAgICAgICAgIHRoaXMucGFzc2VkRWxlbWVudC52YWx1ZSA9IGl0ZW1zLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBfYS52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9KS5qb2luKGNvbmZpZy5kZWxpbWl0ZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fZGlzcGxheU5vdGljZSA9IGZ1bmN0aW9uICh0ZXh0LCB0eXBlLCBvcGVuRHJvcGRvd24pIHtcbiAgICAgICAgaWYgKG9wZW5Ecm9wZG93biA9PT0gdm9pZCAwKSB7IG9wZW5Ecm9wZG93biA9IHRydWU7IH1cbiAgICAgICAgdmFyIG9sZE5vdGljZSA9IHRoaXMuX25vdGljZTtcbiAgICAgICAgaWYgKG9sZE5vdGljZSAmJlxuICAgICAgICAgICAgKChvbGROb3RpY2UudHlwZSA9PT0gdHlwZSAmJiBvbGROb3RpY2UudGV4dCA9PT0gdGV4dCkgfHxcbiAgICAgICAgICAgICAgICAob2xkTm90aWNlLnR5cGUgPT09IE5vdGljZVR5cGVzLmFkZENob2ljZSAmJlxuICAgICAgICAgICAgICAgICAgICAodHlwZSA9PT0gTm90aWNlVHlwZXMubm9SZXN1bHRzIHx8IHR5cGUgPT09IE5vdGljZVR5cGVzLm5vQ2hvaWNlcykpKSkge1xuICAgICAgICAgICAgaWYgKG9wZW5Ecm9wZG93bikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NsZWFyTm90aWNlKCk7XG4gICAgICAgIHRoaXMuX25vdGljZSA9IHRleHRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9yZW5kZXJOb3RpY2UoKTtcbiAgICAgICAgaWYgKG9wZW5Ecm9wZG93biAmJiB0ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLnNob3dEcm9wZG93bih0cnVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2NsZWFyTm90aWNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX25vdGljZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBub3RpY2VFbGVtZW50ID0gdGhpcy5jaG9pY2VMaXN0LmVsZW1lbnQucXVlcnlTZWxlY3RvcihnZXRDbGFzc05hbWVzU2VsZWN0b3IodGhpcy5jb25maWcuY2xhc3NOYW1lcy5ub3RpY2UpKTtcbiAgICAgICAgaWYgKG5vdGljZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIG5vdGljZUVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbm90aWNlID0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX3JlbmRlck5vdGljZSA9IGZ1bmN0aW9uIChmcmFnbWVudCkge1xuICAgICAgICB2YXIgbm90aWNlQ29uZiA9IHRoaXMuX25vdGljZTtcbiAgICAgICAgaWYgKG5vdGljZUNvbmYpIHtcbiAgICAgICAgICAgIHZhciBub3RpY2UgPSB0aGlzLl90ZW1wbGF0ZXMubm90aWNlKHRoaXMuY29uZmlnLCBub3RpY2VDb25mLnRleHQsIG5vdGljZUNvbmYudHlwZSk7XG4gICAgICAgICAgICBpZiAoZnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmQobm90aWNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hvaWNlTGlzdC5wcmVwZW5kKG5vdGljZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2dldENob2ljZUZvck91dHB1dCA9IGZ1bmN0aW9uIChjaG9pY2UsIGtleUNvZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBjaG9pY2UuaWQsXG4gICAgICAgICAgICBoaWdobGlnaHRlZDogY2hvaWNlLmhpZ2hsaWdodGVkLFxuICAgICAgICAgICAgbGFiZWxDbGFzczogY2hvaWNlLmxhYmVsQ2xhc3MsXG4gICAgICAgICAgICBsYWJlbERlc2NyaXB0aW9uOiBjaG9pY2UubGFiZWxEZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGN1c3RvbVByb3BlcnRpZXM6IGNob2ljZS5jdXN0b21Qcm9wZXJ0aWVzLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IGNob2ljZS5kaXNhYmxlZCxcbiAgICAgICAgICAgIGFjdGl2ZTogY2hvaWNlLmFjdGl2ZSxcbiAgICAgICAgICAgIGxhYmVsOiBjaG9pY2UubGFiZWwsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogY2hvaWNlLnBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgdmFsdWU6IGNob2ljZS52YWx1ZSxcbiAgICAgICAgICAgIGdyb3VwVmFsdWU6IGNob2ljZS5ncm91cCA/IGNob2ljZS5ncm91cC5sYWJlbCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGNob2ljZS5lbGVtZW50LFxuICAgICAgICAgICAga2V5Q29kZToga2V5Q29kZSxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl90cmlnZ2VyQ2hhbmdlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXNzZWRFbGVtZW50LnRyaWdnZXJFdmVudChFdmVudFR5cGUuY2hhbmdlLCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2hhbmRsZUJ1dHRvbkFjdGlvbiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBpdGVtcyA9IHRoaXMuX3N0b3JlLml0ZW1zO1xuICAgICAgICBpZiAoIWl0ZW1zLmxlbmd0aCB8fCAhdGhpcy5jb25maWcucmVtb3ZlSXRlbXMgfHwgIXRoaXMuY29uZmlnLnJlbW92ZUl0ZW1CdXR0b24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaWQgPSBlbGVtZW50ICYmIHBhcnNlRGF0YVNldElkKGVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgICAgIHZhciBpdGVtVG9SZW1vdmUgPSBpZCAmJiBpdGVtcy5maW5kKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtLmlkID09PSBpZDsgfSk7XG4gICAgICAgIGlmICghaXRlbVRvUmVtb3ZlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcmUud2l0aFR4bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgaXRlbSBhc3NvY2lhdGVkIHdpdGggYnV0dG9uXG4gICAgICAgICAgICBfdGhpcy5fcmVtb3ZlSXRlbShpdGVtVG9SZW1vdmUpO1xuICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJDaGFuZ2UoaXRlbVRvUmVtb3ZlLnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5faXNTZWxlY3RPbmVFbGVtZW50ICYmICFfdGhpcy5faGFzTm9uQ2hvaWNlUGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXJDaG9pY2UgPSBfdGhpcy5fc3RvcmUuY2hvaWNlc1xuICAgICAgICAgICAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKGZ1bmN0aW9uIChjaG9pY2UpIHsgcmV0dXJuICFjaG9pY2UuZGlzYWJsZWQgJiYgY2hvaWNlLnBsYWNlaG9sZGVyOyB9KTtcbiAgICAgICAgICAgICAgICBpZiAocGxhY2Vob2xkZXJDaG9pY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2FkZEl0ZW0ocGxhY2Vob2xkZXJDaG9pY2UpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy51bmhpZ2hsaWdodEFsbCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2Vob2xkZXJDaG9pY2UudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyQ2hhbmdlKHBsYWNlaG9sZGVyQ2hvaWNlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5faGFuZGxlSXRlbUFjdGlvbiA9IGZ1bmN0aW9uIChlbGVtZW50LCBoYXNTaGlmdEtleSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoaGFzU2hpZnRLZXkgPT09IHZvaWQgMCkgeyBoYXNTaGlmdEtleSA9IGZhbHNlOyB9XG4gICAgICAgIHZhciBpdGVtcyA9IHRoaXMuX3N0b3JlLml0ZW1zO1xuICAgICAgICBpZiAoIWl0ZW1zLmxlbmd0aCB8fCAhdGhpcy5jb25maWcucmVtb3ZlSXRlbXMgfHwgdGhpcy5faXNTZWxlY3RPbmVFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlkID0gcGFyc2VEYXRhU2V0SWQoZWxlbWVudCk7XG4gICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBXZSBvbmx5IHdhbnQgdG8gc2VsZWN0IG9uZSBpdGVtIHdpdGggYSBjbGlja1xuICAgICAgICAvLyBzbyB3ZSBkZXNlbGVjdCBhbnkgaXRlbXMgdGhhdCBhcmVuJ3QgdGhlIHRhcmdldFxuICAgICAgICAvLyB1bmxlc3Mgc2hpZnQgaXMgYmVpbmcgcHJlc3NlZFxuICAgICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaWQgJiYgIWl0ZW0uaGlnaGxpZ2h0ZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWdobGlnaHRJdGVtKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIWhhc1NoaWZ0S2V5ICYmIGl0ZW0uaGlnaGxpZ2h0ZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy51bmhpZ2hsaWdodEl0ZW0oaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBGb2N1cyBpbnB1dCBhcyB3aXRob3V0IGZvY3VzLCBhIHVzZXIgY2Fubm90IGRvIGFueXRoaW5nIHdpdGggYVxuICAgICAgICAvLyBoaWdobGlnaHRlZCBpdGVtXG4gICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9oYW5kbGVDaG9pY2VBY3Rpb24gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBJZiB3ZSBhcmUgY2xpY2tpbmcgb24gYW4gb3B0aW9uXG4gICAgICAgIHZhciBpZCA9IHBhcnNlRGF0YVNldElkKGVsZW1lbnQpO1xuICAgICAgICB2YXIgY2hvaWNlID0gaWQgJiYgdGhpcy5fc3RvcmUuZ2V0Q2hvaWNlQnlJZChpZCk7XG4gICAgICAgIGlmICghY2hvaWNlIHx8IGNob2ljZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoYXNBY3RpdmVEcm9wZG93biA9IHRoaXMuZHJvcGRvd24uaXNBY3RpdmU7XG4gICAgICAgIGlmICghY2hvaWNlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NhbkFkZEl0ZW1zKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gY2F1c2VzIF9vbkVudGVyS2V5IHRvIGVhcmx5IG91dFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3RvcmUud2l0aFR4bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2FkZEl0ZW0oY2hvaWNlLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5jbGVhcklucHV0KCk7XG4gICAgICAgICAgICAgICAgX3RoaXMudW5oaWdobGlnaHRBbGwoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5nZShjaG9pY2UudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdlIHdhbnQgdG8gY2xvc2UgdGhlIGRyb3Bkb3duIGlmIHdlIGFyZSBkZWFsaW5nIHdpdGggYSBzaW5nbGUgc2VsZWN0IGJveFxuICAgICAgICBpZiAoaGFzQWN0aXZlRHJvcGRvd24gJiYgdGhpcy5jb25maWcuY2xvc2VEcm9wZG93bk9uU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVEcm9wZG93bih0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyT3V0ZXIuZWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2hhbmRsZUJhY2tzcGFjZSA9IGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICAgIGlmICghY29uZmlnLnJlbW92ZUl0ZW1zIHx8ICFpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGFzdEl0ZW0gPSBpdGVtc1tpdGVtcy5sZW5ndGggLSAxXTtcbiAgICAgICAgdmFyIGhhc0hpZ2hsaWdodGVkSXRlbXMgPSBpdGVtcy5zb21lKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtLmhpZ2hsaWdodGVkOyB9KTtcbiAgICAgICAgLy8gSWYgZWRpdGluZyB0aGUgbGFzdCBpdGVtIGlzIGFsbG93ZWQgYW5kIHRoZXJlIGFyZSBub3Qgb3RoZXIgc2VsZWN0ZWQgaXRlbXMsXG4gICAgICAgIC8vIHdlIGNhbiBlZGl0IHRoZSBpdGVtIHZhbHVlLiBPdGhlcndpc2UgaWYgd2UgY2FuIHJlbW92ZSBpdGVtcywgcmVtb3ZlIGFsbCBzZWxlY3RlZCBpdGVtc1xuICAgICAgICBpZiAoY29uZmlnLmVkaXRJdGVtcyAmJiAhaGFzSGlnaGxpZ2h0ZWRJdGVtcyAmJiBsYXN0SXRlbSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9IGxhc3RJdGVtLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRXaWR0aCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlSXRlbShsYXN0SXRlbSk7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ2hhbmdlKGxhc3RJdGVtLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaGFzSGlnaGxpZ2h0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgIC8vIEhpZ2hsaWdodCBsYXN0IGl0ZW0gaWYgbm9uZSBhbHJlYWR5IGhpZ2hsaWdodGVkXG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRJdGVtKGxhc3RJdGVtLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUhpZ2hsaWdodGVkSXRlbXModHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9sb2FkQ2hvaWNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICAgIGlmICh0aGlzLl9pc1RleHRFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBBc3NpZ24gcHJlc2V0IGl0ZW1zIGZyb20gcGFzc2VkIG9iamVjdCBmaXJzdFxuICAgICAgICAgICAgdGhpcy5fcHJlc2V0Q2hvaWNlcyA9IGNvbmZpZy5pdGVtcy5tYXAoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG1hcElucHV0VG9DaG9pY2UoZSwgZmFsc2UpOyB9KTtcbiAgICAgICAgICAgIC8vIEFkZCBhbnkgdmFsdWVzIHBhc3NlZCBmcm9tIGF0dHJpYnV0ZVxuICAgICAgICAgICAgaWYgKHRoaXMucGFzc2VkRWxlbWVudC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50SXRlbXMgPSB0aGlzLnBhc3NlZEVsZW1lbnQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KGNvbmZpZy5kZWxpbWl0ZXIpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG1hcElucHV0VG9DaG9pY2UoZSwgZmFsc2UsIF90aGlzLmNvbmZpZy5hbGxvd0h0bWxVc2VySW5wdXQpOyB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmVzZXRDaG9pY2VzID0gdGhpcy5fcHJlc2V0Q2hvaWNlcy5jb25jYXQoZWxlbWVudEl0ZW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3ByZXNldENob2ljZXMuZm9yRWFjaChmdW5jdGlvbiAoY2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2lzU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gQXNzaWduIHByZXNldCBjaG9pY2VzIGZyb20gcGFzc2VkIG9iamVjdFxuICAgICAgICAgICAgdGhpcy5fcHJlc2V0Q2hvaWNlcyA9IGNvbmZpZy5jaG9pY2VzLm1hcChmdW5jdGlvbiAoZSkgeyByZXR1cm4gbWFwSW5wdXRUb0Nob2ljZShlLCB0cnVlKTsgfSk7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYXJyYXkgb2YgY2hvaWNlcyBmcm9tIG9wdGlvbiBlbGVtZW50c1xuICAgICAgICAgICAgdmFyIGNob2ljZXNGcm9tT3B0aW9ucyA9IHRoaXMucGFzc2VkRWxlbWVudC5vcHRpb25zQXNDaG9pY2VzKCk7XG4gICAgICAgICAgICBpZiAoY2hvaWNlc0Zyb21PcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgKF9hID0gdGhpcy5fcHJlc2V0Q2hvaWNlcykucHVzaC5hcHBseShfYSwgY2hvaWNlc0Zyb21PcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2hhbmRsZUxvYWRpbmdTdGF0ZSA9IGZ1bmN0aW9uIChzZXRMb2FkaW5nKSB7XG4gICAgICAgIGlmIChzZXRMb2FkaW5nID09PSB2b2lkIDApIHsgc2V0TG9hZGluZyA9IHRydWU7IH1cbiAgICAgICAgdmFyIGVsID0gdGhpcy5pdGVtTGlzdC5lbGVtZW50O1xuICAgICAgICBpZiAoc2V0TG9hZGluZykge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lck91dGVyLmFkZExvYWRpbmdTdGF0ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzU2VsZWN0T25lRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsLnJlcGxhY2VDaGlsZHJlbih0aGlzLl90ZW1wbGF0ZXMucGxhY2Vob2xkZXIodGhpcy5jb25maWcsIHRoaXMuY29uZmlnLmxvYWRpbmdUZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnBsYWNlaG9sZGVyID0gdGhpcy5jb25maWcubG9hZGluZ1RleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXJPdXRlci5yZW1vdmVMb2FkaW5nU3RhdGUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlbC5yZXBsYWNlQ2hpbGRyZW4oJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5wbGFjZWhvbGRlciA9IHRoaXMuX3BsYWNlaG9sZGVyVmFsdWUgfHwgJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9oYW5kbGVTZWFyY2ggPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlucHV0LmlzRm9jdXNzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBDaGVjayB0aGF0IHdlIGhhdmUgYSB2YWx1ZSB0byBzZWFyY2ggYW5kIHRoZSBpbnB1dCB3YXMgYW4gYWxwaGFudW1lcmljIGNoYXJhY3RlclxuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZS5sZW5ndGggPj0gdGhpcy5jb25maWcuc2VhcmNoRmxvb3IpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHRDb3VudCA9IHRoaXMuY29uZmlnLnNlYXJjaENob2ljZXMgPyB0aGlzLl9zZWFyY2hDaG9pY2VzKHZhbHVlKSA6IDA7XG4gICAgICAgICAgICBpZiAocmVzdWx0Q291bnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHNlYXJjaCBldmVudFxuICAgICAgICAgICAgICAgIHRoaXMucGFzc2VkRWxlbWVudC50cmlnZ2VyRXZlbnQoRXZlbnRUeXBlLnNlYXJjaCwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdENvdW50OiByZXN1bHRDb3VudCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9zdG9yZS5jaG9pY2VzLnNvbWUoZnVuY3Rpb24gKG9wdGlvbikgeyByZXR1cm4gIW9wdGlvbi5hY3RpdmU7IH0pKSB7XG4gICAgICAgICAgICB0aGlzLl9zdG9wU2VhcmNoKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9jYW5BZGRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgICB2YXIgbWF4SXRlbUNvdW50ID0gY29uZmlnLm1heEl0ZW1Db3VudCwgbWF4SXRlbVRleHQgPSBjb25maWcubWF4SXRlbVRleHQ7XG4gICAgICAgIGlmICghY29uZmlnLnNpbmdsZU1vZGVGb3JNdWx0aVNlbGVjdCAmJiBtYXhJdGVtQ291bnQgPiAwICYmIG1heEl0ZW1Db3VudCA8PSB0aGlzLl9zdG9yZS5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuY2hvaWNlTGlzdC5lbGVtZW50LnJlcGxhY2VDaGlsZHJlbignJyk7XG4gICAgICAgICAgICB0aGlzLl9ub3RpY2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5Tm90aWNlKHR5cGVvZiBtYXhJdGVtVGV4dCA9PT0gJ2Z1bmN0aW9uJyA/IG1heEl0ZW1UZXh0KG1heEl0ZW1Db3VudCkgOiBtYXhJdGVtVGV4dCwgTm90aWNlVHlwZXMuYWRkQ2hvaWNlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9jYW5DcmVhdGVJdGVtID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgICAgdmFyIGNhbkFkZEl0ZW0gPSB0cnVlO1xuICAgICAgICB2YXIgbm90aWNlID0gJyc7XG4gICAgICAgIGlmIChjYW5BZGRJdGVtICYmIHR5cGVvZiBjb25maWcuYWRkSXRlbUZpbHRlciA9PT0gJ2Z1bmN0aW9uJyAmJiAhY29uZmlnLmFkZEl0ZW1GaWx0ZXIodmFsdWUpKSB7XG4gICAgICAgICAgICBjYW5BZGRJdGVtID0gZmFsc2U7XG4gICAgICAgICAgICBub3RpY2UgPSByZXNvbHZlTm90aWNlRnVuY3Rpb24oY29uZmlnLmN1c3RvbUFkZEl0ZW1UZXh0LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbkFkZEl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBmb3VuZENob2ljZSA9IHRoaXMuX3N0b3JlLmNob2ljZXMuZmluZChmdW5jdGlvbiAoY2hvaWNlKSB7IHJldHVybiBjb25maWcudmFsdWVDb21wYXJlcihjaG9pY2UudmFsdWUsIHZhbHVlKTsgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gZm9yIGV4YWN0IG1hdGNoZXMsIGRvIG5vdCBwcm9tcHQgdG8gYWRkIGl0IGFzIGEgY3VzdG9tIGNob2ljZVxuICAgICAgICAgICAgICAgIGlmIChmb3VuZENob2ljZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNwbGF5Tm90aWNlKCcnLCBOb3RpY2VUeXBlcy5hZGRDaG9pY2UpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5faXNUZXh0RWxlbWVudCAmJiAhY29uZmlnLmR1cGxpY2F0ZUl0ZW1zQWxsb3dlZCkge1xuICAgICAgICAgICAgICAgIGlmIChmb3VuZENob2ljZSkge1xuICAgICAgICAgICAgICAgICAgICBjYW5BZGRJdGVtID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIG5vdGljZSA9IHJlc29sdmVOb3RpY2VGdW5jdGlvbihjb25maWcudW5pcXVlSXRlbVRleHQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbkFkZEl0ZW0pIHtcbiAgICAgICAgICAgIG5vdGljZSA9IHJlc29sdmVOb3RpY2VGdW5jdGlvbihjb25maWcuYWRkSXRlbVRleHQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm90aWNlKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5Tm90aWNlKG5vdGljZSwgTm90aWNlVHlwZXMuYWRkQ2hvaWNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FuQWRkSXRlbTtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9zZWFyY2hDaG9pY2VzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHZhbHVlLnRyaW0oKS5yZXBsYWNlKC9cXHN7Mix9LywgJyAnKTtcbiAgICAgICAgLy8gc2lnbmFsIGlucHV0IGRpZG4ndCBjaGFuZ2Ugc2VhcmNoXG4gICAgICAgIGlmICghbmV3VmFsdWUubGVuZ3RoIHx8IG5ld1ZhbHVlID09PSB0aGlzLl9jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWFyY2hlciA9IHRoaXMuX3NlYXJjaGVyO1xuICAgICAgICBpZiAoc2VhcmNoZXIuaXNFbXB0eUluZGV4KCkpIHtcbiAgICAgICAgICAgIHNlYXJjaGVyLmluZGV4KHRoaXMuX3N0b3JlLnNlYXJjaGFibGVDaG9pY2VzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBuZXcgdmFsdWUgbWF0Y2hlcyB0aGUgZGVzaXJlZCBsZW5ndGggYW5kIGlzIG5vdCB0aGUgc2FtZSBhcyB0aGUgY3VycmVudCB2YWx1ZSB3aXRoIGEgc3BhY2VcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBzZWFyY2hlci5zZWFyY2gobmV3VmFsdWUpO1xuICAgICAgICB0aGlzLl9jdXJyZW50VmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy5faGlnaGxpZ2h0UG9zaXRpb24gPSAwO1xuICAgICAgICB0aGlzLl9pc1NlYXJjaGluZyA9IHRydWU7XG4gICAgICAgIHZhciBub3RpY2UgPSB0aGlzLl9ub3RpY2U7XG4gICAgICAgIHZhciBub3RpY2VUeXBlID0gbm90aWNlICYmIG5vdGljZS50eXBlO1xuICAgICAgICBpZiAobm90aWNlVHlwZSAhPT0gTm90aWNlVHlwZXMuYWRkQ2hvaWNlKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzcGxheU5vdGljZShyZXNvbHZlU3RyaW5nRnVuY3Rpb24odGhpcy5jb25maWcubm9SZXN1bHRzVGV4dCksIE5vdGljZVR5cGVzLm5vUmVzdWx0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGVhck5vdGljZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKGZpbHRlckNob2ljZXMocmVzdWx0cykpO1xuICAgICAgICByZXR1cm4gcmVzdWx0cy5sZW5ndGg7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fc3RvcFNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzU2VhcmNoaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50VmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMuX2lzU2VhcmNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9jbGVhck5vdGljZSgpO1xuICAgICAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goYWN0aXZhdGVDaG9pY2VzKHRydWUpKTtcbiAgICAgICAgICAgIHRoaXMucGFzc2VkRWxlbWVudC50cmlnZ2VyRXZlbnQoRXZlbnRUeXBlLnNlYXJjaCwge1xuICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICByZXN1bHRDb3VudDogMCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkb2N1bWVudEVsZW1lbnQgPSB0aGlzLl9kb2NSb290O1xuICAgICAgICB2YXIgb3V0ZXJFbGVtZW50ID0gdGhpcy5jb250YWluZXJPdXRlci5lbGVtZW50O1xuICAgICAgICB2YXIgaW5wdXRFbGVtZW50ID0gdGhpcy5pbnB1dC5lbGVtZW50O1xuICAgICAgICAvLyBjYXB0dXJlIGV2ZW50cyAtIGNhbiBjYW5jZWwgZXZlbnQgcHJvY2Vzc2luZyBvciBwcm9wYWdhdGlvblxuICAgICAgICBkb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9vblRvdWNoRW5kLCB0cnVlKTtcbiAgICAgICAgb3V0ZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24sIHRydWUpO1xuICAgICAgICBvdXRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAvLyBwYXNzaXZlIGV2ZW50cyAtIGRvZXNuJ3QgY2FsbCBgcHJldmVudERlZmF1bHRgIG9yIGBzdG9wUHJvcGFnYXRpb25gXG4gICAgICAgIGRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2ssIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlLCB7XG4gICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMuX29uTW91c2VPdmVyLCB7XG4gICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuX2lzU2VsZWN0T25lRWxlbWVudCkge1xuICAgICAgICAgICAgb3V0ZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fb25Gb2N1cywge1xuICAgICAgICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG91dGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5fb25CbHVyLCB7XG4gICAgICAgICAgICAgICAgcGFzc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX29uS2V5VXAsIHtcbiAgICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLl9vbklucHV0LCB7XG4gICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fb25Gb2N1cywge1xuICAgICAgICAgICAgcGFzc2l2ZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5fb25CbHVyLCB7XG4gICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGlucHV0RWxlbWVudC5mb3JtKSB7XG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIHRoaXMuX29uRm9ybVJlc2V0LCB7XG4gICAgICAgICAgICAgICAgcGFzc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9yZW1vdmVFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRvY3VtZW50RWxlbWVudCA9IHRoaXMuX2RvY1Jvb3Q7XG4gICAgICAgIHZhciBvdXRlckVsZW1lbnQgPSB0aGlzLmNvbnRhaW5lck91dGVyLmVsZW1lbnQ7XG4gICAgICAgIHZhciBpbnB1dEVsZW1lbnQgPSB0aGlzLmlucHV0LmVsZW1lbnQ7XG4gICAgICAgIGRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQsIHRydWUpO1xuICAgICAgICBvdXRlckVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93biwgdHJ1ZSk7XG4gICAgICAgIG91dGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgIGRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICAgICAgICBkb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5fb25Nb3VzZU92ZXIpO1xuICAgICAgICBpZiAodGhpcy5faXNTZWxlY3RPbmVFbGVtZW50KSB7XG4gICAgICAgICAgICBvdXRlckVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9vbkZvY3VzKTtcbiAgICAgICAgICAgIG91dGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5fb25CbHVyKTtcbiAgICAgICAgfVxuICAgICAgICBpbnB1dEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9vbktleVVwKTtcbiAgICAgICAgaW5wdXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5fb25JbnB1dCk7XG4gICAgICAgIGlucHV0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX29uRm9jdXMpO1xuICAgICAgICBpbnB1dEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuX29uQmx1cik7XG4gICAgICAgIGlmIChpbnB1dEVsZW1lbnQuZm9ybSkge1xuICAgICAgICAgICAgaW5wdXRFbGVtZW50LmZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzZXQnLCB0aGlzLl9vbkZvcm1SZXNldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX29uS2V5RG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgICAgIHZhciBoYXNBY3RpdmVEcm9wZG93biA9IHRoaXMuZHJvcGRvd24uaXNBY3RpdmU7XG4gICAgICAgIC8qXG4gICAgICAgIFNlZTpcbiAgICAgICAgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0tleWJvYXJkRXZlbnQva2V5XG4gICAgICAgIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9VSV9FdmVudHMvS2V5Ym9hcmRfZXZlbnRfa2V5X3ZhbHVlc1xuICAgICAgICBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9VVEYtMTYjQ29kZV9wb2ludHNfZnJvbV9VKzAxMDAwMF90b19VKzEwRkZGRiAtIFVURi0xNiBzdXJyb2dhdGUgcGFpcnNcbiAgICAgICAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzcwODY2NTMyIC0gXCJVbmlkZW50aWZpZWRcIiBmb3IgbW9iaWxlXG4gICAgICAgIGh0dHA6Ly93d3cudW5pY29kZS5vcmcvdmVyc2lvbnMvVW5pY29kZTUuMi4wL2NoMTYucGRmI0cxOTYzNSAtIFUrRkZGRiBpcyByZXNlcnZlZCAoU2VjdGlvbiAxNi43KVxuICAgIFxuICAgICAgICBMb2dpYzogd2hlbiBhIGtleSBldmVudCBpcyBzZW50LCBgZXZlbnQua2V5YCByZXByZXNlbnRzIGl0cyBwcmludGFibGUgdmFsdWUgX29yXyBvbmVcbiAgICAgICAgb2YgYSBsYXJnZSBsaXN0IG9mIHNwZWNpYWwgdmFsdWVzIGluZGljYXRpbmcgbWV0YSBrZXlzL2Z1bmN0aW9uYWxpdHkuIEluIGFkZGl0aW9uLFxuICAgICAgICBrZXkgZXZlbnRzIGZvciBjb21wb3NlIGZ1bmN0aW9uYWxpdHkgY29udGFpbiBhIHZhbHVlIG9mIGBEZWFkYCB3aGVuIG1pZC1jb21wb3NpdGlvbi5cbiAgICBcbiAgICAgICAgSSBjYW4ndCBxdWl0ZSB2ZXJpZnkgaXQsIGJ1dCBub24tRW5nbGlzaCBJTUVzIG1heSBhbHNvIGJlIGFibGUgdG8gZ2VuZXJhdGUga2V5IGNvZGVzXG4gICAgICAgIGZvciBjb2RlIHBvaW50cyBpbiB0aGUgc3Vycm9nYXRlLXBhaXIgcmFuZ2UsIHdoaWNoIGNvdWxkIHBvdGVudGlhbGx5IGJlIHNlZW4gYXMgaGF2aW5nXG4gICAgICAgIGtleS5sZW5ndGggPiAxLiBTaW5jZSBgRm5gIGlzIG9uZSBvZiB0aGUgc3BlY2lhbCBrZXlzLCB3ZSBjYW4ndCBkaXN0aW5ndWlzaCBieSB0aGF0XG4gICAgICAgIGFsb25lLlxuICAgIFxuICAgICAgICBIZXJlLCBrZXkubGVuZ3RoID09PSAxIG1lYW5zIHdlIGtub3cgZm9yIHN1cmUgdGhlIGlucHV0IHdhcyBwcmludGFibGUgYW5kIG5vdCBhIHNwZWNpYWxcbiAgICAgICAgYGtleWAgdmFsdWUuIFdoZW4gdGhlIGxlbmd0aCBpcyBncmVhdGVyIHRoYW4gMSwgaXQgY291bGQgYmUgZWl0aGVyIGEgcHJpbnRhYmxlIHN1cnJvZ2F0ZVxuICAgICAgICBwYWlyIG9yIGEgc3BlY2lhbCBga2V5YCB2YWx1ZS4gV2UgY2FuIHRlbGwgdGhlIGRpZmZlcmVuY2UgYnkgY2hlY2tpbmcgaWYgdGhlIF9jaGFyYWN0ZXJcbiAgICAgICAgY29kZV8gdmFsdWUgKG5vdCBjb2RlIHBvaW50ISkgaXMgaW4gdGhlIFwic3Vycm9nYXRlIHBhaXJcIiByYW5nZSBvciBub3QuXG4gICAgXG4gICAgICAgIFdlIGRvbid0IHVzZSAuY29kZVBvaW50QXQgYmVjYXVzZSBhbiBpbnZhbGlkIGNvZGUgcG9pbnQgd291bGQgcmV0dXJuIDY1NTM1LCB3aGljaCB3b3VsZG4ndFxuICAgICAgICBwYXNzIHRoZSA+PSAweDEwMDAwIGNoZWNrIHdlIHdvdWxkIG90aGVyd2lzZSB1c2UuXG4gICAgXG4gICAgICAgID4gLi4uVGhlIFVuaWNvZGUgU3RhbmRhcmQgc2V0cyBhc2lkZSA2NiBub25jaGFyYWN0ZXIgY29kZSBwb2ludHMuIFRoZSBsYXN0IHR3byBjb2RlIHBvaW50c1xuICAgICAgICA+IG9mIGVhY2ggcGxhbmUgYXJlIG5vbmNoYXJhY3RlcnM6IFUrRkZGRSBhbmQgVStGRkZGIG9uIHRoZSBCTVAuLi5cbiAgICAgICAgKi9cbiAgICAgICAgdmFyIHdhc1ByaW50YWJsZUNoYXIgPSBldmVudC5rZXkubGVuZ3RoID09PSAxIHx8XG4gICAgICAgICAgICAoZXZlbnQua2V5Lmxlbmd0aCA9PT0gMiAmJiBldmVudC5rZXkuY2hhckNvZGVBdCgwKSA+PSAweGQ4MDApIHx8XG4gICAgICAgICAgICBldmVudC5rZXkgPT09ICdVbmlkZW50aWZpZWQnO1xuICAgICAgICAvKlxuICAgICAgICAgIFdlIGRvIG5vdCBzaG93IHRoZSBkcm9wZG93biBpZiBmb2N1c2luZyBvdXQgd2l0aCBlc2Mgb3IgbmF2aWdhdGluZyB0aHJvdWdoIGlucHV0IGZpZWxkcy5cbiAgICAgICAgICBBbiBhY3RpdmF0ZWQgc2VhcmNoIGNhbiBzdGlsbCBiZSBvcGVuZWQgd2l0aCBhbnkgb3RoZXIga2V5LlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCF0aGlzLl9pc1RleHRFbGVtZW50ICYmXG4gICAgICAgICAgICAhaGFzQWN0aXZlRHJvcGRvd24gJiZcbiAgICAgICAgICAgIGtleUNvZGUgIT09IEtleUNvZGVNYXAuRVNDX0tFWSAmJlxuICAgICAgICAgICAga2V5Q29kZSAhPT0gS2V5Q29kZU1hcC5UQUJfS0VZICYmXG4gICAgICAgICAgICBrZXlDb2RlICE9PSBLZXlDb2RlTWFwLlNISUZUX0tFWSkge1xuICAgICAgICAgICAgdGhpcy5zaG93RHJvcGRvd24oKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5pbnB1dC5pc0ZvY3Vzc2VkICYmIHdhc1ByaW50YWJsZUNoYXIpIHtcbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgV2UgdXBkYXRlIHRoZSBpbnB1dCB2YWx1ZSB3aXRoIHRoZSBwcmVzc2VkIGtleSBhc1xuICAgICAgICAgICAgICAgICAgdGhlIGlucHV0IHdhcyBub3QgZm9jdXNzZWQgYXQgdGhlIHRpbWUgb2Yga2V5IHByZXNzXG4gICAgICAgICAgICAgICAgICB0aGVyZWZvcmUgZG9lcyBub3QgaGF2ZSB0aGUgdmFsdWUgb2YgdGhlIGtleS5cbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQudmFsdWUgKz0gZXZlbnQua2V5O1xuICAgICAgICAgICAgICAgIC8vIGJyb3dzZXJzIGludGVycHJldCBhIHNwYWNlIGFzIHBhZ2Vkb3duXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBLZXlDb2RlTWFwLkFfS0VZOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vblNlbGVjdEtleShldmVudCwgdGhpcy5pdGVtTGlzdC5lbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSk7XG4gICAgICAgICAgICBjYXNlIEtleUNvZGVNYXAuRU5URVJfS0VZOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbkVudGVyS2V5KGV2ZW50LCBoYXNBY3RpdmVEcm9wZG93bik7XG4gICAgICAgICAgICBjYXNlIEtleUNvZGVNYXAuRVNDX0tFWTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb25Fc2NhcGVLZXkoZXZlbnQsIGhhc0FjdGl2ZURyb3Bkb3duKTtcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZU1hcC5VUF9LRVk6XG4gICAgICAgICAgICBjYXNlIEtleUNvZGVNYXAuUEFHRV9VUF9LRVk6XG4gICAgICAgICAgICBjYXNlIEtleUNvZGVNYXAuRE9XTl9LRVk6XG4gICAgICAgICAgICBjYXNlIEtleUNvZGVNYXAuUEFHRV9ET1dOX0tFWTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb25EaXJlY3Rpb25LZXkoZXZlbnQsIGhhc0FjdGl2ZURyb3Bkb3duKTtcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZU1hcC5ERUxFVEVfS0VZOlxuICAgICAgICAgICAgY2FzZSBLZXlDb2RlTWFwLkJBQ0tfS0VZOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbkRlbGV0ZUtleShldmVudCwgdGhpcy5fc3RvcmUuaXRlbXMsIHRoaXMuaW5wdXQuaXNGb2N1c3NlZCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9vbktleVVwID0gZnVuY3Rpb24gKCAvKiBldmVudDogS2V5Ym9hcmRFdmVudCAqLykge1xuICAgICAgICB0aGlzLl9jYW5TZWFyY2ggPSB0aGlzLmNvbmZpZy5zZWFyY2hFbmFibGVkO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX29uSW5wdXQgPSBmdW5jdGlvbiAoIC8qIGV2ZW50OiBJbnB1dEV2ZW50ICovKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuaW5wdXQudmFsdWU7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1RleHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJvcGRvd24odHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdG9wU2VhcmNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9jYW5BZGRJdGVtcygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NhblNlYXJjaCkge1xuICAgICAgICAgICAgLy8gZG8gdGhlIHNlYXJjaCBldmVuIGlmIHRoZSBlbnRlcmVkIHRleHQgY2FuIG5vdCBiZSBhZGRlZFxuICAgICAgICAgICAgdGhpcy5faGFuZGxlU2VhcmNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2NhbkFkZFVzZXJDaG9pY2VzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIGEgbm90aWNlIG5lZWRzIHRvIGJlIGRpc3BsYXllZCBmb3Igd2h5IGEgc2VhcmNoIHJlc3VsdCBjYW4ndCBiZSBhZGRlZFxuICAgICAgICB0aGlzLl9jYW5DcmVhdGVJdGVtKHZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMuX2lzU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5faGlnaGxpZ2h0UG9zaXRpb24gPSAwOyAvLyByZXNldCB0byBzZWxlY3QgdGhlIG5vdGljZSBhbmQvb3IgZXhhY3QgbWF0Y2hcbiAgICAgICAgICAgIHRoaXMuX2hpZ2hsaWdodENob2ljZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25TZWxlY3RLZXkgPSBmdW5jdGlvbiAoZXZlbnQsIGhhc0l0ZW1zKSB7XG4gICAgICAgIC8vIElmIENUUkwgKyBBIG9yIENNRCArIEEgaGF2ZSBiZWVuIHByZXNzZWQgYW5kIHRoZXJlIGFyZSBpdGVtcyB0byBzZWxlY3RcbiAgICAgICAgaWYgKChldmVudC5jdHJsS2V5IHx8IGV2ZW50Lm1ldGFLZXkpICYmIGhhc0l0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW5TZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBzaG91bGRIaWdodGxpZ2h0QWxsID0gdGhpcy5jb25maWcucmVtb3ZlSXRlbXMgJiYgIXRoaXMuaW5wdXQudmFsdWUgJiYgdGhpcy5pbnB1dC5lbGVtZW50ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgaWYgKHNob3VsZEhpZ2h0bGlnaHRBbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodEFsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25FbnRlcktleSA9IGZ1bmN0aW9uIChldmVudCwgaGFzQWN0aXZlRHJvcGRvd24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5pbnB1dC52YWx1ZTtcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWJ1dHRvbicpKSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVCdXR0b25BY3Rpb24odGFyZ2V0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWhhc0FjdGl2ZURyb3Bkb3duKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNTZWxlY3RFbGVtZW50IHx8IHRoaXMuX25vdGljZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhpZ2hsaWdodGVkQ2hvaWNlID0gdGhpcy5kcm9wZG93bi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoZ2V0Q2xhc3NOYW1lc1NlbGVjdG9yKHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuaGlnaGxpZ2h0ZWRTdGF0ZSkpO1xuICAgICAgICBpZiAoaGlnaGxpZ2h0ZWRDaG9pY2UgJiYgdGhpcy5faGFuZGxlQ2hvaWNlQWN0aW9uKGhpZ2hsaWdodGVkQ2hvaWNlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGFyZ2V0IHx8ICF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlRHJvcGRvd24odHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9jYW5BZGRJdGVtcygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFkZGVkSXRlbSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdG9yZS53aXRoVHhuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGFkZGVkSXRlbSA9IF90aGlzLl9maW5kQW5kU2VsZWN0Q2hvaWNlQnlWYWx1ZSh2YWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAoIWFkZGVkSXRlbSkge1xuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuX2NhbkFkZFVzZXJDaG9pY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuQ3JlYXRlSXRlbSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5fYWRkQ2hvaWNlKG1hcElucHV0VG9DaG9pY2UodmFsdWUsIGZhbHNlLCBfdGhpcy5jb25maWcuYWxsb3dIdG1sVXNlcklucHV0KSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYWRkZWRJdGVtID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmNsZWFySW5wdXQoKTtcbiAgICAgICAgICAgIF90aGlzLnVuaGlnaGxpZ2h0QWxsKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWFkZGVkSXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2UodmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5jb25maWcuY2xvc2VEcm9wZG93bk9uU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVEcm9wZG93bih0cnVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX29uRXNjYXBlS2V5ID0gZnVuY3Rpb24gKGV2ZW50LCBoYXNBY3RpdmVEcm9wZG93bikge1xuICAgICAgICBpZiAoaGFzQWN0aXZlRHJvcGRvd24pIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5oaWRlRHJvcGRvd24odHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLl9zdG9wU2VhcmNoKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lck91dGVyLmVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX29uRGlyZWN0aW9uS2V5ID0gZnVuY3Rpb24gKGV2ZW50LCBoYXNBY3RpdmVEcm9wZG93bikge1xuICAgICAgICB2YXIga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgICAgIC8vIElmIHVwIG9yIGRvd24ga2V5IGlzIHByZXNzZWQsIHRyYXZlcnNlIHRocm91Z2ggb3B0aW9uc1xuICAgICAgICBpZiAoaGFzQWN0aXZlRHJvcGRvd24gfHwgdGhpcy5faXNTZWxlY3RPbmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNob3dEcm9wZG93bigpO1xuICAgICAgICAgICAgdGhpcy5fY2FuU2VhcmNoID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uSW50ID0ga2V5Q29kZSA9PT0gS2V5Q29kZU1hcC5ET1dOX0tFWSB8fCBrZXlDb2RlID09PSBLZXlDb2RlTWFwLlBBR0VfRE9XTl9LRVkgPyAxIDogLTE7XG4gICAgICAgICAgICB2YXIgc2tpcEtleSA9IGV2ZW50Lm1ldGFLZXkgfHwga2V5Q29kZSA9PT0gS2V5Q29kZU1hcC5QQUdFX0RPV05fS0VZIHx8IGtleUNvZGUgPT09IEtleUNvZGVNYXAuUEFHRV9VUF9LRVk7XG4gICAgICAgICAgICB2YXIgbmV4dEVsID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKHNraXBLZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uSW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0RWwgPSB0aGlzLmRyb3Bkb3duLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIlwiLmNvbmNhdChzZWxlY3RhYmxlQ2hvaWNlSWRlbnRpZmllciwgXCI6bGFzdC1vZi10eXBlXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRFbCA9IHRoaXMuZHJvcGRvd24uZWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdGFibGVDaG9pY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudEVsID0gdGhpcy5kcm9wZG93bi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoZ2V0Q2xhc3NOYW1lc1NlbGVjdG9yKHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuaGlnaGxpZ2h0ZWRTdGF0ZSkpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50RWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsID0gZ2V0QWRqYWNlbnRFbChjdXJyZW50RWwsIHNlbGVjdGFibGVDaG9pY2VJZGVudGlmaWVyLCBkaXJlY3Rpb25JbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsID0gdGhpcy5kcm9wZG93bi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0YWJsZUNob2ljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0RWwpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBwcmV2ZW50IGRlZmF1bHQgdG8gc3RvcCB0aGUgY3Vyc29yIG1vdmluZ1xuICAgICAgICAgICAgICAgIC8vIHdoZW4gcHJlc3NpbmcgdGhlIGFycm93XG4gICAgICAgICAgICAgICAgaWYgKCFpc1Njcm9sbGVkSW50b1ZpZXcobmV4dEVsLCB0aGlzLmNob2ljZUxpc3QuZWxlbWVudCwgZGlyZWN0aW9uSW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNob2ljZUxpc3Quc2Nyb2xsVG9DaGlsZEVsZW1lbnQobmV4dEVsLCBkaXJlY3Rpb25JbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRDaG9pY2UobmV4dEVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdCB0byBtYWludGFpbiBjdXJzb3IgcG9zaXRpb24gd2hpbHN0XG4gICAgICAgICAgICAvLyB0cmF2ZXJzaW5nIGRyb3Bkb3duIG9wdGlvbnNcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9vbkRlbGV0ZUtleSA9IGZ1bmN0aW9uIChldmVudCwgaXRlbXMsIGhhc0ZvY3VzZWRJbnB1dCkge1xuICAgICAgICAvLyBJZiBiYWNrc3BhY2Ugb3IgZGVsZXRlIGtleSBpcyBwcmVzc2VkIGFuZCB0aGUgaW5wdXQgaGFzIG5vIHZhbHVlXG4gICAgICAgIGlmICghdGhpcy5faXNTZWxlY3RPbmVFbGVtZW50ICYmICFldmVudC50YXJnZXQudmFsdWUgJiYgaGFzRm9jdXNlZElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVCYWNrc3BhY2UoaXRlbXMpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX29uVG91Y2hNb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fd2FzVGFwKSB7XG4gICAgICAgICAgICB0aGlzLl93YXNUYXAgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX29uVG91Y2hFbmQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IChldmVudCB8fCBldmVudC50b3VjaGVzWzBdKS50YXJnZXQ7XG4gICAgICAgIHZhciB0b3VjaFdhc1dpdGhpbkNvbnRhaW5lciA9IHRoaXMuX3dhc1RhcCAmJiB0aGlzLmNvbnRhaW5lck91dGVyLmVsZW1lbnQuY29udGFpbnModGFyZ2V0KTtcbiAgICAgICAgaWYgKHRvdWNoV2FzV2l0aGluQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyV2FzRXhhY3RUYXJnZXQgPSB0YXJnZXQgPT09IHRoaXMuY29udGFpbmVyT3V0ZXIuZWxlbWVudCB8fCB0YXJnZXQgPT09IHRoaXMuY29udGFpbmVySW5uZXIuZWxlbWVudDtcbiAgICAgICAgICAgIGlmIChjb250YWluZXJXYXNFeGFjdFRhcmdldCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1RleHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5faXNTZWxlY3RNdWx0aXBsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RHJvcGRvd24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBQcmV2ZW50cyBmb2N1cyBldmVudCBmaXJpbmdcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dhc1RhcCA9IHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIG1vdXNlZG93biBldmVudCBpbiBjYXB0dXJlIG1vZGUgZm9yIGNvbnRhaW5ldE91dGVyLmVsZW1lbnRcbiAgICAgKi9cbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25Nb3VzZURvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBvdXIgbW91c2UgZG93biBvbiB0aGUgc2Nyb2xsYmFyIGFuZCBhcmUgb24gSUUxMS4uLlxuICAgICAgICBpZiAoSVNfSUUxMSAmJiB0aGlzLmNob2ljZUxpc3QuZWxlbWVudC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAvLyBjaGVjayBpZiBjbGljayB3YXMgb24gYSBzY3JvbGxiYXIgYXJlYVxuICAgICAgICAgICAgdmFyIGZpcnN0Q2hvaWNlID0gdGhpcy5jaG9pY2VMaXN0LmVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICB0aGlzLl9pc1Njcm9sbGluZ09uSWUgPVxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9PT0gJ2x0cicgPyBldmVudC5vZmZzZXRYID49IGZpcnN0Q2hvaWNlLm9mZnNldFdpZHRoIDogZXZlbnQub2Zmc2V0WCA8IGZpcnN0Q2hvaWNlLm9mZnNldExlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdGhpcy5pbnB1dC5lbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGl0ZW0gPSB0YXJnZXQuY2xvc2VzdCgnW2RhdGEtYnV0dG9uXSxbZGF0YS1pdGVtXSxbZGF0YS1jaG9pY2VdJyk7XG4gICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICgnYnV0dG9uJyBpbiBpdGVtLmRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVCdXR0b25BY3Rpb24oaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgnaXRlbScgaW4gaXRlbS5kYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlSXRlbUFjdGlvbihpdGVtLCBldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgnY2hvaWNlJyBpbiBpdGVtLmRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVDaG9pY2VBY3Rpb24oaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgbW91c2VvdmVyIGV2ZW50IG92ZXIgdGhpcy5kcm9wZG93blxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25Nb3VzZU92ZXIgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IF9hLnRhcmdldDtcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmICdjaG9pY2UnIGluIHRhcmdldC5kYXRhc2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRDaG9pY2UodGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX29uQ2xpY2sgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IF9hLnRhcmdldDtcbiAgICAgICAgdmFyIGNvbnRhaW5lck91dGVyID0gdGhpcy5jb250YWluZXJPdXRlcjtcbiAgICAgICAgdmFyIGNsaWNrV2FzV2l0aGluQ29udGFpbmVyID0gY29udGFpbmVyT3V0ZXIuZWxlbWVudC5jb250YWlucyh0YXJnZXQpO1xuICAgICAgICBpZiAoY2xpY2tXYXNXaXRoaW5Db250YWluZXIpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kcm9wZG93bi5pc0FjdGl2ZSAmJiAhY29udGFpbmVyT3V0ZXIuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1RleHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzLmlucHV0LmVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RHJvcGRvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyT3V0ZXIuZWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX2lzU2VsZWN0T25lRWxlbWVudCAmJlxuICAgICAgICAgICAgICAgIHRhcmdldCAhPT0gdGhpcy5pbnB1dC5lbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgIXRoaXMuZHJvcGRvd24uZWxlbWVudC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJvcGRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lck91dGVyLnJlbW92ZUZvY3VzU3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZURyb3Bkb3duKHRydWUpO1xuICAgICAgICAgICAgdGhpcy51bmhpZ2hsaWdodEFsbCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25Gb2N1cyA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gX2EudGFyZ2V0O1xuICAgICAgICB2YXIgY29udGFpbmVyT3V0ZXIgPSB0aGlzLmNvbnRhaW5lck91dGVyO1xuICAgICAgICB2YXIgZm9jdXNXYXNXaXRoaW5Db250YWluZXIgPSB0YXJnZXQgJiYgY29udGFpbmVyT3V0ZXIuZWxlbWVudC5jb250YWlucyh0YXJnZXQpO1xuICAgICAgICBpZiAoIWZvY3VzV2FzV2l0aGluQ29udGFpbmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRhcmdldElzSW5wdXQgPSB0YXJnZXQgPT09IHRoaXMuaW5wdXQuZWxlbWVudDtcbiAgICAgICAgaWYgKHRoaXMuX2lzVGV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXRJc0lucHV0KSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyT3V0ZXIuYWRkRm9jdXNTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2lzU2VsZWN0TXVsdGlwbGVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0SXNJbnB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duKHRydWUpO1xuICAgICAgICAgICAgICAgIC8vIElmIGVsZW1lbnQgaXMgYSBzZWxlY3QgYm94LCB0aGUgZm9jdXNlZCBlbGVtZW50IGlzIHRoZSBjb250YWluZXIgYW5kIHRoZSBkcm9wZG93blxuICAgICAgICAgICAgICAgIC8vIGlzbid0IGFscmVhZHkgb3BlbiwgZm9jdXMgYW5kIHNob3cgZHJvcGRvd25cbiAgICAgICAgICAgICAgICBjb250YWluZXJPdXRlci5hZGRGb2N1c1N0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXJPdXRlci5hZGRGb2N1c1N0YXRlKCk7XG4gICAgICAgICAgICBpZiAodGFyZ2V0SXNJbnB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25CbHVyID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBfYS50YXJnZXQ7XG4gICAgICAgIHZhciBjb250YWluZXJPdXRlciA9IHRoaXMuY29udGFpbmVyT3V0ZXI7XG4gICAgICAgIHZhciBibHVyV2FzV2l0aGluQ29udGFpbmVyID0gdGFyZ2V0ICYmIGNvbnRhaW5lck91dGVyLmVsZW1lbnQuY29udGFpbnModGFyZ2V0KTtcbiAgICAgICAgaWYgKGJsdXJXYXNXaXRoaW5Db250YWluZXIgJiYgIXRoaXMuX2lzU2Nyb2xsaW5nT25JZSkge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gdGhpcy5pbnB1dC5lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyT3V0ZXIucmVtb3ZlRm9jdXNTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZURyb3Bkb3duKHRydWUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1RleHRFbGVtZW50IHx8IHRoaXMuX2lzU2VsZWN0TXVsdGlwbGVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5oaWdobGlnaHRBbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0YXJnZXQgPT09IHRoaXMuY29udGFpbmVyT3V0ZXIuZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZm9jdXMgc3RhdGUgd2hlbiB0aGUgcGFzdCBvdXRlckNvbnRhaW5lciB3YXMgdGhlIHRhcmdldFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lck91dGVyLnJlbW92ZUZvY3VzU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE9uIElFMTEsIGNsaWNraW5nIHRoZSBzY29sbGJhciBibHVycyBvdXIgaW5wdXQgYW5kIHRodXNcbiAgICAgICAgICAgIC8vIGNsb3NlcyB0aGUgZHJvcGRvd24uIFRvIHN0b3AgdGhpcywgd2UgcmVmb2N1cyBvdXIgaW5wdXRcbiAgICAgICAgICAgIC8vIGlmIHdlIGtub3cgd2UgYXJlIG9uIElFICphbmQqIGFyZSBzY3JvbGxpbmcuXG4gICAgICAgICAgICB0aGlzLl9pc1Njcm9sbGluZ09uSWUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuZWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25Gb3JtUmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3N0b3JlLndpdGhUeG4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuY2xlYXJJbnB1dCgpO1xuICAgICAgICAgICAgX3RoaXMuaGlkZURyb3Bkb3duKCk7XG4gICAgICAgICAgICBfdGhpcy5yZWZyZXNoKGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAoX3RoaXMuX2luaXRpYWxJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRDaG9pY2VCeVZhbHVlKF90aGlzLl9pbml0aWFsSXRlbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9oaWdobGlnaHRDaG9pY2UgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKGVsID09PSB2b2lkIDApIHsgZWwgPSBudWxsOyB9XG4gICAgICAgIHZhciBjaG9pY2VzID0gQXJyYXkuZnJvbSh0aGlzLmRyb3Bkb3duLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RhYmxlQ2hvaWNlSWRlbnRpZmllcikpO1xuICAgICAgICBpZiAoIWNob2ljZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhc3NlZEVsID0gZWw7XG4gICAgICAgIHZhciBoaWdobGlnaHRlZFN0YXRlID0gdGhpcy5jb25maWcuY2xhc3NOYW1lcy5oaWdobGlnaHRlZFN0YXRlO1xuICAgICAgICB2YXIgaGlnaGxpZ2h0ZWRDaG9pY2VzID0gQXJyYXkuZnJvbSh0aGlzLmRyb3Bkb3duLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChnZXRDbGFzc05hbWVzU2VsZWN0b3IoaGlnaGxpZ2h0ZWRTdGF0ZSkpKTtcbiAgICAgICAgLy8gUmVtb3ZlIGFueSBoaWdobGlnaHRlZCBjaG9pY2VzXG4gICAgICAgIGhpZ2hsaWdodGVkQ2hvaWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaG9pY2UpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzZXNGcm9tRWxlbWVudChjaG9pY2UsIGhpZ2hsaWdodGVkU3RhdGUpO1xuICAgICAgICAgICAgY2hvaWNlLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHBhc3NlZEVsKSB7XG4gICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRQb3NpdGlvbiA9IGNob2ljZXMuaW5kZXhPZihwYXNzZWRFbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBIaWdobGlnaHQgY2hvaWNlIGJhc2VkIG9uIGxhc3Qga25vd24gaGlnaGxpZ2h0IGxvY2F0aW9uXG4gICAgICAgICAgICBpZiAoY2hvaWNlcy5sZW5ndGggPiB0aGlzLl9oaWdobGlnaHRQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgYW4gb3B0aW9uIHRvIGhpZ2hsaWdodFxuICAgICAgICAgICAgICAgIHBhc3NlZEVsID0gY2hvaWNlc1t0aGlzLl9oaWdobGlnaHRQb3NpdGlvbl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgaGlnaGxpZ2h0IHRoZSBvcHRpb24gYmVmb3JlXG4gICAgICAgICAgICAgICAgcGFzc2VkRWwgPSBjaG9pY2VzW2Nob2ljZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXBhc3NlZEVsKSB7XG4gICAgICAgICAgICAgICAgcGFzc2VkRWwgPSBjaG9pY2VzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQocGFzc2VkRWwsIGhpZ2hsaWdodGVkU3RhdGUpO1xuICAgICAgICBwYXNzZWRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgICB0aGlzLnBhc3NlZEVsZW1lbnQudHJpZ2dlckV2ZW50KEV2ZW50VHlwZS5oaWdobGlnaHRDaG9pY2UsIHtcbiAgICAgICAgICAgIGVsOiBwYXNzZWRFbCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmRyb3Bkb3duLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAvLyBJRTExIGlnbm9yZXMgYXJpYS1sYWJlbCBhbmQgYmxvY2tzIHZpcnR1YWwga2V5Ym9hcmRcbiAgICAgICAgICAgIC8vIGlmIGFyaWEtYWN0aXZlZGVzY2VuZGFudCBpcyBzZXQgd2l0aG91dCBhIGRyb3Bkb3duXG4gICAgICAgICAgICB0aGlzLmlucHV0LnNldEFjdGl2ZURlc2NlbmRhbnQocGFzc2VkRWwuaWQpO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXJPdXRlci5zZXRBY3RpdmVEZXNjZW5kYW50KHBhc3NlZEVsLmlkKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2FkZEl0ZW0gPSBmdW5jdGlvbiAoaXRlbSwgd2l0aEV2ZW50cywgdXNlclRyaWdnZXJlZCkge1xuICAgICAgICBpZiAod2l0aEV2ZW50cyA9PT0gdm9pZCAwKSB7IHdpdGhFdmVudHMgPSB0cnVlOyB9XG4gICAgICAgIGlmICh1c2VyVHJpZ2dlcmVkID09PSB2b2lkIDApIHsgdXNlclRyaWdnZXJlZCA9IGZhbHNlOyB9XG4gICAgICAgIGlmICghaXRlbS5pZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaXRlbS5pZCBtdXN0IGJlIHNldCBiZWZvcmUgX2FkZEl0ZW0gaXMgY2FsbGVkIGZvciBhIGNob2ljZS9pdGVtJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNpbmdsZU1vZGVGb3JNdWx0aVNlbGVjdCB8fCB0aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWN0aXZlSXRlbXMoaXRlbS5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goYWRkSXRlbShpdGVtKSk7XG4gICAgICAgIGlmICh3aXRoRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLnBhc3NlZEVsZW1lbnQudHJpZ2dlckV2ZW50KEV2ZW50VHlwZS5hZGRJdGVtLCB0aGlzLl9nZXRDaG9pY2VGb3JPdXRwdXQoaXRlbSkpO1xuICAgICAgICAgICAgaWYgKHVzZXJUcmlnZ2VyZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3NlZEVsZW1lbnQudHJpZ2dlckV2ZW50KEV2ZW50VHlwZS5jaG9pY2UsIHRoaXMuX2dldENob2ljZUZvck91dHB1dChpdGVtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9yZW1vdmVJdGVtID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKCFpdGVtLmlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2gocmVtb3ZlSXRlbSQxKGl0ZW0pKTtcbiAgICAgICAgdmFyIG5vdGljZSA9IHRoaXMuX25vdGljZTtcbiAgICAgICAgaWYgKG5vdGljZSAmJiBub3RpY2UudHlwZSA9PT0gTm90aWNlVHlwZXMubm9DaG9pY2VzKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhck5vdGljZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFzc2VkRWxlbWVudC50cmlnZ2VyRXZlbnQoRXZlbnRUeXBlLnJlbW92ZUl0ZW0sIHRoaXMuX2dldENob2ljZUZvck91dHB1dChpdGVtKSk7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fYWRkQ2hvaWNlID0gZnVuY3Rpb24gKGNob2ljZSwgd2l0aEV2ZW50cywgdXNlclRyaWdnZXJlZCkge1xuICAgICAgICBpZiAod2l0aEV2ZW50cyA9PT0gdm9pZCAwKSB7IHdpdGhFdmVudHMgPSB0cnVlOyB9XG4gICAgICAgIGlmICh1c2VyVHJpZ2dlcmVkID09PSB2b2lkIDApIHsgdXNlclRyaWdnZXJlZCA9IGZhbHNlOyB9XG4gICAgICAgIGlmIChjaG9pY2UuaWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbiBub3QgcmUtYWRkIGEgY2hvaWNlIHdoaWNoIGhhcyBhbHJlYWR5IGJlZW4gYWRkZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICAgIGlmICgodGhpcy5faXNTZWxlY3RFbGVtZW50IHx8ICFjb25maWcuZHVwbGljYXRlSXRlbXNBbGxvd2VkKSAmJlxuICAgICAgICAgICAgdGhpcy5fc3RvcmUuY2hvaWNlcy5maW5kKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjb25maWcudmFsdWVDb21wYXJlcihjLnZhbHVlLCBjaG9pY2UudmFsdWUpOyB9KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSBpZCwgaW4tcGxhY2UgdXBkYXRlIGlzIHJlcXVpcmVkIHNvIGNoYWluaW5nIF9hZGRJdGVtIHdvcmtzIGFzIGV4cGVjdGVkXG4gICAgICAgIHRoaXMuX2xhc3RBZGRlZENob2ljZUlkKys7XG4gICAgICAgIGNob2ljZS5pZCA9IHRoaXMuX2xhc3RBZGRlZENob2ljZUlkO1xuICAgICAgICBjaG9pY2UuZWxlbWVudElkID0gXCJcIi5jb25jYXQodGhpcy5fYmFzZUlkLCBcIi1cIikuY29uY2F0KHRoaXMuX2lkTmFtZXMuaXRlbUNob2ljZSwgXCItXCIpLmNvbmNhdChjaG9pY2UuaWQpO1xuICAgICAgICB2YXIgcHJlcGVuZFZhbHVlID0gY29uZmlnLnByZXBlbmRWYWx1ZSwgYXBwZW5kVmFsdWUgPSBjb25maWcuYXBwZW5kVmFsdWU7XG4gICAgICAgIGlmIChwcmVwZW5kVmFsdWUpIHtcbiAgICAgICAgICAgIGNob2ljZS52YWx1ZSA9IHByZXBlbmRWYWx1ZSArIGNob2ljZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXBwZW5kVmFsdWUpIHtcbiAgICAgICAgICAgIGNob2ljZS52YWx1ZSArPSBhcHBlbmRWYWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgocHJlcGVuZFZhbHVlIHx8IGFwcGVuZFZhbHVlKSAmJiBjaG9pY2UuZWxlbWVudCkge1xuICAgICAgICAgICAgY2hvaWNlLmVsZW1lbnQudmFsdWUgPSBjaG9pY2UudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xlYXJOb3RpY2UoKTtcbiAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goYWRkQ2hvaWNlKGNob2ljZSkpO1xuICAgICAgICBpZiAoY2hvaWNlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRJdGVtKGNob2ljZSwgd2l0aEV2ZW50cywgdXNlclRyaWdnZXJlZCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9hZGRHcm91cCA9IGZ1bmN0aW9uIChncm91cCwgd2l0aEV2ZW50cykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAod2l0aEV2ZW50cyA9PT0gdm9pZCAwKSB7IHdpdGhFdmVudHMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChncm91cC5pZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FuIG5vdCByZS1hZGQgYSBncm91cCB3aGljaCBoYXMgYWxyZWFkeSBiZWVuIGFkZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goYWRkR3JvdXAoZ3JvdXApKTtcbiAgICAgICAgaWYgKCFncm91cC5jaG9pY2VzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWRkIHVuaXF1ZSBpZCBmb3IgdGhlIGdyb3VwKHMpLCBhbmQgZG8gbm90IHN0b3JlIHRoZSBmdWxsIGxpc3Qgb2YgY2hvaWNlcyBpbiB0aGlzIGdyb3VwXG4gICAgICAgIHRoaXMuX2xhc3RBZGRlZEdyb3VwSWQrKztcbiAgICAgICAgZ3JvdXAuaWQgPSB0aGlzLl9sYXN0QWRkZWRHcm91cElkO1xuICAgICAgICBncm91cC5jaG9pY2VzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0uZ3JvdXAgPSBncm91cDtcbiAgICAgICAgICAgIGlmIChncm91cC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuX2FkZENob2ljZShpdGVtLCB3aXRoRXZlbnRzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fY3JlYXRlVGVtcGxhdGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgY2FsbGJhY2tPbkNyZWF0ZVRlbXBsYXRlcyA9IHRoaXMuY29uZmlnLmNhbGxiYWNrT25DcmVhdGVUZW1wbGF0ZXM7XG4gICAgICAgIHZhciB1c2VyVGVtcGxhdGVzID0ge307XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tPbkNyZWF0ZVRlbXBsYXRlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdXNlclRlbXBsYXRlcyA9IGNhbGxiYWNrT25DcmVhdGVUZW1wbGF0ZXMuY2FsbCh0aGlzLCBzdHJUb0VsLCBlc2NhcGVGb3JUZW1wbGF0ZSwgZ2V0Q2xhc3NOYW1lcyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRlbXBsYXRpbmcgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fdGVtcGxhdGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBpZiAobmFtZSBpbiB1c2VyVGVtcGxhdGVzKSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGluZ1tuYW1lXSA9IHVzZXJUZW1wbGF0ZXNbbmFtZV0uYmluZChfdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0aW5nW25hbWVdID0gX3RoaXMuX3RlbXBsYXRlc1tuYW1lXS5iaW5kKF90aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlcyA9IHRlbXBsYXRpbmc7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fY3JlYXRlRWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0ZW1wbGF0aW5nID0gdGhpcy5fdGVtcGxhdGVzO1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBjb25maWcgPSBfYS5jb25maWcsIGlzU2VsZWN0T25lRWxlbWVudCA9IF9hLl9pc1NlbGVjdE9uZUVsZW1lbnQ7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IGNvbmZpZy5wb3NpdGlvbiwgY2xhc3NOYW1lcyA9IGNvbmZpZy5jbGFzc05hbWVzO1xuICAgICAgICB2YXIgZWxlbWVudFR5cGUgPSB0aGlzLl9lbGVtZW50VHlwZTtcbiAgICAgICAgdGhpcy5jb250YWluZXJPdXRlciA9IG5ldyBDb250YWluZXIoe1xuICAgICAgICAgICAgZWxlbWVudDogdGVtcGxhdGluZy5jb250YWluZXJPdXRlcihjb25maWcsIHRoaXMuX2RpcmVjdGlvbiwgdGhpcy5faXNTZWxlY3RFbGVtZW50LCBpc1NlbGVjdE9uZUVsZW1lbnQsIGNvbmZpZy5zZWFyY2hFbmFibGVkLCBlbGVtZW50VHlwZSwgY29uZmlnLmxhYmVsSWQpLFxuICAgICAgICAgICAgY2xhc3NOYW1lczogY2xhc3NOYW1lcyxcbiAgICAgICAgICAgIHR5cGU6IGVsZW1lbnRUeXBlLFxuICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb250YWluZXJJbm5lciA9IG5ldyBDb250YWluZXIoe1xuICAgICAgICAgICAgZWxlbWVudDogdGVtcGxhdGluZy5jb250YWluZXJJbm5lcihjb25maWcpLFxuICAgICAgICAgICAgY2xhc3NOYW1lczogY2xhc3NOYW1lcyxcbiAgICAgICAgICAgIHR5cGU6IGVsZW1lbnRUeXBlLFxuICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbnB1dCA9IG5ldyBJbnB1dCh7XG4gICAgICAgICAgICBlbGVtZW50OiB0ZW1wbGF0aW5nLmlucHV0KGNvbmZpZywgdGhpcy5fcGxhY2Vob2xkZXJWYWx1ZSksXG4gICAgICAgICAgICBjbGFzc05hbWVzOiBjbGFzc05hbWVzLFxuICAgICAgICAgICAgdHlwZTogZWxlbWVudFR5cGUsXG4gICAgICAgICAgICBwcmV2ZW50UGFzdGU6ICFjb25maWcucGFzdGUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNob2ljZUxpc3QgPSBuZXcgTGlzdCh7XG4gICAgICAgICAgICBlbGVtZW50OiB0ZW1wbGF0aW5nLmNob2ljZUxpc3QoY29uZmlnLCBpc1NlbGVjdE9uZUVsZW1lbnQpLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pdGVtTGlzdCA9IG5ldyBMaXN0KHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRlbXBsYXRpbmcuaXRlbUxpc3QoY29uZmlnLCBpc1NlbGVjdE9uZUVsZW1lbnQpLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kcm9wZG93biA9IG5ldyBEcm9wZG93bih7XG4gICAgICAgICAgICBlbGVtZW50OiB0ZW1wbGF0aW5nLmRyb3Bkb3duKGNvbmZpZyksXG4gICAgICAgICAgICBjbGFzc05hbWVzOiBjbGFzc05hbWVzLFxuICAgICAgICAgICAgdHlwZTogZWxlbWVudFR5cGUsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2NyZWF0ZVN0cnVjdHVyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgY29udGFpbmVySW5uZXIgPSBfYS5jb250YWluZXJJbm5lciwgY29udGFpbmVyT3V0ZXIgPSBfYS5jb250YWluZXJPdXRlciwgcGFzc2VkRWxlbWVudCA9IF9hLnBhc3NlZEVsZW1lbnQ7XG4gICAgICAgIHZhciBkcm9wZG93bkVsZW1lbnQgPSB0aGlzLmRyb3Bkb3duLmVsZW1lbnQ7XG4gICAgICAgIC8vIEhpZGUgb3JpZ2luYWwgZWxlbWVudFxuICAgICAgICBwYXNzZWRFbGVtZW50LmNvbmNlYWwoKTtcbiAgICAgICAgLy8gV3JhcCBpbnB1dCBpbiBjb250YWluZXIgcHJlc2VydmluZyBET00gb3JkZXJpbmdcbiAgICAgICAgY29udGFpbmVySW5uZXIud3JhcChwYXNzZWRFbGVtZW50LmVsZW1lbnQpO1xuICAgICAgICAvLyBXcmFwcGVyIGlubmVyIGNvbnRhaW5lciB3aXRoIG91dGVyIGNvbnRhaW5lclxuICAgICAgICBjb250YWluZXJPdXRlci53cmFwKGNvbnRhaW5lcklubmVyLmVsZW1lbnQpO1xuICAgICAgICBpZiAodGhpcy5faXNTZWxlY3RPbmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnBsYWNlaG9sZGVyID0gdGhpcy5jb25maWcuc2VhcmNoUGxhY2Vob2xkZXJWYWx1ZSB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wbGFjZWhvbGRlclZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5wbGFjZWhvbGRlciA9IHRoaXMuX3BsYWNlaG9sZGVyVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlucHV0LnNldFdpZHRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyT3V0ZXIuZWxlbWVudC5hcHBlbmRDaGlsZChjb250YWluZXJJbm5lci5lbGVtZW50KTtcbiAgICAgICAgY29udGFpbmVyT3V0ZXIuZWxlbWVudC5hcHBlbmRDaGlsZChkcm9wZG93bkVsZW1lbnQpO1xuICAgICAgICBjb250YWluZXJJbm5lci5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaXRlbUxpc3QuZWxlbWVudCk7XG4gICAgICAgIGRyb3Bkb3duRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNob2ljZUxpc3QuZWxlbWVudCk7XG4gICAgICAgIGlmICghdGhpcy5faXNTZWxlY3RPbmVFbGVtZW50KSB7XG4gICAgICAgICAgICBjb250YWluZXJJbm5lci5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaW5wdXQuZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jb25maWcuc2VhcmNoRW5hYmxlZCkge1xuICAgICAgICAgICAgZHJvcGRvd25FbGVtZW50Lmluc2VydEJlZm9yZSh0aGlzLmlucHV0LmVsZW1lbnQsIGRyb3Bkb3duRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9oaWdobGlnaHRQb3NpdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX2lzU2VhcmNoaW5nID0gZmFsc2U7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5faW5pdFN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9zdG9yZS5zdWJzY3JpYmUodGhpcy5fcmVuZGVyKS53aXRoVHhuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9hZGRQcmVkZWZpbmVkQ2hvaWNlcyhfdGhpcy5fcHJlc2V0Q2hvaWNlcywgX3RoaXMuX2lzU2VsZWN0T25lRWxlbWVudCAmJiAhX3RoaXMuX2hhc05vbkNob2ljZVBsYWNlaG9sZGVyLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMuX3N0b3JlLmNob2ljZXMubGVuZ3RoIHx8ICh0aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQgJiYgdGhpcy5faGFzTm9uQ2hvaWNlUGxhY2Vob2xkZXIpKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2FkZFByZWRlZmluZWRDaG9pY2VzID0gZnVuY3Rpb24gKGNob2ljZXMsIHNlbGVjdEZpcnN0T3B0aW9uLCB3aXRoRXZlbnRzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChzZWxlY3RGaXJzdE9wdGlvbiA9PT0gdm9pZCAwKSB7IHNlbGVjdEZpcnN0T3B0aW9uID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHdpdGhFdmVudHMgPT09IHZvaWQgMCkgeyB3aXRoRXZlbnRzID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoc2VsZWN0Rmlyc3RPcHRpb24pIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgdGhlcmUgaXMgYSBzZWxlY3RlZCBjaG9pY2UgYWxyZWFkeSBvciB0aGUgY2hvaWNlIGlzIG5vdCB0aGUgZmlyc3QgaW5cbiAgICAgICAgICAgICAqIHRoZSBhcnJheSwgYWRkIGVhY2ggY2hvaWNlIG5vcm1hbGx5LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIE90aGVyd2lzZSB3ZSBwcmUtc2VsZWN0IHRoZSBmaXJzdCBlbmFibGVkIGNob2ljZSBpbiB0aGUgYXJyYXkgKFwic2VsZWN0LW9uZVwiIG9ubHkpXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBub1NlbGVjdGVkQ2hvaWNlcyA9IGNob2ljZXMuZmluZEluZGV4KGZ1bmN0aW9uIChjaG9pY2UpIHsgcmV0dXJuIGNob2ljZS5zZWxlY3RlZDsgfSkgPT09IC0xO1xuICAgICAgICAgICAgaWYgKG5vU2VsZWN0ZWRDaG9pY2VzKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlcy5zb21lKGZ1bmN0aW9uIChjaG9pY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNob2ljZS5kaXNhYmxlZCB8fCAnY2hvaWNlcycgaW4gY2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hvaWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpZiAoJ2Nob2ljZXMnIGluIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2lzU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fYWRkR3JvdXAoaXRlbSwgd2l0aEV2ZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2FkZENob2ljZShpdGVtLCB3aXRoRXZlbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fZmluZEFuZFNlbGVjdENob2ljZUJ5VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIHVzZXJUcmlnZ2VyZWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHVzZXJUcmlnZ2VyZWQgPT09IHZvaWQgMCkgeyB1c2VyVHJpZ2dlcmVkID0gZmFsc2U7IH1cbiAgICAgICAgLy8gQ2hlY2sgJ3ZhbHVlJyBwcm9wZXJ0eSBleGlzdHMgYW5kIHRoZSBjaG9pY2UgaXNuJ3QgYWxyZWFkeSBzZWxlY3RlZFxuICAgICAgICB2YXIgZm91bmRDaG9pY2UgPSB0aGlzLl9zdG9yZS5jaG9pY2VzLmZpbmQoZnVuY3Rpb24gKGNob2ljZSkgeyByZXR1cm4gX3RoaXMuY29uZmlnLnZhbHVlQ29tcGFyZXIoY2hvaWNlLnZhbHVlLCB2YWx1ZSk7IH0pO1xuICAgICAgICBpZiAoZm91bmRDaG9pY2UgJiYgIWZvdW5kQ2hvaWNlLmRpc2FibGVkICYmICFmb3VuZENob2ljZS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkSXRlbShmb3VuZENob2ljZSwgdHJ1ZSwgdXNlclRyaWdnZXJlZCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fZ2VuZXJhdGVQbGFjZWhvbGRlclZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICAgIGlmICghY29uZmlnLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faGFzTm9uQ2hvaWNlUGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25maWcucGxhY2Vob2xkZXJWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faXNTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXJPcHRpb24gPSB0aGlzLnBhc3NlZEVsZW1lbnQucGxhY2Vob2xkZXJPcHRpb247XG4gICAgICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXJPcHRpb24gPyBwbGFjZWhvbGRlck9wdGlvbi50ZXh0IDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl93YXJuQ2hvaWNlc0luaXRGYWlsZWQgPSBmdW5jdGlvbiAoY2FsbGVyKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5zaWxlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGlzZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJcIi5jb25jYXQoY2FsbGVyLCBcIiBjYWxsZWQgb24gYSBub24taW5pdGlhbGlzZWQgaW5zdGFuY2Ugb2YgQ2hvaWNlc1wiKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXRoaXMuaW5pdGlhbGlzZWRPSykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlwiLmNvbmNhdChjYWxsZXIsIFwiIGNhbGxlZCBmb3IgYW4gZWxlbWVudCB3aGljaCBoYXMgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIENob2ljZXMgaW5pdGlhbGlzZWQgb24gaXRcIikpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnZlcnNpb24gPSAnMTEuMC4zJztcbiAgICByZXR1cm4gQ2hvaWNlcztcbn0oKSk7XG5cbmV4cG9ydCB7IENob2ljZXMgYXMgZGVmYXVsdCB9O1xuIiwgImltcG9ydCBDaG9pY2VzIGZyb20gJ2Nob2ljZXMuanMnXG5pbXBvcnQgeyBMYWN1bmFXZWJQS0kgfSBmcm9tICd3ZWItcGtpJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGFjdW5hQ2VydGlmaWNhdGVTZWxlY3Qoe1xuICAgIHN0YXRlLFxuICAgIHdlYlBraVNpZ25hdHVyZSxcbiAgICBkZWJ1ZyA9IGZhbHNlLFxuICAgIGNhblNlbGVjdFBsYWNlaG9sZGVyLFxuICAgIGlzSHRtbEFsbG93ZWQsXG4gICAgZ2V0T3B0aW9uTGFiZWxVc2luZyxcbiAgICBnZXRPcHRpb25MYWJlbHNVc2luZyxcbiAgICBnZXRPcHRpb25zVXNpbmcsXG4gICAgZ2V0U2VhcmNoUmVzdWx0c1VzaW5nLFxuICAgIGlzQXV0b2ZvY3VzZWQsXG4gICAgaXNNdWx0aXBsZSxcbiAgICBpc1NlYXJjaGFibGUsXG4gICAgaGFzRHluYW1pY09wdGlvbnMsXG4gICAgaGFzRHluYW1pY1NlYXJjaFJlc3VsdHMsXG4gICAgbG9hZGluZ01lc3NhZ2UsXG4gICAgbWF4SXRlbXMsXG4gICAgbWF4SXRlbXNNZXNzYWdlLFxuICAgIG5vU2VhcmNoUmVzdWx0c01lc3NhZ2UsXG4gICAgb3B0aW9ucyxcbiAgICBvcHRpb25zTGltaXQsXG4gICAgcGxhY2Vob2xkZXIsXG4gICAgcG9zaXRpb24sXG4gICAgc2VhcmNoUHJvbXB0LFxuICAgIHNlYXJjaGFibGVPcHRpb25GaWVsZHMsXG4gICAgc3RhdGVQYXRoLFxuICAgIG9uV2ViUGtpTm90SW5zdGFsbGVkVXNpbmcsXG59KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaXNTZWFyY2hpbmc6IGZhbHNlLFxuXG4gICAgICAgIHNlbGVjdGVkT3B0aW9uczogW10sXG5cbiAgICAgICAgaXNTdGF0ZUJlaW5nVXBkYXRlZDogZmFsc2UsXG5cbiAgICAgICAgc3RhdGUsXG5cbiAgICAgICAgY2VydGlmaWNhdGVzOiBbXSxcblxuICAgICAgICBkZWJ1ZyxcblxuICAgICAgICBzZWxlY3RJbnB1dDogbnVsbCxcblxuICAgICAgICAvKiogQHR5cGUge0xhY3VuYVdlYlBLSX0gKi9cbiAgICAgICAgcGtpOiBudWxsLFxuXG4gICAgICAgIHNlbGVjdDogbnVsbCxcblxuICAgICAgICB0b2tlbjogbnVsbCxcblxuICAgICAgICBibG9ja1VJRWxlbWVudDogbnVsbCxcblxuICAgICAgICBpbml0OiBhc3luYyBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYmxvY2tVSUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGluZ0Jsb2NrVUknKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3QgPSBuZXcgQ2hvaWNlcyh0aGlzLiRyZWZzLmlucHV0LCB7XG4gICAgICAgICAgICAgICAgYWxsb3dIVE1MOiBpc0h0bWxBbGxvd2VkLFxuICAgICAgICAgICAgICAgIGR1cGxpY2F0ZUl0ZW1zQWxsb3dlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdFRleHQ6ICcnLFxuICAgICAgICAgICAgICAgIGxvYWRpbmdUZXh0OiBsb2FkaW5nTWVzc2FnZSxcbiAgICAgICAgICAgICAgICBtYXhJdGVtQ291bnQ6IG1heEl0ZW1zID8/IC0xLFxuICAgICAgICAgICAgICAgIG1heEl0ZW1UZXh0OiAobWF4SXRlbUNvdW50KSA9PlxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucGx1cmFsaXplKG1heEl0ZW1zTWVzc2FnZSwgbWF4SXRlbUNvdW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogbWF4SXRlbUNvdW50LFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBub0Nob2ljZXNUZXh0OiBzZWFyY2hQcm9tcHQsXG4gICAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogbm9TZWFyY2hSZXN1bHRzTWVzc2FnZSxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlclZhbHVlOiBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24gPz8gJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJlbW92ZUl0ZW1CdXR0b246IGNhblNlbGVjdFBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgICAgIHJlbmRlckNob2ljZUxpbWl0OiBvcHRpb25zTGltaXQsXG4gICAgICAgICAgICAgICAgc2VhcmNoRW5hYmxlZDogaXNTZWFyY2hhYmxlLFxuICAgICAgICAgICAgICAgIHNlYXJjaEZpZWxkczogc2VhcmNoYWJsZU9wdGlvbkZpZWxkcyA/PyBbJ2xhYmVsJ10sXG4gICAgICAgICAgICAgICAgc2VhcmNoUGxhY2Vob2xkZXJWYWx1ZTogc2VhcmNoUHJvbXB0LFxuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdExpbWl0OiBvcHRpb25zTGltaXQsXG4gICAgICAgICAgICAgICAgc2hvdWxkU29ydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VhcmNoRmxvb3I6IGhhc0R5bmFtaWNTZWFyY2hSZXN1bHRzID8gMCA6IDEsXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hDaG9pY2VzKHsgd2l0aEluaXRpYWxPcHRpb25zOiB0cnVlIH0pXG5cbiAgICAgICAgICAgIGlmICghW251bGwsIHVuZGVmaW5lZCwgJyddLmluY2x1ZGVzKHRoaXMuc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Quc2V0Q2hvaWNlQnlWYWx1ZSh0aGlzLmZvcm1hdFN0YXRlKHRoaXMuc3RhdGUpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hQbGFjZWhvbGRlcigpXG5cbiAgICAgICAgICAgIGlmIChpc0F1dG9mb2N1c2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Quc2hvd0Ryb3Bkb3duKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy4kcmVmcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoUGxhY2Vob2xkZXIoKVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZUJlaW5nVXBkYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlzU3RhdGVCZWluZ1VwZGF0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuc2VsZWN0LmdldFZhbHVlKHRydWUpID8/IG51bGxcbiAgICAgICAgICAgICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiAodGhpcy5pc1N0YXRlQmVpbmdVcGRhdGVkID0gZmFsc2UpKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3N0YXRlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoUGxhY2Vob2xkZXIoKVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZUJlaW5nVXBkYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hDaG9pY2VzKHtcbiAgICAgICAgICAgICAgICAgICAgd2l0aEluaXRpYWxPcHRpb25zOiAhaGFzRHluYW1pY09wdGlvbnMsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHRoaXMubG9nKCdJbml0aWFsaXppbmcgV2ViIFBLSSBjb21wb25lbnQgLi4uJywgc3RhdGUpO1xuXG4gICAgICAgICAgICB0aGlzLnNob3dMb2FkaW5nQmxvY2tVSSgpO1xuXG4gICAgICAgICAgICB0aGlzLnBraSA9IG5ldyBMYWN1bmFXZWJQS0kod2ViUGtpU2lnbmF0dXJlKTtcblxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wa2kuaW5pdCh7XG4gICAgICAgICAgICAgICAgcmVhZHk6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wa2kubGlzdENlcnRpZmljYXRlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2Vzcyhhc3luYyAoY2VydHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlcnRpZmljYXRlcyA9IGNlcnRzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QuY2xlYXJDaG9pY2VzKClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc2VsZWN0LnNldENob2ljZXMoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbG9hZGluZ01lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ0dldCBvcHRpb25zIGZyb20gY2VydGlmaWNhdGVzIC4uLicsIHN0YXRlUGF0aCwgY2VydHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBhd2FpdCB0aGlzLiR3aXJlLmdlbmVyYXRlU2VsZWN0T3B0aW9uc0Zyb21DZXJ0aWZpY2F0ZXMoc3RhdGVQYXRoLCBjZXJ0cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENob2ljZXMob3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkxvYWRpbmdCbG9ja1VJKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5vdEluc3RhbGxlZDogYXN5bmMgKHN0YXR1cywgbWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnV2ViIFBLSSBub3QgaW5zdGFsbGVkLicpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuTG9hZGluZ0Jsb2NrVUkoKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFsbFVybDogdGhpcy5wa2kuX2luc3RhbGxVcmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBicmFuZDogdGhpcy5wa2kuYnJhbmQgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBqc2xpYjogdGhpcy5wa2kuX2pzbGliVmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblVybDogd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBvbldlYlBraU5vdEluc3RhbGxlZFVzaW5nKHN0YXR1cywgbWVzc2FnZSwgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRFcnJvcjogKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdBbiBlcnJvciBoYXMgb2NjdXJyZWQ6ICcgKyBlcnJvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5Mb2FkaW5nQmxvY2tVSSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiR3aXJlLm9uKCdzaWduUEFkRVMnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gZXZlbnQudG9rZW47XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1NpZ25pbmcgUEFkRVMgLi4uJywgdGhpcy5zdGF0ZSwgdGhpcy50b2tlbiwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2lnblBBZEVTKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbG9nKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhhcmdzKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2lnblBBZEVTOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnU2lnbmluZyBQQWRFUyAuLi4nLCB0aGlzLnN0YXRlKTtcblxuICAgICAgICAgICAgLy9UT0RPOiBBZGQgbG9hZGluZyBzdGF0ZVxuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBraS5zaWduV2l0aFJlc3RQa2koe1xuICAgICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICAgIHRodW1icHJpbnQ6IHRoaXMuc3RhdGVcbiAgICAgICAgICAgIH0pLnN1Y2Nlc3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIE9uY2UgdGhlIG9wZXJhdGlvbiBpcyBjb21wbGV0ZWQsIHdlIHN1Ym1pdCB0aGUgZm9ybS5cbiAgICAgICAgICAgICAgICB0aGlzLiR3aXJlLmRpc3BhdGNoKCdzaWduZWRQQWRFUycsIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIHRodW1icHJpbnQ6IHRoaXMuc3RhdGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0LmRlc3Ryb3koKVxuICAgICAgICAgICAgdGhpcy5zZWxlY3QgPSBudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVmcmVzaENob2ljZXM6IGFzeW5jIGZ1bmN0aW9uIChjb25maWcgPSB7fSkge1xuICAgICAgICAgICAgY29uc3QgY2hvaWNlcyA9IGF3YWl0IHRoaXMuZ2V0Q2hvaWNlcyhjb25maWcpXG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zZWxlY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3QuY2xlYXJTdG9yZSgpXG5cbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFBsYWNlaG9sZGVyKClcblxuICAgICAgICAgICAgdGhpcy5zZXRDaG9pY2VzKGNob2ljZXMpXG5cbiAgICAgICAgICAgIGlmICghW251bGwsIHVuZGVmaW5lZCwgJyddLmluY2x1ZGVzKHRoaXMuc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Quc2V0Q2hvaWNlQnlWYWx1ZSh0aGlzLmZvcm1hdFN0YXRlKHRoaXMuc3RhdGUpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldENob2ljZXM6IGZ1bmN0aW9uIChjaG9pY2VzKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5zZXRDaG9pY2VzKGNob2ljZXMsICd2YWx1ZScsICdsYWJlbCcsIHRydWUpXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0Q2hvaWNlczogYXN5bmMgZnVuY3Rpb24gKGNvbmZpZyA9IHt9KSB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ09wdGlvbnMgPSBhd2FpdCB0aGlzLmdldEV4aXN0aW5nT3B0aW9ucyhjb25maWcpXG5cbiAgICAgICAgICAgIHJldHVybiBleGlzdGluZ09wdGlvbnMuY29uY2F0KFxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0TWlzc2luZ09wdGlvbnMoZXhpc3RpbmdPcHRpb25zKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRFeGlzdGluZ09wdGlvbnM6IGFzeW5jIGZ1bmN0aW9uICh7IHNlYXJjaCwgd2l0aEluaXRpYWxPcHRpb25zIH0pIHtcbiAgICAgICAgICAgIGlmICh3aXRoSW5pdGlhbE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uc1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcmVzdWx0cyA9IFtdXG5cbiAgICAgICAgICAgIGlmIChzZWFyY2ggIT09ICcnICYmIHNlYXJjaCAhPT0gbnVsbCAmJiBzZWFyY2ggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBhd2FpdCBnZXRTZWFyY2hSZXN1bHRzVXNpbmcoc2VhcmNoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gYXdhaXQgZ2V0T3B0aW9uc1VzaW5nKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHMubWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmNob2ljZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmNob2ljZXMgPSByZXN1bHQuY2hvaWNlcy5tYXAoKGdyb3VwZWRPcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwZWRPcHRpb24uc2VsZWN0ZWQgPSBBcnJheS5pc0FycmF5KHRoaXMuc3RhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmluY2x1ZGVzKGdyb3VwZWRPcHRpb24udmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnN0YXRlID09PSBncm91cGVkT3B0aW9uLnZhbHVlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBncm91cGVkT3B0aW9uXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdC5zZWxlY3RlZCA9IEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmluY2x1ZGVzKHJlc3VsdC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnN0YXRlID09PSByZXN1bHQudmFsdWVcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVmcmVzaFBsYWNlaG9sZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaXNNdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5fcmVuZGVySXRlbXMoKVxuXG4gICAgICAgICAgICBpZiAoIVtudWxsLCB1bmRlZmluZWQsICcnXS5pbmNsdWRlcyh0aGlzLnN0YXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuY2hvaWNlc19fbGlzdC0tc2luZ2xlJykuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cImNob2ljZXNfX3BsYWNlaG9sZGVyIGNob2ljZXNfX2l0ZW1cIj4ke3BsYWNlaG9sZGVyID8/ICcnXG4gICAgICAgICAgICAgICAgfTwvZGl2PmBcbiAgICAgICAgfSxcblxuICAgICAgICBmb3JtYXRTdGF0ZTogZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICBpZiAoaXNNdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoc3RhdGUgPz8gW10pLm1hcCgoaXRlbSkgPT4gaXRlbT8udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlPy50b1N0cmluZygpXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0TWlzc2luZ09wdGlvbnM6IGFzeW5jIGZ1bmN0aW9uIChleGlzdGluZ09wdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuZm9ybWF0U3RhdGUodGhpcy5zdGF0ZSlcblxuICAgICAgICAgICAgaWYgKFtudWxsLCB1bmRlZmluZWQsICcnLCBbXSwge31dLmluY2x1ZGVzKHN0YXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7fVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ09wdGlvblZhbHVlcyA9IG5ldyBTZXQoKVxuXG4gICAgICAgICAgICBleGlzdGluZ09wdGlvbnMuZm9yRWFjaCgoZXhpc3RpbmdPcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdPcHRpb24uY2hvaWNlcykge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ09wdGlvbi5jaG9pY2VzLmZvckVhY2goKGdyb3VwZWRFeGlzdGluZ09wdGlvbikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nT3B0aW9uVmFsdWVzLmFkZChncm91cGVkRXhpc3RpbmdPcHRpb24udmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdPcHRpb25WYWx1ZXMuYWRkKGV4aXN0aW5nT3B0aW9uLnZhbHVlKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKGlzTXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuZXZlcnkoKHZhbHVlKSA9PiBleGlzdGluZ09wdGlvblZhbHVlcy5oYXModmFsdWUpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge31cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGF3YWl0IGdldE9wdGlvbkxhYmVsc1VzaW5nKCkpXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbikgPT4gIWV4aXN0aW5nT3B0aW9uVmFsdWVzLmhhcyhvcHRpb24udmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAubWFwKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWVcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdPcHRpb25WYWx1ZXMuaGFzKHN0YXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBleGlzdGluZ09wdGlvblZhbHVlc1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGF3YWl0IGdldE9wdGlvbkxhYmVsVXNpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHN0YXRlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dMb2FkaW5nQmxvY2tVSTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYmxvY2tVSUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrVUlFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGlkZGVuTG9hZGluZ0Jsb2NrVUk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJsb2NrVUlFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja1VJRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ0EsUUFBSSxPQUFPLE9BQU8sMEJBQTBCLGFBQWE7QUFDeEQsYUFBTyx3QkFBd0I7QUFBQSxJQUNoQztBQU1BLFdBQU8sZUFBZTtBQUV0QixtQkFBZSxTQUFVLFNBQVM7QUFDakMsV0FBSyxVQUFVO0FBQ2YsV0FBSyxzQkFBc0I7QUFDM0IsV0FBSyxlQUFlO0FBQ3BCLFdBQUssU0FBUztBQUNkLFdBQUssUUFBUTtBQUNiLFdBQUssYUFBYTtB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Q04sUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLE1BQ1Q7QUFFRyxRQUFFLFVBQVU7QUFBQSxRQUNSLFdBQVcsQ0FBQztBQUFBLFFBQ1osYUFBYSxDQUFDO0FBQUEsUUFDZCxXQUFXLENBQUM7QUFBQSxRQUNaLFNBQVMsQ0FBQztBQUFBLFFBQ1YsV0FBVyxDQUFDO0FBQUEsUUFDWixRQUFRLENBQUM7QUFBQSxNQUNiO0FBR0EsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDMUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzdDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBR3pDLFFBQUUsUUFBUSxRQUFRLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDeEMsUUFBRSxRQUFRLFFBQVEsRUFBRSxZQUFZLElBQUksSUFBSTtBQUN4QyxRQUFFLFFBQVEsUUFBUSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQ3hDLFFBQUUsUUFBUSxRQUFRLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDeEMsUUFBRSxRQUFRLFFBQVEsRUFBRSxZQUFZLElBQUksSUFBSTtBQUN4QyxRQUFFLFFBQVEsUUFBUSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzdDLFFBQUUsUUFBUSxRQUFRLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDeEMsUUFBRSxRQUFRLFFBQVEsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUMxQyxRQUFFLFFBQVEsUUFBUSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxRQUFRLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDeEMsUUFBRSxRQUFRLFFBQVEsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUMxQyxRQUFFLFFBQVEsUUFBUSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxRQUFRLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDMUMsUUFBRSxRQUFRLFFBQVEsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUMxQyxRQUFFLFFBQVEsUUFBUSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxRQUFRLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDMUMsUUFBRSxRQUFRLFFBQVEsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUd2QyxRQUFFLFFBQVEsWUFBWSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxZQUFZLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDNUMsUUFBRSxRQUFRLFlBQVksRUFBRSxZQUFZLElBQUksSUFBSTtBQUM1QyxRQUFFLFFBQVEsWUFBWSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxZQUFZLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDNUMsUUFBRSxRQUFRLFlBQVksRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUNqRCxRQUFFLFFBQVEsWUFBWSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxZQUFZLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDOUMsUUFBRSxRQUFRLFlBQVksRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM5QyxRQUFFLFFBQVEsWUFBWSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxZQUFZLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDOUMsUUFBRSxRQUFRLFlBQVksRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM5QyxRQUFFLFFBQVEsWUFBWSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzlDLFFBQUUsUUFBUSxZQUFZLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDOUMsUUFBRSxRQUFRLFlBQVksRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM5QyxRQUFFLFFBQVEsWUFBWSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzlDLFFBQUUsUUFBUSxZQUFZLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFHM0MsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDMUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDL0MsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBR3pDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDMUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDMUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQy9DLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDMUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDMUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUd6QyxRQUFFLFFBQVEsT0FBTyxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQ3ZDLFFBQUUsUUFBUSxPQUFPLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDdkMsUUFBRSxRQUFRLE9BQU8sRUFBRSxZQUFZLElBQUksSUFBSTtBQUN2QyxRQUFFLFFBQVEsT0FBTyxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxPQUFPLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDdkMsUUFBRSxRQUFRLE9BQU8sRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUN6QyxRQUFFLFFBQVEsT0FBTyxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQ3ZDLFFBQUUsUUFBUSxPQUFPLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDekMsUUFBRSxRQUFRLE9BQU8sRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUN6QyxRQUFFLFFBQVEsT0FBTyxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQ3ZDLFFBQUUsUUFBUSxPQUFPLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDekMsUUFBRSxRQUFRLE9BQU8sRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUN6QyxRQUFFLFFBQVEsT0FBTyxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQ3pDLFFBQUUsUUFBUSxPQUFPLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDekMsUUFBRSxRQUFRLE9BQU8sRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUN6QyxRQUFFLFFBQVEsT0FBTyxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQ3pDLFFBQUUsUUFBUSxPQUFPLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFHdEMsUUFBRSxRQUFRLFVBQVksRUFBRSxZQUFZLE1BQU0sSUFBSSxFQUFFO0FBQ2hE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QVEsTUFBTSxxQkFBcUIsR0FDOUIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUMxRCxJQUFJLENBQUMsV0FBVztBQUNiLGlCQUFPLFdBQVc7QUFFbEIsaUJBQU87QUFBQSxRQUNYLENBQUM7QUFBQSxNQUNUO0FBRUEsVUFBSSxxQkFBcUIsSUFBSUEsTUFBSyxHQUFHO0FBQ2pDLGVBQU87QUFBQSxNQUNYO0FBRUEsYUFBTztBQUFBLFFBQ0g7QUFBQSxVQUNJLE9BQU8sTUFBTSxvQkFBb0I7QUFBQSxVQUNqQyxPQUFPQTtBQUFBLFVBQ1AsVUFBVTtBQUFBLFFBQ2Q7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLElBRUEsb0JBQW9CLFdBQVk7QUFDNUIsVUFBSSxLQUFLLGdCQUFnQjtBQUNyQixhQUFLLGVBQWUsTUFBTSxVQUFVO0FBQUEsTUFDeEM7QUFBQSxJQUNKO0FBQUEsSUFFQSxzQkFBc0IsV0FBWTtBQUM5QixVQUFJLEtBQUssZ0JBQWdCO0FBQ3JCLGFBQUssZUFBZSxNQUFNLFVBQVU7QUFBQSxNQUN4QztBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0o7IiwKICAibmFtZXMiOiBbImV4IiwgImkiLCAiYyIsICJzIiwgImNvbnRleHQiLCAiZCIsICJiIiwgIl9fYXNzaWduIiwgIkRyb3Bkb3duIiwgIkNvbnRhaW5lciIsICJJbnB1dCIsICJMaXN0IiwgIldyYXBwZWRFbGVtZW50IiwgIldyYXBwZWRJbnB1dCIsICJjaG9pY2VzIiwgIldyYXBwZWRTZWxlY3QiLCAiaXRlbSIsICJTdG9yZSIsICJyIiwgIm9iaiIsICJwYXRoIiwgIm5vcm0iLCAidmFsdWUiLCAic2NvcmUiLCAicGF0dGVybiIsICJyZXN1bHQiLCAiaXRlbSIsICJzZWFyY2hlcnMiLCAicXVlcnkiLCAiU2VhcmNoQnlGdXNlIiwgImFkZENob2ljZSIsICJDaG9pY2VzIiwgIml0ZW1zIiwgImNob2ljZXMiLCAib3B0aW9ucyIsICJjaG9pY2VzIiwgInNlYXJjaCIsICJzdGF0ZSJdCn0K
