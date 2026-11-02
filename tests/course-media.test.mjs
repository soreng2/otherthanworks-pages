import test from 'node:test';
import assert from 'node:assert/strict';
import { courseMediaBucket, videoExtension } from '../lib/course-media.ts';
import { defaultCourse, validateCourse } from '../lib/course-content.ts';
import { classes } from '../content/site.ts';
test('media selects private video bucket and keeps legacy images', () => {
  assert.equal(courseMediaBucket('x.jpg'), 'course-photos');
  assert.equal(courseMediaBucket('x.mp4'), 'course-videos');
  assert.equal(courseMediaBucket('x.webm'), 'course-videos');
});
test('video upload rejects unsupported or oversized files', () => {
  assert.equal(videoExtension({type:'video/mp4', size:52428800}), 'mp4');
  assert.equal(videoExtension({type:'video/webm', size:10}), 'webm');
  for (const file of [{type:'video/mp4',size:52428801},{type:'video/mp4',size:0},{type:'video/quicktime',size:10},{type:'image/svg+xml',size:10}]) assert.throws(()=>videoExtension(file));
});
test('mixed detail content validates safe paths and bounded captions', () => {
  const course=defaultCourse(classes[0]),id='11111111-1111-1111-1111-111111111111';
  const photos=['jpg','mp4','webm'].map(ext=>({path:`${id}.${ext}`,alt:'설명',caption:'영상 대본'}));
  assert.equal(validateCourse({...course, photos}), null);
  for(const photo of [{path:'../x.mp4',alt:'설명'},{path:`${id}.mov`,alt:'설명'},{path:`${id}.mp4`,alt:''},{...photos[0],caption:'x'.repeat(5001)}]) assert.ok(validateCourse({...course,photos:[photo]}));
  assert.ok(validateCourse({...course,photos:Array(21).fill(photos[0])}));
});
