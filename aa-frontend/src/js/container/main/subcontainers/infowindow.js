import icon from '../views/iconStyles';

export function makeInfowindow(result) {
  var outlineColor;
  if (result.categorySeq == 1 || result.categorySeq == 2) outlineColor = '#ffbc42';
  else if (result.categorySeq == 3 || result.categorySeq == 5) outlineColor = '#8f2d56';
  else if (result.categorySeq == 4 || result.categorySeq == 6) outlineColor = '#79bd5a';
  else outlineColor = '#000000';

  const bMobile = window.innerWidth <= 768;
  const max_width = bMobile ? 150 : 300;
  const headSize = bMobile ? 16 : 19;
  const bodySize = bMobile ? 14 : 16;

  const name = getName(result, headSize, bodySize);
  const description = getDescription(result);
  const convenience = getConvenience(result);
  const homepage = getHomepage(result);
  const mapUrl = getMapUrl(result);

  const newContent = `
        <div class="iw_inner" style="margin: 15px; max-width:${max_width}px; font-family: 'Roboto','Noto Sans KR',AppleSDGothicNeo-Regular,'Malgun Gothic','맑은 고딕',dotum,'돋움',sans-serif;">
            <div style="display: inline-block;">
                ${name}
                ${homepage}
                ${mapUrl}
            </div>
            <p style="font-size: ${bodySize}px">
                ${description}
                <div style="width: ${max_width}px; color:#6e96ff; font-size: ${bodySize}px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" onclick="event.srcElement.style.whiteSpace = null;">
                    ${convenience}
                </div>
            </p>
        </div>
    `;

  return new naver.maps.InfoWindow({
    content: newContent,
    borderColor: outlineColor,
    borderWidth: 3,
    anchorSkew: true
  });
}

function getName(result, headSize, bodySize) {
  return result.subCategory
    ? `<div class='info'><h3 style="display: inline-block; font-size: ${headSize}px;">${result.name}</h3><p style="display: inline-block; font-size: ${bodySize}px;">&nbsp${result.subCategory}</p></div>`
    : `<h3 style="font-size: ${headSize}px;"><div>${result.name}</div></h3>`;
}

function getDescription(result) {
  return result.description ? `${result.description}<br />` : '';
}

function getConvenience(result) {
  return result.convenience ? result.convenience : '';
}

function getHomepage(result) {
  let homepageIcon = icon.homepage_svg;
  if (result.homepage && result.homepage.search('instagram.com') !== -1) {
    homepageIcon = icon.instagram_svg;
  }

  return result.homepage ? `<a href="${result.homepage}"><img src="${homepageIcon}" alt="Homepage" width="25" height="25"></a>` : '';
}

function getMapUrl(result) {
  return result.mapUrl ? `<a href="${result.mapUrl}"><img src="${icon.naver_svg}" alt="Naver Map" width="25" height="25" style="fill: #03c75A;"></a><br/>` : '';
}
