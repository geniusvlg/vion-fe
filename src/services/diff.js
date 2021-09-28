export function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function diff_arr (v1, v2, set = [], del = []) {
  for (let i of v2) {
    if (!v1.find(f => f.uid === i.uid)) {
      set.push(i)
    }
  }
  for (let i of v1) {
    if (!v2.find(f => f.uid === i.uid)) {
      del.push({ uid: i.uid })
    }
  }
  return { set, del }
}

function isDel (v) {
  return v === null || typeof v === 'undefined' || v === ''
}

export function diff (o1, o2, uid) {
  const set = {}
  const del = {}
  let k, t, v1, v2
  for (k in o2) {
    v1 = o1[k]
    v2 = o2[k]
    if (isDel(v2)) {
      del[k] = null
    } else if (isDel(v1)) {
      set[k] = v2
    } else {
      t = typeof v2
      if (t !== 'object') {
        if (isDel(v2)) {
          del[k] = null
        } else if (v2 !== o1[k]) {
          set[k] = v2
        }
      } else if (!Array.isArray(v2)) {
        if (v2.uid !== v1.uid) {
          set[k] = v2.uid.startsWith('_:') ? v2 : { uid: v2.uid }
          del[k] = { uid: v1.uid }
        }
      }
    }

  }
  return {
    ...(Object.keys(set).length > 0 && { set: { ...set, uid } }),
    ...(Object.keys(del).length > 0 && { del: { ...del, uid } })
  }
}

export function conpare_diff_arr_obj (o1, o2) {
  const set = []
  const del = []

  if (Array.isArray(o2) && o2.length > 0) {
    o2.forEach(v2 => {
      if (!o1.find(v1 => v1.uid === v2.uid)) {
        set.push({ uid: v2.uid })
      }
    })
    o1.forEach(v1 => {
      if (!o2.find(v2 => v2.uid === v1.uid)) {
        del.push({ uid: v1.uid })
      }
    })
  } else if (Array.isArray(o2) && o2.length === 0) {
    o1.forEach(v1 => {
      del.push({ uid: v1.uid })
    })
  }

  return {
    set: set.length > 0 ? set : [],
    del: del.length > 0 ? del : []
  }
}

export function diff_has_price (o1, o2, uid) {
  /**
     * Cái này em tạm thời đọc hiểu rồi và clone ra như vầy để lưu được đã, em sẽ đọc kỹ lại và viết thêm vào đây để dùng cho trường hợp pricing
     */
  const set = {}
  const del = {}
  let k, t, v1, v2
  for (k in o2) {
    v1 = o1[k]
    v2 = o2[k]
    if (isDel(v2)) {
      del[k] = null
    } else if (isDel(v1)) {
      set[k] = v2
    } else {
      t = typeof v2
      if (t !== 'object') {
        if (isDel(v2)) {
          del[k] = null
        } else if (v2 !== o1[k]) {
          set[k] = v2
        }
      } else if (!Array.isArray(v2)) {
        if (v2.uid !== v1.uid) {
          set[k] = v2.uid.startsWith('_:') ? v2 : { uid: v2.uid }
          del[k] = { uid: v1.uid }
        } else {
          set[k] = v2
        }
      }
    }

  }
  return {
    ...(Object.keys(set).length > 0 && { set: { ...set, uid } }),
    ...(Object.keys(del).length > 0 && { del: { ...del, uid } })
  }
}

