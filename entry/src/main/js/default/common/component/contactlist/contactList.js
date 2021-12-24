/**
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http:// www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export default {
    props: ['contactList', 'searchContactList', 'searchLayoutShow', 'searchPhoneNum', 'phoneCheckShow',
        'showDefaultNumber', 'childPhoneCheckShow', 'showNumberList', 'selectType'],
    data: {
        layoutState: true,
    },
    onInit(){
        this.conciseLayoutInit();
    },
/* 批量删除选中的通话记录 */
    deleteCheckedCalls() {
        this.$element('deleteCheckDialog').show(); // 显示删除提示框
    },
/* 确认删除 */
    doDelete() {
        this.$emit('sureProcess', {});
        this.$element('deleteCheckDialog').close();
    },
// 简洁布局选项初始化
    conciseLayoutInit: function () {
        let data = this.$app.$def.globalData.storage.getSync('contacts_settings_concise_layout_switch', 'false');
        this.layoutState = data == 'true'? false : true;
    },
/* 取消删除 */
    cancelDialog() {
        this.$element('deleteCheckDialog').close();
    },
    listItemTouchStartSearch(index, indexChild){
        this.listItemTouchStart(index, indexChild);
    },
    listItemTouchStart(index, indexChild) {
        if (this.selectType == 'batchSelect') { // 批量选择联系人界面
            this.$emit('checkChange', {
                contactIndex: index,
                numberIndex: indexChild,
                checked: this.searchLayoutShow ? !this.searchContactList[index].phoneNumbers[indexChild].checked
                                               : !this.contactList[index].phoneNumbers[indexChild].checked
            });
        } else { // 从快速拨号界面跳转到选择联系人
            this.$emit('eventType', {
                index: index,
                indexChild: indexChild
            });
        }
    },
/* 选择要编辑的联系人 */
    editContacts(index) {
        this.$emit('contactsSelected', {
            contacts: this.contactList[index]
        })
    },
    requestItem() {
        // 数据缓存刷新
        this.$emit('requestItem', {});
    },
    changeCheckState: function (contactIndex, numberIndex, event) {
        this.$emit('checkChange', {
            contactIndex: contactIndex,
            numberIndex: numberIndex,
            checked: event.checked
        });
    }
}