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

// resources/js/index.js
var import_web_pki = __toESM(require_lacuna_web_pki(), 1);
function pkiSigner({
  state,
  webPkiSignature,
  debug = false,
  onReadCert,
  onSignData,
  onSignHash,
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
  livewireId,
  loadingMessage,
  maxItems,
  maxItemsMessage,
  noSearchResultsMessage,
  options,
  optionsLimit,
  placeholder,
  position,
  searchDebounce,
  searchingMessage,
  searchPrompt,
  searchableOptionFields,
  statePath,
  getOptionLabelByCertificateUsing
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
    init: async function() {
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
      if (hasDynamicOptions) {
        this.$refs.input.addEventListener("showDropdown", async () => {
          this.select.clearChoices();
          await this.select.setChoices([
            {
              label: loadingMessage,
              value: "",
              disabled: true
            }
          ]);
          await this.refreshChoices();
        });
      }
      if (hasDynamicSearchResults) {
        this.$refs.input.addEventListener("search", async (event) => {
          let search2 = event.detail.value?.trim();
          this.isSearching = true;
          this.select.clearChoices();
          await this.select.setChoices([
            {
              label: [null, void 0, ""].includes(search2) ? loadingMessage : searchingMessage,
              value: "",
              disabled: true
            }
          ]);
        });
        this.$refs.input.addEventListener(
          "search",
          Alpine.debounce(async (event) => {
            await this.refreshChoices({
              search: event.detail.value?.trim()
            });
            this.isSearching = false;
          }, searchDebounce)
        );
      }
      if (!isMultiple) {
        window.addEventListener(
          "filament-forms::select.refreshSelectedOptionLabel",
          async (event) => {
            if (event.detail.livewireId !== livewireId) {
              return;
            }
            if (event.detail.statePath !== statePath) {
              return;
            }
            await this.refreshChoices({
              withInitialOptions: false
            });
          }
        );
      }
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
          });
        },
        notInstalled: () => {
          this.log("Web PKI not installed.");
        },
        defaultError: (error) => {
          this.log("An error has occurred: " + error);
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
    }
  };
}
export {
  pkiSigner as default
};
/*! Bundled license information:

choices.js/public/assets/scripts/choices.mjs:
  (*! choices.js v11.0.3 | © 2024 Josh Johnson | https://github.com/jshjohnson/Choices#readme *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL3dlYi1wa2kvbGFjdW5hLXdlYi1wa2kuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2Nob2ljZXMuanMvcHVibGljL2Fzc2V0cy9zY3JpcHRzL2Nob2ljZXMubWpzIiwgIi4uL2pzL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBBZGQtb24gcGxhY2Vob2xkZXIgKElFIG9ubHkpIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmlmICh0eXBlb2Ygd2luZG93LmxhY3VuYVdlYlBLSUV4dGVuc2lvbiA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHR3aW5kb3cubGFjdW5hV2ViUEtJRXh0ZW5zaW9uID0gbnVsbDtcclxufVxyXG5cclxuXHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBDbGFzcyBkZWNsYXJhdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxud2luZG93LkxhY3VuYVdlYlBLSSA9IG51bGw7XHJcblxyXG5MYWN1bmFXZWJQS0kgPSBmdW5jdGlvbiAobGljZW5zZSkge1xyXG5cdHRoaXMubGljZW5zZSA9IG51bGw7XHJcblx0dGhpcy5kZWZhdWx0RmFpbENhbGxiYWNrID0gbnVsbDtcclxuXHR0aGlzLmFuZ3VsYXJTY29wZSA9IG51bGw7XHJcblx0dGhpcy5uZ1pvbmUgPSBudWxsO1xyXG5cdHRoaXMuYnJhbmQgPSBudWxsO1xyXG5cdHRoaXMucmVzdFBraVVybCA9IG51bGw7XHJcblx0dGhpcy51c2VEb21haW5OYXRpdmVQb29sID0gZmFsc2U7XHJcblx0dGhpcy5tb2JpbGVJbnRlZ3JhdGlvbk1vZGUgPSBudWxsO1xyXG5cdGlmIChsaWNlbnNlKSB7XHJcblx0XHR0aGlzLmxpY2Vuc2UgPSBsaWNlbnNlO1xyXG5cdH1cclxuXHJcblx0Ly8gY2hlY2sgZm9yIEpRdWVyeSBibG9ja1VJIHByZXNlbmNlIGNhdXNpbmcgbW9iaWxlIHRvdWNoIGJsb2NraW5nXHJcblx0aWYgKHRoaXMuaXNTdXBwb3J0ZWRNb2JpbGUgJiYgd2luZG93LiQgJiYgd2luZG93LiQuYmxvY2tVSSkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0d2luZG93LiQuYmxvY2tVSS5kZWZhdWx0cy5iaW5kRXZlbnRzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuX2xvZygnYmxvY2tVSSBiaW5kRXZlbnRzIGRpc2FibGVkJyk7XHJcblxyXG5cdFx0fSBjYXRjaCAoZXgpIHtcclxuXHRcdFx0dGhpcy5fbG9nKCdFcnJvciBkaXNhYmxpbmcgYmxvY2tVSSBiaW5kRXZlbnRzOiAnLCBleCk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuLy8gSW5qZWN0IGNsYXNzIHByb3RvdHlwZVxyXG5cclxuKGZ1bmN0aW9uICgkKSB7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gUHJvbWlzZSBzdWJjbGFzcyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICQuUHJvbWlzZSA9IGZ1bmN0aW9uIChhbmd1bGFyU2NvcGUsIG5nWm9uZSkge1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0NhbGxiYWNrID0gZnVuY3Rpb24oKSB7IH07XHJcbiAgICAgICAgdGhpcy5mYWlsQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYW5ndWxhclNjb3BlID0gYW5ndWxhclNjb3BlO1xyXG4gICAgICAgIHRoaXMubmdab25lID0gbmdab25lO1xyXG4gICAgfTtcclxuXHJcblx0JC5Qcm9taXNlLnByb3RvdHlwZS5zdWNjZXNzID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5zdWNjZXNzQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgJC5Qcm9taXNlLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCBhbnkgbGVnYWN5IGVycm9yIGNhbGxiYWNrIGNvbnZlcnRlZCB0byBhIGZhaWwgY2FsbGJhY2tcclxuICAgICAgICB0aGlzLmZhaWxDYWxsYmFjayA9IGZ1bmN0aW9uKGV4KSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGV4Lm1lc3NhZ2UsIGV4LmVycm9yLCBleC5vcmlnaW4sIGV4LmNvZGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgICQuUHJvbWlzZS5wcm90b3R5cGUuZmFpbCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuZmFpbENhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgICQuUHJvbWlzZS5wcm90b3R5cGUuX2ludm9rZVN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzdWx0LCBkZWxheSkge1xyXG4gICAgICAgIGlmIChkZWxheSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2ludm9rZVN1Y2Nlc3MocmVzdWx0KTtcclxuICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuc3VjY2Vzc0NhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHsgJC5fbG9nKCdTdWNjZXNzIGlnbm9yZWQgKG5vIGNhbGxiYWNrIHJlZ2lzdGVyZWQpJyk7IH07XHJcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJC5Qcm9taXNlLnByb3RvdHlwZS5faW52b2tlRXJyb3IgPSBmdW5jdGlvbiAoZXgsIGRlbGF5KSB7XHJcbiAgICAgICAgaWYgKGRlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5faW52b2tlRXJyb3IoZXgpO1xyXG4gICAgICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5mYWlsQ2FsbGJhY2sgfHwgZnVuY3Rpb24gKGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyAnV2ViIFBLSSBlcnJvciBvcmlnaW5hdGVkIGF0ICcgKyBleC5vcmlnaW4gKyAnOiAnICsgZXgubWVzc2FnZSArICdcXG4nICsgZXguY29tcGxldGUgKyAnXFxuY29kZTogJyArIGV4LmNvZGU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgXHRjYWxsYmFjayh7XHJcbiAgICAgICAgICAgIFx0XHR1c2VyTWVzc2FnZTogZXgudXNlck1lc3NhZ2UgfHwgZXgubWVzc2FnZSxcclxuICAgICAgICAgICAgXHRcdG1lc3NhZ2U6IGV4Lm1lc3NhZ2UsXHJcbiAgICAgICAgICAgIFx0XHRlcnJvcjogZXguY29tcGxldGUsXHJcbiAgICAgICAgICAgIFx0XHRvcmlnaW46IGV4Lm9yaWdpbixcclxuICAgICAgICAgICAgXHRcdGNvZGU6IGV4LmNvZGVcclxuICAgICAgICAgICAgXHR9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBodHRwczovL2NvZGVyd2FsbC5jb20vcC9uZ2lzbWEvc2FmZS1hcHBseS1pbi1hbmd1bGFyLWpzXHJcbiAgICAkLlByb21pc2UucHJvdG90eXBlLl9hcHBseSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICh0aGlzLmFuZ3VsYXJTY29wZSkge1xyXG4gICAgICAgICAgICB2YXIgcGhhc2UgPSB0aGlzLmFuZ3VsYXJTY29wZS4kcm9vdC4kJHBoYXNlO1xyXG4gICAgICAgICAgICBpZiAocGhhc2UgPT0gJyRhcHBseScgfHwgcGhhc2UgPT0gJyRkaWdlc3QnKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmd1bGFyU2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmdab25lKSB7XHJcbiAgICAgICAgXHR0aGlzLm5nWm9uZS5ydW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFx0XHRjYWxsYmFjaygpO1xyXG4gICAgICAgIFx0fSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBDb25zdGFudHMgLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0JC5faW5zdGFsbFVybCA9ICdodHRwczovL2dldC53ZWJwa2lwbHVnaW4uY29tLyc7XHJcblx0JC5fY2hyb21lRXh0ZW5zaW9uSWQgPSAnZGNuZ2VhZ21taGVnYWdpY3BjbXBpbmFva2xkZGNnb24nO1xyXG5cdCQuX2ZpcmVmb3hFeHRlbnNpb25JZCA9ICd3ZWJwa2ktYmV0YUBsYWN1bmFzb2Z0d2FyZS5jb20nO1xyXG5cdCQuX2VkZ2VFeHRlbnNpb25JZCA9ICduZWRlZWdkbWhsbm1ib2JvYWhjaGZwa21kbm5lbWFwZCc7XHJcblx0JC5fZWRnZUxlZ2FjeVByb2R1Y3RJZCA9ICdkMjc5OGE4NS05Njk4LTQyNWEtYWRkNy0zZGI3OWEzOWNhOGEnO1xyXG5cdCQuX2Nocm9tZUV4dGVuc2lvbkZpcnN0VmVyc2lvbldpdGhTZWxmVXBkYXRlID0gJzIuMC4yMCc7XHJcblx0JC5fanNsaWJWZXJzaW9uID0gJzIuMTYuMyc7XHJcblx0JC5fbW9iaWxlU3VwcG9ydGVkID0gJ3RydWUnID09PSAndHJ1ZSc7XHJcblx0JC5fYnVpbGRDaGFubmVsID0gJ3N0YWJsZSc7XHJcblxyXG5cdC8vIGxhdGVzdCBjb21wb25lbnRzIHZlcnNpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdCQuX2V4dGVuc2lvblJlcXVpcmVkVmVyc2lvbiA9ICcyLjE2LjAnO1xyXG5cdCQuX2Nocm9tZU5hdGl2ZVdpblJlcXVpcmVkVmVyc2lvbiA9ICcyLjEyLjMnO1xyXG5cdCQuX2Nocm9tZU5hdGl2ZUxpbnV4UmVxdWlyZWRWZXJzaW9uID0gJzIuMTMuMyc7XHJcblx0JC5fY2hyb21lTmF0aXZlTWFjUmVxdWlyZWRWZXJzaW9uID0gJzIuMTMuMyc7XHJcblx0JC5faWVBZGRvblJlcXVpcmVkVmVyc2lvbiA9ICcyLjkuMSc7XHJcblx0JC5fbW9iaWxlUmVxdWlyZWRWZXJzaW9uID0gJzMuMi4wJztcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICQuX2Nocm9tZUluc3RhbGxhdGlvblN0YXRlcyA9IHtcclxuICAgICAgICBJTlNUQUxMRUQ6IDAsXHJcbiAgICAgICAgRVhURU5TSU9OX05PVF9JTlNUQUxMRUQ6IDEsXHJcbiAgICAgICAgRVhURU5TSU9OX09VVERBVEVEOiAyLFxyXG4gICAgICAgIE5BVElWRV9OT1RfSU5TVEFMTEVEOiAzLFxyXG4gICAgICAgIE5BVElWRV9PVVREQVRFRDogNFxyXG4gICAgfTtcclxuXHJcbiAgICAkLl9jZXJ0S2V5VXNhZ2VzID0ge1xyXG4gICAgICAgIGNybFNpZ246IDIsXHJcbiAgICAgICAgZGF0YUVuY2lwaGVybWVudDogMTYsXHJcbiAgICAgICAgZGVjaXBoZXJPbmx5OiAzMjc2OCxcclxuICAgICAgICBkaWdpdGFsU2lnbmF0dXJlOiAxMjgsXHJcbiAgICAgICAgZW5jaXBoZXJPbmx5OiAxLFxyXG4gICAgICAgIGtleUFncmVlbWVudDogOCxcclxuICAgICAgICBrZXlDZXJ0U2lnbjogNCxcclxuICAgICAgICBrZXlFbmNpcGhlcm1lbnQ6IDMyLFxyXG4gICAgICAgIG5vblJlcHVkaWF0aW9uOiA2NFxyXG4gICAgfTtcclxuXHJcblx0JC5fY2VydEV4dGVuZGVkS2V5VXNhZ2VzID0ge1xyXG5cdFx0Y2xpZW50QXV0aDogMSxcclxuXHRcdHNlcnZlckF1dGg6IDIsXHJcblx0XHRjb2RlU2lnbmluZzogNCxcclxuXHRcdGVtYWlsUHJvdGVjdGlvbjogOCxcclxuXHRcdHRpbWVTdGFtcGluZzogMTYsXHJcblx0XHRvY3NwU2lnbmluZzogMzIsXHJcblx0XHRpcHNlY0VuZFN5c3RlbTogNjQsXHJcblx0XHRpcHNlY1R1bm5lbDogMTI4LFxyXG5cdFx0aXBzZWNVc2VyOiAyNTYsXHJcblx0XHRhbnk6IDUxMlxyXG5cdH07XHJcblxyXG5cdCQuYXBpVmVyc2lvbnMgPSB7XHJcblx0XHR2MV8wOiAnMS4wJyxcclxuXHRcdHYxXzE6ICcxLjEnLFxyXG5cdFx0djFfMjogJzEuMicsXHJcblx0XHR2MV8zOiAnMS4zJyxcclxuXHRcdHYxXzQ6ICcxLjQnLFxyXG5cdFx0djFfNF8xOiAnMS40LjEnLFxyXG5cdFx0djFfNTogJzEuNScsXHJcblx0XHR2MV81XzE6ICcxLjUuMScsXHJcblx0XHR2MV81XzI6ICcxLjUuMicsXHJcblx0XHR2MV82OiAnMS42LjAnLFxyXG5cdFx0djFfNl8xOiAnMS42LjEnLFxyXG5cdFx0djFfN18wOiAnMS43LjAnLFxyXG5cdFx0djFfN18yOiAnMS43LjInLFxyXG5cdFx0djFfOF8wOiAnMS44LjAnLFxyXG5cdFx0djFfOF8xOiAnMS44LjEnLFxyXG5cdFx0djFfOF8yOiAnMS44LjInLFxyXG5cdFx0djFfOV8wOiAnMS45LjAnLFxyXG5cdFx0bGF0ZXN0OiAnbGF0ZXN0J1xyXG5cdH07XHJcblxyXG4gICAgJC5fYXBpTWFwID0ge1xyXG4gICAgICAgIG5hdGl2ZVdpbjoge30sIFxyXG4gICAgICAgIG5hdGl2ZUxpbnV4OiB7fSxcclxuICAgICAgICBuYXRpdmVNYWM6IHt9LFxyXG4gICAgICAgIGllQWRkb246IHt9LFxyXG4gICAgICAgIGV4dGVuc2lvbjoge30sXHJcbiAgICAgICAgbW9iaWxlOiB7fVxyXG4gICAgfTtcclxuICAgIC8vIHN5bnRheDogYXBpX3ZlcnNpb246IHN1cHBvcnRlZF9zaW5jZV92ZXJzaW9uXHJcbiAgICAvLyBXaW5kb3dzXHJcbiAgICAkLl9hcGlNYXAubmF0aXZlV2luWyQuYXBpVmVyc2lvbnMudjFfMF0gPSAnMi4xLjAnO1xyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZVdpblskLmFwaVZlcnNpb25zLnYxXzFdID0gJzIuMy4wJztcclxuICAgICQuX2FwaU1hcC5uYXRpdmVXaW5bJC5hcGlWZXJzaW9ucy52MV8yXSA9ICcyLjQuMSc7XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlV2luWyQuYXBpVmVyc2lvbnMudjFfM10gPSAnMi41LjAnO1xyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZVdpblskLmFwaVZlcnNpb25zLnYxXzRdID0gJzIuNi4yJztcclxuXHQkLl9hcGlNYXAubmF0aXZlV2luWyQuYXBpVmVyc2lvbnMudjFfNF8xXSA9ICcyLjYuNSc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZVdpblskLmFwaVZlcnNpb25zLnYxXzVdID0gJzIuOC4wJztcclxuXHQkLl9hcGlNYXAubmF0aXZlV2luWyQuYXBpVmVyc2lvbnMudjFfNV8xXSA9ICcyLjguMSc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZVdpblskLmFwaVZlcnNpb25zLnYxXzVfMl0gPSAnMi45LjAnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVXaW5bJC5hcGlWZXJzaW9ucy52MV82XSA9ICcyLjEwLjAnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVXaW5bJC5hcGlWZXJzaW9ucy52MV82XzFdID0gJzIuMTAuMSc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZVdpblskLmFwaVZlcnNpb25zLnYxXzdfMF0gPSAnMi4xMS4wJztcclxuXHQkLl9hcGlNYXAubmF0aXZlV2luWyQuYXBpVmVyc2lvbnMudjFfN18yXSA9ICcyLjExLjAnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVXaW5bJC5hcGlWZXJzaW9ucy52MV84XzBdID0gJzIuMTIuMCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZVdpblskLmFwaVZlcnNpb25zLnYxXzhfMV0gPSAnMi4xMi4xJztcclxuXHQkLl9hcGlNYXAubmF0aXZlV2luWyQuYXBpVmVyc2lvbnMudjFfOF8yXSA9ICcyLjEyLjMnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVXaW5bJC5hcGlWZXJzaW9ucy52MV85XzBdID0gJzIuMTIuMyc7XHJcblxyXG4gICAgLy8gSUVcclxuICAgICQuX2FwaU1hcC5pZUFkZG9uWyQuYXBpVmVyc2lvbnMudjFfMF0gPSAnMi4wLjQnO1xyXG4gICAgJC5fYXBpTWFwLmllQWRkb25bJC5hcGlWZXJzaW9ucy52MV8xXSA9ICcyLjEuMSc7XHJcbiAgICAkLl9hcGlNYXAuaWVBZGRvblskLmFwaVZlcnNpb25zLnYxXzJdID0gJzIuMi40JztcclxuICAgICQuX2FwaU1hcC5pZUFkZG9uWyQuYXBpVmVyc2lvbnMudjFfM10gPSAnMi4zLjAnO1xyXG4gICAgJC5fYXBpTWFwLmllQWRkb25bJC5hcGlWZXJzaW9ucy52MV80XSA9ICcyLjQuMic7XHJcbiAgICAkLl9hcGlNYXAuaWVBZGRvblskLmFwaVZlcnNpb25zLnYxXzRfMV0gPSAnMi40LjUnO1xyXG5cdCQuX2FwaU1hcC5pZUFkZG9uWyQuYXBpVmVyc2lvbnMudjFfNV0gPSAnMi41LjAnO1xyXG5cdCQuX2FwaU1hcC5pZUFkZG9uWyQuYXBpVmVyc2lvbnMudjFfNV8xXSA9ICcyLjUuMic7XHJcblx0JC5fYXBpTWFwLmllQWRkb25bJC5hcGlWZXJzaW9ucy52MV81XzJdID0gJzIuNi4wJztcclxuXHQkLl9hcGlNYXAuaWVBZGRvblskLmFwaVZlcnNpb25zLnYxXzZdID0gJzIuNy4wJztcclxuXHQkLl9hcGlNYXAuaWVBZGRvblskLmFwaVZlcnNpb25zLnYxXzZfMV0gPSAnMi43LjInO1xyXG5cdCQuX2FwaU1hcC5pZUFkZG9uWyQuYXBpVmVyc2lvbnMudjFfN18wXSA9ICcyLjguMCc7XHJcblx0JC5fYXBpTWFwLmllQWRkb25bJC5hcGlWZXJzaW9ucy52MV83XzJdID0gJzIuOC4wJztcclxuXHQkLl9hcGlNYXAuaWVBZGRvblskLmFwaVZlcnNpb25zLnYxXzhfMF0gPSAnMi45LjAnO1xyXG5cdCQuX2FwaU1hcC5pZUFkZG9uWyQuYXBpVmVyc2lvbnMudjFfOF8xXSA9ICcyLjkuMSc7XHJcblx0JC5fYXBpTWFwLmllQWRkb25bJC5hcGlWZXJzaW9ucy52MV84XzJdID0gJzIuOS4xJztcclxuXHQkLl9hcGlNYXAuaWVBZGRvblskLmFwaVZlcnNpb25zLnYxXzlfMF0gPSAnMi45LjEnO1xyXG5cclxuICAgIC8vIExpbnV4XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlTGludXhbJC5hcGlWZXJzaW9ucy52MV8wXSA9ICcyLjAuMCc7XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlTGludXhbJC5hcGlWZXJzaW9ucy52MV8xXSA9ICcyLjQuMCc7XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlTGludXhbJC5hcGlWZXJzaW9ucy52MV8yXSA9ICcyLjYuMic7XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlTGludXhbJC5hcGlWZXJzaW9ucy52MV8zXSA9ICcyLjcuMCc7XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlTGludXhbJC5hcGlWZXJzaW9ucy52MV80XSA9ICcyLjcuNCc7XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlTGludXhbJC5hcGlWZXJzaW9ucy52MV80XzFdID0gJzIuNy40JztcclxuXHQkLl9hcGlNYXAubmF0aXZlTGludXhbJC5hcGlWZXJzaW9ucy52MV81XSA9ICcyLjkuMCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfNV8xXSA9ICcyLjkuMCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfNV8yXSA9ICcyLjkuNSc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfNl0gPSAnMi4xMC4wJztcclxuXHQkLl9hcGlNYXAubmF0aXZlTGludXhbJC5hcGlWZXJzaW9ucy52MV82XzFdID0gJzIuMTAuMCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfN18wXSA9ICcyLjEyLjAnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVMaW51eFskLmFwaVZlcnNpb25zLnYxXzdfMl0gPSAnMi4xMi4xJztcclxuXHQkLl9hcGlNYXAubmF0aXZlTGludXhbJC5hcGlWZXJzaW9ucy52MV84XzBdID0gJzIuMTMuMCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZUxpbnV4WyQuYXBpVmVyc2lvbnMudjFfOF8xXSA9ICcyLjEzLjEnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVMaW51eFskLmFwaVZlcnNpb25zLnYxXzhfMl0gPSAnMi4xMy4zJztcclxuXHQkLl9hcGlNYXAubmF0aXZlTGludXhbJC5hcGlWZXJzaW9ucy52MV85XzBdID0gJzIuMTMuMyc7XHJcblxyXG4gICAgLy8gTWFjXHJcbiAgICAkLl9hcGlNYXAubmF0aXZlTWFjWyQuYXBpVmVyc2lvbnMudjFfMF0gPSAnMi4zLjAnO1xyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZU1hY1skLmFwaVZlcnNpb25zLnYxXzFdID0gJzIuNC4wJztcclxuICAgICQuX2FwaU1hcC5uYXRpdmVNYWNbJC5hcGlWZXJzaW9ucy52MV8yXSA9ICcyLjYuMSc7XHJcbiAgICAkLl9hcGlNYXAubmF0aXZlTWFjWyQuYXBpVmVyc2lvbnMudjFfM10gPSAnMi43LjAnO1xyXG4gICAgJC5fYXBpTWFwLm5hdGl2ZU1hY1skLmFwaVZlcnNpb25zLnYxXzRdID0gJzIuNy40JztcclxuICAgICQuX2FwaU1hcC5uYXRpdmVNYWNbJC5hcGlWZXJzaW9ucy52MV80XzFdID0gJzIuNy40JztcclxuXHQkLl9hcGlNYXAubmF0aXZlTWFjWyQuYXBpVmVyc2lvbnMudjFfNV0gPSAnMi45LjAnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVNYWNbJC5hcGlWZXJzaW9ucy52MV81XzFdID0gJzIuOS4wJztcclxuXHQkLl9hcGlNYXAubmF0aXZlTWFjWyQuYXBpVmVyc2lvbnMudjFfNV8yXSA9ICcyLjkuNSc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZU1hY1skLmFwaVZlcnNpb25zLnYxXzZdID0gJzIuMTAuMCc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZU1hY1skLmFwaVZlcnNpb25zLnYxXzZfMV0gPSAnMi4xMC4wJztcclxuXHQkLl9hcGlNYXAubmF0aXZlTWFjWyQuYXBpVmVyc2lvbnMudjFfN18wXSA9ICcyLjEyLjAnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVNYWNbJC5hcGlWZXJzaW9ucy52MV83XzJdID0gJzIuMTIuMSc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZU1hY1skLmFwaVZlcnNpb25zLnYxXzhfMF0gPSAnMi4xMy4wJztcclxuXHQkLl9hcGlNYXAubmF0aXZlTWFjWyQuYXBpVmVyc2lvbnMudjFfOF8xXSA9ICcyLjEzLjEnO1xyXG5cdCQuX2FwaU1hcC5uYXRpdmVNYWNbJC5hcGlWZXJzaW9ucy52MV84XzJdID0gJzIuMTMuMyc7XHJcblx0JC5fYXBpTWFwLm5hdGl2ZU1hY1skLmFwaVZlcnNpb25zLnYxXzlfMF0gPSAnMi4xMy4zJztcclxuXHJcbiAgICAvLyBXZWJFeHRlbnNpb25cclxuICAgICQuX2FwaU1hcC5leHRlbnNpb25bJC5hcGlWZXJzaW9ucy52MV8wXSA9ICcyLjMuMic7XHJcbiAgICAkLl9hcGlNYXAuZXh0ZW5zaW9uWyQuYXBpVmVyc2lvbnMudjFfMV0gPSAnMi43LjAnO1xyXG4gICAgJC5fYXBpTWFwLmV4dGVuc2lvblskLmFwaVZlcnNpb25zLnYxXzJdID0gJzIuOS4xJztcclxuICAgICQuX2FwaU1hcC5leHRlbnNpb25bJC5hcGlWZXJzaW9ucy52MV8zXSA9ICcyLjEwLjEnO1xyXG4gICAgJC5fYXBpTWFwLmV4dGVuc2lvblskLmFwaVZlcnNpb25zLnYxXzRdID0gJzIuMTEuNyc7XHJcbiAgICAkLl9hcGlNYXAuZXh0ZW5zaW9uWyQuYXBpVmVyc2lvbnMudjFfNF8xXSA9ICcyLjExLjcnO1xyXG5cdCQuX2FwaU1hcC5leHRlbnNpb25bJC5hcGlWZXJzaW9ucy52MV81XSA9ICcyLjEzLjAnO1xyXG5cdCQuX2FwaU1hcC5leHRlbnNpb25bJC5hcGlWZXJzaW9ucy52MV81XzFdID0gJzIuMTMuMCc7XHJcblx0JC5fYXBpTWFwLmV4dGVuc2lvblskLmFwaVZlcnNpb25zLnYxXzVfMl0gPSAnMi4xNC4yJztcclxuXHQkLl9hcGlNYXAuZXh0ZW5zaW9uWyQuYXBpVmVyc2lvbnMudjFfNl0gPSAnMi4xNS4wJztcclxuXHQkLl9hcGlNYXAuZXh0ZW5zaW9uWyQuYXBpVmVyc2lvbnMudjFfNl8xXSA9ICcyLjE1LjAnO1xyXG5cdCQuX2FwaU1hcC5leHRlbnNpb25bJC5hcGlWZXJzaW9ucy52MV83XzBdID0gJzIuMTYuMCc7XHJcblx0JC5fYXBpTWFwLmV4dGVuc2lvblskLmFwaVZlcnNpb25zLnYxXzdfMl0gPSAnMi4xNi4wJztcclxuXHQkLl9hcGlNYXAuZXh0ZW5zaW9uWyQuYXBpVmVyc2lvbnMudjFfOF8wXSA9ICcyLjE2LjAnO1xyXG5cdCQuX2FwaU1hcC5leHRlbnNpb25bJC5hcGlWZXJzaW9ucy52MV84XzFdID0gJzIuMTYuMCc7XHJcblx0JC5fYXBpTWFwLmV4dGVuc2lvblskLmFwaVZlcnNpb25zLnYxXzhfMl0gPSAnMi4xNi4wJztcclxuXHQkLl9hcGlNYXAuZXh0ZW5zaW9uWyQuYXBpVmVyc2lvbnMudjFfOV8wXSA9ICcyLjE3LjAnO1xyXG5cclxuXHQvLyBNb2JpbGVcclxuICAgICQuX2FwaU1hcC5tb2JpbGVbJC5hcGlWZXJzaW9ucy52MV8wXSA9ICcxLjEuMCc7XHJcbiAgICAkLl9hcGlNYXAubW9iaWxlWyQuYXBpVmVyc2lvbnMudjFfMV0gPSAnMS4xLjAnO1xyXG4gICAgJC5fYXBpTWFwLm1vYmlsZVskLmFwaVZlcnNpb25zLnYxXzJdID0gJzEuMS4wJztcclxuICAgICQuX2FwaU1hcC5tb2JpbGVbJC5hcGlWZXJzaW9ucy52MV8zXSA9ICcxLjEuMCc7XHJcblx0JC5fYXBpTWFwLm1vYmlsZVskLmFwaVZlcnNpb25zLnYxXzRdID0gJzEuMS4wJztcclxuXHQkLl9hcGlNYXAubW9iaWxlWyQuYXBpVmVyc2lvbnMudjFfNF8xXSA9ICcxLjEuMCc7XHJcblx0JC5fYXBpTWFwLm1vYmlsZVskLmFwaVZlcnNpb25zLnYxXzVdID0gJzEuMS4wJztcclxuXHQkLl9hcGlNYXAubW9iaWxlWyQuYXBpVmVyc2lvbnMudjFfNV8xXSA9ICcxLjEuMCc7XHJcblx0JC5fYXBpTWFwLm1vYmlsZVskLmFwaVZlcnNpb25zLnYxXzVfMl0gPSAnMS4xLjAnO1xyXG5cdCQuX2FwaU1hcC5tb2JpbGVbJC5hcGlWZXJzaW9ucy52MV82XSA9ICcyLjcuMCc7XHJcblx0JC5fYXBpTWFwLm1vYmlsZVskLmFwaVZlcnNpb25zLnYxXzZfMV0gPSAnMi43LjAnO1xyXG5cdCQuX2FwaU1hcC5tb2JpbGVbJC5hcGlWZXJzaW9ucy52MV83XzBdID0gJzMuMC4wJztcclxuXHQkLl9hcGlNYXAubW9iaWxlWyQuYXBpVmVyc2lvbnMudjFfN18yXSA9ICczLjAuMCc7XHJcblx0JC5fYXBpTWFwLm1vYmlsZVskLmFwaVZlcnNpb25zLnYxXzhfMF0gPSAnMy4yLjAnO1xyXG5cdCQuX2FwaU1hcC5tb2JpbGVbJC5hcGlWZXJzaW9ucy52MV84XzFdID0gJzMuMi4wJztcclxuXHQkLl9hcGlNYXAubW9iaWxlWyQuYXBpVmVyc2lvbnMudjFfOF8yXSA9ICczLjIuMCc7XHJcblx0JC5fYXBpTWFwLm1vYmlsZVskLmFwaVZlcnNpb25zLnYxXzlfMF0gPSAnMy4yLjAnO1xyXG5cclxuICAgIC8vIEFsbCBsYXRlc3RcclxuICAgICQuX2FwaU1hcC5uYXRpdmVXaW4gIFskLmFwaVZlcnNpb25zLmxhdGVzdF0gPSAkLl9jaHJvbWVOYXRpdmVXaW5SZXF1aXJlZFZlcnNpb247XHJcbiAgICAkLl9hcGlNYXAuaWVBZGRvbiAgICBbJC5hcGlWZXJzaW9ucy5sYXRlc3RdID0gJC5faWVBZGRvblJlcXVpcmVkVmVyc2lvbjtcclxuICAgICQuX2FwaU1hcC5uYXRpdmVMaW51eFskLmFwaVZlcnNpb25zLmxhdGVzdF0gPSAkLl9jaHJvbWVOYXRpdmVMaW51eFJlcXVpcmVkVmVyc2lvbjtcclxuICAgICQuX2FwaU1hcC5uYXRpdmVNYWMgIFskLmFwaVZlcnNpb25zLmxhdGVzdF0gPSAkLl9jaHJvbWVOYXRpdmVNYWNSZXF1aXJlZFZlcnNpb247XHJcbiAgICAkLl9hcGlNYXAuZXh0ZW5zaW9uICBbJC5hcGlWZXJzaW9ucy5sYXRlc3RdID0gJC5fZXh0ZW5zaW9uUmVxdWlyZWRWZXJzaW9uO1xyXG4gICAgJC5fYXBpTWFwLm1vYmlsZSAgICAgWyQuYXBpVmVyc2lvbnMubGF0ZXN0XSA9ICQuX21vYmlsZVJlcXVpcmVkVmVyc2lvbjtcclxuXHJcblx0Ly8gcG9wdWxhdGVkIGFmdGVyIGluaXRcclxuICAgICQuX25hdGl2ZUluZm8gPSB7fTtcclxuXHJcbiAgICAkLmluc3RhbGxhdGlvblN0YXRlcyA9IHtcclxuICAgICAgICBJTlNUQUxMRUQ6IDAsXHJcbiAgICAgICAgTk9UX0lOU1RBTExFRDogMSxcclxuICAgICAgICBPVVREQVRFRDogMixcclxuICAgICAgICBCUk9XU0VSX05PVF9TVVBQT1JURUQ6IDNcclxuICAgIH07XHJcblxyXG5cdC8vIFBvcnBlcnRpZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0JC5pc1N1cHBvcnRlZE1vYmlsZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvLyBQa2kgT3B0aW9ucyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdCQuY2VydGlmaWNhdGVWYWxpZGF0aW9uTGV2ZWxzID0ge1xyXG5cdFx0ZnVsbDogJ2Z1bGwnLFxyXG5cdFx0b2ZmbGluZTogJ29mZmxpbmUnXHJcblx0fTtcclxuXHJcbiAgICAkLnBhZGVzUG9saWNpZXMgPSB7XHJcbiAgICAgICAgYmFzaWM6ICdiYXNpYycsXHJcbiAgICAgICAgYnJhemlsQWRyQmFzaWNhOiAnYnJhemlsQWRyQmFzaWNhJ1xyXG4gICAgfTtcclxuXHJcbiAgICAkLmNhZGVzUG9saWNpZXMgPSB7XHJcbiAgICAgICAgYmVzOiAnY2FkZXNCZXMnLFxyXG4gICAgICAgIGJyYXppbEFkckJhc2ljYTogJ2JyYXppbEFkckJhc2ljYSdcclxuICAgIH07XHJcblxyXG4gICAgJC54bWxQb2xpY2llcyA9IHtcclxuICAgIFx0eG1sRFNpZzogJ3htbERTaWcnLFxyXG4gICAgXHRcclxuICAgIFx0eGFkZXNCZXM6ICd4YWRlc0JlcycsXHJcbiAgICBcdGJyYXppbE5GZTogJ2JyYXppbE5GZScsXHJcbiAgICBcdGJyYXppbEFkckJhc2ljYTogJ2JyYXppbEFkckJhc2ljYSdcclxuICAgIH07XHJcblxyXG4gICAgJC5jYWRlc0FjY2VwdGFibGVQb2xpY2llcyA9IHtcclxuICAgICAgICBwa2lCcmF6aWw6IFtcclxuICAgICAgICAgICAgJ2JyYXppbEFkckJhc2ljYScsXHJcbiAgICAgICAgICAgICdicmF6aWxBZHJUZW1wbycsXHJcbiAgICAgICAgICAgICdicmF6aWxBZHJWYWxpZGFjYW8nLFxyXG4gICAgICAgICAgICAnYnJhemlsQWRyQ29tcGxldGEnLFxyXG4gICAgICAgICAgICAnYnJhemlsQWRyQXJxdWl2YW1lbnRvJ1xyXG4gICAgICAgIF1cclxuICAgIH07XHJcblxyXG4gICAgJC54bWxBY2NlcHRhYmxlUG9saWNpZXMgPSB7XHJcbiAgICBcdHBraUJyYXppbDogW1xyXG4gICAgICAgICAgICAnYnJhemlsQWRyQmFzaWNhJyxcclxuICAgICAgICAgICAgJ2JyYXppbEFkclRlbXBvJ1xyXG4gICAgXHRdXHJcbiAgICB9O1xyXG5cclxuXHQkLnN0YW5kYXJkVHJ1c3RBcmJpdHJhdG9ycyA9IHtcclxuXHQgICAgcGtpQnJhemlsOiB7XHJcblx0ICAgICAgICB0eXBlOiAnc3RhbmRhcmQnLFxyXG5cdCAgICAgICAgc3RhbmRhcmRBcmJpdHJhdG9yOiAncGtpQnJhemlsJ1xyXG5cdCAgICB9LFxyXG5cdCAgICBwa2lJdGFseToge1xyXG5cdCAgICAgICAgdHlwZTogJ3N0YW5kYXJkJyxcclxuXHQgICAgICAgIHN0YW5kYXJkQXJiaXRyYXRvcjogJ3BraUl0YWx5J1xyXG5cdCAgICB9LFxyXG5cdCAgICBwa2lQZXJ1OiB7XHJcblx0ICAgICAgICB0eXBlOiAnc3RhbmRhcmQnLFxyXG5cdCAgICAgICAgc3RhbmRhcmRBcmJpdHJhdG9yOiAncGtpUGVydSdcclxuXHQgICAgfSxcclxuXHQgICAgd2luZG93czoge1xyXG5cdCAgICAgICAgdHlwZTogJ3N0YW5kYXJkJyxcclxuXHQgICAgICAgIHN0YW5kYXJkQXJiaXRyYXRvcjogJ3dpbmRvd3MnXHJcblx0ICAgIH1cclxuXHR9O1xyXG5cclxuXHQkLnhtbEluc2VydGlvbk9wdGlvbnMgPSB7XHJcblx0XHRhcHBlbmRDaGlsZDogJ2FwcGVuZENoaWxkJyxcclxuXHRcdHByZXBlbmRDaGlsZDogJ3ByZXBlbmRDaGlsZCcsXHJcblx0XHRhcHBlbmRTaWJsaW5nOiAnYXBwZW5kU2libGluZycsXHJcblx0XHRwcmVwZW5kU2libGluZzogJ3ByZXBlbmRTaWJsaW5nJ1xyXG5cdH07XHJcblxyXG5cdCQub3V0cHV0TW9kZXMgPSB7XHJcblx0ICAgIHNob3dTYXZlRmlsZURpYWxvZzogJ3Nob3dTYXZlRmlsZURpYWxvZycsXHJcblx0ICAgIHNhdmVJbkZvbGRlcjogJ3NhdmVJbkZvbGRlcicsXHJcblx0ICAgIGF1dG9TYXZlOiAnYXV0b1NhdmUnLFxyXG5cdCAgICByZXR1cm5Db250ZW50OiAncmV0dXJuQ29udGVudCdcclxuXHR9O1xyXG5cclxuXHQkLnRydXN0QXJiaXRyYXRvclR5cGVzID0ge1xyXG5cdCAgICB0cnVzdGVkUm9vdDogJ3RydXN0ZWRSb290JyxcclxuXHQgICAgdHNsOiAndHNsJyxcclxuXHQgICAgc3RhbmRhcmQ6ICdzdGFuZGFyZCdcclxuXHR9O1xyXG5cclxuICAgIC8vIHZpc3VhbCByZXByZXNlbnRhdGlvblxyXG5cdCQucGFkZXNQYXBlclNpemVzID0ge1xyXG5cdCAgICBjdXN0b206ICdjdXN0b20nLFxyXG5cdCAgICBhMDogJ2EwJyxcclxuXHQgICAgYTE6ICdhMScsXHJcblx0ICAgIGEyOiAnYTInLFxyXG5cdCAgICBhMzogJ2EzJyxcclxuXHQgICAgYTQ6ICdhNCcsXHJcblx0ICAgIGE1OiAnYTUnLFxyXG5cdCAgICBhNjogJ2E2JyxcclxuXHQgICAgYTc6ICdhNycsXHJcblx0ICAgIGE4OiAnYTgnLFxyXG5cdCAgICBsZXR0ZXI6ICdsZXR0ZXInLFxyXG5cdCAgICBsZWdhbDogJ2xlZ2FsJyxcclxuXHQgICAgbGVkZ2VyOiAnbGVkZ2VyJ1xyXG5cdH07XHJcblxyXG5cdCQucGFkZXNIb3Jpem9udGFsQWxpZ24gPSB7XHJcblx0ICAgIGxlZnQ6ICdsZWZ0JyxcclxuXHQgICAgY2VudGVyOiAnY2VudGVyJyxcclxuXHQgICAgcmlndGg6ICdyaWd0aCdcclxuXHR9O1xyXG5cclxuXHQkLnBhZGVzVmVydGljYWxBbGlnbiA9IHtcclxuXHQgICAgdG9wOiAndG9wJyxcclxuXHQgICAgY2VudGVyOiAnY2VudGVyJyxcclxuXHQgICAgYm90dG9tOiAnYm90dG9tJ1xyXG5cdH07XHJcblxyXG5cdCQucGFkZXNNZWFzdXJlbWVudFVuaXRzID0ge1xyXG5cdCAgICBjZW50aW1ldGVyczogJ2NlbnRpbWV0ZXJzJyxcclxuXHQgICAgcGRmUG9pbnRzOiAncGRmUG9pbnRzJ1xyXG5cdH07XHJcblxyXG5cdCQucGFkZXNQYWdlT3JpZW50YXRpb25zID0ge1xyXG5cdCAgICBhdXRvOiAnYXV0bycsXHJcblx0ICAgIHBvcnRyYWl0OiAncG9ydHJhaXQnLFxyXG4gICAgICAgIGxhbmRzY2FwZTogJ2xhbmRzY2FwZSdcclxuXHR9O1xyXG5cclxuXHQkLnBhZGVzQXV0b1Bvc2l0aW9uaW5nSG9yaXpvbnRhbERpcmVjdGlvbnMgPSB7XHJcblx0XHRsZWZ0VG9SaWdodDogJ2xlZnRUb1JpZ2h0JyxcclxuXHRcdHJpZ2h0VG9MZWZ0OiAncmlnaHRUb0xlZnQnXHJcblx0fTtcclxuXHJcblx0JC5wYWRlc0F1dG9Qb3NpdGlvbmluZ1ZlcnRpY2FsRGlyZWN0aW9ucyA9IHtcclxuXHRcdHRvcERvd246ICd0b3BEb3duJyxcclxuXHRcdGJvdHRvbVVwOiAnYm90dG9tVXAnXHJcblx0fTtcclxuXHJcbiAgICAvLyBwZGYgbWFya1xyXG5cdCQubWFya0VsZW1lbnRUeXBlcyA9IHtcclxuXHQgICAgdGV4dDogJ3RleHQnLFxyXG5cdCAgICBpbWFnZTogJ2ltYWdlJ1xyXG5cdH07XHJcblxyXG5cdCQubWFya1RleHRTdHlsZSA9IHtcclxuXHQgICAgbm9ybWFsOiAwLFxyXG5cdCAgICBib2xkOiAxLFxyXG5cdCAgICBpdGFsaWM6IDJcclxuXHR9O1xyXG5cclxuXHQvLyBwYXNzd29yZCBwb2xpY2llc1xyXG5cdCQucGFzc3dvcmRQb2xpY2llcyA9IHtcclxuXHRcdGxldHRlcnNBbmROdW1iZXJzOiAxLFxyXG5cdFx0dXBwZXJBbmRMb3dlckNhc2U6IDIsXHJcblx0XHRzcGVjaWFsQ2hhcmFjdGVyczogNFxyXG5cdH07XHJcblxyXG5cdC8vIHN0YW5kYXJkIHBrY3MxMSBtb2R1bGVzXHJcblx0JC5wa2NzMTFNb2R1bGVzID0ge1xyXG5cdFx0c2FmZVNpZ246IHsgd2luOiAnYWV0cGtzczEuZGxsJywgbGludXg6ICdsaWJhZXRwa3NzLnNvLjMnLCBtYWM6ICdsaWJhZXRwa3NzLmR5bGliJyB9LFxyXG5cdFx0c2FmZU5ldDogeyB3aW46ICdlVFBLQ1MxMS5kbGwnLCBsaW51eDogJ2xpYmVUb2tlbi5zbycsIG1hYzogJ2xpYmVUb2tlbi5keWxpYicgfVxyXG5cdH07XHJcblxyXG5cdCQubW9iaWxlSW50ZWdyYXRpb25Nb2RlcyA9IHtcclxuXHRcdGFwcEludGVncmF0aW9uOiAnYXBwSW50ZWdyYXRpb24nLFxyXG5cdFx0YnJvd3NlckludGVncmF0aW9uOiAnYnJvd3NlckludGVncmF0aW9uJ1xyXG5cdH07XHJcblxyXG5cdCQuZW5jcnlwdGlvblBhcmFtZXRlcnMgPSB7XHJcblx0XHRyc2FFbmNyeXB0aW9uUGtjczE6ICdSU0FFbmNyeXB0aW9uUGtjczEnLFxyXG5cdFx0cnNhRW5jcnlwdGlvbk9hZXBTSEExOiAnUlNBRW5jcnlwdGlvbk9hZXBTSEExJyxcclxuXHRcdHJzYUVuY3J5cHRpb25PYWVwU0hBMjU2OiAnUlNBRW5jcnlwdGlvbk9hZXBTSEEyNTYnLFxyXG5cdFx0cnNhRW5jcnlwdGlvbk9hZXBTSEEzODQ6ICdSU0FFbmNyeXB0aW9uT2FlcFNIQTM4NCcsXHJcblx0XHRyc2FFbmNyeXB0aW9uT2FlcFNIQTUxMjogJ1JTQUVuY3J5cHRpb25PYWVwU0hBNTEyJ1xyXG5cdH07XHJcblxyXG5cdCQuX3BhcnNlRGF0YVVybCA9IGZ1bmN0aW9uICh1cmwpIHtcclxuXHRcdHZhciBtYXRjaCA9IC9eZGF0YTooLispO2Jhc2U2NCwoLispJC8uZXhlYyh1cmwpO1xyXG5cdFx0aWYgKCFtYXRjaCkge1xyXG5cdFx0XHQkLl9sb2coJ2ZhaWxlZCB0byBwYXJzZSBkYXRhIHVybCcpO1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG1pbWVUeXBlOiBtYXRjaFsxXSxcclxuXHRcdFx0Y29udGVudDogbWF0Y2hbMl1cclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0JC5fZG93bmxvYWRSZXNvdXJjZSA9IGZ1bmN0aW9uICh1cmwsIGNhbGxCYWNrKSB7XHJcblx0XHQkLl9sb2coJ3Jlc29sdmluZyByZXNvdXJjZSByZWZlcmVuY2U6ICcgKyB1cmwpO1xyXG5cdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0eGhyLm9wZW4oJ0dFVCcsIHVybCk7XHJcblx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InO1xyXG5cdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIHJlc3BvbnNlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHRcdFx0cmVzcG9uc2VSZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdCQuX2xvZygncmVzb3VyY2UgcmVmZXJlbmNlIHJlc29sdmVkJyk7XHJcblx0XHRcdFx0dmFyIHJlc291cmNlID0gJC5fcGFyc2VEYXRhVXJsKHJlc3BvbnNlUmVhZGVyLnJlc3VsdCk7XHJcblx0XHRcdFx0Y2FsbEJhY2socmVzb3VyY2UpO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRyZXNwb25zZVJlYWRlci5yZWFkQXNEYXRhVVJMKHhoci5yZXNwb25zZSk7XHJcblx0XHR9O1xyXG5cdFx0eGhyLnNlbmQoKTtcclxuXHR9O1xyXG5cclxuXHQkLl9nZXRSZXF1ZXN0T3NQMTFNb2R1bGVzID0gZnVuY3Rpb24gKHAxMU1vZHVsZXMpIHtcclxuXHRcdGlmICghcDExTW9kdWxlcyB8fCAhcDExTW9kdWxlcy5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0XHR2YXIgb3NNb2R1bGVzID0gW107XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHAxMU1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKCQuX25hdGl2ZUluZm8ub3MgPT09ICdXaW5kb3dzJykge1xyXG5cdFx0XHRcdG9zTW9kdWxlcy5wdXNoKHAxMU1vZHVsZXNbaV0ud2luKTtcclxuXHRcdFx0fSBlbHNlIGlmICgkLl9uYXRpdmVJbmZvLm9zID09PSAnTGludXgnKSB7XHJcblx0XHRcdFx0b3NNb2R1bGVzLnB1c2gocDExTW9kdWxlc1tpXS5saW51eCk7XHJcblx0XHRcdH0gZWxzZSBpZiAoJC5fbmF0aXZlSW5mby5vcyA9PT0gJ0RhcndpbicpIHtcclxuXHRcdFx0XHRvc01vZHVsZXMucHVzaChwMTFNb2R1bGVzW2ldLm1hYyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBvc01vZHVsZXM7XHJcblx0fTtcclxuXHJcblx0JC5faGFuZGxlUDExTW9kdWxlc0FyZ3MgPSBmdW5jdGlvbiAoYXJncywgcmVxdWVzdCkge1xyXG5cdFx0dmFyIHAxMU1vZHVsZXMgPSBudWxsO1xyXG5cdFx0dmFyIHRva2VuU2VyaWFsTnVtYmVyID0gbnVsbDtcclxuXHJcblx0XHRpZiAoYXJncy50b2tlbiAmJiB0eXBlb2YgYXJncy50b2tlbiA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0cDExTW9kdWxlcyA9IFsgYXJncy50b2tlbi5wa2NzMTFNb2R1bGUgXTtcclxuXHRcdFx0dG9rZW5TZXJpYWxOdW1iZXIgPSBhcmdzLnRva2VuLnNlcmlhbE51bWJlcjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXF1ZXN0LnBrY3MxMU1vZHVsZXMgPSBwMTFNb2R1bGVzIHx8IHJlcXVlc3QucGtjczExTW9kdWxlcztcclxuXHRcdHJlcXVlc3QudG9rZW5TZXJpYWxOdW1iZXIgPSB0b2tlblNlcmlhbE51bWJlciB8fCByZXF1ZXN0LnRva2VuU2VyaWFsTnVtYmVyO1xyXG5cdH07XHJcblxyXG5cclxuICAgIC8vIFdlYlBLSSBlcnJvcnNcclxuXHQkLmVycm9yQ29kZXMgPSB7XHJcblx0XHRVTkRFRklORUQ6ICAgICAgICAgICAgICAgICAgICAgICd1bmRlZmluZWQnLFxyXG5cdCAgICBJTlRFUk5BTDogICAgICAgICAgICAgICAgICAgICAgICdpbnRlcm5hbCcsXHJcblx0ICAgIFVTRVJfQ0FOQ0VMTEVEOiAgICAgICAgICAgICAgICAgJ3VzZXJfY2FuY2VsbGVkJyxcclxuXHQgICAgT1NfTk9UX1NVUFBPUlRFRDogICAgICAgICAgICAgICAnb3Nfbm90X3N1cHBvcnRlZCcsXHJcblx0ICAgIEFERE9OX1RJTUVPVVQ6ICAgICAgICAgICAgICAgICAgJ2FkZG9uX3RpbWVvdXQnLFxyXG5cdCAgICBBRERPTl9OT1RfREVURUNURUQ6ICAgICAgICAgICAgICdhZGRvbl9ub3RfZGV0ZWN0ZWQnLFxyXG5cdCAgICBBRERPTl9TRU5EX0NPTU1BTkRfRkFJTFVSRTogICAgICdhZGRvbl9zZW5kX2NvbW1hbmRfZmFpbHVyZScsXHJcblx0ICAgIENFUlRJRklDQVRFX05PVF9GT1VORDogICAgICAgICAgJ2NlcnRpZmljYXRlX25vdF9mb3VuZCcsXHJcblx0ICAgIENPTU1BTkRfVU5LTk9XTjogICAgICAgICAgICAgICAgJ2NvbW1hbmRfdW5rbm93bicsXHJcblx0ICAgIENPTU1BTkRfTk9UX1NVUFBPUlRFRDogICAgICAgICAgJ2NvbW1hbmRfbm90X3N1cHBvcnRlZCcsXHJcblx0ICAgIENPTU1BTkRfUEFSQU1FVEVSX05PVF9TRVQ6ICAgICAgJ2NvbW1hbmRfcGFyYW1ldGVyX25vdF9zZXQnLFxyXG5cdCAgICBDT01NQU5EX0lOVkFMSURfUEFSQU1FVEVSOiAgICAgICdjb21tYW5kX2ludmFsaWRfcGFyYW1ldGVyJyxcclxuXHQgICAgQ09NTUFORF9QQVJBTUVURVJfTk9UX1NVUFBPUlRFRDonY29tbWFuZF9wYXJhbWV0ZXJfbm90X3N1cHBvcnRlZCcsXHJcblx0ICAgIE5BVElWRV9DT05ORUNUX0ZBSUxVUkU6ICAgICAgICAgJ25hdGl2ZV9jb25uZWN0X2ZhaWx1cmUnLFxyXG5cdCAgICBOQVRJVkVfRElTQ09OTkVDVEVEOiAgICAgICAgICAgICduYXRpdmVfZGlzY29ubmVjdGVkJyxcclxuXHQgICAgTkFUSVZFX05PX1JFU1BPTlNFOiAgICAgICAgICAgICAnbmF0aXZlX25vX3Jlc3BvbnNlJyxcclxuXHQgICAgUkVTVF9QS0lfR0VUX1BFTkRJTkdfU0lHTkFUVVJFOiAncmVzdF9wa2lfZ2V0X3BlbmRpbmdfc2lnbmF0dXJlJyxcclxuXHQgICAgUkVTVF9QS0lfUE9TVF9TSUdOQVRVUkU6ICAgICAgICAncmVzdF9wa2lfcG9zdF9zaWduYXR1cmUnLFxyXG5cdCAgICBSRVNUX1BLSV9JTlZBTElEX0NFUlRJRklDQVRFOiAgICdyZXN0X3BraV9pbnZhbGlkX2NlcnRpZmljYXRlJyxcclxuXHQgICAgTElDRU5TRV9OT1RfU0VUOiAgICAgICAgICAgICAgICAnbGljZW5zZV9ub3Rfc2V0JyxcclxuXHQgICAgTElDRU5TRV9JTlZBTElEOiAgICAgICAgICAgICAgICAnbGljZW5zZV9pbnZhbGlkJyxcclxuXHQgICAgTElDRU5TRV9SRVNUUklDVEVEOiAgICAgICAgICAgICAnbGljZW5zZV9yZXN0cmljdGVkJyxcclxuXHQgICAgTElDRU5TRV9FWFBJUkVEOiAgICAgICAgICAgICAgICAnbGljZW5zZV9leHBpcmVkJyxcclxuXHQgICAgTElDRU5TRV9ET01BSU5fTk9UX0FMTE9XRUQ6ICAgICAnbGljZW5zZV9kb21haW5fbm90X2FsbG93ZWQnLFxyXG5cdCAgICBWQUxJREFUSU9OX0VSUk9SOiAgICAgICAgICAgICAgICd2YWxpZGF0aW9uX2Vycm9yJyxcclxuXHQgICAgUDExX0VSUk9SOiAgICAgICAgICAgICAgICAgICAgICAncDExX2Vycm9yJyxcclxuXHQgICAgUDExX1RPS0VOX05PVF9GT1VORDogICAgICAgICAgICAncDExX3Rva2VuX25vdF9mb3VuZCcsXHJcblx0ICAgIFAxMV9OT1RfU1VQUE9SVEVEOiAgICAgICAgICAgICAgJ3AxMV9ub3Rfc3VwcG9ydGVkJyxcclxuXHQgICAgS0VZU0VUX05PVF9GT1VORDogICAgICAgICAgICAgICAna2V5c2V0X25vdF9mb3VuZCcsXHJcblx0ICAgIEFMR09SSVRITV9OT1RfU1VQUE9SVEVEOiAgICAgICAgJ2FsZ29yaXRobV9ub3Rfc3VwcG9ydGVkJyxcclxuXHQgICAgU0lHTkVEX1BERl9UT19NQVJLOiAgICAgICAgICAgICAnc2lnbmVkX3BkZl90b19tYXJrJyxcclxuXHQgICAgSlNPTl9FUlJPUjogICAgICAgICAgICAgICAgICAgICAnanNvbl9lcnJvcicsXHJcblx0ICAgIElPX0VSUk9SOiAgICAgICAgICAgICAgICAgICAgICAgJ2lvX2Vycm9yJyxcclxuXHQgICAgS0VZQ0hBSU5fRVJST1I6ICAgICAgICAgICAgICAgICAna2V5Y2hhaW5fZXJyb3InLFxyXG5cdCAgICBLRVlDSEFJTl9TSUdOX0VSUk9SOiAgICAgICAgICAgICdrZXljaGFpbl9zaWduX2Vycm9yJyxcclxuXHQgICAgREVDT0RFX0VSUk9SOiAgICAgICAgICAgICAgICAgICAnZGVjb2RlX2Vycm9yJyxcclxuXHQgICAgQ1NQX0tFWVNFVF9OT1RfREVGSU5FRDogICAgICAgICAnY3NwX2tleXNldF9ub3RfZGVmaW5lZCcsXHJcblx0ICAgIENTUF9JTlZBTElEX0FMR09SSVRITTogICAgICAgICAgJ2NzcF9pbnZhbGlkX2FsZ29yaXRobScsXHJcblx0ICAgIENTUF9JTlZBTElEX1BST1ZJREVSX1RZUEU6ICAgICAgJ2NzcF9pbnZhbGlkX3Byb3ZpZGVyX3R5cGUnLFxyXG5cdCAgICBNT0JJTEVfVElNRU9VVDogICAgICAgICAgICAgICAgICdtb2JpbGVfdGltZW91dCcsXHJcblx0ICAgIE1PQklMRV9OT1RfQVVUSE9SSVpFRDogICAgICAgICAgJ21vYmlsZV9ub3RfYXV0aG9yaXplZCcsXHJcblx0ICAgIE1PQklMRV9TRU5EX01FU1NBR0U6ICAgICAgICAgICAgJ21vYmlsZV9zZW5kX21lc3NhZ2UnLFxyXG5cdCAgICBDT01NQU5EX0RFQ1JZUFRfRVJST1I6ICAgICAgICAgICdjb21tYW5kX2RlY3J5cHRfZXJyb3InLFxyXG5cdFx0QkxPQ0tFRF9ET01BSU46ICAgICAgICAgICAgICAgICAnYmxvY2tlZF9kb21haW4nLFxyXG5cdFx0SU5WQUxJRF9PUEVSQVRJT046ICAgICAgICAgICAgICAnaW52YWxpZF9vcGVyYXRpb24nXHJcblx0fTtcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gXCJQcml2YXRlXCIgc3RhdGljIGZ1bmN0aW9ucyAobm8gcmVmZXJlbmNlIHRvICd0aGlzJykgLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0JC5fY29tcGFyZVZlcnNpb25zID0gZnVuY3Rpb24gKHYxLCB2Mikge1xyXG5cclxuXHRcdHZhciB2MXBhcnRzID0gdjEuc3BsaXQoJy4nKTtcclxuXHRcdHZhciB2MnBhcnRzID0gdjIuc3BsaXQoJy4nKTtcclxuXHJcblx0XHRmdW5jdGlvbiBpc1Bvc2l0aXZlSW50ZWdlcih4KSB7XHJcblx0XHRcdHJldHVybiAvXlxcZCskLy50ZXN0KHgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHZhbGlkYXRlUGFydHMocGFydHMpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xyXG5cdFx0XHRcdGlmICghaXNQb3NpdGl2ZUludGVnZXIocGFydHNbaV0pKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdmFsaWRhdGVQYXJ0cyh2MXBhcnRzKSB8fCAhdmFsaWRhdGVQYXJ0cyh2MnBhcnRzKSkge1xyXG5cdFx0XHRyZXR1cm4gTmFOO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdjFwYXJ0cy5sZW5ndGg7ICsraSkge1xyXG5cclxuXHRcdFx0aWYgKHYycGFydHMubGVuZ3RoID09PSBpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciB2MXAgPSBwYXJzZUludCh2MXBhcnRzW2ldLCAxMCk7XHJcblx0XHRcdHZhciB2MnAgPSBwYXJzZUludCh2MnBhcnRzW2ldLCAxMCk7XHJcblxyXG5cdFx0XHRpZiAodjFwID09PSB2MnApIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodjFwID4gdjJwKSB7XHJcblx0XHRcdFx0cmV0dXJuIDE7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh2MXBhcnRzLmxlbmd0aCAhPSB2MnBhcnRzLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm4gLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIDA7XHJcblx0fTtcclxuXHJcblxyXG5cdCQuX2xvZyA9IGZ1bmN0aW9uIChtZXNzYWdlLCBkYXRhKSB7XHJcblx0XHRpZiAod2luZG93LmNvbnNvbGUpIHtcclxuXHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHR3aW5kb3cuY29uc29sZS5sb2cobWVzc2FnZSwgZGF0YSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0d2luZG93LmNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gXCJQcml2YXRlXCIgaW5zdGFuY2UgZnVuY3Rpb25zICh3aXRoIHJlZmVyZW5jZXMgdG8gJ3RoaXMnKSAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHQkLl9jcmVhdGVDb250ZXh0ID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdHZhciBwcm9taXNlID0gbmV3ICQuUHJvbWlzZSh0aGlzLmFuZ3VsYXJTY29wZSwgdGhpcy5uZ1pvbmUpO1xyXG5cdFx0aWYgKGFyZ3MgJiYgYXJncy5zdWNjZXNzKSB7XHJcblx0XHRcdHByb21pc2Uuc3VjY2VzcyhhcmdzLnN1Y2Nlc3MpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGFyZ3MgJiYgYXJncy5mYWlsKSB7XHJcblx0XHQgICAgcHJvbWlzZS5mYWlsKGFyZ3MuZmFpbCk7XHJcblx0XHR9IGVsc2UgaWYgKGFyZ3MgJiYgYXJncy5lcnJvcikge1xyXG5cdFx0ICAgIHByb21pc2UuZXJyb3IoYXJncy5lcnJvcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0ICAgIHByb21pc2UuZmFpbCh0aGlzLmRlZmF1bHRGYWlsQ2FsbGJhY2spO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGNvbnRleHQgPSB7XHJcblx0XHRcdHByb21pc2U6IHByb21pc2UsXHJcblx0XHRcdGxpY2Vuc2U6IHRoaXMubGljZW5zZSxcclxuXHRcdFx0dXNlRG9tYWluTmF0aXZlUG9vbDogdGhpcy51c2VEb21haW5OYXRpdmVQb29sLFxyXG5cdFx0XHRpbnN0YW5jZTogJC5fc3VwcG9ydGVkTW9iaWxlRGV0ZWN0ZWQgPyB0aGlzIDogdW5kZWZpbmVkXHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGNvbnRleHQ7XHJcblx0fTtcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gUHVibGljIGZ1bmN0aW9ucyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHQkLmluaXQgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cclxuXHRcdGlmICghYXJncykge1xyXG5cdFx0XHRhcmdzID0ge307XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBhcmdzID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdGFyZ3MgPSB7XHJcblx0XHRcdFx0cmVhZHk6IGFyZ3NcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYXJncy5saWNlbnNlKSB7XHJcblx0XHRcdHRoaXMubGljZW5zZSA9IGFyZ3MubGljZW5zZTtcclxuXHRcdH1cclxuXHRcdGlmIChhcmdzLmRlZmF1bHRFcnJvcikge1xyXG5cdFx0ICAgIHRoaXMuZGVmYXVsdEZhaWxDYWxsYmFjayA9IGZ1bmN0aW9uIChleCkgeyBhcmdzLmRlZmF1bHRFcnJvcihleC5tZXNzYWdlLCBleC5lcnJvciwgZXgub3JpZ2luLCBleC5jb2RlKTsgfTtcclxuXHRcdH1cclxuXHRcdGlmIChhcmdzLmRlZmF1bHRGYWlsKSB7XHJcbiAgICAgICAgICAgIC8vIG92ZXJ3cml0ZSBhbnkgbGVnYWN5IGVycm9yIGNhbGxiYWNrXHJcblx0XHQgICAgdGhpcy5kZWZhdWx0RmFpbENhbGxiYWNrID0gYXJncy5kZWZhdWx0RmFpbDtcclxuXHRcdH1cdFx0XHJcblx0XHRpZiAoYXJncy5hbmd1bGFyU2NvcGUpIHtcclxuXHRcdFx0dGhpcy5hbmd1bGFyU2NvcGUgPSBhcmdzLmFuZ3VsYXJTY29wZTtcclxuXHRcdH1cclxuXHRcdGlmIChhcmdzLm5nWm9uZSkge1xyXG5cdFx0XHR0aGlzLm5nWm9uZSA9IGFyZ3Mubmdab25lO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGFyZ3MuYnJhbmQpIHtcclxuXHRcdFx0dGhpcy5icmFuZCA9IGFyZ3MuYnJhbmQ7XHJcblx0XHR9XHJcblx0XHRpZiAoYXJncy5yZXN0UGtpVXJsKSB7XHJcblx0XHRcdHRoaXMucmVzdFBraVVybCA9IGFyZ3MucmVzdFBraVVybFthcmdzLnJlc3RQa2lVcmwubGVuZ3RoIC0gMV0gPT09ICcvJyA/IGFyZ3MucmVzdFBraVVybCA6IGFyZ3MucmVzdFBraVVybCArICcvJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnVzZURvbWFpbk5hdGl2ZVBvb2wgPSBhcmdzLnVzZURvbWFpbk5hdGl2ZVBvb2wgPT09IHRydWU7XHJcblxyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0dmFyIG9uQ2hlY2tJbnN0YWxsZWRTdWNjZXNzID0gZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cdFx0ICAgIGlmIChyZXN1bHQuaXNJbnN0YWxsZWQpIHtcclxuXHRcdFx0XHRpZiAoYXJncy5yZWFkeSkge1xyXG5cdFx0XHRcdFx0YXJncy5yZWFkeSgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkLl9sb2coJ1dlYiBQS0kgcmVhZHkgKG5vIGNhbGxiYWNrIHJlZ2lzdGVyZWQpJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmIChhcmdzLm5vdEluc3RhbGxlZCkge1xyXG5cdFx0XHRcdFx0YXJncy5ub3RJbnN0YWxsZWQocmVzdWx0LnN0YXR1cywgcmVzdWx0Lm1lc3NhZ2UsIHJlc3VsdC5icm93c2VyU3BlY2lmaWNTdGF0dXMpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzZWxmLnJlZGlyZWN0VG9JbnN0YWxsUGFnZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoe1xyXG5cdFx0XHRzdWNjZXNzOiBvbkNoZWNrSW5zdGFsbGVkU3VjY2VzcyxcclxuXHRcdFx0ZmFpbDogYXJncy5mYWlsLFxyXG4gICAgICAgICAgICBlcnJvcjogYXJncy5lcnJvclxyXG5cdFx0fSk7XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5jaGVja0luc3RhbGxlZChjb250ZXh0LCBhcmdzLnJlcXVpcmVkQXBpVmVyc2lvbik7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuZ2V0VmVyc2lvbiA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnZ2V0VmVyc2lvbicsIG51bGwpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLmxpc3RDZXJ0aWZpY2F0ZXMgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cclxuXHRcdGlmICghYXJncykge1xyXG5cdFx0XHRhcmdzID0ge307XHJcblx0XHR9IGVsc2UgaWYgKGFyZ3MuZmlsdGVyKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgYXJncy5maWx0ZXIgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRpZiAodHlwZW9mIGFyZ3MuZmlsdGVyID09PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0XHRcdHRocm93ICdhcmdzLmZpbHRlciBtdXN0IGJlIGEgZnVuY3Rpb24gKGhpbnQ6IGlmIHlvdSB1c2VkIFwicGtpLmZpbHRlcnMueHh4KClcIiwgdHJ5IHJlbW92aW5nIHRoZSBcIigpXCIpJztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhyb3cgJ2FyZ3MuZmlsdGVyIG11c3QgYmUgYSBmdW5jdGlvbiwgcmVjZWl2ZWQgJyArICh0eXBlb2YgYXJncy5maWx0ZXIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdsaXN0Q2VydGlmaWNhdGVzJywgbnVsbCwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cdFx0XHRyZXR1cm4gJC5fcHJvY2Vzc0NlcnRpZmljYXRlcyhyZXN1bHQsIGFyZ3MuZmlsdGVyLCBhcmdzLnNlbGVjdElkLCBhcmdzLnNlbGVjdE9wdGlvbkZvcm1hdHRlcik7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuX3Byb2Nlc3NDZXJ0aWZpY2F0ZSA9IGZ1bmN0aW9uIChjZXJ0KSB7XHJcblx0XHRjZXJ0LnZhbGlkaXR5U3RhcnQgPSBuZXcgRGF0ZShjZXJ0LnZhbGlkaXR5U3RhcnQpO1xyXG5cdFx0Y2VydC52YWxpZGl0eUVuZCA9IG5ldyBEYXRlKGNlcnQudmFsaWRpdHlFbmQpO1xyXG5cdFx0Y2VydC5rZXlVc2FnZSA9ICQuX3Byb2Nlc3NLZXlVc2FnZShjZXJ0LmtleVVzYWdlKTtcclxuXHRcdGNlcnQuZXh0ZW5kZWRLZXlVc2FnZSA9ICQuX3Byb2Nlc3NFeHRlbmRlZEtleVVzYWdlKGNlcnQuZXh0ZW5kZWRLZXlVc2FnZSk7XHJcblx0XHRpZiAoY2VydC5wa2lCcmF6aWwgJiYgY2VydC5wa2lCcmF6aWwuZGF0ZU9mQmlydGgpIHtcclxuXHRcdFx0dmFyIHMgPSBjZXJ0LnBraUJyYXppbC5kYXRlT2ZCaXJ0aDtcclxuXHRcdFx0Y2VydC5wa2lCcmF6aWwuZGF0ZU9mQmlydGggPSBuZXcgRGF0ZShwYXJzZUludChzLnNsaWNlKDAsIDQpLCAxMCksIHBhcnNlSW50KHMuc2xpY2UoNSwgNyksIDEwKSAtIDEsIHBhcnNlSW50KHMuc2xpY2UoOCwgMTApLCAxMCkpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdCQuX3Byb2Nlc3NDZXJ0aWZpY2F0ZXMgPSBmdW5jdGlvbiAocmVzdWx0LCBmaWx0ZXIsIHNlbGVjdElkLCBzZWxlY3RPcHRpb25Gb3JtYXR0ZXIpIHtcclxuXHRcdHZhciB0b1JldHVybiA9IFtdO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGNlcnQgPSByZXN1bHRbaV07XHJcblx0XHRcdCQuX3Byb2Nlc3NDZXJ0aWZpY2F0ZShjZXJ0KTtcclxuXHRcdFx0aWYgKGZpbHRlcikge1xyXG5cdFx0XHRcdGlmIChmaWx0ZXIoY2VydCkpIHtcclxuXHRcdFx0XHRcdHRvUmV0dXJuLnB1c2goY2VydCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRvUmV0dXJuLnB1c2goY2VydCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0b1JldHVybi5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdFx0Ly8gc29ydCB0aGUgY2VydGlmaWNhdGVzIGJ5IGl0cyBzdWJqZWN0IGNvbW1vbiBuYW1lIChjYXNlIGluc2Vuc2l0aXZlKVxyXG5cdFx0XHR2YXIgYU5hbWUgPSBhLnN1YmplY3ROYW1lO1xyXG5cdFx0XHR2YXIgYk5hbWUgPSBiLnN1YmplY3ROYW1lO1xyXG5cclxuXHRcdFx0aWYgKCFhTmFtZSB8fCAhYk5hbWUpIHtcclxuXHRcdFx0XHRyZXR1cm4gIWFOYW1lICYmIGJOYW1lID8gMSA6IC0xO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRhTmFtZSA9IGFOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdGJOYW1lID0gYk5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0XHRcdGlmIChhTmFtZSA+IGJOYW1lKSB7XHJcblx0XHRcdFx0cmV0dXJuIDE7XHJcblx0XHRcdH0gZWxzZSBpZiAoYU5hbWUgPCBiTmFtZSkge1xyXG5cdFx0XHRcdHJldHVybiAtMTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBzYW1lIGNvbW1vbiBuYW1lLCBzb3J0IGJ5IHRoZSBleHBpcmF0aW9uIGRhdGUsIHRoZSBsb25nZXIgZGF0ZSwgdGhlIGZpcnN0XHJcblx0XHRcdFx0cmV0dXJuIGEudmFsaWRpdHlFbmQgPiBiLnZhbGlkaXR5RW5kID8gLTEgOiAoYS52YWxpZGl0eUVuZCA8IGIudmFsaWRpdHlFbmQgPyAxIDogMCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChzZWxlY3RJZCkge1xyXG5cdFx0XHRpZiAoIXNlbGVjdE9wdGlvbkZvcm1hdHRlcikge1xyXG5cdFx0XHRcdHNlbGVjdE9wdGlvbkZvcm1hdHRlciA9IGZ1bmN0aW9uIChjKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYy5zdWJqZWN0TmFtZSArICcgKGlzc3VlZCBieSAnICsgYy5pc3N1ZXJOYW1lICsgJyknO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdElkKTtcclxuXHRcdFx0d2hpbGUgKHNlbGVjdC5vcHRpb25zLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRzZWxlY3QucmVtb3ZlKDApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgdG9SZXR1cm4ubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHR2YXIgYyA9IHRvUmV0dXJuW2pdO1xyXG5cdFx0XHRcdHZhciBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuXHRcdFx0XHRvcHRpb24udmFsdWUgPSBjLnRodW1icHJpbnQ7XHJcblx0XHRcdFx0b3B0aW9uLnRleHQgPSBzZWxlY3RPcHRpb25Gb3JtYXR0ZXIoYyk7XHJcblx0XHRcdFx0c2VsZWN0LmFkZChvcHRpb24pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdG9SZXR1cm47XHJcblx0fTtcclxuXHJcblx0JC5fcHJvY2Vzc0tleVVzYWdlID0gZnVuY3Rpb24gKGtleVVzYWdlVmFsdWUpIHtcclxuXHQgICAgcmV0dXJuIHtcclxuXHQgICAgICAgIGNybFNpZ246IChrZXlVc2FnZVZhbHVlICYgJC5fY2VydEtleVVzYWdlcy5jcmxTaWduKSAhPT0gMCxcclxuXHQgICAgICAgIGRhdGFFbmNpcGhlcm1lbnQ6IChrZXlVc2FnZVZhbHVlICYgJC5fY2VydEtleVVzYWdlcy5kYXRhRW5jaXBoZXJtZW50KSAhPT0gMCxcclxuXHQgICAgICAgIGRlY2lwaGVyT25seTogKGtleVVzYWdlVmFsdWUgJiAkLl9jZXJ0S2V5VXNhZ2VzLmRlY2lwaGVyT25seSkgIT09IDAsXHJcblx0ICAgICAgICBkaWdpdGFsU2lnbmF0dXJlOiAoa2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRLZXlVc2FnZXMuZGlnaXRhbFNpZ25hdHVyZSkgIT09IDAsXHJcblx0ICAgICAgICBlbmNpcGhlck9ubHk6IChrZXlVc2FnZVZhbHVlICYgJC5fY2VydEtleVVzYWdlcy5lbmNpcGhlck9ubHkpICE9PSAwLFxyXG5cdCAgICAgICAga2V5QWdyZWVtZW50OiAoa2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRLZXlVc2FnZXMua2V5QWdyZWVtZW50KSAhPT0gMCxcclxuXHQgICAgICAgIGtleUNlcnRTaWduOiAoa2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRLZXlVc2FnZXMua2V5Q2VydFNpZ24pICE9PSAwLFxyXG5cdCAgICAgICAga2V5RW5jaXBoZXJtZW50OiAoa2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRLZXlVc2FnZXMua2V5RW5jaXBoZXJtZW50KSAhPT0gMCxcclxuXHQgICAgICAgIG5vblJlcHVkaWF0aW9uOiAoa2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRLZXlVc2FnZXMubm9uUmVwdWRpYXRpb24pICE9PSAwXHJcblx0ICAgIH07XHJcblx0fTtcclxuXHJcblx0JC5fcHJvY2Vzc0V4dGVuZGVkS2V5VXNhZ2UgPSBmdW5jdGlvbiAoZXh0ZW5kZWRLZXlVc2FnZVZhbHVlKSB7XHJcblx0XHRpZiAodHlwZW9mIGV4dGVuZGVkS2V5VXNhZ2VWYWx1ZSAhPT0gJ251bWJlcicpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjbGllbnRBdXRoOiAoZXh0ZW5kZWRLZXlVc2FnZVZhbHVlICYgJC5fY2VydEV4dGVuZGVkS2V5VXNhZ2VzLmNsaWVudEF1dGgpICE9PSAwLFxyXG5cdFx0XHRzZXJ2ZXJBdXRoOiAoZXh0ZW5kZWRLZXlVc2FnZVZhbHVlICYgJC5fY2VydEV4dGVuZGVkS2V5VXNhZ2VzLnNlcnZlckF1dGgpICE9PSAwLFxyXG5cdFx0XHRjb2RlU2lnbmluZzogKGV4dGVuZGVkS2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRFeHRlbmRlZEtleVVzYWdlcy5jb2RlU2lnbmluZykgIT09IDAsXHJcblx0XHRcdGVtYWlsUHJvdGVjdGlvbjogKGV4dGVuZGVkS2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRFeHRlbmRlZEtleVVzYWdlcy5lbWFpbFByb3RlY3Rpb24pICE9PSAwLFxyXG5cdFx0XHR0aW1lU3RhbXBpbmc6IChleHRlbmRlZEtleVVzYWdlVmFsdWUgJiAkLl9jZXJ0RXh0ZW5kZWRLZXlVc2FnZXMudGltZVN0YW1waW5nKSAhPT0gMCxcclxuXHRcdFx0b2NzcFNpZ25pbmc6IChleHRlbmRlZEtleVVzYWdlVmFsdWUgJiAkLl9jZXJ0RXh0ZW5kZWRLZXlVc2FnZXMub2NzcFNpZ25pbmcpICE9PSAwLFxyXG5cdFx0XHRpcHNlY0VuZFN5c3RlbTogKGV4dGVuZGVkS2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRFeHRlbmRlZEtleVVzYWdlcy5pcHNlY0VuZFN5c3RlbSkgIT09IDAsXHJcblx0XHRcdGlwc2VjVHVubmVsOiAoZXh0ZW5kZWRLZXlVc2FnZVZhbHVlICYgJC5fY2VydEV4dGVuZGVkS2V5VXNhZ2VzLmlwc2VjVHVubmVsKSAhPT0gMCxcclxuXHRcdFx0aXBzZWNVc2VyOiAoZXh0ZW5kZWRLZXlVc2FnZVZhbHVlICYgJC5fY2VydEV4dGVuZGVkS2V5VXNhZ2VzLmlwc2VjVXNlcikgIT09IDAsXHJcblx0XHRcdGFueTogKGV4dGVuZGVkS2V5VXNhZ2VWYWx1ZSAmICQuX2NlcnRFeHRlbmRlZEtleVVzYWdlcy5hbnkpICE9PSAwXHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdCQuX3Byb2Nlc3NTaWduUmVzdWx0ID0gZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cdFx0aWYgKCFyZXN1bHQgfHwgIXJlc3VsdC5zaWduYXR1cmVJbmZvKSB7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblx0XHRpZiAocmVzdWx0LnNpZ25hdHVyZUluZm8uc2lnbmVyQ2VydGlmaWNhdGUpIHtcclxuXHRcdFx0JC5fcHJvY2Vzc0NlcnRpZmljYXRlKHJlc3VsdC5zaWduYXR1cmVJbmZvLnNpZ25lckNlcnRpZmljYXRlKTtcclxuXHRcdH1cclxuXHRcdGlmIChyZXN1bHQuc2lnbmF0dXJlSW5mby5zaWduaW5nVGltZSkge1xyXG5cdFx0XHRyZXN1bHQuc2lnbmF0dXJlSW5mby5zaWduaW5nVGltZSA9IG5ldyBEYXRlKHJlc3VsdC5zaWduYXR1cmVJbmZvLnNpZ25pbmdUaW1lKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fTtcclxuXHJcblx0JC5fcHJvY2Vzc1NpZ25lck1vZGVsID0gZnVuY3Rpb24gKHNpZ25lcikge1xyXG5cdFx0aWYgKCFzaWduZXIpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHNpZ25lci5jZXJ0aWZpY2F0ZSkge1xyXG5cdFx0XHQkLl9wcm9jZXNzQ2VydGlmaWNhdGUoc2lnbmVyLmNlcnRpZmljYXRlKTtcclxuXHRcdH1cclxuXHRcdGlmIChzaWduZXIuc2lnbmluZ1RpbWUpIHtcclxuXHRcdFx0c2lnbmVyLnNpZ25pbmdUaW1lID0gbmV3IERhdGUoc2lnbmVyLnNpZ25pbmdUaW1lKTtcclxuXHRcdH1cclxuXHRcdGlmIChzaWduZXIuY2VydGlmaWVkRGF0ZVJlZmVyZW5jZSkge1xyXG5cdFx0XHRzaWduZXIuY2VydGlmaWVkRGF0ZVJlZmVyZW5jZSA9IG5ldyBEYXRlKHNpZ25lci5jZXJ0aWZpZWREYXRlUmVmZXJlbmNlKTtcclxuXHRcdH1cclxuXHRcdGlmIChzaWduZXIudGltZXN0YW1wcyAmJiBzaWduZXIudGltZXN0YW1wcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc2lnbmVyLnRpbWVzdGFtcHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgdHN0ID0gc2lnbmVyLnRpbWVzdGFtcHNbaV07XHJcblx0XHRcdFx0JC5fcHJvY2Vzc09wZW5SZXN1bHQodHN0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdCQuX3Byb2Nlc3NPcGVuUmVzdWx0ID0gZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cdFx0aWYgKCFyZXN1bHQgfHwgIXJlc3VsdC5zaWduZXJzIHx8IHJlc3VsdC5zaWduZXJzLmxlbmd0aCA8PSAwKSB7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblx0XHQvLyBjYXNlIGlzIGEgQ2FkZXNUaW1lc3RhbXBNb2RlbFxyXG5cdFx0aWYgKHJlc3VsdC5nZW5UaW1lKSB7XHJcblx0XHRcdHJlc3VsdC5nZW5UaW1lID0gbmV3IERhdGUocmVzdWx0LmdlblRpbWUpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQuc2lnbmVycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgc2lnbmVyID0gcmVzdWx0LnNpZ25lcnNbaV07XHJcblx0XHRcdCQuX3Byb2Nlc3NTaWduZXJNb2RlbChzaWduZXIpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9O1xyXG5cclxuXHQkLmZpbHRlcnMgPSB7XHJcblx0XHRpc1BraUJyYXppbFBlc3NvYUZpc2ljYTogZnVuY3Rpb24gKGNlcnQpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBjZXJ0ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0dGhyb3cgJ2ZpbHRlciBjYWxsZWQgd2l0aG91dCBjZXJ0IGFyZ3VtZW50IChoaW50OiBpZiB5b3UgYXJlIHVzaW5nIFwicGtpLmZpbHRlcnMuaXNQa2lCcmF6aWxQZXNzb2FGaXNpY2EoKVwiLCB0cnkgXCJwa2kuZmlsdGVycy5pc1BraUJyYXppbFBlc3NvYUZpc2ljYVwiKSc7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIChjZXJ0LnBraUJyYXppbCAmJiAoY2VydC5wa2lCcmF6aWwuY3BmIHx8ICcnKSAhPT0gJycgJiYgKGNlcnQucGtpQnJhemlsLmNucGogfHwgJycpID09PSAnJyk7XHJcblx0XHR9LFxyXG5cdFx0aGFzUGtpQnJhemlsQ3BmOiBmdW5jdGlvbiAoY2VydCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIGNlcnQgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHR0aHJvdyAnZmlsdGVyIGNhbGxlZCB3aXRob3V0IGNlcnQgYXJndW1lbnQgKGhpbnQ6IGlmIHlvdSBhcmUgdXNpbmcgXCJwa2kuZmlsdGVycy5oYXNQa2lCcmF6aWxDcGYoKVwiLCB0cnkgXCJwa2kuZmlsdGVycy5oYXNQa2lCcmF6aWxDcGZcIiknO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiAoY2VydC5wa2lCcmF6aWwgJiYgKGNlcnQucGtpQnJhemlsLmNwZiB8fCAnJykgIT09ICcnKTtcclxuXHRcdH0sXHJcblx0XHRoYXNQa2lCcmF6aWxDbnBqOiBmdW5jdGlvbiAoY2VydCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIGNlcnQgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHR0aHJvdyAnZmlsdGVyIGNhbGxlZCB3aXRob3V0IGNlcnQgYXJndW1lbnQgKGhpbnQ6IGlmIHlvdSBhcmUgdXNpbmcgXCJwa2kuZmlsdGVycy5oYXNQa2lCcmF6aWxDbnBqKClcIiwgdHJ5IFwicGtpLmZpbHRlcnMuaGFzUGtpQnJhemlsQ25walwiKSc7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIChjZXJ0LnBraUJyYXppbCAmJiAoY2VydC5wa2lCcmF6aWwuY25waiB8fCAnJykgIT09ICcnKTtcclxuXHRcdH0sXHJcblx0XHRwa2lCcmF6aWxDcGZFcXVhbHM6IGZ1bmN0aW9uIChjcGYpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBjcGYgIT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0dGhyb3cgJ2NwZiBtdXN0IGJlIGEgc3RyaW5nIChoaW50OiBpZiB5b3UgYXJlIHVzaW5nIFwicGtpLmZpbHRlcnMucGtpQnJhemlsQ3BmRXF1YWxzXCIsIHRyeSBcInBraS5maWx0ZXJzLnBraUJyYXppbENwZkVxdWFscygnICsgXCInXCIgKyAnc29tZWNwZicgKyBcIidcIiArICcpXCIpJztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGNlcnQpIHtcclxuXHRcdFx0XHRyZXR1cm4gKGNlcnQucGtpQnJhemlsICYmIGNlcnQucGtpQnJhemlsLmNwZiA9PT0gY3BmKTtcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRwa2lCcmF6aWxDbnBqRXF1YWxzOiBmdW5jdGlvbiAoY25waikge1xyXG5cdFx0XHRpZiAodHlwZW9mIGNucGogIT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0dGhyb3cgJ2NucGogbXVzdCBiZSBhIHN0cmluZyAoaGludDogaWYgeW91IGFyZSB1c2luZyBcInBraS5maWx0ZXJzLnBraUJyYXppbENucGpFcXVhbHNcIiwgdHJ5IFwicGtpLmZpbHRlcnMucGtpQnJhemlsQ25wakVxdWFscygnICsgXCInXCIgKyAnc29tZWNucGonICsgXCInXCIgKycpXCIpJztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGNlcnQpIHtcclxuXHRcdFx0XHRyZXR1cm4gKGNlcnQucGtpQnJhemlsICYmIGNlcnQucGtpQnJhemlsLmNucGogPT09IGNucGopO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdGhhc1BraUl0YWx5Q29kaWNlRmlzY2FsZTogZnVuY3Rpb24gKGNlcnQpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBjZXJ0ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0dGhyb3cgJ2ZpbHRlciBjYWxsZWQgd2l0aG91dCBjZXJ0IGFyZ3VtZW50IChoaW50OiBpZiB5b3UgYXJlIHVzaW5nIFwicGtpLmZpbHRlcnMuaGFzUGtpSXRhbHlDb2RpY2VGaXNjYWxlKClcIiwgdHJ5IFwicGtpLmZpbHRlcnMuaGFzUGtpSXRhbHlDb2RpY2VGaXNjYWxlXCIpJztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gKGNlcnQucGtpSXRhbHkgJiYgKGNlcnQucGtpSXRhbHkuY29kaWNlRmlzY2FsZSB8fCAnJykgIT09ICcnKTtcclxuXHRcdH0sXHJcblx0XHRwa2lJdGFseUNvZGljZUZpc2NhbGVFcXVhbHM6IGZ1bmN0aW9uIChjZikge1xyXG5cdFx0XHRpZiAodHlwZW9mIGNmICE9PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdHRocm93ICdjZiBtdXN0IGJlIGEgc3RyaW5nIChoaW50OiBpZiB5b3UgYXJlIHVzaW5nIFwicGtpLmZpbHRlcnMucGtpSXRhbHlDb2RpY2VGaXNjYWxlRXF1YWxzXCIsIHRyeSBcInBraS5maWx0ZXJzLnBraUl0YWx5Q29kaWNlRmlzY2FsZUVxdWFscygnICsgXCInXCIgKyAnc29tZUNvZGljZScgKyBcIidcIiArICcpXCIpJztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGNlcnQpIHtcclxuXHRcdFx0XHRyZXR1cm4gKGNlcnQucGtpSXRhbHkgJiYgY2VydC5wa2lJdGFseS5jb2RpY2VGaXNjYWxlID09PSBjZik7XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0aXNXaXRoaW5WYWxpZGl0eTogZnVuY3Rpb24gKGNlcnQpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBjZXJ0ID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0dGhyb3cgJ2ZpbHRlciBjYWxsZWQgd2l0aG91dCBjZXJ0IGFyZ3VtZW50IChoaW50OiBpZiB5b3UgYXJlIHVzaW5nIFwicGtpLmZpbHRlcnMuaXNXaXRoaW5WYWxpZGl0eSgpXCIsIHRyeSBcInBraS5maWx0ZXJzLmlzV2l0aGluVmFsaWRpdHlcIiknO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0XHRyZXR1cm4gKGNlcnQudmFsaWRpdHlTdGFydCA8PSBub3cgJiYgbm93IDw9IGNlcnQudmFsaWRpdHlFbmQpO1xyXG5cdFx0fSxcclxuXHRcdGFsbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgZmlsdGVycztcclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHRmaWx0ZXJzID0gYXJndW1lbnRzWzBdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGZpbHRlcnMgPSBhcmd1bWVudHM7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChjZXJ0KSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHR2YXIgZmlsdGVyID0gZmlsdGVyc1tpXTtcclxuXHRcdFx0XHRcdGlmICghZmlsdGVyKGNlcnQpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0YW55OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBmaWx0ZXJzO1xyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdGZpbHRlcnMgPSBhcmd1bWVudHNbMF07XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZmlsdGVycyA9IGFyZ3VtZW50cztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGNlcnQpIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpbHRlcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdHZhciBmaWx0ZXIgPSBmaWx0ZXJzW2ldO1xyXG5cdFx0XHRcdFx0aWYgKGZpbHRlcihjZXJ0KSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdCQucmVhZENlcnRpZmljYXRlID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHJcblx0XHRpZiAodHlwZW9mIGFyZ3MgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdGFyZ3MgPSB7XHJcblx0XHRcdFx0dGh1bWJwcmludDogYXJnc1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdyZWFkQ2VydGlmaWNhdGUnLCB7IGNlcnRpZmljYXRlVGh1bWJwcmludDogYXJncy50aHVtYnByaW50IH0pO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLnBvbGxOYXRpdmUgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0aWYgKCFhcmdzKSB7XHJcblx0XHRcdGFyZ3MgPSB7fTtcclxuXHRcdH1cclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciBhcGlWZXJzaW9uID0gYXJncy5yZXF1aXJlZEFwaVZlcnNpb247XHJcblxyXG5cdFx0aWYgKCFhcGlWZXJzaW9uKSB7XHJcblx0XHRcdGFwaVZlcnNpb24gPSAkLmFwaVZlcnNpb25zLmxhdGVzdDtcclxuXHRcdH1cclxuXHRcdGlmICghJC5fYXBpTWFwLm5hdGl2ZVdpblthcGlWZXJzaW9uXSkge1xyXG5cdFx0XHR0aHJvdyAnVW5rbm93biBKU2xpYiBBUEkgdmVyc2lvbjogJyArIGFwaVZlcnNpb247XHJcblx0XHR9XHJcblxyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ3BvbGxOYXRpdmUnLCB7XHJcbiAgICAgICAgICAgIHJlcXVpcmVkTmF0aXZlV2luVmVyc2lvbjogICAkLl9hcGlNYXAubmF0aXZlV2luW2FwaVZlcnNpb25dLFxyXG4gICAgICAgICAgICByZXF1aXJlZE5hdGl2ZUxpbnV4VmVyc2lvbjogJC5fYXBpTWFwLm5hdGl2ZUxpbnV4W2FwaVZlcnNpb25dLFxyXG4gICAgICAgICAgICByZXF1aXJlZE5hdGl2ZU1hY1ZlcnNpb246ICAgJC5fYXBpTWFwLm5hdGl2ZU1hY1thcGlWZXJzaW9uXVxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuc2lnbkhhc2ggPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0dmFyIHJlcXVlc3QgPSB7XHJcblx0XHRcdGNlcnRpZmljYXRlVGh1bWJwcmludDogYXJncy50aHVtYnByaW50LFxyXG5cdFx0XHRoYXNoOiBhcmdzLmhhc2gsXHJcblx0XHRcdGRpZ2VzdEFsZ29yaXRobTogYXJncy5kaWdlc3RBbGdvcml0aG1cclxuXHRcdH07XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnc2lnbkhhc2gnLCByZXF1ZXN0KTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5zaWduRGF0YSA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgcmVxdWVzdCA9IHtcclxuXHRcdFx0Y2VydGlmaWNhdGVUaHVtYnByaW50OiBhcmdzLnRodW1icHJpbnQsXHJcblx0XHRcdGRhdGE6IGFyZ3MuZGF0YSxcclxuXHRcdFx0ZGlnZXN0QWxnb3JpdGhtOiBhcmdzLmRpZ2VzdEFsZ29yaXRobVxyXG5cdFx0fTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdzaWduRGF0YScsIHJlcXVlc3QpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLmtleVNpZ25IYXNoID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0ge1xyXG5cdFx0XHRwcml2YXRlS2V5SWQ6IGFyZ3MucHJpdmF0ZUtleUlkLFxyXG5cdFx0XHRoYXNoOiBhcmdzLmhhc2gsXHJcblx0XHRcdGRpZ2VzdEFsZ29yaXRobTogYXJncy5kaWdlc3RBbGdvcml0aG0sXHJcblx0XHRcdHBrY3MxMU1vZHVsZXM6ICQuX2dldFJlcXVlc3RPc1AxMU1vZHVsZXMoYXJncy5wa2NzMTFNb2R1bGVzKSxcclxuXHRcdFx0dG9rZW5TZXJpYWxOdW1iZXI6IGFyZ3MudG9rZW5TZXJpYWxOdW1iZXJcclxuXHRcdH07XHJcblx0XHQkLl9oYW5kbGVQMTFNb2R1bGVzQXJncyhhcmdzLCByZXF1ZXN0KTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdrZXlTaWduSGFzaCcsIHJlcXVlc3QpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLmtleVNpZ25EYXRhID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0ge1xyXG5cdFx0XHRwcml2YXRlS2V5SWQ6IGFyZ3MucHJpdmF0ZUtleUlkLFxyXG5cdFx0XHRkYXRhOiBhcmdzLmRhdGEsXHJcblx0XHRcdGRpZ2VzdEFsZ29yaXRobTogYXJncy5kaWdlc3RBbGdvcml0aG0sXHJcblx0XHRcdHBrY3MxMU1vZHVsZXM6ICQuX2dldFJlcXVlc3RPc1AxMU1vZHVsZXMoYXJncy5wa2NzMTFNb2R1bGVzKSxcclxuXHRcdFx0dG9rZW5TZXJpYWxOdW1iZXI6IGFyZ3MudG9rZW5TZXJpYWxOdW1iZXJcclxuXHRcdH07XHJcblx0XHQkLl9oYW5kbGVQMTFNb2R1bGVzQXJncyhhcmdzLCByZXF1ZXN0KTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdrZXlTaWduRGF0YScsIHJlcXVlc3QpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLnNpZ25XaXRoUmVzdFBraSA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0ICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHQgICAgdmFyIHJlcXVlc3QgPSB7XHJcblx0ICAgICAgICBjZXJ0aWZpY2F0ZVRodW1icHJpbnQ6IGFyZ3MudGh1bWJwcmludCxcclxuXHQgICAgICAgIHRva2VuOiBhcmdzLnRva2VuLFxyXG4gICAgICAgICAgICByZXN0UGtpVXJsOiB0aGlzLnJlc3RQa2lVcmxcclxuXHQgICAgfTtcclxuXHQgICAgJC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ3NpZ25XaXRoUmVzdFBraScsIHJlcXVlc3QpO1xyXG5cdCAgICByZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuc2lnbkhhc2hCYXRjaCA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgcmVxdWVzdCA9IHtcclxuXHRcdFx0Y2VydGlmaWNhdGVUaHVtYnByaW50OiBhcmdzLmNlcnRpZmljYXRlVGh1bWJwcmludCxcclxuXHRcdFx0ZGlnZXN0QWxnb3JpdGhtOiBhcmdzLmRpZ2VzdEFsZ29yaXRobSxcclxuXHRcdFx0dXNlUHJlYXV0aG9yaXplZFNpZ25hdHVyZXM6IGFyZ3MudXNlUHJlYXV0aG9yaXplZFNpZ25hdHVyZXMsXHJcblx0XHRcdGJhdGNoOiBhcmdzLmJhdGNoXHJcblx0XHR9O1xyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ3NpZ25IYXNoQmF0Y2gnLCByZXF1ZXN0KTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5zaWduSGFzaGVzID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0ge1xyXG5cdFx0XHRjZXJ0aWZpY2F0ZVRodW1icHJpbnQ6IGFyZ3MuY2VydGlmaWNhdGVUaHVtYnByaW50LFxyXG5cdFx0XHRoYXNoZXM6IGFyZ3MuaGFzaGVzXHJcblx0XHR9O1xyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ3NpZ25IYXNoZXMnLCByZXF1ZXN0KTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5wcmVhdXRob3JpemVTaWduYXR1cmVzID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHJcblx0XHRpZiAoIWFyZ3MpIHtcclxuXHRcdFx0YXJncyA9IHt9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0ge1xyXG5cdFx0XHRjZXJ0aWZpY2F0ZVRodW1icHJpbnQ6IGFyZ3MuY2VydGlmaWNhdGVUaHVtYnByaW50LFxyXG5cdFx0XHRzaWduYXR1cmVDb3VudDogYXJncy5zaWduYXR1cmVDb3VudFxyXG5cdFx0fTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdwcmVhdXRob3JpemVTaWduYXR1cmVzJywgcmVxdWVzdCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuc2hvd0ZvbGRlckJyb3dzZXIgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cclxuXHRcdGlmICghYXJncykge1xyXG5cdFx0XHRhcmdzID0ge307XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBhcmdzID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRhcmdzID0ge1xyXG5cdFx0XHRcdG1lc3NhZ2U6IGFyZ3NcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgcmVxdWVzdCA9IHtcclxuXHRcdFx0bWVzc2FnZTogYXJncy5tZXNzYWdlXHJcblx0XHR9O1xyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ3Nob3dGb2xkZXJCcm93c2VyJywgcmVxdWVzdCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuc2hvd0ZpbGVCcm93c2VyID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHJcblx0ICAgIGlmICghYXJncykge1xyXG5cdCAgICAgICAgYXJncyA9IHt9O1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0ICAgIHZhciByZXF1ZXN0ID0ge1xyXG5cdCAgICAgICAgbXVsdGlzZWxlY3Q6IGFyZ3MubXVsdGlzZWxlY3QsXHJcbiAgICAgICAgICAgIGZpbHRlcnM6IGFyZ3MuZmlsdGVycyxcclxuICAgICAgICAgICAgZGlhbG9nVGl0bGU6IGFyZ3MuZGlhbG9nVGl0bGVcclxuXHQgICAgfTtcclxuXHQgICAgJC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ3Nob3dGaWxlQnJvd3NlcicsIHJlcXVlc3QpO1xyXG5cdCAgICByZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuZG93bmxvYWRUb0ZvbGRlciA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblxyXG5cdFx0aWYgKCFhcmdzKSB7XHJcblx0XHRcdGFyZ3MgPSB7fTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdXJsID0gYXJncy51cmwgfHwgJyc7XHJcblx0XHRpZiAodXJsLmluZGV4T2YoJzovLycpIDwgMCkge1xyXG5cdFx0XHR2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0YS5ocmVmID0gdXJsO1xyXG5cdFx0XHR1cmwgPSBhLmhyZWY7XHJcblx0XHR9XHJcblx0XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgcmVxdWVzdCA9IHtcclxuXHRcdFx0dXJsOiB1cmwsXHJcblx0XHRcdGZvbGRlcklkOiBhcmdzLmZvbGRlcklkLFxyXG5cdFx0XHRmaWxlbmFtZTogYXJncy5maWxlbmFtZVxyXG5cdFx0fTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdkb3dubG9hZFRvRm9sZGVyJywgcmVxdWVzdCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQub3BlbkZvbGRlciA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblxyXG5cdFx0aWYgKCFhcmdzKSB7XHJcblx0XHRcdGFyZ3MgPSB7fTtcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGFyZ3MgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdGFyZ3MgPSB7XHJcblx0XHRcdFx0Zm9sZGVySWQ6IGFyZ3NcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnb3BlbkZvbGRlcicsIGFyZ3MuZm9sZGVySWQpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLm9wZW5GaWxlID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHJcblx0ICAgIGlmICghYXJncykge1xyXG5cdCAgICAgICAgYXJncyA9IHt9O1xyXG5cdCAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzID09PSAnc3RyaW5nJykge1xyXG5cdCAgICAgICAgYXJncyA9IHtcclxuXHQgICAgICAgICAgICBmaWxlSWQ6IGFyZ3NcclxuXHQgICAgICAgIH07XHJcblx0ICAgIH1cclxuXHJcblx0ICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHQgICAgJC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ29wZW5GaWxlJywgYXJncy5maWxlSWQpO1xyXG5cdCAgICByZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQucmVkaXJlY3RUb0luc3RhbGxQYWdlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0ZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICQuX2luc3RhbGxVcmwgKyAodGhpcy5icmFuZCB8fCAnJykgKyAnP3JldHVyblVybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LlVSTCkgKyAnJmpzbGliPScgKyAkLl9qc2xpYlZlcnNpb247XHJcblx0fTtcclxuXHJcblx0JC51cGRhdGVFeHRlbnNpb24gPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0aWYgKCFhcmdzKSB7XHJcblx0XHRcdGFyZ3MgPSB7fTtcclxuXHRcdH1cclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICd1cGRhdGVFeHRlbnNpb24nLCBudWxsKTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0ICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIFdlYiBQS0kgUHJvIGZ1bmN0aW9ucyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHQkLl9jcmVhdGVDb21tb25TaWduZXJSZXF1ZXN0ID0gZnVuY3Rpb24oYXJncykge1xyXG5cdFx0aWYgKCFhcmdzLm91dHB1dCkge1xyXG5cdFx0XHR0aHJvdyAnQW4gb3V0cHV0IHBhcmFtZXRlciBtdXN0IGJlIHBhc3NlZCB0byBzaWduZXIgbWV0aG9kcyc7XHJcblx0XHR9XHJcblx0ICAgIHJldHVybiB7XHJcblx0ICAgIFx0ZmlsZUlkOiBhcmdzLmZpbGVJZCxcclxuXHQgICAgXHRjb250ZW50OiBhcmdzLmNvbnRlbnQsXHJcblx0ICAgICAgICBjZXJ0aWZpY2F0ZVRodW1icHJpbnQ6IGFyZ3MuY2VydGlmaWNhdGVUaHVtYnByaW50LFxyXG5cdCAgICAgICAgb3V0cHV0OiB7XHJcblx0ICAgICAgICAgICAgbW9kZTogYXJncy5vdXRwdXQubW9kZSxcclxuXHQgICAgICAgICAgICBmb2xkZXJJZDogYXJncy5vdXRwdXQuZm9sZGVySWQsXHJcblx0ICAgICAgICAgICAgZGlhbG9nVGl0bGU6IGFyZ3Mub3V0cHV0LmRpYWxvZ1RpdGxlLFxyXG5cdCAgICAgICAgICAgIGZpbGVOYW1lU3VmZml4OiBhcmdzLm91dHB1dC5maWxlTmFtZVN1ZmZpeFxyXG5cdCAgICAgICAgfSxcclxuICAgICAgICAgICAgdHJ1c3RBcmJpdHJhdG9yczogYXJncy50cnVzdEFyYml0cmF0b3JzLFxyXG5cdFx0XHRjbGVhclBvbGljeVRydXN0QXJiaXRyYXRvcnM6IGFyZ3MuY2xlYXJQb2xpY3lUcnVzdEFyYml0cmF0b3JzLFxyXG5cdFx0XHRjZXJ0aWZpY2F0ZVZhbGlkYXRpb25MZXZlbDogYXJncy5jZXJ0aWZpY2F0ZVZhbGlkYXRpb25MZXZlbCxcclxuXHRcdFx0dGltZXN0YW1wUmVxdWVzdGVyOiBhcmdzLnRpbWVzdGFtcFJlcXVlc3RlcixcclxuXHRcdFx0cG9saWN5OiBhcmdzLnBvbGljeVxyXG5cdFx0fTtcclxuXHR9O1xyXG5cdFxyXG5cdCQuc2lnblBkZiA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0ICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHQgICAgdmFyIHJlcXVlc3QgPSAkLl9jcmVhdGVDb21tb25TaWduZXJSZXF1ZXN0KGFyZ3MpO1xyXG4gICAgICAgIHJlcXVlc3QudmlzdWFsUmVwcmVzZW50YXRpb24gPSBhcmdzLnZpc3VhbFJlcHJlc2VudGF0aW9uO1xyXG4gICAgICAgIHJlcXVlc3QucGRmTWFya3MgPSBhcmdzLnBkZk1hcmtzO1xyXG4gICAgICAgIHJlcXVlc3QuYnlwYXNzTWFya3NJZlNpZ25lZCA9IGFyZ3MuYnlwYXNzTWFya3NJZlNpZ25lZDtcclxuXHRcdHJlcXVlc3QucmVhc29uID0gYXJncy5yZWFzb247XHJcblx0XHRyZXF1ZXN0LmxvY2F0aW9uID0gYXJncy5sb2NhdGlvbjtcclxuXHRcdHJlcXVlc3Quc2lnbmVyTmFtZSA9IGFyZ3Muc2lnbmVyTmFtZTtcclxuXHRcdHJlcXVlc3QuY3VzdG9tU2lnbmF0dXJlRmllbGROYW1lID0gYXJncy5jdXN0b21TaWduYXR1cmVGaWVsZE5hbWU7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBhcmdzLm1ldGFkYXRhID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXF1ZXN0Lm1ldGFkYXRhID0ge307XHJcblx0XHRcdHZhciBtZXRhS2V5cyA9IE9iamVjdC5rZXlzKGFyZ3MubWV0YWRhdGEpO1xyXG5cdFx0XHRmb3IgKHZhciBpPTA7IGk8bWV0YUtleXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgY3VyS2V5ID0gbWV0YUtleXNbaV07XHJcblx0XHRcdFx0Ly8gZW5zdXJlIHN0cmluZyB2YWx1ZXMgb25seVxyXG5cdFx0XHRcdGlmICh0eXBlb2YgYXJncy5tZXRhZGF0YVtjdXJLZXldICE9ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHR0aHJvdyAnT25seSBzdHJpbmcgdmFsdWVzIGFsbG93ZWQgb24gbWV0YWRhdGEgZGljdGlvbmFyeS4gRm91bmQgdHlwZSAnICsgdHlwZW9mIGFyZ3MubWV0YWRhdGFbY3VyS2V5XSArICc6ICcgKyBjdXJLZXkgKyAnOicgKyBhcmdzLm1ldGFkYXRhW2N1cktleV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlcXVlc3QubWV0YWRhdGFbY3VyS2V5XSA9IGFyZ3MubWV0YWRhdGFbY3VyS2V5XTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHQgICAgaWYgKHJlcXVlc3QudmlzdWFsUmVwcmVzZW50YXRpb24gJiYgcmVxdWVzdC52aXN1YWxSZXByZXNlbnRhdGlvbi5pbWFnZSAmJiByZXF1ZXN0LnZpc3VhbFJlcHJlc2VudGF0aW9uLmltYWdlLnJlc291cmNlICYmICFyZXF1ZXN0LnZpc3VhbFJlcHJlc2VudGF0aW9uLmltYWdlLnJlc291cmNlLmNvbnRlbnQgJiYgcmVxdWVzdC52aXN1YWxSZXByZXNlbnRhdGlvbi5pbWFnZS5yZXNvdXJjZS51cmwgJiYgIS9eKGh0dHBzPzopP1xcL1xcLy8uZXhlYyhyZXF1ZXN0LnZpc3VhbFJlcHJlc2VudGF0aW9uLmltYWdlLnJlc291cmNlLnVybCkpIHtcclxuXHQgICAgICAgICQuX2Rvd25sb2FkUmVzb3VyY2UocmVxdWVzdC52aXN1YWxSZXByZXNlbnRhdGlvbi5pbWFnZS5yZXNvdXJjZS51cmwsIGZ1bmN0aW9uIChyZXNvdXJjZSkge1xyXG5cdCAgICAgICAgICAgIHJlcXVlc3QudmlzdWFsUmVwcmVzZW50YXRpb24uaW1hZ2UucmVzb3VyY2UgPSByZXNvdXJjZTtcclxuXHQgICAgICAgICAgICAkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnc2lnblBkZicsIHJlcXVlc3QsICQuX3Byb2Nlc3NTaWduUmVzdWx0KTtcclxuXHQgICAgICAgIH0pO1xyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgJC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ3NpZ25QZGYnLCByZXF1ZXN0LCAkLl9wcm9jZXNzU2lnblJlc3VsdCk7XHJcblx0ICAgIH1cclxuXHQgICAgcmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLnNpZ25DYWRlcyA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0ICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHQgICAgdmFyIHJlcXVlc3QgPSAkLl9jcmVhdGVDb21tb25TaWduZXJSZXF1ZXN0KGFyZ3MpO1xyXG4gICAgICAgIHJlcXVlc3QuY21zVG9Db3NpZ25GaWxlSWQgPSBhcmdzLmNtc1RvQ29zaWduRmlsZUlkO1xyXG5cdFx0cmVxdWVzdC5jbXNUb0Nvc2lnbkNvbnRlbnQgPSBhcmdzLmNtc1RvQ29zaWduQ29udGVudDtcclxuICAgICAgICByZXF1ZXN0LmF1dG9EZXRlY3RDb3NpZ24gPSBhcmdzLmF1dG9EZXRlY3RDb3NpZ247XHJcbiAgICAgICAgcmVxdWVzdC5pbmNsdWRlRW5jYXBzdWxhdGVkQ29udGVudCA9IGFyZ3MuaW5jbHVkZUVuY2Fwc3VsYXRlZENvbnRlbnQgPT09IG51bGwgfHwgYXJncy5pbmNsdWRlRW5jYXBzdWxhdGVkQ29udGVudCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFyZ3MuaW5jbHVkZUVuY2Fwc3VsYXRlZENvbnRlbnQ7XHJcblx0XHRyZXF1ZXN0LnNpZ25pbmdEZXNjcmlwdGlvbiA9IGFyZ3Muc2lnbmluZ0Rlc2NyaXB0aW9uO1xyXG5cdCAgICBcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdzaWduQ2FkZXMnLCByZXF1ZXN0LCAkLl9wcm9jZXNzU2lnblJlc3VsdCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuc2lnbkZ1bGxYbWwgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0dmFyIHJlcXVlc3QgPSAkLl9jcmVhdGVDb21tb25TaWduZXJSZXF1ZXN0KGFyZ3MpO1xyXG5cdFx0cmVxdWVzdC5zaWduZXJUeXBlID0gJ2Z1bGxYbWwnO1xyXG5cclxuXHRcdCQuX3NpZ25YbWxDb21tb24oYXJncywgcmVxdWVzdCwgY29udGV4dCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuc2lnblhtbEVsZW1lbnQgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0dmFyIHJlcXVlc3QgPSAkLl9jcmVhdGVDb21tb25TaWduZXJSZXF1ZXN0KGFyZ3MpO1xyXG5cdFx0cmVxdWVzdC5zaWduZXJUeXBlID0gJ3htbEVsZW1lbnQnO1xyXG5cdFx0cmVxdWVzdC50b1NpZ25FbGVtZW50SWQgPSBhcmdzLnRvU2lnbkVsZW1lbnRJZDtcclxuXHRcdHJlcXVlc3QudG9TaWduRWxlbWVudHNJZHMgPSBhcmdzLnRvU2lnbkVsZW1lbnRzSWRzO1xyXG5cdFx0cmVxdWVzdC50b1NpZ25FbGVtZW50c1hQYXRoID0gYXJncy50b1NpZ25FbGVtZW50c1hQYXRoO1xyXG5cdFx0cmVxdWVzdC5pZFJlc29sdXRpb25UYWJsZSA9IGFyZ3MuaWRSZXNvbHV0aW9uVGFibGU7XHJcblxyXG5cdFx0JC5fc2lnblhtbENvbW1vbihhcmdzLCByZXF1ZXN0LCBjb250ZXh0KTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5fc2lnblhtbENvbW1vbiA9IGZ1bmN0aW9uIChhcmdzLCByZXF1ZXN0LCBjb250ZXh0KSB7XHJcblx0XHRyZXF1ZXN0LnNpZ25hdHVyZUVsZW1lbnRJZCA9IGFyZ3Muc2lnbmF0dXJlRWxlbWVudElkO1xyXG5cdFx0cmVxdWVzdC5zaWduaW5nRGVzY3JpcHRpb24gPSBhcmdzLnNpZ25pbmdEZXNjcmlwdGlvbjtcclxuXHJcblx0XHRpZiAoYXJncy5zaWduYXR1cmVFbGVtZW50TG9jYXRpb24pIHtcclxuXHRcdFx0cmVxdWVzdC5zaWduYXR1cmVFbGVtZW50TG9jYXRpb24gPSB7XHJcblx0XHRcdFx0eHBhdGg6IGFyZ3Muc2lnbmF0dXJlRWxlbWVudExvY2F0aW9uLnhwYXRoLFxyXG5cdFx0XHRcdGluc2VydGlvbk9wdGlvbjogYXJncy5zaWduYXR1cmVFbGVtZW50TG9jYXRpb24uaW5zZXJ0aW9uT3B0aW9uXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0XHRyZXF1ZXN0Lm5hbWVzcGFjZXMgPSBhcmdzLm5hbWVzcGFjZXM7XHJcblxyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ3NpZ25YbWwnLCByZXF1ZXN0LCAkLl9wcm9jZXNzU2lnblJlc3VsdCk7XHJcblx0fTtcclxuXHJcblx0JC5fY3JlYXRlQ29tbW9uT3BlblJlcXVlc3QgPSBmdW5jdGlvbihhcmdzKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzaWduYXR1cmVGaWxlSWQ6IGFyZ3Muc2lnbmF0dXJlRmlsZUlkLFxyXG5cdCAgICBcdHNpZ25hdHVyZUNvbnRlbnQ6IGFyZ3Muc2lnbmF0dXJlQ29udGVudCxcclxuICAgICAgICAgICAgdmFsaWRhdGU6IGFyZ3MudmFsaWRhdGUsXHJcbiAgICAgICAgICAgIGRhdGVSZWZlcmVuY2U6IGFyZ3MuZGF0ZVJlZmVyZW5jZSxcclxuXHQgICAgICAgIHRydXN0QXJiaXRyYXRvcnM6IGFyZ3MudHJ1c3RBcmJpdHJhdG9ycyxcclxuXHQgICAgICAgIGNsZWFyUG9saWN5VHJ1c3RBcmJpdHJhdG9yczogYXJncy5jbGVhclBvbGljeVRydXN0QXJiaXRyYXRvcnMsXHJcblx0ICAgICAgICBzcGVjaWZpY1BvbGljeTogYXJncy5zcGVjaWZpY1BvbGljeVxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHQkLm9wZW5QYWRlcyA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0ICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHQgICAgdmFyIHJlcXVlc3QgPSAkLl9jcmVhdGVDb21tb25PcGVuUmVxdWVzdChhcmdzKTtcclxuXHQgICAgXHRcclxuXHQgICAgJC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ29wZW5QYWRlcycsIHJlcXVlc3QsICQuX3Byb2Nlc3NPcGVuUmVzdWx0KTtcclxuXHQgICAgcmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLm9wZW5DYWRlcyA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0ICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHQgICAgdmFyIHJlcXVlc3QgPSAkLl9jcmVhdGVDb21tb25PcGVuUmVxdWVzdChhcmdzKTtcclxuICAgIFx0cmVxdWVzdC5vcmlnaW5hbEZpbGVJZCA9IGFyZ3Mub3JpZ2luYWxGaWxlSWQ7XHJcbiAgICBcdHJlcXVlc3Qub3JpZ2luYWxDb250ZW50ID0gYXJncy5vcmlnaW5hbENvbnRlbnQ7XHJcbiAgICAgICAgcmVxdWVzdC5hY2NlcHRhYmxlUG9saWNpZXMgPSBhcmdzLmFjY2VwdGFibGVQb2xpY2llcztcclxuXHRcdHJlcXVlc3QucmV0dXJuRW5jYXBzdWxhdGVkQ29udGVudCA9IGFyZ3MucmV0dXJuRW5jYXBzdWxhdGVkQ29udGVudDtcclxuXHJcblx0ICAgICQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdvcGVuQ2FkZXMnLCByZXF1ZXN0LCAkLl9wcm9jZXNzT3BlblJlc3VsdCk7XHJcblx0ICAgIHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5vcGVuWG1sU2lnbmF0dXJlID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0gJC5fY3JlYXRlQ29tbW9uT3BlblJlcXVlc3QoYXJncyk7XHJcblx0XHRyZXF1ZXN0LmlkUmVzb2x1dGlvblRhYmxlID0gYXJncy5pZFJlc29sdXRpb25UYWJsZTtcclxuXHRcdHJlcXVlc3QuYWNjZXB0YWJsZVBvbGljaWVzID0gYXJncy5hY2NlcHRhYmxlUG9saWNpZXM7XHJcblxyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ29wZW5YbWxTaWduYXR1cmUnLCByZXF1ZXN0LCAkLl9wcm9jZXNzT3BlblJlc3VsdCk7XHJcblx0ICAgIHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblxyXG5cdCQubGlzdFRva2VucyA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0ge1xyXG5cdFx0XHRwa2NzMTFNb2R1bGVzOiAkLl9nZXRSZXF1ZXN0T3NQMTFNb2R1bGVzKGFyZ3MucGtjczExTW9kdWxlcylcclxuXHRcdH07XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnbGlzdFRva2VucycsIHJlcXVlc3QpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLmdlbmVyYXRlVG9rZW5Sc2FLZXlQYWlyID0gZnVuY3Rpb24oYXJncykge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0dmFyIHJlcXVlc3QgPSB7XHJcblx0XHRcdHBrY3MxMU1vZHVsZXM6ICQuX2dldFJlcXVlc3RPc1AxMU1vZHVsZXMoYXJncy5wa2NzMTFNb2R1bGVzKSxcclxuXHRcdFx0c3ViamVjdE5hbWU6IGFyZ3Muc3ViamVjdE5hbWUsXHJcblx0XHRcdHRva2VuU2VyaWFsTnVtYmVyOiBhcmdzLnRva2VuU2VyaWFsTnVtYmVyLFxyXG5cdFx0XHRrZXlMYWJlbDogYXJncy5rZXlMYWJlbCxcclxuXHRcdFx0a2V5U2l6ZTogYXJncy5rZXlTaXplLFxyXG5cdFx0XHRlbmFibGVVc2VkUGtjczExTW9kdWxlOiBhcmdzLmVuYWJsZVVzZWRQa2NzMTFNb2R1bGVcclxuXHRcdH07XHJcblx0XHQkLl9oYW5kbGVQMTFNb2R1bGVzQXJncyhhcmdzLCByZXF1ZXN0KTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdnZW5lcmF0ZVRva2VuUnNhS2V5UGFpcicsIHJlcXVlc3QpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLmdlbmVyYXRlU29mdHdhcmVSc2FLZXlQYWlyID0gZnVuY3Rpb24oYXJncykge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0dmFyIHJlcXVlc3QgPSB7XHJcblx0XHRcdHN1YmplY3ROYW1lOiBhcmdzLnN1YmplY3ROYW1lLFxyXG5cdFx0XHRrZXlTaXplOiBhcmdzLmtleVNpemUsXHJcblx0XHRcdG5vbkV4cG9ydGFibGVLZXk6IGFyZ3Mubm9uRXhwb3J0YWJsZUtleVxyXG5cdFx0fTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdnZW5lcmF0ZVNvZnR3YXJlUnNhS2V5UGFpcicsIHJlcXVlc3QpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHQkLmltcG9ydFRva2VuQ2VydGlmaWNhdGUgPSBmdW5jdGlvbihhcmdzKSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgcmVxdWVzdCA9IHtcclxuXHRcdFx0cHJpdmF0ZUtleUlkOiBhcmdzLnByaXZhdGVLZXlJZCxcclxuXHRcdFx0cGtjczExTW9kdWxlczogJC5fZ2V0UmVxdWVzdE9zUDExTW9kdWxlcyhhcmdzLnBrY3MxMU1vZHVsZXMpLFxyXG5cdFx0XHR0b2tlblNlcmlhbE51bWJlcjogYXJncy50b2tlblNlcmlhbE51bWJlcixcclxuXHRcdFx0Y2VydGlmaWNhdGVDb250ZW50OiBhcmdzLmNlcnRpZmljYXRlQ29udGVudCxcclxuXHRcdFx0Y2VydGlmaWNhdGVMYWJlbDogYXJncy5jZXJ0aWZpY2F0ZUxhYmVsLFxyXG5cdFx0XHRlbmFibGVVc2VkUGtjczExTW9kdWxlOiBhcmdzLmVuYWJsZVVzZWRQa2NzMTFNb2R1bGVcclxuXHRcdH07XHJcblx0XHQkLl9oYW5kbGVQMTFNb2R1bGVzQXJncyhhcmdzLCByZXF1ZXN0KTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdpbXBvcnRUb2tlbkNlcnRpZmljYXRlJywgcmVxdWVzdCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuaW1wb3J0Q2VydGlmaWNhdGUgPSBmdW5jdGlvbihhcmdzKSB7XHJcblx0XHR2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0XHR2YXIgcmVxdWVzdCA9IHtcclxuXHRcdFx0cHJpdmF0ZUtleUlkOiBhcmdzLnByaXZhdGVLZXlJZCxcclxuXHRcdFx0Y2VydGlmaWNhdGVDb250ZW50OiBhcmdzLmNlcnRpZmljYXRlQ29udGVudCxcclxuXHRcdFx0cGFzc3dvcmRQb2xpY2llczogYXJncy5wYXNzd29yZFBvbGljaWVzLFxyXG5cdFx0XHRwYXNzd29yZE1pbkxlbmd0aDogYXJncy5wYXNzd29yZE1pbkxlbmd0aCxcclxuXHRcdFx0c2F2ZVBrY3MxMjogYXJncy5zYXZlUGtjczEyXHJcblx0XHR9O1xyXG5cdFx0JC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ2ltcG9ydENlcnRpZmljYXRlJywgcmVxdWVzdCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuc2VuZEF1dGhlbnRpY2F0ZWRSZXF1ZXN0ID0gZnVuY3Rpb24oYXJncykge1xyXG5cdCAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoYXJncyk7XHJcblx0ICAgIHZhciByZXF1ZXN0ID0ge1xyXG5cdCAgICAgICAgY2VydGlmaWNhdGVUaHVtYnByaW50OiBhcmdzLmNlcnRpZmljYXRlVGh1bWJwcmludCxcclxuXHQgICAgICAgIG1ldGhvZDogYXJncy5tZXRob2QsXHJcblx0ICAgICAgICBoZWFkZXJzOiBhcmdzLmhlYWRlcnMsXHJcblx0ICAgICAgICBib2R5OiBhcmdzLmJvZHksXHJcbiAgICAgICAgICAgIHVybDogYXJncy51cmxcclxuXHQgICAgfTtcclxuXHQgICAgJC5fcmVxdWVzdEhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgJ3NlbmRBdXRoZW50aWNhdGVkUmVxdWVzdCcsIHJlcXVlc3QpO1xyXG5cdCAgICByZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuZ2V0R2VvbG9jYXRpb24gPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0dmFyIHJlcXVlc3QgPSB7XHJcblx0XHRcdGNlcnRpZmljYXRlVGh1bWJwcmludDogYXJncy5jZXJ0aWZpY2F0ZVRodW1icHJpbnRcclxuXHRcdH07XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnZ2V0R2VvbG9jYXRpb24nLCByZXF1ZXN0KTtcclxuXHRcdHJldHVybiBjb250ZXh0LnByb21pc2U7XHJcblx0fTtcclxuXHJcblx0JC5lbmNyeXB0ID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdHZhciB0b2tlbiA9IHR5cGVvZiBhcmdzLnRva2VuID09PSAnb2JqZWN0JyA/IGFyZ3MudG9rZW4gOiBudWxsO1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KGFyZ3MpO1xyXG5cdFx0dmFyIHJlcXVlc3QgPSB7XHJcblx0XHRcdGNlcnRpZmljYXRlVGh1bWJwcmludDogYXJncy5jZXJ0aWZpY2F0ZVRodW1icHJpbnQsXHJcblx0XHRcdHB1YmxpY0tleTogYXJncy5wdWJsaWNLZXksXHJcblx0XHRcdHByaXZhdGVLZXlJZDogYXJncy5wcml2YXRlS2V5SWQsXHJcblx0XHRcdHRva2VuU2VyaWFsTnVtYmVyOiB0b2tlbiA/IHRva2VuLnNlcmlhbE51bWJlciA6IG51bGwsXHJcblx0XHRcdHBrY3MxMU1vZHVsZTogdG9rZW4gPyB0b2tlbi5wa2NzMTFNb2R1bGUgOiBudWxsLFxyXG5cdFx0XHRwYXJhbWV0ZXJzOiBhcmdzLnBhcmFtZXRlcnMsXHJcblx0XHRcdGRhdGE6IGFyZ3MuZGF0YVxyXG5cdFx0fTtcclxuXHRcdCQuX3JlcXVlc3RIYW5kbGVyLnNlbmRDb21tYW5kKGNvbnRleHQsICdlbmNyeXB0JywgcmVxdWVzdCk7XHJcblx0XHRyZXR1cm4gY29udGV4dC5wcm9taXNlO1xyXG5cdH07XHJcblxyXG5cdCQuZGVjcnlwdCA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHR2YXIgdG9rZW4gPSB0eXBlb2YgYXJncy50b2tlbiA9PT0gJ29iamVjdCcgPyBhcmdzLnRva2VuIDogbnVsbDtcclxuXHRcdHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dChhcmdzKTtcclxuXHRcdHZhciByZXF1ZXN0ID0ge1xyXG5cdFx0XHRjZXJ0aWZpY2F0ZVRodW1icHJpbnQ6IGFyZ3MuY2VydGlmaWNhdGVUaHVtYnByaW50LFxyXG5cdFx0XHRwcml2YXRlS2V5SWQ6IGFyZ3MucHJpdmF0ZUtleUlkLFxyXG5cdFx0XHR0b2tlblNlcmlhbE51bWJlcjogdG9rZW4gPyB0b2tlbi5zZXJpYWxOdW1iZXIgOiBudWxsLFxyXG5cdFx0XHRwa2NzMTFNb2R1bGU6IHRva2VuID8gdG9rZW4ucGtjczExTW9kdWxlIDogbnVsbCxcclxuXHRcdFx0cGFyYW1ldGVyczogYXJncy5wYXJhbWV0ZXJzLFxyXG5cdFx0XHRkYXRhOiBhcmdzLmRhdGFcclxuXHRcdH07XHJcblx0XHQkLl9yZXF1ZXN0SGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCAnZGVjcnlwdCcsIHJlcXVlc3QpO1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucHJvbWlzZTtcclxuXHR9O1xyXG5cclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gQnJvd3NlciBkZXRlY3Rpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI0MDA5MzUvYnJvd3Nlci1kZXRlY3Rpb24taW4tamF2YXNjcmlwdFxyXG5cdC8vIHdpdGggbmV3IEVkZ2UgIFVBICdFZGcnIGNoYW5nZXNcclxuXHQkLmRldGVjdGVkQnJvd3NlciA9IChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LCB0ZW0sXHJcblx0XHRNID0gdWEubWF0Y2goLyhvcGVyYXxjaHJvbWV8c2FmYXJpfGZpcmVmb3h8bXNpZXx0cmlkZW50KD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKSB8fCBbXTtcclxuXHRcdGlmICgvdHJpZGVudC9pLnRlc3QoTVsxXSkpIHtcclxuXHRcdFx0dGVtID0gL1xcYnJ2WyA6XSsoXFxkKykvZy5leGVjKHVhKSB8fCBbXTtcclxuXHRcdFx0cmV0dXJuICdJRSAnICsgKHRlbVsxXSB8fCAnJyk7XHJcblx0XHR9XHJcblx0XHRpZiAoTVsxXSA9PT0gJ0Nocm9tZScpIHtcclxuXHRcdFx0dGVtID0gdWEubWF0Y2goL1xcYihPUFJ8RWRnZXxFZGcpXFwvKFxcZCspLyk7XHJcblx0XHRcdGlmICh0ZW0gIT09IG51bGwpIHJldHVybiB0ZW0uc2xpY2UoMSkuam9pbignICcpLnJlcGxhY2UoJ09QUicsICdPcGVyYScpO1xyXG5cdFx0fVxyXG5cdFx0TSA9IE1bMl0gPyBbTVsxXSwgTVsyXV0gOiBbbmF2aWdhdG9yLmFwcE5hbWUsIG5hdmlnYXRvci5hcHBWZXJzaW9uLCAnLT8nXTtcclxuXHRcdGlmICgodGVtID0gdWEubWF0Y2goL3ZlcnNpb25cXC8oXFxkKykvaSkpICE9PSBudWxsKSBNLnNwbGljZSgxLCAxLCB0ZW1bMV0pO1xyXG5cdFx0cmV0dXJuIE0uam9pbignICcpO1xyXG5cdH0pKCk7XHJcblxyXG5cdCQuX3N1cHBvcnRlZE1vYmlsZURldGVjdGVkID0gZmFsc2U7XHJcblx0dmFyIGhhc011bHRpVG91Y2hQb2ludHMgPSB3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMztcclxuXHR2YXIgbW9iaWxlT3MgPSAnJztcclxuXHR2YXIgY2xpZW50U3RyaW5ncyA9IFtcclxuXHRcdHsgZ2V0TmFtZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ0FuZHJvaWQnOyB9LCByOiAvQW5kcm9pZC8gfSxcclxuXHRcdHsgZ2V0TmFtZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ2lPUyc7IH0sICAgICByOiAvKGlQaG9uZXxpUGFkfGlQb2QpLyB9LFxyXG5cclxuXHRcdC8vIGlQYWQgaU9TIHJ1bm5pbmcgb24gRGVza3RvcCBtb2RlXHJcblx0XHR7IGdldE5hbWU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGhhc011bHRpVG91Y2hQb2ludHMgPyAnaU9TJyA6ICcnOyB9LCByOiAvKE1hYyBPU3xNYWNQUEN8TWFjSW50ZWx8TWFjX1Bvd2VyUEN8TWFjaW50b3NoKS8gfVxyXG5cdF07XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjbGllbnRTdHJpbmdzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgY3MgPSBjbGllbnRTdHJpbmdzW2ldO1xyXG5cdFx0aWYgKGNzLnIudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcclxuXHRcdFx0bW9iaWxlT3MgPSBjcy5nZXROYW1lKCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0JC5fc3VwcG9ydGVkTW9iaWxlRGV0ZWN0ZWQgPSAkLl9tb2JpbGVTdXBwb3J0ZWQgJiYgbW9iaWxlT3MgIT09ICcnO1xyXG5cdCQuaXNTdXBwb3J0ZWRNb2JpbGUgPSAkLl9zdXBwb3J0ZWRNb2JpbGVEZXRlY3RlZDtcclxuXHJcblxyXG5cclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gQnJvd3Nlci1kZXBlbmRlbnQgc2luZ2xldG9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdGlmICgkLl9yZXF1ZXN0SGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0dmFyIGV4dGVuc2lvblJlcXVpcmVkVmVyc2lvbiA9ICcwLjAuMCc7XHJcblx0XHR2YXIgZXh0ZW5zaW9uRmlyc3RWZXJzaW9uV2l0aFNlbGZVcGRhdGUgPSBudWxsO1xyXG5cclxuXHRcdHZhciBjaHJvbWVOYXRpdmVXaW5SZXF1aXJlZFZlcnNpb24gPSBudWxsO1xyXG5cdFx0dmFyIGNocm9tZU5hdGl2ZUxpbnV4UmVxdWlyZWRWZXJzaW9uID0gbnVsbDtcclxuXHRcdHZhciBjaHJvbWVOYXRpdmVNYWNSZXF1aXJlZFZlcnNpb24gPSBudWxsO1xyXG5cdFx0dmFyIGllQWRkb25SZXF1aXJlZFZlcnNpb24gPSBudWxsO1xyXG5cdFx0dmFyIG1vYmlsZVJlcXVpcmVkVmVyc2lvbiA9IG51bGw7XHJcblxyXG5cdFx0dmFyIGlzSUUgPSBudWxsO1xyXG5cdFx0dmFyIGlzQ2hyb21lID0gbnVsbDtcclxuXHRcdHZhciBpc0ZpcmVmb3ggPSBudWxsO1xyXG5cdFx0dmFyIGlzRWRnZSA9IG51bGw7XHJcblx0XHR2YXIgaXNTYWZhcmkgPSBudWxsO1xyXG5cdFx0dmFyIGlzQW5kcm9pZCA9IG51bGw7XHJcblx0XHR2YXIgaXNpT1MgPSBudWxsO1xyXG5cclxuXHRcdHZhciBzZXRSZXF1aXJlZENvbXBvbmVudFZlcnNpb25zID0gZnVuY3Rpb24gKGFwaVZlcnNpb24pIHtcclxuXHRcdFx0aWYgKCFhcGlWZXJzaW9uKSB7XHJcblx0XHRcdFx0YXBpVmVyc2lvbiA9ICQuYXBpVmVyc2lvbnMudjFfMztcclxuXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCEkLl9hcGlNYXAubmF0aXZlV2luW2FwaVZlcnNpb25dKSB7XHJcblx0XHRcdFx0dGhyb3cgJ1Vua25vd24gSlNsaWIgQVBJIHZlcnNpb246ICcgKyBhcGlWZXJzaW9uO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjaHJvbWVOYXRpdmVXaW5SZXF1aXJlZFZlcnNpb24gICA9ICQuX2FwaU1hcC5uYXRpdmVXaW5bYXBpVmVyc2lvbl07XHJcblx0XHRcdGNocm9tZU5hdGl2ZUxpbnV4UmVxdWlyZWRWZXJzaW9uID0gJC5fYXBpTWFwLm5hdGl2ZUxpbnV4W2FwaVZlcnNpb25dO1xyXG5cdFx0XHRjaHJvbWVOYXRpdmVNYWNSZXF1aXJlZFZlcnNpb24gICA9ICQuX2FwaU1hcC5uYXRpdmVNYWNbYXBpVmVyc2lvbl07XHJcblx0XHRcdGllQWRkb25SZXF1aXJlZFZlcnNpb24gICAgICAgICAgID0gJC5fYXBpTWFwLmllQWRkb25bYXBpVmVyc2lvbl07XHJcblx0XHRcdGV4dGVuc2lvblJlcXVpcmVkVmVyc2lvbiAgICAgICAgID0gJC5fYXBpTWFwLmV4dGVuc2lvblthcGlWZXJzaW9uXTtcclxuXHRcdFx0bW9iaWxlUmVxdWlyZWRWZXJzaW9uICAgICAgICAgICAgPSAkLl9hcGlNYXAubW9iaWxlW2FwaVZlcnNpb25dO1xyXG5cdFx0XHRpZiAoaXNDaHJvbWUpIHtcclxuXHRcdFx0XHRleHRlbnNpb25GaXJzdFZlcnNpb25XaXRoU2VsZlVwZGF0ZSA9ICQuX2Nocm9tZUV4dGVuc2lvbkZpcnN0VmVyc2lvbldpdGhTZWxmVXBkYXRlO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIGJyb3dzZXJcclxuXHRcdGlzSUUgPSAoJC5kZXRlY3RlZEJyb3dzZXIuaW5kZXhPZignSUUnKSA+PSAwKTtcclxuXHRcdGlzQ2hyb21lID0gKCQuZGV0ZWN0ZWRCcm93c2VyLmluZGV4T2YoJ0Nocm9tZScpID49IDApO1xyXG5cdFx0aXNGaXJlZm94ID0gKCQuZGV0ZWN0ZWRCcm93c2VyLmluZGV4T2YoJ0ZpcmVmb3gnKSA+PSAwKTtcclxuXHRcdGlzRWRnZSA9ICgkLmRldGVjdGVkQnJvd3Nlci5pbmRleE9mKCdFZGcnKSA+PSAwKTtcclxuXHRcdGlzU2FmYXJpID0gKCQuZGV0ZWN0ZWRCcm93c2VyLmluZGV4T2YoJ1NhZmFyaScpID49IDApO1xyXG5cdFx0Ly8gbW9iaWxlIG9zXHJcblx0XHRpc0FuZHJvaWQgPSAoJC5fc3VwcG9ydGVkTW9iaWxlRGV0ZWN0ZWQgJiYgbW9iaWxlT3MgPT09ICdBbmRyb2lkJyk7XHJcblx0XHRpc2lPUyA9ICgkLl9zdXBwb3J0ZWRNb2JpbGVEZXRlY3RlZCAmJiBtb2JpbGVPcyA9PT0gJ2lPUycpO1xyXG5cdFx0XHJcblx0XHRpZiAoISQuX3N1cHBvcnRlZE1vYmlsZURldGVjdGVkICYmICFpc0lFKSB7XHJcblxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gV0VCIEVYVEVOU0lPTiBSRVFVRVNUIEhBTkRMRVIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcblx0XHRcdCQuX3JlcXVlc3RIYW5kbGVyID0gbmV3IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdFx0dmFyIHJlcXVlc3RFdmVudE5hbWUgPSAnY29tLmxhY3VuYXNvZnR3YXJlLldlYlBLSS5SZXF1ZXN0RXZlbnQnO1xyXG5cdFx0XHRcdHZhciByZXNwb25zZUV2ZW50TmFtZSA9ICdjb20ubGFjdW5hc29mdHdhcmUuV2ViUEtJLlJlc3BvbnNlRXZlbnQnO1xyXG5cdFx0XHRcdHZhciBwZW5kaW5nUmVxdWVzdHMgPSB7fTtcclxuXHJcblx0XHRcdFx0aWYgKGlzRWRnZSAmJiAkLl9idWlsZENoYW5uZWwgIT09ICdzdGFibGUnKSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0RXZlbnROYW1lID0gJ2NvbS5sYWN1bmFzb2Z0d2FyZS5XZWJQS0kuUmVxdWVzdEV2ZW50JztcclxuXHRcdFx0XHRcdHJlc3BvbnNlRXZlbnROYW1lID0gJ2NvbS5sYWN1bmFzb2Z0d2FyZS5XZWJQS0kuUmVzcG9uc2VFdmVudCc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdFx0dmFyIHM0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dmFyIGdlbmVyYXRlR3VpZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgcmVnaXN0ZXJQcm9taXNlID0gZnVuY3Rpb24gKHByb21pc2UsIHJlc3BvbnNlUHJvY2Vzc29yKSB7XHJcblx0XHRcdFx0XHR2YXIgcmVxdWVzdElkID0gZ2VuZXJhdGVHdWlkKCk7XHJcblx0XHRcdFx0XHRwZW5kaW5nUmVxdWVzdHNbcmVxdWVzdElkXSA9IHsgcHJvbWlzZTogcHJvbWlzZSwgcmVzcG9uc2VQcm9jZXNzb3I6IHJlc3BvbnNlUHJvY2Vzc29yIH07XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVxdWVzdElkO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciBzZW5kQ29tbWFuZCA9IGZ1bmN0aW9uIChjb250ZXh0LCBjb21tYW5kLCByZXF1ZXN0LCByZXNwb25zZVByb2Nlc3Nvcikge1xyXG5cdFx0XHRcdFx0dmFyIHJlcXVlc3RJZCA9IHJlZ2lzdGVyUHJvbWlzZShjb250ZXh0LnByb21pc2UsIHJlc3BvbnNlUHJvY2Vzc29yKTtcclxuXHRcdFx0XHRcdHZhciBtZXNzYWdlID0ge1xyXG5cdFx0XHRcdFx0XHRyZXF1ZXN0SWQ6IHJlcXVlc3RJZCxcclxuXHRcdFx0XHRcdFx0bGljZW5zZTogY29udGV4dC5saWNlbnNlLFxyXG5cdFx0XHRcdFx0XHR1c2VEb21haW5OYXRpdmVQb29sOiBjb250ZXh0LnVzZURvbWFpbk5hdGl2ZVBvb2wsXHJcblx0XHRcdFx0XHRcdGNvbW1hbmQ6IGNvbW1hbmQsXHJcblx0XHRcdFx0XHRcdHJlcXVlc3Q6IHJlcXVlc3RcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRpZiAoaXNDaHJvbWUgfHwgaXNFZGdlKSB7XHJcblx0XHRcdFx0XHRcdHZhciBldmVudEMgPSBuZXcgQ3VzdG9tRXZlbnQocmVxdWVzdEV2ZW50TmFtZSwgeyAnZGV0YWlsJzogbWVzc2FnZSB9KTtcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudEMpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCAgICB3aW5kb3cucG9zdE1lc3NhZ2Uoe1xyXG5cdFx0XHRcdFx0ICAgICAgICBwb3J0OiByZXF1ZXN0RXZlbnROYW1lLFxyXG5cdFx0XHRcdFx0ICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXHJcblx0XHRcdFx0XHQgICAgfSwgXCIqXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciBjaGVja0luc3RhbGxlZCA9IGZ1bmN0aW9uIChjb250ZXh0LCBhcGlWZXJzaW9uKSB7XHJcblx0XHRcdFx0XHRzZXRSZXF1aXJlZENvbXBvbmVudFZlcnNpb25zKGFwaVZlcnNpb24pO1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHBvbGxFeHRlbnNpb24oY29udGV4dCwgMjUpOyB9LCAyMDApOyAvLyAyNSB4IDIwMCBtcyA9IDUgc2Vjb25kcyB1bnRpbCB3ZSBnaXZlIHVwXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dmFyIHBvbGxFeHRlbnNpb24gPSBmdW5jdGlvbiAoY29udGV4dCwgdHJ5Q291bnQpIHtcclxuXHRcdFx0XHRcdCQuX2xvZygncG9sbGluZyBleHRlbnNpb24nKTtcclxuXHRcdFx0XHRcdHZhciBtZXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJC5fY2hyb21lRXh0ZW5zaW9uSWQpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCQuX2ZpcmVmb3hFeHRlbnNpb25JZC5yZXBsYWNlKC9bXkEtWmEtejAtOV9dL2csICdfJykpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCQuX2VkZ2VFeHRlbnNpb25JZCkgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJC5fZWRnZUxlZ2FjeVByb2R1Y3RJZCk7XHJcblx0XHRcdFx0XHRpZiAobWV0YSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRpZiAodHJ5Q291bnQgPiAxKSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRwb2xsRXh0ZW5zaW9uKGNvbnRleHQsIHRyeUNvdW50IC0gMSk7XHJcblx0XHRcdFx0XHRcdFx0fSwgMjAwKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZVN1Y2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0aXNJbnN0YWxsZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzOiAkLmluc3RhbGxhdGlvblN0YXRlcy5OT1RfSU5TVEFMTEVELFxyXG5cdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ1RoZSBXZWIgUEtJIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkJyxcclxuXHRcdFx0XHRcdFx0XHRcdGJyb3dzZXJTcGVjaWZpY1N0YXR1czogJC5fY2hyb21lSW5zdGFsbGF0aW9uU3RhdGVzLkVYVEVOU0lPTl9OT1RfSU5TVEFMTEVEXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y2hlY2tFeHRlbnNpb25WZXJzaW9uKGNvbnRleHQpO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciBjaGVja0V4dGVuc2lvblZlcnNpb24gPSBmdW5jdGlvbiAoY29udGV4dCkge1xyXG5cdFx0XHRcdFx0JC5fbG9nKCdjaGVja2luZyBleHRlbnNpb24gdmVyc2lvbicpO1xyXG5cdFx0XHRcdFx0dmFyIHN1YlByb21pc2UgPSBuZXcgJC5Qcm9taXNlKG51bGwpO1xyXG5cdFx0XHRcdFx0c3ViUHJvbWlzZS5zdWNjZXNzKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XHJcblx0XHRcdFx0XHRcdGlmICgkLl9jb21wYXJlVmVyc2lvbnModmVyc2lvbiwgZXh0ZW5zaW9uUmVxdWlyZWRWZXJzaW9uKSA8IDApIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgY2FuU2VsZlVwZGF0ZSA9IChleHRlbnNpb25GaXJzdFZlcnNpb25XaXRoU2VsZlVwZGF0ZSAhPT0gbnVsbCAmJiAkLl9jb21wYXJlVmVyc2lvbnModmVyc2lvbiwgZXh0ZW5zaW9uRmlyc3RWZXJzaW9uV2l0aFNlbGZVcGRhdGUpID49IDApO1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlU3VjY2Vzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRpc0luc3RhbGxlZDogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFx0XHRzdGF0dXM6ICQuaW5zdGFsbGF0aW9uU3RhdGVzLk9VVERBVEVELFxyXG5cdFx0XHRcdFx0XHRcdFx0YnJvd3NlclNwZWNpZmljU3RhdHVzOiAkLl9jaHJvbWVJbnN0YWxsYXRpb25TdGF0ZXMuRVhURU5TSU9OX09VVERBVEVELFxyXG5cdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ1RoZSBXZWIgUEtJIGV4dGVuc2lvbiBpcyBvdXRkYXRlZCAoaW5zdGFsbGVkIHZlcnNpb246ICcgKyB2ZXJzaW9uICsgJywgcmVxdWlyZWQgdmVyc2lvbjogJyArIGV4dGVuc2lvblJlcXVpcmVkVmVyc2lvbiArICcpJyxcclxuXHRcdFx0XHRcdFx0XHRcdGNocm9tZUV4dGVuc2lvbkNhblNlbGZVcGRhdGU6IGNhblNlbGZVcGRhdGVcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRpbml0aWFsaXplRXh0ZW5zaW9uKGNvbnRleHQpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHN1YlByb21pc2UuZmFpbChmdW5jdGlvbiAoZXgpIHtcclxuXHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VFcnJvcihleCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHNlbmRDb21tYW5kKHsgbGljZW5zZTogY29udGV4dC5saWNlbnNlLCB1c2VEb21haW5OYXRpdmVQb29sOiBjb250ZXh0LnVzZURvbWFpbk5hdGl2ZVBvb2wsIHByb21pc2U6IHN1YlByb21pc2V9LCAnZ2V0RXh0ZW5zaW9uVmVyc2lvbicsIG51bGwpO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciBpbml0aWFsaXplRXh0ZW5zaW9uID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuXHRcdFx0XHRcdCQuX2xvZygnaW5pdGlhbGl6aW5nIGV4dGVuc2lvbicpO1xyXG5cdFx0XHRcdFx0dmFyIHN1YlByb21pc2UgPSBuZXcgJC5Qcm9taXNlKG51bGwpO1xyXG5cdFx0XHRcdFx0c3ViUHJvbWlzZS5zdWNjZXNzKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UuaXNSZWFkeSkge1xyXG5cdFx0XHRcdFx0XHRcdCQuX25hdGl2ZUluZm8gPSByZXNwb25zZS5uYXRpdmVJbmZvO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNwb25zZS5uYXRpdmVJbmZvLm9zID09PSAnV2luZG93cycgJiYgJC5fY29tcGFyZVZlcnNpb25zKHJlc3BvbnNlLm5hdGl2ZUluZm8uaW5zdGFsbGVkVmVyc2lvbiwgY2hyb21lTmF0aXZlV2luUmVxdWlyZWRWZXJzaW9uKSA8IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlU3VjY2Vzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlzSW5zdGFsbGVkOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhdHVzOiAkLmluc3RhbGxhdGlvblN0YXRlcy5PVVREQVRFRCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJvd3NlclNwZWNpZmljU3RhdHVzOiAkLl9jaHJvbWVJbnN0YWxsYXRpb25TdGF0ZXMuTkFUSVZFX09VVERBVEVELFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlOiAnVGhlIFdlYiBQS0kgbmF0aXZlIGNvbXBvbmVudCBpcyBvdXRkYXRlZCAoaW5zdGFsbGVkIHZlcnNpb246ICcgKyByZXNwb25zZS5uYXRpdmVJbmZvLmluc3RhbGxlZFZlcnNpb24gKyAnLCByZXF1aXJlZCB2ZXJzaW9uOiAnICsgY2hyb21lTmF0aXZlV2luUmVxdWlyZWRWZXJzaW9uICsgJyknLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRwbGF0Zm9ybUluZm86IHJlc3BvbnNlLnBsYXRmb3JtSW5mbyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0bmF0aXZlSW5mbzogcmVzcG9uc2UubmF0aXZlSW5mb1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChyZXNwb25zZS5uYXRpdmVJbmZvLm9zID09PSAnTGludXgnICYmICQuX2NvbXBhcmVWZXJzaW9ucyhyZXNwb25zZS5uYXRpdmVJbmZvLmluc3RhbGxlZFZlcnNpb24sIGNocm9tZU5hdGl2ZUxpbnV4UmVxdWlyZWRWZXJzaW9uKSA8IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlU3VjY2Vzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlzSW5zdGFsbGVkOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhdHVzOiAkLmluc3RhbGxhdGlvblN0YXRlcy5PVVREQVRFRCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJvd3NlclNwZWNpZmljU3RhdHVzOiAkLl9jaHJvbWVJbnN0YWxsYXRpb25TdGF0ZXMuTkFUSVZFX09VVERBVEVELFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlOiAnVGhlIFdlYiBQS0kgbmF0aXZlIGNvbXBvbmVudCBpcyBvdXRkYXRlZCAoaW5zdGFsbGVkIHZlcnNpb246ICcgKyByZXNwb25zZS5uYXRpdmVJbmZvLmluc3RhbGxlZFZlcnNpb24gKyAnLCByZXF1aXJlZCB2ZXJzaW9uOiAnICsgY2hyb21lTmF0aXZlTGludXhSZXF1aXJlZFZlcnNpb24gKyAnKScsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHBsYXRmb3JtSW5mbzogcmVzcG9uc2UucGxhdGZvcm1JbmZvLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRuYXRpdmVJbmZvOiByZXNwb25zZS5uYXRpdmVJbmZvXHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHJlc3BvbnNlLm5hdGl2ZUluZm8ub3MgPT09ICdEYXJ3aW4nICYmICQuX2NvbXBhcmVWZXJzaW9ucyhyZXNwb25zZS5uYXRpdmVJbmZvLmluc3RhbGxlZFZlcnNpb24sIGNocm9tZU5hdGl2ZU1hY1JlcXVpcmVkVmVyc2lvbikgPCAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZVN1Y2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpc0luc3RhbGxlZDogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXR1czogJC5pbnN0YWxsYXRpb25TdGF0ZXMuT1VUREFURUQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyb3dzZXJTcGVjaWZpY1N0YXR1czogJC5fY2hyb21lSW5zdGFsbGF0aW9uU3RhdGVzLk5BVElWRV9PVVREQVRFRCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ1RoZSBXZWIgUEtJIG5hdGl2ZSBjb21wb25lbnQgaXMgb3V0ZGF0ZWQgKGluc3RhbGxlZCB2ZXJzaW9uOiAnICsgcmVzcG9uc2UubmF0aXZlSW5mby5pbnN0YWxsZWRWZXJzaW9uICsgJywgcmVxdWlyZWQgdmVyc2lvbjogJyArIGNocm9tZU5hdGl2ZU1hY1JlcXVpcmVkVmVyc2lvbiArICcpJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0cGxhdGZvcm1JbmZvOiByZXNwb25zZS5wbGF0Zm9ybUluZm8sXHJcblx0XHRcdFx0XHRcdFx0XHRcdG5hdGl2ZUluZm86IHJlc3BvbnNlLm5hdGl2ZUluZm9cclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHRcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlU3VjY2Vzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlzSW5zdGFsbGVkOiB0cnVlXHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlU3VjY2Vzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRpc0luc3RhbGxlZDogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFx0XHRzdGF0dXM6IGNvbnZlcnRJbnN0YWxsYXRpb25TdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSxcclxuXHRcdFx0XHRcdFx0XHRcdGJyb3dzZXJTcGVjaWZpY1N0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxyXG5cdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogcmVzcG9uc2UubWVzc2FnZSxcclxuXHRcdFx0XHRcdFx0XHRcdHBsYXRmb3JtSW5mbzogcmVzcG9uc2UucGxhdGZvcm1JbmZvLFxyXG5cdFx0XHRcdFx0XHRcdFx0bmF0aXZlSW5mbzogcmVzcG9uc2UubmF0aXZlSW5mb1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHN1YlByb21pc2UuZmFpbChmdW5jdGlvbiAoZXgpIHtcclxuXHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VFcnJvcihleCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHNlbmRDb21tYW5kKHsgbGljZW5zZTogY29udGV4dC5saWNlbnNlLCB1c2VEb21haW5OYXRpdmVQb29sOiBjb250ZXh0LnVzZURvbWFpbk5hdGl2ZVBvb2wsIHByb21pc2U6IHN1YlByb21pc2UgfSwgJ2luaXRpYWxpemUnLCBudWxsKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgY29udmVydEluc3RhbGxhdGlvblN0YXR1cyA9IGZ1bmN0aW9uIChic3MpIHtcclxuXHRcdFx0XHRcdGlmIChic3MgPT09ICQuX2Nocm9tZUluc3RhbGxhdGlvblN0YXRlcy5JTlNUQUxMRUQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuICQuaW5zdGFsbGF0aW9uU3RhdGVzLklOU1RBTExFRDtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYnNzID09PSAkLl9jaHJvbWVJbnN0YWxsYXRpb25TdGF0ZXMuRVhURU5TSU9OX09VVERBVEVEIHx8IGJzcyA9PT0gJC5fY2hyb21lSW5zdGFsbGF0aW9uU3RhdGVzLk5BVElWRV9PVVREQVRFRCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gJC5pbnN0YWxsYXRpb25TdGF0ZXMuT1VUREFURUQ7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gJC5pbnN0YWxsYXRpb25TdGF0ZXMuTk9UX0lOU1RBTExFRDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgb25SZXNwb25zZVJlY2VpdmVkID0gZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cdFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBwZW5kaW5nUmVxdWVzdHNbcmVzdWx0LnJlcXVlc3RJZF07XHJcblx0XHRcdFx0XHRkZWxldGUgcGVuZGluZ1JlcXVlc3RzW3Jlc3VsdC5yZXF1ZXN0SWRdO1xyXG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcblx0XHRcdFx0XHRcdGlmIChyZXF1ZXN0LnJlc3BvbnNlUHJvY2Vzc29yKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzdWx0LnJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVByb2Nlc3NvcihyZXN1bHQucmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5faW52b2tlU3VjY2VzcyhyZXN1bHQucmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdC5wcm9taXNlLl9pbnZva2VFcnJvcihyZXN1bHQuZXhjZXB0aW9uKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR0aGlzLnNlbmRDb21tYW5kID0gc2VuZENvbW1hbmQ7XHJcblx0XHRcdFx0dGhpcy5jaGVja0luc3RhbGxlZCA9IGNoZWNrSW5zdGFsbGVkO1xyXG5cclxuXHRcdFx0XHRpZiAoaXNDaHJvbWUgfHwgaXNFZGdlKSB7XHJcblx0XHRcdFx0ICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIocmVzcG9uc2VFdmVudE5hbWUsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdCAgICAgICAgb25SZXNwb25zZVJlY2VpdmVkKGV2ZW50LmRldGFpbCk7XHJcblx0XHRcdFx0ICAgIH0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdFx0ICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLnBvcnQgPT09IHJlc3BvbnNlRXZlbnROYW1lKSB7XHJcblx0XHRcdFx0ICAgICAgICAgICAgb25SZXNwb25zZVJlY2VpdmVkKGV2ZW50LmRhdGEubWVzc2FnZSk7XHJcblx0XHRcdFx0ICAgICAgICB9XHJcblx0XHRcdFx0ICAgIH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0fSBlbHNlIGlmIChpc0lFKSB7XHJcblxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSUUgUkVRVUVTVCBIQU5ETEVSIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRcdFx0JC5fcmVxdWVzdEhhbmRsZXIgPSBuZXcgZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0XHR2YXIgcGVuZGluZ1JlcXVlc3RzID0ge307XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRQb2xsSW5kZXggPSAwO1xyXG5cclxuXHRcdFx0XHR2YXIgczQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgZ2VuZXJhdGVHdWlkID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciByZWdpc3RlclByb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZSwgcmVzcG9uc2VQcm9jZXNzb3IpIHtcclxuXHRcdFx0XHRcdHZhciByZXF1ZXN0SWQgPSBnZW5lcmF0ZUd1aWQoKTtcclxuXHRcdFx0XHRcdHBlbmRpbmdSZXF1ZXN0c1tyZXF1ZXN0SWRdID0ge1xyXG5cdFx0XHRcdFx0XHRwcm9taXNlOiBwcm9taXNlLFxyXG5cdFx0XHRcdFx0XHRwb2xsU3RhcnQ6IGN1cnJlbnRQb2xsSW5kZXgsXHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlUHJvY2Vzc29yOiByZXNwb25zZVByb2Nlc3NvclxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdHJldHVybiByZXF1ZXN0SWQ7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dmFyIGdldEFkZG9uID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gd2luZG93LmxhY3VuYVdlYlBLSUV4dGVuc2lvbjtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgcG9sbCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoZ2V0QWRkb24oKSkge1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHJlc3VsdHNKc29uID0gZ2V0QWRkb24oKS5HZXRBdmFpbGFibGVSZXN1bHRzKCk7XHJcblx0XHRcdFx0XHRcdGlmIChyZXN1bHRzSnNvbiA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdHRocm93ICdBZGQtb24gbWV0aG9kIEdldEF2YWlsYWJsZVJlc3VsdHMgZmFpbGVkJzsgLy8gVE9ET1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgcmVzdWx0cyA9IEpTT04ucGFyc2UocmVzdWx0c0pzb24pO1xyXG5cdFx0XHRcdFx0XHR2YXIgcmVxdWVzdElkc1RvUmVtb3ZlID0gW107XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIHJlcXVlc3RJZCBpbiBwZW5kaW5nUmVxdWVzdHMpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIXBlbmRpbmdSZXF1ZXN0cy5oYXNPd25Qcm9wZXJ0eShyZXF1ZXN0SWQpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0dmFyIHBlbmRpbmdSZXF1ZXN0ID0gcGVuZGluZ1JlcXVlc3RzW3JlcXVlc3RJZF07XHJcblx0XHRcdFx0XHRcdFx0dmFyIHJlbW92ZVBlbmRpbmdSZXF1ZXN0ID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHBlbmRpbmdSZXF1ZXN0LnNlbmRGYWlsZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlbW92ZVBlbmRpbmdSZXF1ZXN0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IG51bGw7XHJcblx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHJlc3VsdHNbaV0ucmVxdWVzdElkID09IHJlcXVlc3RJZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdHNbaV07XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHBlbmRpbmdSZXF1ZXN0LnJlc3BvbnNlUHJvY2Vzc29yKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucmVzcG9uc2UgPSBwZW5kaW5nUmVxdWVzdC5yZXNwb25zZVByb2Nlc3NvcihyZXN1bHQucmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwZW5kaW5nUmVxdWVzdC5wcm9taXNlLl9pbnZva2VTdWNjZXNzKHJlc3VsdC5yZXNwb25zZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cGVuZGluZ1JlcXVlc3QucHJvbWlzZS5faW52b2tlRXJyb3IocmVzdWx0LmV4Y2VwdGlvbik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVtb3ZlUGVuZGluZ1JlcXVlc3QgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChjdXJyZW50UG9sbEluZGV4ID49IHBlbmRpbmdSZXF1ZXN0LnBvbGxTdGFydCArIDEyMCkgeyAvLyB0aW1lb3V0OiAxMjAgeCA1MDBtcyA9IDYwIHNlY29uZHNcclxuXHRcdFx0XHRcdFx0XHRcdFx0cGVuZGluZ1JlcXVlc3QucHJvbWlzZS5faW52b2tlRXJyb3Ioe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdUaGUgb3BlcmF0aW9uIGhhcyB0aW1lZCBvdXQnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlOiAnVGhlIG9wZXJhdGlvbiBoYXMgdGltZWQgb3V0JyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcmlnaW46ICdoZWxwZXInLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvZGU6ICdhZGRvbl90aW1lb3V0J1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVtb3ZlUGVuZGluZ1JlcXVlc3QgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRpZiAocmVtb3ZlUGVuZGluZ1JlcXVlc3QpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlcXVlc3RJZHNUb1JlbW92ZS5wdXNoKHJlcXVlc3RJZCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgcmVxdWVzdElkc1RvUmVtb3ZlLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHBlbmRpbmdSZXF1ZXN0c1tyZXF1ZXN0SWRzVG9SZW1vdmVbal1dO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRjdXJyZW50UG9sbEluZGV4ICs9IDE7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0c2V0VGltZW91dChwb2xsLCA1MDApO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciBjaGVja0V4dGVuc2lvbiA9IGZ1bmN0aW9uIChjb250ZXh0LCB0cnlDb3VudCkge1xyXG5cdFx0XHRcdFx0JC5fbG9nKCdjaGVja2luZyBleHRlbnNpb24nKTtcclxuXHRcdFx0XHRcdGlmIChnZXRBZGRvbigpID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0cnlDb3VudCA+IDEpIHtcclxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNoZWNrRXh0ZW5zaW9uKGNvbnRleHQsIHRyeUNvdW50IC0gMSk7XHJcblx0XHRcdFx0XHRcdFx0fSwgMjAwKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZVN1Y2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0aXNJbnN0YWxsZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzOiAkLmluc3RhbGxhdGlvblN0YXRlcy5OT1RfSU5TVEFMTEVELFxyXG5cdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ1RoZSBXZWIgUEtJIGFkZC1vbiBpcyBub3QgaW5zdGFsbGVkJ1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHZhciBzdWJQcm9taXNlID0gbmV3ICQuUHJvbWlzZShudWxsKTtcclxuXHRcdFx0XHRcdHN1YlByb21pc2Uuc3VjY2VzcyhmdW5jdGlvbiAodmVyc2lvbikge1xyXG5cdFx0XHRcdFx0XHQkLl9uYXRpdmVJbmZvID0geyBvczogJ1dpbmRvd3MnLCBpbnN0YWxsZWRWZXJzaW9uOiB2ZXJzaW9uIH07XHJcblx0XHRcdFx0XHRcdGlmICgkLl9jb21wYXJlVmVyc2lvbnModmVyc2lvbiwgaWVBZGRvblJlcXVpcmVkVmVyc2lvbikgPCAwKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VTdWNjZXNzKHtcclxuXHRcdFx0XHRcdFx0XHRcdGlzSW5zdGFsbGVkOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRcdHN0YXR1czogJC5pbnN0YWxsYXRpb25TdGF0ZXMuT1VUREFURUQsXHJcblx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlOiAnVGhlIFdlYiBQS0kgYWRkLW9uIGlzIG91dGRhdGVkIChpbnN0YWxsZWQgdmVyc2lvbjogJyArIHZlcnNpb24gKyAnLCBsYXRlc3QgdmVyc2lvbjogJyArIGllQWRkb25SZXF1aXJlZFZlcnNpb24gKyAnKSdcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZVN1Y2Nlc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0aXNJbnN0YWxsZWQ6IHRydWVcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRzdWJQcm9taXNlLmZhaWwoZnVuY3Rpb24gKGV4KSB7XHJcblx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlRXJyb3IoZXgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRzZW5kQ29tbWFuZCh7IGxpY2Vuc2U6IGNvbnRleHQubGljZW5zZSwgdXNlRG9tYWluTmF0aXZlUG9vbDogY29udGV4dC51c2VEb21haW5OYXRpdmVQb29sLCBwcm9taXNlOiBzdWJQcm9taXNlIH0sICdnZXRWZXJzaW9uJywgbnVsbCk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dmFyIHNlbmRDb21tYW5kID0gZnVuY3Rpb24gKGNvbnRleHQsIGNvbW1hbmQsIHJlcXVlc3QsIHJlc3BvbnNlUHJvY2Vzc29yKSB7XHJcblx0XHRcdFx0XHRpZiAoZ2V0QWRkb24oKSkge1xyXG5cdFx0XHRcdFx0XHR2YXIgcmVxdWVzdElkID0gcmVnaXN0ZXJQcm9taXNlKGNvbnRleHQucHJvbWlzZSwgcmVzcG9uc2VQcm9jZXNzb3IpO1xyXG5cdFx0XHRcdFx0XHR2YXIgbWVzc2FnZSA9IHtcclxuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0SWQ6IHJlcXVlc3RJZCxcclxuXHRcdFx0XHRcdFx0XHRsaWNlbnNlOiBjb250ZXh0LmxpY2Vuc2UsXHJcblx0XHRcdFx0XHRcdFx0dXNlRG9tYWluTmF0aXZlUG9vbDogY29udGV4dC51c2VEb21haW5OYXRpdmVQb29sLFxyXG5cdFx0XHRcdFx0XHRcdGNvbW1hbmQ6IGNvbW1hbmQsXHJcblx0XHRcdFx0XHRcdFx0cmVxdWVzdDogcmVxdWVzdFxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHR2YXIgc2VuZENvbW1hbmRFcnJvcjtcclxuXHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IGdldEFkZG9uKCkuU2VuZENvbW1hbmQoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChzdWNjZXNzID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2VuZENvbW1hbmRFcnJvciA9ICdGYWlsZWQgdG8gc2VuZCBjb21tYW5kIHRvIGFkZC1vbic7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0XHRcdFx0XHRzZW5kQ29tbWFuZEVycm9yID0gJ0V4Y2VwdGlvbiB3aGVuIHNlbmRpbmcgY29tbWFuZCB0byBhZGQtb246ICcgKyBlcnI7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aWYgKHNlbmRDb21tYW5kRXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZUVycm9yKHtcclxuXHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdGYWlsZWQgdG8gc2VuZCBjb21tYW5kIHRvIGFkZC1vbicsXHJcblx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZTogc2VuZENvbW1hbmRFcnJvcixcclxuXHRcdFx0XHRcdFx0XHRcdG9yaWdpbjogJ2hlbHBlcicsXHJcblx0XHRcdFx0XHRcdFx0XHRjb2RlOiAnYWRkb25fc2VuZF9jb21tYW5kX2ZhaWx1cmUnXHJcblx0XHRcdFx0XHRcdFx0fSwgMjAwKTtcclxuXHRcdFx0XHRcdFx0XHRwZW5kaW5nUmVxdWVzdHNbcmVxdWVzdElkXS5zZW5kRmFpbGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VFcnJvcih7XHJcblx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ0FkZC1vbiBub3QgZGV0ZWN0ZWQnLFxyXG5cdFx0XHRcdFx0XHRcdGNvbXBsZXRlOiAnQWRkLW9uIG5vdCBkZXRlY3RlZCcsXHJcblx0XHRcdFx0XHRcdFx0b3JpZ2luOiAnaGVscGVyJyxcclxuXHRcdFx0XHRcdFx0XHRjb2RlOiAnYWRkb25fbm90X2RldGVjdGVkJ1xyXG5cdFx0XHRcdFx0XHR9LCAyMDApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciBjaGVja0luc3RhbGxlZCA9IGZ1bmN0aW9uIChjb250ZXh0LCBhcGlWZXJzaW9uKSB7XHJcblx0XHRcdFx0XHRzZXRSZXF1aXJlZENvbXBvbmVudFZlcnNpb25zKGFwaVZlcnNpb24pO1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGNoZWNrRXh0ZW5zaW9uKGNvbnRleHQsIDI1KTsgfSwgMjAwKTsgLy8gMjUgeCAyMDAgbXMgPSA1IHNlY29uZHMgdW50aWwgd2UgZ2l2ZSB1cFxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHRoaXMuc2VuZENvbW1hbmQgPSBzZW5kQ29tbWFuZDtcclxuXHRcdFx0XHR0aGlzLmNoZWNrSW5zdGFsbGVkID0gY2hlY2tJbnN0YWxsZWQ7XHJcblx0XHRcdFx0cG9sbCgpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdC8vIGlzIG1vYmlsZVxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIE1vYmlsZSBSRVFVRVNUIEhBTkRMRVIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdFx0XHR2YXIgZ2V0QXBwSW50ZWdyYXRpb25IYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiB3aW5kb3cubGFjdW5hV2ViUGtpQXBwQnJpZGdlO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIHN1Yk1vYmlsZUhhbmRsZXIgPSBudWxsO1xyXG5cdFx0XHR2YXIgQXV0aG9yaXplV1BraU1vZGFsID0gbnVsbDtcclxuXHRcdFx0dmFyIGNyZWF0aW5nTW9iaWxlSGFuZGxlciA9IGZhbHNlO1xyXG5cclxuXHRcdFx0JC5fcmVxdWVzdEhhbmRsZXIgPSBuZXcgZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0XHR2YXIgc2VuZENvbW1hbmQgPSBmdW5jdGlvbiAoY29udGV4dCwgY29tbWFuZCwgcmVxdWVzdCwgcmVzcG9uc2VQcm9jZXNzb3IpIHtcclxuXHRcdFx0XHRcdGlmIChzdWJNb2JpbGVIYW5kbGVyID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdGNyZWF0ZU1vYmlsZUhhbmRsZXIoY29udGV4dCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHN1Yk1vYmlsZUhhbmRsZXIgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0c3ViTW9iaWxlSGFuZGxlci5zZW5kQ29tbWFuZChjb250ZXh0LCBjb21tYW5kLCByZXF1ZXN0LCByZXNwb25zZVByb2Nlc3Nvcik7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR2YXIgcG9sbFNlbmRDbWRJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHN1Yk1vYmlsZUhhbmRsZXIgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRjbGVhckludGVydmFsKHBvbGxTZW5kQ21kSWQpO1xyXG5cdFx0XHRcdFx0XHRcdHN1Yk1vYmlsZUhhbmRsZXIuc2VuZENvbW1hbmQoY29udGV4dCwgY29tbWFuZCwgcmVxdWVzdCwgcmVzcG9uc2VQcm9jZXNzb3IpO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSwgNDAwKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgY2hlY2tJbnN0YWxsZWQgPSBmdW5jdGlvbiAoY29udGV4dCwgYXBpVmVyc2lvbikge1xyXG5cdFx0XHRcdFx0aWYgKHN1Yk1vYmlsZUhhbmRsZXIgPT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0Y3JlYXRlTW9iaWxlSGFuZGxlcihjb250ZXh0KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoc3ViTW9iaWxlSGFuZGxlciAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRzdWJNb2JpbGVIYW5kbGVyLmNoZWNrSW5zdGFsbGVkKGNvbnRleHQsIGFwaVZlcnNpb24pO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dmFyIHBvbGxDaGVja0luc3RhbGxlZElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoc3ViTW9iaWxlSGFuZGxlciAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwocG9sbENoZWNrSW5zdGFsbGVkSWQpO1xyXG5cdFx0XHRcdFx0XHRcdHN1Yk1vYmlsZUhhbmRsZXIuY2hlY2tJbnN0YWxsZWQoY29udGV4dCwgYXBpVmVyc2lvbik7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LCA0MDApO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdC8vIHB1YmxpYyBjb21tYW5kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHR0aGlzLnNlbmRDb21tYW5kID0gc2VuZENvbW1hbmQ7XHJcblx0XHRcdFx0dGhpcy5jaGVja0luc3RhbGxlZCA9IGNoZWNrSW5zdGFsbGVkO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIGNyZWF0ZUFwcEludGVyYWN0SGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygndXNlIG1vYmlsZSBpbi1hcHAgaW50ZWdyYXRpb24nKTtcclxuXHRcdFx0XHRzdWJNb2JpbGVIYW5kbGVyID0gbmV3IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgcGVuZGluZ1JlcXVlc3RzID0ge307XHJcblxyXG5cdFx0XHRcdFx0Z2V0QXBwSW50ZWdyYXRpb25IYW5kbGVyKCkucHJvY2Vzc1Jlc3BvbnNlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1Jlc3BvbnNlIHJlY2VpdmVkOiAnLCBtZXNzYWdlKTtcclxuXHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IG1lc3NhZ2U7XHJcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXN1bHQgPSBKU09OLnBhcnNlKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgcmVxdWVzdCA9IHBlbmRpbmdSZXF1ZXN0c1tyZXN1bHQucmVxdWVzdElkXTtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIHBlbmRpbmdSZXF1ZXN0c1tyZXN1bHQucmVxdWVzdElkXTtcclxuXHRcdFx0XHRcdFx0aWYgKHJlcXVlc3QpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChyZXF1ZXN0LnJlc3BvbnNlUHJvY2Vzc29yKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5yZXNwb25zZSA9IHJlcXVlc3QucmVzcG9uc2VQcm9jZXNzb3IocmVzdWx0LnJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5faW52b2tlU3VjY2VzcyhyZXN1bHQucmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UuX2ludm9rZUVycm9yKHJlc3VsdC5leGNlcHRpb24pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHR2YXIgczQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpO1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHR2YXIgZ2VuZXJhdGVHdWlkID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdHZhciByZWdpc3RlclByb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZSwgcmVzcG9uc2VQcm9jZXNzb3IpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHJlcXVlc3RJZCA9IGdlbmVyYXRlR3VpZCgpO1xyXG5cdFx0XHRcdFx0XHRwZW5kaW5nUmVxdWVzdHNbcmVxdWVzdElkXSA9IHsgcHJvbWlzZTogcHJvbWlzZSwgcmVzcG9uc2VQcm9jZXNzb3I6IHJlc3BvbnNlUHJvY2Vzc29yIH07XHJcblx0XHRcdFx0XHRcdHJldHVybiByZXF1ZXN0SWQ7XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdHZhciBzZW5kQ29tbWFuZCA9IGZ1bmN0aW9uIChjb250ZXh0LCBjb21tYW5kLCByZXF1ZXN0LCByZXNwb25zZVByb2Nlc3Nvcikge1xyXG5cdFx0XHRcdFx0XHR2YXIgcmVxdWVzdElkID0gcmVnaXN0ZXJQcm9taXNlKGNvbnRleHQucHJvbWlzZSwgcmVzcG9uc2VQcm9jZXNzb3IpO1xyXG5cdFx0XHRcdFx0XHR2YXIgY21kUmVxdWVzdCA9IHtcclxuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0SWQ6IHJlcXVlc3RJZCxcclxuXHRcdFx0XHRcdFx0XHRsaWNlbnNlOiBjb250ZXh0LmxpY2Vuc2UsXHJcblx0XHRcdFx0XHRcdFx0Y29tbWFuZDogY29tbWFuZCxcclxuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0OiByZXF1ZXN0XHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdHZhciBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkoY21kUmVxdWVzdCk7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdTZW5kaW5nIG1lc3NhZ2U6ICcgKyBtZXNzYWdlKTtcclxuXHRcdFx0XHRcdFx0Z2V0QXBwSW50ZWdyYXRpb25IYW5kbGVyKCkucHJvY2Vzc1JlcXVlc3QobWVzc2FnZSk7XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdHZhciBjaGVja0luc3RhbGxlZCA9IGZ1bmN0aW9uIChjb250ZXh0LCBhcGlWZXJzaW9uKSB7XHJcblx0XHRcdFx0XHRcdHNldFJlcXVpcmVkQ29tcG9uZW50VmVyc2lvbnMoYXBpVmVyc2lvbik7XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgc3ViUHJvbWlzZSA9IG5ldyAkLlByb21pc2UobnVsbCk7XHJcblx0XHRcdFx0XHRcdHN1YlByb21pc2Uuc3VjY2VzcyhmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHQkLl9uYXRpdmVJbmZvID0geyBvczogcmVzcG9uc2Uub3MsIGluc3RhbGxlZFZlcnNpb246IHJlc3BvbnNlLnZlcnNpb24gfTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgc3RhdHVzID0gJC5pbnN0YWxsYXRpb25TdGF0ZXMuSU5TVEFMTEVEO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoJC5fY29tcGFyZVZlcnNpb25zKHJlc3BvbnNlLnZlcnNpb24sIG1vYmlsZVJlcXVpcmVkVmVyc2lvbikgPCAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzdGF0dXMgPSAkLmluc3RhbGxhdGlvblN0YXRlcy5PVVREQVRFRDtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VTdWNjZXNzKHtcclxuXHRcdFx0XHRcdFx0XHRcdG5hdGl2ZUluZm86IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0b3M6IHJlc3BvbnNlLm9zLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRWZXJzaW9uOiByZXNwb25zZS52ZXJzaW9uXHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0aXNJbnN0YWxsZWQ6IHN0YXR1cyA9PT0gJC5pbnN0YWxsYXRpb25TdGF0ZXMuSU5TVEFMTEVELFxyXG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzOiBzdGF0dXNcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKGV4KSB7XHJcblx0XHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VFcnJvcihleCk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0c2VuZENvbW1hbmQoeyBsaWNlbnNlOiBjb250ZXh0LmxpY2Vuc2UsIHVzZURvbWFpbk5hdGl2ZVBvb2w6IGNvbnRleHQudXNlRG9tYWluTmF0aXZlUG9vbCwgcHJvbWlzZTogc3ViUHJvbWlzZSB9LCAnZ2V0SW5mbycsIG51bGwpO1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHQvLyBwdWJsaWMgY29tbWFuZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0XHR0aGlzLnNlbmRDb21tYW5kID0gc2VuZENvbW1hbmQ7XHJcblx0XHRcdFx0XHR0aGlzLmNoZWNrSW5zdGFsbGVkID0gY2hlY2tJbnN0YWxsZWQ7XHJcblxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgY3JlYXRlU2lnbmFsTW9iaWxlSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygndXNlIG1vYmlsZSBzaWduYWxyIGludGVncmF0aW9uJyk7XHJcblx0XHRcdFx0dmFyIHdlYlBraU1vZGFsID0gbnVsbDtcclxuXHJcblx0XHRcdFx0dmFyIHNpbmdhbFJTY3JpcHRVcmwgPSAnaHR0cHM6Ly9jbG91ZC5sYWN1bmFzb2Z0d2FyZS5jb20vc2NyaXB0cy9zaWduYWxyLWNsaWVudC0xLjAuNC5taW4uanMnO1xyXG5cdFx0XHRcdHZhciBmb3JnZVNjcmlwdFVybCA9ICdodHRwczovL2Nsb3VkLmxhY3VuYXNvZnR3YXJlLmNvbS9qcy9mb3JnZS1jaXBoZXIubWluLmpzJztcclxuXHJcblx0XHRcdFx0dmFyIHNjcmlwdHNJbmplY3Rpb25NZXRob2RzID0geyByZXF1aXJlOiAncmVxdWlyZScsIHdpbmRvdzogJ3dpbmRvdycgfTtcclxuXHRcdFx0XHR2YXIgdXNlZEluamVjdGlvbk1ldGhvZCA9IG51bGw7XHJcblxyXG5cdFx0XHRcdGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ29iamVjdCcgJiYgKHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkpIHtcclxuXHJcblx0XHRcdFx0XHQvLyBzaWduYWxSIHNjcmlwdFxyXG5cdFx0XHRcdFx0cmVxdWlyZShbc2luZ2FsUlNjcmlwdFVybF0sIGZ1bmN0aW9uIChzKSB7XHJcblx0XHRcdFx0XHRcdCQuX3NpZ25hbFIgPSBzO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHQvLyBmb3JnZSBzY3JpcHRcclxuXHRcdFx0XHRcdHJlcXVpcmUoW2ZvcmdlU2NyaXB0VXJsXSwgZnVuY3Rpb24gKGYpIHtcclxuXHRcdFx0XHRcdFx0JC5fZm9yZ2UgPSBmO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR1c2VkSW5qZWN0aW9uTWV0aG9kID0gc2NyaXB0c0luamVjdGlvbk1ldGhvZHMucmVxdWlyZTtcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0XHQvLyBzaWduYWxSIHNjcmlwdFxyXG5cdFx0XHRcdFx0dmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHRcdFx0XHRcdHMuc2V0QXR0cmlidXRlKCdzcmMnLCBzaW5nYWxSU2NyaXB0VXJsKTtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQocyk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gZm9yZ2Ugc2NyaXB0XHJcblx0XHRcdFx0XHRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblx0XHRcdFx0XHRzLnNldEF0dHJpYnV0ZSgnc3JjJywgZm9yZ2VTY3JpcHRVcmwpO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzKTtcclxuXHJcblx0XHRcdFx0XHR1c2VkSW5qZWN0aW9uTWV0aG9kID0gc2NyaXB0c0luamVjdGlvbk1ldGhvZHMud2luZG93O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c3ViTW9iaWxlSGFuZGxlciA9IG5ldyBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgcGVuZGluZ1JlcXVlc3RzID0gW107XHJcblx0XHRcdFx0XHRcdHZhciBzaWduYWxTZXJ2ZXJVcmwgPSAnaHR0cHM6Ly9jbG91ZC5sYWN1bmFzb2Z0d2FyZS5jb20vJztcclxuXHRcdFx0XHRcdFx0dmFyIHNpZ25hbEFwaVNlc3Npb25VcmwgPSBzaWduYWxTZXJ2ZXJVcmwgKyAnYXBpL3Nlc3Npb25zLyc7XHJcblx0XHRcdFx0XHRcdHZhciBzaWduYWxTZXNzaW9uVXJsID0gc2lnbmFsU2VydmVyVXJsICsgJ3Nlc3Npb24vJztcclxuXHRcdFx0XHRcdFx0dmFyIGN1cnJlbnRTZXNzaW9uSWQgPSBudWxsO1xyXG5cdFx0XHRcdFx0XHR2YXIgc2NyaXB0c0xvYWRlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR2YXIgc2VjcmV0S2V5ID0gbnVsbDtcclxuXHRcdFx0XHRcdFx0dmFyIGRldmljZUNvbm5lY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR2YXIgc2VuZENvbW1hbmRNYXhBdHRlbXBzID0gMztcclxuXHRcdFx0XHRcdFx0dmFyIG1zRGVsYXlCZXR3ZWVuUmV0cmllcyA9IDUwMDA7XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgczQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgY2xlYXJQYXJhbXMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0cGVuZGluZ1JlcXVlc3RzID0gW107XHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudFNlc3Npb25JZCA9IG51bGw7XHJcblx0XHRcdFx0XHRcdFx0ZGV2aWNlQ29ubmVjdGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgZ2VuZXJhdGVHdWlkID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBzZW5kTmV4dCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBkZXF1ZXVlXHJcblx0XHRcdFx0XHRcdFx0cGVuZGluZ1JlcXVlc3RzLnNoaWZ0KCk7XHJcblx0XHRcdFx0XHRcdFx0c2VuZFdvcmsoKTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBzZW5kV29yayA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAocGVuZGluZ1JlcXVlc3RzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciByZXF1ZXN0ID0gcGVuZGluZ1JlcXVlc3RzWzBdO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVxdWVzdC50aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0LnNlbmRBdHRlbXB0Kys7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW1NpZ25hbF0gcmVzZW5kaW5nIHJlcXVlc3QgKGF0dGVtcHQgJyArIHJlcXVlc3Quc2VuZEF0dGVtcHQgKyAnKTogJyArIHJlcXVlc3QucmVxdWVzdElkKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRodHRwUG9zdChzaWduYWxBcGlTZXNzaW9uVXJsICsgY3VycmVudFNlc3Npb25JZCArICcvcmVxdWVzdCcsIHJlcXVlc3QuZGF0YSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICgoIWRhdGEgfHwgIWRhdGEuc2VudFRvRGV2aWNlKSAmJiByZXF1ZXN0LnNlbmRBdHRlbXB0ID49IHNlbmRDb21tYW5kTWF4QXR0ZW1wcykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gb24gbGFzdCBhdHRlbXB0XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UuX2ludm9rZUVycm9yKHsgbWVzc2FnZTogJ0NvdWxkIG5vdCBzZW5kIG1lc3NhZ2UgdG8gbW9iaWxlJywgY29kZTogJC5lcnJvckNvZGVzLk1PQklMRV9TRU5EX01FU1NBR0UgfSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZW5kTmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gZXJyb3JcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24gKHN0YXR1cywgZXJyKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHJlcXVlc3Quc2VuZEF0dGVtcHQgPj0gc2VuZENvbW1hbmRNYXhBdHRlbXBzKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBvbiBsYXN0IGF0dGVtcHRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5faW52b2tlRXJyb3Ioe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlOiAnRXJyb3Igd2hpbGUgc2VuZGluZyBtZXNzYWdlIHRvIG1vYmlsZTogJyArIHN0YXR1cyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29tcGxldGU6IHR5cGVvZiBlcnIgPT09ICdzdHJpbmcnID8gZXJyIDogSlNPTi5zdHJpbmdpZnkoZXJyKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29kZTogJC5lcnJvckNvZGVzLk1PQklMRV9TRU5EX01FU1NBR0VcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2VuZE5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChyZXF1ZXN0LnNlbmRBdHRlbXB0IDw9IDEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2VuZFRpbWVvdXQocmVxdWVzdCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGludm9rZVRpbWVvdXQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xyXG5cdFx0XHRcdFx0XHRcdC8vIGRlcXVldWUgYW5kIHJlamVjdFxyXG5cdFx0XHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5faW52b2tlRXJyb3Ioe1xyXG5cdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ1RoZSBtb2JpbGUgaXMgbm90IHJlc3BvbmRpbmcnLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29tcGxldGU6ICdUaGUgb3BlcmF0aW9uIGhhcyB0aW1lZCBvdXQnLFxyXG5cdFx0XHRcdFx0XHRcdFx0b3JpZ2luOiAnanNsaWInLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29kZTogJC5lcnJvckNvZGVzLk1PQklMRV9USU1FT1VUXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0Ly8gc2VuZCBuZXh0XHJcblx0XHRcdFx0XHRcdFx0c2VuZE5leHQoKTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBzZW5kVGltZW91dCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCFjaGVja1BlbmRpbmdSZXF1ZXN0c1F1ZXVlKHJlcXVlc3QucmVxdWVzdElkKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIHN0b3AgcmVxdWVzdCB0aW1lb3V0IChzaGlmdCk6ICcgKyByZXF1ZXN0LnJlcXVlc3RJZCk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCFyZXF1ZXN0LnJlY2VpcHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChub3cgPiByZXF1ZXN0LnRpbWUgKyBtc0RlbGF5QmV0d2VlblJldHJpZXMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHJlcXVlc3Quc2VuZEF0dGVtcHQgPCBzZW5kQ29tbWFuZE1heEF0dGVtcHMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBzZW5kIGFnYWluXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VuZFdvcmsoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aW52b2tlVGltZW91dChyZXF1ZXN0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW1NpZ25hbF0gc3RvcCByZXF1ZXN0IHRpbWVvdXQgKHNob3J0IHRpbWVvdXQpOiAnICsgcmVxdWVzdC5yZXF1ZXN0SWQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG5vdyA+IHJlcXVlc3QudGltZSArIDYwMDAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpbnZva2VUaW1lb3V0KHJlcXVlc3QpO1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIHN0b3AgcmVxdWVzdCB0aW1lb3V0IChsb25nIHRpbWVvdXQpOiAnICsgcmVxdWVzdC5yZXF1ZXN0SWQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHNlbmRUaW1lb3V0KHJlcXVlc3QpOyB9LCAxMDAwKTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBjaGVja1BlbmRpbmdSZXF1ZXN0c1F1ZXVlID0gZnVuY3Rpb24gKGV4cGVjdGVkSWQpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGVuZGluZ1JlcXVlc3RzLmxlbmd0aCAhPT0gMCAmJiBwZW5kaW5nUmVxdWVzdHNbMF0ucmVxdWVzdElkID09PSBleHBlY3RlZElkO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGdldEN1cnJlbnRQZW5kaW5nUmVxdWVzdCA9IGZ1bmN0aW9uIChleHBlY3RlZElkKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNoZWNrUGVuZGluZ1JlcXVlc3RzUXVldWUoZXhwZWN0ZWRJZCkgPyBwZW5kaW5nUmVxdWVzdHNbMF0gOiBudWxsO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHNldEFja25vd2xlZGdlUmVjZWlwdCA9IGZ1bmN0aW9uIChpZCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciByZXF1ZXN0ID0gZ2V0Q3VycmVudFBlbmRpbmdSZXF1ZXN0KGlkKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAocmVxdWVzdCAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVxdWVzdC5yZWNlaXB0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBnb3QgcmVjZWlwdCBmb3IgcmVxdWVzdDogJyArIGlkKTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIGRpc3Bvc2VkISBHb3QgcmVjZWlwdCBmb3IgRElTUE9TRUQgcmVxdWVzdDogJyArIGlkKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgc2VuZENvbW1hbmQgPSBmdW5jdGlvbiAoY29udGV4dCwgY29tbWFuZCwgcmVxdWVzdCwgcmVzcG9uc2VQcm9jZXNzb3IpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRTZXNzaW9uSWQgPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhyb3cgJ1RoZSBjb21wb25lbnQgaXMgbm90IGluaXRpYWxpemVkLiBNYWtlIHN1cmUgdGhlIGluaXQgbWV0aG9kIHdhcyBjYWxsZWQuJztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBtZXNzYWdlID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVxdWVzdElkOiBnZW5lcmF0ZUd1aWQoKSxcclxuXHRcdFx0XHRcdFx0XHRcdGxpY2Vuc2U6IGNvbnRleHQubGljZW5zZSxcclxuXHRcdFx0XHRcdFx0XHRcdHVzZURvbWFpbk5hdGl2ZVBvb2w6IGNvbnRleHQudXNlRG9tYWluTmF0aXZlUG9vbCxcclxuXHRcdFx0XHRcdFx0XHRcdGNvbW1hbmQ6IGNvbW1hbmQsXHJcblx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0OiByZXF1ZXN0LFxyXG5cdFx0XHRcdFx0XHRcdFx0ZG9tYWluOiB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWVcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgZW5jcnlwdGVkID0gbWVzc2FnZSA/IGVuY3J5cHRNZXNzYWdlKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLCBzZWNyZXRLZXkpIDogbnVsbDtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGRhdGEgPSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiAncmVxdWVzdCcsXHJcblx0XHRcdFx0XHRcdFx0XHRpZDogbWVzc2FnZS5yZXF1ZXN0SWQsXHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZW50OiBlbmNyeXB0ZWRcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRwZW5kaW5nUmVxdWVzdHMucHVzaCh7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0SWQ6IG1lc3NhZ2UucmVxdWVzdElkLFxyXG5cdFx0XHRcdFx0XHRcdFx0cHJvbWlzZTogY29udGV4dC5wcm9taXNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2VQcm9jZXNzb3I6IHJlc3BvbnNlUHJvY2Vzc29yLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdFx0XHRcdHJlY2VpcHQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0c2VuZEF0dGVtcHQ6IDBcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKHBlbmRpbmdSZXF1ZXN0cy5sZW5ndGggPD0gMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gc3RhcnQgd29ya1xyXG5cdFx0XHRcdFx0XHRcdFx0c2VuZFdvcmsoKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgY2hlY2tJbnN0YWxsZWQgPSBmdW5jdGlvbiAoY29udGV4dCwgYXBpVmVyc2lvbikge1xyXG5cdFx0XHRcdFx0XHRcdGNsZWFyUGFyYW1zKCk7XHJcblx0XHRcdFx0XHRcdFx0c2V0UmVxdWlyZWRDb21wb25lbnRWZXJzaW9ucyhhcGlWZXJzaW9uKTtcclxuXHRcdFx0XHRcdFx0XHRjaGVja1NjcmlwdHMoY29udGV4dCk7XHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgY2hlY2tTY3JpcHRzID0gZnVuY3Rpb24gKGNvbnRleHQsIHRyeUNvdW50KSB7XHJcblx0XHRcdFx0XHRcdFx0dHJ5Q291bnQgPSB0cnlDb3VudCB8fCAxO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChzY3JpcHRzTG9hZGVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzaWduYWxSU2V0dXAoY29udGV4dCk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdC8vIDEwIHNlY29uZHMgdGltZW91dFxyXG5cdFx0XHRcdFx0XHRcdGlmICh0cnlDb3VudCA+IDUwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZUVycm9yKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ0RlcGVuZGVuY3kgc2NyaXB0cyBkaWQgbm90IGxvYWQnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZTogJ0RlcGVuZGVuY3kgc2NyaXB0cyBkaWQgbm90IGxvYWQnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb2RlOiAkLmVycm9yQ29kZXMuVU5ERUZJTkVEXHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGNoZWNrU2NyaXB0cyhjb250ZXh0LCB0cnlDb3VudCArIDEpOyB9LCAyMDApO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHNpZ25hbFJTZXR1cCA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBjb25uZWN0aW9uSWQgPSBudWxsO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgc2lnbmFsU3RvcCA9IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR3ZWJQa2lNb2RhbC5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnN0b3AoKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGV4KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBlcnJvciB3aGlsZSBzdG9wcGluZyBzaWduYWxSJywgZXgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBjb25uZWN0VGltZW91dCA9IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBjb3VudCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y291bnQgPSBjb3VudCB8fCAxO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGRldmljZUNvbm5lY3RlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIHdhaXRpbmcgZGV2aWNlIGNvbm5lY3Rpb24nKTtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciB0aW1lb3V0Q291bnQgPSA3OyAvLyAxNCBzZWNvbmRzXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNpT1MpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gMTAgc2Vjb25kcyAoaU9TIHN0b3BzIHRoZSBqYXZhc2NyaXB0IHdoZW4gY2hhbmdlcyBhcHAgY29udGV4dClcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGltZW91dENvdW50ID0gNTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoY291bnQgPiB0aW1lb3V0Q291bnQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2lnbmFsU3RvcChjb25uZWN0aW9uKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29udGV4dC5pbnN0YW5jZS5yZWRpcmVjdFRvSW5zdGFsbFBhZ2UoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbm5lY3RUaW1lb3V0KGNvbm5lY3Rpb24sIGNvdW50ICsgMSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9LCAyMDAwKTtcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzdGFydFNpZ25hbENvbm5lY3Rpb24oc2lnbmFsU2Vzc2lvblVybCwgZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ub24oJ2Nvbm5lY3RlZCcsIGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGRldmljZUNvbm5lY3RlZCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHdlYlBraU1vZGFsLmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIGRldmljZSBjb25uZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHN1YlByb21pc2UgPSBuZXcgJC5Qcm9taXNlKG51bGwpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdWJQcm9taXNlLnN1Y2Nlc3MoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBzdGF0dXMgPSAkLmluc3RhbGxhdGlvblN0YXRlcy5JTlNUQUxMRUQ7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCQuX2NvbXBhcmVWZXJzaW9ucyhyZXNwb25zZS52ZXJzaW9uLCBtb2JpbGVSZXF1aXJlZFZlcnNpb24pIDwgMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3RhdHVzID0gJC5pbnN0YWxsYXRpb25TdGF0ZXMuT1VUREFURUQ7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRleHQucHJvbWlzZS5faW52b2tlU3VjY2Vzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRuYXRpdmVJbmZvOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9zOiByZXNwb25zZS5vcyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkVmVyc2lvbjogcmVzcG9uc2UudmVyc2lvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlzSW5zdGFsbGVkOiBzdGF0dXMgPT09ICQuaW5zdGFsbGF0aW9uU3RhdGVzLklOU1RBTExFRCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0YXR1czogc3RhdHVzXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uIChleGNlcHRpb24pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZUVycm9yKGV4Y2VwdGlvbik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW1NpZ25hbF0gc2VuZGluZyBmaXJzdCBjb21tYW5kJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHNlbmRDb21tYW5kKHsgbGljZW5zZTogY29udGV4dC5saWNlbnNlLCB1c2VEb21haW5OYXRpdmVQb29sOiBjb250ZXh0LnVzZURvbWFpbk5hdGl2ZVBvb2wsIHByb21pc2U6IHN1YlByb21pc2UgfSwgJ2dldEluZm8nLCBudWxsKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ub24oJ21lc3NhZ2UnLCBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBoYXZlIGF2YWlsYWJsZSByZXNwb25zZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW1NpZ25hbF0gYXZhaWxhYmxlIHJlc3BvbnNlJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGh0dHBHZXQoc2lnbmFsQXBpU2Vzc2lvblVybCArIGN1cnJlbnRTZXNzaW9uSWQgKyAnL3Jlc3BvbnNlJywgb25SZXNwb25zZVJlY2VpdmVkKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ub24oJ2Nvbm5lY3Rpb25JZCcsIGZ1bmN0aW9uIChpZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW1NpZ25hbF0gR290IGNvbm5lY3Rpb24gaWQ6ICcgKyBpZCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb25JZCA9IGlkO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5vbigncmVjZWlwdCcsIGZ1bmN0aW9uIChpZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzZXRBY2tub3dsZWRnZVJlY2VpcHQoaWQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5vbmNsb3NlKGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBkaXNjb25uZWN0ZWQnLCBlKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gVE9ETyByZWNvbm5lY3Q/XHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgc3RhcnRTZXNzaW9uID0gZnVuY3Rpb24gKGNvdW50KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIEdldHRpbmcgY29ubmVjdGlvbiBJZCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvdW50ID0gY291bnQgfHwgMTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoY291bnQgPiAxMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIEZhaWwuIENvbm5lY3Rpb25JZCB0aW1lb3V0Jyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZUVycm9yKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ0Nvbm5lY3Rpb24gSWQgdGltZW91dCcsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlOiAnRGlkIG5vdCBnZXQgY29ubmVjdGlvbiBJZCBldmVudC4nLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb2RlOiAkLmVycm9yQ29kZXMuVU5ERUZJTkVEXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghY29ubmVjdGlvbklkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgc3RhcnRTZXNzaW9uKGNvdW50ICsgMSk7IH0sIDEwMDApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIEdldHRpbmcgc2Vzc2lvbicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciByZXF1ZXN0ID0geyBjb25uZWN0aW9uSWQ6IGNvbm5lY3Rpb25JZCB9O1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGh0dHBQb3N0KHNpZ25hbEFwaVNlc3Npb25VcmwsIHJlcXVlc3QsIGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjdXJyZW50U2Vzc2lvbklkID0gZGF0YS5zZXNzaW9uSWQ7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZWNyZXRLZXkgPSBnZW5lcmF0ZVNlY3JldEtleSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIHNlc3Npb24gc3RhcnRlZCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIHNob3dpbmcgbW9kYWwgZGVlcCBsaW5rJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIGRlZXBMaW5rUXVlcnkgPSAnc3RhcnQ/cz0nICsgY3VycmVudFNlc3Npb25JZCArICcmaz0nICsgc2VjcmV0S2V5LmhleCArICcmYj0nICsgJC5kZXRlY3RlZEJyb3dzZXIgKyAnJm89JyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBkZWVwTGluayA9ICd3ZWJwa2k6Ly8nICsgZGVlcExpbmtRdWVyeTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChpc0FuZHJvaWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVlcExpbmsgPSAnaW50ZW50Oi8vJyArIGRlZXBMaW5rUXVlcnkgKyAnI0ludGVudDtzY2hlbWU9d2VicGtpO1MuYnJvd3Nlcl9mYWxsYmFja191cmw9JyArIGVuY29kZVVSSUNvbXBvbmVudCgkLl9pbnN0YWxsVXJsICsgKGNvbnRleHQuaW5zdGFuY2UuYnJhbmQgfHwgJycpICsgJz9yZXR1cm5Vcmw9JyArIGVuY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5VUkwpICsgJyZqc2xpYj0nICsgJC5fanNsaWJWZXJzaW9uKSArICc7ZW5kJztcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3ZWJQa2lNb2RhbCA9IG5ldyBBdXRob3JpemVXUGtpTW9kYWwoZGVlcExpbmspO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0d2ViUGtpTW9kYWwub25Pa0NMaWNrID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3ZWJQa2lNb2RhbC5zaG93V2FpdCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25uZWN0VGltZW91dChjb25uZWN0aW9uKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0d2ViUGtpTW9kYWwub25DYW5jZWxDbGljayA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2lnbmFsU3RvcChjb25uZWN0aW9uKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29udGV4dC5wcm9taXNlLl9pbnZva2VFcnJvcih7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZTogJ1N0YXJ0IG1vYmlsZSBhcHAgY2FuY2VsbGVkJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZTogJ1N0YXJ0IG1vYmlsZSBhcHAgY2FuY2VsbGVkJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb2RlOiAkLmVycm9yQ29kZXMuVVNFUl9DQU5DRUxMRURcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdlYlBraU1vZGFsLnNob3coKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KHN0YXJ0U2Vzc2lvbiwgMTAwKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIG9uUmVzcG9uc2VSZWNlaXZlZCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdFx0XHRcdFx0ZGF0YSA9ICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpID8gSlNPTi5wYXJzZShkYXRhKSA6IGRhdGE7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIGdvdCByZXNwb25zZS4gVHlwZTogJyArIGRhdGEudHlwZSk7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IHt9O1xyXG5cdFx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoZGF0YS5mb3JtYXQgIT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aHJvdyB7IG1lc3NhZ2U6ICdVbmtub3duIGRhdGEgZm9ybWF0OiAnICsgZGF0YS5mb3JtYXQgfTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoZGF0YS50eXBlICE9PSAnRXJyb3InKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IEpTT04ucGFyc2UoZGVjcnlwdE1lc3NhZ2UoZGF0YS5jb250ZW50LCBzZWNyZXRLZXkpKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVxdWVzdElkOiBkYXRhLmlkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGV4Y2VwdGlvbjogZGF0YS5jb250ZW50ID8gKHR5cGVvZiBkYXRhLmNvbnRlbnQgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShkYXRhLmNvbnRlbnQpIDogZGF0YS5jb250ZW50KSA6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdDcnlwdG9ncmFwaGljIGVycm9yIG9uIG1vYmlsZSBuYXRpdmUnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6ICdDcnlwdG9ncmFwaGljIGVycm9yIG9uIG1vYmlsZSBuYXRpdmUnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29kZTogJC5lcnJvckNvZGVzLkNPTU1BTkRfREVDUllQVF9FUlJPUlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChleCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0SWQ6IGRhdGEuaWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRleGNlcHRpb246IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlOiAnRXJyb3Igd2hpbGUgZGVjcnlwdGluZyByZXNwb25zZSBtZXNzYWdlJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogdHlwZW9mIChleCkgPT09ICdvYmplY3QnID8gZXgubWVzc2FnZSB8fCBKU09OLnN0cmluZ2lmeShleCkgOiBleCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb2RlOiAkLmVycm9yQ29kZXMuQ09NTUFORF9ERUNSWVBUX0VSUk9SXHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgcmVxdWVzdCA9IGdldEN1cnJlbnRQZW5kaW5nUmVxdWVzdChkYXRhLmlkKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAocmVxdWVzdCA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gdGhpcyBpcyBhIHJlc3BvbnNlIGZvciBhIHByZXZpb3VzIHJlcXVlc3QgdGhhdCB0aW1lZCBvdXRcclxuXHRcdFx0XHRcdFx0XHRcdC8vIGRvIG5vdGhpbmdcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbU2lnbmFsXSBnb3QgcmVzcG9uc2UgZm9yIGRpc3Bvc2VkIHJlcXVlc3Q6ICcgKyBkYXRhLmlkKTtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHJlcXVlc3QucmVzcG9uc2VQcm9jZXNzb3IpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVByb2Nlc3NvcihyZXN1bHQucmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0cmVxdWVzdC5wcm9taXNlLl9pbnZva2VTdWNjZXNzKHJlc3VsdC5yZXNwb25zZSk7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5faW52b2tlRXJyb3IocmVzdWx0LmV4Y2VwdGlvbik7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdC8vIHdvcmtcclxuXHRcdFx0XHRcdFx0XHRzZW5kTmV4dCgpO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gSFRUUCBoYW5kbGVyc1xyXG5cdFx0XHRcdFx0XHR2YXIgaHR0cEdldCA9IGZ1bmN0aW9uICh1cmwsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBodHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0XHRcdFx0XHRcdGh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdG9uSHR0cFN0YXRlQ2hhbmdlZChodHRwUmVxdWVzdCwgJ0dFVCcsIHVybCwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRcdGh0dHBSZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0aHR0cFJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0XHRcdFx0XHRodHRwUmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW0h0dHBIYW5kbGVyXSBHZXQgJyArIHVybCk7XHJcblx0XHRcdFx0XHRcdFx0aHR0cFJlcXVlc3Quc2VuZCgpO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGh0dHBQb3N0ID0gZnVuY3Rpb24gKHVybCwgZGF0YSwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHRcdFx0XHRcdFx0aHR0cFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0b25IdHRwU3RhdGVDaGFuZ2VkKGh0dHBSZXF1ZXN0LCAnUE9TVCcsIHVybCwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRcdGh0dHBSZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdGh0dHBSZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblx0XHRcdFx0XHRcdFx0aHR0cFJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHRcdFx0XHRcdFx0XHRodHRwUmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW0h0dHBIYW5kbGVyXSBQb3N0IG9uICcgKyAnKCcgKyB1cmwgKyAnKTogJywgZGF0YSk7XHJcblx0XHRcdFx0XHRcdFx0aHR0cFJlcXVlc3Quc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgb25IdHRwU3RhdGVDaGFuZ2VkID0gZnVuY3Rpb24gKGh0dHBSZXF1ZXN0LCB2ZXJiLCB1cmwsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChodHRwUmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoaHR0cFJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiBodHRwUmVxdWVzdC5zdGF0dXMgPD0gMjk5KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciByZXNwb25zZSA9IG51bGw7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChodHRwUmVxdWVzdC5zdGF0dXMgPT09IDIwMCB8fCBodHRwUmVxdWVzdC5zdGF0dXMgPT09IDIwMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UoaHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3NDYWxsYmFjayhyZXNwb25zZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tIdHRwSGFuZGxlcl0gZXJyb3IgcGFyc2luZyByZXNwb25zZS4nKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gaHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0O1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3JDYWxsYmFjayhodHRwUmVxdWVzdC5zdGF0dXMsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tIdHRwSGFuZGxlcl0gcmVjZWl2ZWQgcmVzcG9uc2UgZnJvbSAnICsgdmVyYiArICcgJyArIHVybCwgcmVzcG9uc2UpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoaHR0cFJlcXVlc3Quc3RhdHVzID09PSAwICYmICFodHRwUmVxdWVzdC5yZXNwb25zZVRleHQgJiYgaXNpT1MpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU2FmYXJpIGFib3J0IGNvbm5lY3Rpb24gd29ya2Fyb3VuZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW0h0dHBIYW5kbGVyXSBnb3QgU2FmYXJpIGFib3J0IGNvbm5lY3Rpb24uIEFwcGx5aW5nIHdvcmthcm91bmQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c3VjY2Vzc0NhbGxiYWNrKHsgc2VudFRvRGV2aWNlOiB0cnVlIH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvck1vZGVsO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yTW9kZWwgPSBKU09OLnBhcnNlKGh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW0h0dHBIYW5kbGVyXSBlcnJvciBwYXJzaW5nIGVycm9yJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3JNb2RlbCA9IG51bGw7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tIdHRwSGFuZGxlcl0gZXJyb3I6ICcgKyBodHRwUmVxdWVzdC5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRlcnJvckNhbGxiYWNrKGh0dHBSZXF1ZXN0LnN0YXR1cywgZXJyb3JNb2RlbCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHN0YXJ0U2lnbmFsQ29ubmVjdGlvbiA9IG51bGw7XHJcblxyXG5cdFx0XHRcdFx0XHQoZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgcG9sbFNjcmlwdHMgPSBmdW5jdGlvbiAoY291bnQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvdW50ID0gY291bnQgfHwgMTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChjb3VudCA+IDEwMCkgeyAvLyAyMCBzZWNvbmRzIHRpZW1vdXRcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgJ1NjcmlwdCAnICsgKCghJC5fZm9yZ2UgJiYgISQuX3NpZ25hbFIpID8gJ2ZvcmdlIC8gc2lnbmFsUicgOiAoISQuX2ZvcmdlID8gJ2ZvcmdlJyA6ICdzaWduYWxSJykpICsgJyBkaWQgbm90IGxvYWQnO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmICh1c2VkSW5qZWN0aW9uTWV0aG9kICE9PSBzY3JpcHRzSW5qZWN0aW9uTWV0aG9kcy5yZXF1aXJlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdCQuX3NpZ25hbFIgPSB3aW5kb3cuc2lnbmFsUjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JC5fZm9yZ2UgPSB3aW5kb3cuZm9yZ2U7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCQuX3NpZ25hbFIgIT09IHVuZGVmaW5lZCAmJiAkLl9mb3JnZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0U2lnbmFsQ29ubmVjdGlvbiA9IGZ1bmN0aW9uICh1cmwsIGNvbmZpZ3VyZUNvbm5lY3Rpb24pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gc3RhcnQoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW1NpZ25hbF0gU3RhcnRpbmcgY29ubmVjdGlvbicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIGNvbm5lY3Rpb24gPSBuZXcgJC5fc2lnbmFsUi5IdWJDb25uZWN0aW9uQnVpbGRlcigpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC53aXRoVXJsKHVybClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmJ1aWxkKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpZ3VyZUNvbm5lY3Rpb24gJiYgdHlwZW9mIGNvbmZpZ3VyZUNvbm5lY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uZmlndXJlQ29ubmVjdGlvbihjb25uZWN0aW9uKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gY29ubmVjdGlvbi5zdGFydCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gY29ubmVjdGlvbjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSlbJ2NhdGNoJ10oZnVuY3Rpb24gKGVycm9yKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tTaWduYWxdIENhbm5vdCBzdGFydCB0aGUgY29ubmVjdGlvbi4gRXJybzogJywgZXJyb3IpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB3aW5kb3cuUHJvbWlzZS5yZWplY3QoZXJyb3IpOyAvLyBFRElUIGFkZGVkICd3aW5kb3cuJyBiZWZvcmUgUHJvbWlzZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdFx0XHRcdHNjcmlwdHNMb2FkZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cG9sbFNjcmlwdHMoY291bnQgKyAxKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSwgMjAwKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBzdGFydCBzY3JpcHRzIHBvbGxcclxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcG9sbFNjcmlwdHMoKTsgfSwgNTApO1xyXG5cdFx0XHRcdFx0XHR9KSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gcHVibGljIGNvbW1hbmRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0XHR0aGlzLnNlbmRDb21tYW5kID0gc2VuZENvbW1hbmQ7XHJcblx0XHRcdFx0XHRcdHRoaXMuY2hlY2tJbnN0YWxsZWQgPSBjaGVja0luc3RhbGxlZDtcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdC8vIGZvcmdlIChjcnlwdG8pIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRcdFx0XHR2YXIgZ2VuZXJhdGVTZWNyZXRLZXkgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHR2YXIgcmF3ID0gJC5fZm9yZ2UucmFuZG9tLmdldEJ5dGVzU3luYygzMik7XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRyYXc6IHJhdyxcclxuXHRcdFx0XHRcdFx0YjY0OiAkLl9mb3JnZS51dGlsLmVuY29kZTY0KHJhdyksXHJcblx0XHRcdFx0XHRcdGhleDogJC5fZm9yZ2UudXRpbC5ieXRlc1RvSGV4KHJhdylcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dmFyIGVuY3J5cHRNZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSkge1xyXG5cdFx0XHRcdFx0dmFyIGl2ID0gJC5fZm9yZ2UucmFuZG9tLmdldEJ5dGVzU3luYygxNik7XHJcblx0XHRcdFx0XHR2YXIga2V5Qnl0ZXMgPSBrZXkucmF3O1xyXG5cclxuXHRcdFx0XHRcdHZhciBidWZmZXIgPSBuZXcgJC5fZm9yZ2UudXRpbC5CeXRlQnVmZmVyKCk7XHJcblx0XHRcdFx0XHRidWZmZXIucHV0QnVmZmVyKCQuX2ZvcmdlLnV0aWwuY3JlYXRlQnVmZmVyKG1lc3NhZ2UpKTtcclxuXHJcblx0XHRcdFx0XHR2YXIgY2lwaGVyID0gJC5fZm9yZ2UuY2lwaGVyLmNyZWF0ZUNpcGhlcignQUVTLUNCQycsIGtleUJ5dGVzKTtcclxuXHRcdFx0XHRcdGNpcGhlci5zdGFydCh7IGl2OiBpdiB9KTtcclxuXHRcdFx0XHRcdGNpcGhlci51cGRhdGUoYnVmZmVyKTtcclxuXHRcdFx0XHRcdGNpcGhlci5maW5pc2goKTtcclxuXHRcdFx0XHRcdHZhciBjaXBoZXJ0ZXh0ID0gY2lwaGVyLm91dHB1dC5ieXRlcygpO1xyXG5cclxuXHRcdFx0XHRcdHZhciBobWFjID0gJC5fZm9yZ2UuaG1hYy5jcmVhdGUoKTtcclxuXHRcdFx0XHRcdGhtYWMuc3RhcnQoJ3NoYTI1NicsIGtleUJ5dGVzKTtcclxuXHRcdFx0XHRcdGhtYWMudXBkYXRlKGNpcGhlcnRleHQpO1xyXG5cdFx0XHRcdFx0aG1hY0NvbnRlbnQgPSBobWFjLmRpZ2VzdCgpLmJ5dGVzKCk7XHJcblxyXG5cdFx0XHRcdFx0dmFyIG91dEJ1ZmZlciA9IG5ldyAkLl9mb3JnZS51dGlsLkJ5dGVCdWZmZXIoKTtcclxuXHRcdFx0XHRcdG91dEJ1ZmZlci5wdXRCeXRlcyhpdik7XHJcblx0XHRcdFx0XHRvdXRCdWZmZXIucHV0Qnl0ZXMoaG1hY0NvbnRlbnQpO1xyXG5cdFx0XHRcdFx0b3V0QnVmZmVyLnB1dEJ5dGVzKGNpcGhlcnRleHQpO1xyXG5cdFx0XHRcdFx0cmV0dXJuICQuX2ZvcmdlLnV0aWwuZW5jb2RlNjQob3V0QnVmZmVyLmJ5dGVzKCkpO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHZhciBkZWNyeXB0TWVzc2FnZSA9IGZ1bmN0aW9uIChlbmNyeXB0ZWQsIGtleSkge1xyXG5cdFx0XHRcdFx0dmFyIGtleUJ5dGVzID0ga2V5LnJhdztcclxuXHJcblx0XHRcdFx0XHR2YXIgYnVmZmVyID0gbmV3ICQuX2ZvcmdlLnV0aWwuQnl0ZUJ1ZmZlcigpO1xyXG5cdFx0XHRcdFx0YnVmZmVyLnB1dEJ5dGVzKCQuX2ZvcmdlLnV0aWwuZGVjb2RlNjQoZW5jcnlwdGVkKSk7XHJcblx0XHRcdFx0XHR2YXIgaXYgPSBidWZmZXIuZ2V0Qnl0ZXMoMTYpO1xyXG5cdFx0XHRcdFx0dmFyIGhtYWNDaGVjayA9IGJ1ZmZlci5nZXRCeXRlcygzMik7XHJcblx0XHRcdFx0XHR2YXIgY2lwaGVydGV4dCA9IGJ1ZmZlci5ieXRlcygpO1xyXG5cclxuXHRcdFx0XHRcdHZhciBobWFjID0gJC5fZm9yZ2UuaG1hYy5jcmVhdGUoKTtcclxuXHRcdFx0XHRcdGhtYWMuc3RhcnQoJ3NoYTI1NicsIGtleUJ5dGVzKTtcclxuXHRcdFx0XHRcdGhtYWMudXBkYXRlKGNpcGhlcnRleHQpO1xyXG5cdFx0XHRcdFx0dmFyIGNvbXB1dGVkSG1hYyA9IGhtYWMuZGlnZXN0KCkuYnl0ZXMoKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoY29tcHV0ZWRIbWFjICE9PSBobWFjQ2hlY2spIHtcclxuXHRcdFx0XHRcdFx0dGhyb3cgeyBtZXNzYWdlOiAnRXJyb3Igb24gbWVzc2FnZSBpbnRlZ3JpdHknIH07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dmFyIGRlY2lwaGVyID0gJC5fZm9yZ2UuY2lwaGVyLmNyZWF0ZURlY2lwaGVyKCdBRVMtQ0JDJywga2V5Qnl0ZXMpO1xyXG5cdFx0XHRcdFx0ZGVjaXBoZXIuc3RhcnQoeyBpdjogaXYgfSk7XHJcblx0XHRcdFx0XHRkZWNpcGhlci51cGRhdGUoYnVmZmVyKTtcclxuXHRcdFx0XHRcdHZhciByZXN1bHQgPSBkZWNpcGhlci5maW5pc2goKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIXJlc3VsdCkge1xyXG5cdFx0XHRcdFx0XHR0aHJvdyB7IG1lc3NhZ2U6ICdFcnJvciBvbiBtZXNzYWdlIGRlY3J5cHRpb24nIH07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuICQuX2ZvcmdlLnV0aWwuZGVjb2RlVXRmOChkZWNpcGhlci5vdXRwdXQuZ2V0Qnl0ZXMoKSk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBjcmVhdGVEZWVwTGlua0FwcEludGVncmF0aW9uUmVkaXJlY3QgPSBmdW5jdGlvbiAoY29udGV4dCkge1xyXG5cclxuXHRcdFx0XHRzdWJNb2JpbGVIYW5kbGVyID0gbmV3IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHZhciBzY2hlbWVTdWZmaXggPSAnLWxjbic7XHJcblx0XHRcdFx0XHR2YXIgc2NoZW1lID0gJ3dwa2knICsgc2NoZW1lU3VmZml4O1xyXG5cdFx0XHRcdFx0dmFyIGRlZXBMaW5rUXVlcnkgPSAnYWNjZXNzP3U9JyArIGVuY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uaHJlZikgKyAnJmM9JyArIGVuY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5jb29raWUpO1xyXG5cdFx0XHRcdFx0dmFyIGRlZXBMaW5rID0gc2NoZW1lICsgJzovLycgKyBkZWVwTGlua1F1ZXJ5O1xyXG5cdFx0XHRcdFx0aWYgKGlzQW5kcm9pZCkge1xyXG5cdFx0XHRcdFx0XHRkZWVwTGluayA9ICdpbnRlbnQ6Ly8nICsgZGVlcExpbmtRdWVyeSArICcjSW50ZW50O3NjaGVtZT0nICsgc2NoZW1lICsgJztTLmJyb3dzZXJfZmFsbGJhY2tfdXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQoJC5faW5zdGFsbFVybCArIChjb250ZXh0Lmluc3RhbmNlLmJyYW5kIHx8ICcnKSArICc/cmV0dXJuVXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQoZG9jdW1lbnQuVVJMKSArICcmanNsaWI9JyArICQuX2pzbGliVmVyc2lvbikgKyAnO2VuZCc7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5zZW5kQ29tbWFuZCA9IGZ1bmN0aW9uIChjb250ZXh0LCBjb21tYW5kLCByZXF1ZXN0LCByZXNwb25zZVByb2Nlc3Nvcikge1xyXG5cdFx0XHRcdFx0XHQvLyB3aWxsIG5vdCBiZSBjYWxsZWRcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5jaGVja0luc3RhbGxlZCA9IGZ1bmN0aW9uIChjb250ZXh0LCBhcGlWZXJzaW9uKSB7XHJcblx0XHRcdFx0XHRcdHZhciB3ZWJQa2lNb2RhbCA9IG5ldyBBdXRob3JpemVXUGtpTW9kYWwoZGVlcExpbmspO1xyXG5cclxuXHRcdFx0XHRcdFx0d2ViUGtpTW9kYWwub25Pa0NMaWNrID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdHdlYlBraU1vZGFsLnNob3dXYWl0KCk7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR3ZWJQa2lNb2RhbC5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNpT1MpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG5ldyBEYXRlKCkgLSB0aW1lc3RhbXAgPCAxMCAqIDEwMDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb250ZXh0Lmluc3RhbmNlLnJlZGlyZWN0VG9JbnN0YWxsUGFnZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSwgNTAwMCk7XHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR3ZWJQa2lNb2RhbC5vbkNhbmNlbENsaWNrID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdHdlYlBraU1vZGFsLmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0XHRjb250ZXh0LnByb21pc2UuX2ludm9rZUVycm9yKHtcclxuXHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdTdGFydCBtb2JpbGUgYXBwIGNhbmNlbGxlZCcsXHJcblx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZTogJ1N0YXJ0IG1vYmlsZSBhcHAgY2FuY2VsbGVkJyxcclxuXHRcdFx0XHRcdFx0XHRcdGNvZGU6ICQuZXJyb3JDb2Rlcy5VU0VSX0NBTkNFTExFRFxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0d2ViUGtpTW9kYWwuc2hvdygpO1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdHZhciBjcmVhdGVNb2JpbGVIYW5kbGVyID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuXHRcdFx0XHRpZiAoY3JlYXRpbmdNb2JpbGVIYW5kbGVyKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNyZWF0aW5nTW9iaWxlSGFuZGxlciA9IHRydWU7XHJcblx0XHRcdFx0dmFyIG1vYmlsZUludGVncmF0aW9uQ291bnRUaW1lb3V0ID0gMTA7XHJcblx0XHRcdFx0dmFyIG1vYmlsZUludGVncmF0aW9uUG9sbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ3BvbGxpbmcgbW9iaWxlIGludGVncmF0aW9uIG1vZGUgLi4uJyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKG1vYmlsZUludGVncmF0aW9uQ291bnRUaW1lb3V0IDw9IDApIHtcclxuXHRcdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChtb2JpbGVJbnRlZ3JhdGlvblBvbGxJZCk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoY29udGV4dC5pbnN0YW5jZS5tb2JpbGVJbnRlZ3JhdGlvbk1vZGUgPT09ICQubW9iaWxlSW50ZWdyYXRpb25Nb2Rlcy5icm93c2VySW50ZWdyYXRpb24pIHtcclxuXHRcdFx0XHRcdFx0XHRjcmVhdGVTaWduYWxNb2JpbGVIYW5kbGVyKCk7XHJcblxyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGNyZWF0ZURlZXBMaW5rQXBwSW50ZWdyYXRpb25SZWRpcmVjdChjb250ZXh0KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGdldEFwcEludGVncmF0aW9uSGFuZGxlcigpICYmIGdldEFwcEludGVncmF0aW9uSGFuZGxlcigpLmxvYWRlZCkge1xyXG5cdFx0XHRcdFx0XHRjbGVhckludGVydmFsKG1vYmlsZUludGVncmF0aW9uUG9sbElkKTtcclxuXHRcdFx0XHRcdFx0Y3JlYXRlQXBwSW50ZXJhY3RIYW5kbGVyKCk7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRtb2JpbGVJbnRlZ3JhdGlvbkNvdW50VGltZW91dC0tO1xyXG5cdFx0XHRcdH0sIDMwMCk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBNb2RhbCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0QXV0aG9yaXplV1BraU1vZGFsID0gZnVuY3Rpb24gKGRlZXBMaW5rKSB7XHJcblx0XHRcdFx0dGhpcy5kZWVwTGluayA9IGRlZXBMaW5rO1xyXG5cdFx0XHRcdHRoaXMub25Pa0NMaWNrID0gbnVsbDtcclxuXHRcdFx0XHR0aGlzLm9uQ2FuY2VsQ2xpY2sgPSBudWxsO1xyXG5cclxuXHRcdFx0XHR2YXIgbW9kYWxFbGVtZW50ID0gbnVsbDtcclxuXHJcblx0XHRcdFx0Ly8gbG9jYWxpemF0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHR2YXIgdGV4dFJlc291cmNlcyA9IHtcclxuXHRcdFx0XHRcdHB0OiB7XHJcblx0XHRcdFx0XHRcdGFjY2Vzc0NlcnRpZmljYXRlczogJ08gc2l0ZSB7e2RvbWFpbn19IGRlc2VqYSBhY2Vzc2FyIHNldXMgY2VydGlmaWNhZG9zIGRpZ2l0YWlzLicsXHJcblx0XHRcdFx0XHRcdGF1dGhvcml6ZTogJ1Blcm1pdGlyJyxcclxuXHRcdFx0XHRcdFx0Y2FuY2VsOiAnQ2FuY2VsYXInLFxyXG5cdFx0XHRcdFx0XHR3YWl0OiAnQWd1YXJkZS4uLidcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRlbjoge1xyXG5cdFx0XHRcdFx0XHRhY2Nlc3NDZXJ0aWZpY2F0ZXM6ICdUaGUgd2Vic2l0ZSB7e2RvbWFpbn19IHdhbnRzIHRvIGFjY2VzcyB5b3VyIGRpZ2l0YWwgY2VydGlmaWNhdGVzLicsXHJcblx0XHRcdFx0XHRcdGF1dGhvcml6ZTogJ0F1dGhvcml6ZScsXHJcblx0XHRcdFx0XHRcdGNhbmNlbDogJ0NhbmNlbCcsXHJcblx0XHRcdFx0XHRcdHdhaXQ6ICdQbGVhc2Ugd2FpdC4uLidcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRlczoge1xyXG5cdFx0XHRcdFx0XHRhY2Nlc3NDZXJ0aWZpY2F0ZXM6ICdFbCBzaXRpbyB7e2RvbWFpbn19IHF1aWVyZSBhY2NlZGVyIGEgc3VzIGNlcnRpZmljYWRvcyBkaWdpdGFsZXMuJyxcclxuXHRcdFx0XHRcdFx0YXV0aG9yaXplOiAnUGVybWl0aXInLFxyXG5cdFx0XHRcdFx0XHRjYW5jZWw6ICdDYW5jZWxhcicsXHJcblx0XHRcdFx0XHRcdHdhaXQ6ICdFc3BlcmEuLi4nXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR2YXIgdXNlckxhbmd1YWdlID0gbnVsbDtcclxuXHRcdFx0XHR2YXIgZ2V0UmVzb3VyY2UgPSBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0XHRcdFx0aWYgKHVzZXJMYW5ndWFnZSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgbGFuZyA9ICh3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlIHx8ICdlbicpO1xyXG5cdFx0XHRcdFx0XHR2YXIgYXZhaWxhYmxlc0xhbmdzID0gT2JqZWN0LmtleXModGV4dFJlc291cmNlcyk7XHJcblx0XHRcdFx0XHRcdHVzZXJMYW5ndWFnZSA9IGF2YWlsYWJsZXNMYW5ncy5pbmRleE9mKGxhbmcpID4gLTEgPyBsYW5nIDogKGxhbmcubGVuZ3RoID4gMSAmJiBhdmFpbGFibGVzTGFuZ3MuaW5kZXhPZihsYW5nLnN1YnN0cmluZygwLCAyKSkgPiAtMSkgPyBsYW5nLnN1YnN0cmluZygwLCAyKSA6ICdlbic7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdGV4dFJlc291cmNlc1t1c2VyTGFuZ3VhZ2VdW25hbWVdIHx8IG5hbWU7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dmFyIGluaXQgPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcclxuXHRcdFx0XHRcdG1vZGFsRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWJQa2lNb2RhbCcpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChtb2RhbEVsZW1lbnQgIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRtb2RhbEVsZW1lbnQucmVtb3ZlQ2hpbGQobW9kYWxFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLnJlbW92ZUNoaWxkKG1vZGFsRWxlbWVudCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gbW9kYWwgcm9vdFxyXG5cdFx0XHRcdFx0bW9kYWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRcdFx0XHRtb2RhbEVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWJQa2lNb2RhbCcpO1xyXG5cdFx0XHRcdFx0bW9kYWxFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogbm9uZTsnKTtcclxuXHJcblx0XHRcdFx0XHQvLyBtb2RhbCBjb250ZW50XHJcblx0XHRcdFx0XHR2YXIgbW9kYWxDb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHRcdFx0bW9kYWxDb250ZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6IHRhYmxlOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlOyBtYXJnaW46IDUlOyB3aWR0aDogOTAlOyBoZWlnaHQ6IDkwJTsgZm9udC1mYW1pbHk6IFwiSGVsdmV0aWNhXCI7IHRleHQtYWxpZ246IGNlbnRlcjsgYm9yZGVyLXJhZGl1czogMTBweDsnKTtcclxuXHJcblx0XHRcdFx0XHR2YXIgbWlkZGxlQ29udGVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHRcdFx0bWlkZGxlQ29udGVudERpdi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6IHRhYmxlLWNlbGw7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7Jyk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gbW9kYWwgd2FpdFxyXG5cdFx0XHRcdFx0dmFyIHdhaXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5cdFx0XHRcdFx0d2FpdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWJQa2lXYWl0RWxlbWVudCcpO1xyXG5cdFx0XHRcdFx0d2FpdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lJyk7XHJcblx0XHRcdFx0XHR3YWl0RWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShnZXRSZXNvdXJjZSgnd2FpdCcpKSk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gbW9kYWwgdGV4dFxyXG5cdFx0XHRcdFx0dmFyIHRleHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5cdFx0XHRcdFx0dGV4dEVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWJQa2lUZXh0RWxlbWVudCcpO1xyXG5cdFx0XHRcdFx0dGV4dEVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdwYWRkaW5nLWxlZnQ6IDUlOyBwYWRkaW5nLXJpZ2h0OiA1JTsgZm9udC1zaXplOiAxLjZlbTsgY29sb3I6IGJsYWNrOyB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7IHdoaXRlLXNwYWNlOiBub3JtYWw7Jyk7XHJcblx0XHRcdFx0XHR0ZXh0RWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShnZXRSZXNvdXJjZSgnYWNjZXNzQ2VydGlmaWNhdGVzJykuc3BsaXQoJ3t7ZG9tYWlufX0nKVswXSkpO1xyXG5cdFx0XHRcdFx0dmFyIGJvbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHJvbmcnKTtcclxuXHRcdFx0XHRcdGJvbGQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKSk7XHJcblx0XHRcdFx0XHR0ZXh0RWxlbWVudC5hcHBlbmRDaGlsZChib2xkKTtcclxuXHRcdFx0XHRcdHRleHRFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGdldFJlc291cmNlKCdhY2Nlc3NDZXJ0aWZpY2F0ZXMnKS5zcGxpdCgne3tkb21haW59fScpWzFdKSk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gbW9kYWwgYnV0dG9uc1xyXG5cdFx0XHRcdFx0dmFyIGJ1dHRvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0XHRcdGJ1dHRvbnNEaXYuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWJQa2lCdXR0b25zRWxlbWVudCcpO1xyXG5cclxuXHRcdFx0XHRcdHZhciBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdFx0XHRjYW5jZWxCdXR0b24uc2V0QXR0cmlidXRlKCdzdHlsZScsICctd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLW1vei1hcHBlYXJhbmNlOiBidXR0b247IGFwcGVhcmFuY2U6IGJ1dHRvbjsgcGFkZGluZzogMiUgNCU7IHRleHQtYWxpZ246IGNlbnRlcjsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZvbnQtc2l6ZTogMS4xZW07IG1hcmdpbjogNSU7IGN1cnNvcjogcG9pbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogI2U3ZTdlNzsgY29sb3I6IGJsYWNrJyk7XHJcblx0XHRcdFx0XHRjYW5jZWxCdXR0b24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZ2V0UmVzb3VyY2UoJ2NhbmNlbCcpKSk7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGF1dGhCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdFx0XHRhdXRoQnV0dG9uLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC1tb3otYXBwZWFyYW5jZTogYnV0dG9uOyBhcHBlYXJhbmNlOiBidXR0b247IHBhZGRpbmc6IDIlIDQlOyB0ZXh0LWFsaWduOiBjZW50ZXI7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDEuMWVtOyBtYXJnaW46IDUlOyBjdXJzb3I6IHBvaW50ZXI7IGJhY2tncm91bmQtY29sb3I6ICMwMDc4ZTc7IGNvbG9yOiB3aGl0ZScpO1xyXG5cdFx0XHRcdFx0YXV0aEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dwa2lNb2RhbERlZXBMaW5rJyk7XHJcblx0XHRcdFx0XHRhdXRoQnV0dG9uLnNldEF0dHJpYnV0ZSgnaHJlZicsIGluc3RhbmNlLmRlZXBMaW5rKTtcclxuXHRcdFx0XHRcdGF1dGhCdXR0b24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZ2V0UmVzb3VyY2UoJ2F1dGhvcml6ZScpKSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGlzaU9TKSB7XHJcblx0XHRcdFx0XHRcdGJ1dHRvbnNEaXYuYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKTtcclxuXHRcdFx0XHRcdFx0YnV0dG9uc0Rpdi5hcHBlbmRDaGlsZChhdXRoQnV0dG9uKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGJ1dHRvbnNEaXYuYXBwZW5kQ2hpbGQoYXV0aEJ1dHRvbik7XHJcblx0XHRcdFx0XHRcdGJ1dHRvbnNEaXYuYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBhcHBlbmQgY2hpbGRyZW5cclxuXHRcdFx0XHRcdG1pZGRsZUNvbnRlbnREaXYuYXBwZW5kQ2hpbGQod2FpdEVsZW1lbnQpO1xyXG5cdFx0XHRcdFx0bWlkZGxlQ29udGVudERpdi5hcHBlbmRDaGlsZCh0ZXh0RWxlbWVudCk7XHJcblx0XHRcdFx0XHRtaWRkbGVDb250ZW50RGl2LmFwcGVuZENoaWxkKGJ1dHRvbnNEaXYpO1xyXG5cdFx0XHRcdFx0bW9kYWxDb250ZW50RWxlbWVudC5hcHBlbmRDaGlsZChtaWRkbGVDb250ZW50RGl2KTtcclxuXHRcdFx0XHRcdG1vZGFsRWxlbWVudC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnRFbGVtZW50KTtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQobW9kYWxFbGVtZW50KTtcclxuXHJcblx0XHRcdFx0XHQvLyB3aXJlIGNsaWNrc1xyXG5cdFx0XHRcdFx0YXV0aEJ1dHRvbi5vbmNsaWNrID0gaW5zdGFuY2Uub25Pa0NMaWNrO1xyXG5cdFx0XHRcdFx0Y2FuY2VsQnV0dG9uLm9uY2xpY2sgPSBpbnN0YW5jZS5vbkNhbmNlbENsaWNrO1xyXG5cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHR0aGlzLmhpZGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRtb2RhbEVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lOycpO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHRoaXMuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGluaXQodGhpcyk7XHJcblx0XHRcdFx0XHRtb2RhbEVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBibG9jazsgcG9zaXRpb246IGZpeGVkOyB6LWluZGV4OiAxMDAwMDA7IGxlZnQ6IDA7IHRvcDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgb3ZlcmZsb3c6IGF1dG87IGJhY2tncm91bmQtY29sb3I6IHJnYigwLDAsMCk7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC40KTsnKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR0aGlzLnNob3dXYWl0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlYlBraVRleHRFbGVtZW50Jykuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lOycpO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlYlBraUJ1dHRvbnNFbGVtZW50Jykuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lOycpO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlYlBraVdhaXRFbGVtZW50Jykuc2V0QXR0cmlidXRlKCdzdHlsZScsICdwYWRkaW5nLWxlZnQ6IDUlOyBwYWRkaW5nLXJpZ2h0OiA1JTsgZm9udC1zaXplOiAxLjZlbTsgY29sb3I6IGJsYWNrOyB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7Jyk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59KShMYWN1bmFXZWJQS0kucHJvdG90eXBlKTtcclxuXHJcbmlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcclxuXHRpZiAoT2JqZWN0LmRlZmluZVByb3BlcnRpZXMpIHtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGV4cG9ydHMsIHtcclxuXHRcdFx0Ly9Vc2luZyB0aGlzIHN5bnRheCBpbnN0ZWFkIG9mIFwiZXhwb3J0cy5kZWZhdWx0ID0gLi4uXCIgdG8gbWFpbnRhaW4gY29tcGF0aWJpbGl0eSB3aXRoIEVTMyAoYmVjYXVzZSBvZiB0aGUgLmRlZmF1bHQpXHJcblx0XHRcdCdkZWZhdWx0Jzoge1xyXG5cdFx0XHRcdHZhbHVlOiBMYWN1bmFXZWJQS0lcclxuXHRcdFx0fSxcclxuXHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay9pc3N1ZXMvMjk0NVxyXG5cdFx0XHQnX19lc01vZHVsZSc6IHtcclxuXHRcdFx0XHR2YWx1ZTogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQnTGFjdW5hV2ViUEtJJzoge1xyXG5cdFx0XHRcdHZhbHVlOiBMYWN1bmFXZWJQS0lcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGV4cG9ydHNbJ2RlZmF1bHQnXSA9IExhY3VuYVdlYlBLSTtcclxuXHRcdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcblx0XHRleHBvcnRzLkxhY3VuYVdlYlBLSSA9IExhY3VuYVdlYlBLSTtcclxuXHR9XHJcbn0iLCAiLyohIGNob2ljZXMuanMgdjExLjAuMyB8IFx1MDBBOSAyMDI0IEpvc2ggSm9obnNvbiB8IGh0dHBzOi8vZ2l0aHViLmNvbS9qc2hqb2huc29uL0Nob2ljZXMjcmVhZG1lICovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sICovXG5cbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCB7XG4gICAgX19wcm90b19fOiBbXVxuICB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBkLl9fcHJvdG9fXyA9IGI7XG4gIH0gfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdO1xuICB9O1xuICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbn07XG5mdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xuICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gIGZ1bmN0aW9uIF9fKCkge1xuICAgIHRoaXMuY29uc3RydWN0b3IgPSBkO1xuICB9XG4gIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn1cbnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uICgpIHtcbiAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbiAgfTtcbiAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xuICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICBhcltpXSA9IGZyb21baV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufVxudHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XG4gIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xufTtcblxudmFyIEFjdGlvblR5cGUgPSB7XG4gICAgQUREX0NIT0lDRTogJ0FERF9DSE9JQ0UnLFxuICAgIFJFTU9WRV9DSE9JQ0U6ICdSRU1PVkVfQ0hPSUNFJyxcbiAgICBGSUxURVJfQ0hPSUNFUzogJ0ZJTFRFUl9DSE9JQ0VTJyxcbiAgICBBQ1RJVkFURV9DSE9JQ0VTOiAnQUNUSVZBVEVfQ0hPSUNFUycsXG4gICAgQ0xFQVJfQ0hPSUNFUzogJ0NMRUFSX0NIT0lDRVMnLFxuICAgIEFERF9HUk9VUDogJ0FERF9HUk9VUCcsXG4gICAgQUREX0lURU06ICdBRERfSVRFTScsXG4gICAgUkVNT1ZFX0lURU06ICdSRU1PVkVfSVRFTScsXG4gICAgSElHSExJR0hUX0lURU06ICdISUdITElHSFRfSVRFTScsXG59O1xuXG52YXIgRXZlbnRUeXBlID0ge1xuICAgIHNob3dEcm9wZG93bjogJ3Nob3dEcm9wZG93bicsXG4gICAgaGlkZURyb3Bkb3duOiAnaGlkZURyb3Bkb3duJyxcbiAgICBjaGFuZ2U6ICdjaGFuZ2UnLFxuICAgIGNob2ljZTogJ2Nob2ljZScsXG4gICAgc2VhcmNoOiAnc2VhcmNoJyxcbiAgICBhZGRJdGVtOiAnYWRkSXRlbScsXG4gICAgcmVtb3ZlSXRlbTogJ3JlbW92ZUl0ZW0nLFxuICAgIGhpZ2hsaWdodEl0ZW06ICdoaWdobGlnaHRJdGVtJyxcbiAgICBoaWdobGlnaHRDaG9pY2U6ICdoaWdobGlnaHRDaG9pY2UnLFxuICAgIHVuaGlnaGxpZ2h0SXRlbTogJ3VuaGlnaGxpZ2h0SXRlbScsXG59O1xuXG52YXIgS2V5Q29kZU1hcCA9IHtcbiAgICBUQUJfS0VZOiA5LFxuICAgIFNISUZUX0tFWTogMTYsXG4gICAgQkFDS19LRVk6IDQ2LFxuICAgIERFTEVURV9LRVk6IDgsXG4gICAgRU5URVJfS0VZOiAxMyxcbiAgICBBX0tFWTogNjUsXG4gICAgRVNDX0tFWTogMjcsXG4gICAgVVBfS0VZOiAzOCxcbiAgICBET1dOX0tFWTogNDAsXG4gICAgUEFHRV9VUF9LRVk6IDMzLFxuICAgIFBBR0VfRE9XTl9LRVk6IDM0LFxufTtcblxudmFyIE9iamVjdHNJbkNvbmZpZyA9IFsnZnVzZU9wdGlvbnMnLCAnY2xhc3NOYW1lcyddO1xuXG52YXIgUGFzc2VkRWxlbWVudFR5cGVzID0ge1xuICAgIFRleHQ6ICd0ZXh0JyxcbiAgICBTZWxlY3RPbmU6ICdzZWxlY3Qtb25lJyxcbiAgICBTZWxlY3RNdWx0aXBsZTogJ3NlbGVjdC1tdWx0aXBsZScsXG59O1xuXG52YXIgYWRkQ2hvaWNlID0gZnVuY3Rpb24gKGNob2ljZSkgeyByZXR1cm4gKHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlLkFERF9DSE9JQ0UsXG4gICAgY2hvaWNlOiBjaG9pY2UsXG59KTsgfTtcbnZhciByZW1vdmVDaG9pY2UgPSBmdW5jdGlvbiAoY2hvaWNlKSB7IHJldHVybiAoe1xuICAgIHR5cGU6IEFjdGlvblR5cGUuUkVNT1ZFX0NIT0lDRSxcbiAgICBjaG9pY2U6IGNob2ljZSxcbn0pOyB9O1xudmFyIGZpbHRlckNob2ljZXMgPSBmdW5jdGlvbiAocmVzdWx0cykgeyByZXR1cm4gKHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlLkZJTFRFUl9DSE9JQ0VTLFxuICAgIHJlc3VsdHM6IHJlc3VsdHMsXG59KTsgfTtcbnZhciBhY3RpdmF0ZUNob2ljZXMgPSBmdW5jdGlvbiAoYWN0aXZlKSB7XG4gICAgcmV0dXJuICh7XG4gICAgICAgIHR5cGU6IEFjdGlvblR5cGUuQUNUSVZBVEVfQ0hPSUNFUyxcbiAgICAgICAgYWN0aXZlOiBhY3RpdmUsXG4gICAgfSk7XG59O1xuXG52YXIgYWRkR3JvdXAgPSBmdW5jdGlvbiAoZ3JvdXApIHsgcmV0dXJuICh7XG4gICAgdHlwZTogQWN0aW9uVHlwZS5BRERfR1JPVVAsXG4gICAgZ3JvdXA6IGdyb3VwLFxufSk7IH07XG5cbnZhciBhZGRJdGVtID0gZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuICh7XG4gICAgdHlwZTogQWN0aW9uVHlwZS5BRERfSVRFTSxcbiAgICBpdGVtOiBpdGVtLFxufSk7IH07XG52YXIgcmVtb3ZlSXRlbSQxID0gZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuICh7XG4gICAgdHlwZTogQWN0aW9uVHlwZS5SRU1PVkVfSVRFTSxcbiAgICBpdGVtOiBpdGVtLFxufSk7IH07XG52YXIgaGlnaGxpZ2h0SXRlbSA9IGZ1bmN0aW9uIChpdGVtLCBoaWdobGlnaHRlZCkgeyByZXR1cm4gKHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlLkhJR0hMSUdIVF9JVEVNLFxuICAgIGl0ZW06IGl0ZW0sXG4gICAgaGlnaGxpZ2h0ZWQ6IGhpZ2hsaWdodGVkLFxufSk7IH07XG5cbnZhciBnZXRSYW5kb21OdW1iZXIgPSBmdW5jdGlvbiAobWluLCBtYXgpIHsgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTsgfTtcbnZhciBnZW5lcmF0ZUNoYXJzID0gZnVuY3Rpb24gKGxlbmd0aCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBsZW5ndGggfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0UmFuZG9tTnVtYmVyKDAsIDM2KS50b1N0cmluZygzNik7IH0pLmpvaW4oJycpO1xufTtcbnZhciBnZW5lcmF0ZUlkID0gZnVuY3Rpb24gKGVsZW1lbnQsIHByZWZpeCkge1xuICAgIHZhciBpZCA9IGVsZW1lbnQuaWQgfHwgKGVsZW1lbnQubmFtZSAmJiBcIlwiLmNvbmNhdChlbGVtZW50Lm5hbWUsIFwiLVwiKS5jb25jYXQoZ2VuZXJhdGVDaGFycygyKSkpIHx8IGdlbmVyYXRlQ2hhcnMoNCk7XG4gICAgaWQgPSBpZC5yZXBsYWNlKC8oOnxcXC58XFxbfFxcXXwsKS9nLCAnJyk7XG4gICAgaWQgPSBcIlwiLmNvbmNhdChwcmVmaXgsIFwiLVwiKS5jb25jYXQoaWQpO1xuICAgIHJldHVybiBpZDtcbn07XG52YXIgZ2V0QWRqYWNlbnRFbCA9IGZ1bmN0aW9uIChzdGFydEVsLCBzZWxlY3RvciwgZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gdm9pZCAwKSB7IGRpcmVjdGlvbiA9IDE7IH1cbiAgICB2YXIgcHJvcCA9IFwiXCIuY29uY2F0KGRpcmVjdGlvbiA+IDAgPyAnbmV4dCcgOiAncHJldmlvdXMnLCBcIkVsZW1lbnRTaWJsaW5nXCIpO1xuICAgIHZhciBzaWJsaW5nID0gc3RhcnRFbFtwcm9wXTtcbiAgICB3aGlsZSAoc2libGluZykge1xuICAgICAgICBpZiAoc2libGluZy5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIHNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgICAgc2libGluZyA9IHNpYmxpbmdbcHJvcF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcbnZhciBpc1Njcm9sbGVkSW50b1ZpZXcgPSBmdW5jdGlvbiAoZWxlbWVudCwgcGFyZW50LCBkaXJlY3Rpb24pIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSB2b2lkIDApIHsgZGlyZWN0aW9uID0gMTsgfVxuICAgIHZhciBpc1Zpc2libGU7XG4gICAgaWYgKGRpcmVjdGlvbiA+IDApIHtcbiAgICAgICAgLy8gSW4gdmlldyBmcm9tIGJvdHRvbVxuICAgICAgICBpc1Zpc2libGUgPSBwYXJlbnQuc2Nyb2xsVG9wICsgcGFyZW50Lm9mZnNldEhlaWdodCA+PSBlbGVtZW50Lm9mZnNldFRvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gSW4gdmlldyBmcm9tIHRvcFxuICAgICAgICBpc1Zpc2libGUgPSBlbGVtZW50Lm9mZnNldFRvcCA+PSBwYXJlbnQuc2Nyb2xsVG9wO1xuICAgIH1cbiAgICByZXR1cm4gaXNWaXNpYmxlO1xufTtcbnZhciBzYW5pdGlzZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICgncmF3JyBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzYW5pdGlzZSh2YWx1ZS5yYXcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCd0cnVzdGVkJyBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS50cnVzdGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMwMzk7JylcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbn07XG52YXIgc3RyVG9FbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRtcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgdG1wRWwuaW5uZXJIVE1MID0gc3RyLnRyaW0oKTtcbiAgICAgICAgdmFyIGZpcnN0Q2hpbGQgPSB0bXBFbC5jaGlsZHJlblswXTtcbiAgICAgICAgd2hpbGUgKHRtcEVsLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRtcEVsLnJlbW92ZUNoaWxkKHRtcEVsLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaXJzdENoaWxkO1xuICAgIH07XG59KSgpO1xudmFyIHJlc29sdmVOb3RpY2VGdW5jdGlvbiA9IGZ1bmN0aW9uIChmbiwgdmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nID8gZm4oc2FuaXRpc2UodmFsdWUpLCB2YWx1ZSkgOiBmbjtcbn07XG52YXIgcmVzb2x2ZVN0cmluZ0Z1bmN0aW9uID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyA/IGZuKCkgOiBmbjtcbn07XG52YXIgdW53cmFwU3RyaW5nRm9yUmF3ID0gZnVuY3Rpb24gKHMpIHtcbiAgICBpZiAodHlwZW9mIHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmICgndHJ1c3RlZCcgaW4gcykge1xuICAgICAgICAgICAgcmV0dXJuIHMudHJ1c3RlZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJ3JhdycgaW4gcykge1xuICAgICAgICAgICAgcmV0dXJuIHMucmF3O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG52YXIgdW53cmFwU3RyaW5nRm9yRXNjYXBlZCA9IGZ1bmN0aW9uIChzKSB7XG4gICAgaWYgKHR5cGVvZiBzID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoJ2VzY2FwZWQnIGluIHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzLmVzY2FwZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCd0cnVzdGVkJyBpbiBzKSB7XG4gICAgICAgICAgICByZXR1cm4gcy50cnVzdGVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG52YXIgZXNjYXBlRm9yVGVtcGxhdGUgPSBmdW5jdGlvbiAoYWxsb3dIVE1MLCBzKSB7XG4gICAgcmV0dXJuIGFsbG93SFRNTCA/IHVud3JhcFN0cmluZ0ZvckVzY2FwZWQocykgOiBzYW5pdGlzZShzKTtcbn07XG52YXIgc2V0RWxlbWVudEh0bWwgPSBmdW5jdGlvbiAoZWwsIGFsbG93SHRtbCwgaHRtbCkge1xuICAgIGVsLmlubmVySFRNTCA9IGVzY2FwZUZvclRlbXBsYXRlKGFsbG93SHRtbCwgaHRtbCk7XG59O1xudmFyIHNvcnRCeUFscGhhID0gZnVuY3Rpb24gKF9hLCBfYikge1xuICAgIHZhciB2YWx1ZSA9IF9hLnZhbHVlLCBfYyA9IF9hLmxhYmVsLCBsYWJlbCA9IF9jID09PSB2b2lkIDAgPyB2YWx1ZSA6IF9jO1xuICAgIHZhciB2YWx1ZTIgPSBfYi52YWx1ZSwgX2QgPSBfYi5sYWJlbCwgbGFiZWwyID0gX2QgPT09IHZvaWQgMCA/IHZhbHVlMiA6IF9kO1xuICAgIHJldHVybiB1bndyYXBTdHJpbmdGb3JSYXcobGFiZWwpLmxvY2FsZUNvbXBhcmUodW53cmFwU3RyaW5nRm9yUmF3KGxhYmVsMiksIFtdLCB7XG4gICAgICAgIHNlbnNpdGl2aXR5OiAnYmFzZScsXG4gICAgICAgIGlnbm9yZVB1bmN0dWF0aW9uOiB0cnVlLFxuICAgICAgICBudW1lcmljOiB0cnVlLFxuICAgIH0pO1xufTtcbnZhciBzb3J0QnlSYW5rID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYS5yYW5rIC0gYi5yYW5rO1xufTtcbnZhciBkaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHR5cGUsIGN1c3RvbUFyZ3MpIHtcbiAgICBpZiAoY3VzdG9tQXJncyA9PT0gdm9pZCAwKSB7IGN1c3RvbUFyZ3MgPSBudWxsOyB9XG4gICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KHR5cGUsIHtcbiAgICAgICAgZGV0YWlsOiBjdXN0b21BcmdzLFxuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgIH0pO1xuICAgIHJldHVybiBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufTtcbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBrZXlzIHByZXNlbnQgb24gdGhlIGZpcnN0IGJ1dCBtaXNzaW5nIG9uIHRoZSBzZWNvbmQgb2JqZWN0XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG52YXIgZGlmZiA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIGFLZXlzID0gT2JqZWN0LmtleXMoYSkuc29ydCgpO1xuICAgIHZhciBiS2V5cyA9IE9iamVjdC5rZXlzKGIpLnNvcnQoKTtcbiAgICByZXR1cm4gYUtleXMuZmlsdGVyKGZ1bmN0aW9uIChpKSB7IHJldHVybiBiS2V5cy5pbmRleE9mKGkpIDwgMDsgfSk7XG59O1xudmFyIGdldENsYXNzTmFtZXMgPSBmdW5jdGlvbiAoQ2xhc3NOYW1lcykge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KENsYXNzTmFtZXMpID8gQ2xhc3NOYW1lcyA6IFtDbGFzc05hbWVzXTtcbn07XG52YXIgZ2V0Q2xhc3NOYW1lc1NlbGVjdG9yID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICAgIGlmIChvcHRpb24gJiYgQXJyYXkuaXNBcnJheShvcHRpb24pKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25cbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBcIi5cIi5jb25jYXQoaXRlbSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgfVxuICAgIHJldHVybiBcIi5cIi5jb25jYXQob3B0aW9uKTtcbn07XG52YXIgYWRkQ2xhc3Nlc1RvRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICB2YXIgX2E7XG4gICAgKF9hID0gZWxlbWVudC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYSwgZ2V0Q2xhc3NOYW1lcyhjbGFzc05hbWUpKTtcbn07XG52YXIgcmVtb3ZlQ2xhc3Nlc0Zyb21FbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgIHZhciBfYTtcbiAgICAoX2EgPSBlbGVtZW50LmNsYXNzTGlzdCkucmVtb3ZlLmFwcGx5KF9hLCBnZXRDbGFzc05hbWVzKGNsYXNzTmFtZSkpO1xufTtcbnZhciBwYXJzZUN1c3RvbVByb3BlcnRpZXMgPSBmdW5jdGlvbiAoY3VzdG9tUHJvcGVydGllcykge1xuICAgIGlmICh0eXBlb2YgY3VzdG9tUHJvcGVydGllcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGN1c3RvbVByb3BlcnRpZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gY3VzdG9tUHJvcGVydGllcztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge307XG59O1xudmFyIHVwZGF0ZUNsYXNzTGlzdCA9IGZ1bmN0aW9uIChpdGVtLCBhZGQsIHJlbW92ZSkge1xuICAgIHZhciBpdGVtRWwgPSBpdGVtLml0ZW1FbDtcbiAgICBpZiAoaXRlbUVsKSB7XG4gICAgICAgIHJlbW92ZUNsYXNzZXNGcm9tRWxlbWVudChpdGVtRWwsIHJlbW92ZSk7XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoaXRlbUVsLCBhZGQpO1xuICAgIH1cbn07XG5cbnZhciBEcm9wZG93biA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcm9wZG93bihfYSkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IF9hLmVsZW1lbnQsIHR5cGUgPSBfYS50eXBlLCBjbGFzc05hbWVzID0gX2EuY2xhc3NOYW1lcztcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG93IGRyb3Bkb3duIHRvIHVzZXIgYnkgYWRkaW5nIGFjdGl2ZSBzdGF0ZSBjbGFzc1xuICAgICAqL1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KHRoaXMuZWxlbWVudCwgdGhpcy5jbGFzc05hbWVzLmFjdGl2ZVN0YXRlKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhpZGUgZHJvcGRvd24gZnJvbSB1c2VyXG4gICAgICovXG4gICAgRHJvcGRvd24ucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlbW92ZUNsYXNzZXNGcm9tRWxlbWVudCh0aGlzLmVsZW1lbnQsIHRoaXMuY2xhc3NOYW1lcy5hY3RpdmVTdGF0ZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBEcm9wZG93bjtcbn0oKSk7XG5cbnZhciBDb250YWluZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGFpbmVyKF9hKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gX2EuZWxlbWVudCwgdHlwZSA9IF9hLnR5cGUsIGNsYXNzTmFtZXMgPSBfYS5jbGFzc05hbWVzLCBwb3NpdGlvbiA9IF9hLnBvc2l0aW9uO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNGbGlwcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgd2hldGhlciBjb250YWluZXIgc2hvdWxkIGJlIGZsaXBwZWQgYmFzZWQgb24gcGFzc2VkXG4gICAgICogZHJvcGRvd24gcG9zaXRpb25cbiAgICAgKi9cbiAgICBDb250YWluZXIucHJvdG90eXBlLnNob3VsZEZsaXAgPSBmdW5jdGlvbiAoZHJvcGRvd25Qb3MsIGRyb3Bkb3duSGVpZ2h0KSB7XG4gICAgICAgIC8vIElmIGZsaXAgaXMgZW5hYmxlZCBhbmQgdGhlIGRyb3Bkb3duIGJvdHRvbSBwb3NpdGlvbiBpc1xuICAgICAgICAvLyBncmVhdGVyIHRoYW4gdGhlIHdpbmRvdyBoZWlnaHQgZmxpcCB0aGUgZHJvcGRvd24uXG4gICAgICAgIHZhciBzaG91bGRGbGlwID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgIHNob3VsZEZsaXAgPVxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSBkcm9wZG93bkhlaWdodCA+PSAwICYmXG4gICAgICAgICAgICAgICAgICAgICF3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4taGVpZ2h0OiBcIi5jb25jYXQoZHJvcGRvd25Qb3MgKyAxLCBcInB4KVwiKSkubWF0Y2hlcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBvc2l0aW9uID09PSAndG9wJykge1xuICAgICAgICAgICAgc2hvdWxkRmxpcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNob3VsZEZsaXA7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnNldEFjdGl2ZURlc2NlbmRhbnQgPSBmdW5jdGlvbiAoYWN0aXZlRGVzY2VuZGFudElEKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIGFjdGl2ZURlc2NlbmRhbnRJRCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUFjdGl2ZURlc2NlbmRhbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKGRyb3Bkb3duUG9zLCBkcm9wZG93bkhlaWdodCkge1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KHRoaXMuZWxlbWVudCwgdGhpcy5jbGFzc05hbWVzLm9wZW5TdGF0ZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZEZsaXAoZHJvcGRvd25Qb3MsIGRyb3Bkb3duSGVpZ2h0KSkge1xuICAgICAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudCh0aGlzLmVsZW1lbnQsIHRoaXMuY2xhc3NOYW1lcy5mbGlwcGVkU3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5pc0ZsaXBwZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZW1vdmVDbGFzc2VzRnJvbUVsZW1lbnQodGhpcy5lbGVtZW50LCB0aGlzLmNsYXNzTmFtZXMub3BlblN0YXRlKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICB0aGlzLnJlbW92ZUFjdGl2ZURlc2NlbmRhbnQoKTtcbiAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgLy8gQSBkcm9wZG93biBmbGlwcyBpZiBpdCBkb2VzIG5vdCBoYXZlIHNwYWNlIHdpdGhpbiB0aGUgcGFnZVxuICAgICAgICBpZiAodGhpcy5pc0ZsaXBwZWQpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzZXNGcm9tRWxlbWVudCh0aGlzLmVsZW1lbnQsIHRoaXMuY2xhc3NOYW1lcy5mbGlwcGVkU3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5pc0ZsaXBwZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5hZGRGb2N1c1N0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KHRoaXMuZWxlbWVudCwgdGhpcy5jbGFzc05hbWVzLmZvY3VzU3RhdGUpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVGb2N1c1N0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZW1vdmVDbGFzc2VzRnJvbUVsZW1lbnQodGhpcy5lbGVtZW50LCB0aGlzLmNsYXNzTmFtZXMuZm9jdXNTdGF0ZSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVtb3ZlQ2xhc3Nlc0Zyb21FbGVtZW50KHRoaXMuZWxlbWVudCwgdGhpcy5jbGFzc05hbWVzLmRpc2FibGVkU3RhdGUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJyk7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFBhc3NlZEVsZW1lbnRUeXBlcy5TZWxlY3RPbmUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudCh0aGlzLmVsZW1lbnQsIHRoaXMuY2xhc3NOYW1lcy5kaXNhYmxlZFN0YXRlKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFBhc3NlZEVsZW1lbnRUeXBlcy5TZWxlY3RPbmUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUud3JhcCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBlbCA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5uZXh0U2libGluZykge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCBlbGVtZW50Lm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS51bndyYXAgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgZWwgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gZWwucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIC8vIE1vdmUgcGFzc2VkIGVsZW1lbnQgb3V0c2lkZSB0aGlzIGVsZW1lbnRcbiAgICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIGVsKTtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGlzIGVsZW1lbnRcbiAgICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmFkZExvYWRpbmdTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudCh0aGlzLmVsZW1lbnQsIHRoaXMuY2xhc3NOYW1lcy5sb2FkaW5nU3RhdGUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWJ1c3knLCAndHJ1ZScpO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUxvYWRpbmdTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVtb3ZlQ2xhc3Nlc0Zyb21FbGVtZW50KHRoaXMuZWxlbWVudCwgdGhpcy5jbGFzc05hbWVzLmxvYWRpbmdTdGF0ZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYnVzeScpO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRhaW5lcjtcbn0oKSk7XG5cbnZhciBJbnB1dCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbnB1dChfYSkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IF9hLmVsZW1lbnQsIHR5cGUgPSBfYS50eXBlLCBjbGFzc05hbWVzID0gX2EuY2xhc3NOYW1lcywgcHJldmVudFBhc3RlID0gX2EucHJldmVudFBhc3RlO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuICAgICAgICB0aGlzLnByZXZlbnRQYXN0ZSA9IHByZXZlbnRQYXN0ZTtcbiAgICAgICAgdGhpcy5pc0ZvY3Vzc2VkID0gdGhpcy5lbGVtZW50LmlzRXF1YWxOb2RlKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBlbGVtZW50LmRpc2FibGVkO1xuICAgICAgICB0aGlzLl9vblBhc3RlID0gdGhpcy5fb25QYXN0ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vbklucHV0ID0gdGhpcy5fb25JbnB1dC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vbkZvY3VzID0gdGhpcy5fb25Gb2N1cy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vbkJsdXIgPSB0aGlzLl9vbkJsdXIuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0LnByb3RvdHlwZSwgXCJwbGFjZWhvbGRlclwiLCB7XG4gICAgICAgIHNldDogZnVuY3Rpb24gKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIElucHV0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gdGhpcy5lbGVtZW50O1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIHRoaXMuX29uUGFzdGUpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuX29uSW5wdXQsIHtcbiAgICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX29uRm9jdXMsIHtcbiAgICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5fb25CbHVyLCB7XG4gICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIElucHV0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gdGhpcy5lbGVtZW50O1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuX29uSW5wdXQpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdwYXN0ZScsIHRoaXMuX29uUGFzdGUpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX29uRm9jdXMpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5fb25CbHVyKTtcbiAgICB9O1xuICAgIElucHV0LnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9O1xuICAgIElucHV0LnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgICAgIHRoaXMuaXNEaXNhYmxlZCA9IHRydWU7XG4gICAgfTtcbiAgICBJbnB1dC5wcm90b3R5cGUuZm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0ZvY3Vzc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgSW5wdXQucHJvdG90eXBlLmJsdXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRm9jdXNzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5ibHVyKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIElucHV0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIChzZXRXaWR0aCkge1xuICAgICAgICBpZiAoc2V0V2lkdGggPT09IHZvaWQgMCkgeyBzZXRXaWR0aCA9IHRydWU7IH1cbiAgICAgICAgdGhpcy5lbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIGlmIChzZXRXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRXaWR0aCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjb3JyZWN0IGlucHV0IHdpZHRoIGJhc2VkIG9uIHBsYWNlaG9sZGVyXG4gICAgICogdmFsdWUgb3IgaW5wdXQgdmFsdWVcbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUuc2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFJlc2l6ZSBpbnB1dCB0byBjb250ZW50cyBvciBwbGFjZWhvbGRlclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5taW5XaWR0aCA9IFwiXCIuY29uY2F0KGVsZW1lbnQucGxhY2Vob2xkZXIubGVuZ3RoICsgMSwgXCJjaFwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IFwiXCIuY29uY2F0KGVsZW1lbnQudmFsdWUubGVuZ3RoICsgMSwgXCJjaFwiKTtcbiAgICB9O1xuICAgIElucHV0LnByb3RvdHlwZS5zZXRBY3RpdmVEZXNjZW5kYW50ID0gZnVuY3Rpb24gKGFjdGl2ZURlc2NlbmRhbnRJRCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBhY3RpdmVEZXNjZW5kYW50SUQpO1xuICAgIH07XG4gICAgSW5wdXQucHJvdG90eXBlLnJlbW92ZUFjdGl2ZURlc2NlbmRhbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgIH07XG4gICAgSW5wdXQucHJvdG90eXBlLl9vbklucHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy50eXBlICE9PSBQYXNzZWRFbGVtZW50VHlwZXMuU2VsZWN0T25lKSB7XG4gICAgICAgICAgICB0aGlzLnNldFdpZHRoKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIElucHV0LnByb3RvdHlwZS5fb25QYXN0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wcmV2ZW50UGFzdGUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIElucHV0LnByb3RvdHlwZS5fb25Gb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc0ZvY3Vzc2VkID0gdHJ1ZTtcbiAgICB9O1xuICAgIElucHV0LnByb3RvdHlwZS5fb25CbHVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlzRm9jdXNzZWQgPSBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBJbnB1dDtcbn0oKSk7XG5cbnZhciBTQ1JPTExJTkdfU1BFRUQgPSA0O1xuXG52YXIgTGlzdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaXN0KF9hKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gX2EuZWxlbWVudDtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5zY3JvbGxQb3MgPSB0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfVxuICAgIExpc3QucHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB2YXIgY2hpbGQgPSB0aGlzLmVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGlmIChjaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lmluc2VydEJlZm9yZShub2RlLCBjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKG5vZGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMaXN0LnByb3RvdHlwZS5zY3JvbGxUb1RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgfTtcbiAgICBMaXN0LnByb3RvdHlwZS5zY3JvbGxUb0NoaWxkRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBkaXJlY3Rpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RIZWlnaHQgPSB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAvLyBTY3JvbGwgcG9zaXRpb24gb2YgZHJvcGRvd25cbiAgICAgICAgdmFyIGxpc3RTY3JvbGxQb3NpdGlvbiA9IHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgKyBsaXN0SGVpZ2h0O1xuICAgICAgICB2YXIgZWxlbWVudEhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAvLyBEaXN0YW5jZSBmcm9tIGJvdHRvbSBvZiBlbGVtZW50IHRvIHRvcCBvZiBwYXJlbnRcbiAgICAgICAgdmFyIGVsZW1lbnRQb3MgPSBlbGVtZW50Lm9mZnNldFRvcCArIGVsZW1lbnRIZWlnaHQ7XG4gICAgICAgIC8vIERpZmZlcmVuY2UgYmV0d2VlbiB0aGUgZWxlbWVudCBhbmQgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IGRpcmVjdGlvbiA+IDAgPyB0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wICsgZWxlbWVudFBvcyAtIGxpc3RTY3JvbGxQb3NpdGlvbiA6IGVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX2FuaW1hdGVTY3JvbGwoZGVzdGluYXRpb24sIGRpcmVjdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTGlzdC5wcm90b3R5cGUuX3Njcm9sbERvd24gPSBmdW5jdGlvbiAoc2Nyb2xsUG9zLCBzdHJlbmd0aCwgZGVzdGluYXRpb24pIHtcbiAgICAgICAgdmFyIGVhc2luZyA9IChkZXN0aW5hdGlvbiAtIHNjcm9sbFBvcykgLyBzdHJlbmd0aDtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gZWFzaW5nID4gMSA/IGVhc2luZyA6IDE7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxQb3MgKyBkaXN0YW5jZTtcbiAgICB9O1xuICAgIExpc3QucHJvdG90eXBlLl9zY3JvbGxVcCA9IGZ1bmN0aW9uIChzY3JvbGxQb3MsIHN0cmVuZ3RoLCBkZXN0aW5hdGlvbikge1xuICAgICAgICB2YXIgZWFzaW5nID0gKHNjcm9sbFBvcyAtIGRlc3RpbmF0aW9uKSAvIHN0cmVuZ3RoO1xuICAgICAgICB2YXIgZGlzdGFuY2UgPSBlYXNpbmcgPiAxID8gZWFzaW5nIDogMTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFBvcyAtIGRpc3RhbmNlO1xuICAgIH07XG4gICAgTGlzdC5wcm90b3R5cGUuX2FuaW1hdGVTY3JvbGwgPSBmdW5jdGlvbiAoZGVzdGluYXRpb24sIGRpcmVjdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgc3RyZW5ndGggPSBTQ1JPTExJTkdfU1BFRUQ7XG4gICAgICAgIHZhciBjaG9pY2VMaXN0U2Nyb2xsVG9wID0gdGhpcy5lbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgdmFyIGNvbnRpbnVlQW5pbWF0aW9uID0gZmFsc2U7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxEb3duKGNob2ljZUxpc3RTY3JvbGxUb3AsIHN0cmVuZ3RoLCBkZXN0aW5hdGlvbik7XG4gICAgICAgICAgICBpZiAoY2hvaWNlTGlzdFNjcm9sbFRvcCA8IGRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29udGludWVBbmltYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVXAoY2hvaWNlTGlzdFNjcm9sbFRvcCwgc3RyZW5ndGgsIGRlc3RpbmF0aW9uKTtcbiAgICAgICAgICAgIGlmIChjaG9pY2VMaXN0U2Nyb2xsVG9wID4gZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZUFuaW1hdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRpbnVlQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9hbmltYXRlU2Nyb2xsKGRlc3RpbmF0aW9uLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBMaXN0O1xufSgpKTtcblxudmFyIFdyYXBwZWRFbGVtZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdyYXBwZWRFbGVtZW50KF9hKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gX2EuZWxlbWVudCwgY2xhc3NOYW1lcyA9IF9hLmNsYXNzTmFtZXM7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG4gICAgICAgIHRoaXMuaXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JhcHBlZEVsZW1lbnQucHJvdG90eXBlLCBcImlzQWN0aXZlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmRhdGFzZXQuY2hvaWNlID09PSAnYWN0aXZlJztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXcmFwcGVkRWxlbWVudC5wcm90b3R5cGUsIFwiZGlyXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmRpcjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXcmFwcGVkRWxlbWVudC5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgV3JhcHBlZEVsZW1lbnQucHJvdG90eXBlLmNvbmNlYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgLy8gSGlkZSBwYXNzZWQgaW5wdXRcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChlbCwgdGhpcy5jbGFzc05hbWVzLmlucHV0KTtcbiAgICAgICAgZWwuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgLy8gUmVtb3ZlIGVsZW1lbnQgZnJvbSB0YWIgaW5kZXhcbiAgICAgICAgZWwudGFiSW5kZXggPSAtMTtcbiAgICAgICAgLy8gQmFja3VwIG9yaWdpbmFsIHN0eWxlcyBpZiBhbnlcbiAgICAgICAgdmFyIG9yaWdTdHlsZSA9IGVsLmdldEF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgaWYgKG9yaWdTdHlsZSkge1xuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLWNob2ljZS1vcmlnLXN0eWxlJywgb3JpZ1N0eWxlKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2hvaWNlJywgJ2FjdGl2ZScpO1xuICAgIH07XG4gICAgV3JhcHBlZEVsZW1lbnQucHJvdG90eXBlLnJldmVhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gdGhpcy5lbGVtZW50O1xuICAgICAgICAvLyBSZWluc3RhdGUgcGFzc2VkIGVsZW1lbnRcbiAgICAgICAgcmVtb3ZlQ2xhc3Nlc0Zyb21FbGVtZW50KGVsLCB0aGlzLmNsYXNzTmFtZXMuaW5wdXQpO1xuICAgICAgICBlbC5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgICAvLyBSZWNvdmVyIG9yaWdpbmFsIHN0eWxlcyBpZiBhbnlcbiAgICAgICAgdmFyIG9yaWdTdHlsZSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jaG9pY2Utb3JpZy1zdHlsZScpO1xuICAgICAgICBpZiAob3JpZ1N0eWxlKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtY2hvaWNlLW9yaWctc3R5bGUnKTtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBvcmlnU3R5bGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1jaG9pY2UnKTtcbiAgICB9O1xuICAgIFdyYXBwZWRFbGVtZW50LnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9O1xuICAgIFdyYXBwZWRFbGVtZW50LnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIFdyYXBwZWRFbGVtZW50LnByb3RvdHlwZS50cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnRUeXBlLCBkYXRhKSB7XG4gICAgICAgIGRpc3BhdGNoRXZlbnQodGhpcy5lbGVtZW50LCBldmVudFR5cGUsIGRhdGEgfHwge30pO1xuICAgIH07XG4gICAgcmV0dXJuIFdyYXBwZWRFbGVtZW50O1xufSgpKTtcblxudmFyIFdyYXBwZWRJbnB1dCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoV3JhcHBlZElucHV0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFdyYXBwZWRJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gV3JhcHBlZElucHV0O1xufShXcmFwcGVkRWxlbWVudCkpO1xuXG52YXIgY29lcmNlQm9vbCA9IGZ1bmN0aW9uIChhcmcsIGRlZmF1bHRWYWx1ZSkge1xuICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHZvaWQgMCkgeyBkZWZhdWx0VmFsdWUgPSB0cnVlOyB9XG4gICAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdFZhbHVlIDogISFhcmc7XG59O1xudmFyIHN0cmluZ1RvSHRtbENsYXNzID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGlucHV0ID0gaW5wdXQuc3BsaXQoJyAnKS5maWx0ZXIoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMubGVuZ3RoOyB9KTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpICYmIGlucHV0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xudmFyIG1hcElucHV0VG9DaG9pY2UgPSBmdW5jdGlvbiAodmFsdWUsIGFsbG93R3JvdXAsIGFsbG93UmF3U3RyaW5nKSB7XG4gICAgaWYgKGFsbG93UmF3U3RyaW5nID09PSB2b2lkIDApIHsgYWxsb3dSYXdTdHJpbmcgPSB0cnVlOyB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIHNhbml0aXNlZFZhbHVlID0gc2FuaXRpc2UodmFsdWUpO1xuICAgICAgICB2YXIgdXNlclZhbHVlID0gYWxsb3dSYXdTdHJpbmcgfHwgc2FuaXRpc2VkVmFsdWUgPT09IHZhbHVlID8gdmFsdWUgOiB7IGVzY2FwZWQ6IHNhbml0aXNlZFZhbHVlLCByYXc6IHZhbHVlIH07XG4gICAgICAgIHZhciByZXN1bHRfMSA9IG1hcElucHV0VG9DaG9pY2Uoe1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgbGFiZWw6IHVzZXJWYWx1ZSxcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIHJldHVybiByZXN1bHRfMTtcbiAgICB9XG4gICAgdmFyIGdyb3VwT3JDaG9pY2UgPSB2YWx1ZTtcbiAgICBpZiAoJ2Nob2ljZXMnIGluIGdyb3VwT3JDaG9pY2UpIHtcbiAgICAgICAgaWYgKCFhbGxvd0dyb3VwKSB7XG4gICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvb3B0Z3JvdXBcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRHcm91cCBpcyBub3QgYWxsb3dlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZ3JvdXAgPSBncm91cE9yQ2hvaWNlO1xuICAgICAgICB2YXIgY2hvaWNlcyA9IGdyb3VwLmNob2ljZXMubWFwKGZ1bmN0aW9uIChlKSB7IHJldHVybiBtYXBJbnB1dFRvQ2hvaWNlKGUsIGZhbHNlKTsgfSk7XG4gICAgICAgIHZhciByZXN1bHRfMiA9IHtcbiAgICAgICAgICAgIGlkOiAwLCAvLyBhY3R1YWwgSUQgd2lsbCBiZSBhc3NpZ25lZCBkdXJpbmcgX2FkZEdyb3VwXG4gICAgICAgICAgICBsYWJlbDogdW53cmFwU3RyaW5nRm9yUmF3KGdyb3VwLmxhYmVsKSB8fCBncm91cC52YWx1ZSxcbiAgICAgICAgICAgIGFjdGl2ZTogISFjaG9pY2VzLmxlbmd0aCxcbiAgICAgICAgICAgIGRpc2FibGVkOiAhIWdyb3VwLmRpc2FibGVkLFxuICAgICAgICAgICAgY2hvaWNlczogY2hvaWNlcyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdF8yO1xuICAgIH1cbiAgICB2YXIgY2hvaWNlID0gZ3JvdXBPckNob2ljZTtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBpZDogMCwgLy8gYWN0dWFsIElEIHdpbGwgYmUgYXNzaWduZWQgZHVyaW5nIF9hZGRDaG9pY2VcbiAgICAgICAgZ3JvdXA6IG51bGwsIC8vIGFjdHVhbCBncm91cCB3aWxsIGJlIGFzc2lnbmVkIGR1cmluZyBfYWRkR3JvdXAgYnV0IGJlZm9yZSBfYWRkQ2hvaWNlXG4gICAgICAgIHNjb3JlOiAwLCAvLyB1c2VkIGluIHNlYXJjaFxuICAgICAgICByYW5rOiAwLCAvLyB1c2VkIGluIHNlYXJjaCwgc3RhYmxlIHNvcnQgb3JkZXJcbiAgICAgICAgdmFsdWU6IGNob2ljZS52YWx1ZSxcbiAgICAgICAgbGFiZWw6IGNob2ljZS5sYWJlbCB8fCBjaG9pY2UudmFsdWUsXG4gICAgICAgIGFjdGl2ZTogY29lcmNlQm9vbChjaG9pY2UuYWN0aXZlKSxcbiAgICAgICAgc2VsZWN0ZWQ6IGNvZXJjZUJvb2woY2hvaWNlLnNlbGVjdGVkLCBmYWxzZSksXG4gICAgICAgIGRpc2FibGVkOiBjb2VyY2VCb29sKGNob2ljZS5kaXNhYmxlZCwgZmFsc2UpLFxuICAgICAgICBwbGFjZWhvbGRlcjogY29lcmNlQm9vbChjaG9pY2UucGxhY2Vob2xkZXIsIGZhbHNlKSxcbiAgICAgICAgaGlnaGxpZ2h0ZWQ6IGZhbHNlLFxuICAgICAgICBsYWJlbENsYXNzOiBzdHJpbmdUb0h0bWxDbGFzcyhjaG9pY2UubGFiZWxDbGFzcyksXG4gICAgICAgIGxhYmVsRGVzY3JpcHRpb246IGNob2ljZS5sYWJlbERlc2NyaXB0aW9uLFxuICAgICAgICBjdXN0b21Qcm9wZXJ0aWVzOiBjaG9pY2UuY3VzdG9tUHJvcGVydGllcyxcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgaXNIdG1sSW5wdXRFbGVtZW50ID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUudGFnTmFtZSA9PT0gJ0lOUFVUJzsgfTtcbnZhciBpc0h0bWxTZWxlY3RFbGVtZW50ID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUudGFnTmFtZSA9PT0gJ1NFTEVDVCc7IH07XG52YXIgaXNIdG1sT3B0aW9uID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUudGFnTmFtZSA9PT0gJ09QVElPTic7IH07XG52YXIgaXNIdG1sT3B0Z3JvdXAgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS50YWdOYW1lID09PSAnT1BUR1JPVVAnOyB9O1xuXG52YXIgV3JhcHBlZFNlbGVjdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoV3JhcHBlZFNlbGVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBXcmFwcGVkU2VsZWN0KF9hKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gX2EuZWxlbWVudCwgY2xhc3NOYW1lcyA9IF9hLmNsYXNzTmFtZXMsIHRlbXBsYXRlID0gX2EudGVtcGxhdGUsIGV4dHJhY3RQbGFjZWhvbGRlciA9IF9hLmV4dHJhY3RQbGFjZWhvbGRlcjtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgeyBlbGVtZW50OiBlbGVtZW50LCBjbGFzc05hbWVzOiBjbGFzc05hbWVzIH0pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgICAgIF90aGlzLmV4dHJhY3RQbGFjZWhvbGRlciA9IGV4dHJhY3RQbGFjZWhvbGRlcjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JhcHBlZFNlbGVjdC5wcm90b3R5cGUsIFwicGxhY2Vob2xkZXJPcHRpb25cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ29wdGlvblt2YWx1ZT1cIlwiXScpIHx8XG4gICAgICAgICAgICAgICAgLy8gQmFja3dhcmQgY29tcGF0aWJpbGl0eSBsYXllciBmb3IgdGhlIG5vbi1zdGFuZGFyZCBwbGFjZWhvbGRlciBhdHRyaWJ1dGUgc3VwcG9ydGVkIGluIG9sZGVyIHZlcnNpb25zLlxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdvcHRpb25bcGxhY2Vob2xkZXJdJykpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgV3JhcHBlZFNlbGVjdC5wcm90b3R5cGUuYWRkT3B0aW9ucyA9IGZ1bmN0aW9uIChjaG9pY2VzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY2hvaWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHZhciBjaG9pY2UgPSBvYmo7XG4gICAgICAgICAgICBpZiAoY2hvaWNlLmVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb3B0aW9uID0gX3RoaXMudGVtcGxhdGUoY2hvaWNlKTtcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgICAgICBjaG9pY2UuZWxlbWVudCA9IG9wdGlvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgfTtcbiAgICBXcmFwcGVkU2VsZWN0LnByb3RvdHlwZS5vcHRpb25zQXNDaG9pY2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgY2hvaWNlcyA9IFtdO1xuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnOnNjb3BlID4gb3B0aW9uLCA6c2NvcGUgPiBvcHRncm91cCcpLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChpc0h0bWxPcHRpb24oZSkpIHtcbiAgICAgICAgICAgICAgICBjaG9pY2VzLnB1c2goX3RoaXMuX29wdGlvblRvQ2hvaWNlKGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzSHRtbE9wdGdyb3VwKGUpKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlcy5wdXNoKF90aGlzLl9vcHRncm91cFRvQ2hvaWNlKGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRvZG86IGhyIGFzIGVtcHR5IG9wdGdyb3VwLCByZXF1aXJlcyBkaXNwbGF5aW5nIGVtcHR5IG9wdC1ncm91cHMgdG8gYmUgdXNlZnVsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2hvaWNlcztcbiAgICB9O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgV3JhcHBlZFNlbGVjdC5wcm90b3R5cGUuX29wdGlvblRvQ2hvaWNlID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICAgICAgICAvLyBvcHRpb24udmFsdWUgcmV0dXJucyB0aGUgbGFiZWwgaWYgdGhlcmUgaXMgbm8gdmFsdWUgYXR0cmlidXRlLCB3aGljaCBjYW4gYnJlYWsgbGVnYWN5IHBsYWNlaG9sZGVyIGF0dHJpYnV0ZSBzdXBwb3J0XG4gICAgICAgIGlmICghb3B0aW9uLmhhc0F0dHJpYnV0ZSgndmFsdWUnKSAmJiBvcHRpb24uaGFzQXR0cmlidXRlKCdwbGFjZWhvbGRlcicpKSB7XG4gICAgICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsICcnKTtcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIGdyb3VwOiBudWxsLFxuICAgICAgICAgICAgc2NvcmU6IDAsXG4gICAgICAgICAgICByYW5rOiAwLFxuICAgICAgICAgICAgdmFsdWU6IG9wdGlvbi52YWx1ZSxcbiAgICAgICAgICAgIGxhYmVsOiBvcHRpb24uaW5uZXJUZXh0LCAvLyBIVE1MIG9wdGlvbnMgZG8gbm90IHN1cHBvcnQgbW9zdCBodG1sIHRhZ3MsIGJ1dCBpbm5lckh0bWwgd2lsbCBleHRyYWN0IGh0bWwgY29tbWVudHMuLi5cbiAgICAgICAgICAgIGVsZW1lbnQ6IG9wdGlvbixcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIC8vIHRoaXMgcmV0dXJucyB0cnVlIGlmIG5vdGhpbmcgaXMgc2VsZWN0ZWQgb24gaW5pdGlhbCBsb2FkLCB3aGljaCB3aWxsIGJyZWFrIHBsYWNlaG9sZGVyIHN1cHBvcnRcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLmV4dHJhY3RQbGFjZWhvbGRlciA/IG9wdGlvbi5zZWxlY3RlZCA6IG9wdGlvbi5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJyksXG4gICAgICAgICAgICBkaXNhYmxlZDogb3B0aW9uLmRpc2FibGVkLFxuICAgICAgICAgICAgaGlnaGxpZ2h0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMuZXh0cmFjdFBsYWNlaG9sZGVyICYmICghb3B0aW9uLnZhbHVlIHx8IG9wdGlvbi5oYXNBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJykpLFxuICAgICAgICAgICAgbGFiZWxDbGFzczogdHlwZW9mIG9wdGlvbi5kYXRhc2V0LmxhYmVsQ2xhc3MgIT09ICd1bmRlZmluZWQnID8gc3RyaW5nVG9IdG1sQ2xhc3Mob3B0aW9uLmRhdGFzZXQubGFiZWxDbGFzcykgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBsYWJlbERlc2NyaXB0aW9uOiB0eXBlb2Ygb3B0aW9uLmRhdGFzZXQubGFiZWxEZXNjcmlwdGlvbiAhPT0gJ3VuZGVmaW5lZCcgPyBvcHRpb24uZGF0YXNldC5sYWJlbERlc2NyaXB0aW9uIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY3VzdG9tUHJvcGVydGllczogcGFyc2VDdXN0b21Qcm9wZXJ0aWVzKG9wdGlvbi5kYXRhc2V0LmN1c3RvbVByb3BlcnRpZXMpLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgV3JhcHBlZFNlbGVjdC5wcm90b3R5cGUuX29wdGdyb3VwVG9DaG9pY2UgPSBmdW5jdGlvbiAob3B0Z3JvdXApIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBvcHRncm91cC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKTtcbiAgICAgICAgdmFyIGNob2ljZXMgPSBBcnJheS5mcm9tKG9wdGlvbnMpLm1hcChmdW5jdGlvbiAob3B0aW9uKSB7IHJldHVybiBfdGhpcy5fb3B0aW9uVG9DaG9pY2Uob3B0aW9uKTsgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIGxhYmVsOiBvcHRncm91cC5sYWJlbCB8fCAnJyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IG9wdGdyb3VwLFxuICAgICAgICAgICAgYWN0aXZlOiAhIWNob2ljZXMubGVuZ3RoLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IG9wdGdyb3VwLmRpc2FibGVkLFxuICAgICAgICAgICAgY2hvaWNlczogY2hvaWNlcyxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBXcmFwcGVkU2VsZWN0O1xufShXcmFwcGVkRWxlbWVudCkpO1xuXG52YXIgREVGQVVMVF9DTEFTU05BTUVTID0ge1xuICAgIGNvbnRhaW5lck91dGVyOiBbJ2Nob2ljZXMnXSxcbiAgICBjb250YWluZXJJbm5lcjogWydjaG9pY2VzX19pbm5lciddLFxuICAgIGlucHV0OiBbJ2Nob2ljZXNfX2lucHV0J10sXG4gICAgaW5wdXRDbG9uZWQ6IFsnY2hvaWNlc19faW5wdXQtLWNsb25lZCddLFxuICAgIGxpc3Q6IFsnY2hvaWNlc19fbGlzdCddLFxuICAgIGxpc3RJdGVtczogWydjaG9pY2VzX19saXN0LS1tdWx0aXBsZSddLFxuICAgIGxpc3RTaW5nbGU6IFsnY2hvaWNlc19fbGlzdC0tc2luZ2xlJ10sXG4gICAgbGlzdERyb3Bkb3duOiBbJ2Nob2ljZXNfX2xpc3QtLWRyb3Bkb3duJ10sXG4gICAgaXRlbTogWydjaG9pY2VzX19pdGVtJ10sXG4gICAgaXRlbVNlbGVjdGFibGU6IFsnY2hvaWNlc19faXRlbS0tc2VsZWN0YWJsZSddLFxuICAgIGl0ZW1EaXNhYmxlZDogWydjaG9pY2VzX19pdGVtLS1kaXNhYmxlZCddLFxuICAgIGl0ZW1DaG9pY2U6IFsnY2hvaWNlc19faXRlbS0tY2hvaWNlJ10sXG4gICAgZGVzY3JpcHRpb246IFsnY2hvaWNlc19fZGVzY3JpcHRpb24nXSxcbiAgICBwbGFjZWhvbGRlcjogWydjaG9pY2VzX19wbGFjZWhvbGRlciddLFxuICAgIGdyb3VwOiBbJ2Nob2ljZXNfX2dyb3VwJ10sXG4gICAgZ3JvdXBIZWFkaW5nOiBbJ2Nob2ljZXNfX2hlYWRpbmcnXSxcbiAgICBidXR0b246IFsnY2hvaWNlc19fYnV0dG9uJ10sXG4gICAgYWN0aXZlU3RhdGU6IFsnaXMtYWN0aXZlJ10sXG4gICAgZm9jdXNTdGF0ZTogWydpcy1mb2N1c2VkJ10sXG4gICAgb3BlblN0YXRlOiBbJ2lzLW9wZW4nXSxcbiAgICBkaXNhYmxlZFN0YXRlOiBbJ2lzLWRpc2FibGVkJ10sXG4gICAgaGlnaGxpZ2h0ZWRTdGF0ZTogWydpcy1oaWdobGlnaHRlZCddLFxuICAgIHNlbGVjdGVkU3RhdGU6IFsnaXMtc2VsZWN0ZWQnXSxcbiAgICBmbGlwcGVkU3RhdGU6IFsnaXMtZmxpcHBlZCddLFxuICAgIGxvYWRpbmdTdGF0ZTogWydpcy1sb2FkaW5nJ10sXG4gICAgbm90aWNlOiBbJ2Nob2ljZXNfX25vdGljZSddLFxuICAgIGFkZENob2ljZTogWydjaG9pY2VzX19pdGVtLS1zZWxlY3RhYmxlJywgJ2FkZC1jaG9pY2UnXSxcbiAgICBub1Jlc3VsdHM6IFsnaGFzLW5vLXJlc3VsdHMnXSxcbiAgICBub0Nob2ljZXM6IFsnaGFzLW5vLWNob2ljZXMnXSxcbn07XG52YXIgREVGQVVMVF9DT05GSUcgPSB7XG4gICAgaXRlbXM6IFtdLFxuICAgIGNob2ljZXM6IFtdLFxuICAgIHNpbGVudDogZmFsc2UsXG4gICAgcmVuZGVyQ2hvaWNlTGltaXQ6IC0xLFxuICAgIG1heEl0ZW1Db3VudDogLTEsXG4gICAgY2xvc2VEcm9wZG93bk9uU2VsZWN0OiAnYXV0bycsXG4gICAgc2luZ2xlTW9kZUZvck11bHRpU2VsZWN0OiBmYWxzZSxcbiAgICBhZGRDaG9pY2VzOiBmYWxzZSxcbiAgICBhZGRJdGVtczogdHJ1ZSxcbiAgICBhZGRJdGVtRmlsdGVyOiBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuICEhdmFsdWUgJiYgdmFsdWUgIT09ICcnOyB9LFxuICAgIHJlbW92ZUl0ZW1zOiB0cnVlLFxuICAgIHJlbW92ZUl0ZW1CdXR0b246IGZhbHNlLFxuICAgIHJlbW92ZUl0ZW1CdXR0b25BbGlnbkxlZnQ6IGZhbHNlLFxuICAgIGVkaXRJdGVtczogZmFsc2UsXG4gICAgYWxsb3dIVE1MOiBmYWxzZSxcbiAgICBhbGxvd0h0bWxVc2VySW5wdXQ6IGZhbHNlLFxuICAgIGR1cGxpY2F0ZUl0ZW1zQWxsb3dlZDogdHJ1ZSxcbiAgICBkZWxpbWl0ZXI6ICcsJyxcbiAgICBwYXN0ZTogdHJ1ZSxcbiAgICBzZWFyY2hFbmFibGVkOiB0cnVlLFxuICAgIHNlYXJjaENob2ljZXM6IHRydWUsXG4gICAgc2VhcmNoRmxvb3I6IDEsXG4gICAgc2VhcmNoUmVzdWx0TGltaXQ6IDQsXG4gICAgc2VhcmNoRmllbGRzOiBbJ2xhYmVsJywgJ3ZhbHVlJ10sXG4gICAgcG9zaXRpb246ICdhdXRvJyxcbiAgICByZXNldFNjcm9sbFBvc2l0aW9uOiB0cnVlLFxuICAgIHNob3VsZFNvcnQ6IHRydWUsXG4gICAgc2hvdWxkU29ydEl0ZW1zOiBmYWxzZSxcbiAgICBzb3J0ZXI6IHNvcnRCeUFscGhhLFxuICAgIHNoYWRvd1Jvb3Q6IG51bGwsXG4gICAgcGxhY2Vob2xkZXI6IHRydWUsXG4gICAgcGxhY2Vob2xkZXJWYWx1ZTogbnVsbCxcbiAgICBzZWFyY2hQbGFjZWhvbGRlclZhbHVlOiBudWxsLFxuICAgIHByZXBlbmRWYWx1ZTogbnVsbCxcbiAgICBhcHBlbmRWYWx1ZTogbnVsbCxcbiAgICByZW5kZXJTZWxlY3RlZENob2ljZXM6ICdhdXRvJyxcbiAgICBsb2FkaW5nVGV4dDogJ0xvYWRpbmcuLi4nLFxuICAgIG5vUmVzdWx0c1RleHQ6ICdObyByZXN1bHRzIGZvdW5kJyxcbiAgICBub0Nob2ljZXNUZXh0OiAnTm8gY2hvaWNlcyB0byBjaG9vc2UgZnJvbScsXG4gICAgaXRlbVNlbGVjdFRleHQ6ICdQcmVzcyB0byBzZWxlY3QnLFxuICAgIHVuaXF1ZUl0ZW1UZXh0OiAnT25seSB1bmlxdWUgdmFsdWVzIGNhbiBiZSBhZGRlZCcsXG4gICAgY3VzdG9tQWRkSXRlbVRleHQ6ICdPbmx5IHZhbHVlcyBtYXRjaGluZyBzcGVjaWZpYyBjb25kaXRpb25zIGNhbiBiZSBhZGRlZCcsXG4gICAgYWRkSXRlbVRleHQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gXCJQcmVzcyBFbnRlciB0byBhZGQgPGI+XFxcIlwiLmNvbmNhdCh2YWx1ZSwgXCJcXFwiPC9iPlwiKTsgfSxcbiAgICByZW1vdmVJdGVtSWNvblRleHQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFwiUmVtb3ZlIGl0ZW1cIjsgfSxcbiAgICByZW1vdmVJdGVtTGFiZWxUZXh0OiBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIFwiUmVtb3ZlIGl0ZW06IFwiLmNvbmNhdCh2YWx1ZSk7IH0sXG4gICAgbWF4SXRlbVRleHQ6IGZ1bmN0aW9uIChtYXhJdGVtQ291bnQpIHsgcmV0dXJuIFwiT25seSBcIi5jb25jYXQobWF4SXRlbUNvdW50LCBcIiB2YWx1ZXMgY2FuIGJlIGFkZGVkXCIpOyB9LFxuICAgIHZhbHVlQ29tcGFyZXI6IGZ1bmN0aW9uICh2YWx1ZTEsIHZhbHVlMikgeyByZXR1cm4gdmFsdWUxID09PSB2YWx1ZTI7IH0sXG4gICAgZnVzZU9wdGlvbnM6IHtcbiAgICAgICAgaW5jbHVkZVNjb3JlOiB0cnVlLFxuICAgIH0sXG4gICAgbGFiZWxJZDogJycsXG4gICAgY2FsbGJhY2tPbkluaXQ6IG51bGwsXG4gICAgY2FsbGJhY2tPbkNyZWF0ZVRlbXBsYXRlczogbnVsbCxcbiAgICBjbGFzc05hbWVzOiBERUZBVUxUX0NMQVNTTkFNRVMsXG4gICAgYXBwZW5kR3JvdXBJblNlYXJjaDogZmFsc2UsXG59O1xuXG52YXIgcmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgdmFyIGl0ZW1FbCA9IGl0ZW0uaXRlbUVsO1xuICAgIGlmIChpdGVtRWwpIHtcbiAgICAgICAgaXRlbUVsLnJlbW92ZSgpO1xuICAgICAgICBpdGVtLml0ZW1FbCA9IHVuZGVmaW5lZDtcbiAgICB9XG59O1xuZnVuY3Rpb24gaXRlbXMocywgYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gcztcbiAgICB2YXIgdXBkYXRlID0gdHJ1ZTtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQWN0aW9uVHlwZS5BRERfSVRFTToge1xuICAgICAgICAgICAgYWN0aW9uLml0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGVsID0gYWN0aW9uLml0ZW0uZWxlbWVudDtcbiAgICAgICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgICAgIGVsLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGUucHVzaChhY3Rpb24uaXRlbSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEFjdGlvblR5cGUuUkVNT1ZFX0lURU06IHtcbiAgICAgICAgICAgIGFjdGlvbi5pdGVtLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgZWwgPSBhY3Rpb24uaXRlbS5lbGVtZW50O1xuICAgICAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICAgICAgZWwuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgLy8gRm9yIGEgc2VsZWN0LW9uZSwgaWYgYWxsIG9wdGlvbnMgYXJlIGRlc2VsZWN0ZWQsIHRoZSBmaXJzdCBpdGVtIGlzIHNlbGVjdGVkLiBUbyBzZXQgYSBibGFjayB2YWx1ZSwgc2VsZWN0LnZhbHVlIG5lZWRzIHRvIGJlIHNldFxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3QgPSBlbC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3QgJiYgaXNIdG1sU2VsZWN0RWxlbWVudChzZWxlY3QpICYmIHNlbGVjdC50eXBlID09PSBQYXNzZWRFbGVtZW50VHlwZXMuU2VsZWN0T25lKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbWl4aW5nIGNvbmNlcm5zLCBidXQgdGhpcyBpcyAqc28gbXVjaCBmYXN0ZXIqXG4gICAgICAgICAgICByZW1vdmVJdGVtKGFjdGlvbi5pdGVtKTtcbiAgICAgICAgICAgIHN0YXRlID0gc3RhdGUuZmlsdGVyKGZ1bmN0aW9uIChjaG9pY2UpIHsgcmV0dXJuIGNob2ljZS5pZCAhPT0gYWN0aW9uLml0ZW0uaWQ7IH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBBY3Rpb25UeXBlLlJFTU9WRV9DSE9JQ0U6IHtcbiAgICAgICAgICAgIHJlbW92ZUl0ZW0oYWN0aW9uLmNob2ljZSk7XG4gICAgICAgICAgICBzdGF0ZSA9IHN0YXRlLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbS5pZCAhPT0gYWN0aW9uLmNob2ljZS5pZDsgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEFjdGlvblR5cGUuSElHSExJR0hUX0lURU06IHtcbiAgICAgICAgICAgIHZhciBoaWdobGlnaHRlZCA9IGFjdGlvbi5oaWdobGlnaHRlZDtcbiAgICAgICAgICAgIHZhciBpdGVtID0gc3RhdGUuZmluZChmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmouaWQgPT09IGFjdGlvbi5pdGVtLmlkOyB9KTtcbiAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0uaGlnaGxpZ2h0ZWQgIT09IGhpZ2hsaWdodGVkKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5oaWdobGlnaHRlZCA9IGhpZ2hsaWdodGVkO1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNsYXNzTGlzdChpdGVtLCBoaWdobGlnaHRlZCA/IGNvbnRleHQuY2xhc3NOYW1lcy5oaWdobGlnaHRlZFN0YXRlIDogY29udGV4dC5jbGFzc05hbWVzLnNlbGVjdGVkU3RhdGUsIGhpZ2hsaWdodGVkID8gY29udGV4dC5jbGFzc05hbWVzLnNlbGVjdGVkU3RhdGUgOiBjb250ZXh0LmNsYXNzTmFtZXMuaGlnaGxpZ2h0ZWRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgdXBkYXRlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBzdGF0ZTogc3RhdGUsIHVwZGF0ZTogdXBkYXRlIH07XG59XG5cbmZ1bmN0aW9uIGdyb3VwcyhzLCBhY3Rpb24pIHtcbiAgICB2YXIgc3RhdGUgPSBzO1xuICAgIHZhciB1cGRhdGUgPSB0cnVlO1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBY3Rpb25UeXBlLkFERF9HUk9VUDoge1xuICAgICAgICAgICAgc3RhdGUucHVzaChhY3Rpb24uZ3JvdXApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBBY3Rpb25UeXBlLkNMRUFSX0NIT0lDRVM6IHtcbiAgICAgICAgICAgIHN0YXRlID0gW107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICB1cGRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHN0YXRlOiBzdGF0ZSwgdXBkYXRlOiB1cGRhdGUgfTtcbn1cblxuLyogZXNsaW50LWRpc2FibGUgKi9cbmZ1bmN0aW9uIGNob2ljZXMocywgYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gcztcbiAgICB2YXIgdXBkYXRlID0gdHJ1ZTtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQWN0aW9uVHlwZS5BRERfQ0hPSUNFOiB7XG4gICAgICAgICAgICBzdGF0ZS5wdXNoKGFjdGlvbi5jaG9pY2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBBY3Rpb25UeXBlLlJFTU9WRV9DSE9JQ0U6IHtcbiAgICAgICAgICAgIGFjdGlvbi5jaG9pY2UuY2hvaWNlRWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoYWN0aW9uLmNob2ljZS5ncm91cCkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5jaG9pY2UuZ3JvdXAuY2hvaWNlcyA9IGFjdGlvbi5jaG9pY2UuZ3JvdXAuY2hvaWNlcy5maWx0ZXIoZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqLmlkICE9PSBhY3Rpb24uY2hvaWNlLmlkOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlID0gc3RhdGUuZmlsdGVyKGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iai5pZCAhPT0gYWN0aW9uLmNob2ljZS5pZDsgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEFjdGlvblR5cGUuQUREX0lURU06XG4gICAgICAgIGNhc2UgQWN0aW9uVHlwZS5SRU1PVkVfSVRFTToge1xuICAgICAgICAgICAgYWN0aW9uLml0ZW0uY2hvaWNlRWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEFjdGlvblR5cGUuRklMVEVSX0NIT0lDRVM6IHtcbiAgICAgICAgICAgIC8vIGF2b2lkIE8obl4yKSBhbGdvcml0aG0gY29tcGxleGl0eSB3aGVuIHNlYXJjaGluZy9maWx0ZXJpbmcgY2hvaWNlc1xuICAgICAgICAgICAgdmFyIHNjb3JlTG9va3VwXzEgPSBbXTtcbiAgICAgICAgICAgIGFjdGlvbi5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHNjb3JlTG9va3VwXzFbcmVzdWx0Lml0ZW0uaWRdID0gcmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdGF0ZS5mb3JFYWNoKGZ1bmN0aW9uIChjaG9pY2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2NvcmVMb29rdXBfMVtjaG9pY2UuaWRdO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjaG9pY2Uuc2NvcmUgPSByZXN1bHQuc2NvcmU7XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZS5yYW5rID0gcmVzdWx0LnJhbms7XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlLnNjb3JlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlLnJhbmsgPSAwO1xuICAgICAgICAgICAgICAgICAgICBjaG9pY2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuYXBwZW5kR3JvdXBJblNlYXJjaCkge1xuICAgICAgICAgICAgICAgICAgICBjaG9pY2UuY2hvaWNlRWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEFjdGlvblR5cGUuQUNUSVZBVEVfQ0hPSUNFUzoge1xuICAgICAgICAgICAgc3RhdGUuZm9yRWFjaChmdW5jdGlvbiAoY2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlLmFjdGl2ZSA9IGFjdGlvbi5hY3RpdmU7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5hcHBlbmRHcm91cEluU2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNob2ljZS5jaG9pY2VFbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQWN0aW9uVHlwZS5DTEVBUl9DSE9JQ0VTOiB7XG4gICAgICAgICAgICBzdGF0ZSA9IFtdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgdXBkYXRlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBzdGF0ZTogc3RhdGUsIHVwZGF0ZTogdXBkYXRlIH07XG59XG5cbnZhciByZWR1Y2VycyA9IHtcbiAgICBncm91cHM6IGdyb3VwcyxcbiAgICBpdGVtczogaXRlbXMsXG4gICAgY2hvaWNlczogY2hvaWNlcyxcbn07XG52YXIgU3RvcmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3RvcmUoY29udGV4dCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuZGVmYXVsdFN0YXRlO1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdGhpcy5fdHhuID0gMDtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdG9yZS5wcm90b3R5cGUsIFwiZGVmYXVsdFN0YXRlXCIsIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdyb3VwczogW10sXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgICAgIGNob2ljZXM6IFtdLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgU3RvcmUucHJvdG90eXBlLmNoYW5nZVNldCA9IGZ1bmN0aW9uIChpbml0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBncm91cHM6IGluaXQsXG4gICAgICAgICAgICBpdGVtczogaW5pdCxcbiAgICAgICAgICAgIGNob2ljZXM6IGluaXQsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBTdG9yZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5kZWZhdWx0U3RhdGU7XG4gICAgICAgIHZhciBjaGFuZ2VzID0gdGhpcy5jaGFuZ2VTZXQodHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLl90eG4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZVNldCA9IGNoYW5nZXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobCkgeyByZXR1cm4gbChjaGFuZ2VzKTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN0b3JlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob25DaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gob25DaGFuZ2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFN0b3JlLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5fc3RhdGU7XG4gICAgICAgIHZhciBoYXNDaGFuZ2VzID0gZmFsc2U7XG4gICAgICAgIHZhciBjaGFuZ2VzID0gdGhpcy5fY2hhbmdlU2V0IHx8IHRoaXMuY2hhbmdlU2V0KGZhbHNlKTtcbiAgICAgICAgT2JqZWN0LmtleXMocmVkdWNlcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlVXBkYXRlID0gcmVkdWNlcnNba2V5XShzdGF0ZVtrZXldLCBhY3Rpb24sIF90aGlzLl9jb250ZXh0KTtcbiAgICAgICAgICAgIGlmIChzdGF0ZVVwZGF0ZS51cGRhdGUpIHtcbiAgICAgICAgICAgICAgICBoYXNDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzW2tleV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHN0YXRlW2tleV0gPSBzdGF0ZVVwZGF0ZS5zdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChoYXNDaGFuZ2VzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fdHhuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlU2V0ID0gY2hhbmdlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsKSB7IHJldHVybiBsKGNoYW5nZXMpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3RvcmUucHJvdG90eXBlLndpdGhUeG4gPSBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICB0aGlzLl90eG4rKztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuX3R4biA9IE1hdGgubWF4KDAsIHRoaXMuX3R4biAtIDEpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl90eG4pIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hhbmdlU2V0XzEgPSB0aGlzLl9jaGFuZ2VTZXQ7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZVNldF8xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZVNldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGwpIHsgcmV0dXJuIGwoY2hhbmdlU2V0XzEpOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdG9yZS5wcm90b3R5cGUsIFwic3RhdGVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHN0b3JlIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RvcmUucHJvdG90eXBlLCBcIml0ZW1zXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBpdGVtcyBmcm9tIHN0b3JlXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLml0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0b3JlLnByb3RvdHlwZSwgXCJoaWdobGlnaHRlZEFjdGl2ZUl0ZW1zXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBoaWdobGlnaHRlZCBpdGVtcyBmcm9tIHN0b3JlXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gIWl0ZW0uZGlzYWJsZWQgJiYgaXRlbS5hY3RpdmUgJiYgaXRlbS5oaWdobGlnaHRlZDsgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RvcmUucHJvdG90eXBlLCBcImNob2ljZXNcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGNob2ljZXMgZnJvbSBzdG9yZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5jaG9pY2VzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0b3JlLnByb3RvdHlwZSwgXCJhY3RpdmVDaG9pY2VzXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBhY3RpdmUgY2hvaWNlcyBmcm9tIHN0b3JlXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNob2ljZXMuZmlsdGVyKGZ1bmN0aW9uIChjaG9pY2UpIHsgcmV0dXJuIGNob2ljZS5hY3RpdmU7IH0pO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0b3JlLnByb3RvdHlwZSwgXCJzZWFyY2hhYmxlQ2hvaWNlc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgY2hvaWNlcyB0aGF0IGNhbiBiZSBzZWFyY2hlZCAoZXhjbHVkaW5nIHBsYWNlaG9sZGVycylcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hvaWNlcy5maWx0ZXIoZnVuY3Rpb24gKGNob2ljZSkgeyByZXR1cm4gIWNob2ljZS5kaXNhYmxlZCAmJiAhY2hvaWNlLnBsYWNlaG9sZGVyOyB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdG9yZS5wcm90b3R5cGUsIFwiZ3JvdXBzXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBncm91cHMgZnJvbSBzdG9yZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5ncm91cHM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RvcmUucHJvdG90eXBlLCBcImFjdGl2ZUdyb3Vwc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYWN0aXZlIGdyb3VwcyBmcm9tIHN0b3JlXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5ncm91cHMuZmlsdGVyKGZ1bmN0aW9uIChncm91cCkge1xuICAgICAgICAgICAgICAgIHZhciBpc0FjdGl2ZSA9IGdyb3VwLmFjdGl2ZSAmJiAhZ3JvdXAuZGlzYWJsZWQ7XG4gICAgICAgICAgICAgICAgdmFyIGhhc0FjdGl2ZU9wdGlvbnMgPSBfdGhpcy5zdGF0ZS5jaG9pY2VzLnNvbWUoZnVuY3Rpb24gKGNob2ljZSkgeyByZXR1cm4gY2hvaWNlLmFjdGl2ZSAmJiAhY2hvaWNlLmRpc2FibGVkOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNBY3RpdmUgJiYgaGFzQWN0aXZlT3B0aW9ucztcbiAgICAgICAgICAgIH0sIFtdKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFN0b3JlLnByb3RvdHlwZS5pblR4biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R4biA+IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2luZ2xlIGNob2ljZSBieSBpdCdzIElEXG4gICAgICovXG4gICAgU3RvcmUucHJvdG90eXBlLmdldENob2ljZUJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlQ2hvaWNlcy5maW5kKGZ1bmN0aW9uIChjaG9pY2UpIHsgcmV0dXJuIGNob2ljZS5pZCA9PT0gaWQ7IH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGdyb3VwIGJ5IGdyb3VwIGlkXG4gICAgICovXG4gICAgU3RvcmUucHJvdG90eXBlLmdldEdyb3VwQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ncm91cHMuZmluZChmdW5jdGlvbiAoZ3JvdXApIHsgcmV0dXJuIGdyb3VwLmlkID09PSBpZDsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gU3RvcmU7XG59KCkpO1xuXG52YXIgTm90aWNlVHlwZXMgPSB7XG4gICAgbm9DaG9pY2VzOiAnbm8tY2hvaWNlcycsXG4gICAgbm9SZXN1bHRzOiAnbm8tcmVzdWx0cycsXG4gICAgYWRkQ2hvaWNlOiAnYWRkLWNob2ljZScsXG4gICAgZ2VuZXJpYzogJycsXG59O1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkoZSwgciwgdCkge1xuICByZXR1cm4gKHIgPSBfdG9Qcm9wZXJ0eUtleShyKSkgaW4gZSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCB7XG4gICAgdmFsdWU6IHQsXG4gICAgZW51bWVyYWJsZTogITAsXG4gICAgY29uZmlndXJhYmxlOiAhMCxcbiAgICB3cml0YWJsZTogITBcbiAgfSkgOiBlW3JdID0gdCwgZTtcbn1cbmZ1bmN0aW9uIG93bktleXMoZSwgcikge1xuICB2YXIgdCA9IE9iamVjdC5rZXlzKGUpO1xuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTtcbiAgICByICYmIChvID0gby5maWx0ZXIoZnVuY3Rpb24gKHIpIHtcbiAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7XG4gICAgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7XG4gIH1cbiAgcmV0dXJuIHQ7XG59XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkMihlKSB7XG4gIGZvciAodmFyIHIgPSAxOyByIDwgYXJndW1lbnRzLmxlbmd0aDsgcisrKSB7XG4gICAgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9O1xuICAgIHIgJSAyID8gb3duS2V5cyhPYmplY3QodCksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7XG4gICAgICBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7XG4gICAgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBfdG9QcmltaXRpdmUodCwgcikge1xuICBpZiAoXCJvYmplY3RcIiAhPSB0eXBlb2YgdCB8fCAhdCkgcmV0dXJuIHQ7XG4gIHZhciBlID0gdFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAodm9pZCAwICE9PSBlKSB7XG4gICAgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIGkpIHJldHVybiBpO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKFwic3RyaW5nXCIgPT09IHIgPyBTdHJpbmcgOiBOdW1iZXIpKHQpO1xufVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkge1xuICB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7XG59XG5cbi8qKlxuICogRnVzZS5qcyB2Ny4wLjAgLSBMaWdodHdlaWdodCBmdXp6eS1zZWFyY2ggKGh0dHA6Ly9mdXNlanMuaW8pXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDIzIEtpcm8gUmlzayAoaHR0cDovL2tpcm8ubWUpXG4gKiBBbGwgUmlnaHRzIFJlc2VydmVkLiBBcGFjaGUgU29mdHdhcmUgTGljZW5zZSAyLjBcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqL1xuXG5mdW5jdGlvbiBpc0FycmF5KHZhbHVlKSB7XG4gIHJldHVybiAhQXJyYXkuaXNBcnJheSA/IGdldFRhZyh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vbG9kYXNoL2xvZGFzaC9ibG9iL21hc3Rlci8uaW50ZXJuYWwvYmFzZVRvU3RyaW5nLmpzXG5jb25zdCBJTkZJTklUWSA9IDEgLyAwO1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgbGV0IHJlc3VsdCA9IHZhbHVlICsgJyc7XG4gIHJldHVybiByZXN1bHQgPT0gJzAnICYmIDEgLyB2YWx1ZSA9PSAtSU5GSU5JVFkgPyAnLTAnIDogcmVzdWx0O1xufVxuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xufVxuXG4vLyBBZGFwdGVkIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvbWFzdGVyL2lzQm9vbGVhbi5qc1xuZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2UgfHwgaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBnZXRUYWcodmFsdWUpID09ICdbb2JqZWN0IEJvb2xlYW5dJztcbn1cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xufVxuXG4vLyBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpICYmIHZhbHVlICE9PSBudWxsO1xufVxuZnVuY3Rpb24gaXNEZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsO1xufVxuZnVuY3Rpb24gaXNCbGFuayh2YWx1ZSkge1xuICByZXR1cm4gIXZhbHVlLnRyaW0oKS5sZW5ndGg7XG59XG5cbi8vIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbi8vIEFkYXB0ZWQgZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi9tYXN0ZXIvLmludGVybmFsL2dldFRhZy5qc1xuZnVuY3Rpb24gZ2V0VGFnKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gdmFsdWUgPT09IHVuZGVmaW5lZCA/ICdbb2JqZWN0IFVuZGVmaW5lZF0nIDogJ1tvYmplY3QgTnVsbF0nIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cbmNvbnN0IEVYVEVOREVEX1NFQVJDSF9VTkFWQUlMQUJMRSA9ICdFeHRlbmRlZCBzZWFyY2ggaXMgbm90IGF2YWlsYWJsZSc7XG5jb25zdCBJTkNPUlJFQ1RfSU5ERVhfVFlQRSA9IFwiSW5jb3JyZWN0ICdpbmRleCcgdHlwZVwiO1xuY29uc3QgTE9HSUNBTF9TRUFSQ0hfSU5WQUxJRF9RVUVSWV9GT1JfS0VZID0ga2V5ID0+IGBJbnZhbGlkIHZhbHVlIGZvciBrZXkgJHtrZXl9YDtcbmNvbnN0IFBBVFRFUk5fTEVOR1RIX1RPT19MQVJHRSA9IG1heCA9PiBgUGF0dGVybiBsZW5ndGggZXhjZWVkcyBtYXggb2YgJHttYXh9LmA7XG5jb25zdCBNSVNTSU5HX0tFWV9QUk9QRVJUWSA9IG5hbWUgPT4gYE1pc3NpbmcgJHtuYW1lfSBwcm9wZXJ0eSBpbiBrZXlgO1xuY29uc3QgSU5WQUxJRF9LRVlfV0VJR0hUX1ZBTFVFID0ga2V5ID0+IGBQcm9wZXJ0eSAnd2VpZ2h0JyBpbiBrZXkgJyR7a2V5fScgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXJgO1xuY29uc3QgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmNsYXNzIEtleVN0b3JlIHtcbiAgY29uc3RydWN0b3Ioa2V5cykge1xuICAgIHRoaXMuX2tleXMgPSBbXTtcbiAgICB0aGlzLl9rZXlNYXAgPSB7fTtcbiAgICBsZXQgdG90YWxXZWlnaHQgPSAwO1xuICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgbGV0IG9iaiA9IGNyZWF0ZUtleShrZXkpO1xuICAgICAgdGhpcy5fa2V5cy5wdXNoKG9iaik7XG4gICAgICB0aGlzLl9rZXlNYXBbb2JqLmlkXSA9IG9iajtcbiAgICAgIHRvdGFsV2VpZ2h0ICs9IG9iai53ZWlnaHQ7XG4gICAgfSk7XG5cbiAgICAvLyBOb3JtYWxpemUgd2VpZ2h0cyBzbyB0aGF0IHRoZWlyIHN1bSBpcyBlcXVhbCB0byAxXG4gICAgdGhpcy5fa2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBrZXkud2VpZ2h0IC89IHRvdGFsV2VpZ2h0O1xuICAgIH0pO1xuICB9XG4gIGdldChrZXlJZCkge1xuICAgIHJldHVybiB0aGlzLl9rZXlNYXBba2V5SWRdO1xuICB9XG4gIGtleXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2tleXM7XG4gIH1cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl9rZXlzKTtcbiAgfVxufVxuZnVuY3Rpb24gY3JlYXRlS2V5KGtleSkge1xuICBsZXQgcGF0aCA9IG51bGw7XG4gIGxldCBpZCA9IG51bGw7XG4gIGxldCBzcmMgPSBudWxsO1xuICBsZXQgd2VpZ2h0ID0gMTtcbiAgbGV0IGdldEZuID0gbnVsbDtcbiAgaWYgKGlzU3RyaW5nKGtleSkgfHwgaXNBcnJheShrZXkpKSB7XG4gICAgc3JjID0ga2V5O1xuICAgIHBhdGggPSBjcmVhdGVLZXlQYXRoKGtleSk7XG4gICAgaWQgPSBjcmVhdGVLZXlJZChrZXkpO1xuICB9IGVsc2Uge1xuICAgIGlmICghaGFzT3duLmNhbGwoa2V5LCAnbmFtZScpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTUlTU0lOR19LRVlfUFJPUEVSVFkoJ25hbWUnKSk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWUgPSBrZXkubmFtZTtcbiAgICBzcmMgPSBuYW1lO1xuICAgIGlmIChoYXNPd24uY2FsbChrZXksICd3ZWlnaHQnKSkge1xuICAgICAgd2VpZ2h0ID0ga2V5LndlaWdodDtcbiAgICAgIGlmICh3ZWlnaHQgPD0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9LRVlfV0VJR0hUX1ZBTFVFKG5hbWUpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcGF0aCA9IGNyZWF0ZUtleVBhdGgobmFtZSk7XG4gICAgaWQgPSBjcmVhdGVLZXlJZChuYW1lKTtcbiAgICBnZXRGbiA9IGtleS5nZXRGbjtcbiAgfVxuICByZXR1cm4ge1xuICAgIHBhdGgsXG4gICAgaWQsXG4gICAgd2VpZ2h0LFxuICAgIHNyYyxcbiAgICBnZXRGblxuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlS2V5UGF0aChrZXkpIHtcbiAgcmV0dXJuIGlzQXJyYXkoa2V5KSA/IGtleSA6IGtleS5zcGxpdCgnLicpO1xufVxuZnVuY3Rpb24gY3JlYXRlS2V5SWQoa2V5KSB7XG4gIHJldHVybiBpc0FycmF5KGtleSkgPyBrZXkuam9pbignLicpIDoga2V5O1xufVxuZnVuY3Rpb24gZ2V0KG9iaiwgcGF0aCkge1xuICBsZXQgbGlzdCA9IFtdO1xuICBsZXQgYXJyID0gZmFsc2U7XG4gIGNvbnN0IGRlZXBHZXQgPSAob2JqLCBwYXRoLCBpbmRleCkgPT4ge1xuICAgIGlmICghaXNEZWZpbmVkKG9iaikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFwYXRoW2luZGV4XSkge1xuICAgICAgLy8gSWYgdGhlcmUncyBubyBwYXRoIGxlZnQsIHdlJ3ZlIGFycml2ZWQgYXQgdGhlIG9iamVjdCB3ZSBjYXJlIGFib3V0LlxuICAgICAgbGlzdC5wdXNoKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBrZXkgPSBwYXRoW2luZGV4XTtcbiAgICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleV07XG4gICAgICBpZiAoIWlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSdyZSBhdCB0aGUgbGFzdCB2YWx1ZSBpbiB0aGUgcGF0aCwgYW5kIGlmIGl0J3MgYSBzdHJpbmcvbnVtYmVyL2Jvb2wsXG4gICAgICAvLyBhZGQgaXQgdG8gdGhlIGxpc3RcbiAgICAgIGlmIChpbmRleCA9PT0gcGF0aC5sZW5ndGggLSAxICYmIChpc1N0cmluZyh2YWx1ZSkgfHwgaXNOdW1iZXIodmFsdWUpIHx8IGlzQm9vbGVhbih2YWx1ZSkpKSB7XG4gICAgICAgIGxpc3QucHVzaCh0b1N0cmluZyh2YWx1ZSkpO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBhcnIgPSB0cnVlO1xuICAgICAgICAvLyBTZWFyY2ggZWFjaCBpdGVtIGluIHRoZSBhcnJheS5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHZhbHVlLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgZGVlcEdldCh2YWx1ZVtpXSwgcGF0aCwgaW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXRoLmxlbmd0aCkge1xuICAgICAgICAvLyBBbiBvYmplY3QuIFJlY3Vyc2UgZnVydGhlci5cbiAgICAgICAgZGVlcEdldCh2YWx1ZSwgcGF0aCwgaW5kZXggKyAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHkgKHNpbmNlIHBhdGggdXNlZCB0byBiZSBhIHN0cmluZylcbiAgZGVlcEdldChvYmosIGlzU3RyaW5nKHBhdGgpID8gcGF0aC5zcGxpdCgnLicpIDogcGF0aCwgMCk7XG4gIHJldHVybiBhcnIgPyBsaXN0IDogbGlzdFswXTtcbn1cbmNvbnN0IE1hdGNoT3B0aW9ucyA9IHtcbiAgLy8gV2hldGhlciB0aGUgbWF0Y2hlcyBzaG91bGQgYmUgaW5jbHVkZWQgaW4gdGhlIHJlc3VsdCBzZXQuIFdoZW4gYHRydWVgLCBlYWNoIHJlY29yZCBpbiB0aGUgcmVzdWx0XG4gIC8vIHNldCB3aWxsIGluY2x1ZGUgdGhlIGluZGljZXMgb2YgdGhlIG1hdGNoZWQgY2hhcmFjdGVycy5cbiAgLy8gVGhlc2UgY2FuIGNvbnNlcXVlbnRseSBiZSB1c2VkIGZvciBoaWdobGlnaHRpbmcgcHVycG9zZXMuXG4gIGluY2x1ZGVNYXRjaGVzOiBmYWxzZSxcbiAgLy8gV2hlbiBgdHJ1ZWAsIHRoZSBtYXRjaGluZyBmdW5jdGlvbiB3aWxsIGNvbnRpbnVlIHRvIHRoZSBlbmQgb2YgYSBzZWFyY2ggcGF0dGVybiBldmVuIGlmXG4gIC8vIGEgcGVyZmVjdCBtYXRjaCBoYXMgYWxyZWFkeSBiZWVuIGxvY2F0ZWQgaW4gdGhlIHN0cmluZy5cbiAgZmluZEFsbE1hdGNoZXM6IGZhbHNlLFxuICAvLyBNaW5pbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgbXVzdCBiZSBtYXRjaGVkIGJlZm9yZSBhIHJlc3VsdCBpcyBjb25zaWRlcmVkIGEgbWF0Y2hcbiAgbWluTWF0Y2hDaGFyTGVuZ3RoOiAxXG59O1xuY29uc3QgQmFzaWNPcHRpb25zID0ge1xuICAvLyBXaGVuIGB0cnVlYCwgdGhlIGFsZ29yaXRobSBjb250aW51ZXMgc2VhcmNoaW5nIHRvIHRoZSBlbmQgb2YgdGhlIGlucHV0IGV2ZW4gaWYgYSBwZXJmZWN0XG4gIC8vIG1hdGNoIGlzIGZvdW5kIGJlZm9yZSB0aGUgZW5kIG9mIHRoZSBzYW1lIGlucHV0LlxuICBpc0Nhc2VTZW5zaXRpdmU6IGZhbHNlLFxuICAvLyBXaGVuIHRydWUsIHRoZSBtYXRjaGluZyBmdW5jdGlvbiB3aWxsIGNvbnRpbnVlIHRvIHRoZSBlbmQgb2YgYSBzZWFyY2ggcGF0dGVybiBldmVuIGlmXG4gIGluY2x1ZGVTY29yZTogZmFsc2UsXG4gIC8vIExpc3Qgb2YgcHJvcGVydGllcyB0aGF0IHdpbGwgYmUgc2VhcmNoZWQuIFRoaXMgYWxzbyBzdXBwb3J0cyBuZXN0ZWQgcHJvcGVydGllcy5cbiAga2V5czogW10sXG4gIC8vIFdoZXRoZXIgdG8gc29ydCB0aGUgcmVzdWx0IGxpc3QsIGJ5IHNjb3JlXG4gIHNob3VsZFNvcnQ6IHRydWUsXG4gIC8vIERlZmF1bHQgc29ydCBmdW5jdGlvbjogc29ydCBieSBhc2NlbmRpbmcgc2NvcmUsIGFzY2VuZGluZyBpbmRleFxuICBzb3J0Rm46IChhLCBiKSA9PiBhLnNjb3JlID09PSBiLnNjb3JlID8gYS5pZHggPCBiLmlkeCA/IC0xIDogMSA6IGEuc2NvcmUgPCBiLnNjb3JlID8gLTEgOiAxXG59O1xuY29uc3QgRnV6enlPcHRpb25zID0ge1xuICAvLyBBcHByb3hpbWF0ZWx5IHdoZXJlIGluIHRoZSB0ZXh0IGlzIHRoZSBwYXR0ZXJuIGV4cGVjdGVkIHRvIGJlIGZvdW5kP1xuICBsb2NhdGlvbjogMCxcbiAgLy8gQXQgd2hhdCBwb2ludCBkb2VzIHRoZSBtYXRjaCBhbGdvcml0aG0gZ2l2ZSB1cC4gQSB0aHJlc2hvbGQgb2YgJzAuMCcgcmVxdWlyZXMgYSBwZXJmZWN0IG1hdGNoXG4gIC8vIChvZiBib3RoIGxldHRlcnMgYW5kIGxvY2F0aW9uKSwgYSB0aHJlc2hvbGQgb2YgJzEuMCcgd291bGQgbWF0Y2ggYW55dGhpbmcuXG4gIHRocmVzaG9sZDogMC42LFxuICAvLyBEZXRlcm1pbmVzIGhvdyBjbG9zZSB0aGUgbWF0Y2ggbXVzdCBiZSB0byB0aGUgZnV6enkgbG9jYXRpb24gKHNwZWNpZmllZCBhYm92ZSkuXG4gIC8vIEFuIGV4YWN0IGxldHRlciBtYXRjaCB3aGljaCBpcyAnZGlzdGFuY2UnIGNoYXJhY3RlcnMgYXdheSBmcm9tIHRoZSBmdXp6eSBsb2NhdGlvblxuICAvLyB3b3VsZCBzY29yZSBhcyBhIGNvbXBsZXRlIG1pc21hdGNoLiBBIGRpc3RhbmNlIG9mICcwJyByZXF1aXJlcyB0aGUgbWF0Y2ggYmUgYXRcbiAgLy8gdGhlIGV4YWN0IGxvY2F0aW9uIHNwZWNpZmllZCwgYSB0aHJlc2hvbGQgb2YgJzEwMDAnIHdvdWxkIHJlcXVpcmUgYSBwZXJmZWN0IG1hdGNoXG4gIC8vIHRvIGJlIHdpdGhpbiA4MDAgY2hhcmFjdGVycyBvZiB0aGUgZnV6enkgbG9jYXRpb24gdG8gYmUgZm91bmQgdXNpbmcgYSAwLjggdGhyZXNob2xkLlxuICBkaXN0YW5jZTogMTAwXG59O1xuY29uc3QgQWR2YW5jZWRPcHRpb25zID0ge1xuICAvLyBXaGVuIGB0cnVlYCwgaXQgZW5hYmxlcyB0aGUgdXNlIG9mIHVuaXgtbGlrZSBzZWFyY2ggY29tbWFuZHNcbiAgdXNlRXh0ZW5kZWRTZWFyY2g6IGZhbHNlLFxuICAvLyBUaGUgZ2V0IGZ1bmN0aW9uIHRvIHVzZSB3aGVuIGZldGNoaW5nIGFuIG9iamVjdCdzIHByb3BlcnRpZXMuXG4gIC8vIFRoZSBkZWZhdWx0IHdpbGwgc2VhcmNoIG5lc3RlZCBwYXRocyAqaWUgZm9vLmJhci5iYXoqXG4gIGdldEZuOiBnZXQsXG4gIC8vIFdoZW4gYHRydWVgLCBzZWFyY2ggd2lsbCBpZ25vcmUgYGxvY2F0aW9uYCBhbmQgYGRpc3RhbmNlYCwgc28gaXQgd29uJ3QgbWF0dGVyXG4gIC8vIHdoZXJlIGluIHRoZSBzdHJpbmcgdGhlIHBhdHRlcm4gYXBwZWFycy5cbiAgLy8gTW9yZSBpbmZvOiBodHRwczovL2Z1c2Vqcy5pby9jb25jZXB0cy9zY29yaW5nLXRoZW9yeS5odG1sI2Z1enppbmVzcy1zY29yZVxuICBpZ25vcmVMb2NhdGlvbjogZmFsc2UsXG4gIC8vIFdoZW4gYHRydWVgLCB0aGUgY2FsY3VsYXRpb24gZm9yIHRoZSByZWxldmFuY2Ugc2NvcmUgKHVzZWQgZm9yIHNvcnRpbmcpIHdpbGxcbiAgLy8gaWdub3JlIHRoZSBmaWVsZC1sZW5ndGggbm9ybS5cbiAgLy8gTW9yZSBpbmZvOiBodHRwczovL2Z1c2Vqcy5pby9jb25jZXB0cy9zY29yaW5nLXRoZW9yeS5odG1sI2ZpZWxkLWxlbmd0aC1ub3JtXG4gIGlnbm9yZUZpZWxkTm9ybTogZmFsc2UsXG4gIC8vIFRoZSB3ZWlnaHQgdG8gZGV0ZXJtaW5lIGhvdyBtdWNoIGZpZWxkIGxlbmd0aCBub3JtIGVmZmVjdHMgc2NvcmluZy5cbiAgZmllbGROb3JtV2VpZ2h0OiAxXG59O1xudmFyIENvbmZpZyA9IF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBCYXNpY09wdGlvbnMpLCBNYXRjaE9wdGlvbnMpLCBGdXp6eU9wdGlvbnMpLCBBZHZhbmNlZE9wdGlvbnMpO1xuY29uc3QgU1BBQ0UgPSAvW14gXSsvZztcblxuLy8gRmllbGQtbGVuZ3RoIG5vcm06IHRoZSBzaG9ydGVyIHRoZSBmaWVsZCwgdGhlIGhpZ2hlciB0aGUgd2VpZ2h0LlxuLy8gU2V0IHRvIDMgZGVjaW1hbHMgdG8gcmVkdWNlIGluZGV4IHNpemUuXG5mdW5jdGlvbiBub3JtKHdlaWdodCA9IDEsIG1hbnRpc3NhID0gMykge1xuICBjb25zdCBjYWNoZSA9IG5ldyBNYXAoKTtcbiAgY29uc3QgbSA9IE1hdGgucG93KDEwLCBtYW50aXNzYSk7XG4gIHJldHVybiB7XG4gICAgZ2V0KHZhbHVlKSB7XG4gICAgICBjb25zdCBudW1Ub2tlbnMgPSB2YWx1ZS5tYXRjaChTUEFDRSkubGVuZ3RoO1xuICAgICAgaWYgKGNhY2hlLmhhcyhudW1Ub2tlbnMpKSB7XG4gICAgICAgIHJldHVybiBjYWNoZS5nZXQobnVtVG9rZW5zKTtcbiAgICAgIH1cblxuICAgICAgLy8gRGVmYXVsdCBmdW5jdGlvbiBpcyAxL3NxcnQoeCksIHdlaWdodCBtYWtlcyB0aGF0IHZhcmlhYmxlXG4gICAgICBjb25zdCBub3JtID0gMSAvIE1hdGgucG93KG51bVRva2VucywgMC41ICogd2VpZ2h0KTtcblxuICAgICAgLy8gSW4gcGxhY2Ugb2YgYHRvRml4ZWQobWFudGlzc2EpYCwgZm9yIGZhc3RlciBjb21wdXRhdGlvblxuICAgICAgY29uc3QgbiA9IHBhcnNlRmxvYXQoTWF0aC5yb3VuZChub3JtICogbSkgLyBtKTtcbiAgICAgIGNhY2hlLnNldChudW1Ub2tlbnMsIG4pO1xuICAgICAgcmV0dXJuIG47XG4gICAgfSxcbiAgICBjbGVhcigpIHtcbiAgICAgIGNhY2hlLmNsZWFyKCk7XG4gICAgfVxuICB9O1xufVxuY2xhc3MgRnVzZUluZGV4IHtcbiAgY29uc3RydWN0b3Ioe1xuICAgIGdldEZuID0gQ29uZmlnLmdldEZuLFxuICAgIGZpZWxkTm9ybVdlaWdodCA9IENvbmZpZy5maWVsZE5vcm1XZWlnaHRcbiAgfSA9IHt9KSB7XG4gICAgdGhpcy5ub3JtID0gbm9ybShmaWVsZE5vcm1XZWlnaHQsIDMpO1xuICAgIHRoaXMuZ2V0Rm4gPSBnZXRGbjtcbiAgICB0aGlzLmlzQ3JlYXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuc2V0SW5kZXhSZWNvcmRzKCk7XG4gIH1cbiAgc2V0U291cmNlcyhkb2NzID0gW10pIHtcbiAgICB0aGlzLmRvY3MgPSBkb2NzO1xuICB9XG4gIHNldEluZGV4UmVjb3JkcyhyZWNvcmRzID0gW10pIHtcbiAgICB0aGlzLnJlY29yZHMgPSByZWNvcmRzO1xuICB9XG4gIHNldEtleXMoa2V5cyA9IFtdKSB7XG4gICAgdGhpcy5rZXlzID0ga2V5cztcbiAgICB0aGlzLl9rZXlzTWFwID0ge307XG4gICAga2V5cy5mb3JFYWNoKChrZXksIGlkeCkgPT4ge1xuICAgICAgdGhpcy5fa2V5c01hcFtrZXkuaWRdID0gaWR4O1xuICAgIH0pO1xuICB9XG4gIGNyZWF0ZSgpIHtcbiAgICBpZiAodGhpcy5pc0NyZWF0ZWQgfHwgIXRoaXMuZG9jcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pc0NyZWF0ZWQgPSB0cnVlO1xuXG4gICAgLy8gTGlzdCBpcyBBcnJheTxTdHJpbmc+XG4gICAgaWYgKGlzU3RyaW5nKHRoaXMuZG9jc1swXSkpIHtcbiAgICAgIHRoaXMuZG9jcy5mb3JFYWNoKChkb2MsIGRvY0luZGV4KSA9PiB7XG4gICAgICAgIHRoaXMuX2FkZFN0cmluZyhkb2MsIGRvY0luZGV4KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBMaXN0IGlzIEFycmF5PE9iamVjdD5cbiAgICAgIHRoaXMuZG9jcy5mb3JFYWNoKChkb2MsIGRvY0luZGV4KSA9PiB7XG4gICAgICAgIHRoaXMuX2FkZE9iamVjdChkb2MsIGRvY0luZGV4KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLm5vcm0uY2xlYXIoKTtcbiAgfVxuICAvLyBBZGRzIGEgZG9jIHRvIHRoZSBlbmQgb2YgdGhlIGluZGV4XG4gIGFkZChkb2MpIHtcbiAgICBjb25zdCBpZHggPSB0aGlzLnNpemUoKTtcbiAgICBpZiAoaXNTdHJpbmcoZG9jKSkge1xuICAgICAgdGhpcy5fYWRkU3RyaW5nKGRvYywgaWR4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYWRkT2JqZWN0KGRvYywgaWR4KTtcbiAgICB9XG4gIH1cbiAgLy8gUmVtb3ZlcyB0aGUgZG9jIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggb2YgdGhlIGluZGV4XG4gIHJlbW92ZUF0KGlkeCkge1xuICAgIHRoaXMucmVjb3Jkcy5zcGxpY2UoaWR4LCAxKTtcblxuICAgIC8vIENoYW5nZSByZWYgaW5kZXggb2YgZXZlcnkgc3Vic3F1ZW50IGRvY1xuICAgIGZvciAobGV0IGkgPSBpZHgsIGxlbiA9IHRoaXMuc2l6ZSgpOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgIHRoaXMucmVjb3Jkc1tpXS5pIC09IDE7XG4gICAgfVxuICB9XG4gIGdldFZhbHVlRm9ySXRlbUF0S2V5SWQoaXRlbSwga2V5SWQpIHtcbiAgICByZXR1cm4gaXRlbVt0aGlzLl9rZXlzTWFwW2tleUlkXV07XG4gIH1cbiAgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWNvcmRzLmxlbmd0aDtcbiAgfVxuICBfYWRkU3RyaW5nKGRvYywgZG9jSW5kZXgpIHtcbiAgICBpZiAoIWlzRGVmaW5lZChkb2MpIHx8IGlzQmxhbmsoZG9jKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcmVjb3JkID0ge1xuICAgICAgdjogZG9jLFxuICAgICAgaTogZG9jSW5kZXgsXG4gICAgICBuOiB0aGlzLm5vcm0uZ2V0KGRvYylcbiAgICB9O1xuICAgIHRoaXMucmVjb3Jkcy5wdXNoKHJlY29yZCk7XG4gIH1cbiAgX2FkZE9iamVjdChkb2MsIGRvY0luZGV4KSB7XG4gICAgbGV0IHJlY29yZCA9IHtcbiAgICAgIGk6IGRvY0luZGV4LFxuICAgICAgJDoge31cbiAgICB9O1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIGV2ZXJ5IGtleSAoaS5lLCBwYXRoKSwgYW5kIGZldGNoIHRoZSB2YWx1ZSBhdCB0aGF0IGtleVxuICAgIHRoaXMua2V5cy5mb3JFYWNoKChrZXksIGtleUluZGV4KSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBrZXkuZ2V0Rm4gPyBrZXkuZ2V0Rm4oZG9jKSA6IHRoaXMuZ2V0Rm4oZG9jLCBrZXkucGF0aCk7XG4gICAgICBpZiAoIWlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGxldCBzdWJSZWNvcmRzID0gW107XG4gICAgICAgIGNvbnN0IHN0YWNrID0gW3tcbiAgICAgICAgICBuZXN0ZWRBcnJJbmRleDogLTEsXG4gICAgICAgICAgdmFsdWVcbiAgICAgICAgfV07XG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBuZXN0ZWRBcnJJbmRleCxcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgfSA9IHN0YWNrLnBvcCgpO1xuICAgICAgICAgIGlmICghaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc1N0cmluZyh2YWx1ZSkgJiYgIWlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgc3ViUmVjb3JkID0ge1xuICAgICAgICAgICAgICB2OiB2YWx1ZSxcbiAgICAgICAgICAgICAgaTogbmVzdGVkQXJySW5kZXgsXG4gICAgICAgICAgICAgIG46IHRoaXMubm9ybS5nZXQodmFsdWUpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3ViUmVjb3Jkcy5wdXNoKHN1YlJlY29yZCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgoaXRlbSwgaykgPT4ge1xuICAgICAgICAgICAgICBzdGFjay5wdXNoKHtcbiAgICAgICAgICAgICAgICBuZXN0ZWRBcnJJbmRleDogayxcbiAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSA7XG4gICAgICAgIH1cbiAgICAgICAgcmVjb3JkLiRba2V5SW5kZXhdID0gc3ViUmVjb3JkcztcbiAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcodmFsdWUpICYmICFpc0JsYW5rKHZhbHVlKSkge1xuICAgICAgICBsZXQgc3ViUmVjb3JkID0ge1xuICAgICAgICAgIHY6IHZhbHVlLFxuICAgICAgICAgIG46IHRoaXMubm9ybS5nZXQodmFsdWUpXG4gICAgICAgIH07XG4gICAgICAgIHJlY29yZC4kW2tleUluZGV4XSA9IHN1YlJlY29yZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnJlY29yZHMucHVzaChyZWNvcmQpO1xuICB9XG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAga2V5czogdGhpcy5rZXlzLFxuICAgICAgcmVjb3JkczogdGhpcy5yZWNvcmRzXG4gICAgfTtcbiAgfVxufVxuZnVuY3Rpb24gY3JlYXRlSW5kZXgoa2V5cywgZG9jcywge1xuICBnZXRGbiA9IENvbmZpZy5nZXRGbixcbiAgZmllbGROb3JtV2VpZ2h0ID0gQ29uZmlnLmZpZWxkTm9ybVdlaWdodFxufSA9IHt9KSB7XG4gIGNvbnN0IG15SW5kZXggPSBuZXcgRnVzZUluZGV4KHtcbiAgICBnZXRGbixcbiAgICBmaWVsZE5vcm1XZWlnaHRcbiAgfSk7XG4gIG15SW5kZXguc2V0S2V5cyhrZXlzLm1hcChjcmVhdGVLZXkpKTtcbiAgbXlJbmRleC5zZXRTb3VyY2VzKGRvY3MpO1xuICBteUluZGV4LmNyZWF0ZSgpO1xuICByZXR1cm4gbXlJbmRleDtcbn1cbmZ1bmN0aW9uIHBhcnNlSW5kZXgoZGF0YSwge1xuICBnZXRGbiA9IENvbmZpZy5nZXRGbixcbiAgZmllbGROb3JtV2VpZ2h0ID0gQ29uZmlnLmZpZWxkTm9ybVdlaWdodFxufSA9IHt9KSB7XG4gIGNvbnN0IHtcbiAgICBrZXlzLFxuICAgIHJlY29yZHNcbiAgfSA9IGRhdGE7XG4gIGNvbnN0IG15SW5kZXggPSBuZXcgRnVzZUluZGV4KHtcbiAgICBnZXRGbixcbiAgICBmaWVsZE5vcm1XZWlnaHRcbiAgfSk7XG4gIG15SW5kZXguc2V0S2V5cyhrZXlzKTtcbiAgbXlJbmRleC5zZXRJbmRleFJlY29yZHMocmVjb3Jkcyk7XG4gIHJldHVybiBteUluZGV4O1xufVxuZnVuY3Rpb24gY29tcHV0ZVNjb3JlJDEocGF0dGVybiwge1xuICBlcnJvcnMgPSAwLFxuICBjdXJyZW50TG9jYXRpb24gPSAwLFxuICBleHBlY3RlZExvY2F0aW9uID0gMCxcbiAgZGlzdGFuY2UgPSBDb25maWcuZGlzdGFuY2UsXG4gIGlnbm9yZUxvY2F0aW9uID0gQ29uZmlnLmlnbm9yZUxvY2F0aW9uXG59ID0ge30pIHtcbiAgY29uc3QgYWNjdXJhY3kgPSBlcnJvcnMgLyBwYXR0ZXJuLmxlbmd0aDtcbiAgaWYgKGlnbm9yZUxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIGFjY3VyYWN5O1xuICB9XG4gIGNvbnN0IHByb3hpbWl0eSA9IE1hdGguYWJzKGV4cGVjdGVkTG9jYXRpb24gLSBjdXJyZW50TG9jYXRpb24pO1xuICBpZiAoIWRpc3RhbmNlKSB7XG4gICAgLy8gRG9kZ2UgZGl2aWRlIGJ5IHplcm8gZXJyb3IuXG4gICAgcmV0dXJuIHByb3hpbWl0eSA/IDEuMCA6IGFjY3VyYWN5O1xuICB9XG4gIHJldHVybiBhY2N1cmFjeSArIHByb3hpbWl0eSAvIGRpc3RhbmNlO1xufVxuZnVuY3Rpb24gY29udmVydE1hc2tUb0luZGljZXMobWF0Y2htYXNrID0gW10sIG1pbk1hdGNoQ2hhckxlbmd0aCA9IENvbmZpZy5taW5NYXRjaENoYXJMZW5ndGgpIHtcbiAgbGV0IGluZGljZXMgPSBbXTtcbiAgbGV0IHN0YXJ0ID0gLTE7XG4gIGxldCBlbmQgPSAtMTtcbiAgbGV0IGkgPSAwO1xuICBmb3IgKGxldCBsZW4gPSBtYXRjaG1hc2subGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICBsZXQgbWF0Y2ggPSBtYXRjaG1hc2tbaV07XG4gICAgaWYgKG1hdGNoICYmIHN0YXJ0ID09PSAtMSkge1xuICAgICAgc3RhcnQgPSBpO1xuICAgIH0gZWxzZSBpZiAoIW1hdGNoICYmIHN0YXJ0ICE9PSAtMSkge1xuICAgICAgZW5kID0gaSAtIDE7XG4gICAgICBpZiAoZW5kIC0gc3RhcnQgKyAxID49IG1pbk1hdGNoQ2hhckxlbmd0aCkge1xuICAgICAgICBpbmRpY2VzLnB1c2goW3N0YXJ0LCBlbmRdKTtcbiAgICAgIH1cbiAgICAgIHN0YXJ0ID0gLTE7XG4gICAgfVxuICB9XG5cbiAgLy8gKGktMSAtIHN0YXJ0KSArIDEgPT4gaSAtIHN0YXJ0XG4gIGlmIChtYXRjaG1hc2tbaSAtIDFdICYmIGkgLSBzdGFydCA+PSBtaW5NYXRjaENoYXJMZW5ndGgpIHtcbiAgICBpbmRpY2VzLnB1c2goW3N0YXJ0LCBpIC0gMV0pO1xuICB9XG4gIHJldHVybiBpbmRpY2VzO1xufVxuXG4vLyBNYWNoaW5lIHdvcmQgc2l6ZVxuY29uc3QgTUFYX0JJVFMgPSAzMjtcbmZ1bmN0aW9uIHNlYXJjaCh0ZXh0LCBwYXR0ZXJuLCBwYXR0ZXJuQWxwaGFiZXQsIHtcbiAgbG9jYXRpb24gPSBDb25maWcubG9jYXRpb24sXG4gIGRpc3RhbmNlID0gQ29uZmlnLmRpc3RhbmNlLFxuICB0aHJlc2hvbGQgPSBDb25maWcudGhyZXNob2xkLFxuICBmaW5kQWxsTWF0Y2hlcyA9IENvbmZpZy5maW5kQWxsTWF0Y2hlcyxcbiAgbWluTWF0Y2hDaGFyTGVuZ3RoID0gQ29uZmlnLm1pbk1hdGNoQ2hhckxlbmd0aCxcbiAgaW5jbHVkZU1hdGNoZXMgPSBDb25maWcuaW5jbHVkZU1hdGNoZXMsXG4gIGlnbm9yZUxvY2F0aW9uID0gQ29uZmlnLmlnbm9yZUxvY2F0aW9uXG59ID0ge30pIHtcbiAgaWYgKHBhdHRlcm4ubGVuZ3RoID4gTUFYX0JJVFMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoUEFUVEVSTl9MRU5HVEhfVE9PX0xBUkdFKE1BWF9CSVRTKSk7XG4gIH1cbiAgY29uc3QgcGF0dGVybkxlbiA9IHBhdHRlcm4ubGVuZ3RoO1xuICAvLyBTZXQgc3RhcnRpbmcgbG9jYXRpb24gYXQgYmVnaW5uaW5nIHRleHQgYW5kIGluaXRpYWxpemUgdGhlIGFscGhhYmV0LlxuICBjb25zdCB0ZXh0TGVuID0gdGV4dC5sZW5ndGg7XG4gIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVuIGxvY2F0aW9uID4gdGV4dC5sZW5ndGhcbiAgY29uc3QgZXhwZWN0ZWRMb2NhdGlvbiA9IE1hdGgubWF4KDAsIE1hdGgubWluKGxvY2F0aW9uLCB0ZXh0TGVuKSk7XG4gIC8vIEhpZ2hlc3Qgc2NvcmUgYmV5b25kIHdoaWNoIHdlIGdpdmUgdXAuXG4gIGxldCBjdXJyZW50VGhyZXNob2xkID0gdGhyZXNob2xkO1xuICAvLyBJcyB0aGVyZSBhIG5lYXJieSBleGFjdCBtYXRjaD8gKHNwZWVkdXApXG4gIGxldCBiZXN0TG9jYXRpb24gPSBleHBlY3RlZExvY2F0aW9uO1xuXG4gIC8vIFBlcmZvcm1hbmNlOiBvbmx5IGNvbXB1dGVyIG1hdGNoZXMgd2hlbiB0aGUgbWluTWF0Y2hDaGFyTGVuZ3RoID4gMVxuICAvLyBPUiBpZiBgaW5jbHVkZU1hdGNoZXNgIGlzIHRydWUuXG4gIGNvbnN0IGNvbXB1dGVNYXRjaGVzID0gbWluTWF0Y2hDaGFyTGVuZ3RoID4gMSB8fCBpbmNsdWRlTWF0Y2hlcztcbiAgLy8gQSBtYXNrIG9mIHRoZSBtYXRjaGVzLCB1c2VkIGZvciBidWlsZGluZyB0aGUgaW5kaWNlc1xuICBjb25zdCBtYXRjaE1hc2sgPSBjb21wdXRlTWF0Y2hlcyA/IEFycmF5KHRleHRMZW4pIDogW107XG4gIGxldCBpbmRleDtcblxuICAvLyBHZXQgYWxsIGV4YWN0IG1hdGNoZXMsIGhlcmUgZm9yIHNwZWVkIHVwXG4gIHdoaWxlICgoaW5kZXggPSB0ZXh0LmluZGV4T2YocGF0dGVybiwgYmVzdExvY2F0aW9uKSkgPiAtMSkge1xuICAgIGxldCBzY29yZSA9IGNvbXB1dGVTY29yZSQxKHBhdHRlcm4sIHtcbiAgICAgIGN1cnJlbnRMb2NhdGlvbjogaW5kZXgsXG4gICAgICBleHBlY3RlZExvY2F0aW9uLFxuICAgICAgZGlzdGFuY2UsXG4gICAgICBpZ25vcmVMb2NhdGlvblxuICAgIH0pO1xuICAgIGN1cnJlbnRUaHJlc2hvbGQgPSBNYXRoLm1pbihzY29yZSwgY3VycmVudFRocmVzaG9sZCk7XG4gICAgYmVzdExvY2F0aW9uID0gaW5kZXggKyBwYXR0ZXJuTGVuO1xuICAgIGlmIChjb21wdXRlTWF0Y2hlcykge1xuICAgICAgbGV0IGkgPSAwO1xuICAgICAgd2hpbGUgKGkgPCBwYXR0ZXJuTGVuKSB7XG4gICAgICAgIG1hdGNoTWFza1tpbmRleCArIGldID0gMTtcbiAgICAgICAgaSArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFJlc2V0IHRoZSBiZXN0IGxvY2F0aW9uXG4gIGJlc3RMb2NhdGlvbiA9IC0xO1xuICBsZXQgbGFzdEJpdEFyciA9IFtdO1xuICBsZXQgZmluYWxTY29yZSA9IDE7XG4gIGxldCBiaW5NYXggPSBwYXR0ZXJuTGVuICsgdGV4dExlbjtcbiAgY29uc3QgbWFzayA9IDEgPDwgcGF0dGVybkxlbiAtIDE7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0dGVybkxlbjsgaSArPSAxKSB7XG4gICAgLy8gU2NhbiBmb3IgdGhlIGJlc3QgbWF0Y2g7IGVhY2ggaXRlcmF0aW9uIGFsbG93cyBmb3Igb25lIG1vcmUgZXJyb3IuXG4gICAgLy8gUnVuIGEgYmluYXJ5IHNlYXJjaCB0byBkZXRlcm1pbmUgaG93IGZhciBmcm9tIHRoZSBtYXRjaCBsb2NhdGlvbiB3ZSBjYW4gc3RyYXlcbiAgICAvLyBhdCB0aGlzIGVycm9yIGxldmVsLlxuICAgIGxldCBiaW5NaW4gPSAwO1xuICAgIGxldCBiaW5NaWQgPSBiaW5NYXg7XG4gICAgd2hpbGUgKGJpbk1pbiA8IGJpbk1pZCkge1xuICAgICAgY29uc3Qgc2NvcmUgPSBjb21wdXRlU2NvcmUkMShwYXR0ZXJuLCB7XG4gICAgICAgIGVycm9yczogaSxcbiAgICAgICAgY3VycmVudExvY2F0aW9uOiBleHBlY3RlZExvY2F0aW9uICsgYmluTWlkLFxuICAgICAgICBleHBlY3RlZExvY2F0aW9uLFxuICAgICAgICBkaXN0YW5jZSxcbiAgICAgICAgaWdub3JlTG9jYXRpb25cbiAgICAgIH0pO1xuICAgICAgaWYgKHNjb3JlIDw9IGN1cnJlbnRUaHJlc2hvbGQpIHtcbiAgICAgICAgYmluTWluID0gYmluTWlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmluTWF4ID0gYmluTWlkO1xuICAgICAgfVxuICAgICAgYmluTWlkID0gTWF0aC5mbG9vcigoYmluTWF4IC0gYmluTWluKSAvIDIgKyBiaW5NaW4pO1xuICAgIH1cblxuICAgIC8vIFVzZSB0aGUgcmVzdWx0IGZyb20gdGhpcyBpdGVyYXRpb24gYXMgdGhlIG1heGltdW0gZm9yIHRoZSBuZXh0LlxuICAgIGJpbk1heCA9IGJpbk1pZDtcbiAgICBsZXQgc3RhcnQgPSBNYXRoLm1heCgxLCBleHBlY3RlZExvY2F0aW9uIC0gYmluTWlkICsgMSk7XG4gICAgbGV0IGZpbmlzaCA9IGZpbmRBbGxNYXRjaGVzID8gdGV4dExlbiA6IE1hdGgubWluKGV4cGVjdGVkTG9jYXRpb24gKyBiaW5NaWQsIHRleHRMZW4pICsgcGF0dGVybkxlbjtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIGJpdCBhcnJheVxuICAgIGxldCBiaXRBcnIgPSBBcnJheShmaW5pc2ggKyAyKTtcbiAgICBiaXRBcnJbZmluaXNoICsgMV0gPSAoMSA8PCBpKSAtIDE7XG4gICAgZm9yIChsZXQgaiA9IGZpbmlzaDsgaiA+PSBzdGFydDsgaiAtPSAxKSB7XG4gICAgICBsZXQgY3VycmVudExvY2F0aW9uID0gaiAtIDE7XG4gICAgICBsZXQgY2hhck1hdGNoID0gcGF0dGVybkFscGhhYmV0W3RleHQuY2hhckF0KGN1cnJlbnRMb2NhdGlvbildO1xuICAgICAgaWYgKGNvbXB1dGVNYXRjaGVzKSB7XG4gICAgICAgIC8vIFNwZWVkIHVwOiBxdWljayBib29sIHRvIGludCBjb252ZXJzaW9uIChpLmUsIGBjaGFyTWF0Y2ggPyAxIDogMGApXG4gICAgICAgIG1hdGNoTWFza1tjdXJyZW50TG9jYXRpb25dID0gKyEhY2hhck1hdGNoO1xuICAgICAgfVxuXG4gICAgICAvLyBGaXJzdCBwYXNzOiBleGFjdCBtYXRjaFxuICAgICAgYml0QXJyW2pdID0gKGJpdEFycltqICsgMV0gPDwgMSB8IDEpICYgY2hhck1hdGNoO1xuXG4gICAgICAvLyBTdWJzZXF1ZW50IHBhc3NlczogZnV6enkgbWF0Y2hcbiAgICAgIGlmIChpKSB7XG4gICAgICAgIGJpdEFycltqXSB8PSAobGFzdEJpdEFycltqICsgMV0gfCBsYXN0Qml0QXJyW2pdKSA8PCAxIHwgMSB8IGxhc3RCaXRBcnJbaiArIDFdO1xuICAgICAgfVxuICAgICAgaWYgKGJpdEFycltqXSAmIG1hc2spIHtcbiAgICAgICAgZmluYWxTY29yZSA9IGNvbXB1dGVTY29yZSQxKHBhdHRlcm4sIHtcbiAgICAgICAgICBlcnJvcnM6IGksXG4gICAgICAgICAgY3VycmVudExvY2F0aW9uLFxuICAgICAgICAgIGV4cGVjdGVkTG9jYXRpb24sXG4gICAgICAgICAgZGlzdGFuY2UsXG4gICAgICAgICAgaWdub3JlTG9jYXRpb25cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVGhpcyBtYXRjaCB3aWxsIGFsbW9zdCBjZXJ0YWlubHkgYmUgYmV0dGVyIHRoYW4gYW55IGV4aXN0aW5nIG1hdGNoLlxuICAgICAgICAvLyBCdXQgY2hlY2sgYW55d2F5LlxuICAgICAgICBpZiAoZmluYWxTY29yZSA8PSBjdXJyZW50VGhyZXNob2xkKSB7XG4gICAgICAgICAgLy8gSW5kZWVkIGl0IGlzXG4gICAgICAgICAgY3VycmVudFRocmVzaG9sZCA9IGZpbmFsU2NvcmU7XG4gICAgICAgICAgYmVzdExvY2F0aW9uID0gY3VycmVudExvY2F0aW9uO1xuXG4gICAgICAgICAgLy8gQWxyZWFkeSBwYXNzZWQgYGxvY2AsIGRvd25oaWxsIGZyb20gaGVyZSBvbiBpbi5cbiAgICAgICAgICBpZiAoYmVzdExvY2F0aW9uIDw9IGV4cGVjdGVkTG9jYXRpb24pIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFdoZW4gcGFzc2luZyBgYmVzdExvY2F0aW9uYCwgZG9uJ3QgZXhjZWVkIG91ciBjdXJyZW50IGRpc3RhbmNlIGZyb20gYGV4cGVjdGVkTG9jYXRpb25gLlxuICAgICAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoMSwgMiAqIGV4cGVjdGVkTG9jYXRpb24gLSBiZXN0TG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTm8gaG9wZSBmb3IgYSAoYmV0dGVyKSBtYXRjaCBhdCBncmVhdGVyIGVycm9yIGxldmVscy5cbiAgICBjb25zdCBzY29yZSA9IGNvbXB1dGVTY29yZSQxKHBhdHRlcm4sIHtcbiAgICAgIGVycm9yczogaSArIDEsXG4gICAgICBjdXJyZW50TG9jYXRpb246IGV4cGVjdGVkTG9jYXRpb24sXG4gICAgICBleHBlY3RlZExvY2F0aW9uLFxuICAgICAgZGlzdGFuY2UsXG4gICAgICBpZ25vcmVMb2NhdGlvblxuICAgIH0pO1xuICAgIGlmIChzY29yZSA+IGN1cnJlbnRUaHJlc2hvbGQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsYXN0Qml0QXJyID0gYml0QXJyO1xuICB9XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBpc01hdGNoOiBiZXN0TG9jYXRpb24gPj0gMCxcbiAgICAvLyBDb3VudCBleGFjdCBtYXRjaGVzICh0aG9zZSB3aXRoIGEgc2NvcmUgb2YgMCkgdG8gYmUgXCJhbG1vc3RcIiBleGFjdFxuICAgIHNjb3JlOiBNYXRoLm1heCgwLjAwMSwgZmluYWxTY29yZSlcbiAgfTtcbiAgaWYgKGNvbXB1dGVNYXRjaGVzKSB7XG4gICAgY29uc3QgaW5kaWNlcyA9IGNvbnZlcnRNYXNrVG9JbmRpY2VzKG1hdGNoTWFzaywgbWluTWF0Y2hDaGFyTGVuZ3RoKTtcbiAgICBpZiAoIWluZGljZXMubGVuZ3RoKSB7XG4gICAgICByZXN1bHQuaXNNYXRjaCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoaW5jbHVkZU1hdGNoZXMpIHtcbiAgICAgIHJlc3VsdC5pbmRpY2VzID0gaW5kaWNlcztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBhdHRlcm5BbHBoYWJldChwYXR0ZXJuKSB7XG4gIGxldCBtYXNrID0ge307XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwYXR0ZXJuLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgY29uc3QgY2hhciA9IHBhdHRlcm4uY2hhckF0KGkpO1xuICAgIG1hc2tbY2hhcl0gPSAobWFza1tjaGFyXSB8fCAwKSB8IDEgPDwgbGVuIC0gaSAtIDE7XG4gIH1cbiAgcmV0dXJuIG1hc2s7XG59XG5jbGFzcyBCaXRhcFNlYXJjaCB7XG4gIGNvbnN0cnVjdG9yKHBhdHRlcm4sIHtcbiAgICBsb2NhdGlvbiA9IENvbmZpZy5sb2NhdGlvbixcbiAgICB0aHJlc2hvbGQgPSBDb25maWcudGhyZXNob2xkLFxuICAgIGRpc3RhbmNlID0gQ29uZmlnLmRpc3RhbmNlLFxuICAgIGluY2x1ZGVNYXRjaGVzID0gQ29uZmlnLmluY2x1ZGVNYXRjaGVzLFxuICAgIGZpbmRBbGxNYXRjaGVzID0gQ29uZmlnLmZpbmRBbGxNYXRjaGVzLFxuICAgIG1pbk1hdGNoQ2hhckxlbmd0aCA9IENvbmZpZy5taW5NYXRjaENoYXJMZW5ndGgsXG4gICAgaXNDYXNlU2Vuc2l0aXZlID0gQ29uZmlnLmlzQ2FzZVNlbnNpdGl2ZSxcbiAgICBpZ25vcmVMb2NhdGlvbiA9IENvbmZpZy5pZ25vcmVMb2NhdGlvblxuICB9ID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICBsb2NhdGlvbixcbiAgICAgIHRocmVzaG9sZCxcbiAgICAgIGRpc3RhbmNlLFxuICAgICAgaW5jbHVkZU1hdGNoZXMsXG4gICAgICBmaW5kQWxsTWF0Y2hlcyxcbiAgICAgIG1pbk1hdGNoQ2hhckxlbmd0aCxcbiAgICAgIGlzQ2FzZVNlbnNpdGl2ZSxcbiAgICAgIGlnbm9yZUxvY2F0aW9uXG4gICAgfTtcbiAgICB0aGlzLnBhdHRlcm4gPSBpc0Nhc2VTZW5zaXRpdmUgPyBwYXR0ZXJuIDogcGF0dGVybi50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMuY2h1bmtzID0gW107XG4gICAgaWYgKCF0aGlzLnBhdHRlcm4ubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGFkZENodW5rID0gKHBhdHRlcm4sIHN0YXJ0SW5kZXgpID0+IHtcbiAgICAgIHRoaXMuY2h1bmtzLnB1c2goe1xuICAgICAgICBwYXR0ZXJuLFxuICAgICAgICBhbHBoYWJldDogY3JlYXRlUGF0dGVybkFscGhhYmV0KHBhdHRlcm4pLFxuICAgICAgICBzdGFydEluZGV4XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGxlbiA9IHRoaXMucGF0dGVybi5sZW5ndGg7XG4gICAgaWYgKGxlbiA+IE1BWF9CSVRTKSB7XG4gICAgICBsZXQgaSA9IDA7XG4gICAgICBjb25zdCByZW1haW5kZXIgPSBsZW4gJSBNQVhfQklUUztcbiAgICAgIGNvbnN0IGVuZCA9IGxlbiAtIHJlbWFpbmRlcjtcbiAgICAgIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgICAgIGFkZENodW5rKHRoaXMucGF0dGVybi5zdWJzdHIoaSwgTUFYX0JJVFMpLCBpKTtcbiAgICAgICAgaSArPSBNQVhfQklUUztcbiAgICAgIH1cbiAgICAgIGlmIChyZW1haW5kZXIpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IGxlbiAtIE1BWF9CSVRTO1xuICAgICAgICBhZGRDaHVuayh0aGlzLnBhdHRlcm4uc3Vic3RyKHN0YXJ0SW5kZXgpLCBzdGFydEluZGV4KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYWRkQ2h1bmsodGhpcy5wYXR0ZXJuLCAwKTtcbiAgICB9XG4gIH1cbiAgc2VhcmNoSW4odGV4dCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ2FzZVNlbnNpdGl2ZSxcbiAgICAgIGluY2x1ZGVNYXRjaGVzXG4gICAgfSA9IHRoaXMub3B0aW9ucztcbiAgICBpZiAoIWlzQ2FzZVNlbnNpdGl2ZSkge1xuICAgICAgdGV4dCA9IHRleHQudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICAvLyBFeGFjdCBtYXRjaFxuICAgIGlmICh0aGlzLnBhdHRlcm4gPT09IHRleHQpIHtcbiAgICAgIGxldCByZXN1bHQgPSB7XG4gICAgICAgIGlzTWF0Y2g6IHRydWUsXG4gICAgICAgIHNjb3JlOiAwXG4gICAgICB9O1xuICAgICAgaWYgKGluY2x1ZGVNYXRjaGVzKSB7XG4gICAgICAgIHJlc3VsdC5pbmRpY2VzID0gW1swLCB0ZXh0Lmxlbmd0aCAtIDFdXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlLCB1c2UgQml0YXAgYWxnb3JpdGhtXG4gICAgY29uc3Qge1xuICAgICAgbG9jYXRpb24sXG4gICAgICBkaXN0YW5jZSxcbiAgICAgIHRocmVzaG9sZCxcbiAgICAgIGZpbmRBbGxNYXRjaGVzLFxuICAgICAgbWluTWF0Y2hDaGFyTGVuZ3RoLFxuICAgICAgaWdub3JlTG9jYXRpb25cbiAgICB9ID0gdGhpcy5vcHRpb25zO1xuICAgIGxldCBhbGxJbmRpY2VzID0gW107XG4gICAgbGV0IHRvdGFsU2NvcmUgPSAwO1xuICAgIGxldCBoYXNNYXRjaGVzID0gZmFsc2U7XG4gICAgdGhpcy5jaHVua3MuZm9yRWFjaCgoe1xuICAgICAgcGF0dGVybixcbiAgICAgIGFscGhhYmV0LFxuICAgICAgc3RhcnRJbmRleFxuICAgIH0pID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgaXNNYXRjaCxcbiAgICAgICAgc2NvcmUsXG4gICAgICAgIGluZGljZXNcbiAgICAgIH0gPSBzZWFyY2godGV4dCwgcGF0dGVybiwgYWxwaGFiZXQsIHtcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uICsgc3RhcnRJbmRleCxcbiAgICAgICAgZGlzdGFuY2UsXG4gICAgICAgIHRocmVzaG9sZCxcbiAgICAgICAgZmluZEFsbE1hdGNoZXMsXG4gICAgICAgIG1pbk1hdGNoQ2hhckxlbmd0aCxcbiAgICAgICAgaW5jbHVkZU1hdGNoZXMsXG4gICAgICAgIGlnbm9yZUxvY2F0aW9uXG4gICAgICB9KTtcbiAgICAgIGlmIChpc01hdGNoKSB7XG4gICAgICAgIGhhc01hdGNoZXMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgdG90YWxTY29yZSArPSBzY29yZTtcbiAgICAgIGlmIChpc01hdGNoICYmIGluZGljZXMpIHtcbiAgICAgICAgYWxsSW5kaWNlcyA9IFsuLi5hbGxJbmRpY2VzLCAuLi5pbmRpY2VzXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgaXNNYXRjaDogaGFzTWF0Y2hlcyxcbiAgICAgIHNjb3JlOiBoYXNNYXRjaGVzID8gdG90YWxTY29yZSAvIHRoaXMuY2h1bmtzLmxlbmd0aCA6IDFcbiAgICB9O1xuICAgIGlmIChoYXNNYXRjaGVzICYmIGluY2x1ZGVNYXRjaGVzKSB7XG4gICAgICByZXN1bHQuaW5kaWNlcyA9IGFsbEluZGljZXM7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbmNsYXNzIEJhc2VNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKHBhdHRlcm4pIHtcbiAgICB0aGlzLnBhdHRlcm4gPSBwYXR0ZXJuO1xuICB9XG4gIHN0YXRpYyBpc011bHRpTWF0Y2gocGF0dGVybikge1xuICAgIHJldHVybiBnZXRNYXRjaChwYXR0ZXJuLCB0aGlzLm11bHRpUmVnZXgpO1xuICB9XG4gIHN0YXRpYyBpc1NpbmdsZU1hdGNoKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gZ2V0TWF0Y2gocGF0dGVybiwgdGhpcy5zaW5nbGVSZWdleCk7XG4gIH1cbiAgc2VhcmNoKCAvKnRleHQqLykge31cbn1cbmZ1bmN0aW9uIGdldE1hdGNoKHBhdHRlcm4sIGV4cCkge1xuICBjb25zdCBtYXRjaGVzID0gcGF0dGVybi5tYXRjaChleHApO1xuICByZXR1cm4gbWF0Y2hlcyA/IG1hdGNoZXNbMV0gOiBudWxsO1xufVxuXG4vLyBUb2tlbjogJ2ZpbGVcblxuY2xhc3MgRXhhY3RNYXRjaCBleHRlbmRzIEJhc2VNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKHBhdHRlcm4pIHtcbiAgICBzdXBlcihwYXR0ZXJuKTtcbiAgfVxuICBzdGF0aWMgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdleGFjdCc7XG4gIH1cbiAgc3RhdGljIGdldCBtdWx0aVJlZ2V4KCkge1xuICAgIHJldHVybiAvXj1cIiguKilcIiQvO1xuICB9XG4gIHN0YXRpYyBnZXQgc2luZ2xlUmVnZXgoKSB7XG4gICAgcmV0dXJuIC9ePSguKikkLztcbiAgfVxuICBzZWFyY2godGV4dCkge1xuICAgIGNvbnN0IGlzTWF0Y2ggPSB0ZXh0ID09PSB0aGlzLnBhdHRlcm47XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzTWF0Y2gsXG4gICAgICBzY29yZTogaXNNYXRjaCA/IDAgOiAxLFxuICAgICAgaW5kaWNlczogWzAsIHRoaXMucGF0dGVybi5sZW5ndGggLSAxXVxuICAgIH07XG4gIH1cbn1cblxuLy8gVG9rZW46ICFmaXJlXG5cbmNsYXNzIEludmVyc2VFeGFjdE1hdGNoIGV4dGVuZHMgQmFzZU1hdGNoIHtcbiAgY29uc3RydWN0b3IocGF0dGVybikge1xuICAgIHN1cGVyKHBhdHRlcm4pO1xuICB9XG4gIHN0YXRpYyBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2ludmVyc2UtZXhhY3QnO1xuICB9XG4gIHN0YXRpYyBnZXQgbXVsdGlSZWdleCgpIHtcbiAgICByZXR1cm4gL14hXCIoLiopXCIkLztcbiAgfVxuICBzdGF0aWMgZ2V0IHNpbmdsZVJlZ2V4KCkge1xuICAgIHJldHVybiAvXiEoLiopJC87XG4gIH1cbiAgc2VhcmNoKHRleHQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRleHQuaW5kZXhPZih0aGlzLnBhdHRlcm4pO1xuICAgIGNvbnN0IGlzTWF0Y2ggPSBpbmRleCA9PT0gLTE7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzTWF0Y2gsXG4gICAgICBzY29yZTogaXNNYXRjaCA/IDAgOiAxLFxuICAgICAgaW5kaWNlczogWzAsIHRleHQubGVuZ3RoIC0gMV1cbiAgICB9O1xuICB9XG59XG5cbi8vIFRva2VuOiBeZmlsZVxuXG5jbGFzcyBQcmVmaXhFeGFjdE1hdGNoIGV4dGVuZHMgQmFzZU1hdGNoIHtcbiAgY29uc3RydWN0b3IocGF0dGVybikge1xuICAgIHN1cGVyKHBhdHRlcm4pO1xuICB9XG4gIHN0YXRpYyBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ3ByZWZpeC1leGFjdCc7XG4gIH1cbiAgc3RhdGljIGdldCBtdWx0aVJlZ2V4KCkge1xuICAgIHJldHVybiAvXlxcXlwiKC4qKVwiJC87XG4gIH1cbiAgc3RhdGljIGdldCBzaW5nbGVSZWdleCgpIHtcbiAgICByZXR1cm4gL15cXF4oLiopJC87XG4gIH1cbiAgc2VhcmNoKHRleHQpIHtcbiAgICBjb25zdCBpc01hdGNoID0gdGV4dC5zdGFydHNXaXRoKHRoaXMucGF0dGVybik7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzTWF0Y2gsXG4gICAgICBzY29yZTogaXNNYXRjaCA/IDAgOiAxLFxuICAgICAgaW5kaWNlczogWzAsIHRoaXMucGF0dGVybi5sZW5ndGggLSAxXVxuICAgIH07XG4gIH1cbn1cblxuLy8gVG9rZW46ICFeZmlyZVxuXG5jbGFzcyBJbnZlcnNlUHJlZml4RXhhY3RNYXRjaCBleHRlbmRzIEJhc2VNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKHBhdHRlcm4pIHtcbiAgICBzdXBlcihwYXR0ZXJuKTtcbiAgfVxuICBzdGF0aWMgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdpbnZlcnNlLXByZWZpeC1leGFjdCc7XG4gIH1cbiAgc3RhdGljIGdldCBtdWx0aVJlZ2V4KCkge1xuICAgIHJldHVybiAvXiFcXF5cIiguKilcIiQvO1xuICB9XG4gIHN0YXRpYyBnZXQgc2luZ2xlUmVnZXgoKSB7XG4gICAgcmV0dXJuIC9eIVxcXiguKikkLztcbiAgfVxuICBzZWFyY2godGV4dCkge1xuICAgIGNvbnN0IGlzTWF0Y2ggPSAhdGV4dC5zdGFydHNXaXRoKHRoaXMucGF0dGVybik7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzTWF0Y2gsXG4gICAgICBzY29yZTogaXNNYXRjaCA/IDAgOiAxLFxuICAgICAgaW5kaWNlczogWzAsIHRleHQubGVuZ3RoIC0gMV1cbiAgICB9O1xuICB9XG59XG5cbi8vIFRva2VuOiAuZmlsZSRcblxuY2xhc3MgU3VmZml4RXhhY3RNYXRjaCBleHRlbmRzIEJhc2VNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKHBhdHRlcm4pIHtcbiAgICBzdXBlcihwYXR0ZXJuKTtcbiAgfVxuICBzdGF0aWMgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdzdWZmaXgtZXhhY3QnO1xuICB9XG4gIHN0YXRpYyBnZXQgbXVsdGlSZWdleCgpIHtcbiAgICByZXR1cm4gL15cIiguKilcIlxcJCQvO1xuICB9XG4gIHN0YXRpYyBnZXQgc2luZ2xlUmVnZXgoKSB7XG4gICAgcmV0dXJuIC9eKC4qKVxcJCQvO1xuICB9XG4gIHNlYXJjaCh0ZXh0KSB7XG4gICAgY29uc3QgaXNNYXRjaCA9IHRleHQuZW5kc1dpdGgodGhpcy5wYXR0ZXJuKTtcbiAgICByZXR1cm4ge1xuICAgICAgaXNNYXRjaCxcbiAgICAgIHNjb3JlOiBpc01hdGNoID8gMCA6IDEsXG4gICAgICBpbmRpY2VzOiBbdGV4dC5sZW5ndGggLSB0aGlzLnBhdHRlcm4ubGVuZ3RoLCB0ZXh0Lmxlbmd0aCAtIDFdXG4gICAgfTtcbiAgfVxufVxuXG4vLyBUb2tlbjogIS5maWxlJFxuXG5jbGFzcyBJbnZlcnNlU3VmZml4RXhhY3RNYXRjaCBleHRlbmRzIEJhc2VNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKHBhdHRlcm4pIHtcbiAgICBzdXBlcihwYXR0ZXJuKTtcbiAgfVxuICBzdGF0aWMgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdpbnZlcnNlLXN1ZmZpeC1leGFjdCc7XG4gIH1cbiAgc3RhdGljIGdldCBtdWx0aVJlZ2V4KCkge1xuICAgIHJldHVybiAvXiFcIiguKilcIlxcJCQvO1xuICB9XG4gIHN0YXRpYyBnZXQgc2luZ2xlUmVnZXgoKSB7XG4gICAgcmV0dXJuIC9eISguKilcXCQkLztcbiAgfVxuICBzZWFyY2godGV4dCkge1xuICAgIGNvbnN0IGlzTWF0Y2ggPSAhdGV4dC5lbmRzV2l0aCh0aGlzLnBhdHRlcm4pO1xuICAgIHJldHVybiB7XG4gICAgICBpc01hdGNoLFxuICAgICAgc2NvcmU6IGlzTWF0Y2ggPyAwIDogMSxcbiAgICAgIGluZGljZXM6IFswLCB0ZXh0Lmxlbmd0aCAtIDFdXG4gICAgfTtcbiAgfVxufVxuY2xhc3MgRnV6enlNYXRjaCBleHRlbmRzIEJhc2VNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKHBhdHRlcm4sIHtcbiAgICBsb2NhdGlvbiA9IENvbmZpZy5sb2NhdGlvbixcbiAgICB0aHJlc2hvbGQgPSBDb25maWcudGhyZXNob2xkLFxuICAgIGRpc3RhbmNlID0gQ29uZmlnLmRpc3RhbmNlLFxuICAgIGluY2x1ZGVNYXRjaGVzID0gQ29uZmlnLmluY2x1ZGVNYXRjaGVzLFxuICAgIGZpbmRBbGxNYXRjaGVzID0gQ29uZmlnLmZpbmRBbGxNYXRjaGVzLFxuICAgIG1pbk1hdGNoQ2hhckxlbmd0aCA9IENvbmZpZy5taW5NYXRjaENoYXJMZW5ndGgsXG4gICAgaXNDYXNlU2Vuc2l0aXZlID0gQ29uZmlnLmlzQ2FzZVNlbnNpdGl2ZSxcbiAgICBpZ25vcmVMb2NhdGlvbiA9IENvbmZpZy5pZ25vcmVMb2NhdGlvblxuICB9ID0ge30pIHtcbiAgICBzdXBlcihwYXR0ZXJuKTtcbiAgICB0aGlzLl9iaXRhcFNlYXJjaCA9IG5ldyBCaXRhcFNlYXJjaChwYXR0ZXJuLCB7XG4gICAgICBsb2NhdGlvbixcbiAgICAgIHRocmVzaG9sZCxcbiAgICAgIGRpc3RhbmNlLFxuICAgICAgaW5jbHVkZU1hdGNoZXMsXG4gICAgICBmaW5kQWxsTWF0Y2hlcyxcbiAgICAgIG1pbk1hdGNoQ2hhckxlbmd0aCxcbiAgICAgIGlzQ2FzZVNlbnNpdGl2ZSxcbiAgICAgIGlnbm9yZUxvY2F0aW9uXG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnZnV6enknO1xuICB9XG4gIHN0YXRpYyBnZXQgbXVsdGlSZWdleCgpIHtcbiAgICByZXR1cm4gL15cIiguKilcIiQvO1xuICB9XG4gIHN0YXRpYyBnZXQgc2luZ2xlUmVnZXgoKSB7XG4gICAgcmV0dXJuIC9eKC4qKSQvO1xuICB9XG4gIHNlYXJjaCh0ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpdGFwU2VhcmNoLnNlYXJjaEluKHRleHQpO1xuICB9XG59XG5cbi8vIFRva2VuOiAnZmlsZVxuXG5jbGFzcyBJbmNsdWRlTWF0Y2ggZXh0ZW5kcyBCYXNlTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihwYXR0ZXJuKSB7XG4gICAgc3VwZXIocGF0dGVybik7XG4gIH1cbiAgc3RhdGljIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnaW5jbHVkZSc7XG4gIH1cbiAgc3RhdGljIGdldCBtdWx0aVJlZ2V4KCkge1xuICAgIHJldHVybiAvXidcIiguKilcIiQvO1xuICB9XG4gIHN0YXRpYyBnZXQgc2luZ2xlUmVnZXgoKSB7XG4gICAgcmV0dXJuIC9eJyguKikkLztcbiAgfVxuICBzZWFyY2godGV4dCkge1xuICAgIGxldCBsb2NhdGlvbiA9IDA7XG4gICAgbGV0IGluZGV4O1xuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcbiAgICBjb25zdCBwYXR0ZXJuTGVuID0gdGhpcy5wYXR0ZXJuLmxlbmd0aDtcblxuICAgIC8vIEdldCBhbGwgZXhhY3QgbWF0Y2hlc1xuICAgIHdoaWxlICgoaW5kZXggPSB0ZXh0LmluZGV4T2YodGhpcy5wYXR0ZXJuLCBsb2NhdGlvbikpID4gLTEpIHtcbiAgICAgIGxvY2F0aW9uID0gaW5kZXggKyBwYXR0ZXJuTGVuO1xuICAgICAgaW5kaWNlcy5wdXNoKFtpbmRleCwgbG9jYXRpb24gLSAxXSk7XG4gICAgfVxuICAgIGNvbnN0IGlzTWF0Y2ggPSAhIWluZGljZXMubGVuZ3RoO1xuICAgIHJldHVybiB7XG4gICAgICBpc01hdGNoLFxuICAgICAgc2NvcmU6IGlzTWF0Y2ggPyAwIDogMSxcbiAgICAgIGluZGljZXNcbiAgICB9O1xuICB9XG59XG5cbi8vIFx1Mjc1N09yZGVyIGlzIGltcG9ydGFudC4gRE8gTk9UIENIQU5HRS5cbmNvbnN0IHNlYXJjaGVycyA9IFtFeGFjdE1hdGNoLCBJbmNsdWRlTWF0Y2gsIFByZWZpeEV4YWN0TWF0Y2gsIEludmVyc2VQcmVmaXhFeGFjdE1hdGNoLCBJbnZlcnNlU3VmZml4RXhhY3RNYXRjaCwgU3VmZml4RXhhY3RNYXRjaCwgSW52ZXJzZUV4YWN0TWF0Y2gsIEZ1enp5TWF0Y2hdO1xuY29uc3Qgc2VhcmNoZXJzTGVuID0gc2VhcmNoZXJzLmxlbmd0aDtcblxuLy8gUmVnZXggdG8gc3BsaXQgYnkgc3BhY2VzLCBidXQga2VlcCBhbnl0aGluZyBpbiBxdW90ZXMgdG9nZXRoZXJcbmNvbnN0IFNQQUNFX1JFID0gLyArKD89KD86W15cXFwiXSpcXFwiW15cXFwiXSpcXFwiKSpbXlxcXCJdKiQpLztcbmNvbnN0IE9SX1RPS0VOID0gJ3wnO1xuXG4vLyBSZXR1cm4gYSAyRCBhcnJheSByZXByZXNlbnRhdGlvbiBvZiB0aGUgcXVlcnksIGZvciBzaW1wbGVyIHBhcnNpbmcuXG4vLyBFeGFtcGxlOlxuLy8gXCJeY29yZSBnbyQgfCByYiQgfCBweSQgeHkkXCIgPT4gW1tcIl5jb3JlXCIsIFwiZ28kXCJdLCBbXCJyYiRcIl0sIFtcInB5JFwiLCBcInh5JFwiXV1cbmZ1bmN0aW9uIHBhcnNlUXVlcnkocGF0dGVybiwgb3B0aW9ucyA9IHt9KSB7XG4gIHJldHVybiBwYXR0ZXJuLnNwbGl0KE9SX1RPS0VOKS5tYXAoaXRlbSA9PiB7XG4gICAgbGV0IHF1ZXJ5ID0gaXRlbS50cmltKCkuc3BsaXQoU1BBQ0VfUkUpLmZpbHRlcihpdGVtID0+IGl0ZW0gJiYgISFpdGVtLnRyaW0oKSk7XG4gICAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcXVlcnkubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5SXRlbSA9IHF1ZXJ5W2ldO1xuXG4gICAgICAvLyAxLiBIYW5kbGUgbXVsdGlwbGUgcXVlcnkgbWF0Y2ggKGkuZSwgb25jZSB0aGF0IGFyZSBxdW90ZWQsIGxpa2UgYFwiaGVsbG8gd29ybGRcImApXG4gICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgIGxldCBpZHggPSAtMTtcbiAgICAgIHdoaWxlICghZm91bmQgJiYgKytpZHggPCBzZWFyY2hlcnNMZW4pIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoZXIgPSBzZWFyY2hlcnNbaWR4XTtcbiAgICAgICAgbGV0IHRva2VuID0gc2VhcmNoZXIuaXNNdWx0aU1hdGNoKHF1ZXJ5SXRlbSk7XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChuZXcgc2VhcmNoZXIodG9rZW4sIG9wdGlvbnMpKTtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gMi4gSGFuZGxlIHNpbmdsZSBxdWVyeSBtYXRjaGVzIChpLmUsIG9uY2UgdGhhdCBhcmUgKm5vdCogcXVvdGVkKVxuICAgICAgaWR4ID0gLTE7XG4gICAgICB3aGlsZSAoKytpZHggPCBzZWFyY2hlcnNMZW4pIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoZXIgPSBzZWFyY2hlcnNbaWR4XTtcbiAgICAgICAgbGV0IHRva2VuID0gc2VhcmNoZXIuaXNTaW5nbGVNYXRjaChxdWVyeUl0ZW0pO1xuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gobmV3IHNlYXJjaGVyKHRva2VuLCBvcHRpb25zKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0pO1xufVxuXG4vLyBUaGVzZSBleHRlbmRlZCBtYXRjaGVycyBjYW4gcmV0dXJuIGFuIGFycmF5IG9mIG1hdGNoZXMsIGFzIG9wcG9zZWRcbi8vIHRvIGEgc2luZ2wgbWF0Y2hcbmNvbnN0IE11bHRpTWF0Y2hTZXQgPSBuZXcgU2V0KFtGdXp6eU1hdGNoLnR5cGUsIEluY2x1ZGVNYXRjaC50eXBlXSk7XG5cbi8qKlxuICogQ29tbWFuZC1saWtlIHNlYXJjaGluZ1xuICogPT09PT09PT09PT09PT09PT09PT09PVxuICpcbiAqIEdpdmVuIG11bHRpcGxlIHNlYXJjaCB0ZXJtcyBkZWxpbWl0ZWQgYnkgc3BhY2VzLmUuZy4gYF5qc2NyaXB0IC5weXRob24kIHJ1YnkgIWphdmFgLFxuICogc2VhcmNoIGluIGEgZ2l2ZW4gdGV4dC5cbiAqXG4gKiBTZWFyY2ggc3ludGF4OlxuICpcbiAqIHwgVG9rZW4gICAgICAgfCBNYXRjaCB0eXBlICAgICAgICAgICAgICAgICB8IERlc2NyaXB0aW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgLS0tLS0tLS0tLS0gfCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB8IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHxcbiAqIHwgYGpzY3JpcHRgICAgfCBmdXp6eS1tYXRjaCAgICAgICAgICAgICAgICB8IEl0ZW1zIHRoYXQgZnV6enkgbWF0Y2ggYGpzY3JpcHRgICAgICAgIHxcbiAqIHwgYD1zY2hlbWVgICAgfCBleGFjdC1tYXRjaCAgICAgICAgICAgICAgICB8IEl0ZW1zIHRoYXQgYXJlIGBzY2hlbWVgICAgICAgICAgICAgICAgIHxcbiAqIHwgYCdweXRob25gICAgfCBpbmNsdWRlLW1hdGNoICAgICAgICAgICAgICB8IEl0ZW1zIHRoYXQgaW5jbHVkZSBgcHl0aG9uYCAgICAgICAgICAgIHxcbiAqIHwgYCFydWJ5YCAgICAgfCBpbnZlcnNlLWV4YWN0LW1hdGNoICAgICAgICB8IEl0ZW1zIHRoYXQgZG8gbm90IGluY2x1ZGUgYHJ1YnlgICAgICAgIHxcbiAqIHwgYF5qYXZhYCAgICAgfCBwcmVmaXgtZXhhY3QtbWF0Y2ggICAgICAgICB8IEl0ZW1zIHRoYXQgc3RhcnQgd2l0aCBgamF2YWAgICAgICAgICAgIHxcbiAqIHwgYCFeZWFybGFuZ2AgfCBpbnZlcnNlLXByZWZpeC1leGFjdC1tYXRjaCB8IEl0ZW1zIHRoYXQgZG8gbm90IHN0YXJ0IHdpdGggYGVhcmxhbmdgIHxcbiAqIHwgYC5qcyRgICAgICAgfCBzdWZmaXgtZXhhY3QtbWF0Y2ggICAgICAgICB8IEl0ZW1zIHRoYXQgZW5kIHdpdGggYC5qc2AgICAgICAgICAgICAgIHxcbiAqIHwgYCEuZ28kYCAgICAgfCBpbnZlcnNlLXN1ZmZpeC1leGFjdC1tYXRjaCB8IEl0ZW1zIHRoYXQgZG8gbm90IGVuZCB3aXRoIGAuZ29gICAgICAgIHxcbiAqXG4gKiBBIHNpbmdsZSBwaXBlIGNoYXJhY3RlciBhY3RzIGFzIGFuIE9SIG9wZXJhdG9yLiBGb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZ1xuICogcXVlcnkgbWF0Y2hlcyBlbnRyaWVzIHRoYXQgc3RhcnQgd2l0aCBgY29yZWAgYW5kIGVuZCB3aXRoIGVpdGhlcmBnb2AsIGByYmAsXG4gKiBvcmBweWAuXG4gKlxuICogYGBgXG4gKiBeY29yZSBnbyQgfCByYiQgfCBweSRcbiAqIGBgYFxuICovXG5jbGFzcyBFeHRlbmRlZFNlYXJjaCB7XG4gIGNvbnN0cnVjdG9yKHBhdHRlcm4sIHtcbiAgICBpc0Nhc2VTZW5zaXRpdmUgPSBDb25maWcuaXNDYXNlU2Vuc2l0aXZlLFxuICAgIGluY2x1ZGVNYXRjaGVzID0gQ29uZmlnLmluY2x1ZGVNYXRjaGVzLFxuICAgIG1pbk1hdGNoQ2hhckxlbmd0aCA9IENvbmZpZy5taW5NYXRjaENoYXJMZW5ndGgsXG4gICAgaWdub3JlTG9jYXRpb24gPSBDb25maWcuaWdub3JlTG9jYXRpb24sXG4gICAgZmluZEFsbE1hdGNoZXMgPSBDb25maWcuZmluZEFsbE1hdGNoZXMsXG4gICAgbG9jYXRpb24gPSBDb25maWcubG9jYXRpb24sXG4gICAgdGhyZXNob2xkID0gQ29uZmlnLnRocmVzaG9sZCxcbiAgICBkaXN0YW5jZSA9IENvbmZpZy5kaXN0YW5jZVxuICB9ID0ge30pIHtcbiAgICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICBpc0Nhc2VTZW5zaXRpdmUsXG4gICAgICBpbmNsdWRlTWF0Y2hlcyxcbiAgICAgIG1pbk1hdGNoQ2hhckxlbmd0aCxcbiAgICAgIGZpbmRBbGxNYXRjaGVzLFxuICAgICAgaWdub3JlTG9jYXRpb24sXG4gICAgICBsb2NhdGlvbixcbiAgICAgIHRocmVzaG9sZCxcbiAgICAgIGRpc3RhbmNlXG4gICAgfTtcbiAgICB0aGlzLnBhdHRlcm4gPSBpc0Nhc2VTZW5zaXRpdmUgPyBwYXR0ZXJuIDogcGF0dGVybi50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMucXVlcnkgPSBwYXJzZVF1ZXJ5KHRoaXMucGF0dGVybiwgdGhpcy5vcHRpb25zKTtcbiAgfVxuICBzdGF0aWMgY29uZGl0aW9uKF8sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy51c2VFeHRlbmRlZFNlYXJjaDtcbiAgfVxuICBzZWFyY2hJbih0ZXh0KSB7XG4gICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5O1xuICAgIGlmICghcXVlcnkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzTWF0Y2g6IGZhbHNlLFxuICAgICAgICBzY29yZTogMVxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc3Qge1xuICAgICAgaW5jbHVkZU1hdGNoZXMsXG4gICAgICBpc0Nhc2VTZW5zaXRpdmVcbiAgICB9ID0gdGhpcy5vcHRpb25zO1xuICAgIHRleHQgPSBpc0Nhc2VTZW5zaXRpdmUgPyB0ZXh0IDogdGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCBudW1NYXRjaGVzID0gMDtcbiAgICBsZXQgYWxsSW5kaWNlcyA9IFtdO1xuICAgIGxldCB0b3RhbFNjb3JlID0gMDtcblxuICAgIC8vIE9Sc1xuICAgIGZvciAobGV0IGkgPSAwLCBxTGVuID0gcXVlcnkubGVuZ3RoOyBpIDwgcUxlbjsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzZWFyY2hlcnMgPSBxdWVyeVtpXTtcblxuICAgICAgLy8gUmVzZXQgaW5kaWNlc1xuICAgICAgYWxsSW5kaWNlcy5sZW5ndGggPSAwO1xuICAgICAgbnVtTWF0Y2hlcyA9IDA7XG5cbiAgICAgIC8vIEFORHNcbiAgICAgIGZvciAobGV0IGogPSAwLCBwTGVuID0gc2VhcmNoZXJzLmxlbmd0aDsgaiA8IHBMZW47IGogKz0gMSkge1xuICAgICAgICBjb25zdCBzZWFyY2hlciA9IHNlYXJjaGVyc1tqXTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGlzTWF0Y2gsXG4gICAgICAgICAgaW5kaWNlcyxcbiAgICAgICAgICBzY29yZVxuICAgICAgICB9ID0gc2VhcmNoZXIuc2VhcmNoKHRleHQpO1xuICAgICAgICBpZiAoaXNNYXRjaCkge1xuICAgICAgICAgIG51bU1hdGNoZXMgKz0gMTtcbiAgICAgICAgICB0b3RhbFNjb3JlICs9IHNjb3JlO1xuICAgICAgICAgIGlmIChpbmNsdWRlTWF0Y2hlcykge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNlYXJjaGVyLmNvbnN0cnVjdG9yLnR5cGU7XG4gICAgICAgICAgICBpZiAoTXVsdGlNYXRjaFNldC5oYXModHlwZSkpIHtcbiAgICAgICAgICAgICAgYWxsSW5kaWNlcyA9IFsuLi5hbGxJbmRpY2VzLCAuLi5pbmRpY2VzXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFsbEluZGljZXMucHVzaChpbmRpY2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG90YWxTY29yZSA9IDA7XG4gICAgICAgICAgbnVtTWF0Y2hlcyA9IDA7XG4gICAgICAgICAgYWxsSW5kaWNlcy5sZW5ndGggPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE9SIGNvbmRpdGlvbiwgc28gaWYgVFJVRSwgcmV0dXJuXG4gICAgICBpZiAobnVtTWF0Y2hlcykge1xuICAgICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICAgIGlzTWF0Y2g6IHRydWUsXG4gICAgICAgICAgc2NvcmU6IHRvdGFsU2NvcmUgLyBudW1NYXRjaGVzXG4gICAgICAgIH07XG4gICAgICAgIGlmIChpbmNsdWRlTWF0Y2hlcykge1xuICAgICAgICAgIHJlc3VsdC5pbmRpY2VzID0gYWxsSW5kaWNlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE5vdGhpbmcgd2FzIG1hdGNoZWRcbiAgICByZXR1cm4ge1xuICAgICAgaXNNYXRjaDogZmFsc2UsXG4gICAgICBzY29yZTogMVxuICAgIH07XG4gIH1cbn1cbmNvbnN0IHJlZ2lzdGVyZWRTZWFyY2hlcnMgPSBbXTtcbmZ1bmN0aW9uIHJlZ2lzdGVyKC4uLmFyZ3MpIHtcbiAgcmVnaXN0ZXJlZFNlYXJjaGVycy5wdXNoKC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gY3JlYXRlU2VhcmNoZXIocGF0dGVybiwgb3B0aW9ucykge1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gcmVnaXN0ZXJlZFNlYXJjaGVycy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgIGxldCBzZWFyY2hlckNsYXNzID0gcmVnaXN0ZXJlZFNlYXJjaGVyc1tpXTtcbiAgICBpZiAoc2VhcmNoZXJDbGFzcy5jb25kaXRpb24ocGF0dGVybiwgb3B0aW9ucykpIHtcbiAgICAgIHJldHVybiBuZXcgc2VhcmNoZXJDbGFzcyhwYXR0ZXJuLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBCaXRhcFNlYXJjaChwYXR0ZXJuLCBvcHRpb25zKTtcbn1cbmNvbnN0IExvZ2ljYWxPcGVyYXRvciA9IHtcbiAgQU5EOiAnJGFuZCcsXG4gIE9SOiAnJG9yJ1xufTtcbmNvbnN0IEtleVR5cGUgPSB7XG4gIFBBVEg6ICckcGF0aCcsXG4gIFBBVFRFUk46ICckdmFsJ1xufTtcbmNvbnN0IGlzRXhwcmVzc2lvbiA9IHF1ZXJ5ID0+ICEhKHF1ZXJ5W0xvZ2ljYWxPcGVyYXRvci5BTkRdIHx8IHF1ZXJ5W0xvZ2ljYWxPcGVyYXRvci5PUl0pO1xuY29uc3QgaXNQYXRoID0gcXVlcnkgPT4gISFxdWVyeVtLZXlUeXBlLlBBVEhdO1xuY29uc3QgaXNMZWFmID0gcXVlcnkgPT4gIWlzQXJyYXkocXVlcnkpICYmIGlzT2JqZWN0KHF1ZXJ5KSAmJiAhaXNFeHByZXNzaW9uKHF1ZXJ5KTtcbmNvbnN0IGNvbnZlcnRUb0V4cGxpY2l0ID0gcXVlcnkgPT4gKHtcbiAgW0xvZ2ljYWxPcGVyYXRvci5BTkRdOiBPYmplY3Qua2V5cyhxdWVyeSkubWFwKGtleSA9PiAoe1xuICAgIFtrZXldOiBxdWVyeVtrZXldXG4gIH0pKVxufSk7XG5cbi8vIFdoZW4gYGF1dG9gIGlzIGB0cnVlYCwgdGhlIHBhcnNlIGZ1bmN0aW9uIHdpbGwgaW5mZXIgYW5kIGluaXRpYWxpemUgYW5kIGFkZFxuLy8gdGhlIGFwcHJvcHJpYXRlIGBTZWFyY2hlcmAgaW5zdGFuY2VcbmZ1bmN0aW9uIHBhcnNlKHF1ZXJ5LCBvcHRpb25zLCB7XG4gIGF1dG8gPSB0cnVlXG59ID0ge30pIHtcbiAgY29uc3QgbmV4dCA9IHF1ZXJ5ID0+IHtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5KTtcbiAgICBjb25zdCBpc1F1ZXJ5UGF0aCA9IGlzUGF0aChxdWVyeSk7XG4gICAgaWYgKCFpc1F1ZXJ5UGF0aCAmJiBrZXlzLmxlbmd0aCA+IDEgJiYgIWlzRXhwcmVzc2lvbihxdWVyeSkpIHtcbiAgICAgIHJldHVybiBuZXh0KGNvbnZlcnRUb0V4cGxpY2l0KHF1ZXJ5KSk7XG4gICAgfVxuICAgIGlmIChpc0xlYWYocXVlcnkpKSB7XG4gICAgICBjb25zdCBrZXkgPSBpc1F1ZXJ5UGF0aCA/IHF1ZXJ5W0tleVR5cGUuUEFUSF0gOiBrZXlzWzBdO1xuICAgICAgY29uc3QgcGF0dGVybiA9IGlzUXVlcnlQYXRoID8gcXVlcnlbS2V5VHlwZS5QQVRURVJOXSA6IHF1ZXJ5W2tleV07XG4gICAgICBpZiAoIWlzU3RyaW5nKHBhdHRlcm4pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihMT0dJQ0FMX1NFQVJDSF9JTlZBTElEX1FVRVJZX0ZPUl9LRVkoa2V5KSk7XG4gICAgICB9XG4gICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIGtleUlkOiBjcmVhdGVLZXlJZChrZXkpLFxuICAgICAgICBwYXR0ZXJuXG4gICAgICB9O1xuICAgICAgaWYgKGF1dG8pIHtcbiAgICAgICAgb2JqLnNlYXJjaGVyID0gY3JlYXRlU2VhcmNoZXIocGF0dGVybiwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBsZXQgbm9kZSA9IHtcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgIG9wZXJhdG9yOiBrZXlzWzBdXG4gICAgfTtcbiAgICBrZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcXVlcnlba2V5XTtcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIG5vZGUuY2hpbGRyZW4ucHVzaChuZXh0KGl0ZW0pKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG4gIGlmICghaXNFeHByZXNzaW9uKHF1ZXJ5KSkge1xuICAgIHF1ZXJ5ID0gY29udmVydFRvRXhwbGljaXQocXVlcnkpO1xuICB9XG4gIHJldHVybiBuZXh0KHF1ZXJ5KTtcbn1cblxuLy8gUHJhY3RpY2FsIHNjb3JpbmcgZnVuY3Rpb25cbmZ1bmN0aW9uIGNvbXB1dGVTY29yZShyZXN1bHRzLCB7XG4gIGlnbm9yZUZpZWxkTm9ybSA9IENvbmZpZy5pZ25vcmVGaWVsZE5vcm1cbn0pIHtcbiAgcmVzdWx0cy5mb3JFYWNoKHJlc3VsdCA9PiB7XG4gICAgbGV0IHRvdGFsU2NvcmUgPSAxO1xuICAgIHJlc3VsdC5tYXRjaGVzLmZvckVhY2goKHtcbiAgICAgIGtleSxcbiAgICAgIG5vcm0sXG4gICAgICBzY29yZVxuICAgIH0pID0+IHtcbiAgICAgIGNvbnN0IHdlaWdodCA9IGtleSA/IGtleS53ZWlnaHQgOiBudWxsO1xuICAgICAgdG90YWxTY29yZSAqPSBNYXRoLnBvdyhzY29yZSA9PT0gMCAmJiB3ZWlnaHQgPyBOdW1iZXIuRVBTSUxPTiA6IHNjb3JlLCAod2VpZ2h0IHx8IDEpICogKGlnbm9yZUZpZWxkTm9ybSA/IDEgOiBub3JtKSk7XG4gICAgfSk7XG4gICAgcmVzdWx0LnNjb3JlID0gdG90YWxTY29yZTtcbiAgfSk7XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm1NYXRjaGVzKHJlc3VsdCwgZGF0YSkge1xuICBjb25zdCBtYXRjaGVzID0gcmVzdWx0Lm1hdGNoZXM7XG4gIGRhdGEubWF0Y2hlcyA9IFtdO1xuICBpZiAoIWlzRGVmaW5lZChtYXRjaGVzKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBtYXRjaGVzLmZvckVhY2gobWF0Y2ggPT4ge1xuICAgIGlmICghaXNEZWZpbmVkKG1hdGNoLmluZGljZXMpIHx8ICFtYXRjaC5pbmRpY2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICBpbmRpY2VzLFxuICAgICAgdmFsdWVcbiAgICB9ID0gbWF0Y2g7XG4gICAgbGV0IG9iaiA9IHtcbiAgICAgIGluZGljZXMsXG4gICAgICB2YWx1ZVxuICAgIH07XG4gICAgaWYgKG1hdGNoLmtleSkge1xuICAgICAgb2JqLmtleSA9IG1hdGNoLmtleS5zcmM7XG4gICAgfVxuICAgIGlmIChtYXRjaC5pZHggPiAtMSkge1xuICAgICAgb2JqLnJlZkluZGV4ID0gbWF0Y2guaWR4O1xuICAgIH1cbiAgICBkYXRhLm1hdGNoZXMucHVzaChvYmopO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHRyYW5zZm9ybVNjb3JlKHJlc3VsdCwgZGF0YSkge1xuICBkYXRhLnNjb3JlID0gcmVzdWx0LnNjb3JlO1xufVxuZnVuY3Rpb24gZm9ybWF0KHJlc3VsdHMsIGRvY3MsIHtcbiAgaW5jbHVkZU1hdGNoZXMgPSBDb25maWcuaW5jbHVkZU1hdGNoZXMsXG4gIGluY2x1ZGVTY29yZSA9IENvbmZpZy5pbmNsdWRlU2NvcmVcbn0gPSB7fSkge1xuICBjb25zdCB0cmFuc2Zvcm1lcnMgPSBbXTtcbiAgaWYgKGluY2x1ZGVNYXRjaGVzKSB0cmFuc2Zvcm1lcnMucHVzaCh0cmFuc2Zvcm1NYXRjaGVzKTtcbiAgaWYgKGluY2x1ZGVTY29yZSkgdHJhbnNmb3JtZXJzLnB1c2godHJhbnNmb3JtU2NvcmUpO1xuICByZXR1cm4gcmVzdWx0cy5tYXAocmVzdWx0ID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpZHhcbiAgICB9ID0gcmVzdWx0O1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBpdGVtOiBkb2NzW2lkeF0sXG4gICAgICByZWZJbmRleDogaWR4XG4gICAgfTtcbiAgICBpZiAodHJhbnNmb3JtZXJzLmxlbmd0aCkge1xuICAgICAgdHJhbnNmb3JtZXJzLmZvckVhY2godHJhbnNmb3JtZXIgPT4ge1xuICAgICAgICB0cmFuc2Zvcm1lcihyZXN1bHQsIGRhdGEpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9KTtcbn1cbmNsYXNzIEZ1c2Uge1xuICBjb25zdHJ1Y3Rvcihkb2NzLCBvcHRpb25zID0ge30sIGluZGV4KSB7XG4gICAgdGhpcy5vcHRpb25zID0gX29iamVjdFNwcmVhZDIoX29iamVjdFNwcmVhZDIoe30sIENvbmZpZyksIG9wdGlvbnMpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlRXh0ZW5kZWRTZWFyY2ggJiYgIXRydWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihFWFRFTkRFRF9TRUFSQ0hfVU5BVkFJTEFCTEUpO1xuICAgIH1cbiAgICB0aGlzLl9rZXlTdG9yZSA9IG5ldyBLZXlTdG9yZSh0aGlzLm9wdGlvbnMua2V5cyk7XG4gICAgdGhpcy5zZXRDb2xsZWN0aW9uKGRvY3MsIGluZGV4KTtcbiAgfVxuICBzZXRDb2xsZWN0aW9uKGRvY3MsIGluZGV4KSB7XG4gICAgdGhpcy5fZG9jcyA9IGRvY3M7XG4gICAgaWYgKGluZGV4ICYmICEoaW5kZXggaW5zdGFuY2VvZiBGdXNlSW5kZXgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSU5DT1JSRUNUX0lOREVYX1RZUEUpO1xuICAgIH1cbiAgICB0aGlzLl9teUluZGV4ID0gaW5kZXggfHwgY3JlYXRlSW5kZXgodGhpcy5vcHRpb25zLmtleXMsIHRoaXMuX2RvY3MsIHtcbiAgICAgIGdldEZuOiB0aGlzLm9wdGlvbnMuZ2V0Rm4sXG4gICAgICBmaWVsZE5vcm1XZWlnaHQ6IHRoaXMub3B0aW9ucy5maWVsZE5vcm1XZWlnaHRcbiAgICB9KTtcbiAgfVxuICBhZGQoZG9jKSB7XG4gICAgaWYgKCFpc0RlZmluZWQoZG9jKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9kb2NzLnB1c2goZG9jKTtcbiAgICB0aGlzLl9teUluZGV4LmFkZChkb2MpO1xuICB9XG4gIHJlbW92ZShwcmVkaWNhdGUgPSAoIC8qIGRvYywgaWR4ICovKSA9PiBmYWxzZSkge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5fZG9jcy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgY29uc3QgZG9jID0gdGhpcy5fZG9jc1tpXTtcbiAgICAgIGlmIChwcmVkaWNhdGUoZG9jLCBpKSkge1xuICAgICAgICB0aGlzLnJlbW92ZUF0KGkpO1xuICAgICAgICBpIC09IDE7XG4gICAgICAgIGxlbiAtPSAxO1xuICAgICAgICByZXN1bHRzLnB1c2goZG9jKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cbiAgcmVtb3ZlQXQoaWR4KSB7XG4gICAgdGhpcy5fZG9jcy5zcGxpY2UoaWR4LCAxKTtcbiAgICB0aGlzLl9teUluZGV4LnJlbW92ZUF0KGlkeCk7XG4gIH1cbiAgZ2V0SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX215SW5kZXg7XG4gIH1cbiAgc2VhcmNoKHF1ZXJ5LCB7XG4gICAgbGltaXQgPSAtMVxuICB9ID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBpbmNsdWRlTWF0Y2hlcyxcbiAgICAgIGluY2x1ZGVTY29yZSxcbiAgICAgIHNob3VsZFNvcnQsXG4gICAgICBzb3J0Rm4sXG4gICAgICBpZ25vcmVGaWVsZE5vcm1cbiAgICB9ID0gdGhpcy5vcHRpb25zO1xuICAgIGxldCByZXN1bHRzID0gaXNTdHJpbmcocXVlcnkpID8gaXNTdHJpbmcodGhpcy5fZG9jc1swXSkgPyB0aGlzLl9zZWFyY2hTdHJpbmdMaXN0KHF1ZXJ5KSA6IHRoaXMuX3NlYXJjaE9iamVjdExpc3QocXVlcnkpIDogdGhpcy5fc2VhcmNoTG9naWNhbChxdWVyeSk7XG4gICAgY29tcHV0ZVNjb3JlKHJlc3VsdHMsIHtcbiAgICAgIGlnbm9yZUZpZWxkTm9ybVxuICAgIH0pO1xuICAgIGlmIChzaG91bGRTb3J0KSB7XG4gICAgICByZXN1bHRzLnNvcnQoc29ydEZuKTtcbiAgICB9XG4gICAgaWYgKGlzTnVtYmVyKGxpbWl0KSAmJiBsaW1pdCA+IC0xKSB7XG4gICAgICByZXN1bHRzID0gcmVzdWx0cy5zbGljZSgwLCBsaW1pdCk7XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXQocmVzdWx0cywgdGhpcy5fZG9jcywge1xuICAgICAgaW5jbHVkZU1hdGNoZXMsXG4gICAgICBpbmNsdWRlU2NvcmVcbiAgICB9KTtcbiAgfVxuICBfc2VhcmNoU3RyaW5nTGlzdChxdWVyeSkge1xuICAgIGNvbnN0IHNlYXJjaGVyID0gY3JlYXRlU2VhcmNoZXIocXVlcnksIHRoaXMub3B0aW9ucyk7XG4gICAgY29uc3Qge1xuICAgICAgcmVjb3Jkc1xuICAgIH0gPSB0aGlzLl9teUluZGV4O1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcblxuICAgIC8vIEl0ZXJhdGUgb3ZlciBldmVyeSBzdHJpbmcgaW4gdGhlIGluZGV4XG4gICAgcmVjb3Jkcy5mb3JFYWNoKCh7XG4gICAgICB2OiB0ZXh0LFxuICAgICAgaTogaWR4LFxuICAgICAgbjogbm9ybVxuICAgIH0pID0+IHtcbiAgICAgIGlmICghaXNEZWZpbmVkKHRleHQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgaXNNYXRjaCxcbiAgICAgICAgc2NvcmUsXG4gICAgICAgIGluZGljZXNcbiAgICAgIH0gPSBzZWFyY2hlci5zZWFyY2hJbih0ZXh0KTtcbiAgICAgIGlmIChpc01hdGNoKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgaXRlbTogdGV4dCxcbiAgICAgICAgICBpZHgsXG4gICAgICAgICAgbWF0Y2hlczogW3tcbiAgICAgICAgICAgIHNjb3JlLFxuICAgICAgICAgICAgdmFsdWU6IHRleHQsXG4gICAgICAgICAgICBub3JtLFxuICAgICAgICAgICAgaW5kaWNlc1xuICAgICAgICAgIH1dXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG4gIF9zZWFyY2hMb2dpY2FsKHF1ZXJ5KSB7XG4gICAgY29uc3QgZXhwcmVzc2lvbiA9IHBhcnNlKHF1ZXJ5LCB0aGlzLm9wdGlvbnMpO1xuICAgIGNvbnN0IGV2YWx1YXRlID0gKG5vZGUsIGl0ZW0sIGlkeCkgPT4ge1xuICAgICAgaWYgKCFub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBrZXlJZCxcbiAgICAgICAgICBzZWFyY2hlclxuICAgICAgICB9ID0gbm9kZTtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuX2ZpbmRNYXRjaGVzKHtcbiAgICAgICAgICBrZXk6IHRoaXMuX2tleVN0b3JlLmdldChrZXlJZCksXG4gICAgICAgICAgdmFsdWU6IHRoaXMuX215SW5kZXguZ2V0VmFsdWVGb3JJdGVtQXRLZXlJZChpdGVtLCBrZXlJZCksXG4gICAgICAgICAgc2VhcmNoZXJcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgbWF0Y2hlc1xuICAgICAgICAgIH1dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBldmFsdWF0ZShjaGlsZCwgaXRlbSwgaWR4KTtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICByZXMucHVzaCguLi5yZXN1bHQpO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUub3BlcmF0b3IgPT09IExvZ2ljYWxPcGVyYXRvci5BTkQpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICBjb25zdCByZWNvcmRzID0gdGhpcy5fbXlJbmRleC5yZWNvcmRzO1xuICAgIGNvbnN0IHJlc3VsdE1hcCA9IHt9O1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICByZWNvcmRzLmZvckVhY2goKHtcbiAgICAgICQ6IGl0ZW0sXG4gICAgICBpOiBpZHhcbiAgICB9KSA9PiB7XG4gICAgICBpZiAoaXNEZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgIGxldCBleHBSZXN1bHRzID0gZXZhbHVhdGUoZXhwcmVzc2lvbiwgaXRlbSwgaWR4KTtcbiAgICAgICAgaWYgKGV4cFJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gRGVkdXBlIHdoZW4gYWRkaW5nXG4gICAgICAgICAgaWYgKCFyZXN1bHRNYXBbaWR4XSkge1xuICAgICAgICAgICAgcmVzdWx0TWFwW2lkeF0gPSB7XG4gICAgICAgICAgICAgIGlkeCxcbiAgICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgICAgbWF0Y2hlczogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0TWFwW2lkeF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBleHBSZXN1bHRzLmZvckVhY2goKHtcbiAgICAgICAgICAgIG1hdGNoZXNcbiAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICByZXN1bHRNYXBbaWR4XS5tYXRjaGVzLnB1c2goLi4ubWF0Y2hlcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuICBfc2VhcmNoT2JqZWN0TGlzdChxdWVyeSkge1xuICAgIGNvbnN0IHNlYXJjaGVyID0gY3JlYXRlU2VhcmNoZXIocXVlcnksIHRoaXMub3B0aW9ucyk7XG4gICAgY29uc3Qge1xuICAgICAga2V5cyxcbiAgICAgIHJlY29yZHNcbiAgICB9ID0gdGhpcy5fbXlJbmRleDtcbiAgICBjb25zdCByZXN1bHRzID0gW107XG5cbiAgICAvLyBMaXN0IGlzIEFycmF5PE9iamVjdD5cbiAgICByZWNvcmRzLmZvckVhY2goKHtcbiAgICAgICQ6IGl0ZW0sXG4gICAgICBpOiBpZHhcbiAgICB9KSA9PiB7XG4gICAgICBpZiAoIWlzRGVmaW5lZChpdGVtKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBsZXQgbWF0Y2hlcyA9IFtdO1xuXG4gICAgICAvLyBJdGVyYXRlIG92ZXIgZXZlcnkga2V5IChpLmUsIHBhdGgpLCBhbmQgZmV0Y2ggdGhlIHZhbHVlIGF0IHRoYXQga2V5XG4gICAgICBrZXlzLmZvckVhY2goKGtleSwga2V5SW5kZXgpID0+IHtcbiAgICAgICAgbWF0Y2hlcy5wdXNoKC4uLnRoaXMuX2ZpbmRNYXRjaGVzKHtcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgdmFsdWU6IGl0ZW1ba2V5SW5kZXhdLFxuICAgICAgICAgIHNlYXJjaGVyXG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgaWR4LFxuICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgbWF0Y2hlc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuICBfZmluZE1hdGNoZXMoe1xuICAgIGtleSxcbiAgICB2YWx1ZSxcbiAgICBzZWFyY2hlclxuICB9KSB7XG4gICAgaWYgKCFpc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGxldCBtYXRjaGVzID0gW107XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKCh7XG4gICAgICAgIHY6IHRleHQsXG4gICAgICAgIGk6IGlkeCxcbiAgICAgICAgbjogbm9ybVxuICAgICAgfSkgPT4ge1xuICAgICAgICBpZiAoIWlzRGVmaW5lZCh0ZXh0KSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgaXNNYXRjaCxcbiAgICAgICAgICBzY29yZSxcbiAgICAgICAgICBpbmRpY2VzXG4gICAgICAgIH0gPSBzZWFyY2hlci5zZWFyY2hJbih0ZXh0KTtcbiAgICAgICAgaWYgKGlzTWF0Y2gpIHtcbiAgICAgICAgICBtYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgc2NvcmUsXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICB2YWx1ZTogdGV4dCxcbiAgICAgICAgICAgIGlkeCxcbiAgICAgICAgICAgIG5vcm0sXG4gICAgICAgICAgICBpbmRpY2VzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHY6IHRleHQsXG4gICAgICAgIG46IG5vcm1cbiAgICAgIH0gPSB2YWx1ZTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgaXNNYXRjaCxcbiAgICAgICAgc2NvcmUsXG4gICAgICAgIGluZGljZXNcbiAgICAgIH0gPSBzZWFyY2hlci5zZWFyY2hJbih0ZXh0KTtcbiAgICAgIGlmIChpc01hdGNoKSB7XG4gICAgICAgIG1hdGNoZXMucHVzaCh7XG4gICAgICAgICAgc2NvcmUsXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHZhbHVlOiB0ZXh0LFxuICAgICAgICAgIG5vcm0sXG4gICAgICAgICAgaW5kaWNlc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cbn1cbkZ1c2UudmVyc2lvbiA9ICc3LjAuMCc7XG5GdXNlLmNyZWF0ZUluZGV4ID0gY3JlYXRlSW5kZXg7XG5GdXNlLnBhcnNlSW5kZXggPSBwYXJzZUluZGV4O1xuRnVzZS5jb25maWcgPSBDb25maWc7XG57XG4gIEZ1c2UucGFyc2VRdWVyeSA9IHBhcnNlO1xufVxue1xuICByZWdpc3RlcihFeHRlbmRlZFNlYXJjaCk7XG59XG5cbnZhciBTZWFyY2hCeUZ1c2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2VhcmNoQnlGdXNlKGNvbmZpZykge1xuICAgICAgICB0aGlzLl9oYXlzdGFjayA9IFtdO1xuICAgICAgICB0aGlzLl9mdXNlT3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBjb25maWcuZnVzZU9wdGlvbnMpLCB7IGtleXM6IF9fc3ByZWFkQXJyYXkoW10sIGNvbmZpZy5zZWFyY2hGaWVsZHMsIHRydWUpLCBpbmNsdWRlTWF0Y2hlczogdHJ1ZSB9KTtcbiAgICB9XG4gICAgU2VhcmNoQnlGdXNlLnByb3RvdHlwZS5pbmRleCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHRoaXMuX2hheXN0YWNrID0gZGF0YTtcbiAgICAgICAgaWYgKHRoaXMuX2Z1c2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2Z1c2Uuc2V0Q29sbGVjdGlvbihkYXRhKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2VhcmNoQnlGdXNlLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5faGF5c3RhY2sgPSBbXTtcbiAgICAgICAgdGhpcy5fZnVzZSA9IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIFNlYXJjaEJ5RnVzZS5wcm90b3R5cGUuaXNFbXB0eUluZGV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX2hheXN0YWNrLmxlbmd0aDtcbiAgICB9O1xuICAgIFNlYXJjaEJ5RnVzZS5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKG5lZWRsZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2Z1c2UpIHtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mdXNlID0gbmV3IEZ1c2UodGhpcy5faGF5c3RhY2ssIHRoaXMuX2Z1c2VPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0cyA9IHRoaXMuX2Z1c2Uuc2VhcmNoKG5lZWRsZSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzLm1hcChmdW5jdGlvbiAodmFsdWUsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaXRlbTogdmFsdWUuaXRlbSxcbiAgICAgICAgICAgICAgICBzY29yZTogdmFsdWUuc2NvcmUgfHwgMCxcbiAgICAgICAgICAgICAgICByYW5rOiBpICsgMSwgLy8gSWYgdmFsdWUuc2NvcmUgaXMgdXNlZCBmb3Igc29ydGluZywgdGhpcyBjYW4gY3JlYXRlIG5vbi1zdGFibGUgc29ydHMhXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTZWFyY2hCeUZ1c2U7XG59KCkpO1xuXG5mdW5jdGlvbiBnZXRTZWFyY2hlcihjb25maWcpIHtcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoQnlGdXNlKGNvbmZpZyk7XG4gICAgfVxufVxuXG4vKipcbiAqIEhlbHBlcnMgdG8gY3JlYXRlIEhUTUwgZWxlbWVudHMgdXNlZCBieSBDaG9pY2VzXG4gKiBDYW4gYmUgb3ZlcnJpZGRlbiBieSBwcm92aWRpbmcgYGNhbGxiYWNrT25DcmVhdGVUZW1wbGF0ZXNgIG9wdGlvbi5cbiAqIGBDaG9pY2VzLmRlZmF1bHRzLnRlbXBsYXRlc2AgYWxsb3dzIGFjY2VzcyB0byB0aGUgZGVmYXVsdCB0ZW1wbGF0ZSBtZXRob2RzIGZyb20gYGNhbGxiYWNrT25DcmVhdGVUZW1wbGF0ZXNgXG4gKi9cbnZhciBpc0VtcHR5T2JqZWN0ID0gZnVuY3Rpb24gKG9iaikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcbnZhciBhc3NpZ25DdXN0b21Qcm9wZXJ0aWVzID0gZnVuY3Rpb24gKGVsLCBjaG9pY2UsIHdpdGhDdXN0b21Qcm9wZXJ0aWVzKSB7XG4gICAgdmFyIGRhdGFzZXQgPSBlbC5kYXRhc2V0O1xuICAgIHZhciBjdXN0b21Qcm9wZXJ0aWVzID0gY2hvaWNlLmN1c3RvbVByb3BlcnRpZXMsIGxhYmVsQ2xhc3MgPSBjaG9pY2UubGFiZWxDbGFzcywgbGFiZWxEZXNjcmlwdGlvbiA9IGNob2ljZS5sYWJlbERlc2NyaXB0aW9uO1xuICAgIGlmIChsYWJlbENsYXNzKSB7XG4gICAgICAgIGRhdGFzZXQubGFiZWxDbGFzcyA9IGdldENsYXNzTmFtZXMobGFiZWxDbGFzcykuam9pbignICcpO1xuICAgIH1cbiAgICBpZiAobGFiZWxEZXNjcmlwdGlvbikge1xuICAgICAgICBkYXRhc2V0LmxhYmVsRGVzY3JpcHRpb24gPSBsYWJlbERlc2NyaXB0aW9uO1xuICAgIH1cbiAgICBpZiAod2l0aEN1c3RvbVByb3BlcnRpZXMgJiYgY3VzdG9tUHJvcGVydGllcykge1xuICAgICAgICBpZiAodHlwZW9mIGN1c3RvbVByb3BlcnRpZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkYXRhc2V0LmN1c3RvbVByb3BlcnRpZXMgPSBjdXN0b21Qcm9wZXJ0aWVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjdXN0b21Qcm9wZXJ0aWVzID09PSAnb2JqZWN0JyAmJiAhaXNFbXB0eU9iamVjdChjdXN0b21Qcm9wZXJ0aWVzKSkge1xuICAgICAgICAgICAgZGF0YXNldC5jdXN0b21Qcm9wZXJ0aWVzID0gSlNPTi5zdHJpbmdpZnkoY3VzdG9tUHJvcGVydGllcyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xudmFyIGFkZEFyaWFMYWJlbCA9IGZ1bmN0aW9uIChkb2NSb290LCBpZCwgZWxlbWVudCkge1xuICAgIHZhciBsYWJlbCA9IGlkICYmIGRvY1Jvb3QucXVlcnlTZWxlY3RvcihcImxhYmVsW2Zvcj0nXCIuY29uY2F0KGlkLCBcIiddXCIpKTtcbiAgICB2YXIgdGV4dCA9IGxhYmVsICYmIGxhYmVsLmlubmVyVGV4dDtcbiAgICBpZiAodGV4dCkge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHRleHQpO1xuICAgIH1cbn07XG52YXIgdGVtcGxhdGVzID0ge1xuICAgIGNvbnRhaW5lck91dGVyOiBmdW5jdGlvbiAoX2EsIGRpciwgaXNTZWxlY3RFbGVtZW50LCBpc1NlbGVjdE9uZUVsZW1lbnQsIHNlYXJjaEVuYWJsZWQsIHBhc3NlZEVsZW1lbnRUeXBlLCBsYWJlbElkKSB7XG4gICAgICAgIHZhciBjb250YWluZXJPdXRlciA9IF9hLmNsYXNzTmFtZXMuY29udGFpbmVyT3V0ZXI7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChkaXYsIGNvbnRhaW5lck91dGVyKTtcbiAgICAgICAgZGl2LmRhdGFzZXQudHlwZSA9IHBhc3NlZEVsZW1lbnRUeXBlO1xuICAgICAgICBpZiAoZGlyKSB7XG4gICAgICAgICAgICBkaXYuZGlyID0gZGlyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1NlbGVjdE9uZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGRpdi50YWJJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgncm9sZScsIHNlYXJjaEVuYWJsZWQgPyAnY29tYm9ib3gnIDogJ2xpc3Rib3gnKTtcbiAgICAgICAgICAgIGlmIChzZWFyY2hFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1hdXRvY29tcGxldGUnLCAnbGlzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIWxhYmVsSWQpIHtcbiAgICAgICAgICAgICAgICBhZGRBcmlhTGFiZWwodGhpcy5fZG9jUm9vdCwgdGhpcy5wYXNzZWRFbGVtZW50LmVsZW1lbnQuaWQsIGRpdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWhhc3BvcHVwJywgJ3RydWUnKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFiZWxJZCkge1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5JywgbGFiZWxJZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICB9LFxuICAgIGNvbnRhaW5lcklubmVyOiBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lcklubmVyID0gX2EuY2xhc3NOYW1lcy5jb250YWluZXJJbm5lcjtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgY29udGFpbmVySW5uZXIpO1xuICAgICAgICByZXR1cm4gZGl2O1xuICAgIH0sXG4gICAgaXRlbUxpc3Q6IGZ1bmN0aW9uIChfYSwgaXNTZWxlY3RPbmVFbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWFyY2hFbmFibGVkID0gX2Euc2VhcmNoRW5hYmxlZCwgX2IgPSBfYS5jbGFzc05hbWVzLCBsaXN0ID0gX2IubGlzdCwgbGlzdFNpbmdsZSA9IF9iLmxpc3RTaW5nbGUsIGxpc3RJdGVtcyA9IF9iLmxpc3RJdGVtcztcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgbGlzdCk7XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZGl2LCBpc1NlbGVjdE9uZUVsZW1lbnQgPyBsaXN0U2luZ2xlIDogbGlzdEl0ZW1zKTtcbiAgICAgICAgaWYgKHRoaXMuX2lzU2VsZWN0RWxlbWVudCAmJiBzZWFyY2hFbmFibGVkKSB7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2xpc3Rib3gnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGl2O1xuICAgIH0sXG4gICAgcGxhY2Vob2xkZXI6IGZ1bmN0aW9uIChfYSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGFsbG93SFRNTCA9IF9hLmFsbG93SFRNTCwgcGxhY2Vob2xkZXIgPSBfYS5jbGFzc05hbWVzLnBsYWNlaG9sZGVyO1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZGl2LCBwbGFjZWhvbGRlcik7XG4gICAgICAgIHNldEVsZW1lbnRIdG1sKGRpdiwgYWxsb3dIVE1MLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfSxcbiAgICBpdGVtOiBmdW5jdGlvbiAoX2EsIGNob2ljZSwgcmVtb3ZlSXRlbUJ1dHRvbikge1xuICAgICAgICB2YXIgYWxsb3dIVE1MID0gX2EuYWxsb3dIVE1MLCByZW1vdmVJdGVtQnV0dG9uQWxpZ25MZWZ0ID0gX2EucmVtb3ZlSXRlbUJ1dHRvbkFsaWduTGVmdCwgcmVtb3ZlSXRlbUljb25UZXh0ID0gX2EucmVtb3ZlSXRlbUljb25UZXh0LCByZW1vdmVJdGVtTGFiZWxUZXh0ID0gX2EucmVtb3ZlSXRlbUxhYmVsVGV4dCwgX2IgPSBfYS5jbGFzc05hbWVzLCBpdGVtID0gX2IuaXRlbSwgYnV0dG9uID0gX2IuYnV0dG9uLCBoaWdobGlnaHRlZFN0YXRlID0gX2IuaGlnaGxpZ2h0ZWRTdGF0ZSwgaXRlbVNlbGVjdGFibGUgPSBfYi5pdGVtU2VsZWN0YWJsZSwgcGxhY2Vob2xkZXIgPSBfYi5wbGFjZWhvbGRlcjtcbiAgICAgICAgdmFyIHJhd1ZhbHVlID0gdW53cmFwU3RyaW5nRm9yUmF3KGNob2ljZS52YWx1ZSk7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChkaXYsIGl0ZW0pO1xuICAgICAgICBpZiAoY2hvaWNlLmxhYmVsQ2xhc3MpIHtcbiAgICAgICAgICAgIHZhciBzcGFuTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBzZXRFbGVtZW50SHRtbChzcGFuTGFiZWwsIGFsbG93SFRNTCwgY2hvaWNlLmxhYmVsKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoc3BhbkxhYmVsLCBjaG9pY2UubGFiZWxDbGFzcyk7XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoc3BhbkxhYmVsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldEVsZW1lbnRIdG1sKGRpdiwgYWxsb3dIVE1MLCBjaG9pY2UubGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIGRpdi5kYXRhc2V0Lml0ZW0gPSAnJztcbiAgICAgICAgZGl2LmRhdGFzZXQuaWQgPSBjaG9pY2UuaWQ7XG4gICAgICAgIGRpdi5kYXRhc2V0LnZhbHVlID0gcmF3VmFsdWU7XG4gICAgICAgIGFzc2lnbkN1c3RvbVByb3BlcnRpZXMoZGl2LCBjaG9pY2UsIHRydWUpO1xuICAgICAgICBpZiAoY2hvaWNlLmRpc2FibGVkIHx8IHRoaXMuY29udGFpbmVyT3V0ZXIuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lzU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdyb2xlJywgJ29wdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaG9pY2UucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZGl2LCBwbGFjZWhvbGRlcik7XG4gICAgICAgICAgICBkaXYuZGF0YXNldC5wbGFjZWhvbGRlciA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZGl2LCBjaG9pY2UuaGlnaGxpZ2h0ZWQgPyBoaWdobGlnaHRlZFN0YXRlIDogaXRlbVNlbGVjdGFibGUpO1xuICAgICAgICBpZiAocmVtb3ZlSXRlbUJ1dHRvbikge1xuICAgICAgICAgICAgaWYgKGNob2ljZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzZXNGcm9tRWxlbWVudChkaXYsIGl0ZW1TZWxlY3RhYmxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpdi5kYXRhc2V0LmRlbGV0YWJsZSA9ICcnO1xuICAgICAgICAgICAgdmFyIHJlbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgcmVtb3ZlQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQocmVtb3ZlQnV0dG9uLCBidXR0b24pO1xuICAgICAgICAgICAgc2V0RWxlbWVudEh0bWwocmVtb3ZlQnV0dG9uLCB0cnVlLCByZXNvbHZlTm90aWNlRnVuY3Rpb24ocmVtb3ZlSXRlbUljb25UZXh0LCBjaG9pY2UudmFsdWUpKTtcbiAgICAgICAgICAgIHZhciBSRU1PVkVfSVRFTV9MQUJFTCA9IHJlc29sdmVOb3RpY2VGdW5jdGlvbihyZW1vdmVJdGVtTGFiZWxUZXh0LCBjaG9pY2UudmFsdWUpO1xuICAgICAgICAgICAgaWYgKFJFTU9WRV9JVEVNX0xBQkVMKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIFJFTU9WRV9JVEVNX0xBQkVMKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlbW92ZUJ1dHRvbi5kYXRhc2V0LmJ1dHRvbiA9ICcnO1xuICAgICAgICAgICAgaWYgKHJlbW92ZUl0ZW1CdXR0b25BbGlnbkxlZnQpIHtcbiAgICAgICAgICAgICAgICBkaXYuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgcmVtb3ZlQnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChyZW1vdmVCdXR0b24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfSxcbiAgICBjaG9pY2VMaXN0OiBmdW5jdGlvbiAoX2EsIGlzU2VsZWN0T25lRWxlbWVudCkge1xuICAgICAgICB2YXIgbGlzdCA9IF9hLmNsYXNzTmFtZXMubGlzdDtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgbGlzdCk7XG4gICAgICAgIGlmICghaXNTZWxlY3RPbmVFbGVtZW50KSB7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdhcmlhLW11bHRpc2VsZWN0YWJsZScsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgncm9sZScsICdsaXN0Ym94Jyk7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfSxcbiAgICBjaG9pY2VHcm91cDogZnVuY3Rpb24gKF9hLCBfYikge1xuICAgICAgICB2YXIgYWxsb3dIVE1MID0gX2EuYWxsb3dIVE1MLCBfYyA9IF9hLmNsYXNzTmFtZXMsIGdyb3VwID0gX2MuZ3JvdXAsIGdyb3VwSGVhZGluZyA9IF9jLmdyb3VwSGVhZGluZywgaXRlbURpc2FibGVkID0gX2MuaXRlbURpc2FibGVkO1xuICAgICAgICB2YXIgaWQgPSBfYi5pZCwgbGFiZWwgPSBfYi5sYWJlbCwgZGlzYWJsZWQgPSBfYi5kaXNhYmxlZDtcbiAgICAgICAgdmFyIHJhd0xhYmVsID0gdW53cmFwU3RyaW5nRm9yUmF3KGxhYmVsKTtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgZ3JvdXApO1xuICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZGl2LCBpdGVtRGlzYWJsZWQpO1xuICAgICAgICB9XG4gICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnZ3JvdXAnKTtcbiAgICAgICAgZGl2LmRhdGFzZXQuZ3JvdXAgPSAnJztcbiAgICAgICAgZGl2LmRhdGFzZXQuaWQgPSBpZDtcbiAgICAgICAgZGl2LmRhdGFzZXQudmFsdWUgPSByYXdMYWJlbDtcbiAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGhlYWRpbmcsIGdyb3VwSGVhZGluZyk7XG4gICAgICAgIHNldEVsZW1lbnRIdG1sKGhlYWRpbmcsIGFsbG93SFRNTCwgbGFiZWwgfHwgJycpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfSxcbiAgICBjaG9pY2U6IGZ1bmN0aW9uIChfYSwgY2hvaWNlLCBzZWxlY3RUZXh0LCBncm91cE5hbWUpIHtcbiAgICAgICAgdmFyIGFsbG93SFRNTCA9IF9hLmFsbG93SFRNTCwgX2IgPSBfYS5jbGFzc05hbWVzLCBpdGVtID0gX2IuaXRlbSwgaXRlbUNob2ljZSA9IF9iLml0ZW1DaG9pY2UsIGl0ZW1TZWxlY3RhYmxlID0gX2IuaXRlbVNlbGVjdGFibGUsIHNlbGVjdGVkU3RhdGUgPSBfYi5zZWxlY3RlZFN0YXRlLCBpdGVtRGlzYWJsZWQgPSBfYi5pdGVtRGlzYWJsZWQsIGRlc2NyaXB0aW9uID0gX2IuZGVzY3JpcHRpb24sIHBsYWNlaG9sZGVyID0gX2IucGxhY2Vob2xkZXI7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgbGFiZWwgPSBjaG9pY2UubGFiZWw7XG4gICAgICAgIHZhciByYXdWYWx1ZSA9IHVud3JhcFN0cmluZ0ZvclJhdyhjaG9pY2UudmFsdWUpO1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5pZCA9IGNob2ljZS5lbGVtZW50SWQ7XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZGl2LCBpdGVtKTtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChkaXYsIGl0ZW1DaG9pY2UpO1xuICAgICAgICBpZiAoZ3JvdXBOYW1lICYmIHR5cGVvZiBsYWJlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGxhYmVsID0gZXNjYXBlRm9yVGVtcGxhdGUoYWxsb3dIVE1MLCBsYWJlbCk7XG4gICAgICAgICAgICBsYWJlbCArPSBcIiAoXCIuY29uY2F0KGdyb3VwTmFtZSwgXCIpXCIpO1xuICAgICAgICAgICAgbGFiZWwgPSB7IHRydXN0ZWQ6IGxhYmVsIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlc2NyaWJlZEJ5ID0gZGl2O1xuICAgICAgICBpZiAoY2hvaWNlLmxhYmVsQ2xhc3MpIHtcbiAgICAgICAgICAgIHZhciBzcGFuTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBzZXRFbGVtZW50SHRtbChzcGFuTGFiZWwsIGFsbG93SFRNTCwgbGFiZWwpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChzcGFuTGFiZWwsIGNob2ljZS5sYWJlbENsYXNzKTtcbiAgICAgICAgICAgIGRlc2NyaWJlZEJ5ID0gc3BhbkxhYmVsO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHNwYW5MYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRFbGVtZW50SHRtbChkaXYsIGFsbG93SFRNTCwgbGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaG9pY2UubGFiZWxEZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgdmFyIGRlc2NJZCA9IFwiXCIuY29uY2F0KGNob2ljZS5lbGVtZW50SWQsIFwiLWRlc2NyaXB0aW9uXCIpO1xuICAgICAgICAgICAgZGVzY3JpYmVkQnkuc2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5JywgZGVzY0lkKTtcbiAgICAgICAgICAgIHZhciBzcGFuRGVzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHNldEVsZW1lbnRIdG1sKHNwYW5EZXNjLCBhbGxvd0hUTUwsIGNob2ljZS5sYWJlbERlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIHNwYW5EZXNjLmlkID0gZGVzY0lkO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChzcGFuRGVzYywgZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHNwYW5EZXNjKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hvaWNlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgc2VsZWN0ZWRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNob2ljZS5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChkaXYsIHBsYWNlaG9sZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdyb2xlJywgY2hvaWNlLmdyb3VwID8gJ3RyZWVpdGVtJyA6ICdvcHRpb24nKTtcbiAgICAgICAgZGl2LmRhdGFzZXQuY2hvaWNlID0gJyc7XG4gICAgICAgIGRpdi5kYXRhc2V0LmlkID0gY2hvaWNlLmlkO1xuICAgICAgICBkaXYuZGF0YXNldC52YWx1ZSA9IHJhd1ZhbHVlO1xuICAgICAgICBpZiAoc2VsZWN0VGV4dCkge1xuICAgICAgICAgICAgZGl2LmRhdGFzZXQuc2VsZWN0VGV4dCA9IHNlbGVjdFRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNob2ljZS5ncm91cCkge1xuICAgICAgICAgICAgZGl2LmRhdGFzZXQuZ3JvdXBJZCA9IFwiXCIuY29uY2F0KGNob2ljZS5ncm91cC5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgYXNzaWduQ3VzdG9tUHJvcGVydGllcyhkaXYsIGNob2ljZSwgZmFsc2UpO1xuICAgICAgICBpZiAoY2hvaWNlLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgaXRlbURpc2FibGVkKTtcbiAgICAgICAgICAgIGRpdi5kYXRhc2V0LmNob2ljZURpc2FibGVkID0gJyc7XG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZGl2LCBpdGVtU2VsZWN0YWJsZSk7XG4gICAgICAgICAgICBkaXYuZGF0YXNldC5jaG9pY2VTZWxlY3RhYmxlID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICB9LFxuICAgIGlucHV0OiBmdW5jdGlvbiAoX2EsIHBsYWNlaG9sZGVyVmFsdWUpIHtcbiAgICAgICAgdmFyIF9iID0gX2EuY2xhc3NOYW1lcywgaW5wdXQgPSBfYi5pbnB1dCwgaW5wdXRDbG9uZWQgPSBfYi5pbnB1dENsb25lZCwgbGFiZWxJZCA9IF9hLmxhYmVsSWQ7XG4gICAgICAgIHZhciBpbnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnAudHlwZSA9ICdzZWFyY2gnO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGlucCwgaW5wdXQpO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGlucCwgaW5wdXRDbG9uZWQpO1xuICAgICAgICBpbnAuYXV0b2NvbXBsZXRlID0gJ29mZic7XG4gICAgICAgIGlucC5hdXRvY2FwaXRhbGl6ZSA9ICdvZmYnO1xuICAgICAgICBpbnAuc3BlbGxjaGVjayA9IGZhbHNlO1xuICAgICAgICBpbnAuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RleHRib3gnKTtcbiAgICAgICAgaW5wLnNldEF0dHJpYnV0ZSgnYXJpYS1hdXRvY29tcGxldGUnLCAnbGlzdCcpO1xuICAgICAgICBpZiAocGxhY2Vob2xkZXJWYWx1ZSkge1xuICAgICAgICAgICAgaW5wLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHBsYWNlaG9sZGVyVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFsYWJlbElkKSB7XG4gICAgICAgICAgICBhZGRBcmlhTGFiZWwodGhpcy5fZG9jUm9vdCwgdGhpcy5wYXNzZWRFbGVtZW50LmVsZW1lbnQuaWQsIGlucCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlucDtcbiAgICB9LFxuICAgIGRyb3Bkb3duOiBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIF9iID0gX2EuY2xhc3NOYW1lcywgbGlzdCA9IF9iLmxpc3QsIGxpc3REcm9wZG93biA9IF9iLmxpc3REcm9wZG93bjtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KGRpdiwgbGlzdCk7XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQoZGl2LCBsaXN0RHJvcGRvd24pO1xuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfSxcbiAgICBub3RpY2U6IGZ1bmN0aW9uIChfYSwgaW5uZXJIVE1MLCB0eXBlKSB7XG4gICAgICAgIHZhciBfYiA9IF9hLmNsYXNzTmFtZXMsIGl0ZW0gPSBfYi5pdGVtLCBpdGVtQ2hvaWNlID0gX2IuaXRlbUNob2ljZSwgYWRkQ2hvaWNlID0gX2IuYWRkQ2hvaWNlLCBub1Jlc3VsdHMgPSBfYi5ub1Jlc3VsdHMsIG5vQ2hvaWNlcyA9IF9iLm5vQ2hvaWNlcywgbm90aWNlSXRlbSA9IF9iLm5vdGljZTtcbiAgICAgICAgaWYgKHR5cGUgPT09IHZvaWQgMCkgeyB0eXBlID0gTm90aWNlVHlwZXMuZ2VuZXJpYzsgfVxuICAgICAgICB2YXIgbm90aWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNldEVsZW1lbnRIdG1sKG5vdGljZSwgdHJ1ZSwgaW5uZXJIVE1MKTtcbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChub3RpY2UsIGl0ZW0pO1xuICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KG5vdGljZSwgaXRlbUNob2ljZSk7XG4gICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQobm90aWNlLCBub3RpY2VJdGVtKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlZmF1bHQtY2FzZVxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgTm90aWNlVHlwZXMuYWRkQ2hvaWNlOlxuICAgICAgICAgICAgICAgIGFkZENsYXNzZXNUb0VsZW1lbnQobm90aWNlLCBhZGRDaG9pY2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOb3RpY2VUeXBlcy5ub1Jlc3VsdHM6XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChub3RpY2UsIG5vUmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5vdGljZVR5cGVzLm5vQ2hvaWNlczpcbiAgICAgICAgICAgICAgICBhZGRDbGFzc2VzVG9FbGVtZW50KG5vdGljZSwgbm9DaG9pY2VzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gTm90aWNlVHlwZXMuYWRkQ2hvaWNlKSB7XG4gICAgICAgICAgICBub3RpY2UuZGF0YXNldC5jaG9pY2VTZWxlY3RhYmxlID0gJyc7XG4gICAgICAgICAgICBub3RpY2UuZGF0YXNldC5jaG9pY2UgPSAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm90aWNlO1xuICAgIH0sXG4gICAgb3B0aW9uOiBmdW5jdGlvbiAoY2hvaWNlKSB7XG4gICAgICAgIC8vIEh0bWxPcHRpb25FbGVtZW50J3MgbGFiZWwgdmFsdWUgZG9lcyBub3Qgc3VwcG9ydCBIVE1MLCBzbyB0aGUgYXZvaWQgZG91YmxlIGVzY2FwaW5nIHVud3JhcCB0aGUgdW50cnVzdGVkIHN0cmluZy5cbiAgICAgICAgdmFyIGxhYmVsVmFsdWUgPSB1bndyYXBTdHJpbmdGb3JSYXcoY2hvaWNlLmxhYmVsKTtcbiAgICAgICAgdmFyIG9wdCA9IG5ldyBPcHRpb24obGFiZWxWYWx1ZSwgY2hvaWNlLnZhbHVlLCBmYWxzZSwgY2hvaWNlLnNlbGVjdGVkKTtcbiAgICAgICAgYXNzaWduQ3VzdG9tUHJvcGVydGllcyhvcHQsIGNob2ljZSwgdHJ1ZSk7XG4gICAgICAgIG9wdC5kaXNhYmxlZCA9IGNob2ljZS5kaXNhYmxlZDtcbiAgICAgICAgaWYgKGNob2ljZS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgb3B0LnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdDtcbiAgICB9LFxufTtcblxuLyoqIEBzZWUge0BsaW5rIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWFjZWEwNzVkMGFjNjk1NGYyNzVhNzAwMjM5MDYwNTBjfSAqL1xudmFyIElTX0lFMTEgPSAnLW1zLXNjcm9sbC1saW1pdCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmXG4gICAgJy1tcy1pbWUtYWxpZ24nIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcbnZhciBVU0VSX0RFRkFVTFRTID0ge307XG52YXIgcGFyc2VEYXRhU2V0SWQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudC5kYXRhc2V0LmlkID8gcGFyc2VJbnQoZWxlbWVudC5kYXRhc2V0LmlkLCAxMCkgOiB1bmRlZmluZWQ7XG59O1xudmFyIHNlbGVjdGFibGVDaG9pY2VJZGVudGlmaWVyID0gJ1tkYXRhLWNob2ljZS1zZWxlY3RhYmxlXSc7XG4vKipcbiAqIENob2ljZXNcbiAqIEBhdXRob3IgSm9zaCBKb2huc29uPGpvc2hAam9zaHVham9obnNvbi5jby51az5cbiAqL1xudmFyIENob2ljZXMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2hvaWNlcyhlbGVtZW50LCB1c2VyQ29uZmlnKSB7XG4gICAgICAgIGlmIChlbGVtZW50ID09PSB2b2lkIDApIHsgZWxlbWVudCA9ICdbZGF0YS1jaG9pY2VdJzsgfVxuICAgICAgICBpZiAodXNlckNvbmZpZyA9PT0gdm9pZCAwKSB7IHVzZXJDb25maWcgPSB7fTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmluaXRpYWxpc2VkT0sgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX2hhc05vbkNob2ljZVBsYWNlaG9sZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2xhc3RBZGRlZENob2ljZUlkID0gMDtcbiAgICAgICAgdGhpcy5fbGFzdEFkZGVkR3JvdXBJZCA9IDA7XG4gICAgICAgIHZhciBkZWZhdWx0cyA9IENob2ljZXMuZGVmYXVsdHM7XG4gICAgICAgIHRoaXMuY29uZmlnID0gX19hc3NpZ24oX19hc3NpZ24oX19hc3NpZ24oe30sIGRlZmF1bHRzLmFsbE9wdGlvbnMpLCBkZWZhdWx0cy5vcHRpb25zKSwgdXNlckNvbmZpZyk7XG4gICAgICAgIE9iamVjdHNJbkNvbmZpZy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbmZpZ1trZXldID0gX19hc3NpZ24oX19hc3NpZ24oX19hc3NpZ24oe30sIGRlZmF1bHRzLmFsbE9wdGlvbnNba2V5XSksIGRlZmF1bHRzLm9wdGlvbnNba2V5XSksIHVzZXJDb25maWdba2V5XSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICAgIGlmICghY29uZmlnLnNpbGVudCkge1xuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGVDb25maWcoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZG9jUm9vdCA9IGNvbmZpZy5zaGFkb3dSb290IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgdGhpcy5fZG9jUm9vdCA9IGRvY1Jvb3Q7XG4gICAgICAgIHZhciBwYXNzZWRFbGVtZW50ID0gdHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnID8gZG9jUm9vdC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpIDogZWxlbWVudDtcbiAgICAgICAgaWYgKCFwYXNzZWRFbGVtZW50IHx8XG4gICAgICAgICAgICB0eXBlb2YgcGFzc2VkRWxlbWVudCAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgICAgICEoaXNIdG1sSW5wdXRFbGVtZW50KHBhc3NlZEVsZW1lbnQpIHx8IGlzSHRtbFNlbGVjdEVsZW1lbnQocGFzc2VkRWxlbWVudCkpKSB7XG4gICAgICAgICAgICBpZiAoIXBhc3NlZEVsZW1lbnQgJiYgdHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiU2VsZWN0b3IgXCIuY29uY2F0KGVsZW1lbnQsIFwiIGZhaWxlZCB0byBmaW5kIGFuIGVsZW1lbnRcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiRXhwZWN0ZWQgb25lIG9mIHRoZSBmb2xsb3dpbmcgdHlwZXMgdGV4dHxzZWxlY3Qtb25lfHNlbGVjdC1tdWx0aXBsZVwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbWVudFR5cGUgPSBwYXNzZWRFbGVtZW50LnR5cGU7XG4gICAgICAgIHZhciBpc1RleHQgPSBlbGVtZW50VHlwZSA9PT0gUGFzc2VkRWxlbWVudFR5cGVzLlRleHQ7XG4gICAgICAgIGlmIChpc1RleHQgfHwgY29uZmlnLm1heEl0ZW1Db3VudCAhPT0gMSkge1xuICAgICAgICAgICAgY29uZmlnLnNpbmdsZU1vZGVGb3JNdWx0aVNlbGVjdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcuc2luZ2xlTW9kZUZvck11bHRpU2VsZWN0KSB7XG4gICAgICAgICAgICBlbGVtZW50VHlwZSA9IFBhc3NlZEVsZW1lbnRUeXBlcy5TZWxlY3RNdWx0aXBsZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXNTZWxlY3RPbmUgPSBlbGVtZW50VHlwZSA9PT0gUGFzc2VkRWxlbWVudFR5cGVzLlNlbGVjdE9uZTtcbiAgICAgICAgdmFyIGlzU2VsZWN0TXVsdGlwbGUgPSBlbGVtZW50VHlwZSA9PT0gUGFzc2VkRWxlbWVudFR5cGVzLlNlbGVjdE11bHRpcGxlO1xuICAgICAgICB2YXIgaXNTZWxlY3QgPSBpc1NlbGVjdE9uZSB8fCBpc1NlbGVjdE11bHRpcGxlO1xuICAgICAgICB0aGlzLl9lbGVtZW50VHlwZSA9IGVsZW1lbnRUeXBlO1xuICAgICAgICB0aGlzLl9pc1RleHRFbGVtZW50ID0gaXNUZXh0O1xuICAgICAgICB0aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQgPSBpc1NlbGVjdE9uZTtcbiAgICAgICAgdGhpcy5faXNTZWxlY3RNdWx0aXBsZUVsZW1lbnQgPSBpc1NlbGVjdE11bHRpcGxlO1xuICAgICAgICB0aGlzLl9pc1NlbGVjdEVsZW1lbnQgPSBpc1NlbGVjdE9uZSB8fCBpc1NlbGVjdE11bHRpcGxlO1xuICAgICAgICB0aGlzLl9jYW5BZGRVc2VyQ2hvaWNlcyA9IChpc1RleHQgJiYgY29uZmlnLmFkZEl0ZW1zKSB8fCAoaXNTZWxlY3QgJiYgY29uZmlnLmFkZENob2ljZXMpO1xuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5yZW5kZXJTZWxlY3RlZENob2ljZXMgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgY29uZmlnLnJlbmRlclNlbGVjdGVkQ2hvaWNlcyA9IGNvbmZpZy5yZW5kZXJTZWxlY3RlZENob2ljZXMgPT09ICdhbHdheXMnIHx8IGlzU2VsZWN0T25lO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcuY2xvc2VEcm9wZG93bk9uU2VsZWN0ID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgIGNvbmZpZy5jbG9zZURyb3Bkb3duT25TZWxlY3QgPSBpc1RleHQgfHwgaXNTZWxlY3RPbmUgfHwgY29uZmlnLnNpbmdsZU1vZGVGb3JNdWx0aVNlbGVjdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbmZpZy5jbG9zZURyb3Bkb3duT25TZWxlY3QgPSBjb2VyY2VCb29sKGNvbmZpZy5jbG9zZURyb3Bkb3duT25TZWxlY3QpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIGlmIChjb25maWcucGxhY2Vob2xkZXJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hhc05vbkNob2ljZVBsYWNlaG9sZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBhc3NlZEVsZW1lbnQuZGF0YXNldC5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hhc05vbkNob2ljZVBsYWNlaG9sZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25maWcucGxhY2Vob2xkZXJWYWx1ZSA9IHBhc3NlZEVsZW1lbnQuZGF0YXNldC5wbGFjZWhvbGRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodXNlckNvbmZpZy5hZGRJdGVtRmlsdGVyICYmIHR5cGVvZiB1c2VyQ29uZmlnLmFkZEl0ZW1GaWx0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciByZSA9IHVzZXJDb25maWcuYWRkSXRlbUZpbHRlciBpbnN0YW5jZW9mIFJlZ0V4cCA/IHVzZXJDb25maWcuYWRkSXRlbUZpbHRlciA6IG5ldyBSZWdFeHAodXNlckNvbmZpZy5hZGRJdGVtRmlsdGVyKTtcbiAgICAgICAgICAgIGNvbmZpZy5hZGRJdGVtRmlsdGVyID0gcmUudGVzdC5iaW5kKHJlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faXNUZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5wYXNzZWRFbGVtZW50ID0gbmV3IFdyYXBwZWRJbnB1dCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogcGFzc2VkRWxlbWVudCxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWVzOiBjb25maWcuY2xhc3NOYW1lcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHNlbGVjdEVsID0gcGFzc2VkRWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMucGFzc2VkRWxlbWVudCA9IG5ldyBXcmFwcGVkU2VsZWN0KHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBzZWxlY3RFbCxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWVzOiBjb25maWcuY2xhc3NOYW1lcyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIF90aGlzLl90ZW1wbGF0ZXMub3B0aW9uKGRhdGEpOyB9LFxuICAgICAgICAgICAgICAgIGV4dHJhY3RQbGFjZWhvbGRlcjogY29uZmlnLnBsYWNlaG9sZGVyICYmICF0aGlzLl9oYXNOb25DaG9pY2VQbGFjZWhvbGRlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbGlzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3RvcmUgPSBuZXcgU3RvcmUoY29uZmlnKTtcbiAgICAgICAgdGhpcy5fY3VycmVudFZhbHVlID0gJyc7XG4gICAgICAgIGNvbmZpZy5zZWFyY2hFbmFibGVkID0gKCFpc1RleHQgJiYgY29uZmlnLnNlYXJjaEVuYWJsZWQpIHx8IGlzU2VsZWN0TXVsdGlwbGU7XG4gICAgICAgIHRoaXMuX2NhblNlYXJjaCA9IGNvbmZpZy5zZWFyY2hFbmFibGVkO1xuICAgICAgICB0aGlzLl9pc1Njcm9sbGluZ09uSWUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faGlnaGxpZ2h0UG9zaXRpb24gPSAwO1xuICAgICAgICB0aGlzLl93YXNUYXAgPSB0cnVlO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclZhbHVlID0gdGhpcy5fZ2VuZXJhdGVQbGFjZWhvbGRlclZhbHVlKCk7XG4gICAgICAgIHRoaXMuX2Jhc2VJZCA9IGdlbmVyYXRlSWQocGFzc2VkRWxlbWVudCwgJ2Nob2ljZXMtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzZXR0aW5nIGRpcmVjdGlvbiBpbiBjYXNlcyB3aGVyZSBpdCdzIGV4cGxpY2l0bHkgc2V0IG9uIHBhc3NlZEVsZW1lbnRcbiAgICAgICAgICogb3Igd2hlbiBjYWxjdWxhdGVkIGRpcmVjdGlvbiBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgZG9jdW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IHBhc3NlZEVsZW1lbnQuZGlyO1xuICAgICAgICBpZiAoIXRoaXMuX2RpcmVjdGlvbikge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnREaXJlY3Rpb24gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShwYXNzZWRFbGVtZW50KS5kaXJlY3Rpb247XG4gICAgICAgICAgICB2YXIgZG9jdW1lbnREaXJlY3Rpb24gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmRpcmVjdGlvbjtcbiAgICAgICAgICAgIGlmIChlbGVtZW50RGlyZWN0aW9uICE9PSBkb2N1bWVudERpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGVsZW1lbnREaXJlY3Rpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faWROYW1lcyA9IHtcbiAgICAgICAgICAgIGl0ZW1DaG9pY2U6ICdpdGVtLWNob2ljZScsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlcyA9IGRlZmF1bHRzLnRlbXBsYXRlcztcbiAgICAgICAgdGhpcy5fcmVuZGVyID0gdGhpcy5fcmVuZGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX29uRm9jdXMgPSB0aGlzLl9vbkZvY3VzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX29uQmx1ciA9IHRoaXMuX29uQmx1ci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vbktleVVwID0gdGhpcy5fb25LZXlVcC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vbktleURvd24gPSB0aGlzLl9vbktleURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25JbnB1dCA9IHRoaXMuX29uSW5wdXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25DbGljayA9IHRoaXMuX29uQ2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25Ub3VjaE1vdmUgPSB0aGlzLl9vblRvdWNoTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vblRvdWNoRW5kID0gdGhpcy5fb25Ub3VjaEVuZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vbk1vdXNlRG93biA9IHRoaXMuX29uTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX29uTW91c2VPdmVyID0gdGhpcy5fb25Nb3VzZU92ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25Gb3JtUmVzZXQgPSB0aGlzLl9vbkZvcm1SZXNldC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vblNlbGVjdEtleSA9IHRoaXMuX29uU2VsZWN0S2V5LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX29uRW50ZXJLZXkgPSB0aGlzLl9vbkVudGVyS2V5LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX29uRXNjYXBlS2V5ID0gdGhpcy5fb25Fc2NhcGVLZXkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25EaXJlY3Rpb25LZXkgPSB0aGlzLl9vbkRpcmVjdGlvbktleS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vbkRlbGV0ZUtleSA9IHRoaXMuX29uRGVsZXRlS2V5LmJpbmQodGhpcyk7XG4gICAgICAgIC8vIElmIGVsZW1lbnQgaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXNlZCB3aXRoIENob2ljZXMsIGZhaWwgc2lsZW50bHlcbiAgICAgICAgaWYgKHRoaXMucGFzc2VkRWxlbWVudC5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKCFjb25maWcuc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdUcnlpbmcgdG8gaW5pdGlhbGlzZSBDaG9pY2VzIG9uIGVsZW1lbnQgYWxyZWFkeSBpbml0aWFsaXNlZCcsIHsgZWxlbWVudDogZWxlbWVudCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGlzZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXNlZE9LID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gTGV0J3MgZ29cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIC8vIHByZXNlcnZlIHRoZSBzZWxlY3RlZCBpdGVtIGxpc3QgYWZ0ZXIgc2V0dXAgZm9yIGZvcm0gcmVzZXRcbiAgICAgICAgdGhpcy5faW5pdGlhbEl0ZW1zID0gdGhpcy5fc3RvcmUuaXRlbXMubWFwKGZ1bmN0aW9uIChjaG9pY2UpIHsgcmV0dXJuIGNob2ljZS52YWx1ZTsgfSk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDaG9pY2VzLCBcImRlZmF1bHRzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHtcbiAgICAgICAgICAgICAgICBnZXQgb3B0aW9ucygpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFVTRVJfREVGQVVMVFM7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBnZXQgYWxsT3B0aW9ucygpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERFRkFVTFRfQ09ORklHO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZ2V0IHRlbXBsYXRlcygpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlcztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXNlZCB8fCB0aGlzLmluaXRpYWxpc2VkT0sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlYXJjaGVyID0gZ2V0U2VhcmNoZXIodGhpcy5jb25maWcpO1xuICAgICAgICB0aGlzLl9sb2FkQ2hvaWNlcygpO1xuICAgICAgICB0aGlzLl9jcmVhdGVUZW1wbGF0ZXMoKTtcbiAgICAgICAgdGhpcy5fY3JlYXRlRWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5fY3JlYXRlU3RydWN0dXJlKCk7XG4gICAgICAgIGlmICgodGhpcy5faXNUZXh0RWxlbWVudCAmJiAhdGhpcy5jb25maWcuYWRkSXRlbXMpIHx8XG4gICAgICAgICAgICB0aGlzLnBhc3NlZEVsZW1lbnQuZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgfHxcbiAgICAgICAgICAgICEhdGhpcy5wYXNzZWRFbGVtZW50LmVsZW1lbnQuY2xvc2VzdCgnZmllbGRzZXQ6ZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzaG91bGQgYmUgdHJpZ2dlcmVkICoqYWZ0ZXIqKiBkaXNhYmxlZCBzdGF0ZSB0byBhdm9pZCBhZGRpdGlvbmFsIHJlLWRyYXdzXG4gICAgICAgIHRoaXMuX2luaXRTdG9yZSgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXNlZE9LID0gdHJ1ZTtcbiAgICAgICAgdmFyIGNhbGxiYWNrT25Jbml0ID0gdGhpcy5jb25maWcuY2FsbGJhY2tPbkluaXQ7XG4gICAgICAgIC8vIFJ1biBjYWxsYmFjayBpZiBpdCBpcyBhIGZ1bmN0aW9uXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tPbkluaXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrT25Jbml0LmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXNlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMucGFzc2VkRWxlbWVudC5yZXZlYWwoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJPdXRlci51bndyYXAodGhpcy5wYXNzZWRFbGVtZW50LmVsZW1lbnQpO1xuICAgICAgICB0aGlzLl9zdG9yZS5fbGlzdGVuZXJzID0gW107IC8vIHByZXZlbnRzIHNlbGVjdC9pbnB1dCB2YWx1ZSBiZWluZyB3aXBlZFxuICAgICAgICB0aGlzLmNsZWFyU3RvcmUoZmFsc2UpO1xuICAgICAgICB0aGlzLl9zdG9wU2VhcmNoKCk7XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlcyA9IENob2ljZXMuZGVmYXVsdHMudGVtcGxhdGVzO1xuICAgICAgICB0aGlzLmluaXRpYWxpc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5pdGlhbGlzZWRPSyA9IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucGFzc2VkRWxlbWVudC5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnBhc3NlZEVsZW1lbnQuZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyT3V0ZXIuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuZW5hYmxlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lck91dGVyLmVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhc3NlZEVsZW1lbnQuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5wYXNzZWRFbGVtZW50LmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuY29udGFpbmVyT3V0ZXIuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuZGlzYWJsZSgpO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXJPdXRlci5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5oaWdobGlnaHRJdGVtID0gZnVuY3Rpb24gKGl0ZW0sIHJ1bkV2ZW50KSB7XG4gICAgICAgIGlmIChydW5FdmVudCA9PT0gdm9pZCAwKSB7IHJ1bkV2ZW50ID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjaG9pY2UgPSB0aGlzLl9zdG9yZS5pdGVtcy5maW5kKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLmlkID09PSBpdGVtLmlkOyB9KTtcbiAgICAgICAgaWYgKCFjaG9pY2UgfHwgY2hvaWNlLmhpZ2hsaWdodGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChoaWdobGlnaHRJdGVtKGNob2ljZSwgdHJ1ZSkpO1xuICAgICAgICBpZiAocnVuRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc2VkRWxlbWVudC50cmlnZ2VyRXZlbnQoRXZlbnRUeXBlLmhpZ2hsaWdodEl0ZW0sIHRoaXMuX2dldENob2ljZUZvck91dHB1dChjaG9pY2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLnVuaGlnaGxpZ2h0SXRlbSA9IGZ1bmN0aW9uIChpdGVtLCBydW5FdmVudCkge1xuICAgICAgICBpZiAocnVuRXZlbnQgPT09IHZvaWQgMCkgeyBydW5FdmVudCA9IHRydWU7IH1cbiAgICAgICAgaWYgKCFpdGVtIHx8ICFpdGVtLmlkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hvaWNlID0gdGhpcy5fc3RvcmUuaXRlbXMuZmluZChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5pZCA9PT0gaXRlbS5pZDsgfSk7XG4gICAgICAgIGlmICghY2hvaWNlIHx8ICFjaG9pY2UuaGlnaGxpZ2h0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKGhpZ2hsaWdodEl0ZW0oY2hvaWNlLCBmYWxzZSkpO1xuICAgICAgICBpZiAocnVuRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc2VkRWxlbWVudC50cmlnZ2VyRXZlbnQoRXZlbnRUeXBlLnVuaGlnaGxpZ2h0SXRlbSwgdGhpcy5fZ2V0Q2hvaWNlRm9yT3V0cHV0KGNob2ljZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuaGlnaGxpZ2h0QWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9zdG9yZS53aXRoVHhuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9zdG9yZS5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLmhpZ2hsaWdodGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9zdG9yZS5kaXNwYXRjaChoaWdobGlnaHRJdGVtKGl0ZW0sIHRydWUpKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucGFzc2VkRWxlbWVudC50cmlnZ2VyRXZlbnQoRXZlbnRUeXBlLmhpZ2hsaWdodEl0ZW0sIF90aGlzLl9nZXRDaG9pY2VGb3JPdXRwdXQoaXRlbSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS51bmhpZ2hsaWdodEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fc3RvcmUud2l0aFR4bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fc3RvcmUuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmhpZ2hsaWdodGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9zdG9yZS5kaXNwYXRjaChoaWdobGlnaHRJdGVtKGl0ZW0sIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnBhc3NlZEVsZW1lbnQudHJpZ2dlckV2ZW50KEV2ZW50VHlwZS5oaWdobGlnaHRJdGVtLCBfdGhpcy5fZ2V0Q2hvaWNlRm9yT3V0cHV0KGl0ZW0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUucmVtb3ZlQWN0aXZlSXRlbXNCeVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3N0b3JlLndpdGhUeG4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX3N0b3JlLml0ZW1zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbS52YWx1ZSA9PT0gdmFsdWU7IH0pLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIF90aGlzLl9yZW1vdmVJdGVtKGl0ZW0pOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUucmVtb3ZlQWN0aXZlSXRlbXMgPSBmdW5jdGlvbiAoZXhjbHVkZWRJZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9zdG9yZS53aXRoVHhuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9zdG9yZS5pdGVtcy5maWx0ZXIoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0gX2EuaWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkICE9PSBleGNsdWRlZElkO1xuICAgICAgICAgICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gX3RoaXMuX3JlbW92ZUl0ZW0oaXRlbSk7IH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5yZW1vdmVIaWdobGlnaHRlZEl0ZW1zID0gZnVuY3Rpb24gKHJ1bkV2ZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChydW5FdmVudCA9PT0gdm9pZCAwKSB7IHJ1bkV2ZW50ID0gZmFsc2U7IH1cbiAgICAgICAgdGhpcy5fc3RvcmUud2l0aFR4bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fc3RvcmUuaGlnaGxpZ2h0ZWRBY3RpdmVJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3JlbW92ZUl0ZW0oaXRlbSk7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBhY3Rpb24gd2FzIHBlcmZvcm1lZCBieSB0aGUgdXNlclxuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgdGhlIGV2ZW50XG4gICAgICAgICAgICAgICAgaWYgKHJ1bkV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyQ2hhbmdlKGl0ZW0udmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5zaG93RHJvcGRvd24gPSBmdW5jdGlvbiAocHJldmVudElucHV0Rm9jdXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuZHJvcGRvd24uaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2ZW50SW5wdXRGb2N1cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgIHByZXZlbnRJbnB1dEZvY3VzID0gIXRoaXMuX2NhblNlYXJjaDtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuZHJvcGRvd24uc2hvdygpO1xuICAgICAgICAgICAgdmFyIHJlY3QgPSBfdGhpcy5kcm9wZG93bi5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgX3RoaXMuY29udGFpbmVyT3V0ZXIub3BlbihyZWN0LmJvdHRvbSwgcmVjdC5oZWlnaHQpO1xuICAgICAgICAgICAgaWYgKCFwcmV2ZW50SW5wdXRGb2N1cykge1xuICAgICAgICAgICAgICAgIF90aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5wYXNzZWRFbGVtZW50LnRyaWdnZXJFdmVudChFdmVudFR5cGUuc2hvd0Ryb3Bkb3duKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuaGlkZURyb3Bkb3duID0gZnVuY3Rpb24gKHByZXZlbnRJbnB1dEJsdXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuZHJvcGRvd24uaGlkZSgpO1xuICAgICAgICAgICAgX3RoaXMuY29udGFpbmVyT3V0ZXIuY2xvc2UoKTtcbiAgICAgICAgICAgIGlmICghcHJldmVudElucHV0Qmx1ciAmJiBfdGhpcy5fY2FuU2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5wdXQucmVtb3ZlQWN0aXZlRGVzY2VuZGFudCgpO1xuICAgICAgICAgICAgICAgIF90aGlzLmlucHV0LmJsdXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLnBhc3NlZEVsZW1lbnQudHJpZ2dlckV2ZW50KEV2ZW50VHlwZS5oaWRlRHJvcGRvd24pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZU9ubHkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHZhbHVlcyA9IHRoaXMuX3N0b3JlLml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZU9ubHkgPyBpdGVtLnZhbHVlIDogX3RoaXMuX2dldENob2ljZUZvck91dHB1dChpdGVtKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5faXNTZWxlY3RPbmVFbGVtZW50IHx8IHRoaXMuY29uZmlnLnNpbmdsZU1vZGVGb3JNdWx0aVNlbGVjdCA/IHZhbHVlc1swXSA6IHZhbHVlcztcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXNlZE9LKSB7XG4gICAgICAgICAgICB0aGlzLl93YXJuQ2hvaWNlc0luaXRGYWlsZWQoJ3NldFZhbHVlJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdG9yZS53aXRoVHhuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9hZGRDaG9pY2UobWFwSW5wdXRUb0Nob2ljZSh2YWx1ZSwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEB0b2RvIGludGVncmF0ZSB3aXRoIFN0b3JlXG4gICAgICAgIHRoaXMuX3NlYXJjaGVyLnJlc2V0KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuc2V0Q2hvaWNlQnlWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGlzZWRPSykge1xuICAgICAgICAgICAgdGhpcy5fd2FybkNob2ljZXNJbml0RmFpbGVkKCdzZXRDaG9pY2VCeVZhbHVlJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faXNUZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcmUud2l0aFR4bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBJZiBvbmx5IG9uZSB2YWx1ZSBoYXMgYmVlbiBwYXNzZWQsIGNvbnZlcnQgdG8gYXJyYXlcbiAgICAgICAgICAgIHZhciBjaG9pY2VWYWx1ZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGVhY2ggdmFsdWUgYW5kXG4gICAgICAgICAgICBjaG9pY2VWYWx1ZS5mb3JFYWNoKGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIF90aGlzLl9maW5kQW5kU2VsZWN0Q2hvaWNlQnlWYWx1ZSh2YWwpOyB9KTtcbiAgICAgICAgICAgIF90aGlzLnVuaGlnaGxpZ2h0QWxsKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBAdG9kbyBpbnRlZ3JhdGUgd2l0aCBTdG9yZVxuICAgICAgICB0aGlzLl9zZWFyY2hlci5yZXNldCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCBjaG9pY2VzIG9mIHNlbGVjdCBpbnB1dCB2aWEgYW4gYXJyYXkgb2Ygb2JqZWN0cyAob3IgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFycmF5IG9mIG9iamVjdCBvciBwcm9taXNlIG9mIGl0KSxcbiAgICAgKiBhIHZhbHVlIGZpZWxkIG5hbWUgYW5kIGEgbGFiZWwgZmllbGQgbmFtZS5cbiAgICAgKiBUaGlzIGJlaGF2ZXMgdGhlIHNhbWUgYXMgcGFzc2luZyBpdGVtcyB2aWEgdGhlIGNob2ljZXMgb3B0aW9uIGJ1dCBjYW4gYmUgY2FsbGVkIGFmdGVyIGluaXRpYWxpc2luZyBDaG9pY2VzLlxuICAgICAqIFRoaXMgY2FuIGFsc28gYmUgdXNlZCB0byBhZGQgZ3JvdXBzIG9mIGNob2ljZXMgKHNlZSBleGFtcGxlIDIpOyBPcHRpb25hbGx5IHBhc3MgYSB0cnVlIGByZXBsYWNlQ2hvaWNlc2AgdmFsdWUgdG8gcmVtb3ZlIGFueSBleGlzdGluZyBjaG9pY2VzLlxuICAgICAqIE9wdGlvbmFsbHkgcGFzcyBhIGBjdXN0b21Qcm9wZXJ0aWVzYCBvYmplY3QgdG8gYWRkIGFkZGl0aW9uYWwgZGF0YSB0byB5b3VyIGNob2ljZXMgKHVzZWZ1bCB3aGVuIHNlYXJjaGluZy9maWx0ZXJpbmcgZXRjKS5cbiAgICAgKlxuICAgICAqICoqSW5wdXQgdHlwZXMgYWZmZWN0ZWQ6Kiogc2VsZWN0LW9uZSwgc2VsZWN0LW11bHRpcGxlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYGpzXG4gICAgICogY29uc3QgZXhhbXBsZSA9IG5ldyBDaG9pY2VzKGVsZW1lbnQpO1xuICAgICAqXG4gICAgICogZXhhbXBsZS5zZXRDaG9pY2VzKFtcbiAgICAgKiAgIHt2YWx1ZTogJ09uZScsIGxhYmVsOiAnTGFiZWwgT25lJywgZGlzYWJsZWQ6IHRydWV9LFxuICAgICAqICAge3ZhbHVlOiAnVHdvJywgbGFiZWw6ICdMYWJlbCBUd28nLCBzZWxlY3RlZDogdHJ1ZX0sXG4gICAgICogICB7dmFsdWU6ICdUaHJlZScsIGxhYmVsOiAnTGFiZWwgVGhyZWUnfSxcbiAgICAgKiBdLCAndmFsdWUnLCAnbGFiZWwnLCBmYWxzZSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYGpzXG4gICAgICogY29uc3QgZXhhbXBsZSA9IG5ldyBDaG9pY2VzKGVsZW1lbnQpO1xuICAgICAqXG4gICAgICogZXhhbXBsZS5zZXRDaG9pY2VzKGFzeW5jICgpID0+IHtcbiAgICAgKiAgIHRyeSB7XG4gICAgICogICAgICBjb25zdCBpdGVtcyA9IGF3YWl0IGZldGNoKCcvaXRlbXMnKTtcbiAgICAgKiAgICAgIHJldHVybiBpdGVtcy5qc29uKClcbiAgICAgKiAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICogICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgKiAgIH1cbiAgICAgKiB9KTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBganNcbiAgICAgKiBjb25zdCBleGFtcGxlID0gbmV3IENob2ljZXMoZWxlbWVudCk7XG4gICAgICpcbiAgICAgKiBleGFtcGxlLnNldENob2ljZXMoW3tcbiAgICAgKiAgIGxhYmVsOiAnR3JvdXAgb25lJyxcbiAgICAgKiAgIGlkOiAxLFxuICAgICAqICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAqICAgY2hvaWNlczogW1xuICAgICAqICAgICB7dmFsdWU6ICdDaGlsZCBPbmUnLCBsYWJlbDogJ0NoaWxkIE9uZScsIHNlbGVjdGVkOiB0cnVlfSxcbiAgICAgKiAgICAge3ZhbHVlOiAnQ2hpbGQgVHdvJywgbGFiZWw6ICdDaGlsZCBUd28nLCAgZGlzYWJsZWQ6IHRydWV9LFxuICAgICAqICAgICB7dmFsdWU6ICdDaGlsZCBUaHJlZScsIGxhYmVsOiAnQ2hpbGQgVGhyZWUnfSxcbiAgICAgKiAgIF1cbiAgICAgKiB9LFxuICAgICAqIHtcbiAgICAgKiAgIGxhYmVsOiAnR3JvdXAgdHdvJyxcbiAgICAgKiAgIGlkOiAyLFxuICAgICAqICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAqICAgY2hvaWNlczogW1xuICAgICAqICAgICB7dmFsdWU6ICdDaGlsZCBGb3VyJywgbGFiZWw6ICdDaGlsZCBGb3VyJywgZGlzYWJsZWQ6IHRydWV9LFxuICAgICAqICAgICB7dmFsdWU6ICdDaGlsZCBGaXZlJywgbGFiZWw6ICdDaGlsZCBGaXZlJ30sXG4gICAgICogICAgIHt2YWx1ZTogJ0NoaWxkIFNpeCcsIGxhYmVsOiAnQ2hpbGQgU2l4JywgY3VzdG9tUHJvcGVydGllczoge1xuICAgICAqICAgICAgIGRlc2NyaXB0aW9uOiAnQ3VzdG9tIGRlc2NyaXB0aW9uIGFib3V0IGNoaWxkIHNpeCcsXG4gICAgICogICAgICAgcmFuZG9tOiAnQW5vdGhlciByYW5kb20gY3VzdG9tIHByb3BlcnR5J1xuICAgICAqICAgICB9fSxcbiAgICAgKiAgIF1cbiAgICAgKiB9XSwgJ3ZhbHVlJywgJ2xhYmVsJywgZmFsc2UpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIENob2ljZXMucHJvdG90eXBlLnNldENob2ljZXMgPSBmdW5jdGlvbiAoY2hvaWNlc0FycmF5T3JGZXRjaGVyLCB2YWx1ZSwgbGFiZWwsIHJlcGxhY2VDaG9pY2VzLCBjbGVhclNlYXJjaEZsYWcpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGNob2ljZXNBcnJheU9yRmV0Y2hlciA9PT0gdm9pZCAwKSB7IGNob2ljZXNBcnJheU9yRmV0Y2hlciA9IFtdOyB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7IHZhbHVlID0gJ3ZhbHVlJzsgfVxuICAgICAgICBpZiAobGFiZWwgPT09IHZvaWQgMCkgeyBsYWJlbCA9ICdsYWJlbCc7IH1cbiAgICAgICAgaWYgKHJlcGxhY2VDaG9pY2VzID09PSB2b2lkIDApIHsgcmVwbGFjZUNob2ljZXMgPSBmYWxzZTsgfVxuICAgICAgICBpZiAoY2xlYXJTZWFyY2hGbGFnID09PSB2b2lkIDApIHsgY2xlYXJTZWFyY2hGbGFnID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGlzZWRPSykge1xuICAgICAgICAgICAgdGhpcy5fd2FybkNob2ljZXNJbml0RmFpbGVkKCdzZXRDaG9pY2VzJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2lzU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInNldENob2ljZXMgY2FuJ3QgYmUgdXNlZCB3aXRoIElOUFVUIGJhc2VkIENob2ljZXNcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHwgIXZhbHVlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidmFsdWUgcGFyYW1ldGVyIG11c3QgYmUgYSBuYW1lIG9mICd2YWx1ZScgZmllbGQgaW4gcGFzc2VkIG9iamVjdHNcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2xlYXIgY2hvaWNlcyBpZiBuZWVkZWRcbiAgICAgICAgaWYgKHJlcGxhY2VDaG9pY2VzKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyQ2hvaWNlcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY2hvaWNlc0FycmF5T3JGZXRjaGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBpdCdzIGEgY2hvaWNlcyBmZXRjaGVyIGZ1bmN0aW9uXG4gICAgICAgICAgICB2YXIgZmV0Y2hlcl8xID0gY2hvaWNlc0FycmF5T3JGZXRjaGVyKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBQcm9taXNlID09PSAnZnVuY3Rpb24nICYmIGZldGNoZXJfMSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGF0J3MgYSBwcm9taXNlXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb21pc2UtZXhlY3V0b3ItcmV0dXJuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVzb2x2ZSk7IH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9oYW5kbGVMb2FkaW5nU3RhdGUodHJ1ZSk7IH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZldGNoZXJfMTsgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIF90aGlzLnNldENob2ljZXMoZGF0YSwgdmFsdWUsIGxhYmVsLCByZXBsYWNlQ2hvaWNlcyk7IH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuY29uZmlnLnNpbGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX2hhbmRsZUxvYWRpbmdTdGF0ZShmYWxzZSk7IH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZ1bmN0aW9uIHJldHVybmVkIHNvbWV0aGluZyBlbHNlIHRoYW4gcHJvbWlzZSwgbGV0J3MgY2hlY2sgaWYgaXQncyBhbiBhcnJheSBvZiBjaG9pY2VzXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZmV0Y2hlcl8xKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCIuc2V0Q2hvaWNlcyBmaXJzdCBhcmd1bWVudCBmdW5jdGlvbiBtdXN0IHJldHVybiBlaXRoZXIgYXJyYXkgb2YgY2hvaWNlcyBvciBQcm9taXNlLCBnb3Q6IFwiLmNvbmNhdCh0eXBlb2YgZmV0Y2hlcl8xKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyByZWN1cnNpb24gd2l0aCByZXN1bHRzLCBpdCdzIHN5bmMgYW5kIGNob2ljZXMgd2VyZSBjbGVhcmVkIGFscmVhZHlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldENob2ljZXMoZmV0Y2hlcl8xLCB2YWx1ZSwgbGFiZWwsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2hvaWNlc0FycmF5T3JGZXRjaGVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIi5zZXRDaG9pY2VzIG11c3QgYmUgY2FsbGVkIGVpdGhlciB3aXRoIGFycmF5IG9mIGNob2ljZXMgd2l0aCBhIGZ1bmN0aW9uIHJlc3VsdGluZyBpbnRvIFByb21pc2Ugb2YgYXJyYXkgb2YgY2hvaWNlc1wiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRhaW5lck91dGVyLnJlbW92ZUxvYWRpbmdTdGF0ZSgpO1xuICAgICAgICB0aGlzLl9zdG9yZS53aXRoVHhuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChjbGVhclNlYXJjaEZsYWcpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5faXNTZWFyY2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpc0RlZmF1bHRWYWx1ZSA9IHZhbHVlID09PSAndmFsdWUnO1xuICAgICAgICAgICAgdmFyIGlzRGVmYXVsdExhYmVsID0gbGFiZWwgPT09ICdsYWJlbCc7XG4gICAgICAgICAgICBjaG9pY2VzQXJyYXlPckZldGNoZXIuZm9yRWFjaChmdW5jdGlvbiAoZ3JvdXBPckNob2ljZSkge1xuICAgICAgICAgICAgICAgIGlmICgnY2hvaWNlcycgaW4gZ3JvdXBPckNob2ljZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSBncm91cE9yQ2hvaWNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRGVmYXVsdExhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBncm91cCksIHsgbGFiZWw6IGdyb3VwW2xhYmVsXSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fYWRkR3JvdXAobWFwSW5wdXRUb0Nob2ljZShncm91cCwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNob2ljZSA9IGdyb3VwT3JDaG9pY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNEZWZhdWx0TGFiZWwgfHwgIWlzRGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaG9pY2UgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgY2hvaWNlKSwgeyB2YWx1ZTogY2hvaWNlW3ZhbHVlXSwgbGFiZWw6IGNob2ljZVtsYWJlbF0gfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2FkZENob2ljZShtYXBJbnB1dFRvQ2hvaWNlKGNob2ljZSwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLnVuaGlnaGxpZ2h0QWxsKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBAdG9kbyBpbnRlZ3JhdGUgd2l0aCBTdG9yZVxuICAgICAgICB0aGlzLl9zZWFyY2hlci5yZXNldCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbiAod2l0aEV2ZW50cywgc2VsZWN0Rmlyc3RPcHRpb24sIGRlc2VsZWN0QWxsKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh3aXRoRXZlbnRzID09PSB2b2lkIDApIHsgd2l0aEV2ZW50cyA9IGZhbHNlOyB9XG4gICAgICAgIGlmIChzZWxlY3RGaXJzdE9wdGlvbiA9PT0gdm9pZCAwKSB7IHNlbGVjdEZpcnN0T3B0aW9uID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKGRlc2VsZWN0QWxsID09PSB2b2lkIDApIHsgZGVzZWxlY3RBbGwgPSBmYWxzZTsgfVxuICAgICAgICBpZiAoIXRoaXMuX2lzU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5zaWxlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ3JlZnJlc2ggbWV0aG9kIGNhbiBvbmx5IGJlIHVzZWQgb24gY2hvaWNlcyBiYWNrZWQgYnkgYSA8c2VsZWN0PiBlbGVtZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdG9yZS53aXRoVHhuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjaG9pY2VzRnJvbU9wdGlvbnMgPSBfdGhpcy5wYXNzZWRFbGVtZW50Lm9wdGlvbnNBc0Nob2ljZXMoKTtcbiAgICAgICAgICAgIC8vIEJ1aWxkIHRoZSBsaXN0IG9mIGl0ZW1zIHdoaWNoIHJlcXVpcmUgcHJlc2VydmluZ1xuICAgICAgICAgICAgdmFyIGV4aXN0aW5nSXRlbXMgPSB7fTtcbiAgICAgICAgICAgIGlmICghZGVzZWxlY3RBbGwpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fc3RvcmUuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoY2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaG9pY2UuaWQgJiYgY2hvaWNlLmFjdGl2ZSAmJiBjaG9pY2Uuc2VsZWN0ZWQgJiYgIWNob2ljZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdJdGVtc1tjaG9pY2UudmFsdWVdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuY2xlYXJTdG9yZShmYWxzZSk7XG4gICAgICAgICAgICB2YXIgdXBkYXRlQ2hvaWNlID0gZnVuY3Rpb24gKGNob2ljZSkge1xuICAgICAgICAgICAgICAgIGlmIChkZXNlbGVjdEFsbCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc3RvcmUuZGlzcGF0Y2gocmVtb3ZlSXRlbSQxKGNob2ljZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChleGlzdGluZ0l0ZW1zW2Nob2ljZS52YWx1ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2hvaWNlc0Zyb21PcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKGdyb3VwT3JDaG9pY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoJ2Nob2ljZXMnIGluIGdyb3VwT3JDaG9pY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBPckNob2ljZS5jaG9pY2VzLmZvckVhY2godXBkYXRlQ2hvaWNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1cGRhdGVDaG9pY2UoZ3JvdXBPckNob2ljZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8qIEB0b2RvIG9ubHkgZ2VuZXJhdGUgYWRkIGV2ZW50cyBmb3IgdGhlIGFkZGVkIG9wdGlvbnMgaW5zdGVhZCBvZiBhbGxcbiAgICAgICAgICAgIGlmICh3aXRoRXZlbnRzKSB7XG4gICAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGNob2ljZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ0l0ZW1zW2Nob2ljZS52YWx1ZV0pIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGFzc2VkRWxlbWVudC50cmlnZ2VyRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50VHlwZS5yZW1vdmVJdGVtLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRDaG9pY2VGb3JFdmVudChjaG9pY2UpLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIC8vIGxvYWQgbmV3IGNob2ljZXMgJiBpdGVtc1xuICAgICAgICAgICAgX3RoaXMuX2FkZFByZWRlZmluZWRDaG9pY2VzKGNob2ljZXNGcm9tT3B0aW9ucywgc2VsZWN0Rmlyc3RPcHRpb24sIHdpdGhFdmVudHMpO1xuICAgICAgICAgICAgLy8gcmUtZG8gc2VhcmNoIGlmIHJlcXVpcmVkXG4gICAgICAgICAgICBpZiAoX3RoaXMuX2lzU2VhcmNoaW5nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3NlYXJjaENob2ljZXMoX3RoaXMuaW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5yZW1vdmVDaG9pY2UgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGNob2ljZSA9IHRoaXMuX3N0b3JlLmNob2ljZXMuZmluZChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy52YWx1ZSA9PT0gdmFsdWU7IH0pO1xuICAgICAgICBpZiAoIWNob2ljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xlYXJOb3RpY2UoKTtcbiAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2gocmVtb3ZlQ2hvaWNlKGNob2ljZSkpO1xuICAgICAgICAvLyBAdG9kbyBpbnRlZ3JhdGUgd2l0aCBTdG9yZVxuICAgICAgICB0aGlzLl9zZWFyY2hlci5yZXNldCgpO1xuICAgICAgICBpZiAoY2hvaWNlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnBhc3NlZEVsZW1lbnQudHJpZ2dlckV2ZW50KEV2ZW50VHlwZS5yZW1vdmVJdGVtLCB0aGlzLl9nZXRDaG9pY2VGb3JPdXRwdXQoY2hvaWNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5jbGVhckNob2ljZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3N0b3JlLndpdGhUeG4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX3N0b3JlLmNob2ljZXMuZm9yRWFjaChmdW5jdGlvbiAoY2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjaG9pY2Uuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3N0b3JlLmRpc3BhdGNoKHJlbW92ZUNob2ljZShjaG9pY2UpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEB0b2RvIGludGVncmF0ZSB3aXRoIFN0b3JlXG4gICAgICAgIHRoaXMuX3NlYXJjaGVyLnJlc2V0KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuY2xlYXJTdG9yZSA9IGZ1bmN0aW9uIChjbGVhck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGNsZWFyT3B0aW9ucyA9PT0gdm9pZCAwKSB7IGNsZWFyT3B0aW9ucyA9IHRydWU7IH1cbiAgICAgICAgdGhpcy5fc3RvcFNlYXJjaCgpO1xuICAgICAgICBpZiAoY2xlYXJPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnBhc3NlZEVsZW1lbnQuZWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oJycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXRlbUxpc3QuZWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oJycpO1xuICAgICAgICB0aGlzLmNob2ljZUxpc3QuZWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oJycpO1xuICAgICAgICB0aGlzLl9jbGVhck5vdGljZSgpO1xuICAgICAgICB0aGlzLl9zdG9yZS5yZXNldCgpO1xuICAgICAgICB0aGlzLl9sYXN0QWRkZWRDaG9pY2VJZCA9IDA7XG4gICAgICAgIHRoaXMuX2xhc3RBZGRlZEdyb3VwSWQgPSAwO1xuICAgICAgICAvLyBAdG9kbyBpbnRlZ3JhdGUgd2l0aCBTdG9yZVxuICAgICAgICB0aGlzLl9zZWFyY2hlci5yZXNldCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLmNsZWFySW5wdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzaG91bGRTZXRJbnB1dFdpZHRoID0gIXRoaXMuX2lzU2VsZWN0T25lRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbnB1dC5jbGVhcihzaG91bGRTZXRJbnB1dFdpZHRoKTtcbiAgICAgICAgdGhpcy5fc3RvcFNlYXJjaCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl92YWxpZGF0ZUNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgICB2YXIgaW52YWxpZENvbmZpZ09wdGlvbnMgPSBkaWZmKGNvbmZpZywgREVGQVVMVF9DT05GSUcpO1xuICAgICAgICBpZiAoaW52YWxpZENvbmZpZ09wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1Vua25vd24gY29uZmlnIG9wdGlvbihzKSBwYXNzZWQnLCBpbnZhbGlkQ29uZmlnT3B0aW9ucy5qb2luKCcsICcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLmFsbG93SFRNTCAmJiBjb25maWcuYWxsb3dIdG1sVXNlcklucHV0KSB7XG4gICAgICAgICAgICBpZiAoY29uZmlnLmFkZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdXYXJuaW5nOiBhbGxvd0hUTUwvYWxsb3dIdG1sVXNlcklucHV0L2FkZEl0ZW1zIGFsbCBiZWluZyB0cnVlIGlzIHN0cm9uZ2x5IG5vdCByZWNvbW1lbmRlZCBhbmQgbWF5IGxlYWQgdG8gWFNTIGF0dGFja3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25maWcuYWRkQ2hvaWNlcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignV2FybmluZzogYWxsb3dIVE1ML2FsbG93SHRtbFVzZXJJbnB1dC9hZGRDaG9pY2VzIGFsbCBiZWluZyB0cnVlIGlzIHN0cm9uZ2x5IG5vdCByZWNvbW1lbmRlZCBhbmQgbWF5IGxlYWQgdG8gWFNTIGF0dGFja3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzID09PSB2b2lkIDApIHsgY2hhbmdlcyA9IHsgY2hvaWNlczogdHJ1ZSwgZ3JvdXBzOiB0cnVlLCBpdGVtczogdHJ1ZSB9OyB9XG4gICAgICAgIGlmICh0aGlzLl9zdG9yZS5pblR4bigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lzU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMuY2hvaWNlcyB8fCBjaGFuZ2VzLmdyb3Vwcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckNob2ljZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlcy5pdGVtcykge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbXMoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX3JlbmRlckNob2ljZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5fY2FuQWRkSXRlbXMoKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBibG9jayByZW5kZXJpbmcgY2hvaWNlcyBpZiB0aGUgaW5wdXQgbGltaXQgaXMgcmVhY2hlZC5cbiAgICAgICAgfVxuICAgICAgICB2YXIgX2EgPSB0aGlzLCBjb25maWcgPSBfYS5jb25maWcsIGlzU2VhcmNoaW5nID0gX2EuX2lzU2VhcmNoaW5nO1xuICAgICAgICB2YXIgX2IgPSB0aGlzLl9zdG9yZSwgYWN0aXZlR3JvdXBzID0gX2IuYWN0aXZlR3JvdXBzLCBhY3RpdmVDaG9pY2VzID0gX2IuYWN0aXZlQ2hvaWNlcztcbiAgICAgICAgdmFyIHJlbmRlckxpbWl0ID0gMDtcbiAgICAgICAgaWYgKGlzU2VhcmNoaW5nICYmIGNvbmZpZy5zZWFyY2hSZXN1bHRMaW1pdCA+IDApIHtcbiAgICAgICAgICAgIHJlbmRlckxpbWl0ID0gY29uZmlnLnNlYXJjaFJlc3VsdExpbWl0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZy5yZW5kZXJDaG9pY2VMaW1pdCA+IDApIHtcbiAgICAgICAgICAgIHJlbmRlckxpbWl0ID0gY29uZmlnLnJlbmRlckNob2ljZUxpbWl0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pc1NlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBiYWNraW5nT3B0aW9ucyA9IGFjdGl2ZUNob2ljZXMuZmlsdGVyKGZ1bmN0aW9uIChjaG9pY2UpIHsgcmV0dXJuICFjaG9pY2UuZWxlbWVudDsgfSk7XG4gICAgICAgICAgICBpZiAoYmFja2luZ09wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzZWRFbGVtZW50LmFkZE9wdGlvbnMoYmFja2luZ09wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgdmFyIHJlbmRlcmFibGVDaG9pY2VzID0gZnVuY3Rpb24gKGNob2ljZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBjaG9pY2VzLmZpbHRlcihmdW5jdGlvbiAoY2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFjaG9pY2UucGxhY2Vob2xkZXIgJiYgKGlzU2VhcmNoaW5nID8gISFjaG9pY2UucmFuayA6IGNvbmZpZy5yZW5kZXJTZWxlY3RlZENob2ljZXMgfHwgIWNob2ljZS5zZWxlY3RlZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHNlbGVjdGFibGVDaG9pY2VzID0gZmFsc2U7XG4gICAgICAgIHZhciByZW5kZXJDaG9pY2VzID0gZnVuY3Rpb24gKGNob2ljZXMsIHdpdGhpbkdyb3VwLCBncm91cExhYmVsKSB7XG4gICAgICAgICAgICBpZiAoaXNTZWFyY2hpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBzb3J0QnlSYW5rIGlzIHVzZWQgdG8gZW5zdXJlIHN0YWJsZSBzb3J0aW5nLCBhcyBzY29yZXMgYXJlIG5vbi11bmlxdWVcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGFkZGl0aW9uYWxseSBlbnN1cmVzIGZ1c2VPcHRpb25zLnNvcnRGbiBpcyBub3QgaWdub3JlZFxuICAgICAgICAgICAgICAgIGNob2ljZXMuc29ydChzb3J0QnlSYW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbmZpZy5zaG91bGRTb3J0KSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlcy5zb3J0KGNvbmZpZy5zb3J0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNob2ljZUxpbWl0ID0gY2hvaWNlcy5sZW5ndGg7XG4gICAgICAgICAgICBjaG9pY2VMaW1pdCA9ICF3aXRoaW5Hcm91cCAmJiByZW5kZXJMaW1pdCAmJiBjaG9pY2VMaW1pdCA+IHJlbmRlckxpbWl0ID8gcmVuZGVyTGltaXQgOiBjaG9pY2VMaW1pdDtcbiAgICAgICAgICAgIGNob2ljZUxpbWl0LS07XG4gICAgICAgICAgICBjaG9pY2VzLmV2ZXJ5KGZ1bmN0aW9uIChjaG9pY2UsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgLy8gY2hvaWNlRWwgYmVpbmcgZW1wdHkgc2lnbmFscyB0aGUgY29udGVudHMgaGFzIHByb2JhYmx5IHNpZ25pZmljYW50bHkgY2hhbmdlZFxuICAgICAgICAgICAgICAgIHZhciBkcm9wZG93bkl0ZW0gPSBjaG9pY2UuY2hvaWNlRWwgfHwgX3RoaXMuX3RlbXBsYXRlcy5jaG9pY2UoY29uZmlnLCBjaG9pY2UsIGNvbmZpZy5pdGVtU2VsZWN0VGV4dCwgZ3JvdXBMYWJlbCk7XG4gICAgICAgICAgICAgICAgY2hvaWNlLmNob2ljZUVsID0gZHJvcGRvd25JdGVtO1xuICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGRyb3Bkb3duSXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKCFjaG9pY2UuZGlzYWJsZWQgJiYgKGlzU2VhcmNoaW5nIHx8ICFjaG9pY2Uuc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGVDaG9pY2VzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4IDwgY2hvaWNlTGltaXQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGFjdGl2ZUNob2ljZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoY29uZmlnLnJlc2V0U2Nyb2xsUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuY2hvaWNlTGlzdC5zY3JvbGxUb1RvcCgpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5faGFzTm9uQ2hvaWNlUGxhY2Vob2xkZXIgJiYgIWlzU2VhcmNoaW5nICYmIHRoaXMuX2lzU2VsZWN0T25lRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgYSBwbGFjZWhvbGRlciBjaG9pY2UgYWxvbmcgd2l0aCBncm91cHNcbiAgICAgICAgICAgICAgICByZW5kZXJDaG9pY2VzKGFjdGl2ZUNob2ljZXMuZmlsdGVyKGZ1bmN0aW9uIChjaG9pY2UpIHsgcmV0dXJuIGNob2ljZS5wbGFjZWhvbGRlciAmJiAhY2hvaWNlLmdyb3VwOyB9KSwgZmFsc2UsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGdyb3VwZWQgb3B0aW9uc1xuICAgICAgICAgICAgaWYgKGFjdGl2ZUdyb3Vwcy5sZW5ndGggJiYgIWlzU2VhcmNoaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5zaG91bGRTb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUdyb3Vwcy5zb3J0KGNvbmZpZy5zb3J0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyByZW5kZXIgQ2hvaWNlcyB3aXRob3V0IGdyb3VwIGZpcnN0LCByZWdhcmRsZXNzIG9mIHNvcnQsIG90aGVyd2lzZSB0aGV5IHdvbid0IGJlIGRpc3Rpbmd1aXNoYWJsZVxuICAgICAgICAgICAgICAgIC8vIGZyb20gdGhlIGxhc3QgZ3JvdXBcbiAgICAgICAgICAgICAgICByZW5kZXJDaG9pY2VzKGFjdGl2ZUNob2ljZXMuZmlsdGVyKGZ1bmN0aW9uIChjaG9pY2UpIHsgcmV0dXJuICFjaG9pY2UucGxhY2Vob2xkZXIgJiYgIWNob2ljZS5ncm91cDsgfSksIGZhbHNlLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIGFjdGl2ZUdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChncm91cCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBDaG9pY2VzID0gcmVuZGVyYWJsZUNob2ljZXMoZ3JvdXAuY2hvaWNlcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChncm91cENob2ljZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXAubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHJvcGRvd25Hcm91cCA9IGdyb3VwLmdyb3VwRWwgfHwgX3RoaXMuX3RlbXBsYXRlcy5jaG9pY2VHcm91cChfdGhpcy5jb25maWcsIGdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cC5ncm91cEVsID0gZHJvcGRvd25Hcm91cDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bkdyb3VwLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGRyb3Bkb3duR3JvdXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyQ2hvaWNlcyhncm91cENob2ljZXMsIHRydWUsIGNvbmZpZy5hcHBlbmRHcm91cEluU2VhcmNoICYmIGlzU2VhcmNoaW5nID8gZ3JvdXAubGFiZWwgOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW5kZXJDaG9pY2VzKHJlbmRlcmFibGVDaG9pY2VzKGFjdGl2ZUNob2ljZXMpLCBmYWxzZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNlbGVjdGFibGVDaG9pY2VzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX25vdGljZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX25vdGljZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzb2x2ZVN0cmluZ0Z1bmN0aW9uKGlzU2VhcmNoaW5nID8gY29uZmlnLm5vUmVzdWx0c1RleHQgOiBjb25maWcubm9DaG9pY2VzVGV4dCksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGlzU2VhcmNoaW5nID8gTm90aWNlVHlwZXMubm9SZXN1bHRzIDogTm90aWNlVHlwZXMubm9DaG9pY2VzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmcmFnbWVudC5yZXBsYWNlQ2hpbGRyZW4oJycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlbmRlck5vdGljZShmcmFnbWVudCk7XG4gICAgICAgIHRoaXMuY2hvaWNlTGlzdC5lbGVtZW50LnJlcGxhY2VDaGlsZHJlbihmcmFnbWVudCk7XG4gICAgICAgIGlmIChzZWxlY3RhYmxlQ2hvaWNlcykge1xuICAgICAgICAgICAgdGhpcy5faGlnaGxpZ2h0Q2hvaWNlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9yZW5kZXJJdGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5fc3RvcmUuaXRlbXMgfHwgW107XG4gICAgICAgIHZhciBpdGVtTGlzdCA9IHRoaXMuaXRlbUxpc3QuZWxlbWVudDtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHZhciBpdGVtRnJvbUxpc3QgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1MaXN0LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1pdGVtXVtkYXRhLWlkPVxcXCJcIi5jb25jYXQoaXRlbS5pZCwgXCJcXFwiXVwiKSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBhZGRJdGVtVG9GcmFnbWVudCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBpdGVtLml0ZW1FbDtcbiAgICAgICAgICAgIGlmIChlbCAmJiBlbC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWwgPSBpdGVtRnJvbUxpc3QoaXRlbSkgfHwgX3RoaXMuX3RlbXBsYXRlcy5pdGVtKGNvbmZpZywgaXRlbSwgY29uZmlnLnJlbW92ZUl0ZW1CdXR0b24pO1xuICAgICAgICAgICAgaXRlbS5pdGVtRWwgPSBlbDtcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gbmV3IGl0ZW1zXG4gICAgICAgIGl0ZW1zLmZvckVhY2goYWRkSXRlbVRvRnJhZ21lbnQpO1xuICAgICAgICB2YXIgYWRkSXRlbXMgPSAhIWZyYWdtZW50LmNoaWxkTm9kZXMubGVuZ3RoO1xuICAgICAgICBpZiAodGhpcy5faXNTZWxlY3RPbmVFbGVtZW50ICYmIHRoaXMuX2hhc05vbkNob2ljZVBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICB2YXIgZXhpc3RpbmdJdGVtcyA9IGl0ZW1MaXN0LmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChhZGRJdGVtcyB8fCBleGlzdGluZ0l0ZW1zID4gMSkge1xuICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IGl0ZW1MaXN0LnF1ZXJ5U2VsZWN0b3IoZ2V0Q2xhc3NOYW1lc1NlbGVjdG9yKGNvbmZpZy5jbGFzc05hbWVzLnBsYWNlaG9sZGVyKSk7XG4gICAgICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFleGlzdGluZ0l0ZW1zKSB7XG4gICAgICAgICAgICAgICAgYWRkSXRlbXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub0ZyYWdtZW50KG1hcElucHV0VG9DaG9pY2Uoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogY29uZmlnLnBsYWNlaG9sZGVyVmFsdWUgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sIGZhbHNlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkZEl0ZW1zKSB7XG4gICAgICAgICAgICBpdGVtTGlzdC5hcHBlbmQoZnJhZ21lbnQpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5zaG91bGRTb3J0SXRlbXMgJiYgIXRoaXMuX2lzU2VsZWN0T25lRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnNvcnQoY29uZmlnLnNvcnRlcik7XG4gICAgICAgICAgICAgICAgLy8gcHVzaCBzb3J0aW5nIGludG8gdGhlIERPTVxuICAgICAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsID0gaXRlbUZyb21MaXN0KGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGl0ZW1MaXN0LmFwcGVuZChmcmFnbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lzVGV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGhpZGRlbiBpbnB1dFxuICAgICAgICAgICAgdGhpcy5wYXNzZWRFbGVtZW50LnZhbHVlID0gaXRlbXMubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IF9hLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0pLmpvaW4oY29uZmlnLmRlbGltaXRlcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9kaXNwbGF5Tm90aWNlID0gZnVuY3Rpb24gKHRleHQsIHR5cGUsIG9wZW5Ecm9wZG93bikge1xuICAgICAgICBpZiAob3BlbkRyb3Bkb3duID09PSB2b2lkIDApIHsgb3BlbkRyb3Bkb3duID0gdHJ1ZTsgfVxuICAgICAgICB2YXIgb2xkTm90aWNlID0gdGhpcy5fbm90aWNlO1xuICAgICAgICBpZiAob2xkTm90aWNlICYmXG4gICAgICAgICAgICAoKG9sZE5vdGljZS50eXBlID09PSB0eXBlICYmIG9sZE5vdGljZS50ZXh0ID09PSB0ZXh0KSB8fFxuICAgICAgICAgICAgICAgIChvbGROb3RpY2UudHlwZSA9PT0gTm90aWNlVHlwZXMuYWRkQ2hvaWNlICYmXG4gICAgICAgICAgICAgICAgICAgICh0eXBlID09PSBOb3RpY2VUeXBlcy5ub1Jlc3VsdHMgfHwgdHlwZSA9PT0gTm90aWNlVHlwZXMubm9DaG9pY2VzKSkpKSB7XG4gICAgICAgICAgICBpZiAob3BlbkRyb3Bkb3duKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RHJvcGRvd24odHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xlYXJOb3RpY2UoKTtcbiAgICAgICAgdGhpcy5fbm90aWNlID0gdGV4dFxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3JlbmRlck5vdGljZSgpO1xuICAgICAgICBpZiAob3BlbkRyb3Bkb3duICYmIHRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duKHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fY2xlYXJOb3RpY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbm90aWNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vdGljZUVsZW1lbnQgPSB0aGlzLmNob2ljZUxpc3QuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGdldENsYXNzTmFtZXNTZWxlY3Rvcih0aGlzLmNvbmZpZy5jbGFzc05hbWVzLm5vdGljZSkpO1xuICAgICAgICBpZiAobm90aWNlRWxlbWVudCkge1xuICAgICAgICAgICAgbm90aWNlRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ub3RpY2UgPSB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fcmVuZGVyTm90aWNlID0gZnVuY3Rpb24gKGZyYWdtZW50KSB7XG4gICAgICAgIHZhciBub3RpY2VDb25mID0gdGhpcy5fbm90aWNlO1xuICAgICAgICBpZiAobm90aWNlQ29uZikge1xuICAgICAgICAgICAgdmFyIG5vdGljZSA9IHRoaXMuX3RlbXBsYXRlcy5ub3RpY2UodGhpcy5jb25maWcsIG5vdGljZUNvbmYudGV4dCwgbm90aWNlQ29uZi50eXBlKTtcbiAgICAgICAgICAgIGlmIChmcmFnbWVudCkge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZChub3RpY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaG9pY2VMaXN0LnByZXBlbmQobm90aWNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fZ2V0Q2hvaWNlRm9yT3V0cHV0ID0gZnVuY3Rpb24gKGNob2ljZSwga2V5Q29kZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IGNob2ljZS5pZCxcbiAgICAgICAgICAgIGhpZ2hsaWdodGVkOiBjaG9pY2UuaGlnaGxpZ2h0ZWQsXG4gICAgICAgICAgICBsYWJlbENsYXNzOiBjaG9pY2UubGFiZWxDbGFzcyxcbiAgICAgICAgICAgIGxhYmVsRGVzY3JpcHRpb246IGNob2ljZS5sYWJlbERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgY3VzdG9tUHJvcGVydGllczogY2hvaWNlLmN1c3RvbVByb3BlcnRpZXMsXG4gICAgICAgICAgICBkaXNhYmxlZDogY2hvaWNlLmRpc2FibGVkLFxuICAgICAgICAgICAgYWN0aXZlOiBjaG9pY2UuYWN0aXZlLFxuICAgICAgICAgICAgbGFiZWw6IGNob2ljZS5sYWJlbCxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBjaG9pY2UucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICB2YWx1ZTogY2hvaWNlLnZhbHVlLFxuICAgICAgICAgICAgZ3JvdXBWYWx1ZTogY2hvaWNlLmdyb3VwID8gY2hvaWNlLmdyb3VwLmxhYmVsIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZWxlbWVudDogY2hvaWNlLmVsZW1lbnQsXG4gICAgICAgICAgICBrZXlDb2RlOiBrZXlDb2RlLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX3RyaWdnZXJDaGFuZ2UgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhc3NlZEVsZW1lbnQudHJpZ2dlckV2ZW50KEV2ZW50VHlwZS5jaGFuZ2UsIHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5faGFuZGxlQnV0dG9uQWN0aW9uID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5fc3RvcmUuaXRlbXM7XG4gICAgICAgIGlmICghaXRlbXMubGVuZ3RoIHx8ICF0aGlzLmNvbmZpZy5yZW1vdmVJdGVtcyB8fCAhdGhpcy5jb25maWcucmVtb3ZlSXRlbUJ1dHRvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpZCA9IGVsZW1lbnQgJiYgcGFyc2VEYXRhU2V0SWQoZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgdmFyIGl0ZW1Ub1JlbW92ZSA9IGlkICYmIGl0ZW1zLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0uaWQgPT09IGlkOyB9KTtcbiAgICAgICAgaWYgKCFpdGVtVG9SZW1vdmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdG9yZS53aXRoVHhuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBpdGVtIGFzc29jaWF0ZWQgd2l0aCBidXR0b25cbiAgICAgICAgICAgIF90aGlzLl9yZW1vdmVJdGVtKGl0ZW1Ub1JlbW92ZSk7XG4gICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckNoYW5nZShpdGVtVG9SZW1vdmUudmFsdWUpO1xuICAgICAgICAgICAgaWYgKF90aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQgJiYgIV90aGlzLl9oYXNOb25DaG9pY2VQbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlckNob2ljZSA9IF90aGlzLl9zdG9yZS5jaG9pY2VzXG4gICAgICAgICAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoZnVuY3Rpb24gKGNob2ljZSkgeyByZXR1cm4gIWNob2ljZS5kaXNhYmxlZCAmJiBjaG9pY2UucGxhY2Vob2xkZXI7IH0pO1xuICAgICAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlckNob2ljZSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fYWRkSXRlbShwbGFjZWhvbGRlckNob2ljZSk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnVuaGlnaGxpZ2h0QWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlckNob2ljZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJDaGFuZ2UocGxhY2Vob2xkZXJDaG9pY2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9oYW5kbGVJdGVtQWN0aW9uID0gZnVuY3Rpb24gKGVsZW1lbnQsIGhhc1NoaWZ0S2V5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChoYXNTaGlmdEtleSA9PT0gdm9pZCAwKSB7IGhhc1NoaWZ0S2V5ID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5fc3RvcmUuaXRlbXM7XG4gICAgICAgIGlmICghaXRlbXMubGVuZ3RoIHx8ICF0aGlzLmNvbmZpZy5yZW1vdmVJdGVtcyB8fCB0aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaWQgPSBwYXJzZURhdGFTZXRJZChlbGVtZW50KTtcbiAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdlIG9ubHkgd2FudCB0byBzZWxlY3Qgb25lIGl0ZW0gd2l0aCBhIGNsaWNrXG4gICAgICAgIC8vIHNvIHdlIGRlc2VsZWN0IGFueSBpdGVtcyB0aGF0IGFyZW4ndCB0aGUgdGFyZ2V0XG4gICAgICAgIC8vIHVubGVzcyBzaGlmdCBpcyBiZWluZyBwcmVzc2VkXG4gICAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBpZCAmJiAhaXRlbS5oaWdobGlnaHRlZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZ2hsaWdodEl0ZW0oaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghaGFzU2hpZnRLZXkgJiYgaXRlbS5oaWdobGlnaHRlZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnVuaGlnaGxpZ2h0SXRlbShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEZvY3VzIGlucHV0IGFzIHdpdGhvdXQgZm9jdXMsIGEgdXNlciBjYW5ub3QgZG8gYW55dGhpbmcgd2l0aCBhXG4gICAgICAgIC8vIGhpZ2hsaWdodGVkIGl0ZW1cbiAgICAgICAgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2hhbmRsZUNob2ljZUFjdGlvbiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIElmIHdlIGFyZSBjbGlja2luZyBvbiBhbiBvcHRpb25cbiAgICAgICAgdmFyIGlkID0gcGFyc2VEYXRhU2V0SWQoZWxlbWVudCk7XG4gICAgICAgIHZhciBjaG9pY2UgPSBpZCAmJiB0aGlzLl9zdG9yZS5nZXRDaG9pY2VCeUlkKGlkKTtcbiAgICAgICAgaWYgKCFjaG9pY2UgfHwgY2hvaWNlLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhc0FjdGl2ZURyb3Bkb3duID0gdGhpcy5kcm9wZG93bi5pc0FjdGl2ZTtcbiAgICAgICAgaWYgKCFjaG9pY2Uuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FuQWRkSXRlbXMoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBjYXVzZXMgX29uRW50ZXJLZXkgdG8gZWFybHkgb3V0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdG9yZS53aXRoVHhuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fYWRkSXRlbShjaG9pY2UsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIF90aGlzLmNsZWFySW5wdXQoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy51bmhpZ2hsaWdodEFsbCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ2hhbmdlKGNob2ljZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2Ugd2FudCB0byBjbG9zZSB0aGUgZHJvcGRvd24gaWYgd2UgYXJlIGRlYWxpbmcgd2l0aCBhIHNpbmdsZSBzZWxlY3QgYm94XG4gICAgICAgIGlmIChoYXNBY3RpdmVEcm9wZG93biAmJiB0aGlzLmNvbmZpZy5jbG9zZURyb3Bkb3duT25TZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZURyb3Bkb3duKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXJPdXRlci5lbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5faGFuZGxlQmFja3NwYWNlID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgICAgaWYgKCFjb25maWcucmVtb3ZlSXRlbXMgfHwgIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsYXN0SXRlbSA9IGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDFdO1xuICAgICAgICB2YXIgaGFzSGlnaGxpZ2h0ZWRJdGVtcyA9IGl0ZW1zLnNvbWUoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0uaGlnaGxpZ2h0ZWQ7IH0pO1xuICAgICAgICAvLyBJZiBlZGl0aW5nIHRoZSBsYXN0IGl0ZW0gaXMgYWxsb3dlZCBhbmQgdGhlcmUgYXJlIG5vdCBvdGhlciBzZWxlY3RlZCBpdGVtcyxcbiAgICAgICAgLy8gd2UgY2FuIGVkaXQgdGhlIGl0ZW0gdmFsdWUuIE90aGVyd2lzZSBpZiB3ZSBjYW4gcmVtb3ZlIGl0ZW1zLCByZW1vdmUgYWxsIHNlbGVjdGVkIGl0ZW1zXG4gICAgICAgIGlmIChjb25maWcuZWRpdEl0ZW1zICYmICFoYXNIaWdobGlnaHRlZEl0ZW1zICYmIGxhc3RJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gbGFzdEl0ZW0udmFsdWU7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnNldFdpZHRoKCk7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVJdGVtKGxhc3RJdGVtKTtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2UobGFzdEl0ZW0udmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNIaWdobGlnaHRlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgLy8gSGlnaGxpZ2h0IGxhc3QgaXRlbSBpZiBub25lIGFscmVhZHkgaGlnaGxpZ2h0ZWRcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodEl0ZW0obGFzdEl0ZW0sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlSGlnaGxpZ2h0ZWRJdGVtcyh0cnVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2xvYWRDaG9pY2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgICAgaWYgKHRoaXMuX2lzVGV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIEFzc2lnbiBwcmVzZXQgaXRlbXMgZnJvbSBwYXNzZWQgb2JqZWN0IGZpcnN0XG4gICAgICAgICAgICB0aGlzLl9wcmVzZXRDaG9pY2VzID0gY29uZmlnLml0ZW1zLm1hcChmdW5jdGlvbiAoZSkgeyByZXR1cm4gbWFwSW5wdXRUb0Nob2ljZShlLCBmYWxzZSk7IH0pO1xuICAgICAgICAgICAgLy8gQWRkIGFueSB2YWx1ZXMgcGFzc2VkIGZyb20gYXR0cmlidXRlXG4gICAgICAgICAgICBpZiAodGhpcy5wYXNzZWRFbGVtZW50LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRJdGVtcyA9IHRoaXMucGFzc2VkRWxlbWVudC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoY29uZmlnLmRlbGltaXRlcilcbiAgICAgICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoZSkgeyByZXR1cm4gbWFwSW5wdXRUb0Nob2ljZShlLCBmYWxzZSwgX3RoaXMuY29uZmlnLmFsbG93SHRtbFVzZXJJbnB1dCk7IH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXNldENob2ljZXMgPSB0aGlzLl9wcmVzZXRDaG9pY2VzLmNvbmNhdChlbGVtZW50SXRlbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcHJlc2V0Q2hvaWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaG9pY2UpIHtcbiAgICAgICAgICAgICAgICBjaG9pY2Uuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5faXNTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBBc3NpZ24gcHJlc2V0IGNob2ljZXMgZnJvbSBwYXNzZWQgb2JqZWN0XG4gICAgICAgICAgICB0aGlzLl9wcmVzZXRDaG9pY2VzID0gY29uZmlnLmNob2ljZXMubWFwKGZ1bmN0aW9uIChlKSB7IHJldHVybiBtYXBJbnB1dFRvQ2hvaWNlKGUsIHRydWUpOyB9KTtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhcnJheSBvZiBjaG9pY2VzIGZyb20gb3B0aW9uIGVsZW1lbnRzXG4gICAgICAgICAgICB2YXIgY2hvaWNlc0Zyb21PcHRpb25zID0gdGhpcy5wYXNzZWRFbGVtZW50Lm9wdGlvbnNBc0Nob2ljZXMoKTtcbiAgICAgICAgICAgIGlmIChjaG9pY2VzRnJvbU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLl9wcmVzZXRDaG9pY2VzKS5wdXNoLmFwcGx5KF9hLCBjaG9pY2VzRnJvbU9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5faGFuZGxlTG9hZGluZ1N0YXRlID0gZnVuY3Rpb24gKHNldExvYWRpbmcpIHtcbiAgICAgICAgaWYgKHNldExvYWRpbmcgPT09IHZvaWQgMCkgeyBzZXRMb2FkaW5nID0gdHJ1ZTsgfVxuICAgICAgICB2YXIgZWwgPSB0aGlzLml0ZW1MaXN0LmVsZW1lbnQ7XG4gICAgICAgIGlmIChzZXRMb2FkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyT3V0ZXIuYWRkTG9hZGluZ1N0YXRlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNTZWxlY3RPbmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWwucmVwbGFjZUNoaWxkcmVuKHRoaXMuX3RlbXBsYXRlcy5wbGFjZWhvbGRlcih0aGlzLmNvbmZpZywgdGhpcy5jb25maWcubG9hZGluZ1RleHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQucGxhY2Vob2xkZXIgPSB0aGlzLmNvbmZpZy5sb2FkaW5nVGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lck91dGVyLnJlbW92ZUxvYWRpbmdTdGF0ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzU2VsZWN0T25lRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsLnJlcGxhY2VDaGlsZHJlbignJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnBsYWNlaG9sZGVyID0gdGhpcy5fcGxhY2Vob2xkZXJWYWx1ZSB8fCAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2hhbmRsZVNlYXJjaCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuaW5wdXQuaXNGb2N1c3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIENoZWNrIHRoYXQgd2UgaGF2ZSBhIHZhbHVlIHRvIHNlYXJjaCBhbmQgdGhlIGlucHV0IHdhcyBhbiBhbHBoYW51bWVyaWMgY2hhcmFjdGVyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5zZWFyY2hGbG9vcikge1xuICAgICAgICAgICAgdmFyIHJlc3VsdENvdW50ID0gdGhpcy5jb25maWcuc2VhcmNoQ2hvaWNlcyA/IHRoaXMuX3NlYXJjaENob2ljZXModmFsdWUpIDogMDtcbiAgICAgICAgICAgIGlmIChyZXN1bHRDb3VudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgc2VhcmNoIGV2ZW50XG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzZWRFbGVtZW50LnRyaWdnZXJFdmVudChFdmVudFR5cGUuc2VhcmNoLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Q291bnQ6IHJlc3VsdENvdW50LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3N0b3JlLmNob2ljZXMuc29tZShmdW5jdGlvbiAob3B0aW9uKSB7IHJldHVybiAhb3B0aW9uLmFjdGl2ZTsgfSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BTZWFyY2goKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2NhbkFkZEl0ZW1zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICAgIHZhciBtYXhJdGVtQ291bnQgPSBjb25maWcubWF4SXRlbUNvdW50LCBtYXhJdGVtVGV4dCA9IGNvbmZpZy5tYXhJdGVtVGV4dDtcbiAgICAgICAgaWYgKCFjb25maWcuc2luZ2xlTW9kZUZvck11bHRpU2VsZWN0ICYmIG1heEl0ZW1Db3VudCA+IDAgJiYgbWF4SXRlbUNvdW50IDw9IHRoaXMuX3N0b3JlLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jaG9pY2VMaXN0LmVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKCcnKTtcbiAgICAgICAgICAgIHRoaXMuX25vdGljZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlOb3RpY2UodHlwZW9mIG1heEl0ZW1UZXh0ID09PSAnZnVuY3Rpb24nID8gbWF4SXRlbVRleHQobWF4SXRlbUNvdW50KSA6IG1heEl0ZW1UZXh0LCBOb3RpY2VUeXBlcy5hZGRDaG9pY2UpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2NhbkNyZWF0ZUl0ZW0gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgICB2YXIgY2FuQWRkSXRlbSA9IHRydWU7XG4gICAgICAgIHZhciBub3RpY2UgPSAnJztcbiAgICAgICAgaWYgKGNhbkFkZEl0ZW0gJiYgdHlwZW9mIGNvbmZpZy5hZGRJdGVtRmlsdGVyID09PSAnZnVuY3Rpb24nICYmICFjb25maWcuYWRkSXRlbUZpbHRlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNhbkFkZEl0ZW0gPSBmYWxzZTtcbiAgICAgICAgICAgIG5vdGljZSA9IHJlc29sdmVOb3RpY2VGdW5jdGlvbihjb25maWcuY3VzdG9tQWRkSXRlbVRleHQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FuQWRkSXRlbSkge1xuICAgICAgICAgICAgdmFyIGZvdW5kQ2hvaWNlID0gdGhpcy5fc3RvcmUuY2hvaWNlcy5maW5kKGZ1bmN0aW9uIChjaG9pY2UpIHsgcmV0dXJuIGNvbmZpZy52YWx1ZUNvbXBhcmVyKGNob2ljZS52YWx1ZSwgdmFsdWUpOyB9KTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1NlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBmb3IgZXhhY3QgbWF0Y2hlcywgZG8gbm90IHByb21wdCB0byBhZGQgaXQgYXMgYSBjdXN0b20gY2hvaWNlXG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kQ2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlOb3RpY2UoJycsIE5vdGljZVR5cGVzLmFkZENob2ljZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9pc1RleHRFbGVtZW50ICYmICFjb25maWcuZHVwbGljYXRlSXRlbXNBbGxvd2VkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kQ2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbkFkZEl0ZW0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbm90aWNlID0gcmVzb2x2ZU5vdGljZUZ1bmN0aW9uKGNvbmZpZy51bmlxdWVJdGVtVGV4dCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FuQWRkSXRlbSkge1xuICAgICAgICAgICAgbm90aWNlID0gcmVzb2x2ZU5vdGljZUZ1bmN0aW9uKGNvbmZpZy5hZGRJdGVtVGV4dCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub3RpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlOb3RpY2Uobm90aWNlLCBOb3RpY2VUeXBlcy5hZGRDaG9pY2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYW5BZGRJdGVtO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX3NlYXJjaENob2ljZXMgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gdmFsdWUudHJpbSgpLnJlcGxhY2UoL1xcc3syLH0vLCAnICcpO1xuICAgICAgICAvLyBzaWduYWwgaW5wdXQgZGlkbid0IGNoYW5nZSBzZWFyY2hcbiAgICAgICAgaWYgKCFuZXdWYWx1ZS5sZW5ndGggfHwgbmV3VmFsdWUgPT09IHRoaXMuX2N1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlYXJjaGVyID0gdGhpcy5fc2VhcmNoZXI7XG4gICAgICAgIGlmIChzZWFyY2hlci5pc0VtcHR5SW5kZXgoKSkge1xuICAgICAgICAgICAgc2VhcmNoZXIuaW5kZXgodGhpcy5fc3RvcmUuc2VhcmNoYWJsZUNob2ljZXMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIG5ldyB2YWx1ZSBtYXRjaGVzIHRoZSBkZXNpcmVkIGxlbmd0aCBhbmQgaXMgbm90IHRoZSBzYW1lIGFzIHRoZSBjdXJyZW50IHZhbHVlIHdpdGggYSBzcGFjZVxuICAgICAgICB2YXIgcmVzdWx0cyA9IHNlYXJjaGVyLnNlYXJjaChuZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB0aGlzLl9oaWdobGlnaHRQb3NpdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX2lzU2VhcmNoaW5nID0gdHJ1ZTtcbiAgICAgICAgdmFyIG5vdGljZSA9IHRoaXMuX25vdGljZTtcbiAgICAgICAgdmFyIG5vdGljZVR5cGUgPSBub3RpY2UgJiYgbm90aWNlLnR5cGU7XG4gICAgICAgIGlmIChub3RpY2VUeXBlICE9PSBOb3RpY2VUeXBlcy5hZGRDaG9pY2UpIHtcbiAgICAgICAgICAgIGlmICghcmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXNwbGF5Tm90aWNlKHJlc29sdmVTdHJpbmdGdW5jdGlvbih0aGlzLmNvbmZpZy5ub1Jlc3VsdHNUZXh0KSwgTm90aWNlVHlwZXMubm9SZXN1bHRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFyTm90aWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goZmlsdGVyQ2hvaWNlcyhyZXN1bHRzKSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzLmxlbmd0aDtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9zdG9wU2VhcmNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5faXNTZWFyY2hpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRWYWx1ZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5faXNTZWFyY2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyTm90aWNlKCk7XG4gICAgICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChhY3RpdmF0ZUNob2ljZXModHJ1ZSkpO1xuICAgICAgICAgICAgdGhpcy5wYXNzZWRFbGVtZW50LnRyaWdnZXJFdmVudChFdmVudFR5cGUuc2VhcmNoLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgIHJlc3VsdENvdW50OiAwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRvY3VtZW50RWxlbWVudCA9IHRoaXMuX2RvY1Jvb3Q7XG4gICAgICAgIHZhciBvdXRlckVsZW1lbnQgPSB0aGlzLmNvbnRhaW5lck91dGVyLmVsZW1lbnQ7XG4gICAgICAgIHZhciBpbnB1dEVsZW1lbnQgPSB0aGlzLmlucHV0LmVsZW1lbnQ7XG4gICAgICAgIC8vIGNhcHR1cmUgZXZlbnRzIC0gY2FuIGNhbmNlbCBldmVudCBwcm9jZXNzaW5nIG9yIHByb3BhZ2F0aW9uXG4gICAgICAgIGRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQsIHRydWUpO1xuICAgICAgICBvdXRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5RG93biwgdHJ1ZSk7XG4gICAgICAgIG91dGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgIC8vIHBhc3NpdmUgZXZlbnRzIC0gZG9lc24ndCBjYWxsIGBwcmV2ZW50RGVmYXVsdGAgb3IgYHN0b3BQcm9wYWdhdGlvbmBcbiAgICAgICAgZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljaywgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgICAgICBkb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUsIHtcbiAgICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5fb25Nb3VzZU92ZXIsIHtcbiAgICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5faXNTZWxlY3RPbmVFbGVtZW50KSB7XG4gICAgICAgICAgICBvdXRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9vbkZvY3VzLCB7XG4gICAgICAgICAgICAgICAgcGFzc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3V0ZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9vbkJsdXIsIHtcbiAgICAgICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5fb25LZXlVcCwge1xuICAgICAgICAgICAgcGFzc2l2ZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuX29uSW5wdXQsIHtcbiAgICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9vbkZvY3VzLCB7XG4gICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9vbkJsdXIsIHtcbiAgICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5wdXRFbGVtZW50LmZvcm0pIHtcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2V0JywgdGhpcy5fb25Gb3JtUmVzZXQsIHtcbiAgICAgICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX3JlbW92ZUV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gdGhpcy5fZG9jUm9vdDtcbiAgICAgICAgdmFyIG91dGVyRWxlbWVudCA9IHRoaXMuY29udGFpbmVyT3V0ZXIuZWxlbWVudDtcbiAgICAgICAgdmFyIGlucHV0RWxlbWVudCA9IHRoaXMuaW5wdXQuZWxlbWVudDtcbiAgICAgICAgZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fb25Ub3VjaEVuZCwgdHJ1ZSk7XG4gICAgICAgIG91dGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duLCB0cnVlKTtcbiAgICAgICAgb3V0ZXJFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gICAgICAgIGRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLl9vblRvdWNoTW92ZSk7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLl9vbk1vdXNlT3Zlcik7XG4gICAgICAgIGlmICh0aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIG91dGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX29uRm9jdXMpO1xuICAgICAgICAgICAgb3V0ZXJFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9vbkJsdXIpO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX29uS2V5VXApO1xuICAgICAgICBpbnB1dEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLl9vbklucHV0KTtcbiAgICAgICAgaW5wdXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fb25Gb2N1cyk7XG4gICAgICAgIGlucHV0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5fb25CbHVyKTtcbiAgICAgICAgaWYgKGlucHV0RWxlbWVudC5mb3JtKSB7XG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNldCcsIHRoaXMuX29uRm9ybVJlc2V0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25LZXlEb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICAgICAgdmFyIGhhc0FjdGl2ZURyb3Bkb3duID0gdGhpcy5kcm9wZG93bi5pc0FjdGl2ZTtcbiAgICAgICAgLypcbiAgICAgICAgU2VlOlxuICAgICAgICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvS2V5Ym9hcmRFdmVudC9rZXlcbiAgICAgICAgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VJX0V2ZW50cy9LZXlib2FyZF9ldmVudF9rZXlfdmFsdWVzXG4gICAgICAgIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1VURi0xNiNDb2RlX3BvaW50c19mcm9tX1UrMDEwMDAwX3RvX1UrMTBGRkZGIC0gVVRGLTE2IHN1cnJvZ2F0ZSBwYWlyc1xuICAgICAgICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzA4NjY1MzIgLSBcIlVuaWRlbnRpZmllZFwiIGZvciBtb2JpbGVcbiAgICAgICAgaHR0cDovL3d3dy51bmljb2RlLm9yZy92ZXJzaW9ucy9Vbmljb2RlNS4yLjAvY2gxNi5wZGYjRzE5NjM1IC0gVStGRkZGIGlzIHJlc2VydmVkIChTZWN0aW9uIDE2LjcpXG4gICAgXG4gICAgICAgIExvZ2ljOiB3aGVuIGEga2V5IGV2ZW50IGlzIHNlbnQsIGBldmVudC5rZXlgIHJlcHJlc2VudHMgaXRzIHByaW50YWJsZSB2YWx1ZSBfb3JfIG9uZVxuICAgICAgICBvZiBhIGxhcmdlIGxpc3Qgb2Ygc3BlY2lhbCB2YWx1ZXMgaW5kaWNhdGluZyBtZXRhIGtleXMvZnVuY3Rpb25hbGl0eS4gSW4gYWRkaXRpb24sXG4gICAgICAgIGtleSBldmVudHMgZm9yIGNvbXBvc2UgZnVuY3Rpb25hbGl0eSBjb250YWluIGEgdmFsdWUgb2YgYERlYWRgIHdoZW4gbWlkLWNvbXBvc2l0aW9uLlxuICAgIFxuICAgICAgICBJIGNhbid0IHF1aXRlIHZlcmlmeSBpdCwgYnV0IG5vbi1FbmdsaXNoIElNRXMgbWF5IGFsc28gYmUgYWJsZSB0byBnZW5lcmF0ZSBrZXkgY29kZXNcbiAgICAgICAgZm9yIGNvZGUgcG9pbnRzIGluIHRoZSBzdXJyb2dhdGUtcGFpciByYW5nZSwgd2hpY2ggY291bGQgcG90ZW50aWFsbHkgYmUgc2VlbiBhcyBoYXZpbmdcbiAgICAgICAga2V5Lmxlbmd0aCA+IDEuIFNpbmNlIGBGbmAgaXMgb25lIG9mIHRoZSBzcGVjaWFsIGtleXMsIHdlIGNhbid0IGRpc3Rpbmd1aXNoIGJ5IHRoYXRcbiAgICAgICAgYWxvbmUuXG4gICAgXG4gICAgICAgIEhlcmUsIGtleS5sZW5ndGggPT09IDEgbWVhbnMgd2Uga25vdyBmb3Igc3VyZSB0aGUgaW5wdXQgd2FzIHByaW50YWJsZSBhbmQgbm90IGEgc3BlY2lhbFxuICAgICAgICBga2V5YCB2YWx1ZS4gV2hlbiB0aGUgbGVuZ3RoIGlzIGdyZWF0ZXIgdGhhbiAxLCBpdCBjb3VsZCBiZSBlaXRoZXIgYSBwcmludGFibGUgc3Vycm9nYXRlXG4gICAgICAgIHBhaXIgb3IgYSBzcGVjaWFsIGBrZXlgIHZhbHVlLiBXZSBjYW4gdGVsbCB0aGUgZGlmZmVyZW5jZSBieSBjaGVja2luZyBpZiB0aGUgX2NoYXJhY3RlclxuICAgICAgICBjb2RlXyB2YWx1ZSAobm90IGNvZGUgcG9pbnQhKSBpcyBpbiB0aGUgXCJzdXJyb2dhdGUgcGFpclwiIHJhbmdlIG9yIG5vdC5cbiAgICBcbiAgICAgICAgV2UgZG9uJ3QgdXNlIC5jb2RlUG9pbnRBdCBiZWNhdXNlIGFuIGludmFsaWQgY29kZSBwb2ludCB3b3VsZCByZXR1cm4gNjU1MzUsIHdoaWNoIHdvdWxkbid0XG4gICAgICAgIHBhc3MgdGhlID49IDB4MTAwMDAgY2hlY2sgd2Ugd291bGQgb3RoZXJ3aXNlIHVzZS5cbiAgICBcbiAgICAgICAgPiAuLi5UaGUgVW5pY29kZSBTdGFuZGFyZCBzZXRzIGFzaWRlIDY2IG5vbmNoYXJhY3RlciBjb2RlIHBvaW50cy4gVGhlIGxhc3QgdHdvIGNvZGUgcG9pbnRzXG4gICAgICAgID4gb2YgZWFjaCBwbGFuZSBhcmUgbm9uY2hhcmFjdGVyczogVStGRkZFIGFuZCBVK0ZGRkYgb24gdGhlIEJNUC4uLlxuICAgICAgICAqL1xuICAgICAgICB2YXIgd2FzUHJpbnRhYmxlQ2hhciA9IGV2ZW50LmtleS5sZW5ndGggPT09IDEgfHxcbiAgICAgICAgICAgIChldmVudC5rZXkubGVuZ3RoID09PSAyICYmIGV2ZW50LmtleS5jaGFyQ29kZUF0KDApID49IDB4ZDgwMCkgfHxcbiAgICAgICAgICAgIGV2ZW50LmtleSA9PT0gJ1VuaWRlbnRpZmllZCc7XG4gICAgICAgIC8qXG4gICAgICAgICAgV2UgZG8gbm90IHNob3cgdGhlIGRyb3Bkb3duIGlmIGZvY3VzaW5nIG91dCB3aXRoIGVzYyBvciBuYXZpZ2F0aW5nIHRocm91Z2ggaW5wdXQgZmllbGRzLlxuICAgICAgICAgIEFuIGFjdGl2YXRlZCBzZWFyY2ggY2FuIHN0aWxsIGJlIG9wZW5lZCB3aXRoIGFueSBvdGhlciBrZXkuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIXRoaXMuX2lzVGV4dEVsZW1lbnQgJiZcbiAgICAgICAgICAgICFoYXNBY3RpdmVEcm9wZG93biAmJlxuICAgICAgICAgICAga2V5Q29kZSAhPT0gS2V5Q29kZU1hcC5FU0NfS0VZICYmXG4gICAgICAgICAgICBrZXlDb2RlICE9PSBLZXlDb2RlTWFwLlRBQl9LRVkgJiZcbiAgICAgICAgICAgIGtleUNvZGUgIT09IEtleUNvZGVNYXAuU0hJRlRfS0VZKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dEcm9wZG93bigpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlucHV0LmlzRm9jdXNzZWQgJiYgd2FzUHJpbnRhYmxlQ2hhcikge1xuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICBXZSB1cGRhdGUgdGhlIGlucHV0IHZhbHVlIHdpdGggdGhlIHByZXNzZWQga2V5IGFzXG4gICAgICAgICAgICAgICAgICB0aGUgaW5wdXQgd2FzIG5vdCBmb2N1c3NlZCBhdCB0aGUgdGltZSBvZiBrZXkgcHJlc3NcbiAgICAgICAgICAgICAgICAgIHRoZXJlZm9yZSBkb2VzIG5vdCBoYXZlIHRoZSB2YWx1ZSBvZiB0aGUga2V5LlxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC52YWx1ZSArPSBldmVudC5rZXk7XG4gICAgICAgICAgICAgICAgLy8gYnJvd3NlcnMgaW50ZXJwcmV0IGEgc3BhY2UgYXMgcGFnZWRvd25cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnICcpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIEtleUNvZGVNYXAuQV9LRVk6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29uU2VsZWN0S2V5KGV2ZW50LCB0aGlzLml0ZW1MaXN0LmVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKTtcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZU1hcC5FTlRFUl9LRVk6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29uRW50ZXJLZXkoZXZlbnQsIGhhc0FjdGl2ZURyb3Bkb3duKTtcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZU1hcC5FU0NfS0VZOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbkVzY2FwZUtleShldmVudCwgaGFzQWN0aXZlRHJvcGRvd24pO1xuICAgICAgICAgICAgY2FzZSBLZXlDb2RlTWFwLlVQX0tFWTpcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZU1hcC5QQUdFX1VQX0tFWTpcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZU1hcC5ET1dOX0tFWTpcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZU1hcC5QQUdFX0RPV05fS0VZOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbkRpcmVjdGlvbktleShldmVudCwgaGFzQWN0aXZlRHJvcGRvd24pO1xuICAgICAgICAgICAgY2FzZSBLZXlDb2RlTWFwLkRFTEVURV9LRVk6XG4gICAgICAgICAgICBjYXNlIEtleUNvZGVNYXAuQkFDS19LRVk6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29uRGVsZXRlS2V5KGV2ZW50LCB0aGlzLl9zdG9yZS5pdGVtcywgdGhpcy5pbnB1dC5pc0ZvY3Vzc2VkKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX29uS2V5VXAgPSBmdW5jdGlvbiAoIC8qIGV2ZW50OiBLZXlib2FyZEV2ZW50ICovKSB7XG4gICAgICAgIHRoaXMuX2NhblNlYXJjaCA9IHRoaXMuY29uZmlnLnNlYXJjaEVuYWJsZWQ7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25JbnB1dCA9IGZ1bmN0aW9uICggLyogZXZlbnQ6IElucHV0RXZlbnQgKi8pIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5pbnB1dC52YWx1ZTtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzVGV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVEcm9wZG93bih0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0b3BTZWFyY2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2NhbkFkZEl0ZW1zKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY2FuU2VhcmNoKSB7XG4gICAgICAgICAgICAvLyBkbyB0aGUgc2VhcmNoIGV2ZW4gaWYgdGhlIGVudGVyZWQgdGV4dCBjYW4gbm90IGJlIGFkZGVkXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVTZWFyY2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fY2FuQWRkVXNlckNob2ljZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgYSBub3RpY2UgbmVlZHMgdG8gYmUgZGlzcGxheWVkIGZvciB3aHkgYSBzZWFyY2ggcmVzdWx0IGNhbid0IGJlIGFkZGVkXG4gICAgICAgIHRoaXMuX2NhbkNyZWF0ZUl0ZW0odmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5faXNTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRQb3NpdGlvbiA9IDA7IC8vIHJlc2V0IHRvIHNlbGVjdCB0aGUgbm90aWNlIGFuZC9vciBleGFjdCBtYXRjaFxuICAgICAgICAgICAgdGhpcy5faGlnaGxpZ2h0Q2hvaWNlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9vblNlbGVjdEtleSA9IGZ1bmN0aW9uIChldmVudCwgaGFzSXRlbXMpIHtcbiAgICAgICAgLy8gSWYgQ1RSTCArIEEgb3IgQ01EICsgQSBoYXZlIGJlZW4gcHJlc3NlZCBhbmQgdGhlcmUgYXJlIGl0ZW1zIHRvIHNlbGVjdFxuICAgICAgICBpZiAoKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkgJiYgaGFzSXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhblNlYXJjaCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHNob3VsZEhpZ2h0bGlnaHRBbGwgPSB0aGlzLmNvbmZpZy5yZW1vdmVJdGVtcyAmJiAhdGhpcy5pbnB1dC52YWx1ZSAmJiB0aGlzLmlucHV0LmVsZW1lbnQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoc2hvdWxkSGlnaHRsaWdodEFsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0QWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9vbkVudGVyS2V5ID0gZnVuY3Rpb24gKGV2ZW50LCBoYXNBY3RpdmVEcm9wZG93bikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYnV0dG9uJykpIHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUJ1dHRvbkFjdGlvbih0YXJnZXQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzQWN0aXZlRHJvcGRvd24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1NlbGVjdEVsZW1lbnQgfHwgdGhpcy5fbm90aWNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RHJvcGRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGlnaGxpZ2h0ZWRDaG9pY2UgPSB0aGlzLmRyb3Bkb3duLmVsZW1lbnQucXVlcnlTZWxlY3RvcihnZXRDbGFzc05hbWVzU2VsZWN0b3IodGhpcy5jb25maWcuY2xhc3NOYW1lcy5oaWdobGlnaHRlZFN0YXRlKSk7XG4gICAgICAgIGlmIChoaWdobGlnaHRlZENob2ljZSAmJiB0aGlzLl9oYW5kbGVDaG9pY2VBY3Rpb24oaGlnaGxpZ2h0ZWRDaG9pY2UpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0YXJnZXQgfHwgIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVEcm9wZG93bih0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2NhbkFkZEl0ZW1zKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYWRkZWRJdGVtID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N0b3JlLndpdGhUeG4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYWRkZWRJdGVtID0gX3RoaXMuX2ZpbmRBbmRTZWxlY3RDaG9pY2VCeVZhbHVlKHZhbHVlLCB0cnVlKTtcbiAgICAgICAgICAgIGlmICghYWRkZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuQWRkVXNlckNob2ljZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl9jYW5DcmVhdGVJdGVtKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLl9hZGRDaG9pY2UobWFwSW5wdXRUb0Nob2ljZSh2YWx1ZSwgZmFsc2UsIF90aGlzLmNvbmZpZy5hbGxvd0h0bWxVc2VySW5wdXQpLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBhZGRlZEl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuY2xlYXJJbnB1dCgpO1xuICAgICAgICAgICAgX3RoaXMudW5oaWdobGlnaHRBbGwoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghYWRkZWRJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5jbG9zZURyb3Bkb3duT25TZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZURyb3Bkb3duKHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25Fc2NhcGVLZXkgPSBmdW5jdGlvbiAoZXZlbnQsIGhhc0FjdGl2ZURyb3Bkb3duKSB7XG4gICAgICAgIGlmIChoYXNBY3RpdmVEcm9wZG93bikge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmhpZGVEcm9wZG93bih0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BTZWFyY2goKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyT3V0ZXIuZWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25EaXJlY3Rpb25LZXkgPSBmdW5jdGlvbiAoZXZlbnQsIGhhc0FjdGl2ZURyb3Bkb3duKSB7XG4gICAgICAgIHZhciBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICAgICAgLy8gSWYgdXAgb3IgZG93biBrZXkgaXMgcHJlc3NlZCwgdHJhdmVyc2UgdGhyb3VnaCBvcHRpb25zXG4gICAgICAgIGlmIChoYXNBY3RpdmVEcm9wZG93biB8fCB0aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duKCk7XG4gICAgICAgICAgICB0aGlzLl9jYW5TZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb25JbnQgPSBrZXlDb2RlID09PSBLZXlDb2RlTWFwLkRPV05fS0VZIHx8IGtleUNvZGUgPT09IEtleUNvZGVNYXAuUEFHRV9ET1dOX0tFWSA/IDEgOiAtMTtcbiAgICAgICAgICAgIHZhciBza2lwS2V5ID0gZXZlbnQubWV0YUtleSB8fCBrZXlDb2RlID09PSBLZXlDb2RlTWFwLlBBR0VfRE9XTl9LRVkgfHwga2V5Q29kZSA9PT0gS2V5Q29kZU1hcC5QQUdFX1VQX0tFWTtcbiAgICAgICAgICAgIHZhciBuZXh0RWwgPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoc2tpcEtleSkge1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb25JbnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRFbCA9IHRoaXMuZHJvcGRvd24uZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiXCIuY29uY2F0KHNlbGVjdGFibGVDaG9pY2VJZGVudGlmaWVyLCBcIjpsYXN0LW9mLXR5cGVcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsID0gdGhpcy5kcm9wZG93bi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0YWJsZUNob2ljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50RWwgPSB0aGlzLmRyb3Bkb3duLmVsZW1lbnQucXVlcnlTZWxlY3RvcihnZXRDbGFzc05hbWVzU2VsZWN0b3IodGhpcy5jb25maWcuY2xhc3NOYW1lcy5oaWdobGlnaHRlZFN0YXRlKSk7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRFbCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0RWwgPSBnZXRBZGphY2VudEVsKGN1cnJlbnRFbCwgc2VsZWN0YWJsZUNob2ljZUlkZW50aWZpZXIsIGRpcmVjdGlvbkludCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXh0RWwgPSB0aGlzLmRyb3Bkb3duLmVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RhYmxlQ2hvaWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5leHRFbCkge1xuICAgICAgICAgICAgICAgIC8vIFdlIHByZXZlbnQgZGVmYXVsdCB0byBzdG9wIHRoZSBjdXJzb3IgbW92aW5nXG4gICAgICAgICAgICAgICAgLy8gd2hlbiBwcmVzc2luZyB0aGUgYXJyb3dcbiAgICAgICAgICAgICAgICBpZiAoIWlzU2Nyb2xsZWRJbnRvVmlldyhuZXh0RWwsIHRoaXMuY2hvaWNlTGlzdC5lbGVtZW50LCBkaXJlY3Rpb25JbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvaWNlTGlzdC5zY3JvbGxUb0NoaWxkRWxlbWVudChuZXh0RWwsIGRpcmVjdGlvbkludCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2hpZ2hsaWdodENob2ljZShuZXh0RWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUHJldmVudCBkZWZhdWx0IHRvIG1haW50YWluIGN1cnNvciBwb3NpdGlvbiB3aGlsc3RcbiAgICAgICAgICAgIC8vIHRyYXZlcnNpbmcgZHJvcGRvd24gb3B0aW9uc1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX29uRGVsZXRlS2V5ID0gZnVuY3Rpb24gKGV2ZW50LCBpdGVtcywgaGFzRm9jdXNlZElucHV0KSB7XG4gICAgICAgIC8vIElmIGJhY2tzcGFjZSBvciBkZWxldGUga2V5IGlzIHByZXNzZWQgYW5kIHRoZSBpbnB1dCBoYXMgbm8gdmFsdWVcbiAgICAgICAgaWYgKCF0aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQgJiYgIWV2ZW50LnRhcmdldC52YWx1ZSAmJiBoYXNGb2N1c2VkSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUJhY2tzcGFjZShpdGVtcyk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25Ub3VjaE1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl93YXNUYXApIHtcbiAgICAgICAgICAgIHRoaXMuX3dhc1RhcCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25Ub3VjaEVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gKGV2ZW50IHx8IGV2ZW50LnRvdWNoZXNbMF0pLnRhcmdldDtcbiAgICAgICAgdmFyIHRvdWNoV2FzV2l0aGluQ29udGFpbmVyID0gdGhpcy5fd2FzVGFwICYmIHRoaXMuY29udGFpbmVyT3V0ZXIuZWxlbWVudC5jb250YWlucyh0YXJnZXQpO1xuICAgICAgICBpZiAodG91Y2hXYXNXaXRoaW5Db250YWluZXIpIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXJXYXNFeGFjdFRhcmdldCA9IHRhcmdldCA9PT0gdGhpcy5jb250YWluZXJPdXRlci5lbGVtZW50IHx8IHRhcmdldCA9PT0gdGhpcy5jb250YWluZXJJbm5lci5lbGVtZW50O1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lcldhc0V4YWN0VGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzVGV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9pc1NlbGVjdE11bHRpcGxlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dEcm9wZG93bigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFByZXZlbnRzIGZvY3VzIGV2ZW50IGZpcmluZ1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fd2FzVGFwID0gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgbW91c2Vkb3duIGV2ZW50IGluIGNhcHR1cmUgbW9kZSBmb3IgY29udGFpbmV0T3V0ZXIuZWxlbWVudFxuICAgICAqL1xuICAgIENob2ljZXMucHJvdG90eXBlLl9vbk1vdXNlRG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB3ZSBoYXZlIG91ciBtb3VzZSBkb3duIG9uIHRoZSBzY3JvbGxiYXIgYW5kIGFyZSBvbiBJRTExLi4uXG4gICAgICAgIGlmIChJU19JRTExICYmIHRoaXMuY2hvaWNlTGlzdC5lbGVtZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGNsaWNrIHdhcyBvbiBhIHNjcm9sbGJhciBhcmVhXG4gICAgICAgICAgICB2YXIgZmlyc3RDaG9pY2UgPSB0aGlzLmNob2ljZUxpc3QuZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIHRoaXMuX2lzU2Nyb2xsaW5nT25JZSA9XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID09PSAnbHRyJyA/IGV2ZW50Lm9mZnNldFggPj0gZmlyc3RDaG9pY2Uub2Zmc2V0V2lkdGggOiBldmVudC5vZmZzZXRYIDwgZmlyc3RDaG9pY2Uub2Zmc2V0TGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0ID09PSB0aGlzLmlucHV0LmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXRlbSA9IHRhcmdldC5jbG9zZXN0KCdbZGF0YS1idXR0b25dLFtkYXRhLWl0ZW1dLFtkYXRhLWNob2ljZV0nKTtcbiAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKCdidXR0b24nIGluIGl0ZW0uZGF0YXNldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUJ1dHRvbkFjdGlvbihpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCdpdGVtJyBpbiBpdGVtLmRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVJdGVtQWN0aW9uKGl0ZW0sIGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCdjaG9pY2UnIGluIGl0ZW0uZGF0YXNldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUNob2ljZUFjdGlvbihpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBtb3VzZW92ZXIgZXZlbnQgb3ZlciB0aGlzLmRyb3Bkb3duXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIENob2ljZXMucHJvdG90eXBlLl9vbk1vdXNlT3ZlciA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gX2EudGFyZ2V0O1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgJ2Nob2ljZScgaW4gdGFyZ2V0LmRhdGFzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZ2hsaWdodENob2ljZSh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fb25DbGljayA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gX2EudGFyZ2V0O1xuICAgICAgICB2YXIgY29udGFpbmVyT3V0ZXIgPSB0aGlzLmNvbnRhaW5lck91dGVyO1xuICAgICAgICB2YXIgY2xpY2tXYXNXaXRoaW5Db250YWluZXIgPSBjb250YWluZXJPdXRlci5lbGVtZW50LmNvbnRhaW5zKHRhcmdldCk7XG4gICAgICAgIGlmIChjbGlja1dhc1dpdGhpbkNvbnRhaW5lcikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duLmlzQWN0aXZlICYmICFjb250YWluZXJPdXRlci5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzVGV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRoaXMuaW5wdXQuZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dEcm9wZG93bigpO1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJPdXRlci5lbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5faXNTZWxlY3RPbmVFbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgdGFyZ2V0ICE9PSB0aGlzLmlucHV0LmVsZW1lbnQgJiZcbiAgICAgICAgICAgICAgICAhdGhpcy5kcm9wZG93bi5lbGVtZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVEcm9wZG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyT3V0ZXIucmVtb3ZlRm9jdXNTdGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5oaWRlRHJvcGRvd24odHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnVuaGlnaGxpZ2h0QWxsKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9vbkZvY3VzID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBfYS50YXJnZXQ7XG4gICAgICAgIHZhciBjb250YWluZXJPdXRlciA9IHRoaXMuY29udGFpbmVyT3V0ZXI7XG4gICAgICAgIHZhciBmb2N1c1dhc1dpdGhpbkNvbnRhaW5lciA9IHRhcmdldCAmJiBjb250YWluZXJPdXRlci5lbGVtZW50LmNvbnRhaW5zKHRhcmdldCk7XG4gICAgICAgIGlmICghZm9jdXNXYXNXaXRoaW5Db250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGFyZ2V0SXNJbnB1dCA9IHRhcmdldCA9PT0gdGhpcy5pbnB1dC5lbGVtZW50O1xuICAgICAgICBpZiAodGhpcy5faXNUZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldElzSW5wdXQpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJPdXRlci5hZGRGb2N1c1N0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5faXNTZWxlY3RNdWx0aXBsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXRJc0lucHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RHJvcGRvd24odHJ1ZSk7XG4gICAgICAgICAgICAgICAgLy8gSWYgZWxlbWVudCBpcyBhIHNlbGVjdCBib3gsIHRoZSBmb2N1c2VkIGVsZW1lbnQgaXMgdGhlIGNvbnRhaW5lciBhbmQgdGhlIGRyb3Bkb3duXG4gICAgICAgICAgICAgICAgLy8gaXNuJ3QgYWxyZWFkeSBvcGVuLCBmb2N1cyBhbmQgc2hvdyBkcm9wZG93blxuICAgICAgICAgICAgICAgIGNvbnRhaW5lck91dGVyLmFkZEZvY3VzU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lck91dGVyLmFkZEZvY3VzU3RhdGUoKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXRJc0lucHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RHJvcGRvd24odHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9vbkJsdXIgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IF9hLnRhcmdldDtcbiAgICAgICAgdmFyIGNvbnRhaW5lck91dGVyID0gdGhpcy5jb250YWluZXJPdXRlcjtcbiAgICAgICAgdmFyIGJsdXJXYXNXaXRoaW5Db250YWluZXIgPSB0YXJnZXQgJiYgY29udGFpbmVyT3V0ZXIuZWxlbWVudC5jb250YWlucyh0YXJnZXQpO1xuICAgICAgICBpZiAoYmx1cldhc1dpdGhpbkNvbnRhaW5lciAmJiAhdGhpcy5faXNTY3JvbGxpbmdPbkllKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09PSB0aGlzLmlucHV0LmVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJPdXRlci5yZW1vdmVGb2N1c1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJvcGRvd24odHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzVGV4dEVsZW1lbnQgfHwgdGhpcy5faXNTZWxlY3RNdWx0aXBsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bmhpZ2hsaWdodEFsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gdGhpcy5jb250YWluZXJPdXRlci5lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBmb2N1cyBzdGF0ZSB3aGVuIHRoZSBwYXN0IG91dGVyQ29udGFpbmVyIHdhcyB0aGUgdGFyZ2V0XG4gICAgICAgICAgICAgICAgY29udGFpbmVyT3V0ZXIucmVtb3ZlRm9jdXNTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gT24gSUUxMSwgY2xpY2tpbmcgdGhlIHNjb2xsYmFyIGJsdXJzIG91ciBpbnB1dCBhbmQgdGh1c1xuICAgICAgICAgICAgLy8gY2xvc2VzIHRoZSBkcm9wZG93bi4gVG8gc3RvcCB0aGlzLCB3ZSByZWZvY3VzIG91ciBpbnB1dFxuICAgICAgICAgICAgLy8gaWYgd2Uga25vdyB3ZSBhcmUgb24gSUUgKmFuZCogYXJlIHNjcm9sbGluZy5cbiAgICAgICAgICAgIHRoaXMuX2lzU2Nyb2xsaW5nT25JZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5lbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9vbkZvcm1SZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fc3RvcmUud2l0aFR4bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5jbGVhcklucHV0KCk7XG4gICAgICAgICAgICBfdGhpcy5oaWRlRHJvcGRvd24oKTtcbiAgICAgICAgICAgIF90aGlzLnJlZnJlc2goZmFsc2UsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5faW5pdGlhbEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNldENob2ljZUJ5VmFsdWUoX3RoaXMuX2luaXRpYWxJdGVtcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2hpZ2hsaWdodENob2ljZSA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBpZiAoZWwgPT09IHZvaWQgMCkgeyBlbCA9IG51bGw7IH1cbiAgICAgICAgdmFyIGNob2ljZXMgPSBBcnJheS5mcm9tKHRoaXMuZHJvcGRvd24uZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdGFibGVDaG9pY2VJZGVudGlmaWVyKSk7XG4gICAgICAgIGlmICghY2hvaWNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFzc2VkRWwgPSBlbDtcbiAgICAgICAgdmFyIGhpZ2hsaWdodGVkU3RhdGUgPSB0aGlzLmNvbmZpZy5jbGFzc05hbWVzLmhpZ2hsaWdodGVkU3RhdGU7XG4gICAgICAgIHZhciBoaWdobGlnaHRlZENob2ljZXMgPSBBcnJheS5mcm9tKHRoaXMuZHJvcGRvd24uZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGdldENsYXNzTmFtZXNTZWxlY3RvcihoaWdobGlnaHRlZFN0YXRlKSkpO1xuICAgICAgICAvLyBSZW1vdmUgYW55IGhpZ2hsaWdodGVkIGNob2ljZXNcbiAgICAgICAgaGlnaGxpZ2h0ZWRDaG9pY2VzLmZvckVhY2goZnVuY3Rpb24gKGNob2ljZSkge1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3Nlc0Zyb21FbGVtZW50KGNob2ljZSwgaGlnaGxpZ2h0ZWRTdGF0ZSk7XG4gICAgICAgICAgICBjaG9pY2Uuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocGFzc2VkRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZ2hsaWdodFBvc2l0aW9uID0gY2hvaWNlcy5pbmRleE9mKHBhc3NlZEVsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEhpZ2hsaWdodCBjaG9pY2UgYmFzZWQgb24gbGFzdCBrbm93biBoaWdobGlnaHQgbG9jYXRpb25cbiAgICAgICAgICAgIGlmIChjaG9pY2VzLmxlbmd0aCA+IHRoaXMuX2hpZ2hsaWdodFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhbiBvcHRpb24gdG8gaGlnaGxpZ2h0XG4gICAgICAgICAgICAgICAgcGFzc2VkRWwgPSBjaG9pY2VzW3RoaXMuX2hpZ2hsaWdodFBvc2l0aW9uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBoaWdobGlnaHQgdGhlIG9wdGlvbiBiZWZvcmVcbiAgICAgICAgICAgICAgICBwYXNzZWRFbCA9IGNob2ljZXNbY2hvaWNlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcGFzc2VkRWwpIHtcbiAgICAgICAgICAgICAgICBwYXNzZWRFbCA9IGNob2ljZXNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYWRkQ2xhc3Nlc1RvRWxlbWVudChwYXNzZWRFbCwgaGlnaGxpZ2h0ZWRTdGF0ZSk7XG4gICAgICAgIHBhc3NlZEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICAgIHRoaXMucGFzc2VkRWxlbWVudC50cmlnZ2VyRXZlbnQoRXZlbnRUeXBlLmhpZ2hsaWdodENob2ljZSwge1xuICAgICAgICAgICAgZWw6IHBhc3NlZEVsLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuZHJvcGRvd24uaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIC8vIElFMTEgaWdub3JlcyBhcmlhLWxhYmVsIGFuZCBibG9ja3MgdmlydHVhbCBrZXlib2FyZFxuICAgICAgICAgICAgLy8gaWYgYXJpYS1hY3RpdmVkZXNjZW5kYW50IGlzIHNldCB3aXRob3V0IGEgZHJvcGRvd25cbiAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0QWN0aXZlRGVzY2VuZGFudChwYXNzZWRFbC5pZCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lck91dGVyLnNldEFjdGl2ZURlc2NlbmRhbnQocGFzc2VkRWwuaWQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fYWRkSXRlbSA9IGZ1bmN0aW9uIChpdGVtLCB3aXRoRXZlbnRzLCB1c2VyVHJpZ2dlcmVkKSB7XG4gICAgICAgIGlmICh3aXRoRXZlbnRzID09PSB2b2lkIDApIHsgd2l0aEV2ZW50cyA9IHRydWU7IH1cbiAgICAgICAgaWYgKHVzZXJUcmlnZ2VyZWQgPT09IHZvaWQgMCkgeyB1c2VyVHJpZ2dlcmVkID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKCFpdGVtLmlkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpdGVtLmlkIG11c3QgYmUgc2V0IGJlZm9yZSBfYWRkSXRlbSBpcyBjYWxsZWQgZm9yIGEgY2hvaWNlL2l0ZW0nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25maWcuc2luZ2xlTW9kZUZvck11bHRpU2VsZWN0IHx8IHRoaXMuX2lzU2VsZWN0T25lRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBY3RpdmVJdGVtcyhpdGVtLmlkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChhZGRJdGVtKGl0ZW0pKTtcbiAgICAgICAgaWYgKHdpdGhFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc2VkRWxlbWVudC50cmlnZ2VyRXZlbnQoRXZlbnRUeXBlLmFkZEl0ZW0sIHRoaXMuX2dldENob2ljZUZvck91dHB1dChpdGVtKSk7XG4gICAgICAgICAgICBpZiAodXNlclRyaWdnZXJlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFzc2VkRWxlbWVudC50cmlnZ2VyRXZlbnQoRXZlbnRUeXBlLmNob2ljZSwgdGhpcy5fZ2V0Q2hvaWNlRm9yT3V0cHV0KGl0ZW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX3JlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpZiAoIWl0ZW0uaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChyZW1vdmVJdGVtJDEoaXRlbSkpO1xuICAgICAgICB2YXIgbm90aWNlID0gdGhpcy5fbm90aWNlO1xuICAgICAgICBpZiAobm90aWNlICYmIG5vdGljZS50eXBlID09PSBOb3RpY2VUeXBlcy5ub0Nob2ljZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyTm90aWNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXNzZWRFbGVtZW50LnRyaWdnZXJFdmVudChFdmVudFR5cGUucmVtb3ZlSXRlbSwgdGhpcy5fZ2V0Q2hvaWNlRm9yT3V0cHV0KGl0ZW0pKTtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9hZGRDaG9pY2UgPSBmdW5jdGlvbiAoY2hvaWNlLCB3aXRoRXZlbnRzLCB1c2VyVHJpZ2dlcmVkKSB7XG4gICAgICAgIGlmICh3aXRoRXZlbnRzID09PSB2b2lkIDApIHsgd2l0aEV2ZW50cyA9IHRydWU7IH1cbiAgICAgICAgaWYgKHVzZXJUcmlnZ2VyZWQgPT09IHZvaWQgMCkgeyB1c2VyVHJpZ2dlcmVkID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKGNob2ljZS5pZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FuIG5vdCByZS1hZGQgYSBjaG9pY2Ugd2hpY2ggaGFzIGFscmVhZHkgYmVlbiBhZGRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgICAgaWYgKCh0aGlzLl9pc1NlbGVjdEVsZW1lbnQgfHwgIWNvbmZpZy5kdXBsaWNhdGVJdGVtc0FsbG93ZWQpICYmXG4gICAgICAgICAgICB0aGlzLl9zdG9yZS5jaG9pY2VzLmZpbmQoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGNvbmZpZy52YWx1ZUNvbXBhcmVyKGMudmFsdWUsIGNob2ljZS52YWx1ZSk7IH0pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2VuZXJhdGUgdW5pcXVlIGlkLCBpbi1wbGFjZSB1cGRhdGUgaXMgcmVxdWlyZWQgc28gY2hhaW5pbmcgX2FkZEl0ZW0gd29ya3MgYXMgZXhwZWN0ZWRcbiAgICAgICAgdGhpcy5fbGFzdEFkZGVkQ2hvaWNlSWQrKztcbiAgICAgICAgY2hvaWNlLmlkID0gdGhpcy5fbGFzdEFkZGVkQ2hvaWNlSWQ7XG4gICAgICAgIGNob2ljZS5lbGVtZW50SWQgPSBcIlwiLmNvbmNhdCh0aGlzLl9iYXNlSWQsIFwiLVwiKS5jb25jYXQodGhpcy5faWROYW1lcy5pdGVtQ2hvaWNlLCBcIi1cIikuY29uY2F0KGNob2ljZS5pZCk7XG4gICAgICAgIHZhciBwcmVwZW5kVmFsdWUgPSBjb25maWcucHJlcGVuZFZhbHVlLCBhcHBlbmRWYWx1ZSA9IGNvbmZpZy5hcHBlbmRWYWx1ZTtcbiAgICAgICAgaWYgKHByZXBlbmRWYWx1ZSkge1xuICAgICAgICAgICAgY2hvaWNlLnZhbHVlID0gcHJlcGVuZFZhbHVlICsgY2hvaWNlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcHBlbmRWYWx1ZSkge1xuICAgICAgICAgICAgY2hvaWNlLnZhbHVlICs9IGFwcGVuZFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChwcmVwZW5kVmFsdWUgfHwgYXBwZW5kVmFsdWUpICYmIGNob2ljZS5lbGVtZW50KSB7XG4gICAgICAgICAgICBjaG9pY2UuZWxlbWVudC52YWx1ZSA9IGNob2ljZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jbGVhck5vdGljZSgpO1xuICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChhZGRDaG9pY2UoY2hvaWNlKSk7XG4gICAgICAgIGlmIChjaG9pY2Uuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZEl0ZW0oY2hvaWNlLCB3aXRoRXZlbnRzLCB1c2VyVHJpZ2dlcmVkKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX2FkZEdyb3VwID0gZnVuY3Rpb24gKGdyb3VwLCB3aXRoRXZlbnRzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh3aXRoRXZlbnRzID09PSB2b2lkIDApIHsgd2l0aEV2ZW50cyA9IHRydWU7IH1cbiAgICAgICAgaWYgKGdyb3VwLmlkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW4gbm90IHJlLWFkZCBhIGdyb3VwIHdoaWNoIGhhcyBhbHJlYWR5IGJlZW4gYWRkZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChhZGRHcm91cChncm91cCkpO1xuICAgICAgICBpZiAoIWdyb3VwLmNob2ljZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBhZGQgdW5pcXVlIGlkIGZvciB0aGUgZ3JvdXAocyksIGFuZCBkbyBub3Qgc3RvcmUgdGhlIGZ1bGwgbGlzdCBvZiBjaG9pY2VzIGluIHRoaXMgZ3JvdXBcbiAgICAgICAgdGhpcy5fbGFzdEFkZGVkR3JvdXBJZCsrO1xuICAgICAgICBncm91cC5pZCA9IHRoaXMuX2xhc3RBZGRlZEdyb3VwSWQ7XG4gICAgICAgIGdyb3VwLmNob2ljZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5ncm91cCA9IGdyb3VwO1xuICAgICAgICAgICAgaWYgKGdyb3VwLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5fYWRkQ2hvaWNlKGl0ZW0sIHdpdGhFdmVudHMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9jcmVhdGVUZW1wbGF0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBjYWxsYmFja09uQ3JlYXRlVGVtcGxhdGVzID0gdGhpcy5jb25maWcuY2FsbGJhY2tPbkNyZWF0ZVRlbXBsYXRlcztcbiAgICAgICAgdmFyIHVzZXJUZW1wbGF0ZXMgPSB7fTtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja09uQ3JlYXRlVGVtcGxhdGVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB1c2VyVGVtcGxhdGVzID0gY2FsbGJhY2tPbkNyZWF0ZVRlbXBsYXRlcy5jYWxsKHRoaXMsIHN0clRvRWwsIGVzY2FwZUZvclRlbXBsYXRlLCBnZXRDbGFzc05hbWVzKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGVtcGxhdGluZyA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl90ZW1wbGF0ZXMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGlmIChuYW1lIGluIHVzZXJUZW1wbGF0ZXMpIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0aW5nW25hbWVdID0gdXNlclRlbXBsYXRlc1tuYW1lXS5iaW5kKF90aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRpbmdbbmFtZV0gPSBfdGhpcy5fdGVtcGxhdGVzW25hbWVdLmJpbmQoX3RoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fdGVtcGxhdGVzID0gdGVtcGxhdGluZztcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9jcmVhdGVFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRlbXBsYXRpbmcgPSB0aGlzLl90ZW1wbGF0ZXM7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGNvbmZpZyA9IF9hLmNvbmZpZywgaXNTZWxlY3RPbmVFbGVtZW50ID0gX2EuX2lzU2VsZWN0T25lRWxlbWVudDtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gY29uZmlnLnBvc2l0aW9uLCBjbGFzc05hbWVzID0gY29uZmlnLmNsYXNzTmFtZXM7XG4gICAgICAgIHZhciBlbGVtZW50VHlwZSA9IHRoaXMuX2VsZW1lbnRUeXBlO1xuICAgICAgICB0aGlzLmNvbnRhaW5lck91dGVyID0gbmV3IENvbnRhaW5lcih7XG4gICAgICAgICAgICBlbGVtZW50OiB0ZW1wbGF0aW5nLmNvbnRhaW5lck91dGVyKGNvbmZpZywgdGhpcy5fZGlyZWN0aW9uLCB0aGlzLl9pc1NlbGVjdEVsZW1lbnQsIGlzU2VsZWN0T25lRWxlbWVudCwgY29uZmlnLnNlYXJjaEVuYWJsZWQsIGVsZW1lbnRUeXBlLCBjb25maWcubGFiZWxJZCksXG4gICAgICAgICAgICBjbGFzc05hbWVzOiBjbGFzc05hbWVzLFxuICAgICAgICAgICAgdHlwZTogZWxlbWVudFR5cGUsXG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcklubmVyID0gbmV3IENvbnRhaW5lcih7XG4gICAgICAgICAgICBlbGVtZW50OiB0ZW1wbGF0aW5nLmNvbnRhaW5lcklubmVyKGNvbmZpZyksXG4gICAgICAgICAgICBjbGFzc05hbWVzOiBjbGFzc05hbWVzLFxuICAgICAgICAgICAgdHlwZTogZWxlbWVudFR5cGUsXG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmlucHV0ID0gbmV3IElucHV0KHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRlbXBsYXRpbmcuaW5wdXQoY29uZmlnLCB0aGlzLl9wbGFjZWhvbGRlclZhbHVlKSxcbiAgICAgICAgICAgIGNsYXNzTmFtZXM6IGNsYXNzTmFtZXMsXG4gICAgICAgICAgICB0eXBlOiBlbGVtZW50VHlwZSxcbiAgICAgICAgICAgIHByZXZlbnRQYXN0ZTogIWNvbmZpZy5wYXN0ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2hvaWNlTGlzdCA9IG5ldyBMaXN0KHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRlbXBsYXRpbmcuY2hvaWNlTGlzdChjb25maWcsIGlzU2VsZWN0T25lRWxlbWVudCksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLml0ZW1MaXN0ID0gbmV3IExpc3Qoe1xuICAgICAgICAgICAgZWxlbWVudDogdGVtcGxhdGluZy5pdGVtTGlzdChjb25maWcsIGlzU2VsZWN0T25lRWxlbWVudCksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRyb3Bkb3duID0gbmV3IERyb3Bkb3duKHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRlbXBsYXRpbmcuZHJvcGRvd24oY29uZmlnKSxcbiAgICAgICAgICAgIGNsYXNzTmFtZXM6IGNsYXNzTmFtZXMsXG4gICAgICAgICAgICB0eXBlOiBlbGVtZW50VHlwZSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fY3JlYXRlU3RydWN0dXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBjb250YWluZXJJbm5lciA9IF9hLmNvbnRhaW5lcklubmVyLCBjb250YWluZXJPdXRlciA9IF9hLmNvbnRhaW5lck91dGVyLCBwYXNzZWRFbGVtZW50ID0gX2EucGFzc2VkRWxlbWVudDtcbiAgICAgICAgdmFyIGRyb3Bkb3duRWxlbWVudCA9IHRoaXMuZHJvcGRvd24uZWxlbWVudDtcbiAgICAgICAgLy8gSGlkZSBvcmlnaW5hbCBlbGVtZW50XG4gICAgICAgIHBhc3NlZEVsZW1lbnQuY29uY2VhbCgpO1xuICAgICAgICAvLyBXcmFwIGlucHV0IGluIGNvbnRhaW5lciBwcmVzZXJ2aW5nIERPTSBvcmRlcmluZ1xuICAgICAgICBjb250YWluZXJJbm5lci53cmFwKHBhc3NlZEVsZW1lbnQuZWxlbWVudCk7XG4gICAgICAgIC8vIFdyYXBwZXIgaW5uZXIgY29udGFpbmVyIHdpdGggb3V0ZXIgY29udGFpbmVyXG4gICAgICAgIGNvbnRhaW5lck91dGVyLndyYXAoY29udGFpbmVySW5uZXIuZWxlbWVudCk7XG4gICAgICAgIGlmICh0aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQucGxhY2Vob2xkZXIgPSB0aGlzLmNvbmZpZy5zZWFyY2hQbGFjZWhvbGRlclZhbHVlIHx8ICcnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3BsYWNlaG9sZGVyVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnBsYWNlaG9sZGVyID0gdGhpcy5fcGxhY2Vob2xkZXJWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0V2lkdGgoKTtcbiAgICAgICAgfVxuICAgICAgICBjb250YWluZXJPdXRlci5lbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcklubmVyLmVsZW1lbnQpO1xuICAgICAgICBjb250YWluZXJPdXRlci5lbGVtZW50LmFwcGVuZENoaWxkKGRyb3Bkb3duRWxlbWVudCk7XG4gICAgICAgIGNvbnRhaW5lcklubmVyLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pdGVtTGlzdC5lbGVtZW50KTtcbiAgICAgICAgZHJvcGRvd25FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2hvaWNlTGlzdC5lbGVtZW50KTtcbiAgICAgICAgaWYgKCF0aGlzLl9pc1NlbGVjdE9uZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcklubmVyLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pbnB1dC5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvbmZpZy5zZWFyY2hFbmFibGVkKSB7XG4gICAgICAgICAgICBkcm9wZG93bkVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuaW5wdXQuZWxlbWVudCwgZHJvcGRvd25FbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hpZ2hsaWdodFBvc2l0aW9uID0gMDtcbiAgICAgICAgdGhpcy5faXNTZWFyY2hpbmcgPSBmYWxzZTtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9pbml0U3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3N0b3JlLnN1YnNjcmliZSh0aGlzLl9yZW5kZXIpLndpdGhUeG4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX2FkZFByZWRlZmluZWRDaG9pY2VzKF90aGlzLl9wcmVzZXRDaG9pY2VzLCBfdGhpcy5faXNTZWxlY3RPbmVFbGVtZW50ICYmICFfdGhpcy5faGFzTm9uQ2hvaWNlUGxhY2Vob2xkZXIsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdGhpcy5fc3RvcmUuY2hvaWNlcy5sZW5ndGggfHwgKHRoaXMuX2lzU2VsZWN0T25lRWxlbWVudCAmJiB0aGlzLl9oYXNOb25DaG9pY2VQbGFjZWhvbGRlcikpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaG9pY2VzLnByb3RvdHlwZS5fYWRkUHJlZGVmaW5lZENob2ljZXMgPSBmdW5jdGlvbiAoY2hvaWNlcywgc2VsZWN0Rmlyc3RPcHRpb24sIHdpdGhFdmVudHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGVjdEZpcnN0T3B0aW9uID09PSB2b2lkIDApIHsgc2VsZWN0Rmlyc3RPcHRpb24gPSBmYWxzZTsgfVxuICAgICAgICBpZiAod2l0aEV2ZW50cyA9PT0gdm9pZCAwKSB7IHdpdGhFdmVudHMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChzZWxlY3RGaXJzdE9wdGlvbikge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiB0aGVyZSBpcyBhIHNlbGVjdGVkIGNob2ljZSBhbHJlYWR5IG9yIHRoZSBjaG9pY2UgaXMgbm90IHRoZSBmaXJzdCBpblxuICAgICAgICAgICAgICogdGhlIGFycmF5LCBhZGQgZWFjaCBjaG9pY2Ugbm9ybWFsbHkuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogT3RoZXJ3aXNlIHdlIHByZS1zZWxlY3QgdGhlIGZpcnN0IGVuYWJsZWQgY2hvaWNlIGluIHRoZSBhcnJheSAoXCJzZWxlY3Qtb25lXCIgb25seSlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFyIG5vU2VsZWN0ZWRDaG9pY2VzID0gY2hvaWNlcy5maW5kSW5kZXgoZnVuY3Rpb24gKGNob2ljZSkgeyByZXR1cm4gY2hvaWNlLnNlbGVjdGVkOyB9KSA9PT0gLTE7XG4gICAgICAgICAgICBpZiAobm9TZWxlY3RlZENob2ljZXMpIHtcbiAgICAgICAgICAgICAgICBjaG9pY2VzLnNvbWUoZnVuY3Rpb24gKGNob2ljZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hvaWNlLmRpc2FibGVkIHx8ICdjaG9pY2VzJyBpbiBjaG9pY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaG9pY2Uuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaG9pY2VzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmICgnY2hvaWNlcycgaW4gaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5faXNTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9hZGRHcm91cChpdGVtLCB3aXRoRXZlbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fYWRkQ2hvaWNlKGl0ZW0sIHdpdGhFdmVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9maW5kQW5kU2VsZWN0Q2hvaWNlQnlWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgdXNlclRyaWdnZXJlZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodXNlclRyaWdnZXJlZCA9PT0gdm9pZCAwKSB7IHVzZXJUcmlnZ2VyZWQgPSBmYWxzZTsgfVxuICAgICAgICAvLyBDaGVjayAndmFsdWUnIHByb3BlcnR5IGV4aXN0cyBhbmQgdGhlIGNob2ljZSBpc24ndCBhbHJlYWR5IHNlbGVjdGVkXG4gICAgICAgIHZhciBmb3VuZENob2ljZSA9IHRoaXMuX3N0b3JlLmNob2ljZXMuZmluZChmdW5jdGlvbiAoY2hvaWNlKSB7IHJldHVybiBfdGhpcy5jb25maWcudmFsdWVDb21wYXJlcihjaG9pY2UudmFsdWUsIHZhbHVlKTsgfSk7XG4gICAgICAgIGlmIChmb3VuZENob2ljZSAmJiAhZm91bmRDaG9pY2UuZGlzYWJsZWQgJiYgIWZvdW5kQ2hvaWNlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRJdGVtKGZvdW5kQ2hvaWNlLCB0cnVlLCB1c2VyVHJpZ2dlcmVkKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIENob2ljZXMucHJvdG90eXBlLl9nZW5lcmF0ZVBsYWNlaG9sZGVyVmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgICAgaWYgKCFjb25maWcucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9oYXNOb25DaG9pY2VQbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5wbGFjZWhvbGRlclZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pc1NlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlck9wdGlvbiA9IHRoaXMucGFzc2VkRWxlbWVudC5wbGFjZWhvbGRlck9wdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBwbGFjZWhvbGRlck9wdGlvbiA/IHBsYWNlaG9sZGVyT3B0aW9uLnRleHQgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgQ2hvaWNlcy5wcm90b3R5cGUuX3dhcm5DaG9pY2VzSW5pdEZhaWxlZCA9IGZ1bmN0aW9uIChjYWxsZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNpbGVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXNlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlwiLmNvbmNhdChjYWxsZXIsIFwiIGNhbGxlZCBvbiBhIG5vbi1pbml0aWFsaXNlZCBpbnN0YW5jZSBvZiBDaG9pY2VzXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghdGhpcy5pbml0aWFsaXNlZE9LKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiXCIuY29uY2F0KGNhbGxlciwgXCIgY2FsbGVkIGZvciBhbiBlbGVtZW50IHdoaWNoIGhhcyBtdWx0aXBsZSBpbnN0YW5jZXMgb2YgQ2hvaWNlcyBpbml0aWFsaXNlZCBvbiBpdFwiKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENob2ljZXMudmVyc2lvbiA9ICcxMS4wLjMnO1xuICAgIHJldHVybiBDaG9pY2VzO1xufSgpKTtcblxuZXhwb3J0IHsgQ2hvaWNlcyBhcyBkZWZhdWx0IH07XG4iLCAiaW1wb3J0IENob2ljZXMgZnJvbSAnY2hvaWNlcy5qcydcbmltcG9ydCB7IExhY3VuYVdlYlBLSSB9IGZyb20gJ3dlYi1wa2knO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwa2lTaWduZXIoe1xuICAgIHN0YXRlLFxuICAgIHdlYlBraVNpZ25hdHVyZSxcbiAgICBkZWJ1ZyA9IGZhbHNlLFxuICAgIG9uUmVhZENlcnQsXG4gICAgb25TaWduRGF0YSxcbiAgICBvblNpZ25IYXNoLFxuICAgIGNhblNlbGVjdFBsYWNlaG9sZGVyLFxuICAgIGlzSHRtbEFsbG93ZWQsXG4gICAgZ2V0T3B0aW9uTGFiZWxVc2luZyxcbiAgICBnZXRPcHRpb25MYWJlbHNVc2luZyxcbiAgICBnZXRPcHRpb25zVXNpbmcsXG4gICAgZ2V0U2VhcmNoUmVzdWx0c1VzaW5nLFxuICAgIGlzQXV0b2ZvY3VzZWQsXG4gICAgaXNNdWx0aXBsZSxcbiAgICBpc1NlYXJjaGFibGUsXG4gICAgaGFzRHluYW1pY09wdGlvbnMsXG4gICAgaGFzRHluYW1pY1NlYXJjaFJlc3VsdHMsXG4gICAgbGl2ZXdpcmVJZCxcbiAgICBsb2FkaW5nTWVzc2FnZSxcbiAgICBtYXhJdGVtcyxcbiAgICBtYXhJdGVtc01lc3NhZ2UsXG4gICAgbm9TZWFyY2hSZXN1bHRzTWVzc2FnZSxcbiAgICBvcHRpb25zLFxuICAgIG9wdGlvbnNMaW1pdCxcbiAgICBwbGFjZWhvbGRlcixcbiAgICBwb3NpdGlvbixcbiAgICBzZWFyY2hEZWJvdW5jZSxcbiAgICBzZWFyY2hpbmdNZXNzYWdlLFxuICAgIHNlYXJjaFByb21wdCxcbiAgICBzZWFyY2hhYmxlT3B0aW9uRmllbGRzLFxuICAgIHN0YXRlUGF0aCxcbiAgICBnZXRPcHRpb25MYWJlbEJ5Q2VydGlmaWNhdGVVc2luZyxcbn0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBpc1NlYXJjaGluZzogZmFsc2UsXG5cbiAgICAgICAgc2VsZWN0ZWRPcHRpb25zOiBbXSxcblxuICAgICAgICBpc1N0YXRlQmVpbmdVcGRhdGVkOiBmYWxzZSxcblxuICAgICAgICBzdGF0ZSxcblxuICAgICAgICBjZXJ0aWZpY2F0ZXM6IFtdLFxuXG4gICAgICAgIGRlYnVnLFxuXG4gICAgICAgIHNlbGVjdElucHV0OiBudWxsLFxuXG4gICAgICAgIC8qKiBAdHlwZSB7TGFjdW5hV2ViUEtJfSAqL1xuICAgICAgICBwa2k6IG51bGwsXG5cbiAgICAgICAgc2VsZWN0OiBudWxsLFxuXG4gICAgICAgIHRva2VuOiBudWxsLFxuXG4gICAgICAgIGluaXQ6IGFzeW5jIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3QgPSBuZXcgQ2hvaWNlcyh0aGlzLiRyZWZzLmlucHV0LCB7XG4gICAgICAgICAgICAgICAgYWxsb3dIVE1MOiBpc0h0bWxBbGxvd2VkLFxuICAgICAgICAgICAgICAgIGR1cGxpY2F0ZUl0ZW1zQWxsb3dlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdFRleHQ6ICcnLFxuICAgICAgICAgICAgICAgIGxvYWRpbmdUZXh0OiBsb2FkaW5nTWVzc2FnZSxcbiAgICAgICAgICAgICAgICBtYXhJdGVtQ291bnQ6IG1heEl0ZW1zID8/IC0xLFxuICAgICAgICAgICAgICAgIG1heEl0ZW1UZXh0OiAobWF4SXRlbUNvdW50KSA9PlxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucGx1cmFsaXplKG1heEl0ZW1zTWVzc2FnZSwgbWF4SXRlbUNvdW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogbWF4SXRlbUNvdW50LFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBub0Nob2ljZXNUZXh0OiBzZWFyY2hQcm9tcHQsXG4gICAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogbm9TZWFyY2hSZXN1bHRzTWVzc2FnZSxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlclZhbHVlOiBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24gPz8gJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJlbW92ZUl0ZW1CdXR0b246IGNhblNlbGVjdFBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgICAgIHJlbmRlckNob2ljZUxpbWl0OiBvcHRpb25zTGltaXQsXG4gICAgICAgICAgICAgICAgc2VhcmNoRW5hYmxlZDogaXNTZWFyY2hhYmxlLFxuICAgICAgICAgICAgICAgIHNlYXJjaEZpZWxkczogc2VhcmNoYWJsZU9wdGlvbkZpZWxkcyA/PyBbJ2xhYmVsJ10sXG4gICAgICAgICAgICAgICAgc2VhcmNoUGxhY2Vob2xkZXJWYWx1ZTogc2VhcmNoUHJvbXB0LFxuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdExpbWl0OiBvcHRpb25zTGltaXQsXG4gICAgICAgICAgICAgICAgc2hvdWxkU29ydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VhcmNoRmxvb3I6IGhhc0R5bmFtaWNTZWFyY2hSZXN1bHRzID8gMCA6IDEsXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hDaG9pY2VzKHsgd2l0aEluaXRpYWxPcHRpb25zOiB0cnVlIH0pXG5cbiAgICAgICAgICAgIGlmICghW251bGwsIHVuZGVmaW5lZCwgJyddLmluY2x1ZGVzKHRoaXMuc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Quc2V0Q2hvaWNlQnlWYWx1ZSh0aGlzLmZvcm1hdFN0YXRlKHRoaXMuc3RhdGUpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hQbGFjZWhvbGRlcigpXG5cbiAgICAgICAgICAgIGlmIChpc0F1dG9mb2N1c2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Quc2hvd0Ryb3Bkb3duKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy4kcmVmcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoUGxhY2Vob2xkZXIoKVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZUJlaW5nVXBkYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlzU3RhdGVCZWluZ1VwZGF0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuc2VsZWN0LmdldFZhbHVlKHRydWUpID8/IG51bGxcbiAgICAgICAgICAgICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiAodGhpcy5pc1N0YXRlQmVpbmdVcGRhdGVkID0gZmFsc2UpKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKGhhc0R5bmFtaWNPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdzaG93RHJvcGRvd24nLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0LmNsZWFyQ2hvaWNlcygpXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc2VsZWN0LnNldENob2ljZXMoW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBsb2FkaW5nTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBdKVxuXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucmVmcmVzaENob2ljZXMoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChoYXNEeW5hbWljU2VhcmNoUmVzdWx0cykge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignc2VhcmNoJywgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWFyY2ggPSBldmVudC5kZXRhaWwudmFsdWU/LnRyaW0oKVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTZWFyY2hpbmcgPSB0cnVlXG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QuY2xlYXJDaG9pY2VzKClcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zZWxlY3Quc2V0Q2hvaWNlcyhbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFtudWxsLCB1bmRlZmluZWQsICcnXS5pbmNsdWRlcyhzZWFyY2gpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gbG9hZGluZ01lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzZWFyY2hpbmdNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgJ3NlYXJjaCcsXG4gICAgICAgICAgICAgICAgICAgIEFscGluZS5kZWJvdW5jZShhc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucmVmcmVzaENob2ljZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaDogZXZlbnQuZGV0YWlsLnZhbHVlPy50cmltKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU2VhcmNoaW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSwgc2VhcmNoRGVib3VuY2UpLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpc011bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgICAgICdmaWxhbWVudC1mb3Jtczo6c2VsZWN0LnJlZnJlc2hTZWxlY3RlZE9wdGlvbkxhYmVsJyxcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZGV0YWlsLmxpdmV3aXJlSWQgIT09IGxpdmV3aXJlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmRldGFpbC5zdGF0ZVBhdGggIT09IHN0YXRlUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hDaG9pY2VzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoSW5pdGlhbE9wdGlvbnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdzdGF0ZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFBsYWNlaG9sZGVyKClcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGVCZWluZ1VwZGF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoQ2hvaWNlcyh7XG4gICAgICAgICAgICAgICAgICAgIHdpdGhJbml0aWFsT3B0aW9uczogIWhhc0R5bmFtaWNPcHRpb25zLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmxvZygnSW5pdGlhbGl6aW5nIFdlYiBQS0kgY29tcG9uZW50IC4uLicsIHN0YXRlKTtcblxuICAgICAgICAgICAgdGhpcy5wa2kgPSBuZXcgTGFjdW5hV2ViUEtJKHdlYlBraVNpZ25hdHVyZSk7XG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGtpLmluaXQoe1xuICAgICAgICAgICAgICAgIHJlYWR5OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGtpLmxpc3RDZXJ0aWZpY2F0ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoYXN5bmMgKGNlcnRzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZXJ0aWZpY2F0ZXMgPSBjZXJ0cztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0LmNsZWFyQ2hvaWNlcygpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNlbGVjdC5zZXRDaG9pY2VzKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxvYWRpbmdNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdHZXQgb3B0aW9ucyBmcm9tIGNlcnRpZmljYXRlcyAuLi4nLCBzdGF0ZVBhdGgsIGNlcnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25zID0gYXdhaXQgdGhpcy4kd2lyZS5nZW5lcmF0ZVNlbGVjdE9wdGlvbnNGcm9tQ2VydGlmaWNhdGVzKHN0YXRlUGF0aCwgY2VydHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDaG9pY2VzKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBub3RJbnN0YWxsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ1dlYiBQS0kgbm90IGluc3RhbGxlZC4nKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRFcnJvcjogKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdBbiBlcnJvciBoYXMgb2NjdXJyZWQ6ICcgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuJHdpcmUub24oJ3NpZ25QQWRFUycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSBldmVudC50b2tlbjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnU2lnbmluZyBQQWRFUyAuLi4nLCB0aGlzLnN0YXRlLCB0aGlzLnRva2VuLCBldmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWduUEFkRVMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBsb2coLi4uYXJncykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKGFyZ3MpO1xuICAgICAgICB9LFxuICAgICAgICBzaWduUEFkRVM6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdTaWduaW5nIFBBZEVTIC4uLicsIHRoaXMuc3RhdGUpO1xuXG4gICAgICAgICAgICAvL1RPRE86IEFkZCBsb2FkaW5nIHN0YXRlXG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGtpLnNpZ25XaXRoUmVzdFBraSh7XG4gICAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgICAgdGh1bWJwcmludDogdGhpcy5zdGF0ZVxuICAgICAgICAgICAgfSkuc3VjY2VzcygoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25jZSB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlZCwgd2Ugc3VibWl0IHRoZSBmb3JtLlxuICAgICAgICAgICAgICAgIHRoaXMuJHdpcmUuZGlzcGF0Y2goJ3NpZ25lZFBBZEVTJywge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJwcmludDogdGhpcy5zdGF0ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QuZGVzdHJveSgpXG4gICAgICAgICAgICB0aGlzLnNlbGVjdCA9IG51bGxcbiAgICAgICAgfSxcblxuICAgICAgICByZWZyZXNoQ2hvaWNlczogYXN5bmMgZnVuY3Rpb24gKGNvbmZpZyA9IHt9KSB7XG4gICAgICAgICAgICBjb25zdCBjaG9pY2VzID0gYXdhaXQgdGhpcy5nZXRDaG9pY2VzKGNvbmZpZylcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnNlbGVjdCkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5jbGVhclN0b3JlKClcblxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoUGxhY2Vob2xkZXIoKVxuXG4gICAgICAgICAgICB0aGlzLnNldENob2ljZXMoY2hvaWNlcylcblxuICAgICAgICAgICAgaWYgKCFbbnVsbCwgdW5kZWZpbmVkLCAnJ10uaW5jbHVkZXModGhpcy5zdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdC5zZXRDaG9pY2VCeVZhbHVlKHRoaXMuZm9ybWF0U3RhdGUodGhpcy5zdGF0ZSkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0Q2hvaWNlczogZnVuY3Rpb24gKGNob2ljZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0LnNldENob2ljZXMoY2hvaWNlcywgJ3ZhbHVlJywgJ2xhYmVsJywgdHJ1ZSlcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRDaG9pY2VzOiBhc3luYyBmdW5jdGlvbiAoY29uZmlnID0ge30pIHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nT3B0aW9ucyA9IGF3YWl0IHRoaXMuZ2V0RXhpc3RpbmdPcHRpb25zKGNvbmZpZylcblxuICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nT3B0aW9ucy5jb25jYXQoXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRNaXNzaW5nT3B0aW9ucyhleGlzdGluZ09wdGlvbnMpLFxuICAgICAgICAgICAgKVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldEV4aXN0aW5nT3B0aW9uczogYXN5bmMgZnVuY3Rpb24gKHsgc2VhcmNoLCB3aXRoSW5pdGlhbE9wdGlvbnMgfSkge1xuICAgICAgICAgICAgaWYgKHdpdGhJbml0aWFsT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gW11cblxuICAgICAgICAgICAgaWYgKHNlYXJjaCAhPT0gJycgJiYgc2VhcmNoICE9PSBudWxsICYmIHNlYXJjaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IGF3YWl0IGdldFNlYXJjaFJlc3VsdHNVc2luZyhzZWFyY2gpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBhd2FpdCBnZXRPcHRpb25zVXNpbmcoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cy5tYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuY2hvaWNlcykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY2hvaWNlcyA9IHJlc3VsdC5jaG9pY2VzLm1hcCgoZ3JvdXBlZE9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBlZE9wdGlvbi5zZWxlY3RlZCA9IEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc3RhdGUuaW5jbHVkZXMoZ3JvdXBlZE9wdGlvbi52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuc3RhdGUgPT09IGdyb3VwZWRPcHRpb24udmFsdWVcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwZWRPcHRpb25cbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNlbGVjdGVkID0gQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlKVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc3RhdGUuaW5jbHVkZXMocmVzdWx0LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuc3RhdGUgPT09IHJlc3VsdC52YWx1ZVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICByZWZyZXNoUGxhY2Vob2xkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpc011bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0Ll9yZW5kZXJJdGVtcygpXG5cbiAgICAgICAgICAgIGlmICghW251bGwsIHVuZGVmaW5lZCwgJyddLmluY2x1ZGVzKHRoaXMuc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5jaG9pY2VzX19saXN0LS1zaW5nbGUnKS5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwiY2hvaWNlc19fcGxhY2Vob2xkZXIgY2hvaWNlc19faXRlbVwiPiR7cGxhY2Vob2xkZXIgPz8gJydcbiAgICAgICAgICAgICAgICB9PC9kaXY+YFxuICAgICAgICB9LFxuXG4gICAgICAgIGZvcm1hdFN0YXRlOiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgIGlmIChpc011bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChzdGF0ZSA/PyBbXSkubWFwKChpdGVtKSA9PiBpdGVtPy50b1N0cmluZygpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU/LnRvU3RyaW5nKClcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRNaXNzaW5nT3B0aW9uczogYXN5bmMgZnVuY3Rpb24gKGV4aXN0aW5nT3B0aW9ucykge1xuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5mb3JtYXRTdGF0ZSh0aGlzLnN0YXRlKVxuXG4gICAgICAgICAgICBpZiAoW251bGwsIHVuZGVmaW5lZCwgJycsIFtdLCB7fV0uaW5jbHVkZXMoc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nT3B0aW9uVmFsdWVzID0gbmV3IFNldCgpXG5cbiAgICAgICAgICAgIGV4aXN0aW5nT3B0aW9ucy5mb3JFYWNoKChleGlzdGluZ09wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ09wdGlvbi5jaG9pY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nT3B0aW9uLmNob2ljZXMuZm9yRWFjaCgoZ3JvdXBlZEV4aXN0aW5nT3B0aW9uKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdPcHRpb25WYWx1ZXMuYWRkKGdyb3VwZWRFeGlzdGluZ09wdGlvbi52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgIClcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBleGlzdGluZ09wdGlvblZhbHVlcy5hZGQoZXhpc3RpbmdPcHRpb24udmFsdWUpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoaXNNdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5ldmVyeSgodmFsdWUpID0+IGV4aXN0aW5nT3B0aW9uVmFsdWVzLmhhcyh2YWx1ZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7fVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAoYXdhaXQgZ2V0T3B0aW9uTGFiZWxzVXNpbmcoKSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigob3B0aW9uKSA9PiAhZXhpc3RpbmdPcHRpb25WYWx1ZXMuaGFzKG9wdGlvbi52YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChleGlzdGluZ09wdGlvblZhbHVlcy5oYXMoc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nT3B0aW9uVmFsdWVzXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogYXdhaXQgZ2V0T3B0aW9uTGFiZWxVc2luZygpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgfVxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ0EsUUFBSSxPQUFPLE9BQU8sMEJBQTBCLGFBQWE7QUFDeEQsYUFBTyx3QkFBd0I7QUFBQSxJQUNoQztBQU1BLFdBQU8sZUFBZTtBQUV0QixtQkFBZSxTQUFVLFNBQVM7QUFDakMsV0FBSyxVQUFVO0FBQ2YsV0FBSyxzQkFBc0I7QUFDM0IsV0FBSyxlQUFlO0FBQ3BCLFdBQUssU0FBUztBQUNkLFdBQUssUUFBUTtBQUNiLFdBQUssYUFBYTtBQUNsQixXQUFLLHNCQUFzQjtBQUMzQixXQUFLLHdCQUF3QjtBQUM3QixVQUFJLFNBQVM7QUFDWixhQUFLLFVBQVU7QUFBQSxNQUNoQjtBQUdBLFVBQUksS0FBSyxxQkFBcUIsT0FBTyxLQUFLLE9BQU8sRUFBRSxTQUFTO0FBQzNELFlBQUk7QUFDSCxpQkFBTyxFQUFFLFFBQVEsU0FBUyxhQUFhO0FBQ3ZDLGVBQUssS0FBSyw2QkFBNkI7QUFBQSxRQUV4QyxTQUFTLElBQUk7QUFDWixlQUFLLEtBQUssd0NBQXdDLEVBQUU7QUFBQSxRQUNyRDtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBSUEsS0FBQyxTQUFVLEdBQUc7QUFJVixRQUFFLFVBQVUsU0FBVSxjQUFjLFFBQVE7QUFDeEMsYUFBSyxrQkFBa0IsV0FBVztBQUFBLFFBQUU7QUFDcEMsYUFBSyxlQUFlO0FBQ3BCLGFBQUssZUFBZTtBQUNwQixhQUFLLFNBQVM7QUFBQSxNQUNsQjtBQUVILFFBQUUsUUFBUSxVQUFVLFVBQVUsU0FBVSxVQUFVO0FBQzNDLGFBQUssa0JBQWtCO0FBQ3ZCLGVBQU87QUFBQSxNQUNYO0FBRUEsUUFBRSxRQUFRLFVBQVUsUUFBUSxT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QUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBR3pDLFFBQUUsUUFBUSxRQUFRLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDeEMsUUFBRSxRQUFRLFFBQVEsRUFBRSxZQUFZLElBQUksSUFBSTtBQUN4QyxRQUFFLFFBQVEsUUFBUSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQ3hDLFFBQUUsUUFBUSxRQUFRLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDeEMsUUFBRSxRQUFRLFFBQVEsRUFBRSxZQUFZLElBQUksSUFBSTtBQUN4QyxRQUFFLFFBQVEsUUFBUSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzdDLFFBQUUsUUFBUSxRQUFRLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDeEMsUUFBRSxRQUFRLFFBQVEsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUMxQyxRQUFFLFFBQVEsUUFBUSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxRQUFRLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDeEMsUUFBRSxRQUFRLFFBQVEsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUMxQyxRQUFFLFFBQVEsUUFBUSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxRQUFRLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDMUMsUUFBRSxRQUFRLFFBQVEsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUMxQyxRQUFFLFFBQVEsUUFBUSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxRQUFRLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDMUMsUUFBRSxRQUFRLFFBQVEsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUd2QyxRQUFFLFFBQVEsWUFBWSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxZQUFZLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDNUMsUUFBRSxRQUFRLFlBQVksRUFBRSxZQUFZLElBQUksSUFBSTtBQUM1QyxRQUFFLFFBQVEsWUFBWSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxZQUFZLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDNUMsUUFBRSxRQUFRLFlBQVksRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUNqRCxRQUFFLFFBQVEsWUFBWSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxZQUFZLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDOUMsUUFBRSxRQUFRLFlBQVksRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM5QyxRQUFFLFFBQVEsWUFBWSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxZQUFZLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDOUMsUUFBRSxRQUFRLFlBQVksRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM5QyxRQUFFLFFBQVEsWUFBWSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzlDLFFBQUUsUUFBUSxZQUFZLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDOUMsUUFBRSxRQUFRLFlBQVksRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM5QyxRQUFFLFFBQVEsWUFBWSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzlDLFFBQUUsUUFBUSxZQUFZLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFHM0MsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDMUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDL0MsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBR3pDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDMUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDMUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLElBQUksSUFBSTtBQUMxQyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQy9DLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDMUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDMUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUM1QyxRQUFFLFFBQVEsVUFBVSxFQUFFLFlBQVksTUFBTSxJQUFJO0FBQzVDLFFBQUUsUUFBUSxVQUFVLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDNUMsUUFBRSxRQUFRLFVBQVUsRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUd6QyxRQUFFLFFBQVEsT0FBTyxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQ3ZDLFFBQUUsUUFBUSxPQUFPLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDdkMsUUFBRSxRQUFRLE9BQU8sRUFBRSxZQUFZLElBQUksSUFBSTtBQUN2QyxRQUFFLFFBQVEsT0FBTyxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQzFDLFFBQUUsUUFBUSxPQUFPLEVBQUUsWUFBWSxJQUFJLElBQUk7QUFDdkMsUUFBRSxRQUFRLE9BQU8sRUFBRSxZQUFZLE1BQU0sSUFBSTtBQUN6QyxRQUFFLFFBQVEsT0FBTyxFQUFFLFlBQVksSUFBSSxJQUFJO0FBQ3ZDLFFBQUUsUUFBUSxPQUFPLEVBQUUsWUFBWSxNQUFNLElBQUk7QUFDekMsUUFBRSxRQUFRLE9BQU8sRUFBRSxZQUFZ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QSxZQUFRLENBQUMsMEJBQzVCLHFCQUFxQixJQUFJLHNCQUFzQixLQUFLO0FBQUEsVUFDeEQ7QUFFQTtBQUFBLFFBQ0o7QUFFQSw2QkFBcUIsSUFBSSxlQUFlLEtBQUs7QUFBQSxNQUNqRCxDQUFDO0FBRUQsVUFBSSxZQUFZO0FBQ1osWUFBSUEsT0FBTSxNQUFNLENBQUMsVUFBVSxxQkFBcUIsSUFBSSxLQUFLLENBQUMsR0FBRztBQUN6RCxpQkFBTyxDQUFDO0FBQUEsUUFDWjtBQUVBLGdCQUFRLE1BQU0scUJBQXFCLEdBQzlCLE9BQU8sQ0FBQyxXQUFXLENBQUMscUJBQXFCLElBQUksT0FBTyxLQUFLLENBQUMsRUFDMUQsSUFBSSxDQUFDLFdBQVc7QUFDYixpQkFBTyxXQUFXO0FBRWxCLGlCQUFPO0FBQUEsUUFDWCxDQUFDO0FBQUEsTUFDVDtBQUVBLFVBQUkscUJBQXFCLElBQUlBLE1BQUssR0FBRztBQUNqQyxlQUFPO0FBQUEsTUFDWDtBQUVBLGFBQU87QUFBQSxRQUNIO0FBQUEsVUFDSSxPQUFPLE1BQU0sb0JBQW9CO0FBQUEsVUFDakMsT0FBT0E7QUFBQSxVQUNQLFVBQVU7QUFBQSxRQUNkO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0o7IiwKICAibmFtZXMiOiBbImV4IiwgImkiLCAiYyIsICJzIiwgImNvbnRleHQiLCAiZCIsICJiIiwgIl9fYXNzaWduIiwgIkRyb3Bkb3duIiwgIkNvbnRhaW5lciIsICJJbnB1dCIsICJMaXN0IiwgIldyYXBwZWRFbGVtZW50IiwgIldyYXBwZWRJbnB1dCIsICJjaG9pY2VzIiwgIldyYXBwZWRTZWxlY3QiLCAiaXRlbSIsICJTdG9yZSIsICJyIiwgIm9iaiIsICJwYXRoIiwgIm5vcm0iLCAidmFsdWUiLCAic2NvcmUiLCAicGF0dGVybiIsICJyZXN1bHQiLCAiaXRlbSIsICJzZWFyY2hlcnMiLCAicXVlcnkiLCAiU2VhcmNoQnlGdXNlIiwgImFkZENob2ljZSIsICJDaG9pY2VzIiwgIml0ZW1zIiwgImNob2ljZXMiLCAic2VhcmNoIiwgIm9wdGlvbnMiLCAiY2hvaWNlcyIsICJzdGF0ZSJdCn0K