export function diff_customer (o1, o2, uid) {
  const set = {}
  const del = {}
  let k, t, v1, v2
  for (k in o2) {
    v1 = o1[k]
    v2 = o2[k]
    if (isDel(v2)) {
      del[k] = null
    } else if (isDel(v1)) {
      set[k] = v2
    } else {
      t = typeof v2
      if (t !== 'object') {
        if (isDel(v2)) {
          del[k] = null
        } else if (v2 !== v1) {
          set[k] = v2
        }
      }
      else if (Array.isArray(v2) && k.startsWith('alt_') === true && k.includes('_address') === false) {
        if (v2 && v2.length === 0) {
          del[k] = v1
        }
        else {
          let alt_del = []
          for (var p = 0; p < v1.length; p++) {
            // eslint-disable-next-line no-loop-func
            if (!!v2.find(el => el === v1[p]) === true) {
              // eslint-disable-next-line no-loop-func
              let pos = v2.findIndex(vl => vl === v1[p])
              v2.splice(pos, 1)
            }
            else {
              alt_del.push(v1[p])
              p++
            }
          }
          del[k] = alt_del
          set[k] = v2
        }
      }
      else if (Array.isArray(v2) && k.startsWith('alt_') === true && k.includes('_address') === true) {
        if (v2 && v2.length === 0) {
          del[k] = v1
        }
        else {
          let addr_del = []
          for (var r = 0; r < v1.length; r++) { // chay qua v1
            // eslint-disable-next-line no-loop-func
            if (!!v2.find(el => el.uid === v1[r].uid) === false) {
              addr_del.push(v1[r])
            }
            else {
              for (var w = 0; w < v2.length; w++) {
                if (v2[w].address_type === v1[r].address_type && v2[w].address_des === v1[r].address_des) {
                  if (!v2[w].uid) {
                    // eslint-disable-next-line no-loop-func
                    v2.splice(w, 1)
                  }
                }
              }
            }
          }
          del[k] = addr_del
          set[k] = v2
        }
      }
      else if (!Array.isArray(v2)) {
        if (v2.address_type !== v1.address_type || v2.address_des !== v1.address_des) {
          set[k] = v2
        }
      }
    }
  }
  return {
    ...(Object.keys(del).length > 0 && { del: { ...del, uid } }),
    ...(Object.keys(set).length > 0 && { set: { ...set, uid } })
  }
}

export function diffAddress (aOld, aNew, uid) {
  const set = {}, del = {}

  let key, type, valueOld, valueNew
  function fn (val) {
    if (valueNew.uid !== val) {
      del[key].push({ uid: val })
    }
  }
  for (key in aNew) {
    valueOld = aOld[key]
    valueNew = aNew[key]
    if (isDel(valueNew)) {
      del[key] = null // giá trị mới mà không có, nghĩa là không có thay đổi, thì không cần xoá giá trị cũ
    } else if (isDel(valueOld)) {
      set[key] = valueNew //giá trị cũ không có, thì set giá trị mới vào
    } else {
      type = typeof valueNew
      if (type !== "object") {
        if (isDel(valueNew)) {
          del[key] = null
        } else if (valueNew !== valueOld) {
          set[key] = valueNew
        }
      } else if (!Array.isArray(valueNew)) {
        if (valueNew.uid !== valueOld.uid && (key === 'district' || key === "province")) {
          if (!Array.isArray(valueOld.uid)) {
            set[key] = { uid: valueNew.uid }
            del[key] = { uid: valueOld.uid }
          } else {
            del[key] = []
            valueOld.uid.forEach(fn)
            if (del[key].length === valueOld.uid.length) {
              set[key] = { uid: valueNew.uid }
            }
          }
        }
      }
    }
  }
  return {
    ...(Object.keys(del).length > 0 && { del: { ...del, uid } }),
    ...(Object.keys(set).length > 0 && { set: { ...set, uid } })
  }
}

export function diff_with_array (o1, o2, uid) {
  const set = {}
  const del = {}
  let k, t, v1, v2
  for (k in o2) {
    v1 = o1[k]
    v2 = o2[k]
    if (isDel(v2)) {
      del[k] = null
    } else if (isDel(v1)) {
      set[k] = v2
    } else {
      t = typeof v2
      if (t !== 'object') {
        if (isDel(v2)) {
          del[k] = null
        } else if (v2 !== o1[k]) {
          set[k] = v2
        }
      } else if (!Array.isArray(v2)) {
        if (v2.uid !== v1.uid) {
          set[k] = v2.uid.startsWith('_:') ? v2 : { uid: v2.uid }
          del[k] = { uid: v1.uid }
        }
      } else {
        if (JSON.stringify(v2) !== JSON.stringify(v1)) {
          del[k] = v1.map(item => ({ uid: item.uid }));
          set[k] = v2;
        }
      }
    }

  }
  return {
    ...(Object.keys(set).length > 0 && { set: { ...set, uid } }),
    ...(Object.keys(del).length > 0 && { del: { ...del, uid } })
  }
}


export function diff_role (o1, o2, uid) {
  const set = {}
  const del = {}
  let k, t, v1, v2
  for (k in o2) {
    v1 = o1[k]
    v2 = o2[k]
    t = typeof v2
    if (t !== 'object') {
      if (isDel(v2)) {
        del[k] = null
      } else if (v2 !== v1) {
        set[k] = v2
      }
    }
    else if (Array.isArray(v2)) {
      set[k] = v2
    }
  }
  return {
    ...(Object.keys(set).length > 0 && { set: { ...set, uid } }),
    ...(Object.keys(del).length > 0 && { del: { ...del, uid } })
  }
}