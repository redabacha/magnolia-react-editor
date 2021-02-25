const ACTIVATION_STATUS_NOT_ACTIVATED = 0;
const ACTIVATION_STATUS_MODIFIED = 1;
const ACTIVATION_STATUS_ACTIVATED = 2;

const VALUE_PROCESSORS = {
  content: getContentPath,
  availableComponents: getAvailableComponents,
  showAddButton: canAddMoreComponents,
  activationStatus: getActivationStatus
};
const PAGE_MAP = {
  content: ['@path', ''],
  dialog: ['dialog', '', getValueFromObject]
};
const AREA_MAP = {
  name: ['@name', ''],
  content: PAGE_MAP.content,
  dialog: PAGE_MAP.dialog,
  availableComponents: ['availableComponents', []],
  type: ['type', 'list', getValueFromObject],
  label: ['title', '', getValueFromObject],
  inherit: ['inheritance', false, getValueFromObject],
  optional: ['optional', false, getValueFromObject],
  createdAreaNode: ['createAreaNode', true, getValueFromObject],
  showAddButton: ['maxComponents', true],
  showNewComponentArea: [null, true],
  description: ['description', '', getValueFromObject],
  activationStatus: [null, 0]
};
const COMPONENT_MAP = {
  content: PAGE_MAP.content,
  dialog: PAGE_MAP.dialog,
  label: ['title', '', getValueFromObject],
  description: ['description', '', getValueFromObject],
  activationStatus: [null, 0]
};

export function getPageCommentString(page, templateDefinition) {
  return `cms:page ${getCommentString(page, PAGE_MAP, templateDefinition)}`;
}

export function getAreaCommentString(area, templateDefinition, componentCount) {
  const customParams = { componentCount };
  const areaTemplateDefinition =
    templateDefinition && templateDefinition.areas
      ? templateDefinition.areas[area['@name']]
      : {};
  return `cms:area ${getCommentString(
    area,
    AREA_MAP,
    areaTemplateDefinition,
    customParams
  )}`;
}

export function getComponentCommentString(component, templateDefinition) {
  return `cms:component ${getCommentString(
    component,
    COMPONENT_MAP,
    templateDefinition
  )}`;
}

function getCommentString(data, map, templateDefinition, customParams) {
  const result = [];
  Object.keys(map).forEach(key => {
    const [dataKey, defaultValue, getDataFn] = map[key];
    const contentProcessor = VALUE_PROCESSORS[key];
    let value = defaultValue;
    if (contentProcessor) {
      value = contentProcessor(data, dataKey, templateDefinition, customParams);
    } else if (getDataFn) {
      value = getDataFn(templateDefinition, dataKey, defaultValue);
    } else if (data != null && dataKey !== null) {
      value = data[dataKey] || '';
    }
    const item = { key, value };

    if (typeof item.value !== 'string' || item.value) {
      result.push(`${key}="${item.value}"`);
    }
  });

  return result.join(' ');
}

function getAvailableComponents(area, dataKey, templateDefinition) {
  if (!templateDefinition || !templateDefinition[dataKey]) {
    return '';
  }

  return Object.keys(templateDefinition[dataKey])
    .map(key => templateDefinition[dataKey][key].id)
    .join(',');
}

function canAddMoreComponents(area, dataKey, templateDefinition, customParams) {
  if (
    !templateDefinition ||
    templateDefinition.maxComponents == null ||
    !customParams ||
    customParams.componentCount == null
  ) {
    return true;
  }
  return customParams.componentCount < templateDefinition.maxComponents;
}

function getValueFromObject(obj, key, defaultValue) {
  let value = obj && typeof obj === 'object' && key ? obj[key] : null;
  value = value == null ? defaultValue : value;
  value = typeof defaultValue === 'boolean' ? Boolean(value) : value;
  return value != null ? value : defaultValue;
}

function getContentPath(data, key) {
  const value = data ? data[key] : null;
  return value != null ? `website:${value}` : '';
}

function getActivationStatus(data) {
  if (
    !data ||
    !data['mgnl:activationStatus'] ||
    data['mgnl:activationStatus'] === 'false'
  ) {
    return ACTIVATION_STATUS_NOT_ACTIVATED;
  }

  const lastModified = data['mgnl:lastModified']
    ? new Date(data['mgnl:lastModified'])
    : null;
  const lastActivated = data['mgnl:lastActivated']
    ? new Date(data['mgnl:lastActivated'])
    : null;

  return lastModified &&
    lastActivated &&
    lastModified.getTime() > lastActivated.getTime()
    ? ACTIVATION_STATUS_MODIFIED
    : ACTIVATION_STATUS_ACTIVATED;
}
