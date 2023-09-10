function transformArrayToObject(inputArray) {
  const transformedObject = {};

  inputArray.forEach((item) => {
    const domain = item.domain;
    const rule = item.rule;

    transformedObject[domain] = {
      perSecondRule: rule.perSecondRule,
      perMinuteRule: rule.perMinuteRule,
      perHourRule: rule.perHourRule,
      perDayRule: rule.perDayRule,
      maxAmountPerDay:
        rule.maxAmountPerDay !== undefined ? rule.maxAmountPerDay : null,
      maxFreeRequestsPerDay: rule.maxFreeRequestsPerDay,
      maxFreeRequestsPerMinute: rule.maxFreeRequestsPerMinute,
      costPerRequest:
        rule.costPerRequest !== undefined ? rule.costPerRequest : null,
    };
  });

  return transformedObject;
}

function transformObjectToArray(inputObject) {
  const transformedArray = [];

  for (const domain in inputObject) {
    if (inputObject.hasOwnProperty(domain)) {
      const rule = inputObject[domain];
      transformedArray.push({
        domain: domain,
        rule: {
          perSecondRule: rule.perSecondRule,
          perMinuteRule: rule.perMinuteRule,
          perHourRule: rule.perHourRule,
          perDayRule: rule.perDayRule,
          maxAmountPerDay:
            rule.maxAmountPerDay !== null ? rule.maxAmountPerDay : undefined,
          maxFreeRequestsPerDay: rule.maxFreeRequestsPerDay,
          maxFreeRequestsPerMinute: rule.maxFreeRequestsPerMinute,
          costPerRequest:
            rule.costPerRequest !== null ? rule.costPerRequest : undefined,
        },
      });
    }
  }

  return transformedArray;
}

function validateObjectsArray(inputArray) {
  const validCauses = [];

  for (const item of inputArray) {
    const domain = item.domain;
    const rule = item.rule;
    const causes = [];

    if (typeof domain !== "string" || domain.trim() === "") {
      causes.push("Domain must be a non-empty string");
    }

    if (typeof rule !== "object" || rule === null) {
      causes.push("Rule must be a non-null object");
    } else {
      if (typeof rule.perSecondRule !== "boolean") {
        causes.push("perSecondRule must be a boolean");
      }
      if (typeof rule.perMinuteRule !== "boolean") {
        causes.push("perMinuteRule must be a boolean");
      }
      if (typeof rule.perHourRule !== "boolean") {
        causes.push("perHourRule must be a boolean");
      }
      if (typeof rule.perDayRule !== "boolean") {
        causes.push("perDayRule must be a boolean");
      }
      if (
        typeof rule.maxAmountPerDay !== "number" &&
        rule.maxAmountPerDay !== null
      ) {
        causes.push("maxAmountPerDay must be a number or null");
      }
      if (typeof rule.maxFreeRequestsPerDay !== "number") {
        causes.push("maxFreeRequestsPerDay must be a number");
      }
      if (typeof rule.maxFreeRequestsPerMinute !== "number") {
        causes.push("maxFreeRequestsPerMinute must be a number");
      }
      if (
        typeof rule.costPerRequest !== "number" &&
        rule.costPerRequest !== null
      ) {
        causes.push("costPerRequest must be a number or null");
      }
    }

    if (causes.length > 0) {
      validCauses.push({
        domain: domain,
        causes: causes,
      });
    }
  }

  return validCauses;
}

function validateObjectsObject(inputObject) {
  console.log("I am working");
  const validCauses = [];

  for (const domain in inputObject) {
    console.log("domain", domain);
    if (inputObject.hasOwnProperty(domain)) {
      const rule = inputObject[domain];
      const causes = [];

      if (typeof rule !== "object" || rule === null) {
        causes.push("Rule must be a non-null object");
      } else {
        if (typeof rule.perSecondRule !== "boolean") {
          causes.push("perSecondRule must be a boolean");
        }
        if (typeof rule.perMinuteRule !== "boolean") {
          causes.push("perMinuteRule must be a boolean");
        }
        if (typeof rule.perHourRule !== "boolean") {
          causes.push("perHourRule must be a boolean");
        }
        if (typeof rule.perDayRule !== "boolean") {
          causes.push("perDayRule must be a boolean");
        }
        if (
          typeof rule.maxAmountPerDay !== "number" &&
          rule.maxAmountPerDay !== null
        ) {
          causes.push("maxAmountPerDay must be a number or null");
        }
        if (typeof rule.maxFreeRequestsPerDay !== "number") {
          causes.push("maxFreeRequestsPerDay must be a number");
        }
        if (typeof rule.maxFreeRequestsPerMinute !== "number") {
          causes.push("maxFreeRequestsPerMinute must be a number");
        }
        if (
          typeof rule.costPerRequest !== "number" &&
          rule.costPerRequest !== null
        ) {
          causes.push("costPerRequest must be a number or null");
        }
      }

      if (causes.length > 0) {
        validCauses.push({
          domain: domain,
          causes: causes,
        });
      }
    }
  }
  console.log(validCauses);
  return validCauses;
}

module.exports = {
  transformArrayToObject,
  transformObjectToArray,
  validateObjectsArray,
  validateObjectsObject,
};
