import fsk from './fsk';
import akzeptanz from './akzeptanz';

export default /*@ngInject*/class modals{
  constructor($uibModal){
    this.$uibModal = $uibModal;
  }
  fsk(){
    return this.$uibModal.open(fsk);
  }
  akzeptanz(){
    return this.$uibModal.open(akzeptanz);
  }
}
