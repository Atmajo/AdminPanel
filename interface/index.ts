interface menu_type {
  title: string;
  icon: string;
  redirect: string;
}

interface modal_type {
  modal: boolean, setModal: Function, id: string, item: any
}

interface register_data_type {
  name: string;
  email: string;
  password: string;
}

interface menucontainer_type {
  page: string;
}

interface item_type {
  id: string;
  name: string;
  code: string;
  start: string;
  expiry: string;
  quantity: string;
  mfgcost: string;
  price: string;
}